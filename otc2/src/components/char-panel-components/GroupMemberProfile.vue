<template>
  <transition name="scale-x">
    <Popup :hideHeader="true" :radius="'8'">
      <div class="friend-profile" v-if="showProfile" slot="body">
        <!-- <div class="border"></div> -->
        <div class="profile-content">
          <!-- <span class="popup-close" @click="hide"></span> -->
          <div class="user-head display-flex" @click.stop=";">
            <div class="display-flex-item">
              <div style="margin-top:20px;" class="name-box">
                <span class="user-name">{{
                  friendInfo.nickName
                }}</span>
                <p class="sex" :class="{ male: friendInfo.gender == 1 }" style="margin-top:-3px"></p>
              </div>
              <span style="color:#3150F0;margin-bottom:10px;display: inline-block;" v-if="friendInfo.alias">
                @{{friendInfo.alias}}</span>
              <span class="share" @click="sharecard" v-if="isFriend"><img src="../../assets/images/icon/share.png"></span>
              <span class="black" :class="{one:!isFriend}" @click="goinblock">
                <img v-if="!inBlack" src="../../assets/images/icon/black.png">
                <img v-if="inBlack" src="../../assets/images/icon/inblack.png" >
              </span>
            </div>
            <div class="user-avatar">
              <img class="img" :src="global.fileDownUrl + 'compress/' + friendInfo.avatar" ondragstart="return false" v-if="friendInfo.avatar" v-headViewer v-headError />
              <img class="img" src="../../assets/images/error-head2.png" v-headViewer  v-if="!friendInfo.avatar">
              <!-- <span class="default" v-defaultHead v-if="!friendInfo.avatar" v-text="friendInfo.nickName"></span> -->
            </div>
          </div>
          <p class="information" style="margin-top:20px;color:#C0C0C0">{{ $t("msg.group.information") }}</p>
          <ul class="menu-list intro" @click.stop=";"  v-if="isFriend">
            <li class="menu-item nick">
              <span class="lable">{{ $t("msg.user.note") }}</span>
              <span v-show="!showEdit"  style="color:#5F717F">{{text}}</span>
              <input class="groupNickName display-flex-item" type="text" id="groupNickName" maxlength="20"
                v-model="text" placeholder="" @blur="edit" @keyup.enter="edit" :disabled="!showEdit"  v-show="showEdit" />
              <label class="edit" for="groupNickName" v-show="!showEdit" @click="showEdit=!showEdit"></label>
            </li>
          </ul>
          <ul class="menu-list intro" @click.stop=";"  v-if="!isFriend&&layout.child[0]!=currentSession.paramId">
            <li class="menu-item nick" v-if="groupNickName">
              <span class="lable">{{ $t("msg.groupInfo.groupNickName") }}</span>
              <span  style="color:#5F717F">{{groupNickName}}</span>
            </li>
          </ul>
          <ul class="menu-list intro" @click.stop=";">
            <li class="menu-item" style="margin-top:10px">
              <span class="lable">{{ $t("msg.user.region") }}</span>
              <span style="color:#5F717F">{{ address || $t("msg.common.nothing") }}</span>
            </li>
            <li class="menu-item signature">
              <span class="label">{{ $t("msg.user.signature") }}</span>
              <span class="title">{{
                friendInfo.signature 
              }}</span>
            </li>
          </ul>
          <!-- <div class="shield" :class="{ unshield: inBlack }" v-if="!isFriend&&isShow">
            <span class="btn" @click.stop="unShield" v-if="inBlack">{{
              $t("msg.menu.unShield")
            }}</span>
            <span class="btn" @click.stop="doShield" v-else>{{
              $t("msg.menu.doShield")
            }}</span>
          </div> -->
          <div class="btn-wrap" v-if="!isFriend">
            <span class="btn left send" :title="$t('msg.chatPanel.toSend')" @click="gotoChat(true)"
              v-if="!isForbidTemp">{{ $t("msg.chatPanel.toSend") }}</span>
            <span class="btn left add" :title="$t('msg.menu.addFriend')" @click.stop="doAddFriend()"
              v-if="!isForbidFriend && userId!=userInfo.userId">{{ $t("msg.menu.addFriend") }}</span>
          </div>
          <div class="btn-wrap" v-else>
            <span class="btn left send" @click="gotoChat(false)">{{
              $t("msg.chatPanel.toSend")
            }}</span>
            <span class="btn left deletes" @click="deletes(false)">{{
              $t("msg.detail.delete")
            }}</span>
          </div>
        </div>
      </div>
    </Popup>
  </transition>
