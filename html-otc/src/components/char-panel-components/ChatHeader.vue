<template>
  <div class="header-menu display-flex" @click.stop=";" v-if="currentSession.fromType != '2'">
    <div class="menu-show">
      <li v-for="(item , idx) in menuBox" @click="clickMenu(item)" :class="{inBlack:inBlack}" :key="idx"> <span
          class="icon" :title="title[item.title]" :class="item.type"></span>
      </li>
    </div>
    <!-- 打开详情 -->
    <div class="menu more" :class="{ active: layout.module == 'gp-inf' || layout.module == 'fd-inf' }"
      @click.stop="showInformation"
      v-if="currentSession.fromType==1||(currentSession.fromType==0&&!currentSession.temp)"></div>
    <!-- 清理聊天记录弹窗 -->
    <transition name="pop">
      <Popup :title="$t('msg.common.warn')" @click.native="showCleanHistory=false;" :hideClose="true"
        v-if="showCleanHistory">
        <div class="logout" @click.stop="" slot="body">
          <div class="logout-detail">
            {{ $t("msg.chatSetting.clearChatHistoryAsk") }}
            <p class="tip">{{ $t("msg.tip.not") }}</p>
          </div>

          <button class="cannel" @click="showCleanHistory=false">
            {{ $t("msg.common.cancel") }}
          </button>
          <button class="comfirm" @click="clearChatHistory">
            {{ $t("msg.chatSetting.clearChatHistoryOkButton") }}
          </button>
        </div>
      </Popup>
    </transition>
    <!-- 退群二次弹层 -->
    <div class="my-popup quit-confirm" v-show="showConfirm" @click.stop="showConfirm = false">
      <div class="quit-content" @click.stop="">
        <div class="quit-head">!</div>
        <p>{{ $t("msg.chatSetting.title") }}</p>
        <button class="comfirm" v-show="isAdmin != 1" @click="doUserQuit()">
          {{ $t("msg.chatSetting.exit") }}
        </button>
        <button class="comfirm" v-show="isAdmin == 1" @click="doQuitDelete()">
          {{ $t("msg.chatSetting.dissolve") }}
        </button>
        <button class="cannel" @click="showConfirm = false">
          {{ $t("msg.common.cancel") }}
        </button>
      </div>
    </div>
    <!-- 截图插件 -->
    <!-- <screenshot v-if="layout.child == 'ss'"></screenshot> -->
    <!-- <group-more-setting ref="forbidden"></group-more-setting> -->
  </div>
