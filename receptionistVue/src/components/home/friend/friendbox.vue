<template>
  <div v-if="!currentSession.chatId" class="default">
    <img src="../../../assets/images/big-logo.png" />
  </div>
  <div class="friendbox" v-else>
    <div>
      <div>
        <div class="head">
          <div>
            <span class="head-text">{{ currentSession.name }}</span>
          </div>
        </div>
        <div
          class="message-box"
          id="message-box"
          ref="list"
          @ps-y-reach-start="loadMore"
          @ps-y-reach-end="scrollY"
          v-scrollBar
        >
          <msgList :chatlist="chatlist" :userInfo="userInfo" :currentSession="currentSession"></msgList>
        </div>
      </div>
      <sessionInput ref="sessionInput" :layout="layout" @selectAll="selectAll" @send="send"></sessionInput>
    </div>
    <file-popup ref="sendFile" :fileInfo="dropFileInfo"></file-popup>
    <picture-popup ref="sendPicture" :imgInfo="pasteImage"></picture-popup>
    <Popup :hideClose="false" v-if="layout.module == 'oversize'" :radius="10">
      <div class="seal" slot="body">
        <div class="content">{{ $t("msg.chatPanel.overSize") }}</div>
        <div class="btn" @click="confirmTips">{{ $t("msg.common.confirm") }}</div>
      </div>
    </Popup>
    <Popup :hideClose="false" v-if="layout.module == 'fileTypeSupport'" :radius="10">
      <div class="seal" slot="body">
        <div class="content">{{ $t("msg.chatPanel.fileTypeSupport") }}</div>
        <div class="btn" @click="confirmTips">{{ $t("msg.common.confirm") }}</div>
      </div>
    </Popup>
    <Popup :hideClose="false" v-if="layout.module == 'error'" :radius="10">
      <div class="seal" slot="body">
        <div class="content">Error!</div>
        <div class="btn" @click="confirmTips">{{ $t("msg.common.confirm") }}</div>
      </div>
    </Popup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import reply from "@/components/home/session/reply";
