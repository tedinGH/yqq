<template>
  <transition name="scale-x">
    <div class="friend-profile" @click.stop="">
      <div class="profile-content" @click.stop="" v-if="!showLoading">
        <span class="close" @click="close"></span>
        <div class="user-head">
          <div class="user-avatar">
            <img  v-if="userInfo.headImg" class="img" :src="global.fileDownUrl + 'compress/'+userInfo.headImg"  ondragstart="return false" v-headViewer  v-headError/>
            <!-- <span class="default" v-defaultHead v-if="!userInfo.headImg">{{userInfo.nickName}}</span> -->
            <img class="avatar" src="../../assets/images/error-head.png" v-if="!userInfo.headImg" v-headViewer>
          </div>
          <div class="display-flex-item">
            <div class="display-flex">
              <span class="user-name">{{nickName}}</span>
              <span class="sex" :class="{ male: userInfo.gender == 1 }"></span>
            </div>
            <div v-if="userInfo.alias"><span  style="color:#bbb">@</span><span v-text="userInfo.alias" style="color:#bbb"></span></div>
            <div class="user-note display-flex">
              <span style="color:#5F717F">{{ $t("msg.user.note") }}</span>
              <span style="color:#5F717F;margin-left:10px;display: inline-block; max-width: 62px;overflow: hidden;white-space:nowrap; text-overflow:ellipsis;"  v-show="!showNote&&tempNote&&tempNote!=''">{{tempNote}}</span>
              <input
                class="display-flex-item"
                id="userNote"
                :class="showNote?'active':''"
                type="text"
                maxlength="20"
                v-model="tempNote"
                @blur="setnickname()"
                @keyup.enter='setnickname()'
                :disabled="!showNote"
              />
              <label
                class="edit"
                for="userNote"
                @click="showNote = !showNote"
                v-show="!showNote"
              ></label>
            </div>
          </div>
        </div>
        <ul class="menu-list">
          <li class="menu-item region">
            <span class="lable">{{ $t("msg.user.region") }}</span>
            <span class="note">{{ address }}</span>
          </li>
          <li class="menu-item signature">
            <span class="lable">{{ $t("msg.user.signature") }}</span>
            <span  class="note" :title="userInfo.signature">{{ userInfo.signature }}</span>
          </li>
        </ul>
        <!-- <ul class="menu-list">
          <li class="menu-item">
            <span class="lable">{{ $t("msg.detail.from") }}: </span>
            <span>{{
              source
            }}</span>
          </li>
        </ul> -->
        <ul class="menu-list setting"  v-scrollBar>
          <li
            class="menu-item display-flex"
            @click="modifyFriend('isInterruption')"
          >
            <span
              class="lable flex-item-nowrap"
              :title="$t('msg.chatSetting.disturbing')"
              >{{ $t("msg.chatSetting.disturbing") }}</span
            >
            <echat-switch
              v-model="currentSession.isInterruption"
            ></echat-switch>
          </li>
          <li class="menu-item display-flex" @click="modifyFriend('isTop')">
            <span
              class="lable flex-item-nowrap"
              :title="$t('msg.chatSetting.stick')"
              >{{ $t("msg.chatSetting.stick") }}</span
            >
            <echat-switch v-model="currentSession.isTop"></echat-switch>
          </li>
          <li class="menu-item display-flex" @click="shareCard()">
            <span
              class="lable flex-item-nowrap"
              :title="$t('msg.chatSetting.recommend')"
              >{{ $t("msg.chatSetting.recommend") }}</span
            >
            <span class="icon-right"></span>
          </li>
          <li class="menu-item display-flex" @click="showclear()">
            <span
              class="lable flex-item-nowrap"
              :title="$t('msg.chatSetting.clearChatHistory')"
              >{{ $t("msg.chatSetting.clearChatHistory") }}</span
            >
            <span class="icon-right"></span>
          </li>
          <li class="menu-item display-flex" @click="showsetCycle=!showsetCycle">
            <span
              class="lable flex-item-nowrap"
              :title="$t('msg.chatSetting.autoClean')"
              >{{ $t("msg.chatSetting.autoClean") }}</span
            >
            <span v-if="clearType==0||!clearType">{{$t("msg.chatSetting.never")}}</span>
            <span v-if="clearType==1">{{$t("msg.chatSetting.one")}}</span>
            <span v-if="clearType==2">{{$t("msg.chatSetting.three")}}</span>
            <span v-if="clearType==3">{{$t("msg.chatSetting.seven")}}</span>
            <span v-if="clearType==4">{{$t("msg.chatSetting.thirty")}}</span>
            <i class="icon-s" :class="showsetCycle?'active':''"></i>
          </li>
          <ul v-if="showsetCycle" class="cyclelist">
            <li @click="setCycle(0)"><span :class="clearType==0?'check pot':'pot'"></span>{{$t("msg.chatSetting.never")}}</li>
            <li @click="setCycle(1)"><span :class="clearType==1?'check pot':'pot'"></span>{{$t("msg.chatSetting.one")}}</li>
            <li @click="setCycle(2)"><span :class="clearType==2?'check pot':'pot'"></span>{{$t("msg.chatSetting.three")}}</li>
            <li @click="setCycle(3)"><span :class="clearType==3?'check pot':'pot'"></span>{{$t("msg.chatSetting.seven")}}</li>
            <li @click="setCycle(4)"><span :class="clearType==4?'check pot':'pot'"></span>{{$t("msg.chatSetting.thirty")}}</li>
          </ul>
        </ul>
        <div class="delete" @click="doDeleteFriend">
          {{ $t("msg.detail.delete") }}
        </div>
        </div>
      <loading v-if="showLoading"></loading>
    </div>
  </transition>