</template>
<script>
import draggable from "vuedraggable"
// import Screenshot from "./Screenshot";
import { localStore } from "@/tools/localStorage";
// import GroupMoreSetting from "./GroupMoreSetting";
import { msgManager } from "@/session/msgManager";
import { friend } from "@/session/friend";
import { group } from "@/session/group";
import { mapGetters } from "vuex";
  export default {
    name: "chat-header",
    data() {
      return {
        isAdmin: 0,
        title: {
          search: this.$t("msg.search.title"),
          audioCall: this.$t('msg.common.audioCall'),
          videoCall: this.$t('msg.common.videoCall'),
          screen: this.$t('msg.chatPanel.screen'),
          showUserName: this.$t('msg.chatSetting.showUserName'),
          addFriend: this.$t('msg.menu.addFriend'),
          doShield: this.$t('msg.menu.doShield'),
          unShield: this.$t('msg.menu.unShield'),
          disturbing: this.$t('msg.chatSetting.disturbing'),
          stick: this.$t('msg.chatSetting.stick'),
          clearChatHistory: this.$t('msg.chatSetting.clearChatHistory'),
          autoClean: this.$t('msg.chatSetting.autoClean'),
          moreSetting: this.$t('msg.chatSetting.moreSetting'),
        },
        menuBox: [

        ],
        menuSelect: [{
            title: 'search',
            type: 'search',
            fromType: 0,
          },
          {
            title: 'addFriend',
            type: 'addFriend',
            fromType: 0,
          },
          {
            title: 'doShield',
            type: 'doShield',
            fromType: 0,
          },
          // {
          //   title: 'screen',
          //   type: 'screen',
          //   fromType: 0,
          // },
        ],
        menuList: [{
            title: 'search',
            type: 'search',
            fromType: 0,
          },
          {
            title: 'videoCall',
            type: 'video',
            fromType: 0,
          },
          {
            title: 'audioCall',
            type: 'voice',
            fromType: 0,
          },
          // {
          //   title: 'screen',
          //   type: 'screen',
          //   fromType: 0,
          // },
        ],
        groupList: [{
            title: 'search',
            type: 'search',
            fromType: 0,
          },
          // {
          //   title: 'screen',
          //   type: 'screen',
          //   fromType: 0,
          // },
        ],
        menuDisabled: false,
        inBlack: false,
        show: false,
        showMenu: false,
        showClear: false,
        text: '',
        // showRemark: false,
        showConfirm: false,
        showCleanHistory: false,
      };
    },
    components: {
      draggable,
      // Screenshot,
      // GroupMoreSetting,
    },
    computed: {
      ...mapGetters(["userInfo", "currentSession", "andioVideoInfo", "session", "layout"]),
      chatList() {
        let arr = Object.values(this.session.record);
        arr = arr.sort((a, b) => b.userTime - a.userTime);
        return arr;
      }
    },
    watch: {
      "currentSession.paramId"(newValue, oldValue) {
        if (this.currentSession.temp == true ) {
          this.menuBox = this.menuSelect
        }
        if (this.currentSession.temp == false) {
          this.menuBox = this.menuList
        }
        if (this.currentSession.fromType == "1") {
          this.menuBox = this.groupList
        }
      },
      "$parent.friendInfo"(newValue, oldValue) {
        this.friend = this.$parent.friendInfo;
        if (this.$parent.friendInfo.isBlacklist) {
          this.inBlack = true;
        } else {
          this.inBlack = false;
        }
      },

    },
    methods: {
      openMenu() {
        if (this.layout.module == "cp" || this.layout.module == "ch") {
          this.showMenu = false;
          this.$store.dispatch("setLayout", ["", "", false]);
          return;
        }
        this.showMenu = true;
        this.$store.dispatch("setLayout", ["cp", "ch", false]);
      },
      //打开详情
      showInformation() {
        if (this.layout.module == "gp-inf" || this.layout.module == "fd-inf") {
          this.$store.dispatch("setLayout", ["", "", false]);
          return;
        }
        if (this.currentSession.fromType == 1) {
          this.$store.dispatch("setLayout", ["gp-inf", "gi", true]);
        } else {
          this.$store.dispatch("setLayout", ["fd-inf", "fi", true]);
        }
      },
      clickMenu(item) {

        switch (item.type) {
          case "voice":
            this.showVideo(0);
            break;
          case "video":
            this.showVideo(1);
            break;
          case "screen":
            setTimeout(() => {
              this.$store.dispatch("setLayout", ["cp", "ss", false]);
            }, 10);
            break;
          case "search":
            this.$parent.$parent.$parent.$refs.searchRecord.show();
            break
          case "showUserName":
            this.modifyGroup('isShowMemberNick');
            break;
          case "disturbing":
            if (this.currentSession.fromType == 0) this.modifyFriend('isInterruption');
            if (this.currentSession.fromType == 1) this.modifyGroup('isInterruption');
            break;
          case "stick":
            if (this.currentSession.fromType == 0) this.modifyFriend('isTop');
            if (this.currentSession.fromType == 1) this.modifyGroup('isTop');
            break;
          case "addFriend":
            this.doAddFriend()
            break;
          case "doShield":
            if (!this.inBlack) this.doShield()
            else this.unShield()
            break;
          default:
            return;
        }
      },
      doShield() {
        if (this.inBlack) {
          this.unShield();
          return
        }
        let obj = {
          treatedIds: this.currentSession.paramId,
          state: this.friend.state
        };
        this.$http.addBlackList(obj).then(() => {
          this.$store.commit("SET_TOAST_TEXT", this.$t("msg.tip.forbiddenUser"));
          this.inBlack = true;
        });
      },
      unShield() {
        let obj = {
          treatedIds: this.currentSession.paramId
        };
        this.$http.removeBlackList(obj).then(() => {
          this.$store.commit(
            "SET_TOAST_TEXT",
            this.$t("msg.tip.unForbiddenUser")
          );
          this.inBlack = false;
        });
      },
      doAddFriend() {
        var postData = {
          recipient: this.currentSession.paramId,
          source: this.friend.state,
          sourceDescribe: this.friend.sourceDescribe
        };
        let userId =this.currentSession.paramId
        this.$http.addFriend(postData).then(
          res => {
            this.$store.commit("ADD_FRIEND_INFO", {userId,info:res.data});
            this.gotoChat(res.data)
            this.menuBox = this.menuList
          }
        )
      },
      gotoChat(item) {
        item.fromType = 0
        var chat = this.$store.state.session.record[item.userId + '-' + item.fromType]
        let newChat
        if (!chat) {
          newChat = {
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
            newChat.paramId = item.userId
            newChat.temp = false
          }
          if (item.fromType == 1) {
            newChat.name = item.groupName
            newChat.paramId = item.groupId
          }
          newChat.isActivity = true
          this.$store.commit("UPDATE_SESSION", newChat)
          this.$store.commit("UPDATE_CURRENT_SESSION", newChat)
        } else {
          chat.isActivity = true;
          chat.temp = false
          this.$store.commit("UPDATE_CURRENT_SESSION", JSON.parse(JSON.stringify(chat)))
        }
        this.$store.dispatch("setLayout", ["", "", false])
        this.$store.commit("SET_TOAST_TEXT", this.$t("msg.msgPanel.isSuccess"))
      },
      openMore() {
        this.$refs.forbidden.show()
      },
      modifyClear() {
        this.showClear = !this.showClear;
        this.clearType =
          localStore.readRegularCleaning(this.currentSession.paramId)
          .cleanMsgCycle || 0;
      },
      // setCycle(type) {
      //   let confString = JSON.stringify({ cleanMsgCycle: type + "" });

      //   if (this.currentSession.fromType == "1") {
      //     let obj = {
      //       groupId: this.currentSession.paramId,
      //       confString: confString
      //     };
      //     this.$http.setGroupSetting(obj).then(
      //       () => {
      //         this.clearType = type;
      //         this.showClear = false;
      //         this.$store.dispatch("getReadNum", {
      //           groupId: this.currentSession.paramId
      //         });
      //       },
      //       () => {}
      //     );
      //   } else {
      //     let obj = {
      //       recipient: this.currentSession.paramId,
      //       confString: confString,
      //       type:0
      //     };
      //     if (this.currentSession.temp) {
      //       obj.type = 1;
      //     }
      //     this.$http.setFriendSetting(obj).then(() => {
      //       this.clearType = type;
      //       this.showClear = false;
      //       friend.getNetworkSession(this.currentSession.paramId);
      //     });
      //   }
      // },
      modifyFriend(type) {
        let confString = "";
        if (type == "isTop") {
          if (this.currentSession.isTop == 0) {
            confString = JSON.stringify({
              isTop: 1
            });
          } else {
            confString = JSON.stringify({
              isTop: 0
            });
          }
        } else {
          if (this.currentSession.isInterruption == 0) {
            confString = JSON.stringify({
              isInterruption: 1
            });
          } else {
            confString = JSON.stringify({
              isInterruption: 0
            });
          }
        }
        let obj = {
          recipient: this.currentSession.paramId,
          confString: confString
        };

        if (this.currentSession.temp) {
          obj.type = 1;
        }

        this.$http.setFriendSetting(obj).then(() => {
          this.settingHandler(type);
        });
      },
      modifyGroup(type) {
        let confString = "";
        if (type == "isTop") {
          if (this.currentSession.isTop == 0) {
            confString = JSON.stringify({
              isTop: 1
            });
          } else {
            confString = JSON.stringify({
              isTop: 0
            });
          }
        } else if (type == "isInterruption") {
          if (this.currentSession.isInterruption == 0) {
            confString = JSON.stringify({
              isInterruption: 1
            });
          } else {
            confString = JSON.stringify({
              isInterruption: 0
            });
          }
        } else {
          if (this.currentSession.isShowMemberNick == 0) {
            confString = JSON.stringify({
              isShowMemberNick: 1
            });
          } else {
            confString = JSON.stringify({
              isShowMemberNick: 0
            });
          }
        }
        let obj = {
          groupId: this.currentSession.paramId,
          confString: confString
        };
        this.$http.setGroupSetting(obj).then(
          () => {
            this.settingHandler(type);
          },
          () => {}
        );
      },
      showVideo(i) {
        if (this.$store.state.isOnlineAudio) {
          this.$store.commit(
            "SET_TOAST_TEXT",
            `${this.$t("msg.call.isCalling")}`
          );
          return;
        } else {
          this.$store.commit("UPDATE_AUDIO_STATE", true);
        }

        let vType = this.andioVideoInfo.vType;
        this.$store.dispatch("setLayout", ["", "", false]);
        if (this.currentSession.fromType != "0") {
          this.$store.commit("SET_TOAST_TEXT", this.$t("msg.tip.stay"));
          return;
        }
        let obj = {
          receiverId: this.currentSession.paramId, //被邀请者id
          groupId: null, //群id 群聊则传
          vType: i + ""
        };
        this.$store.commit("UPDATE_VIDEO_INFO", obj);
        var chat = this.$store.state.session.record[this.currentSession.paramId + '-' + this.currentSession.fromType];
        chat.userMessage = `[${
        i == 1
          ? this.$t("msg.common.videoCall")
          : this.$t("msg.common.audioCall")
      }]`;
        this.$store.commit("UPDATE_SESSION", chat);
      },
      //清理本地缓存数据
      clearChatHistory() {
        this.showCleanHistory = false;
        let sessionUserId = this.currentSession.paramId;
        let type = this.currentSession.fromType;
        this.$http.deleteMessage({
          sessionUserId: sessionUserId,
          type: type,
          folkMsgId: '-1'
        }).then(
          data => {
            // 清空本地数据
            msgManager.removeMsgAll(type, sessionUserId);
            if (sessionUserId == this.currentSession.paramId && type == this.currentSession.fromType) {
              this.$store.commit("CLEAR_MESSAGE", {});
            }
            //成功弹窗
            this.$store.commit('SET_TOAST_TEXT', this.$t("msg.tip.operateSuccess"))
          })
      },
      settingHandler(type) {
        switch (type) {
          case "isTop":
            if (this.currentSession.isTop == 0) {
              this.currentSession.isTop = 1;
            } else {
              this.currentSession.isTop = 0;
            }
            this.$store.commit("UPDATE_SESSION", this.currentSession);
            break;
          case "isInterruption":
            if (this.currentSession.isInterruption == 0) {
              this.currentSession.isInterruption = 1;
            } else {
              this.currentSession.isInterruption = 0;
            }
            this.$store.commit("UPDATE_SESSION", this.currentSession);
            break;
          case "isShowMemberNick":
            if (this.currentSession.isShowMemberNick == 0) {
              this.currentSession.isShowMemberNick = 1;
            } else {
              this.currentSession.isShowMemberNick = 0;
            }
            if (
              this.$parent.$refs.list.scrollTop + 500 >
              this.$parent.$refs.list.scrollHeight
            ) {
              setTimeout(() => {
                this.$parent.$refs.list.scrollTop = this.$parent.$refs.list.scrollHeight;
              }, 200);
            }
            this.$store.commit("UPDATE_SESSION", this.currentSession);
            break;
          default:
            return;
        }
      },
      doUserQuit() {
        this.$http
          .userQuit({
            groupId: this.currentSession.paramId
          })
          .then(data => {
            this.showConfirm = false;
            this.$store.dispatch("setLayout", ["", "", false]);
            // this.$parent.$refs.chatheader.$refs.forbidden.showBox = false;
            this.updateSession();
            msgManager.removeMsgAll(this.currentSession.fromType, this.currentSession.paramId);
          });
          this.$parent.$parent.$refs.chatList.toFirst()
      },
      doQuitDelete() {
        this.$emit("input", false);
        this.$http.deleteGroup({
            groupId: this.currentSession.paramId
          })
          .then(data => {
            this.showConfirm = false;
            this.$store.dispatch("setLayout", ["", "", false]);
            // this.$parent.$refs.chatheader.$refs.forbidden.showBox = false;
            this.updateSession();
          });
        msgManager.removeMsgAll(this.currentSession.fromType, this.currentSession.paramId);
        this.$parent.$parent.$refs.chatList.toFirst()
      },
      updateSession() {
        this.$store.commit("DELETE_SESSION", this.currentSession.paramId + '-' + this.currentSession.fromType);
        //删除群列表
        this.$store.commit("DEL_GROUP_LIST", this.currentSession.paramId);
        let sessionCache = this.$store.state.session.record;
        for (let key in sessionCache) {
          if (sessionCache[key].isActivity) {
            sessionCache[key].isActivity = false;
          }
        }
        this.chatList[0].isActivity = true;

        this.$store.commit("UPDATE_CURRENT_SESSION", this.chatList[0]);
        group.getGroupAll(true);
      },
    },
    mounted() {
      if (window.location.hash == '#/mac') {
        this.menuList = this.menuList.filter(item => item.type != 'screen')
      }
    }
  };

