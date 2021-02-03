<template>
  <!-- 转发 -->
  <div class="my-popup forward"  @click="forwardInfo.show = false" >
    <div class="my-popup-content display-flex" @click.stop=";">
      <span class="my-popup-close" @click.stop="forwardInfo.show = false"></span>
      <div class="right-content">
        <div class="title">
          <span>{{ $t("msg.tip.forwardContact") }}</span>
          <span class="sp-right">{{Object.keys(selectList).length}}/9</span>
        </div>
        <ul class="forward-list" v-scrollBar>
          <li class="forward-list-item display-flex" v-for="(item, idx) in selectlist" :key="idx"
            @click="deleteChecked(item,idx)">
            <span class="unselect"></span>
            <div class="item-left">
              <img :src="global.fileDownUrl + 'compress/' + item.img" class="avatar" v-headError v-if="item.fromType == 0 && item.img" /> 
              <img :src="global.fileDownUrl + 'compress/' + item.img" class="avatar" v-headErrors  v-if="item.fromType == 1 && item.img">
              <img class="avatar" src="../assets/images/error-head.png" v-if="item.fromType == 0 && !item.img">
              <img class="avatar" src="../assets/images/error-head2.png" v-if="item.fromType == 1 && !item.img">
            </div>
            <div class="item-right display-flex-item">
              <span class="name-line" v-text="item.name"></span>
            </div>
          </li>
        </ul>
        <button class="two-btn comfirm" @click="flag&&doForward()">
          {{ $t("msg.common.send") }}
        </button>
        <button class="two-btn cannel" @click="forwardInfo.show = false">
          {{ $t("msg.common.cancel") }}
        </button>
      </div>
      <div class="left-content">
        <div class="search-box">
          <div class="search-input">
            <i class="seach-icon"></i>
            <input type="text" :placeholder="$t('msg.menu.search')" v-model="searchKey" />
            <i class="icon-delete" @click="searchKey = ''" v-show="searchKey"></i>
          </div>
        </div>
        <div class="display-flex tip-box">
          <label @click="switchType(2)" class=""
            :class="{ active: forwardType == 2 }">{{ $t("msg.menu.chatting") }}</label>
          <label @click="switchType(0)" :class="{ active: forwardType == 0 }">{{
            $t("msg.menu.contact")
          }}</label>
          <label @click="switchType(1)" :class="{ active: forwardType == 1 }">{{
            $t("msg.menu.group")
          }}</label>
        </div>
        <ul class="forward-list" v-scrollBar v-show="searchKey == ''">
          <!-- 聊天列表 -->
          <li v-show="forwardType==2" class="forward-list-item display-flex"
            :class="{ hide: item.temp || item.fromType == 2 }" v-for="(item, index) in showList" :key="index"
            @click="clickChecked(item)">
            <span class="select" :class="{ active: item.checked }"></span>
            <div class="item-left">
             <img :src="global.fileDownUrl + 'compress/' + item.img" class="avatar" v-headError
                v-if="item.fromType == 0  && item.img" />
              <img :src="global.fileDownUrl + 'compress/' + item.img" class="avatar" v-headErrors
              v-if="item.fromType == 1 && item.img" />
              <img class="avatar" src="../assets/images/error-head.png" v-if="item.fromType == 0 && !item.img">
              <img class="avatar" src="../assets/images/error-head2.png" v-if="item.fromType == 1 && !item.img">
            </div>
            <div class="item-right display-flex-item">
              <span class="name-line" v-text="item.name"></span>
            </div>
            
          </li>
          <!-- 联系人/群聊 -->
          <section v-show="forwardType!=2" v-for="(data) in showList" :key="data.paramId">
            <div v-if="data.data && data.data.length" class="sort-letter">
              {{ data.letter }}
            </div>
            <li class="forward-list-item display-flex" :class="{ hide: item.temp || item.fromType == 2 }"
              v-for="(item, ind) in data.data" :key="ind" @click="clickChecked(item)">
              <span class="select" :class="{ active: item.checked }"></span>
              <div class="item-left">
              <img :src="global.fileDownUrl + 'compress/' + item.img" class="avatar" v-headError
                v-if="item.fromType == 0  && item.img" />
              <img :src="global.fileDownUrl + 'compress/' + item.img" class="avatar" v-headErrors
              v-if="item.fromType == 1 && item.img" />
              <img class="avatar" src="../assets/images/error-head.png" v-if="item.fromType == 0 && !item.img">
              <img class="avatar" src="../assets/images/error-head2.png" v-if="item.fromType == 1 && !item.img">
              </div>
              <div class="item-right display-flex-item">
                <span class="name-line" v-text="item.name"></span>
              </div>
              
            </li>
          </section>
        </ul>
        <ul class="forward-list" v-scrollBar v-show="searchKey != ''">
          <li class="forward-list-item display-flex" :class="{ hide: item.temp }" v-for="(item, ids) in forwardResult"
            :key="ids" @click="clickChecked(item)">
            <span class="select" :class="{ active: item.checked }"></span>
            <div class="item-left">
             <img :src="global.fileDownUrl + 'compress/' + item.img" class="avatar" v-headError
                v-if="item.fromType == 0  && item.img" />
              <img :src="global.fileDownUrl + 'compress/' + item.img" class="avatar" v-headErrors
              v-if="item.fromType == 1 && item.img" />
              <img class="avatar" src="../assets/images/error-head.png" v-if="item.fromType == 0 && !item.img">
              <img class="avatar" src="../assets/images/error-head2.png" v-if="item.fromType == 1 && !item.img">
            </div>
            <div class="item-right display-flex-item">
              <span class="name-line-top" v-html="item.tempName"></span><br />
              <span class="name-line-bottom"><span v-if="item.fromType == 0">EchatAPP</span><span
                  v-if="item.fromType == 1">{{ $t("msg.friendList.group") }}</span> ID:
                <span v-html="item.tempId"></span></span>
            </div>
          </li>
          <div class="display-flex display-flex-item" style="flex-direction: column " v-if="Object.keys(forwardResult).length ==0">
              <img src="../assets/images/search/datanone.png">
              <p style="color:#5F717F">{{$t('msg.friendList.searchKey')}}</p>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import Msg from "@/tools/msg";
