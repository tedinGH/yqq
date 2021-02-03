<template>
  <div class="box">
    <div class="left">
      <div class="head">
        <div>
          <span class="head-text">#{{ currentSession.chatId | name }}</span>
        </div>
        <div style="align-self:center">
          <img src="../../../assets/img/chat/time.png" style="cursor: pointer;margin-right:18px" @click.stop="open" />
        </div>
      </div>
      <div class="message-box" id="message-box" ref="list" v-scrollBar @ps-y-reach-start="loadMore">
        <div v-if="lookId" @click="getlook(lookId)" class="lookLast"><span></span>View last conversation<span></span></div>
        <msgList :chatlist="chatlist" :userInfo="userInfo" :currentSession="currentSession"></msgList>
      </div>
      <div class="end">{{ $t("msg.sessionlist.end") }}</div>
    </div>
    <tracks></tracks>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { msgFormatTemplate } from "@/tools/msgFormatTemplate";
import msgList from "@/components/home/msgList";
import UplaodFiles from "@/components/common/uploadFile";
import { timeUtil } from "@/tools/timeUtil";
import { msgEnumTypes, sessionEnumTypes } from "@/common/enum";
import tracks from "@/components/home/session/track";
export default {
  name: "history",
  data() {
    return {
      consent: false,
      msgEnumTypes,
      pageNum: 1,
      pageSize: 40,
      chatlist: [],
      sortJson: {}, //用于消息排序：date:[]
      timer: "",
      lastsessionId: null,
      more: false,
      lookId: null
    };
  },
  components: {
    tracks,
    msgList
  },
  mixins: [UplaodFiles],
  computed: {
    ...mapGetters(["currentSession", "userInfo"]),
  },
  watch: {
    currentSession(news, old) {
      this.more = false;
      this.chatlist = [];
      this.pageNum = 1;
      this.lastsessionId = this.currentSession.sessionId;
      this.gethistory();
      setTimeout(() => {
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
      }, 100);
      this.lookId = this.currentSession.preSessionId;
    }
  },
  methods: {
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
    //获取第一页
    getlook(item) {
      this.$api.getbysessionid(this.lookId).then(res => {
        this.lookId = res.data.preSessionId;
      });
      this.pageNum = 1;
      let obj = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        sessionId: item
      };
      this.lastsessionId = item;
      this.$api.getCSChatRecord(obj).then(res => {
        if (res.data.list) {
          res.data.list.sort((a, b) => b.id - a.id); //排序
        }
        res.data.list.forEach(e => {
          let content = {
            timeStamp: e.createTime,
            type: e.msgType,
            body: e.msg,
            id: e.msgId,
            bodyFrom: e.fromId,
            isSender: e.fromId > 0 ? true : false,
            chatType: this.currentSession.chatType,
            userId: this.currentSession.chatId,
            fromName: e.fromName
          };
          msgFormatTemplate.formatMsg(content).then(data => {
            this.pushMsg({
              ...data,
              mediaIndex: data.viewShow.mediaIndex,
              item: data.viewShow
            }, 'getHistory')
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
    gethistory() {
      let obj = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        sessionId: this.currentSession.sessionId
      };
      this.lastsessionId = this.currentSession.sessionId;
      this.$api.getCSChatRecord(obj).then(res => {
        if (res.data.list) {
          // res.data.list.sort((a, b) => b.id - a.id); //排序
          res.data.list = res.data.list.reverse();
        }
        res.data.list.forEach(e => {
          let content = {
            timeStamp: e.createTime,
            type: e.msgType,
            body: e.msg,
            id: e.msgId,
            bodyFrom: e.fromId,
            isSender: e.fromId > 0 ? true : false,
            chatType: this.currentSession.chatType,
            userId: this.currentSession.chatId,
            fromName: e.fromName
          };
          msgFormatTemplate.formatMsg(content).then(data => {
            this.pushMsg({
              ...data,
              mediaIndex: data.viewShow.mediaIndex,
              item: data.viewShow
            })
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
    //获取转接
    getLast(item, idx) {
      this.pageNum = 1;
      let obj = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        sessionId: item.item.sessionId
      };
      this.lastsessionId = item.item.sessionId;
      this.$set(item, "get", true);
      this.$api.getCSChatRecord(obj).then(res => {
        if (res.data.list) {
          res.data.list.sort((a, b) => b.id - a.id); //排序
        }
        res.data.list.forEach(e => {
          let content = {
            timeStamp: e.createTime,
            type: e.msgType,
            body: e.msg,
            id: e.msgId,
            bodyFrom: e.fromId,
            isSender: e.fromId > 0 ? true : false,
            chatType: this.currentSession.chatType,
            userId: this.currentSession.chatId,
            fromName: e.fromName
          };
          msgFormatTemplate.formatMsg(content).then(data => {
            this.pushMsg({
              ...data,
              mediaIndex: data.viewShow.mediaIndex,
              item: data.viewShow
            }, 'getHistory')
          });
        });
        setTimeout(() => {
          if (res.data.pages > this.pageNum) {
            this.pageNum = this.pageNum + 1;
            this.more = true;
          }
        }, 100);
      });
    },
    loadMore() {
      if (this.more) {
        let obj = {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          sessionId: this.lastsessionId
        };
        this.more = false;
        this.$api.getCSChatRecord(obj).then(res => {
          if (res.data.list) {
            res.data.list.sort((a, b) => b.id - a.id); //排序
          }
          res.data.list.forEach(e => {
            let content = {
              timeStamp: e.createTime,
              type: e.msgType,
              body: e.msg,
              id: e.msgId,
              bodyFrom: e.fromId,
              isSender: e.fromId > 0 ? true : false,
              chatType: this.currentSession.chatType,
              userId: this.currentSession.chatId,
              fromName: e.fromName
            };
            msgFormatTemplate.formatMsg(content).then(data => {
              this.pushMsg({
                ...data,
                mediaIndex: data.viewShow.mediaIndex,
                item: data.viewShow
              }, 'getHistory')
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
      }
    },
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
          item: dateTemp
        });
        this.sortJson[data.date] = [data.viewShow];
      } else {
        if(mode == "getHistory") {
          this.sortJson[data.date].push(data.viewShow);
        } else {
          this.sortJson[data.date].unshift(data.viewShow);
        }
      }
      this.scrollTo(data.id);
      const chatItem = {
        ...data,
        item: data.viewShow
      };

      // 判断上传资源是否上传成功，并回写本地数据。
      if (
        data.viewShow.uploadStatus == true &&
        mode != "getHistory" &&
        (data.type == msgEnumTypes.img || data.type == msgEnumTypes.video || data.type == msgEnumTypes.files || data.type == msgEnumTypes.audio)
      ) {
        let mediaIndex = this.chatlist.findIndex(item => item.item.mediaIndex == data.viewShow.mediaIndex);

        if (mediaIndex < 0) {
          return this.chatlist.push(chatItem);
        } else {
          this.chatlist[mediaIndex] = chatItem;
          return mediaIndex;
        }
      }

      if(mode == "getHistory") {
        return this.chatlist.unshift(chatItem);
      } else {
        return this.chatlist.push(chatItem);
      }
    },
    open() {
      this.$store.dispatch("setLayout", ["home", "hf", true]);
    }
  },
  created() {},
  mounted() {
    this.lookId = this.currentSession.preSessionId;
    this.gethistory();
    setTimeout(() => {
      this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
    }, 100);
  }
};
</script>

<style lang="scss" scoped>
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
    flex: 1;
    .head {
      width: 100%;
      height: 67px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 1);
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $border-color;

      .head-text {
        display: inline-block;
        font-size: 18px;
        margin-left: 12px;
        margin-top: 15px;
      }
    }

    .message-box {
      height: calc(100vh - 196px);
      position: relative;
      background: $backgroup-color;
    }

    .end {
      height: 69px;
      width: 100%;
      text-align: center;
      line-height: 69px;
      background: #fff;
      border-radius: 0 0 10px 0;
    }
  }
}
</style>
