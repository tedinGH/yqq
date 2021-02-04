<template>
  <div class="wrapper display-flex">
    <div class="app-logo">
      <p class="name">EchatAPP</p>
      <span class="version">{{ version }}</span>
    </div>
    <div class="main">
      <div class="main-body display-flex" @click="showFavorites=false">
        <div class="user">
          <div class="left">
            <div class="public-header display-flex" ondragstart="return false">
              <div class="display-flex" @click="showIndex($event, 3)">
                <img class="img user-avatar" :src="global.fileDownUrl + 'compress/'+userInfo.headImg" v-headError v-if="userInfo.headImg" />
                <img class="avatar" src="../assets/images/error-head.png" v-if="!userInfo.headImg">
              </div>
            </div>
            <div class="main-menu">
              <div class="menu chat" :class="{ active: routeName == 'chat' }" @click="menuClick('chat')"
                @dblclick="switchChat()">
                <span class="icon-badge" v-if="unReadNum > 0">{{ unReadNum | numFitler }}</span>
              </div>
              <div class="menu contact" :class="{ active: routeName == 'contact' }" @click="menuClick('contact')">
                <!-- <span class="icon-badge" v-if="newFriendsNum">{{ newFriendsNum | numFitler }}</span> -->
              </div>
            </div>
            <div class="setting"
              :class="{ active: layout.module == 'uc' && (layout.child == 'uc' || layout.child == 'logout') }"
              @click="showIndex($event, 1)">
            </div>
          </div>
        </div>
        <chat class="chats" ref="chat" v-if="routeName == 'chat'"></chat>
        <contact class="contacts" ref="contact" v-if="routeName == 'contact'"></contact>
        <div class="more-menu" :class="{active: layout.child == 'mm'}" @click="showIndex($event, 2)"></div>
        <user-info v-if="layout.module == 'uc' && layout.child == 'ifo'"></user-info>
        <user-center v-if="layout.module == 'uc' && (layout.child == 'uc' || layout.child == 'logout')"></user-center>
        <more-menu v-if="layout.module == 'uc' && layout.child == 'mm'"></more-menu>
        <loading v-if="showLoading"></loading>
        <!-- <favorites v-model="showFavorites" ref="favorites"></favorites> -->
      </div>
    </div>
    <Popup :title="$refs.audiovideo.video.type == 1?$t('msg.common.videoCall'):$t('msg.common.audioCall')"
      :hide-close="true" v-if="videoclose">
      <div class="logout" @click.stop="" slot="body">
        <div class="logout-detail">
          {{ $t("msg.call.closeWin")}}{{$refs.audiovideo.video.type == 1? $t("msg.common.videoCall"): $t("msg.common.audioCall")}}，{{ $t("msg.call.confirmClose") }}
        </div>
        <button class="two-btn cannel" @click="showcloseClose()">
          {{ $t("msg.common.cancel") }}
        </button>
        <button class="two-btn comfirm" @click="closeVideo">
          {{ $t("msg.common.confirm") }}
        </button>
      </div>
    </Popup>
    <!-- 组件 -->
    <audio-video ref="audiovideo"></audio-video>
    <search-record ref="searchRecord"></search-record>
    <alias ref="alias"></alias>
    <user-information v-if="layout.module == 'uc' && (layout.child == 'ui' || layout.child == 'nn')"></user-information>
    <group-member-profile v-if="layout.module == 'gmi'"></group-member-profile>
    <add-friend v-if="layout.module == 'uc' && layout.child == 'af'" ref="addfriend"></add-friend>
    <prompt v-if="layout.module == 'uc' && layout.child == 'pr'"></prompt>
    <new-group v-if="layout.module == 'uc' && layout.child == 'ng'"></new-group>
    <invite-friend v-if="layout.module == 'uc' && layout.child == 'if'"></invite-friend>
    <setting v-if="layout.module == 'uc' && layout.child == 'st'"></setting>
    <mouse-right :mrData="mrInfo" ref="mouseRight" v-if="(layout.module == 'mr' && (layout.child == 'mr' || layout.child == 'ctrl')) || 
        (layout.module == 'gp-inf' && layout.child == 'mr')"></mouse-right>
    <forward-info v-if="forwardInfo.show"></forward-info>
    <forwardlist v-if="forwardMenu.show"></forwardlist>
    <myemoji v-if="myemoji.show" ref="myemoji"></myemoji>
    <login-fail v-if="loginFail"></login-fail>
    <seal-group v-if="layout.module == 'seal'"></seal-group>
    <toast></toast>
    <toastbox></toastbox>
    <crowdtoast></crowdtoast>
    <video-player ref="muteVideo"></video-player>
    <div class="mask" v-if="layout.mask"></div>
    <!-- 语音提示 -->
    <audio id="audio_msg" style="opacity: 0" src="./static/voice/bc_sound_newMsg.wav"></audio>
    <audio id="audio_send" style="opacity: 0" src="./static/voice/send_chat.mp3"></audio>
    <audio id="audio_dail" style="opacity: 0" src="./static/voice/voice_video_dial.wav" muted="true"
      loop="loop"></audio>
    <audio id="audio_connected" style="opacity: 0" src="./static/voice/voice_video_connected.wav"></audio>
    <audio id="audio_end" style="opacity: 0" src="./static/voice/voice_video_end.mp3"></audio>
    <audio id="message-voice" hidden></audio>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import { Util } from "@/tools/utils"
