<template>
  <transition name="scale-x">
    <div class="my-popup invite-box" @click.stop="hide" v-show="invite.show">
      <div class="my-popup-content" @click.stop=";">
      <div class="left">
        <div class="selected">{{ $t("msg.chatPanel.selected") }}</div>
        <div class="unselected-list">
          <ul class="friend-list" v-scrollBar>
            <li
              class="friend-list-item display-flex"
              v-for="(item, index) in selectList"
              :key="index"
              @click="deleteChecked(item)"
            >
              <img style="margin-right:12px" src="../../assets/images/active.png" v-if=" item.checked">
              <div class="item-left">
              <img class="avatar" :src="global.fileDownUrl + 'compress/' + item.img" v-headError v-if="item.img" />
              <img class="avatar" src="../../assets/images/error-head.png"  v-if="!item.img">
              <!-- <span class="default" v-defaultHead v-if="!item.img" >{{ item.name }}</span> -->
                <span
                  class="name"
                  v-text="item.name"
                  @click="item.isClick = !item.isClick"
                ></span>
                </div>
            </li>
          </ul>
          <div class="btn">
          <button class="two-btn comfirm"  @click="doInvite">
            {{ $t("msg.common.confirm") }}
          </button>
          <button class="two-btn cannel"   @click="hide">
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
            <section v-for="(data, id) in sortSelectList" :key="id">
              <div v-if="data.data && data.data.length" class="sort-letter">
                {{ data.letter }}
              </div>
              <li
                class="friend-list-item display-flex"
                :class="{ active: item.checked, hide: item.temp ,opt:item.disable}"
                v-for="(item, index) in data.data"
                :key="index"
                @click="clickChecked(item)"
              >
                <img class="opts" style="margin-right:12px" src="../../assets/images/active.png" v-if=" item.checked || item.disable">
                <img style="margin-right:12px" src="../../assets/images/dis.png" v-else>
                <div class="item-left">
                  <img
                    class="avatar"
                    :src="global.fileDownUrl + 'compress/' + item.img"
                    v-headError
                    v-if="item.img"
                  />
                  <img class="avatar" src="../../assets/images/error-head.png"  v-if="!item.img">
                  <span
                    class="select"
                  ></span>
                </div>
                <div class="display-flex-item">
                  <span v-show="keyword == ''">{{ item.name }}</span>
                  <span
                    v-show="keyword != ''"
                    class="name-line-top"
                    v-html="item.tempName"
                  ></span>
                </div>
              </li>
            </section>
          </ul>
        </div> 
        </div>
        <Popup :hide-close="true" :hideHeader='true' :radius="10" v-if="isgo">
          <div class="content" @click.stop="" slot="body">
            <div>
              <div class="isforbid-box">
                <div style="margin-left:20px;text-align: left;">{{namelist}} {{ $t("msg.group.hadbeen") }}</div>
              </div>
            </div>
            <div class="btn">
              <button class="cancel" @click="cancelisgo">
                {{ $t("msg.common.cancel") }}
              </button>
              <button class="ensure" @click="goinvite">
                {{ $t("msg.common.ensure") }}
              </button>
            </div>
          </div>
        </Popup>
        <success v-model="showSuccess" :title="$t('msg.forbidden.addSuccess')"></success>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from "vuex";
  import { Util } from "@/tools/utils";
  import Msg from "@/tools/msg";
  export default {
    name: "invite",
    data() {
      return {
        keyword: "",
        friendList: {},
        forwardResult: {},
        selectList: {},
        sortSelectList: [],
        showSuccess: false,
        isgo: false,
        namelist: null,
        goinviteid: null,
        isExceed: null,
      };
    },
    computed: {
      ...mapGetters(["userInfo", "currentSession", "session", "invite"]),
      unSelectList() {
        if (!this.keyword) {
          return this.friendList;
        } else {
          let list = [];
          for (let key in this.friendList) {
            let item = this.friendList[key],
              tempId = item.userId;
            let m = PinyinMatch.match(item.name, this.keyword);
            if (m || (tempId + "").indexOf(this.keyword) >= 0) {
              if (m) item["tempName"] = this.redFont(item.name, m[0], m[1]);
              else item["tempName"] = item.name;
              var findId = (tempId + "").split(this.keyword);
              item["tempId"] = findId.join(
                '<span class="search-key">' + this.keyword + "</span>"
              );
              list.push(item);
            }
          }
          return list;
        }
      }
    },
    watch: {
      invite(ov, nv) {
        if (this.invite.show) {
          this.selectList = {};
          this.init().then(() => {
            this.noChecked();
          });
        }
      },
      keyword(ov, nv) {
        this.sortList();
      }
    },
    methods: {
      redFont(str, start, end) {
        return (
          str.substring(0, start) +
          '<span class="search-key">' +
          str.substring(start, end + 1) +
          "</span>" +
          str.substring(end + 1)
        );
      },
      hide() {
        this.$store.commit("SET_INVITE", {});
      },
      sortList() {
        this.sortSelectList = Util.sortByLetter(this.unSelectList);
      },
      noChecked() {
        let userList = this.$store.state.activityGroupMembers;
        for (let key in userList) {
          let item = userList[key];
          if (this.friendList[item.userId])
            this.friendList[item.userId].disable = true;
        }
        this.sortList();
      },
      init() {
        return new Promise(resolve => {
          this.friendList = JSON.parse(
            JSON.stringify(this.$store.state.friendList)
          );
          for (let key in this.friendList) {
            let item = this.friendList[key];
            this.$set(this.friendList[key], "checked", false);
            this.$set(this.friendList[key], "disable", false);
            this.$set(this.friendList[key], "isClick", false);
            this.$set(this.friendList[key], "fromType", 0);
            this.$set(this.friendList[key], "img", item.headImg);
            this.$set(
              this.friendList[key],
              "name",
              item.notes || item.nickName || item.userName
            );
            this.$set(this.friendList[key], "paramId", item.userId);
          }
          resolve();
        });
      },
      clickChecked(item) {
        if (item.disable) return;

        if (!item.checked) {
          this.$set(this.selectList, item.paramId, item);
          item.checked = true;
        } else {
          this.deleteChecked(item);
          item.checked = false;
        }
      },
      deleteChecked(item) {
        this.$delete(this.selectList, item.paramId);
        if (this.friendList[item.paramId])
          this.friendList[item.paramId].checked = false;
      },
      //获取邀请id
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
      //获取被禁止的id
      getgoinviteid(list, forbidList) {
        var result = "";
        if (list) {
          let list2 = {}
          forbidList.forEach(e => {
            list2[e] = list[e]
          })
          for (var key in list2) {
            result += list[key].paramId + ",";
          }
          result = result.substr(0, result.length - 1);
        } else {
          result = "";
        }
        return result;
      },
      //获取被禁止的用户名
      getCheckedname(list, forbidList) {
        var result = "";
        if (list) {
          let list2 = {}
          forbidList.forEach(e => {
            list2[e] = list[e]
          })
          for (var key in list2) {
            result += list[key].name + "，";
          }
          result = result.substr(0, result.length - 1);
        } else {
          result = "";
        }
        return result;
      },
      //获取继续邀请的id
      getCheckedId(list, forbidList) {
        var result = "";
        if (list) {
          let list2 = list
          forbidList.forEach(e => {
            delete list2[e]
          })
          for (var key in list2) {
            result += list2[key].paramId + ",";
          }
          result = result.substr(0, result.length - 1);
        } else {
          result = "";
        }
        return result;
      },
      //完成发送邀请
      doInvite() {
        let id = this.getCheckedArr(this.selectList);
        if (!id) {
          this.$store.commit("SET_TOAST_TEXT", this.$t("msg.newGroup.info"));
          return false;
        }
        this.$http
          .inviteGroupUser({
            groupId: this.invite.groupId,
            inviter: id
          })
          .then(
            data => {
              if (data.code == 0) {
                //全员没有被禁止直接进群
                if (data.data.forbidJoinUserId.length == 0) {
                  this.showSuccess = true;
                  setTimeout(() => {
                    this.showSuccess = false;
                    this.$store.commit("SET_INVITE", {
                      show: false,
                      groupId:''
                    });
                    this.$emit("inviteHandler", data);
                  }, 1500);
                } else if (data.data.forbidJoinUserId.length != 0 && !this.invite.isadmin) {
                  //普通邀请
                  this.$store.commit("SET_INVITE", {
                        show: false,
                        groupId:''
                      });
                  if(data.data.forbidJoinUserId.length>1){
                  let name = this.getCheckedname(this.selectList, data.data.forbidJoinUserId);
                  this.$message({
                    title: '',
                    showCancelButton: false,
                    message: name + this.$t("msg.group.byforbids")
                  }).then(
                    data => {
                    
                    }
                  )
                }else{
                  let name = this.getCheckedname(this.selectList, data.data.forbidJoinUserId);
                  this.$message({
                    title: '',
                    showCancelButton: false,
                    message: name + this.$t("msg.group.byforbid")
                  }).then(
                    data => {
                      
                    }
                  )
                }
                } else {
                  //管理员邀请
                  this.isgo = true
                  this.isExceed = 0
                  this.goinviteid = this.getgoinviteid(this.selectList, data.data.forbidJoinUserId);
                  this.namelist = this.getCheckedname(this.selectList, data.data.forbidJoinUserId);
                }
              } 
              else if (data.code == 101012) {
                //超过人数
                this.$message({
                  confirmButtonText: this.$t("msg.common.confirm"),
                  cancelButtonText: this.$t("msg.common.cancel"),
                  title: this.$t("msg.tip.tip"),
                  message: this.$t("msg.group.tip"),
                }).then(
                  data2 => {
                    //全员没有被禁止，全发送邀请消息
                    if (data.data.forbidJoinUserId.length == 0) {
                      this.doInvitationAgreeJoin(id);
                      this.$store.commit("SET_INVITE", {
                        show: false,
                        groupId:''
                      });
                    } else if (data.data.forbidJoinUserId.length != 0 && !this.invite.isadmin) {
                      //普通邀请
                      this.$store.commit("SET_INVITE", {
                        show: false,
                        groupId:''
                      });
                      if(data.data.forbidJoinUserId.length>1){
                        let name = this.getCheckedname(this.selectList, data.data.forbidJoinUserId);
                        this.$message({
                          title: '',
                          showCancelButton: false,
                          confirmButtonText: this.$t("msg.common.confirm"),
                          message: name + this.$t("msg.group.byforbids")
                        })
                      }else{
                        let name = this.getCheckedname(this.selectList, data.data.forbidJoinUserId);
                        this.$message({
                          title: '',
                          showCancelButton: false,
                          confirmButtonText: this.$t("msg.common.confirm"),
                          message: name + this.$t("msg.group.byforbid")
                        })
                      }
                      let joinid = this.getCheckedId(this.selectList, data.data.forbidJoinUserId);
                      if (joinid != '') {
                        this.doInvitationAgreeJoin(joinid);
                        this.$store.commit("SET_INVITE", {
                          show: false,
                          groupId:''
                        });
                      } else {
                        this.$store.commit("SET_INVITE", {
                          show: false,
                          groupId:''
                        });
                      }
                    } else {
                      //管理员邀请
                      let id = this.getgoinviteid(this.selectList, data.data.forbidJoinUserId);
                      let name = this.getCheckedname(this.selectList, data.data.forbidJoinUserId);
                      let joinid = this.getCheckedId(this.selectList, data.data.forbidJoinUserId);
                      if (joinid != '') {
                        this.doInvitationAgreeJoin(joinid);
                      }
                      this.namelist = name
                      this.goinviteid = id
                      this.isExceed = 1
                      this.isgo = true
                    }
                  },
                  data2 => {}
                );
              } else {
                this.$store.commit("SET_TOAST_TEXT", data.data);
              }
            },
            data => {}
          );
      },
      //超过人数发送的邀请
      doInvitationAgreeJoin(id) {
        this.$http
          .invitationAgreeJoin({
            groupId: this.invite.groupId,
            inviter: id
          })
          .then(
            data => {
              this.$store.commit("SET_TOAST_TEXT", this.$t("msg.tip.success"));
              // this.$store.commit("SET_INVITE", {
              //   show: false
              // });
            },
            data => {}
          );
      },
    //管理员的继续邀请
      goinvite() {
        this.$http.inviteForbidUser({
          groupId: this.invite.groupId,
          inviter: this.goinviteid,
          isExceed: this.isExceed
        }).then(
          data => {
            this.isgo = false
            if (this.isExceed == 0) {
              this.showSuccess = true;
              setTimeout(() => {
                this.showSuccess = false;
                this.$store.commit("SET_INVITE", {
                  show: false,
                  groupId:''
                });
                this.$emit("inviteHandler", data);
              }, 1500);
            } else {
              this.$store.commit("SET_INVITE", {
                show: false,
                groupId:''
              });
            }
          }
        )
      },
      cancelisgo(){
        this.isgo=false
        this.$store.commit("SET_INVITE", {
            show: false,
            groupId:''
          });
      },
    },
    mounted() {}
  };