</template>
<script>
import QRCode from "qrcode";
import { mapGetters } from "vuex";
import { EchatDB } from "@/tools/indexedDB";
import { Util } from "@/tools/utils";
import { group } from "@/session/group";
import {friendDB} from "@/session/friend/friendDB";
import { friend } from "@/session/friend"
import { msgManager } from "@/session/msgManager";
import { api } from "@/api";
  export default {
    name: "member-profile",
    data() {
      return {
        userId: 0,
        groupId: 0,
        showProfile: false,
        // showNote: false,
        friendInfo: {},
        address: "",
        showQrCode: false,
        isFriend: false,
        isForbidFriend: false,
        isForbidTemp: false,
        inBlack: false,
        twoType: false,
        isShow: true,
        showEdit: false,
        text: "",
        groupNickName:'',
      };
    },
    components: {
      QRCode
    },
    computed: {
      ...mapGetters(["userInfo", "currentSession", "message", "layout"])
    },
    methods: {
      show() {
        let id = this.layout.child[0];
        this.userId = id;

        if (
          this.$store.state.friendList[id] &&
          !this.$store.state.friendList[id].temp
        ) {
          this.isFriend = true;
        }
        if (this.isFriend) {
          this.$http.getFriendInfo({
            recipient: this.userId
          }).then(data => {
            this.friendInfo = data;
            this.text = this.friendInfo.notes
            this.address = this.friendInfo.stateCode + '/' + this.friendInfo.countryCode;
            if (data.blacklistState == -1) {
              this.inBlack = true;
            }
          })
          this.showProfile = true;
        } else {
          let gId = this.layout.child[1];
          if (!gId) {
            this.groupId = this.currentSession.paramId;
          } else {
            this.groupId = gId;
            this.twoType = true;
          }
          this.$http.searchInfo({
            ids: id
          }).then(data => {
            if (!data) {
              this.$store.commit(
                "SET_TOAST_TEXT",
                this.$t("msg.groupInfo.userLeave")
              );
            } else {
              this.friendInfo = data[0];
              if (data.avatar) {
                info.headImg = data.avatar;
              }
              if (this.friendInfo) {
                this.address = this.friendInfo.stateCode + ' ' + this.friendInfo.countryCode;
              } else {
                this.address = '';
              }
              if (this.friendInfo.isBlacklist) {
                this.inBlack = true;
              }
            }
            if(this.layout.child[0]!=this.currentSession.paramId){
              this.$http.getMemberInfo({
                groupId: this.groupId,
                memberId: id
              }).then(data => {
                if(data.nickName == data.groupNickName){
                  this.groupNickName = null
                } else{
                  this.groupNickName = data.groupNickName
                }
                
              })
            }
            this.showProfile = true;
          });
        }
      },
      goinblock() {
        if (this.inBlack) {
          this.unShield()
        } else {
          this.doShield()
        }
      },
      sharecard() {
        let userInfo = this.$store.state.friendList[this.userId];
        let forwardInfo = {
          show: true,
          body: [{
            msgType: 32,
            bodyContent: {
              alias: userInfo.alias,
              avatar: userInfo.avatar,
              nickName: this.friendInfo.nickName,
              remark: null,
              userId: userInfo.userId
            }
          }]
        };
        this.hide()
        this.$store.commit("SET_FORWARD_INFO", forwardInfo)
      },
      hide() {
        this.$store.dispatch("setLayout", ["", "", false]);
      },
      useqrcode(path) {
        var canvas = document.getElementById("qrcodeCard");
        QRCode.toCanvas(canvas, path, error => {
          if (error) console.error(error);
        });
      },
      showCode() {
        this.$http.getShareUrl({}).then(data => {
          this.showQrCode = true;
          let url = data + `?XA${this.userId}`;
          this.useqrcode(url);
        });
      },
      doAddFriend() {
        // var groupInfo = this.$store.state.groupList[this.groupId];
        var postData = {
          recipient: this.userId,
          source: 6,
          // sourceDescribe: `${groupInfo.groupId},${groupInfo.groupName}`
        };
        this.$http.addFriend(postData).then(
          res => {
            this.gotoChats(res.data)
          }
        );
      },
      //删除好友
      deletes() {
        this.$message({
          confirmButtonText: this.$t("msg.common.ensure"),
          cancelButtonText:this.$t("msg.common.cancel"),
          title: this.$t("msg.detail.delete"),
          message: this.$t("msg.detail.confirmDelete"),
          showCancelButton: true
        }).then(data => {
          this.$http.deleteFriend({
            recipient: this.userId
          }).then(() => {
            this.$store.dispatch("setLayout", ["", "", false])
            friendDB.deleteFriend(+this.userId);
            friend.getFriendAll().then(data => {
              this.$store.commit("SET_FRIEND_LIST", data)
            })
            this.$store.commit('DEL_FRIEND_INFO', Number(this.userInfo.userId));
            this.$store.commit("DELETE_SESSION", this.userId + '-0');
            msgManager.removeMsgAll(0, this.userId);
            if (this.currentSession.paramId == this.userId) {
              this.$store.commit("UPDATE_CURRENT_SESSION", {});
              setTimeout(() => {
                let list = Object.values(this.$store.state.session.record);
                list.sort((a, b) => b.userTime - a.userTime);
                let sessionCache = this.$store.state.session.record;
                for (let key in sessionCache) {
                  if (sessionCache[key].isActivity) {
                    sessionCache[key].isActivity = false;
                  }
                }
                list[0].isActivity = true;
                this.$store.commit("UPDATE_CURRENT_SESSION", list[0]);
              }, 100);
            }
          });
        });
      },
      gotoChats(item) {
        item.fromType = 0
        let sessionCache = this.$store.state.session.record;
        for (let key in sessionCache) {
            if (sessionCache[key].isActivity) {
              sessionCache[key].isActivity = false;
            }
          }
        var chat = this.$store.state.session.record[item.userId + '-' + item.fromType];
        if (!chat) {
          var newChat = {
            img: item.avatar,
            lastReadId: 0,
            mId: 0,
            fromType: item.fromType,
            msgType: 1,
            preview: "",
            userTime: new Date().getTime()
          };
          if (item.fromType == 0) {
            newChat.name = item.nickName
            newChat.paramId = item.userId;
          }
          if (item.fromType == 1) {
            newChat.name = item.groupName;
            newChat.paramId = item.groupId;
          }
          newChat.temp = true
          newChat.isActivity = true
          this.$store.commit("UPDATE_SESSION", newChat)
          this.$store.commit("UPDATE_CURRENT_SESSION", newChat)
          this.$store.dispatch("setLayout", ["", "", false])
        } else {
          chat.isActivity = true
          chat.temp = false
          this.$store.commit("UPDATE_CURRENT_SESSION", JSON.parse(JSON.stringify(chat)))
        }
        this.$store.dispatch("setLayout", ["", "", false])
        this.$store.commit("SET_TOAST_TEXT", this.$t("msg.msgPanel.isSuccess"))
        this.$store.dispatch("getFriendList", {}).then(data => {
          friendDB.updateFriendBatch(data).then(data => {
            this.$store.commit("SET_FRIEND_LIST", data);
          });
        });
      },
      doShield() {
        let obj = {
          treatedIds: this.userId,
          state: 6
        };
        this.$http.addBlackList(obj).then(() => {
          this.$store.commit("SET_TOAST_TEXT", this.$t("msg.tip.forbiddenUser"));
          this.inBlack = true
          this.$parent.$refs.chat.$refs.chatHistory.$refs.chatheader.inBlack = true
        });
      },
      unShield() {
        let obj = {
          treatedIds: this.userId
        };
        this.$http.removeBlackList(obj).then(() => {
          this.$store.commit(
            "SET_TOAST_TEXT",
            this.$t("msg.tip.unForbiddenUser")
          );
          this.inBlack = false
          this.$parent.$refs.chat.$refs.chatHistory.$refs.chatheader.inBlack = false
        });
      },
      gotoChat(temp) {
        if(this.currentSession.paramId == this.userId) {
          this.$store.dispatch("setLayout", ["", "", false]);
          return
        }
        let session = ""
        if (this.twoType) {
          let groupInfo = this.$store.state.groupList[this.groupId];
          session = {
            paramId: groupInfo.groupId,
            name: groupInfo.groupName
          };
        } else {
          session = this.currentSession
        }
        this.$store.commit("SET_ROUTE_NAME", "chat")
        var chat = this.$store.state.session.record[this.userId + '-0']
        if (!chat)  {
          chat = {
            img: this.friendInfo.avatar,
            lastReadId: 0,
            mId: 0,
            fromType: 0,
            msgType: 1,
            preview: "",
            userTime: new Date().getTime(),
            name: this.friendInfo.nickName,
            paramId: this.userId,
            isTop: 0,
            isInterruption: 0
          }
          if (temp) {
            chat.temp = temp;
            chat.describe = `${session.paramId},${session.name}`;
          }
          this.$store.commit("UPDATE_SESSION", chat);
        }

        this.$store.commit("CLEAR_MESSAGE", {});
        setTimeout(() => {
          let sessionCache = this.$store.state.session.record;
          for (let key in sessionCache) {
            if (sessionCache[key].isActivity) {
              sessionCache[key].isActivity = false;
            }
          }
          chat.isActivity = true;
          this.$store.commit("UPDATE_CURRENT_SESSION", chat);
        }, 500);
        this.$store.dispatch("setLayout", ["", "", false]);
      },
      tempSession() {
        let session = "";
        if (this.twoType) {
          let groupInfo = this.$store.state.groupList[this.groupId];
          session = {
            paramId: groupInfo.groupId,
            name: groupInfo.groupName
          };
        } else {
          session = this.currentSession;
        }
        let obj = {
          sessionId: this.userId,
          state: 6,
          describe: `${session.paramId},${session.name}`
        };
        this.$http.startTempSession(obj).then(() => {
          this.gotoChat(true);
          this.friendInfo.temp = true;
          this.$store.commit("ADD_FRIEND_INFO", {
            userId: this.userId,
            info: this.friendInfo
          });
        });
      },
      edit() {
        if (this.text == this.friendInfo.notes) {
          this.showEdit = false;
          return false
        }

        let obj = {
          recipient: this.userId,
          confString: {
            notes: this.text || ""
          }
        };
        obj.confString = JSON.stringify(obj.confString);
        this.$http.setRemark(obj).then(
          res => {
          friend.getNetworkSession(this.userId);
          friend.getFriendAll(true)
          }, () => {}
        );
        this.showEdit = false;
      },
    },
    mounted() {
      this.show();
      // console.log( this.$parent.$refs.chat.$refs);
    }
  };

