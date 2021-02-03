<template>
  <transition name="scale-x">
    <div class=" my-popup forbidden-box" @click="showBox = false" v-show="showBox">
      <div class="my-popup-content forbidden" @click.stop="" v-if="!showAddForbidden">
        <div class="left">
          <img src="../../assets/images/icon/code.png" class="code" @click="ivent" />
          <div class="head-img">
            <img v-if="currentSession.img" class="avatar"
              :src="global.fileDownUrl + 'compress/' + currentSession.img" v-headErrors />
              <img class="avatar" src="../../assets/images/error-head2.png"  v-if="!currentSession.img">
            <!-- <span class="default" v-defaultHead v-if="!currentSession.img" v-html="currentSession.name"></span> -->
          </div>
          <div class="name-sex">
            <span class="name">{{ currentSession.name }}</span>
          </div>
          <p class="nikename">
            {{ $t("msg.groupInfo.groupUser") }}({{ groupUserList.length }})
          </p>
          <div class="share" v-if="isAdmin" @click="dissolveChat()">
            {{ $t("msg.chatSetting.dissolveChat") }}
          </div>
          <div class="share" v-else @click="deleteExit">
            {{ $t("msg.chatSetting.deleteExit") }}
          </div>
        </div>
        <div class="right">
          <header class="top">
            <span :class="isSet ? 'personal' : 'personal active'"
              @click="isSet = true">{{ $t("msg.menu.setting") }}</span>
            <!-- <span :class="isSet ? 'personal active' : 'personal'" style="margin-left: 98px"
              @click="isSet = false">{{ $t("msg.groupInfo.groupUser") }}</span> -->
          </header>
          <ul class="user-info" v-scrollBar v-if="isSet">
            <div class="info">
              <span>{{ $t("msg.chatSetting.groupName") }}</span>
              <div class="display-flex">
                <p class="showname">{{ currentSession.name }}</p>
                <img src="../../assets/images/edit.png" @click="showname = true" v-if="isAdmin" />
              </div>
            </div>
            <div class="info">
              <span>{{ $t("msg.groupInfo.affiche") }}</span>
              <div class="display-flex">
                <!-- <p>{{affiche}}</p> -->
                <p class="showaffiche" v-if="affiche!=''"> {{ affiche }}</p>
                <p class="showaffiche" v-else> {{ $t("msg.groupInfo.noneAffiche")}}</p>
                <img src="../../assets/images/edit.png" @click="showAffiche" v-if="isAdmin" />
              </div>
            </div>
            <div class="info">
              <span>{{ $t("msg.chatSetting.yourNickName") }}</span>
              <div class="display-flex">
                <p v-for="(item, index) in memberList" :key="index">
                  <span v-if="item.userId == userId">{{
                    item.notes || item.nickName
                  }}</span>
                  <img v-if="item.userId == userId" src="../../assets/images/edit.png" @click="openNickNameEdit(item)"
                    style="margin-left: 20px" />
                </p>
              </div>
            </div>
            <div class="info add" @click="addGroupUser">
              <span>{{ $t("msg.groupInfo.addUser") }}</span>
              <div class="display-flex">
                <img src="../../assets/images/icon/right.png" />
              </div>
            </div>
            <div class="info add" @click="disturbing()">
              <span class="lable flex-item-nowrap">{{
                $t("msg.menu.disturbing")
              }}</span>
              <echat-switch v-model="currentSession.isInterruption"></echat-switch>
            </div>
            <div class="info add" @click="modifyGroup('isTop')">
              <span class="lable flex-item-nowrap">{{
                $t("msg.chatSetting.stick")
              }}</span>
              <echat-switch v-model="currentSession.isTop"></echat-switch>
            </div>
            <div class="info add" @click="showUserName()">
              <span class="lable flex-item-nowrap">{{
                $t("msg.chatSetting.showUserName")
              }}</span>
              <echat-switch v-model="currentSession.isShowMemberNick"></echat-switch>
            </div>
            <div class="info add" @click="showclear()">
              <span>{{ $t("msg.chatSetting.clearChatHistory") }}</span>
              <div class="display-flex">
                <img src="../../assets/images/icon/right.png" />
              </div>
            </div>
            <div class="info add" @click="showsetCycle = !showsetCycle"  v-if="isAdmin">
              <span class="lable flex-item-nowrap"
                :title="$t('msg.chatSetting.autoClean')">{{ $t("msg.chatSetting.autoClean") }}</span>
              <span v-if="clearType == 0 || !clearType">{{
                $t("msg.chatSetting.never")
              }}</span>
              <span v-if="clearType == 1">{{ $t("msg.chatSetting.one") }}</span>
              <span v-if="clearType == 2">{{
                $t("msg.chatSetting.three")
              }}</span>
              <span v-if="clearType == 3">{{
                $t("msg.chatSetting.seven")
              }}</span>
              <span v-if="clearType == 4">{{
                $t("msg.chatSetting.thirty")
              }}</span>
              <i class="icon-s" :class="showsetCycle ? 'active' : ''"></i>
            </div>
            <ul v-if="showsetCycle" class="cyclelist">
              <li @click="setCycle(0)">
                <span :class="clearType == 0 ? 'check pot' : 'pot'"></span>{{ $t("msg.chatSetting.never") }}
              </li>
              <li @click="setCycle(1)">
                <span :class="clearType == 1 ? 'check pot' : 'pot'"></span>{{ $t("msg.chatSetting.one") }}
              </li>
              <li @click="setCycle(2)">
                <span :class="clearType == 2 ? 'check pot' : 'pot'"></span>{{ $t("msg.chatSetting.three") }}
              </li>
              <li @click="setCycle(3)">
                <span :class="clearType == 3 ? 'check pot' : 'pot'"></span>{{ $t("msg.chatSetting.seven") }}
              </li>
              <li @click="setCycle(4)">
                <span :class="clearType == 4 ? 'check pot' : 'pot'"></span>{{ $t("msg.chatSetting.thirty") }}
              </li>
            </ul>
            <div class="info add" @click="moreSetting = !moreSetting" v-if="isAdmin">
              <span>{{ $t("msg.forbidden.permission") }}</span>
              <i class="icon-s" :class="moreSetting ? 'active' : ''"></i>
            </div>
            <div class="moreset" v-if="moreSetting">
              <div class="display-flex">
              <span class="icon" :class="{ selected: isForbiddenAll }" @click="forbiddenAll"></span><span style="margin-left:10px">{{ $t("msg.forbidden.forbiddenAll")}}</span>
              </div>
              <p class="text">{{ $t("msg.forbidden.info")}}</p>
              <div @click="showbanned=!showbanned" class="display-flex set"><img @click.stop="addbidden()" src="../../assets/images/icon/add-a.png"><span class="title">{{$t("msg.forbidden.setForbidden")}}</span><span class="arrows" :class="{active:showbanned}"></span></div>
              <div class="biddenlist" v-scrollBar v-if="showbanned">
                <ul v-if="!isForbiddenAll">
                  <li class="display-flex list-item" :class="{ hide: item.isAdmin > 0 }"
                    v-for="(item, index) in biddenlist" :key="index">
                    <span class="delete-icon" @click="unforbiddenOne(item)"></span>
                    <div class="info">
                      <img class="avatar"  v-if="item.headImg" :src="global.fileDownUrl + 'compress/' + item.headImg" v-headError />
                      <!-- <span>{{item.fromType}}</span> -->
                      <img class="avatar" src="../../assets/images/error-head.png"  v-if="!item.headImg">
                      <!-- <span class="default" v-defaultHead v-if="!item.headImg" v-html="item.nickName"></span> -->
                      <span class="flex-item-nowrap" >{{ item.notes||item.nickName }}</span>
                    </div>
                  </li>
                </ul>
                <div class="no-more" v-if="biddenlist.length < 1 && !isForbiddenAll">
                  {{ $t("msg.forbidden.noneForbidden") }}
                </div>
                <div class="no-more" v-if="isForbiddenAll">
                  {{ $t("msg.forbidden.openForbidden") }}
                </div>
              </div>
              <div style="margin-top:22px" class="display-flex">
              <span class="icon" :class="{ selected: isForbidTemp }" @click="groupSetting('temp')"></span>
              <span style="margin-left:10px" class="title">{{ $t("msg.forbidden.banedTemp") }}</span>
              </div>
            <div class="display-flex-item">
              <p class="text">{{ $t("msg.forbidden.banedTempInfo") }}</p>
            </div>
             <div style="margin-top:22px" class="display-flex">
              <span class="icon" :class="{ selected: isForbidFriend }" @click="groupSetting('friend')"></span>
              <span style="margin-left:10px" class="title">{{ $t("msg.forbidden.banedAddFriend") }}</span>
              </div>
            <div class="display-flex-item">
              <p class="text">{{ $t("msg.forbidden.banedAddFriendInfo") }}</p>
            </div>
            </div>
          </ul>
          <!-- <div class="user-info" v-else></div> -->
        </div>
      </div>
      <div class="my-popup invite-box" @click.stop="addbiddens=false" v-if="addbiddens">
      <div class="my-popup-content" @click.stop=";" v-if="addbiddens">
        <div class="left">
        <div class="selected">{{ $t("msg.chatPanel.selected") }}</div>
        <div class="unselected-list">
          <ul class="friend-list" v-scrollBar>
            <li
              class="friend-list-item display-flex"
              v-for="(item, index) in selectlist"
              :key="index"
              @click="deleteChecked(item,index)"
            >
              <img style="margin-right:12px" src="../../assets/images/active.png" v-if=" item.checked">
              <div class="item-left">
              <img  v-if="item.headImg" class="avatar" :src="global.fileDownUrl + 'compress/' + item.headImg" v-headError />
              <img class="avatar" src="../../assets/images/error-head.png"  v-if="!item.headImg">
              <!-- <span class="default" v-defaultHead v-if="!item.headImg" >{{ item.nickName }}</span>-->
                <span
                  class="name"
                  v-text=" item.notes||item.nickName"
                  @click="item.isClick = !item.isClick"
                ></span> 
                </div>
            </li>
          </ul>
          <div class="btn">
          <button class="two-btn comfirm"  @click="addFinish">
            {{ $t("msg.common.confirm") }}
          </button>
          <button class="two-btn cannel"   @click="addbiddens=false">
            {{ $t("msg.common.cancel") }}
          </button>
          </div>
        </div>
        </div>
        <div class="right">
          <div class="search-input">
            <input
              type="text"
              :placeholder="$t('msg.menu.search')"
              maxlength="20"
              v-model="keyword"
            />
            <i class="icon-delete" @click="keyword = ''" v-show="keyword"></i>
          </div>
          <div class="unselected-list">
          <ul class="friend-list" v-scrollBar>
              <li
                class="friend-list-item display-flex"
                :class="{ active: item.checked, hide: item.temp }"
                  v-for="(item, index) in unSelectList" :key="index" @click="clickChecked(item)"
              >
                <!-- <div v-if="item.isAdmin!=0" class="display-flex">
                  <div class="item-left">
                    <img
                      class="avatar"
                      :src="global.fileDownUrl + 'compress/' + item.headImg"
                      v-headError
                      style="margin-left:30px"
                      v-if="item.headImg"
                    />
                    <img class="avatar" src="../../assets/images/error-head.png"  v-if="!item.headImg">
                    <span
                      class="select"
                    ></span>
                  </div>
                  <div class="display-flex-item">
                    <span v-show="keyword == ''">{{ item.nickName }}</span>
                    <span
                      v-show="keyword != ''"
                      class="name-line-top"
                      v-html="item.nickName"
                    ></span>
                  </div>
                </div>
                <div v-else-if="item.isBanned" class="display-flex">
                    <img style="margin-right:12px" src="../../assets/images/active.png" v-if=" item.isBanned">
                  <div class="item-left">
                    <img
                      class="avatar"
                      :src="global.fileDownUrl + 'compress/' + item.headImg"
                      v-headError  v-if="item.headImg"
                    />
                    <img class="avatar" src="../../assets/images/error-head.png"  v-if="!item.headImg">
                    <span
                      class="select"
                    ></span>
                  </div>
                  <div class="display-flex-item">
                    <span v-show="keyword == ''">{{ item.nickName }}</span>
                    <span
                      v-show="keyword != ''"
                      class="name-line-top"
                      v-html="item.nickName"
                    ></span>
                  </div>
                </div> -->
                <div v-if="item.isAdmin==0" class="display-flex">
                    <img style="margin-right:12px;" src="../../assets/images/active.png" v-if=" item.checked || item.disable">
                    <img style="margin-right:12px" src="../../assets/images/dis.png" v-else>
                  <div class="item-left">
                    <img
                      class="avatar"
                      :src="global.fileDownUrl + 'compress/' + item.headImg"
                      v-headError v-if="item.headImg"
                    />
                    <img class="avatar" src="../../assets/images/error-head.png"  v-if="!item.headImg">
                    <span
                      class="select"
                    ></span>
                  </div>
                  <div class="display-flex-item">
                    <span v-show="keyword == ''">{{  item.notes||item.nickName }}</span>
                    <span
                      v-show="keyword != ''"
                      class="name-line-top"
                      v-html=" item.notes||item.nickName"
                    ></span>
                  </div>
                </div>
              </li>
          </ul>
        </div> 
        </div>
        <success v-model="showSuccess" :title="$t('msg.forbidden.addSuccess')"></success>
      </div>
       </div>
      <EditPopup v-model="showname" :title="$t('msg.group.changeGroupName')" :placeholderText="$t('msg.group.editGroupName')"
        @change="setNickname" v-if="showname"></EditPopup>
    </div>
  </transition>