</script>

<style lang="scss" scoped>
@import "../../assets/css/var";

.my-popup-content{
    width: 731px;
    height: 492px;
    background:  #ffffff;
    box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
    
    border-radius: 8px;
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
            .item-left{
              display: flex;
              align-items:center;
              .name {
              display: inline-block;
              max-width: 120px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            }
            
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
        .icon-delete {
        position: absolute;
        top: 44px;
        right: 55px;
        display: block;
        margin-top: -12px;
        width: 24px;
        height: 24px;
        background-image: url(../../assets/images/search/close.png);
        background-size: 100% 100%;
        cursor: pointer;
        opacity: .7;
        &:hover {
          background-image: url(../../assets/images/search/close.png);
          opacity: 1;
        }
      }
      }
      .unselected-list{
        border-top:0px;
        .friend-list{
          border-top:0px;
          height: 426px;
          .opt{
            .opts{
              opacity:0.7
            }
          }
        }
      }
    }
}
  .sort-letter {
    position: relative;
    margin-top: 10px;
    padding-left: 33px;
    line-height: 22px;
    font-size: 16px;
    color: #999;
    text-align: left;
  }

  .content {
    width: 420px;
    height: 100%;

    .isforbid-box {
      margin-top: 50px;
      margin-left: 30px;
      margin-right: 30px;
      display: flex;
      height: 100%;
      align-items: center;
      font-size: 14px;
    }

    .btn {
      display: flex;
      margin: 40px 40px 18px 40px;
      justify-content: flex-end;

      .cancel {
        width: 78px;
        height: 34px;
        color: $color-theme;
        background: #fff;
        border: 1px solid $color-theme;
        border-radius: 5px;
        margin-right: 20px;
      }

      .ensure {
        width: 78px;
        height: 34px;
        color: #fff;
        background:$color-theme;
        border: 1px solid $color-theme;
        border-radius: 5px;
      }
    }
  }

</style>
