<template>
  <div class="box">
    <!-- 拖拽功能 -->
    <!-- <div class="left" @drop="dropArea($event)"> -->
    <div class="left">
      <!-- 下载二维码 -->
      <div
        class="qr-code"
        v-show="qrCode.show"
        :style="{ top: qrCode.top - 160 + 'px', left: qrCode.left - 75 + 'px' }"
        id="qrcode"
      >
        <canvas id="qrcodeCanvas"></canvas>
      </div>
      <div>
        <div class="head">
          <div style="position: relative;">
            <span class="head-text">#{{ currentSession.chatId | name }}</span>
          </div>
          <div style="align-self:center">
            <img
              src="../../../assets/img/chat/switch.png"
              style="margin-right:35px;cursor: pointer;"
              @click.stop="switchs()"
            />
            <img
              src="../../../assets/img/chat/close.png"
              style="cursor: pointer;margin-right:18px"
              @click.stop="close()"
            />
          </div>
        </div>
        <div
          class="message-box"
          id="message-box"
          ref="list"
          v-scrollBar
          @drop="drop"
          @dragover.prevent
          @ps-y-reach-start="loadMore"
        >
          <div v-if="lookId" @click="getlook(lookId)" class="lookLast">
            <span></span>View last conversation
            <span></span>
          </div>
          <msgList :chatlist="chatlist" :userInfo="userInfo" :currentSession="currentSession"></msgList>
        </div>
      </div>
      <sessionInput
        ref="sessionInput"
        :layout="layout"
        :chatlist="chatlist"
        @selectAll="selectAll"
        @send="send"
      ></sessionInput>
    </div>
    <file-popup ref="sendFile" :fileInfo="dropFileInfo"></file-popup>
    <picture-popup ref="sendPicture" :imgInfo="pasteImage"></picture-popup>
    <reply class="right"></reply>
    <Popup
      :hideClose="false"
      v-if="layout.module == 'session' && layout.child == 'close'"
      :radius="10"
    >
      <div class="seal" slot="body">
        <div class="content">{{ $t("msg.chatPanel.close") }}</div>
        <div class="btn" @click="confirm">{{ $t("msg.common.confirm") }}</div>
      </div>
    </Popup>
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
    <Popup :hideClose="false" v-if="layout.module == 'evaluatedFirst'" :radius="10">
      <div class="seal" slot="body">
        <div class="content">{{ $t("msg.evaluate.evaluatedFirst") }}</div>
        <div class="btn" @click="confirmTips">{{ $t("msg.common.confirm") }}</div>
      </div>
    </Popup>
    <Popup :hideClose="false" v-if="layout.module == 'evaluated'" :radius="10">
      <div class="seal" slot="body">
        <div class="content">{{ $t("msg.evaluate.evaluated") }}</div>
        <div class="btn" @click="confirmTips">{{ $t("msg.common.confirm") }}</div>
      </div>
    </Popup>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import reply from "@/components/home/session/reply";
import msgList from "@/components/home/msgList";
import sessionInput from "@/components/home/sessionInput";
import UplaodFiles from "@/components/common/uploadFile";
import { msgEnum, sessionEnum, evaluateCSEnum } from "@/common/enum";
import { Util, sessionItemPool } from "@/tools/utils";
import { timeUtil } from "@/tools/timeUtil";
import { msgUtil } from "@/tools/msgUtil";
import { msgFormatTemplate } from "@/tools/msgFormatTemplate";
import { actionApi } from "@/api";
import { msgManager } from "@/session/msgManager";
import Rtc from "@/tools/rtc-message";