</template>
<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import Msg from "@/tools/msg";
import { EchatDB } from "@/tools/indexedDB";
import {friendDB} from "@/session/friend/friendDB";
import { friend } from "@/session/friend";
import { group } from "@/session/group";
import { localStore } from "@/tools/localStorage";
import { api } from "@/api";
  export default {
    name: "forward",
    data() {
      return {
        showBox: false,
        showAddForbidden: false,
        isForbiddenAll: false,
        isForbidFriend: false,
        isForbidTemp: false,
        groupMember: {},
        keyword: "",
        forwardResult: {},
        selectList: {},
        selectlist:[],
        tempHeadImg: "./static/images/chat/img-username.png",
        showSuccess: false,
        isAdmin: false,
        isInvite: true,
        isSet: true,
        showname: false,
        affiche: "",
        showsetCycle: false,
        clearType: null,
        moreSetting:false,
        showbanned:false,
        addbiddens:false
      };
    },
    computed: {
      ...mapGetters(["userId", "currentSession"]),
      groupUserList() {
        if (this.$store.state.activityGroupMembers) {
          return Object.values(this.$store.state.activityGroupMembers);
        }
        return [];
      },
      biddenlist() {
      let list = [];
      for (let key in this.groupMember) {
        if (this.groupMember[key].isBanned) {
          list.push(this.groupMember[key]);
        }
      }
      return list;
    },

      memberList() {
        if (!this.keyword) {
          for (var i = 0; i < this.groupUserList.length; i++) {
            if (this.groupUserList[i].isAdmin == 1) {
              this.groupUserList[i].sort = 2;
            } else if (this.groupUserList[i].isAdmin == 2) {
              this.groupUserList[i].sort = 1;
            } else {
              this.groupUserList[i].sort = 0;
            }
          }
          let sortlist = this.groupUserList.sort((a, b) => b.sort - a.sort);
          return sortlist;
        } else {
          let list = [];
          let arr = this.groupUserList;
          for (var i = 0; i < arr.length; i++) {
            if ((arr[i].notes&&arr[i].notes.indexOf(this.keyword) >= 0)||arr[i].nickName.indexOf(this.keyword) >= 0) {
              list.push(arr[i]);
            }
          }
          return list;
        }
      },
      unSelectList() {
        if (!this.keyword) {
          let list = Object.values(this.groupMember);
          for (var i = 0; i < list.length; i++) {
            if (list[i].isAdmin == 1) {
              list[i].sort = 2;
            } else if (list[i].isAdmin == 2) {
              list[i].sort = 1;
            } else {
              list[i].sort = 0;
            }
          }
          let sortlist = list.sort((a, b) => b.sort - a.sort);

          return sortlist;
        } else {
          let list = [];
          for (let key in this.groupMember) {
            if ((this.groupMember[key].notes&&this.groupMember[key].notes.indexOf(this.keyword) >= 0)||this.groupMember[key].nickName.indexOf(this.keyword) >= 0) {
              list.push(this.groupMember[key]);
            }
          }
          return list;
        }
      },
    },
    methods: {
      show() {
        this.isAdmin = false
        this.isInvite = true
        this.showsetCycle=false
        this.moreSetting=false
        this.showbanned=false
        this.addbiddens=false
        this.showSuccess=false
        this.isForbidTemp=false
        this.isForbidFriend=false
        this.isForbiddenAll = false
        this.clearType=null
        api
          .getGroupSetting({
            groupId: this.currentSession.paramId,
          })
          .then((data) => {
            if (data) {
              if (data.isBanned == 1) {
                this.isForbiddenAll = true;
              }
              if (data.isFriend == "1") {
                this.isForbidFriend = true;
              }
              if (data.isForbidChat == "1") {
                this.isForbidTemp = true;
              }
              if (data.isInvite == 1) {
                this.isInvite = false;
              }
              if(data.cleanMsgCycle){
                this.clearType = data.cleanMsgCycle
              }
              //更新群信息
              group.updateGroupInfo(data);
              this.$store.state.groupList[data.groupId] = JSON.parse(
                JSON.stringify(data)
              );
              let sessionCache = this.$store.state.session.record[
                this.currentSession.paramId + "-" + this.currentSession.fromType
              ];
              sessionCache.isTop = data.isTop;
              sessionCache.isInterruption = data.isInterruption;
              sessionCache.isShowMemberNick = data.isShowMemberNick;
              if (data.isBanned) {
                sessionCache.isBanned = 1;
              } else {
                if (data.userIsBanned) {
                  sessionCache.isBanned = 2;
                } else {
                  sessionCache.isBanned = 0;
                }
              }
              //判断自己在本群的角色
              let self = this.$store.state.activityGroupMembers[this.userId];
              if (!self) {
                self = {};
              }
              if (self.isAdmin > 0) {
                sessionCache.isBanned = 0;
                this.isAdmin = true;
              }
              sessionCache.isFriend = data.isFriend;
              sessionCache.isForbidChat = data.isForbidChat;
              this.$store.commit(
                "UPDATE_CURRENT_SESSION",
                JSON.parse(JSON.stringify(sessionCache))
              );
            }
          });
        this.showAddForbidden = false;
        this.selectList = {};
        this.showBox = true;

        let list = JSON.parse(
          JSON.stringify(this.$store.state.activityGroupMembers)
        );
        for (let key in list) {
          list[key].checked = false;
          list[key].isClick = false;
        }
        this.groupMember = list;
        this.getGroupAffiche();
      },
      ivent() {
        if (!this.isInvite) {
          this.$store.commit("SET_TOAST_TEXT", this.$t("msg.groupInfo.info"));
          return;
        } else {
          this.$parent.$parent.$refs.groupInformation.showInvite = true;
        }
      },
      addbidden(){
        this.addbiddens=true,
        this.showSuccess=false
        this.selectList={}
      },
      setCycle(type) {
      let confString = JSON.stringify({ cleanMsgCycle: type + "" });
      if (this.currentSession.fromType == "1") {
        let obj = {
          groupId: this.currentSession.paramId,
          confString: confString
        };
        this.$http.setGroupSetting(obj).then(
          () => {
            this.clearType = type;
            this.$store.dispatch("getReadNum", {
              groupId: this.currentSession.paramId
            });
          },
          () => {}
        );
      } else {
        let obj = {
          recipient: this.currentSession.paramId,
          confString: confString,
          type:0
        };
        if (this.currentSession.temp) {
          obj.type = 1;
        }
        this.$http.setFriendSetting(obj).then(() => {
          this.clearType = type;
          friend.getNetworkSession(this.currentSession.paramId);
        });
      }
    },
      showclear() {
        this.$parent.$parent.$refs.chatheader.showCleanHistory = true;
      },
      showUserName() {
        let confString;
        if (this.currentSession.isShowMemberNick == 0) {
          confString = JSON.stringify({
            isShowMemberNick: 1
          });
        } else {
          confString = JSON.stringify({
            isShowMemberNick: 0
          });
        }
        let obj = {
          groupId: this.currentSession.paramId,
          confString: confString,
        };
        this.$http.setGroupSetting(obj).then(
          () => {
            if (this.currentSession.isShowMemberNick == 0) {
              this.currentSession.isShowMemberNick = 1;
            } else {
              this.currentSession.isShowMemberNick = 0;
            }
            if (
              this.$parent.$parent.$refs.list.scrollTop + 500 >
              this.$parent.$parent.$refs.list.scrollHeight
            ) {
              setTimeout(() => {
                this.$parent.$parent.$refs.list.scrollTop = this.$parent.$parent.$refs.list.scrollHeight;
              }, 200);
            }
            this.$store.commit("UPDATE_SESSION", this.currentSession);
          },
          () => {}
        );
      },
      disturbing() {
        let confString;
        if (this.currentSession.isInterruption == 0) {
          confString = JSON.stringify({
            isInterruption: 1
          });
        } else {
          confString = JSON.stringify({
            isInterruption: 0
          });
        }
        let obj = {
          groupId: this.currentSession.paramId,
          confString: confString,
        };
        this.$http.setGroupSetting(obj).then(
          () => {
            if (this.currentSession.isInterruption == 0) {
              this.currentSession.isInterruption = 1;
            } else {
              this.currentSession.isInterruption = 0;
            }
            this.$store.commit("UPDATE_SESSION", this.currentSession);
          },
          () => {}
        );
      },
      showAffiche(){
        this.$parent.$parent.showAffiche(this.affiche,this.afficheType,this.isAdmin);
      },
      modifyGroup(Type) {
        this.$parent.$parent.$refs.groupInformation.modifyGroup(Type);
      },
      addGroupUser(isAdmin) {
        this.$parent.$parent.$refs.groupInformation.addGroupUser(isAdmin);
      },
      openNickNameEdit(item) {
        this.$parent.$parent.$refs.groupInformation.openNickNameEdit(item);
        
      },
      getGroupAffiche() {
        this.$http
          .getGroupAffiche({
            groupId: this.currentSession.paramId
          })
          .then((data) => {
            this.affiche = data && data.affiche ? data.affiche : "";
            this.afficheType = data && data.type ? data.type : 0;
            1;
          });
      },
      setNickname(text) {
        if (text == "" || !text) {
          this.$store.commit(
            "SET_TOAST_TEXT",
            this.$t("msg.newGroup.enterGroupName")
          );
          return;
        }
        let confString = {
          groupName: text,
        };
        confString = JSON.stringify(confString);
        this.$http
          .setGroupSetting({
            groupId: this.currentSession.paramId,
            confString: confString,
          })
          .then(
            (data) => {
              this.$store.commit("SET_TOAST_TEXT", data);
              this.$parent.$parent.$refs.groupInformation.getGroupSetting();
            },
            () => {}
          );
        this.showname = false;
      },
      dissolveChat() {
        this.$parent.$parent.$refs.chatheader.showConfirm = true;
        this.$parent.$parent.$refs.chatheader.isAdmin = 1;
      },
      deleteExit() {
        this.$parent.$parent.$refs.chatheader.showConfirm = true;
        this.$parent.$parent.$refs.chatheader.isAdmin = 0;
      },
      forbiddenAll() {
        this.$message({
          confirmButtonText: this.$t("msg.common.confirm"),
          cancelButtonText: this.$t("msg.common.cancel"),
          showCancelButton: true,
          title: this.$t("msg.forbidden.forbiddenAll"),
          message: this.$t("msg.forbidden.confirm") +
            `${
            this.isForbiddenAll
              ? this.$t("msg.msgPanel.cancel")
              : this.$t("msg.msgPanel.open")
          }` +
            this.$t("msg.forbidden.forbiddenAll") +
            "?",
        }).then(
          (data) => {
            this.$http.forbiddenWord({
                Type: this.isForbiddenAll ? 2 : 1,
                groupId: this.currentSession.paramId,
                userIds: "",
              }).then(
                res => {
                this.isForbiddenAll = !this.isForbiddenAll;
              });
          },
          (data) => {}
        );
      },
      addForbidden() {
        if (this.isForbiddenAll) {
          this.$store.commit(
            "SET_TOAST_TEXT",
            this.$t("msg.forbidden.cancelForbidden")
          );
          return;
        }
        this.showAddForbidden = true;
      },
      clickChecked(item) {
        if (!item.checked) {
          this.$set(this.selectList, item.userId, item);
          this.selectlist.push(item)
          item.checked = true;
        } else {
          let idx = (this.selectlist).findIndex(v=>v.userId==item.userId)
          this.deleteChecked(item,idx);
          item.checked = false;
        }
      },
      deleteChecked(item,idx) {
        this.$delete(this.selectList, item.userId);
        this.selectlist.splice(idx, 1)
        if (this.groupMember[item.userId]) {
          this.groupMember[item.userId].checked = false;
        }
      },
      getCheckedArr(list) {
        var result = "";
        if (list) {
          for (var key in list) {
            result += list[key].paramId + ",";
          }
          result = result.substr(0, result.length - 1);
        } else {
          result = "";
        }
        return result;
      },
      unforbiddenOne(item) {
        item.isBanned = 0;
        let idStr = "";

        for (let key in this.groupMember) {
          if (this.groupMember[key].isBanned) {
            idStr = idStr + this.groupMember[key].userId + ",";
          }
        }

        this.forbiddenOne(idStr.replace(/,$/, ""));
      },
      addFinish(item) {
        item.isBanned = 0;
        let idStr = "";

        for (let key in this.groupMember) {
          if (this.groupMember[key].isBanned || this.groupMember[key].checked) {
            idStr = idStr + this.groupMember[key].userId + ",";
          }
        }
        this.showSuccess=true
        setTimeout(() => {
          this.addbiddens=false
        }, 2000);
        this.forbiddenOne(idStr.replace(/,$/, ""));
      },
      forbiddenOne(str) {
        this.$http
          .forbiddenWord({
            Type: 3,
            groupId: this.currentSession.paramId,
            userIds: str,
          })
          .then((data) => {
            this.$store.commit("SET_TOAST_TEXT", data);

            for (let key in this.groupMember) {
              if (this.groupMember[key].checked) {
                this.groupMember[key].isBanned = 1;
                this.groupMember[key].checked = false;
              }
            }

            this.$store.commit("SET_GROUP_MEMBER", this.groupMember);
            group.updateGroupMember(this.groupMember);

            this.showAddForbidden = false;
          });
      },
      groupSetting(type) {
        let confString = "";
        if (type == "temp") {
          confString = {
            isForbidChat: this.currentSession.isForbidChat == 1 ? 0 : 1,
          };
          let obj = {
            groupId: this.currentSession.paramId,
            confString: JSON.stringify(confString),
          };

          this.$message({
            title: this.$t("msg.forbidden.banedTemp"),
            message: this.$t("msg.forbidden.confirm") +
              (this.currentSession.isForbidChat == 1 ?
                this.$t("msg.msgPanel.cancel") :
                this.$t("msg.msgPanel.open")) +
              this.$t("msg.forbidden.banedTemp") +
              "？",
            showCancelButton: true,
            confirmButtonText: this.$t("msg.common.confirm"),
            cancelButtonText: this.$t("msg.common.cancel"),
          }).then(
            () => {
              this.$http.setGroupSetting(obj).then(
                () => {
                  this.settingHandler(type);
                },
                () => {}
              );
            },
            () => {}
          );
        } else if (type == "friend") {
          confString = {
            isFriend: this.currentSession.isFriend == 1 ? 0 : 1,
          };
          let obj = {
            groupId: this.currentSession.paramId,
            confString: JSON.stringify(confString),
          };

          this.$message({
            title: this.$t("msg.forbidden.banedAddFriend"),
            message: this.$t("msg.forbidden.confirm") +
              (this.currentSession.isFriend == 1 ?
                this.$t("msg.msgPanel.cancel") :
                this.$t("msg.msgPanel.open")) +
              this.$t("msg.forbidden.banedAddFriend") +
              "？",
            showCancelButton: true,
            confirmButtonText: this.$t("msg.common.confirm"),
            cancelButtonText: this.$t("msg.common.cancel"),
          }).then(
            () => {
              this.$http.setGroupSetting(obj).then(
                () => {
                  this.settingHandler(type);
                },
                () => {}
              );
            },
            () => {}
          );
        }
      },
      settingHandler(type) {
        switch (type) {
          case "temp":
            if (this.currentSession.isForbidChat == 0) {
              this.currentSession.isForbidChat = 1;
            } else {
              this.currentSession.isForbidChat = 0;
            }

            this.isForbidTemp = !this.isForbidTemp;
            this.$store.commit("UPDATE_SESSION", this.currentSession);
            break;
          case "friend":
            if (this.currentSession.isFriend == 0) {
              this.currentSession.isFriend = 1;
            } else {
              this.currentSession.isFriend = 0;
            }

            this.isForbidFriend = !this.isForbidFriend;
            this.$store.commit("UPDATE_SESSION", this.currentSession);
            break;
          default:
            return;
        }
      },
    },
    mounted() {
      this.clearType =
        localStore.readRegularCleaning(this.currentSession.paramId)
        .cleanMsgCycle || 0;
    },
  };