</script>

<style lang="scss" scoped>
  @import "../../assets/css/var";

  .header-menu {
    position: absolute;
    top: 32px;
    right: 16px;

    .menu-show {
      position: relative;
      width: auto;
      min-width: 35px;
      height: 30px;
      margin-right: 3px;

      li {
        float: left;
        height: 34px;
        line-height: 34px;
        width: 34px;
        margin-right: 6px;
        text-align: center;
        cursor: pointer;
        overflow: hidden;
        user-select: none;

        &.inBlack {
          .icon {
            display: inline-block;
            position: relative;
            width: 34px;
            height: 34px;
            vertical-align: middle;
            width: 20px;
            height: 18px;

            &.doShield {
              width: 34px;
              height: 34px;
              background: url(../../assets/images/chat/inBlack.png);
              margin-bottom: 5px;

              &:hover {
                background: url(../../assets/images/chat/inBlack-active.png);
              }
            }
          }
        }

        .icon {
          display: inline-block;
          position: relative;
          width: 34px;
          height: 34px;
          vertical-align: middle;
          width: 20px;
          height: 18px;

          &.addFriend {
            width: 34px;
            height: 34px;
            background: url(../../assets/images/chat/addFriend.png);
            margin-bottom: 5px;

            &:hover {
              background: url(../../assets/images/chat/addFriend-active.png);
            }
          }

          &.doShield {
            width: 34px;
            height: 34px;
            background: url(../../assets/images/chat/doShield.png);
            margin-bottom: 5px;

            &:hover {
              background: url(../../assets/images/chat/doShield-active.png);
            }
          }

          &.search {
            width: 34px;
            height: 34px;
            background: url(../../assets/images/chat/search.png);
            margin-bottom: 5px;

            &:hover {
              background: url(../../assets/images/chat/search-active.png);
            }
          }

          &.voice {
            width: 34px;
            height: 34px;
            background: url(../../assets/images/chat/voice.png);
            margin-bottom: 5px;

            &:hover {
              background: url(../../assets/images/chat/voice-active.png);
            }
          }

          &.video {
            width: 34px;
            height: 34px;
            background: url(../../assets/images/chat/video.png);
            margin-bottom: 5px;

            &:hover {
              background: url(../../assets/images/chat/video-active.png);
            }
          }

          &.screen {
            width: 34px;
            height: 34px;
            background: url(../../assets/images/chat/screen.png);
            margin-bottom: 5px;

            &:hover {
              background: url(../../assets/images/chat/screen-active.png);
            }
          }
        }
      }
    }

    .menu {
      position: relative;
      width: 34px;
      height: 34px;
      cursor: pointer;
    }

    .setting {
      width: 23px;
      height: 17px;
      margin: 6px 12px 7px 4px;
      background-position: -0 -0px;

      &.active,
      &:hover {
        background-position: -0 -17px;
      }
    }

    .more {
      width: 34px;
      height: 34px;
      margin: 2px 0;
      background: url(../../assets/images/chat/more.png);

      &.active,
      &:hover {
        background: url(../../assets/images/chat/more-active.png);
      }
    }
  }

  .quit-confirm {
    z-index: 1000;

    .quit-content {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 170px;
      width: 274px;
      text-align: center;
      background: #fff;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      text-align: center;
      border-top: 9px solid $color-theme;
      border-radius: 10px;
      box-sizing: border-box;

      .quit-head {
        position: absolute;
        left: 50%;
        top: -29px;
        height: 58px;
        line-height: 58px;
        width: 58px;
        font-size: 48px;
        color: #fff;
        margin-left: -29px;
        text-align: center;
        border-radius: 50px;
        background: $color-theme;
      }

      p {
        padding: 0 25px;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        margin-top: 60px;
      }

      button {
        height: 34px;
        width: 78px;
        margin-top: 32px;
        display: inline-block;
        border-radius: 5px;
        font-size: 14px;
        text-align: center;
        line-height: 100%;
      }

      .comfirm {
        color: #fff;
        background: $color-theme;
        margin-right: 50px;
      }

      .cannel {
        color: $color-theme;
        background: #fff;
        border: 1px solid $color-theme;
      }
    }
  }

  .logout {
    width: 420px;
    height: 160px;
    text-align: right;

    .logout-detail {
      font-size: 14px;
      color: #122030;
      text-align: left;
      padding: 20px 20px 88px 20px;
    }

    .tip {
      margin-top: 10px;
      color: #5F717F;
    }

    .cannel {
      margin-right: 20px;
    }

    .comfirm {
      margin-right: 20px;
    }
  }

</style>