import { Util } from "@/tools/utils";
import "@/common/pinyin.js";
import { MessageHandler } from "@/tools/messageHandler";
import { sessionInfo } from "@/session/sessionInfo";

export default {
  name: "forward",
  data() {
    return {
      forwardType: "2",
      searchKey: "",
      chatList: {},
      friendList: {},
      groupList: {},
      forwardList: {},
      forwardResult: {},
      selectList: {},
      selectlist:[],
      flag: true,
      timerID:null
    };
  },
  computed: {
    ...mapGetters([
      "userId",
      "userInfo",
      "currentSession",
      "session",
      "forwardInfo",
    ]),
    sumList() {
      return Object.values(this.selectList);
    },
    showList() {
      let arr = Object.values(this.forwardList);
      return arr;
    },
    List() {
      let arr = Object.values(this.session.record);
        for (var i = 0; i < arr.length; i++) {
          if(arr[i].paramId==1000150) arr[i].name = this.$t("msg.common.service")
          if(arr[i].paramId==1000110) arr[i].name =  this.$t("msg.common.team")
        }
        return arr;
    },
     /**置顶会话 */
    topList() {
      let arr1 = [];
      this.List.forEach(v => {
        if (v.isTop) {
          arr1.push(v);
        }
        if(v.paramId==1000150) v.name = this.$t("msg.common.service")
        if(v.paramId==1000110) v.name =  this.$t("msg.common.team")
      });
      arr1.sort((a, b) => b.userTime - a.userTime);
      return arr1;
    },
    /**
     * 一般会话
     */
    normalList() {
      let arr1 = [];
      this.List.forEach(v => {
        if (!v.isTop) {
          arr1.push(v);
        }
        if(v.paramId==1000150) v.name = this.$t("msg.common.service")
        if(v.paramId==1000110) v.name =  this.$t("msg.common.team")
      });
      arr1.sort((a, b) => b.userTime - a.userTime);
      return arr1;
    },

  },
  watch: {
    searchKey(ov, nv) {
      let list = [];
      if (this.forwardType == 0) list = Object.values(this.friendList);
      if (this.forwardType == 1) list = Object.values(this.groupList);
      if (this.forwardType == 2) list = Object.values(this.chatList);
      this.forwardResult = this.friendQuery(list, ov);
    },
  },
  methods: {
    init() {
      this.chatList = this.topList.concat(this.normalList) 
      for (let key in this.chatList) {
        this.$set(this.chatList[key], "checked", false);
      }
      this.friendList = JSON.parse(
        JSON.stringify(this.$store.state.friendList)
      );
      for (let key in this.friendList) {
        let item = this.friendList[key];
        this.$set(this.friendList[key], "checked", false);
        this.$set(this.friendList[key], "fromType", 0);
        this.$set(this.friendList[key], "img", item.headImg);
        this.$set(this.friendList[key], "name", item.nickName);
        this.$set(this.friendList[key], "paramId", item.userId);
      }
      this.groupList = JSON.parse(JSON.stringify(this.$store.state.groupList));
      for (let key in this.groupList) {
        let item = this.groupList[key];
        this.$set(this.groupList[key], "checked", false);
        this.$set(this.groupList[key], "fromType", 1);
        this.$set(this.groupList[key], "img", item.headImg);
        this.$set(this.groupList[key], "name", item.groupName);
        this.$set(this.groupList[key], "paramId", item.groupId);
      }
      this.switchType(2);
    },

    //联系人模糊搜索
    friendQuery(list, keyWord) {
      var arr = {};
      for (let key in list) {
        var item = list[key],
          tempId = item.paramId;
        let m = PinyinMatch.match(item.name, keyWord);
        if (m || ("" + tempId).indexOf(keyWord) >= 0) {
          if (m) item["tempName"] = this.redFont(item.name, m[0], m[1]);
          else item["tempName"] = item.name;
          var findId = (tempId + "").split(keyWord);
          item["tempId"] = findId.join(
            '<span class="search-key">' + keyWord + "</span>"
          );
          if (item.fromType == 0 || item.fromType == 1) arr[key] = item;
        }
      }
      if (keyWord == "") arr = list;
      return arr;
    },
    redFont(str, start, end) {
      return (
        str.substring(0, start) +
        '<span class="search-key">' +
        str.substring(start, end + 1) +
        "</span>" +
        str.substring(end + 1)
      );
    },
    clickChecked(item) {
      if (item.fromType == "1") {
        sessionInfo.getChatInfo(1, item.paramId, this.userId).then((memberInfo) => {
            let forbiddenWord = false;
            if (memberInfo.isBanned) {
              forbiddenWord = true;
            }
            if (
              this.currentSession.isBanned &&
              (!memberInfo.isAdmin || memberInfo.isAdmin < 1)
            ) {
              forbiddenWord = true;
            }
            if (forbiddenWord) {
              this.$store.commit(
                "SET_TOAST_TEXT",
                this.$t("msg.forbidden.mute")
              );
              return;
            }
            this.checkedHandler(item);
          });
      } else {
        this.checkedHandler(item);
      }
    },
    checkedHandler(item) {
      if (this.sumList.length < 9) {
        if (!item.checked) {
          this.$set(this.selectList, item.paramId, item);
          this.selectlist.push(item)
          this.addChecked(item);
          item.checked = true;
        } else {
          let idx = (this.selectlist).findIndex(v=>v.paramId==item.paramId)
          this.deleteChecked(item,idx);
          item.checked = false;
        }
      } else if (this.sumList.length == 9) {
        if (item.checked) {
          let idx = (this.selectlist).findIndex(v=>v.paramId==item.paramId)
          this.deleteChecked(item,idx);
          item.checked = false;
        }else{
          this.$store.commit(
          "SET_TOAST_TEXT",
          this.$t("msg.tip.forwardup") 
        );
        }
      } else {
        if (item.checked) {
          item.checked = !item.checked;
        }
      }
    },
   
    addChecked(item) {
      if (this.friendList[item.paramId])
        this.friendList[item.paramId].checked = true;
      if (this.groupList[item.paramId])
        this.groupList[item.paramId].checked = true;
      if (this.chatList[item.paramId + "-" + item.fromType])
        this.chatList[item.paramId + "-" + item.fromType].checked = true;
    },
    deleteChecked(item,idx) {
      this.$delete(this.selectList, item.paramId);
      this.selectlist.splice(idx, 1)
      if (this.friendList[item.paramId])
        this.friendList[item.paramId].checked = false;
      if (this.groupList[item.paramId])
        this.groupList[item.paramId].checked = false;
      if (this.chatList[item.paramId + "-" + item.fromType])
        this.chatList[item.paramId + "-" + item.fromType].checked = false;
    },
    switchType(type) {
      this.forwardType = type;
      //联系人
      if (type == 0) this.forwardList = Util.sortByLetter(this.friendList);
      if (type == 1)
        this.forwardList = Util.sortByLetter(this.groupList, "group");
      if (type == 2) this.forwardList = this.chatList;
    },
    doForward() {
        let that = this
        if(this.flag){
          let list = this.getCheckedArr(this.selectList);
          if (!(list && list.length)) {
            this.$store.commit("SET_TOAST_TEXT", this.$t("msg.tip.forwardupone"));
            return false;
          }

          for (var j = 0; j < this.forwardInfo.body.length; j++) {
            let item = JSON.parse(JSON.stringify(this.forwardInfo.body[j]));
            if (!item.msgContent) {
              item.msgContent = JSON.parse(JSON.stringify(item.bodyContent));
              if (item.msgType == 3) {
                item.msgContent.imgUrl = item.msgContent.imgUrl;
              }
            }
            if (item.msgType == 1 || item.msgType == 13) {
              item.bodyContent = MessageHandler.htmlToText(item.bodyContent);
            }
            // if (!item.preview) {
            item.preview = Msg.filterRecord(item.msgType, item.bodyContent);
            // }
            if (item.msgType == 24) {
              item.msgContent = MessageHandler.htmlToText(item.msgContent);
              item.bodyContent = MessageHandler.htmlToText(item.msgContent);
              item.preview = Msg.replayLabel(item.msgContent);
              item.msgType = 1;
            }
            if (item.msgType == 28) {
              if (
                item.msgContent.editType == 28 ||
                item.msgContent.editType == 30 ||
                item.msgContent.editType == 1
              ) {
                if (typeof item.msgContent.content == "object") {
                  item.msgContent = item.msgContent.content.content;
                } else {
                  item.msgContent = item.msgContent.content;
                }
              }
              item.preview = Msg.replayLabel(item.msgContent);
              item.bodyContent = MessageHandler.htmlToText(item.msgContent);
              item.msgType = 1;
            }
            if (item.msgType == 30) {
              if (!(typeof item.msgContent == "object"))
              item.msgContent = JSON.parse(item.msgContent);
              item.bodyContent = MessageHandler.htmlToText(item.msgContent.content);
              item.msgContent = MessageHandler.htmlToText(item.msgContent.content);
              item.preview = Msg.replayLabel(item.msgContent);
              item.msgType = 1;
            }
            this.sendOne(item, list);
          }
          this.$store.commit("SET_FORWARD_INFO", {
            show: false,
            body: [],
          });
          this.$parent.$refs.chat.$refs.chatHistory.forwordState=0
          this.$parent.$refs.chat.$refs.chatHistory.forwordSelect=false
          this.$parent.$refs.chat.$refs.chatHistory.showMore=false
          this.$store.dispatch("setLayout", ["", "", false]);
          setTimeout(() => {
            this.$parent.$refs.chat.$refs.chatHistory.doShowSuccess2();
            }, 500);
      }  
      this.flag = false
      this.timerID = setTimeout(function () {
        that.flag = true
      }, 1000)
    },
    sendOne(msg, list) {
      return new Promise((resolve, reject) => {
        for (var i = 0; i < list.length; i++) {
          let item = list[i];
          let paramId = item.paramId;
          let time = new Date().getTime();

          let obj = {
            msg:
              typeof msg.bodyContent == "object"
                ? JSON.stringify(msg.bodyContent)
                : msg.bodyContent,
            msgType: msg.msgType,
            chatType: item.fromType,
            toId: item.paramId,
            time,
            userId: this.userInfo.userId,
          };
          let chat = this.session.record[item.paramId + "-" + item.fromType];
          if (chat) {
            chat.lastReadId = chat.lastReadId + 1;
            chat.mId = chat.mId + 1;
            chat.msgType = msg.msgType;
            chat.preview = msg.preview;
            chat.userTime = time;
            chat.fromType= item.fromType
            this.$store.dispatch("sendMsg", obj);
            this.upnew(msg,time)
            this.$store.commit("UPDATE_SESSION", chat)
            setTimeout(() => {
            this.gotoChat(chat)
            }, 500);
          } else {
            sessionInfo
              .getChatInfo(item.fromType, item.paramId)
              .then((chatInfo) => {
                var newChat = {
                  name: chatInfo.nickName,
                  img: chatInfo.headImg,
                  lastReadId: 0,
                  paramId: item.paramId,
                  mId: 1,
                  fromType: item.fromType,
                  msgType: msg.msgType,
                  preview: msg.preview,
                  userTime: new Date().getTime(),
                };
                this.$store.dispatch("sendMsg", obj);
                this.upnew(msg,time)        
                this.$store.commit("UPDATE_SESSION", newChat)
                setTimeout(() => {
                  this.gotoChat(newChat)
                }, 500);
              });
          }  
        }
      });
    },
    //更新
    upnew(msg,time){
      let history = {
        bodyContent: msg.bodyContent,
        msgContent: msg.msgContent,
        bodyFrom: this.userInfo.userId,
        bodyLevel: 1,
        bodyTime: time,
        bodyType: msg.msgType,
        mId: time,
        loading: 0,
        createTime: time,
        preview: msg.preview,
        checked: false,
        chatInfo: {
          nickName: this.userInfo.nickName,
          headImg: this.userInfo.headImg,
        },
      };
      this.$store.commit("UPDATE_MESSAGE", history);
    },
      gotoChat(item) {
      this.$store.commit("SET_ROUTE_NAME", "chat");
      var chat = this.$store.state.session.record[item.paramId+'-'+item.fromType];
      if (!chat) {
        var newChat = {
          img: item.headImg,
          lastReadId: 0,
          mId: 0,
          fromType: item.fromType,
          msgType: 1,
          preview: "",
          userTime: new Date().getTime()
        };
        if (item.fromType == 0) {
          newChat.name = item.notes || item.nickName || item.userName;
          newChat.paramId = item.userId;
        }
        if (item.fromType == 1) {
          newChat.name = item.groupName;
          newChat.paramId = item.groupId;
        }
        let sessionCache= this.$store.state.session.record;
          for(let key in sessionCache){
            let sCache=sessionCache[key];
            if(sCache.isActivity){
              sCache.isActivity=false;
            }        
          }
        newChat.isActivity=true;
        this.$store.commit("UPDATE_SESSION", newChat);
        this.$store.commit("UPDATE_CURRENT_SESSION", newChat);      
        return false;
      }else{
      let sessionCache= this.$store.state.session.record;
      for(let key in sessionCache){
        let sCache=sessionCache[key];
        if(sCache.isActivity){
          sCache.isActivity=false;
        }        
      }
      chat.isActivity=true;
        this.$store.commit("UPDATE_CURRENT_SESSION", JSON.parse(JSON.stringify(chat)));
      }
      },
  
    getCheckedArr(list) {
      var result = [];
      if (list) {
        for (var key in list) {
          var item = list[key];
          if (item.checked == true) {
            result.push({
              fromType: item.fromType,
              paramId: item.paramId,
            });
          }
        }
      } else {
        result = [];
      }
      return result;
    },
  },
  mounted() {
    this.init();
  },
  destroyed () {
    clearTimeout(this.timerID)
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var";
//发起新群聊弹窗
.forward {
  z-index: 999;
  .my-popup-content {
    width: 731px;
    height: 492px;  
    border-radius: 5px;
    text-align: left;
    overflow: hidden;
    background:  #ffffff;
    .left-content {
      height: 100%;
      width: 471px;
      border-right: 1px solid #e2e2e2;

      .search-box {
        width: 100%;
        padding: 27px 40px 0 40px;
        border: 0;
        background:#ffffff;

        .search-input {
          width: 100%;
          input {
          padding-left: 35px;
        }
        }
        .seach-icon{
          position: absolute;
          top: 50%;
          left: 8px;
          display: block;
          margin-top: -10px;
          width: 21px;
          height: 20px;
          background-image: url(../assets/images/search/search2.png);
          background-size: 100% 100%;
        }
        .icon-delete {
          position: absolute;
          top: 50%;
          right: 10px;
          display: block;
          margin-top: -12px;
          width: 24px;
          height: 24px;
          background-image: url(../assets/images/search/xx.png);
          background-size: 100% 100%;
          cursor: pointer;
      }
  }

      .tip-box {
        justify-content: space-between;
        padding: 8px 40px 24px;
        text-align: center;
        font-size: 14px;
        label {
          width: 117px;
          height: 32px;
          line-height: 32px;
          background: #fff;
          color:$color-theme;
          border: 1px solid $color-theme;
          border-radius: 16px;
          cursor: pointer;
          &.active{
            color:#fff;
            background: $color-theme;
          }
        }
      }
    }

    .forward-list {
      position: relative;
      height: calc(100% - 134px);

      .sort-letter {
        position: relative;
        margin-top: 10px;
        padding-left: 33px;
        line-height: 22px;
        font-size: 16px;
        color: #999;
      }

      .forward-list-item {
        padding: 0 40px;
        box-sizing: border-box;
        // border-bottom: 1px solid #e0e0e0;
        cursor: pointer;
        &.hide {
          display: none;
        }

        .item-left {
          position: relative;
          height: 59px;
          line-height: 59px;
          margin: 0 8px 0 0;

          .avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
          }

          .default {
            display: inline-block;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            text-align: center;
            line-height: 45px;
            font-weight: 550;
            color: #fff;
          }
        }
        .name-line{
          color: #122030;
        }
        .item-right {
          text-align: left;
        }

        .select {
          height: 20px;
          width: 20px;
          margin: 4px 10px 0 5px;
          background-image: url(../assets/images/icon/select.png);
          background-size: 100% 100%;

          &.active {
            background-image: url(../assets/images/icon/select-blue.png);
          }
        }
      }
    }

    .right-content {
      height: 100%;
      width: 260px;
      // border-right: 1px solid #e2e2e2;
      text-align: center;
      background: #fff;

      .title {
        width: 100%;
        padding: 40px 20px 0 20px;
        text-align: left;
        font-size: 14px;
        border: 0;
        color: #5F717F;
        span {
          display: inline-block;
        }

        .sp-right {
          float: right;
          color: #ACACAC;
        }
      }
      .forward-list-item{
        padding: 0 20px;
      }
      .unselect {
        height: 18px;
        width: 18px;
        margin: 0 10px 0 5px;
        background-image: url(../assets/images/icon/select-blue.png);
        background-size: 100% 100%;
        cursor: pointer;
      }

      .session-list {
        height: calc(100% - 150px);
        margin-bottom: 15px;

        .item-right {
          text-align: left;
        }
      }

      .cannel {
        margin-right: 30px;
      }
    }

    .two-btn {
      margin-top: 20px;
      &.comfirm{
        width: 115px;
        height: 40px;
      }
      &.cannel{
        width: 115px;
        height: 40px;
        margin:0 0 0 5px;
      }
    }
  }
}
</style>