export default {
  name: "dialogue",
  data() {
    return {
      msgEnum,
      evaluateCSEnum,
      chatlist: [],
      sortJson: {}, //用于消息排序：date:[]
      showinfo: false,
      pageSize: 40,
      pageNum: 1,
      lastsessionId: null,
      more: false,
      lookId: null,
    };
  },
  components: {
    reply,
    msgList,
    sessionInput,
  },
  mixins: [UplaodFiles],
  computed: {
    ...mapGetters(["userInfo", "currentSession", "layout", "waitnum"]),
  },
  watch: {
    currentSession(item, old) {
      if (!item) return;
      this.chatlist.length = 0;
      this.sortJson.length = 0;
      this.pageNum = 1;
      this.lastsessionId = null;
      this.more = false;

      this.$api
        .getAndSetReadedSessionList({ sessionType: item.chatType, sessionId: item.chatId, maxId: item.newMsgId, time: this.$store.state.sessionTime })
        .then((data) => {
          let time = data.data.time; //记录时间戳
          // console.log(item, data, 2)
          // this.$store.commit("UPDATE_SESSION_PREVIEW", data);
          this.$store.commit("SET_SESSION_TIME", time);
        });

      this.gethistory();
      this.$refs.sessionInput.$refs.editMsg.innerHTML = "";
      setTimeout(() => {
        this.$refs.list.scrollTop = this.$refs.list?.scrollHeight;
      }, 100);
      this.lookId = this.currentSession.preSessionId;
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
    getLast(item, idx) {
      this.pageNum = 1;
      let obj = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        sessionId: item.item.sessionId,
      };
      this.lastsessionId = item.item.sessionId;
      this.$set(item, "get", true);
      this.$api.getCSChatRecord(obj).then((res) => {
        if (res.data.list) {
          res.data.list.sort((a, b) => b.id - a.id); //排序
        }
        res.data.list.forEach((e) => {
          let content = {
            timeStamp: e.createTime,
            type: e.msgType,
            body: e.msg,
            id: e.msgId,
            bodyFrom: e.fromId,
            isSender: e.fromId > 0 ? true : false,
            chatType: this.currentSession.chatType,
            userId: this.currentSession.chatId,
            fromName: e.fromName,
          };
          msgFormatTemplate.formatMsg(content).then((data) => {
            this.chatlist.splice(idx, 0, {
              ...data,
              item: data.viewShow,
            });
          });
        });
        // msgManager.removeMsg(this.currentSession.chatType,this.currentSession.chatId,item.id,true)
        setTimeout(() => {
          if (res.data.pages > this.pageNum) {
            this.pageNum = this.pageNum + 1;
            this.more = true;
          }
        }, 100);
      });
    },

    drop(event) {
      let data = event.dataTransfer.getData("text/plain");
      this.send(data);
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
        fromName: this.userInfo.nickName,
      };
      msgFormatTemplate.formatMsgNew(cacheMsg).then((data) => {
        arrayIndex = this.pushMsg(data);
        console.log(arrayIndex);
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
        .then((req) => {
          console.log(req, "发送消息");
          //发送成功
          msgFormatTemplate
            .formatMsgNew({
              isSender: true,
              bodyFrom: this.$store.getters.userId,
              timeStamp: req.time,
              time: req.time,
              id: req.msgId,
              type: msgtype,
              body: txtValue,
              chatType: this.currentSession.chatType,
              userId: this.currentSession.chatId,
              fromName: this.userInfo.nickName,
            })
            .then((data) => {
              let that = this;
              let viewShow = typeof data.viewShow == "string" ? data.viewShow : { ...data.viewShow };
              const chatItem = {
                viewShow,
                id: data.id,
                item: data.viewShow,
                type: data.type,
                time: data.time,
                isSender: true,
              };

              if (data.type == msgEnum.img || data.type == msgEnum.video || data.type == msgEnum.files || data.type == msgEnum.audio) {
                let mediaIndex = this.chatlist.findIndex((item) => item.item.mediaIndex == data.viewShow.mediaIndex);
                this.$set(that.chatlist, mediaIndex, chatItem);
                that.chatlist[mediaIndex] = chatItem;
              } else {
                this.$set(that.chatlist, arrayIndex - 1, chatItem);
                that.chatlist[arrayIndex - 1] = chatItem;
              }
              this.$store.state.currentSession.msgId = data.id;
              this.$store.commit("UPDATE_SESSION_PREVIEW", data);
              this.scrollTo(data.id);
            });
        });
      this.$refs.sessionInput.$refs.editMsg.focus();
      this.$refs.sessionInput.$refs.editMsg.innerHTML = "";
    },
    /**
     * 返回当前数组长度
     */
    pushMsg(data, mode) {
      console.log(data);
      //如何加时间上去
      if (!this.sortJson.hasOwnProperty(data.date)) {
        let dateTemp;
        if (data.date == timeUtil.nowDate()) {
          let lang = this.$store.state.translate;
          dateTemp = `<div class="no-chat"> <span class="text">${lang.date.today}</span> </div> `;
        } else {
          dateTemp = `<div class="no-chat"> <span class="text">${data.date}</span> </div> `;
        }

        this.chatlist.unshift({
          id: -100,
          item: dateTemp,
        });

        this.sortJson[data.date] = [data.viewShow];
      } else {
        if (mode == "getHistory") {
          this.sortJson[data.date].push(data.viewShow);
        } else {
          this.sortJson[data.date].unshift(data.viewShow);
        }
      }
      this.scrollTo(data.id);
      const chatItem = {
        ...data,
        item: data.viewShow,
      };

      // 判断上传资源是否上传成功，并回写本地数据。
      if (
        data.viewShow.uploadStatus == true &&
        mode != "getHistory" &&
        (data.type == msgEnum.img || data.type == msgEnum.video || data.type == msgEnum.files || data.type == msgEnum.audio)
      ) {
        let mediaIndex = this.chatlist.findIndex((item) => item.item.mediaIndex == data.viewShow.mediaIndex);

        if (mediaIndex < 0) {
          return this.chatlist.push(chatItem);
        } else {
          this.chatlist[mediaIndex] = chatItem;
          return mediaIndex;
        }
      }

      if (mode == "getHistory") {
        return this.chatlist.unshift(chatItem);
      } else {
        return this.chatlist.push(chatItem);
      }
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
     * 接入下一位
     */
    switch() {
      this.$api.getVisitorList({ type: 1, currentPage: 1, pageSize: 20 }).then((res) => {
        this.$store.commit("SET_WAITLISTS", res.data.list);
        this.$store.commit("SET_WAITNUM", res.data.total);
        if (res.data.total == 0) return;
        let sessionLength = this.$store.state.sessionLists.length - 1;
        let upLimit = this.$store.state.admitLimit;
        if (sessionLength < upLimit) {
          let cacheWaitList = this.$store.state.waitLists;
          if (cacheWaitList) {
            let waitCache = cacheWaitList.shift();
            if (waitCache) {
              const { sessionId, preSessionId } = waitCache;
              this.$store.commit("ADD_SESSIONLISTS", {
                ...sessionItemPool(waitCache),
                msgId: 0,
                unread: 0,
                preSessionId,
                chatType: sessionEnum.visitor,
              });
              this.$api.connectManager(sessionId).then((data) => {});
              this.$store.commit("SET_WAITNUM", res.data.total - 1);
            }
          }
        }
      });
    },
    /**
     * 关闭会话
     */
    close() {
      this.$store.dispatch("setLayout", ["session", "close", true]);
    },
    confirm() {
      if (this.currentSession.online == 0) {
        this.$store.commit("REMVOE_SESSIONLISTS", this.currentSession.chatId);
      } else {
        this.$refs.sessionInput.pushEvaluate(evaluateCSEnum.invitationType.closeSessionOverPush);
        this.$api.closemanager(this.currentSession.sessionId).then((res) => {
          this.$store.commit("REMVOE_SESSIONLISTS", this.currentSession.chatId);
        });
        this.switch();
      }
      this.currentSession.chatId = null;
      this.$store.commit("UPDATE_CURRENT_SESSION", this.currentSession);
      this.$store.dispatch("setLayout", ["", "", false]);
    },
    //转接
    switchs() {
      this.$store.dispatch("setLayout", ["home", "switchs", false]);
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
    showVisitorinfo() {
      this.$store.dispatch("setLayout", ["home", "vf", false]);
    },
    gethistory() {
      if (!this.currentSession.sessionId || this.currentSession.sessionId > 0) return;
      let obj = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        sessionId: this.currentSession.sessionId,
      };
      this.lastsessionId = this.currentSession.sessionId;
      this.$api.getCSChatRecord(obj).then((res) => {
        if (res.data.list) {
          res.data.list = res.data.list.reverse();
        }

        res.data.list.forEach((e) => {
          let content = {
            timeStamp: e.createTime,
            type: e.msgType,
            body: e.msg,
            id: e.msgId,
            bodyFrom: e.fromId,
            isSender: e.fromId > 0 ? true : false,
            chatType: this.currentSession.chatType,
            userId: this.currentSession.chatId,
            fromName: e.fromName,
          };
          msgFormatTemplate.formatMsg(content).then((data) => {
            // console.log(data);
            this.pushMsg({
              ...data,
              mediaIndex: data.viewShow.mediaIndex,
              item: data.viewShow,
            });
          });
        });
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
        setTimeout(() => {
          if (res.data.pages > this.pageNum) {
            this.pageNum = this.pageNum + 1;
            this.more = true;
          }
        }, 100);
      });
    },
    //获取第一页
    getlook(item) {
      this.$api.getbysessionid(this.lookId).then((res) => {
        this.lookId = res.data.preSessionId;
      });
      this.pageNum = 1;
      let obj = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        sessionId: item,
      };
      this.lastsessionId = item;
      this.$api.getCSChatRecord(obj).then((res) => {
        if (res.data.list) {
          res.data.list.sort((a, b) => b.id - a.id); //排序
        }
        res.data.list.forEach((e) => {
          let content = {
            timeStamp: e.createTime,
            type: e.msgType,
            body: e.msg,
            id: e.msgId,
            bodyFrom: e.fromId,
            isSender: e.fromId > 0 ? true : false,
            chatType: this.currentSession.chatType,
            userId: this.currentSession.chatId,
            fromName: e.fromName,
          };
          msgFormatTemplate.formatMsg(content).then((data) => {
            // console.log(data);
            this.pushMsg(
              {
                ...data,
                mediaIndex: data.viewShow.mediaIndex,
                item: data.viewShow,
              },
              "getHistory"
            );
          });
        });
        this.scrollTo(res.data.list[0].msgId);
        setTimeout(() => {
          if (res.data.pages > this.pageNum) {
            this.pageNum = this.pageNum + 1;
            this.more = true;
          }
        }, 100);
      });
    },
    // 加载更多
    loadMore() {
      if (this.more) {
        let obj = {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          sessionId: this.lastsessionId,
        };
        this.more = false;
        this.$api.getCSChatRecord(obj).then((res) => {
          if (res.data.list) {
            res.data.list.sort((a, b) => b.id - a.id); //排序
          }
          res.data.list.forEach((e) => {
            let content = {
              timeStamp: e.createTime,
              type: e.msgType,
              body: e.msg,
              id: e.msgId,
              bodyFrom: e.fromId,
              isSender: e.fromId > 0 ? true : false,
              chatType: this.currentSession.chatType,
              userId: this.currentSession.chatId,
              fromName: e.fromName,
            };
            msgFormatTemplate.formatMsg(content).then((data) => {
              this.pushMsg(
                {
                  ...data,
                  mediaIndex: data.viewShow.mediaIndex,
                  item: data.viewShow,
                },
                "getHistory"
              );
            });
          });
          setTimeout(() => {
            if (res.data.pages > this.pageNum) {
              this.pageNum = this.pageNum + 1;
              this.more = true;
            }
          }, 100);
        });
      }
    },
  },
  created() {
    console.log(this.$options.name + " 被加载");
    this.$store.state.activityComponents[this.$options.name] = this; //注册
  },
  mounted() {
    console.log(this.global);
    console.log(this.$refs.sessionInput.$refs.editMsg);
    document.addEventListener("dragleave", function (e) {
      e.stopPropagation();
      e.preventDefault();
    });
    document.addEventListener("dragenter", function (e) {
      e.stopPropagation();
      e.preventDefault();
    });
    document.addEventListener("dragover", function (e) {
      e.stopPropagation();
      e.preventDefault();
    });

    this.$api
      .getAndSetReadedSessionList({
        sessionType: this.currentSession.chatType,
        sessionId: this.currentSession.chatId,
        maxId: this.currentSession.newMsgId,
        time: this.$store.state.sessionTime,
      })
      .then((data) => {
        let time = data.data.time; //记录时间戳
        this.$store.commit("SET_SESSION_TIME", time);
      });
    if (!this.currentSession.sessionId || this.currentSession.sessionId > 0) return;
    this.lookId = this.currentSession.preSessionId;
    this.gethistory();
    setTimeout(() => {
      this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
    }, 100);

    actionApi
      .getEvaluateConf({
        userId: this.userInfo.id,
        companyId: this.userInfo.companyId,
      })
      .then((res) => {
        if (res && res.code == 0) {
          this.$store.commit("SET_EVALUATE_CONF", res.data);
        }
      });
  },
  destroyed() {
    console.log(this.$options.name + " 被销毁");
    delete this.$store.state.activityComponents[this.$options.name]; //销毁
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";
.lookLast {
  justify-content: center;
  display: flex;
  align-items: center;
  padding: 30px 0 20px 0;
  cursor: pointer;
  color: $color-theme;
  background: $backgroup-color;
  span {
    display: inline-block;
    width: 62px;
    height: 2px;
    border-bottom: 1px solid #bbbbbb;
    margin: 0 30px;
  }
}
.box {
  display: flex;
  .left {
    width: 100%;
    .head {
      box-sizing: border-box;
      border-bottom: 1px solid $border-color;
    }
    .message-box {
      height: calc(100vh - 263px);
      position: relative;
      background: $backgroup-color;
    }
    // .message-list {
    //   height: calc(100vh - 263px);
    // }
  }
}
.head {
  width: 100%;
  height: 67px;
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