</template>
<script>
import { Config } from "@/common/config"
import { api } from "@/api";
import QRCode from "qrcode";
import { mapGetters } from "vuex";
import { Util } from "@/tools/utils";
import { EchatDB } from "@/tools/indexedDB";
import { msgManager } from "@/session/msgManager";
import {friendDB} from "@/session/friend/friendDB";
import { friend } from "@/session/friend";
import { group } from "@/session/group";
import { localStore } from "@/tools/localStorage";
export default {
  name: "profile",
  data() {
    return {
      showNote: false,
      tempNote: null,
      showSuccess: false,
      userInfo: {},
      nickName:'',
      address: "",
      source: "",
      showQrCode: false,
      showLoading: true,
      showsetCycle:false,
      filterList:[
        this.$t("msg.detail.stranger"),
        this.$t("msg.menu.search"),
        this.$t("msg.detail.scanQRcode"),
        this.$t("msg.detail.shareCard"),
        this.$t("msg.detail.peopleNearby"),
        this.$t("msg.detail.shareInvite"),
        this.$t("msg.detail.groupUserAdd"),
        "",
        this.$t("msg.user.usernameSearch"),
        '',
        '',
        this.$t("msg.detail.addfriends"),
      ],
      clearType:null,
    };
  },
  components: {
    QRCode
  },
  computed: {
    ...mapGetters(["currentSession"])
  },
  methods: {
    close(){
      this.$store.dispatch("setLayout", ["", "", false]);
    },
    filterSource(val) {
      if (+val >= 0 && +val < 12) return this.filterList[val]
      else return "";
    },
    show() {
      let userId=this.currentSession.paramId;
      this.showNote = false;
      this.userInfo = this.$store.state.friendList[userId];
      if(this.userInfo){
        this.address=this.userInfo.stateCode+' '+this.userInfo.countryCode;
        this.source = this.filterSource(this.userInfo.source)
      }else{
        this.address='';
      }
      
      if (this.userInfo) this.tempNote = this.userInfo.notes;
      this.showLoading = false;

      //获取好友配置
      this.getFriendInfo()
    },
    getFriendInfo(){
      api.getFriendInfo({recipient:this.currentSession.paramId}).then(data =>{
          data.checked = false;
          this.nickName = data.nickName
          data.nickName = data.notes || data.nickName || data.userName;
          if (data.avatar) {
            data.headImg = data.avatar;
          }
          this.$store.commit("ADD_FRIEND_INFO", {userId,info:data});
          this.userInfo=data;
          this.tempNote=this.userInfo.notes;
          this.address=this.userInfo.stateCode+' '+this.userInfo.countryCode
      })
    },
    useqrcode(path) {
      var canvas = document.getElementById("qrcodeCard");
      QRCode.toCanvas(canvas, path, error => {
        if (error) console.error(error)
      });
    },
    hideCode() {
      this.showQrCode = false;
    },
    setnickname() {
      if(this.tempNote== undefined){
        this.showNote = false;
        return;
      }
      if (
        this.tempNote && this.tempNote.replace(/(&nbsp;*)|(\s*)/g, "").length == 0
      ) {
        this.showNote = false;
        return;
      }
      this.showNote = false;
      let obj = {
        recipient: this.currentSession.paramId,
        confString: {
          notes: this.tempNote || ""
        }
      };
      obj.confString = JSON.stringify(obj.confString);
      let userId=this.currentSession.paramId;
      this.$http.setRemark(obj).then(
        res => {
          let userId=this.currentSession.paramId;
          if (this.tempNote ==''){
            api.getFriendInfo({recipient:userId}).then(data =>{
              this.userInfo = this.$store.state.friendList[userId];
              this.userInfo.nickName =data.nickName
              let param = this.currentSession
              param.name = data.nickName
              let session = JSON.parse(JSON.stringify(param));
              this.$store.commit("UPDATE_SESSION", session);
            })
          }else{ 
            this.userInfo = this.$store.state.friendList[userId];
            this.userInfo.nickName =this.tempNote
            let param = this.currentSession
            param.name=this.tempNote 
            let session = JSON.parse(JSON.stringify(param));
            this.$store.commit("UPDATE_SESSION", session);
          }
        },
        () => {}
      );
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
            // this.showClear = false;
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
    showclear(){
      this.$parent.$refs.chatheader.showCleanHistory = true
    },
    shareCard() {
      let forwardInfo = {
        show: true,
        body: [
          {
            msgType: 32,
            bodyContent: {
              alias:this.userInfo.alias,
              avatar: this.userInfo.avatar,
              nickName:this.nickName,
              remark: null,
              userId: this.userInfo.userId
            }
          }
        ]
      };
      this.$store.commit("SET_FORWARD_INFO", forwardInfo)
      this.$emit("value", 0)
    },
    modifyFriend(type) {
      let confString = "";
      if (type == "isTop") {
        if (this.currentSession.isTop == 0) {
          confString = JSON.stringify({ isTop: 1 });
        } else {
          confString = JSON.stringify({ isTop: 0 });
        }
      } else {
        if (this.currentSession.isInterruption == 0) {
          confString = JSON.stringify({ isInterruption: 1 })
        } else {
          confString = JSON.stringify({ isInterruption: 0 })
        }
      }
      let obj = {
        recipient: this.currentSession.paramId,
        confString: confString
      };
      this.$http.setFriendSetting(obj).then(() => {
        this.settingHandler(type);
        this.getFriendInfo()
      });
    },
    settingHandler(type) {
      switch (type) {
        case "isTop":
          if (this.currentSession.isTop == 0) {
            this.currentSession.isTop = 1;
          } else {
            this.currentSession.isTop = 0;
          }
          this.$store.commit("UPDATE_SESSION", this.currentSession)
          break;
        case "isInterruption":
          if (this.currentSession.isInterruption == 0) {
            this.currentSession.isInterruption = 1;
          } else {
            this.currentSession.isInterruption = 0;
          }
          this.$store.commit("UPDATE_SESSION", this.currentSession)
          break;
          default:
          return
      }
    },
    doDeleteFriend() {
       this.$message({
          confirmButtonText: this.$t("msg.common.ensure"),
          cancelButtonText:this.$t("msg.common.cancel"),
          title: this.$t("msg.detail.delete"),
          message: this.$t("msg.detail.confirmDelete"),
          showCancelButton: true
        }).then(data => {
          this.$http.deleteFriend({ recipient: this.userInfo.userId }).then(() => {
        this.$store.dispatch("setLayout", ["", "", false]);
        //删除好友
        friendDB.deleteFriend(+this.userInfo.userId);
        this.$store.commit('DEL_FRIEND_INFO',Number(this.userInfo.userId));
        this.$store.commit("DELETE_SESSION", this.userInfo.userId+'-0');
        if (
          this.userInfo.userId == this.$store.getters.currentSession.paramId
        ) {
          this.$store.commit("UPDATE_CURRENT_SESSION", {});
          setTimeout(() => {
            let list = Object.values(this.$store.state.session.record)
            list.sort((a, b) => b.userTime - a.userTime);
            let sessionCache= this.$store.state.session.record
            for(let key in sessionCache){
              if(sessionCache[key].isActivity){
                sessionCache[key].isActivity=false;
              }        
            }
            list[0].isActivity=true
            this.$store.commit("UPDATE_CURRENT_SESSION", list[0])
          }, 100);
        }
        msgManager.removeMsgAll(0,this.userInfo.userId);
      });
        })
    }
  },
  mounted() {
    this.show();
    this.clearType =localStore.readRegularCleaning(this.currentSession.paramId).cleanMsgCycle || 0;
  },
  beforeDestroy() {
    window.removeEventListener("click", this.hideCode)
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/var";
.default{
  position:absolute;
  top:0;left:0;
}
#userNote{
  width: 120px;
  height: 24px;
  background: #F7F8FD;
  border: 1px solid $color-theme;
  margin-left: 10px;
  display: none;
  &.active{
    display: block;
  }
}
.user-name{
  max-width: 125px;
}
.menu-item{
  height: 60px;
  line-height: 60px;
  .lable{
    color: #8D95A2;
  }
  .note{
    color:#5F717F;
    line-height: 14px;
    display: inline-block;
    width: 210px;
    overflow: hidden;                  
    white-space:nowrap;               
    text-overflow:ellipsis; 
  }
}
</style>