import UplaodFiles from "@/components/common/uploadFile";
import msgList from "@/components/home/msgList";
import sessionInput from "@/components/home/sessionInput";
import { msgEnum, sessionEnum } from "@/common/enum";
import Rtc from "@/tools/rtc-message";
import { Util } from "@/tools/utils";
import { timeUtil } from "@/tools/timeUtil";
import { msgUtil } from "@/tools/msgUtil";
import { msgFormatTemplate } from "@/tools/msgFormatTemplate";
import { msgManager } from "@/session/msgManager";
import { actionApi } from "@/api";
export default {
  name: "friendbox",
  data() {
    return {
      msgEnum,
      chatlist: [],
      sortJson: {},
      editFocus: true,
      more: false,
      lastMsgDateItem: "",
      scrollFlag: 2, // 0-加载更多 1-加载中  2-没有更多了
      chatScrollTop: 0, // 滚动高度
      pagination: {
        pageSize: 20,
        currentPage: 1,
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo", "currentSession", "layout"]),
  },
  components: {
    msgList,
    sessionInput,
  },
  mixins: [UplaodFiles],
  watch: {
    currentSession(item, old) {
      this.chatlist.length = 0;
      this.sortJson.length = 0;
      if (item.chatId) {
        let maxMsgId = item.msgId ? item.msgId : 10000;
        msgManager.getMsg(item.chatType, item.chatId, maxMsgId, 1, false, 30, this.pagination.currentPage).then((array) => {
          array.forEach((element) => {
            if (
              element.id <= item.msgId &&
              element.type != msgEnum.video &&
              element.type != msgEnum.files &&
              element.type != msgEnum.audio &&
              element.type != msgEnum.img
            ) {
              if (typeof element.viewShow == "string") {
                element.viewShow = element.viewShow.replace('class="wait"', 'class="sendsuccess"').replace('class="senging"', 'class="sendsuccess"');
              }
            }
            this.pushMsg(element, "init");
          });
          setTimeout(() => {
            if (array.length > 20) {
              this.scrollFlag = 0;
            }
          }, 300);
        });
      }

      let cacheSessionList = this.$store.state.sessionColleagueList;
      // 设置已读会话
      this.$api
        .getAndSetReadedSessionList({ sessionType: item.chatType, sessionId: item.chatId, maxId: item.msgId, time: this.$store.state.sessionTime })
        .then((data) => {
          let time = data.data.time; //记录时间戳
          let cacheData = data.data.list;
          cacheSessionList.forEach((v) => {
            for (var i = 0; i < v.listUser.length; i++) {
              let cU = v.listUser[i];
              for (let key in cacheData) {
                let cacheL = cacheData[key];
                if (cacheL.sessionId == cU.chatId) {
                  cU.msgId = cacheL.msgId;
                  cU.unread = cacheL.msgId - cacheL.readId;
                  cU.otherReadId = cacheL.otherReadId;
                }
              }
            }
          });
          this.$store.state.currentSession.sessionId = item.chatId;
          this.$store.commit("SET_SESSION_COLLEAGUE_LIST", cacheSessionList);
          this.$store.commit("SET_SESSION_TIME", time);
        });

      setTimeout(() => {
        this.$refs.sessionInput.$refs.editMsg.innerHTML = "";
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
      }, 100);
    },
  },
  methods: {
    confirmTips() {
      this.$store.dispatch("setLayout", ["", "", false]);
    },
    cancelUploadMsg(id) {
      let mediaIndex = this.chatlist.findIndex((item) => item.id == id);
      console.log(mediaIndex);
      this.chatlist.splice(mediaIndex, 1);
    },
    scrollY() {
      // if (this.currentUnread.num < 1 || (30 >= this.chatHistory.length && !this.mewMsgId)) return;
      // this.currentUnread = {
      //   num: 0,
      //   lastReadId: 0
      // };
      // this.mewMsgId = 0;
      // this.$store.dispatch("getAndSetReadedSessionList", {
      //   time: sessionUtil.getlocalSessionTime(),
      //   froms: this.currentSession.paramId + "-" + this.currentSession.fromType + "-" + this.currentSession.mId
      // });
    },
    // 加载更多
    loadMore() {
      // 上拉加载更多
      if (this.scrollFlag) return;
      this.scrollFlag = 2;
      this.chatScrollTop = this.$refs.list.scrollHeight;
      //读取本地缓存
      const { chatType, chatId, msgId } = this.currentSession;
      let maxMsgId = msgId;
      for (let index = 0; index < this.chatlist.length; index++) {
        let obj = this.chatlist[index];
        if (obj.id > 0) {
          maxMsgId = obj.id;
          break;
        }
      }
      msgManager.getMsg(chatType, chatId, maxMsgId, 1, true, this.pagination.pageSize, this.pagination.currentPage).then((data) => {
        if (data.length == 0) {
          this.scrollFlag = 2;
          this.chatlist.unshift({
            id: -100,
            item: this.lastMsgDateItem,
          });
          return;
        }
        // 倒序
        data = data.reverse();
        data.forEach((element) => {
          if (element.id <= msgId) {
            if (typeof element.viewShow == "string") {
              element.viewShow = element.viewShow.replace('class="wait"', 'class="sendsuccess"').replace('class="senging"', 'class="sendsuccess"');
            }
          }
          this.unShiftMsg(element);
        });
        this.pagination.currentPage++;
        setTimeout(() => {
          this.$refs.list.scrollTop = this.$refs.list.scrollHeight - this.chatScrollTop + 35;
          this.chatScrollTop = this.$refs.list.scrollHeight;
          setTimeout(() => {
            this.scrollFlag = 0;
          }, 1000);
        }, 100);
      });
    },
    insertEmoji(value) {
      this.$refs.sessionInput.focus(false);
      Util.insert(this.$refs.sessionInput.$refs.editMsg, value, false);
    },
    send(obj) {
      let htmlValue = obj || this.$refs.sessionInput.$refs.editMsg.innerHTML;
      // let txtValue = face.htmlToString(htmlValue) //表情解析
      let txtValue = ""; //移除无用html标签
      let msgtype = msgEnum.text;
      if (obj && obj.type) {
        msgtype = obj.type;
        txtValue = JSON.stringify(obj);
      } else {
        txtValue = msgUtil.htmlToTxt(htmlValue); //移除无用html标签

        let regExp = new RegExp("(&nbsp*)|(<br>*)|( )", "g");
        let reg = /((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,5})?((\/?)(\/?[0-9a-z_!~*^'().;?/:@&=+$,%#-]+)+)?/gi;
        if (reg.test(htmlValue) == true) {
          msgtype = msgEnum.textHyperLink;
        }

        if (txtValue.replace(regExp, "").length == 0) {
          this.$message.warning(this.$t("msg.sessionlist.notEmpty"));
          return;
        }
      }
      let arrayIndex = -1;
      //发送中
      let cacheMsg = {
        isSender: true,
        bodyFrom: this.$store.getters.userId,
        timeStamp: timeUtil.nowTimestamp(),
        id: timeUtil.nowTimestamp(),
        type: msgtype,
        userId: this.currentSession.chatId,
        chatType: this.currentSession.chatType,
        body: txtValue,
      };
      msgFormatTemplate.formatMsgNew(cacheMsg).then((data) => {
        arrayIndex = this.pushMsg(data);
        this.scrollTo(data.id);
      });

      if (obj && !obj.uploadStatus && obj.progress < 100) {
        return;
      }
      actionApi
        .sendMsg({
          msgType: msgtype,
          toId: this.currentSession.chatId,
          msg: txtValue,
          chatType: this.currentSession.chatType,
        })
        .then((data) => {
          //发送成功
          msgFormatTemplate
            .formatMsgNew({
              isSender: true,
              bodyFrom: this.$store.getters.userId,
              timeStamp: data.time,
              id: data.msgId,
              type: msgtype,
              body: txtValue,
              chatType: this.currentSession.chatType,
              userId: this.currentSession.chatId,
            })
            .then((data) => {
              let that = this;
              const chatItem = {
                id: data.id,
                item: data.viewShow,
                type: data.type,
                time: data.time,
                isSender: true,
              };
              if (data.type == msgEnum.img || data.type == msgEnum.video || data.type == msgEnum.files || data.type == msgEnum.audio) {
                let mediaIndex = this.chatlist.findIndex((item) => item.item.mediaIndex == data.viewShow.mediaIndex);
                if (this.chatlist[this.chatlist.length - 1].id < 0) {
                  mediaIndex -= 1;
                }
                this.$set(that.chatlist, mediaIndex, chatItem);
                that.chatlist[mediaIndex] = chatItem;
              } else {
                this.$set(that.chatlist, arrayIndex - 1, chatItem);
                that.chatlist[arrayIndex - 1] = chatItem;
              }

              this.$store.state.currentSession.msgId = data.id;

              this.$store.commit("UPDATE_SESSION_COLLEAGUE_PREVIEW", data);
              this.scrollTo(data.id);
            });
        });
      this.$refs.sessionInput.$refs.editMsg.focus();
      this.$refs.sessionInput.$refs.editMsg.innerHTML = "";
    },
    // 插入历史消息
    unShiftMsg(data) {
      // 添加时间tag上去
      if (!this.sortJson.hasOwnProperty(data.date)) {
        let dateTemp;
        // console.log(data)
        if (data.date == timeUtil.nowDate()) {
          let lang = this.$store.state.translate;
          dateTemp = `<div class="no-chat"> <span class="text">${lang.date.today}</span> </div> `;
        } else {
          dateTemp = `<div class="no-chat"> <span class="text">${data.date}</span> </div> `;
          this.lastMsgDateItem = dateTemp;
        }
        this.chatlist.push({
          id: -100,
          item: dateTemp,
        });
        this.sortJson[data.date] = [data.viewShow];
      } else {
        this.sortJson[data.date].unshift(data.viewShow);
      }
      this.scrollTo(data.id);
      return this.chatlist.unshift({
        ...data,
        item: data.viewShow,
      });
    },
    /**
     * 返回当前数组长度
     */
    pushMsg(data, mode = "") {
      //如何加时间上去
      if (!this.sortJson.hasOwnProperty(data.date)) {
        let dateTemp;
        if (data.date == timeUtil.nowDate()) {
          let lang = this.$store.state.translate;
          dateTemp = `<div class="no-chat"> <span class="text">${lang.date.today}</span> </div> `;
        } else {
          dateTemp = `<div class="no-chat"> <span class="text">${data.date}</span> </div> `;
        }
        this.chatlist.push({
          id: -100,
          item: dateTemp,
        });
        this.sortJson[data.date] = [data.viewShow];
      } else {
        this.sortJson[data.date].push(data.viewShow);
      }
      this.scrollTo(data.id);

      const chatItem = {
        item: data.viewShow,
        ...data,
      };

      // 判断上传资源是否上传成功，并回写本地数据。
      if (
        data.viewShow.uploadStatus == true &&
        mode != "init" &&
        (data.type == msgEnum.img || data.type == msgEnum.video || data.type == msgEnum.files || data.type == msgEnum.audio)
      ) {
        let mediaIndex = this.chatlist.findIndex((item) => item.item.mediaIndex == data.viewShow.mediaIndex);
        this.chatlist[mediaIndex] = chatItem;
        if (mediaIndex < 0) {
          return this.chatlist.push(chatItem);
        } else {
          if (this.chatlist[this.chatlist.length - 1].id > 0) {
            return mediaIndex;
          } else {
            return mediaIndex - 1;
          }
        }
      }
      // 文件上传自判断end
      return this.chatlist.push(chatItem);
    },
    /**
     * 消息已读
     */
    msgRead(mId) {
      let bList = this.$el.querySelectorAll(".wait");
      let b = document.getElementById(mId + "_state_span");
      if (b) b.className = "sendsuccess";
      if (bList) {
        bList.forEach((item) => {
          item.className = "sendsuccess";
        });
      }
    },
    /**
     * 跳转到指定会话
     */
    scrollTo(id) {
      setTimeout(() => {
        let anchor = this.$el.querySelector("#anchor" + id);
        if (anchor) {
          anchor.scrollIntoView();
        }
      }, 20);
    },
    pasteMessage(event) {
      event.preventDefault();
      let clipboardData = event.clipboardData || window.clipboardData;
      let items = clipboardData.items;
      let files = clipboardData.files;
      let pastedData = clipboardData.getData("Text");
      if (!pastedData) return;
      if (pastedData.length > 2000) {
        this.moreThan = true;
      }
      if (Util.browserType() === "FF") {
        pastedData = pastedData.replace(/\[\[/g, "[").replace(/\]\]/g, "]");
      }
      pastedData = pastedData.replace(/</g, "&lt;");
      pastedData = pastedData.replace(/>/g, "&gt;");
      pastedData = pastedData.replace(/ /g, "&nbsp;");
      pastedData = pastedData.replace(/\n/g, "<br/>");
      Util.insert(this.$refs.sessionInput.$refs.editMsg, pastedData, false);
    },
  },
  created() {
    console.log(this.$options.name + " 被加载");
    this.$store.state.activityComponents[this.$options.name] = this; //注册
  },
  destroyed() {
    console.log(this.$options.name + " 被销毁");
    delete this.$store.state.activityComponents[this.$options.name]; //销毁
  },
};
</script>

<style lang="scss" scoped>
.default {
  display: flex;
  background: #f0f2f7;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.friendbox {
  width: 100%;
  height: 100%;
  .head {
    height: 67px;
    border-bottom: 1px solid $border-color;
  }
  .message-box {
    height: calc(100vh - 263px);
    position: relative;
    background: $backgroup-color;
  }
  .message-list {
    width: 100%;
    // height: calc(100vh - 262px);
    .list {
      height: auto;
    }
  }
}
.head {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: space-between;
  .head-text {
    display: inline-block;
    font-size: 18px;
    margin-left: 12px;
    margin-top: 15px;
  }
}
</style>