</script>

<style lang="scss" scoped>
  @import "../../assets/css/var";

  //发起新群聊弹窗
  .forbidden-box {
    z-index: 500;
    .forbidden {
      width: 731px;
      height: 492px;
      position: absolute;
      top: 50%;
      left: 50%;
      background: #fff;
      transform: translate(-50%, -50%);
      box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
      opacity: 0.98;
      border-radius: 8px 8px 8px 8px;
      display: flex;
      text-align: left;

      .left {
        border-radius: 8px 8px 8px 8px;
        width: 260px;
        height: 100%;
        padding-top: 82px;
        background: url(../../assets/images/index/user-back.png);
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .code {
          position: absolute;
          right: 22px;
          top: 27px;
          cursor: pointer;
        }

        .head-img {
          width: 154px;
          height: 154px;
          background: url(../../assets/images/index/head-img.png);
          display: flex;
          justify-content: center;
          margin: 0 53px 0 53px;
          position: relative;

          .avatar {
            width: 80px;
            height: 80px;
            position: absolute;
            bottom: 43px;
            border-radius: 40px;
          }

          .default {
            width: 80px;
            height: 80px;
            position: absolute;
            bottom: 43px;
            border-radius: 40px;
            text-align: center;
            line-height: 80px;
            font-weight: 550;
            font-size: 28px;
            color: #fff;
            cursor: pointer;
          }
        }

        .name-sex {
          display: flex;

          .name {
            color: $name-color;
            font-size: 18px;
            display: inline-block;
            max-width: 120px;
          }

          .female {
            display: inline-block;
            margin-left: 8px;
            background: #fff url(../../assets/images/female.png);
            width: 24px;
            height: 24px;
          }

          .male {
            display: inline-block;
            margin-left: 8px;
            background: #fff url(../../assets/images/male.png);
            width: 24px;
            height: 24px;
          }
        }

        .nikename {
          color: #5f717f;
          margin-top: 20px;
        }

        .message {
          width: 220px;
          height: 40px;
          background: $color-theme;
          border-radius: 4px;
          color: #fff;
          line-height: 40px;
          margin-top: 76px;
        }

        .share {
          color: $color-theme;
          position: absolute;
          bottom: 30px;
          cursor: pointer;
        }
      }

      .right {
        border-radius: 8px 8px 8px 8px;
        width: 472px;
        height: 100%;
        // background: rgba($color: #8D95A2, $alpha: .1);

        .top {
          width: 432px;
          height: 80px;
          border-bottom: 1px solid #e1e6ec;
          margin-left: 20px;
        }

        .personal {
          padding: 48px 18px 13px 18px;
          font-size: 16px;
          line-height: 16px;
          border-bottom: 2px solid $color-theme;
          color: $color-theme;
          display: inline-block;
          cursor: pointer;

          &.active {
            color: #8d95a2;
            border: 0;
          }
        }

        .user-info {
          margin-top: 8px;
          padding: 0 20px;
          position: relative;
          height: 402px;
          width: 472px;

          .info {
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            
            &.add {
              cursor: pointer;

              &:hover {
                background: $active-backgroup;
              }
            }

            span {
              color: #8d95a2;
            }

            .showname {
              color: #5f717f;
              margin-right: 18px;
            }

            .showaffiche {
              display: inline-block;
              max-width: 200px;margin-right: 20px;
              color: #5f717f;
              overflow: hidden; //文本隐藏
              white-space: nowrap; //文本不换行
              text-overflow: ellipsis; //省略号
            }

            img {
              cursor: pointer;
            }

            .icon-s {
              width: 24px;
              height: 25px;
              background: url(../../assets/images/icon/sss.png);

              &.active {
                transition: all 0.2s linear;
                background: url(../../assets/images/icon/sss180.png);
              }
            }
          }

          .cyclelist {
            font-size: 14px;
            li {
              height: 48px;
              display: flex;
              align-items: center;
              cursor: pointer;

              &:hover {
                background: $active-backgroup;
              }

              .pot {
                width: 20px;
                height: 20px;
                display: inline-block;
                margin: 0 20px;
                background: url(../../assets/images/icon/select.png);

                &.check {
                  background: url(../../assets/images/icon/check.png);
                }
              }
            }
          }
          .moreset{
            width: 434px;
            height: 430px;
            font-size: 14px;
            .icon{
              display: inline-block;
              width: 20px;
              height: 20px;
              cursor: pointer;
              background:  url(../../assets/images/icon/select.png);
              &.selected{
                background:  url(../../assets/images/icon/select-blue.png);
              }
            }
            .text{
              color: #8D95A2;
              font-size: 12px;
              margin-left: 30px;
              margin-top: 15px;
            }
            .set{
              margin-left: 90px;
              margin-top: 8px;
              position: relative;
              cursor: pointer;
              .title{
                color: #5F717F;
                font-size: 14px;
                margin-left: 8px;
              }
              .arrows{
                position: absolute;
                right: 35px;
                display: inline-block;
                width: 7px;
                height: 12px;
                background:url(../../assets/images/chat/icon-arrow-right.png);
                &.active{
                  transform: rotate(90deg);
                }
              }
            }
            .biddenlist{
              position: relative;
              height: 120px;
              .delete-icon {
                display: inline-block;
                width: 24px;
                height: 24px;
                margin-right: 10px;
                background: url(../../assets/images/delete.png);
                background-size: 100%;
                cursor: pointer;
              }

              .no-more {
                height: 44px;
                padding: 10px 15px;
                text-align: center;
                font-size: 14px;
                color: #999;
              }
              .list-item{
                padding-left: 124px;
                .avatar{
                width: 37px;
                height: 37px;
                border-radius: 50%;
                margin-right: 14px;
              }
              .default{
                text-align: center;
                width: 37px;
                height: 37px;
                line-height: 37px;
                border-radius: 50%;
                color: #fff;
                margin-right: 14px;
              }
              }
              
            }
            
          }
        }
      }
    }
  }
  .my-popup-content{
      width: 731px;
      height: 492px;
      background: #ffffff;
      box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
      opacity: 0.98;
      border-radius: 8px 8px 8px 8px;
      display: flex;
      .left{
      width: 260px;
      height: 492px;
      background: #FFFFFF;
      .btn{
      display: flex;
      justify-content:center;
      margin-top: 40px;
      width: 100%;
      .comfirm{
        height: 40px;
        width: 115px;
        margin-left: 10px;
      }
      .cannel{
        height: 40px;
        margin-left: 10px;
        margin-right: 10px;
        width: 115px;
      }
    }
      .selected{
        color: #5F717F;
        text-align: left;
        margin: 40px 0 30px 0;
        padding-left: 20px;
      }
      .unselected-list{
        border-top:0px;
        .friend-list{
          border-top:0px;
          height: 305px;
          .friend-list-item{
            padding-left: 20px;
          }
        }
      }
    }
    .right{
      width: 471px;
      height: 492px;
      .search-input{
        margin-top:27px ;
        margin-left: 40px;
        width: 391px;
        height: 34px;
        background: #F4F7FA;
        border-radius: 17px;
        input{
          width: 391px;
          height: 34px;
          background: #F4F7FA;
          border: 1px solid #E1E6EC;
          border-radius: 17px;
          padding: 15px;
        }
      }
      .unselected-list{
        border-top:0px;
        .friend-list{
          border-top:0px;
          height: 426px;
        }
      }
    }
  }
</style>