</script>

<style lang="scss" scoped>
  @import "../../assets/css/var";

  .default {
    position: absolute;
    top: 0;
    left: 0;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    text-align: center;
    line-height: 70px;
    font-weight: 550;
    color: #fff;
  }

  .friend-profile {
    border-radius: 8px;
    position: relative;
    top: 0;
    left: 0;
    height: 478px;
    width: 340px;
    margin-top: 0;
    text-align: left;
    background: #FFFFFF;
    box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);

    .profile-content {
      border-radius: 8px;
      height: 478px;
      width: 340px;
      padding: 0 20px;
      border-left: 0;
      background: #FFFFFF;
      box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);

      .user-head {
        height: 134px;
        line-height: 28px;
        background: #fff;
        align-items: center;
        position: relative;

      .name-box{
        display: flex;
        height: 24px;
        align-items: center;
        .user-name{
          display: inline-block;
          max-width: 90px;
        }
    }
    
        .share {
          position: absolute;
          left: 18px;
          bottom: 22px;
          display: flex;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background:rgba(#6AA494, 0.1);  
          cursor: pointer;
        }

        .black {
          position: absolute;
          left: 54px;
          bottom: 22px;
          display: flex;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background:rgba(#6AA494, 0.1);  
          cursor: pointer;
          &.one {
            left: 18px;
          }
        }

        .user-avatar {
          width: 80px;
          height: 80px;
          margin-top: 20px;

          img {
            width: 80px;
            height: 80px;
          }
        }
      }

      .menu-list {
        border: 0px;
        padding: 0;
        background: #fff;

        .lable {
          color: #8D95A2;
          margin-right: 10px;
        }

        input {
          color: $title-color;
        }

        .title {
          color: $title-color;
          display: inline-block;
          width: 282px;
          height: 60px;
          background: #F7F8FD;
          border: 1px solid #ECF7F6;
          border-radius: 4px;
          padding: 0 10px;
        }
      }

      .signature {
        margin-top: 8px;
        padding-top: 8px;
        line-height: 28px;

        .label {
          display: block;
          color: #8D95A2;
        }
      }

      .shield {
        position: absolute;
        left: 0;
        bottom: 51px;
        width: 100%;
        text-align: center;

        .btn {
          line-height: 38px;
          color: $color-red;
          cursor: pointer;
        }
      }

      .unshield .btn {
        color: $color-theme;
      }

      .btn-wrap {
        position: absolute;
        left: 50%;
        bottom: 50px;
        width: 299px;
        height: 40px;
        transform: translate(-50%, 0);
        border-radius: 4px;
        text-align: center;

        .btn {
          flex: 1;
          height: 40px;
          font-size: 16px;
          line-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;

          &.left {
            color: #fff;
            background: $color-theme;
          }

          &.send {
            display: block;
            width: 100%;
          }

          &.deletes {
            display: block;
            width: 100%;
            background: #fff;
            color: $delete-color;
          }

          &.add {
            display: block;
            width: 100%;
            background: #fff;
            color: $color-theme;
          }
        }
      }
    }

    .popup-close {
      display: block;
      position: absolute;
      top: -14px;
      right: 10px;
      width: 10px;
      height: 10px;
      background: url(../../assets/images/chat/icon-window-close.png) center center no-repeat;
      cursor: pointer;
    }
  }

  .menu-item {
    position: relative;
    &.nick{
      display: flex;
      margin-top:10px;
    }
    .edit {
      display: inline-block;
      width: 28px;
      height: 27px;
      margin-left: 5px;
      background-image: url(../../assets/images/icon/edit2.png);
      background-size: 100% 100%;
      cursor: pointer;
    }
  }

</style>