import Rtc from "@/tools/rtc-message"
import Msg from "@/tools/msg"
import { EchatDB } from "@/tools/indexedDB"
import { Crypto } from "@/tools/crypto" 
import Contact from "./Contact"
import Chat from "./Chat"
import AudioVideo from "@/components/AudioVideo"
import SearchRecord from "@/components/UserCenter/SearchRecord"
import Alias from "@/components/UserCenter/Alias"
import UserInformation from "@/components/UserCenter/UserInformation"
import GroupMemberProfile from "@/components/char-panel-components/GroupMemberProfile"
import VideoPlayer from "@/components/char-panel-components/VideoPlayer"
import UserCenter from "@/components/UserCenter/UserCenter"
import UserInfo from "@/components/UserCenter/UserInfo"
import MoreMenu from "@/components/UserCenter/MoreMenu"
// import Favorites from "@/components/UserCenter/Favorites"
import InviteFriend from "@/components/UserCenter/InviteFriend"
import Setting from "@/components/UserCenter/Setting"
import AddFriend from "@/components/UserCenter/AddFriend"
import Prompt from "@/components/UserCenter/Prompt"
import NewGroup from "@/components/UserCenter/NewGroup.vue"
import ForwardInfo from "@/components/ForwardInfo"
import Forwardlist from "@/components/Forwardlist"
import MouseRight from "@/components/MouseRight"
import LoginFail from "@/components/popup/LoginFail"
import SealGroup from "@/components/popup/SealGroup"
import Toast from "@/components/popup/Toast"
import Toastbox from "@/components/popup/Toastbox"
import Crowdtoast from "@/components/popup/Crowdtoast"
import Myemoji from "@/components/char-panel-components/Myemoji"
import { group } from "@/session/group"
import { service } from "@/session/service"
import { friend } from "@/session/friend"
import { sessionUtil } from "@/session/sessionUtil"
import {Config} from "@/common/config"
  export default {
    name: "index",
    data() {
      return {
        vioceReady: true,
        showLoading: true,
        showFavorites: false,
        topNum: 0,
        bandNum: 0,
        mrInfo: null,
        version: Config.version,
      }
    },
    components: {
      Chat,
      Contact,
      AudioVideo,
      UserInformation,
      GroupMemberProfile,
      VideoPlayer,
      UserCenter,
      UserInfo,
      MoreMenu,
      Setting,
      SearchRecord,
      Alias,
      InviteFriend,
      // Favorites,
      ForwardInfo,
      AddFriend,
      Prompt,
      NewGroup,
      MouseRight,
      LoginFail,
      SealGroup,
      Toast,
      Toastbox,
      Crowdtoast,
      Myemoji,
      Forwardlist
    },
    computed: {
      ...mapGetters(["userId", "userInfo", "session", "currentSession", "forwardInfo", "loginFail", "layout", "myemoji",
        "right", "favorites", "videoclose",'forwardMenu'
      ]),
      routeName() {
        return this.$store.state.routeName
      },
      unReadNum() {
        return this.$store.state.redPoint.unReadNum
      },
      newFriendsNum() {
        return this.$store.state.redPoint.newFriendsNum
      },
      chatList() {
        let arr = Object.values(this.session.record)
        return arr
      },
      topList() {
        let arr1 = []
        this.chatList.forEach(v => {
          if (v.isTop) {
            arr1.push(v)
          }
        })
        arr1.sort((a, b) => b.userTime - a.userTime)
        return arr1
      },
      normalList() {
        let arr1 = []
        this.chatList.forEach(item => {
          if (!item.isTop) {
            arr1.push(item)
          }
        })
        arr1.sort((a, b) => b.userTime - a.userTime)
        return arr1
      },
    },
    methods: {
      closeVideo() {
        this.$refs.audiovideo.closeVideo()
      },
      showcloseClose() {
        this.$store.commit("SET_VIDEOCLOSE", false)
      },
      doShowFavorites() {
        this.showFavorites = true
      },
      initCLient(userId) {
        EchatDB.openDB(userId).then(() => {
          friend.getFriendAll().then(data => {
            this.$store.commit("SET_FRIEND_LIST", data)
            group.getGroupAll().then(data => {
              this.$store.commit("SET_GROUP_LIST", data)
              this.$store.dispatch("getSessionList", {}).then(data => {
                this.showLoading = false
              })
            })
          })

          let sessionList = sessionUtil.getLocalStoreSessionList()
          if (sessionList) {
            this.$store.commit('setSession', sessionList)
            this.showLoading = false
          }
        })
      },
      menuClick(type) {
        this.$store.commit("SET_ROUTE_NAME", type)
        if (this.routeName != 'chat') {
          this.$store.commit("UPDATE_CURRENT_SESSION", {})
          this.$store.commit("CLEAR_MESSAGE", {})
        }
      },
      getSwitchList() {
        let result = []
        this.topList.forEach(v => {
          if (v.mId > v.lastReadId) {
            let sort = 1
            if (v.isTop && v.isTop == 1) sort = 2
            if (v.isInterruption && v.isInterruption == 1) sort = 0
            v.sort = sort
            if (sort != 0) result.push(v)
          }
        })
        this.normalList.forEach(v => {
          if (v.mId > v.lastReadId) {
            let sort = 1
            if (v.isTop && v.isTop == 1) sort = 2
            if (v.isInterruption && v.isInterruption == 1) sort = 0
            v.sort = sort
            if (sort != 0) result.push(v)
          }
        })
        result = result.sort((a, b) => +b.sort - +a.sort)
        return result
      },
      getBandList() {
        let result = []
        this.topList.forEach(v => {
          if (v.mId > v.lastReadId) {
            if (v.isInterruption && v.isInterruption == 1) result.push(v)
          }
        })
        this.normalList.forEach(v => {
          if (v.mId > v.lastReadId) {
            if (v.isInterruption && v.isInterruption == 1) result.push(v)
          }
        })
        return result
      },
      getScrollNum(chat) {
        let num = 0
        for (var i = this.topList.length - 1; i >= 0; i--) {
          let item = this.topList[i]
          if (item.paramId == chat.paramId) num = i
        }
        for (var i = this.normalList.length - 1; i >= 0; i--) {
          let item = this.normalList[i]
          if (item.paramId == chat.paramId) num = this.topList.length + i
        }
        return num
      },
      insertEmoji(obj) {
        this.$refs.chat.$refs.chatHistory.insertEmoji(obj)
      },
      switchChat() {

        let switchChatList = this.getSwitchList()
        let bandChatList = this.getBandList()

        if (switchChatList && switchChatList.length) {
          let num = 0
          if (this.topNum < switchChatList.length) {
            let chat = switchChatList[this.topNum]
            num = this.getScrollNum(chat)
            this.$refs.chat.$refs.chatList.scrollChat(num)
            this.topNum++
          } else {
            let chat = switchChatList[0]
            num = this.getScrollNum(chat)
            this.$refs.chat.$refs.chatList.scrollChat(num)
            this.topNum = 1
          }
        } else {
          if (bandChatList && bandChatList.length) {
            let num = 0
            if (this.bandNum < bandChatList.length) {
              let chat = bandChatList[this.bandNum]
              num = this.getScrollNum(chat)
              this.$refs.chat.$refs.chatList.scrollChat(num)
              this.bandNum++
            } else {
              let chat = bandChatList[0]
              num = this.getScrollNum(chat)
              this.$refs.chat.$refs.chatList.scrollChat(num)
              this.bandNum = 1
            }
          }
        }
      },
      setLoginInfo(userInfo) {
        let user = JSON.parse(Crypto.decryptByDES(userInfo, "echat000"))
        this.initCLient(user.userId)
        this.$store.commit("SET_USER_TOKEN", user.token)
        this.$store.commit("SET_USER_INFO", user) //预防下面搜索个人信息请求接口出错

        this.$http.searchInfo({
          ids: user.userId
        }).then(
          data => {
            data[0].headImg = data[0].avatar
            this.$store.commit("SET_USER_INFO", data[0])
            Util.clearCookie("eUcShEaRt")
            sessionStorage.setItem("eUcShEaRt", userInfo)
          },
          () => {}
        )
        setTimeout(() => {
          //延时启动
          Rtc.sendRtc(null)
        }, 500)

      },

      showIndex(event, idx) {
        event.stopPropagation()

        if (this.layout.module == "uc" && !idx) {
          this.$store.dispatch("setLayout", ["", "", false])
        } else {
          if (idx == 1) {
            this.$store.dispatch("setLayout", ["uc", "uc", false])
          } else if (idx == 2) {
            this.$store.dispatch("setLayout", ["uc", "mm", false])
          }else if(idx==3){
            this.$store.dispatch("setLayout", ["uc", "ifo", false])
          }
        }
      }
    },
    created() {
      Util.checkCookie("eUcShEaRt").then(
        res => {
          this.setLoginInfo(res)
        },
        () => {
          let info = sessionStorage.getItem("eUcShEaRt")
          if (info) {
            this.setLoginInfo(info)
          } else {
            this.$store.dispatch("setLoginFail", true)
          }
        }
      )
      this.$http.getfilesize().then(
        res=>{
          let size = res.data || 500
          this.$store.commit("SET_FILESIZE", size)
        }
      )
       document.body.onbeforeunload = () => {
        //设置已读ID
        let cacheCurrentSession = this.$store.state.currentSession;
        if (cacheCurrentSession) {
          if (cacheCurrentSession.paramId > 1) {
            this.$store.dispatch("setSessionReadId", {
              froms: cacheCurrentSession.paramId + "-" +
                cacheCurrentSession.fromType + "-" +
                cacheCurrentSession.mId
            });
          }
        }
        let lang = store.state.lang;
        //只为兼容旧版本浏览器，新版本浏览器不允许自定义提示
        window.event.returnValue = lang.system.pageExit;
        return lang.system.pageExit;
      }
    },
    mounted() {
      setTimeout(() => {
        //获取 消息通知配置
        this.$store.dispatch("getUserSetting", {
          modularCode: "1"
        })

        // this.$store.dispatch("getNewFriends").then(() => {
        //   //?作用
        // })
        this.$store.dispatch("getallowmobile").then(() => {

        })
      }, 500)
      window.addEventListener("click", event => {
        if (this.layout.module) {
          this.$store.dispatch("setLayout", ["", "", false])
          let right = {
            show: false
          }
          this.$store.commit("SET_RIGHT", right)
        }
      })

      window.addEventListener("keyup", event => {
        if (event.keyCode == 27) {
          if (this.layout.module) {
            this.$store.dispatch("setLayout", ["", "", false])
          }
        }

        if (event.ctrlKey && event.keyCode === 67) {
          this.$store.dispatch("setLayout", ["mr", "ctrl", false])
          setTimeout(() => {
            this.$store.dispatch("setLayout", ["", "", false])
          }, 50)
        }
      })

      //鼠标右键菜单
      document.oncontextmenu = ev => {
        let mEvent = ev.target || event.target,
          data = {}
        if (this.layout.module) {
          let right = {
            show: false
          }
          this.$store.commit("SET_RIGHT", right)
        }
        //截图右键取消
        if (this.layout.module == "cp" || this.layout.module == "ss") {
          this.$store.dispatch("setLayout", ["", "", false])
          return false
        }

        for (let i = 0; i < 10; i++) {
          if (mEvent.parentNode) {
            let idx = mEvent.dataset.index
            if (idx) {
              idx = idx.replace(/%/g, '"')
              data = JSON.parse(idx)
              //if(data.type!="record") 
              this.$store.dispatch("setLayout", ["mr", "mr", false])
              data.top = ev.clientY
              data.left = ev.clientX
            }

            if (data.type) {
              break
            } else {
              mEvent = mEvent.parentNode
            }
          } else {
            break
          }
        }

        if (data.type) {
          this.mrInfo = data
          return false
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import "../assets/css/var";

  .wrapper {
    height: 100%;
    width: 100%;

    .main {
      position: relative;
      width: 1118px;
      height: 754px;
      margin: 0 auto;
      background: #eee;
      font-size: 16px;
      border-radius: 2px;
      box-shadow: 0 0 14px rgba(0, 0, 0, 0.4);

      .main-body {
        position: relative;
        width: 100%;
        height: 754px;
        overflow: visible;
        background-color: #F0F4F8;

        .user {
          width: 60px;
          height: 754px;
          background: $active-backgroup;
          .left {
            width: 60px;
            height: 754px;
            background: $color-theme;
            .setting{
              position: absolute;
              bottom: 0px;
              left: 5px;
              width: 50px;
              height: 50px;
              cursor: pointer;
              background:  url(../assets/images/index/setting.png) no-repeat;
              &:hover{
                background:  url(../assets/images/index/setting1.png) no-repeat
              }
              &.active{
                background:  url(../assets/images/index/setting1.png) no-repeat;
              }
            }
          }
        }
        .chats,.contacts{
          position: absolute;
          left: 60px;
        }
        .public-header {
          padding: 24px 8px 0;

          .user-avatar {
            width: 40px;
            height: 40px;
            border: 2px solid $color-theme;
            cursor: pointer;
          }

          .nickName {
            max-width: 112px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 14px;
          }
        }

      .more-menu {
            position: absolute;
            top:30px;
            left: 344px;
            width: 34px;
            height: 34px;
            background: url(../assets/images/index/more-menu.png) no-repeat;
            cursor: pointer;
            &:hover,
            &.active {
              background: url(../assets/images/index/more-menus.png) no-repeat;
            }
          }
        .main-menu {
          width: 60px;
          height: 50px;
          margin-top: 62px;

          .menu {
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-position: center;
            cursor: pointer;
          }

          .chat {
            background-image: url(../assets/images/index/icon-chat.png);
            &:hover{
              background-image: url(../assets/images/index/icon-chat-active.png);
            }
            &.active {
              background-image: url(../assets/images/index/icon-chat-active.png);
              border-left: 2px solid #fff;
            }
          }

          .contact {
            background-image: url(../assets/images/index/icon-contact.png);
            margin-top: 20px;
            &:hover{
              background-image: url(../assets/images/index/icon-contact-active.png);
            }
            &.active {
              background-image: url(../assets/images/index/icon-contact-active.png);
              border-left: 2px solid #fff;
            }
          }

          .icon-badge {
            top: 134px;
              left: 32px;
            display: inline;
            max-width: 16px;
            height: 16px;
            padding: 0 4px;
            line-height: 16px;
            font-size: 10px;
            border-radius: 9px;
            vertical-align: middle;
            text-align: center;
            color: #fff;
          }
        }
      }
    }
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
  }
</style>