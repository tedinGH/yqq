<template>
  <div class="seeeion">
    <div class="sessionlist">
      <div class="search">
        <div class="tab1">
          <div class="stock" @click="cut1">In the dialogue</div>
          <div class="question" @click="cut2">History</div>
          <div class="strip" ref="strip"></div>
        </div>
        <div class="search-icon">
          <img v-if="tab1 == 2" @click.stop="opensearch" src="../../../assets/images/search.png" />
          <search-history v-if="tab1 == 2 && layout.module == 'list' && layout.child == 'search'"></search-history>
        </div>
        <div style="margin-left:20px;margin-right:18px">
          <img src="../../../assets/images/serve.png" />
        </div>
      </div>
      <!-- <div class="wait" :class="{verify:showwait}" @click="show">
      <div class="content">
        <img v-if="!showwait" src="../../../assets/img/wait.png">
        <img v-else src="../../../assets/img/wait-dis.png">
        <div class="text">{{$t('msg.sessionlist.wait')}}</div>
      </div>
      <div class="num">{{$t('msg.sessionlist.line')}} {{waitLists.length}} {{$t('msg.sessionlist.person')}}</div>
      </div>-->
      <!-- <el-collapse-item class="chat-history" :title="'（'+browsingList.length+'）'" name="3">
          <ul v-scrollBar >
            <li class="listitem" :class="item.isActivity?'active':''" @click="pitchhistory(item)"
              v-for="(item,index) in browsingList" :key="index"  @contextmenu.prevent="show1($event,item)">
              <img src="../../../assets/img/chat/on-line.png" v-if="item.online=='1'">
              <img src="../../../assets/img/chat/off-line.png" v-else>
              <span class="visitor">{{item.name}} 通过手机正在访问【 {{item.preview}} 】页面</span>
            </li>
          </ul>
      </el-collapse-item>-->
      <div class="conversation">
        <div v-if="tab1 == 1" @ps-y-reach-end="sessionEnd">
          <ul v-scrollBar class="list">
            <li
              class="listitem"
              :class="item.isActivity ? 'active' : ''"
              @click="pitch(item)"
              v-for="(item, index) in sessionLists"
              :key="index"
            >
              <img
                class="img"
                src="../../../assets/images/chat/phone.png"
                v-if="item.source == '2'"
              />
              <img class="img" src="../../../assets/images/chat/pc.png" v-else />
              <div class="box">
                <div class="top-box">
                  <span class="visitor">#{{ item.chatId | name }}</span>
                  <span class="time">{{ item.time | timeFilter }}</span>
                </div>
                <span class="ip">
                  <span style="color:#4CA0FF" v-if="item.switched == 1">[switched]</span>
                  {{ formatInitMsg(item) }}
                </span>
              </div>
              <span class="unread" v-show="item.unread && item.unread > 0">{{ item.unread }}</span>
            </li>
          </ul>
        </div>
        <div v-if="tab1 == 2">
          <ul v-scrollBar class="list" @ps-y-reach-end="scrollEnd">
            <li
              class="listitem"
              :class="item.isActivity ? 'active' : ''"
              @click="pitchhistory(item)"
              v-for="(item, index) in endLists"
              :key="index"
            >
              <img class="img" src="../../../assets/images/chat/pc.png" v-if="item.source == '1'" />
              <img class="img" src="../../../assets/images/chat/phone.png" v-else />
              <div class="content">
                <span>
                  <span class="visitor">#{{ item.chatId | name }}</span>
                </span>
              </div>
              <div class="news">
                <span class="time">{{ item.time | timeFilter }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <messagebox ref="messagebox"></messagebox>
  </div>
</template>

<script>
import Vue from "vue";
import messagebox from "@/components/home/session/messagebox";
import searchHistory from "@/components/home/session/searchHistory";
import { Util, sessionItemPool } from "@/tools/utils";
import { msgFormatTemplate } from "@/tools/msgFormatTemplate";
import { sessionEnum } from "@/common/enum";
// import MouseRight from '@/components/common/MouseRight'
// let mouseRight = Vue.extend(MouseRight);
import { mapGetters } from "vuex";

export default {
  name: "sessionlist",
  data() {
    return {
      ismessage: true,
      isset: false,
      tab1: "1",
      sessionpageNum: 1,
      stopsessionScroll: false,
      endpageNum: 1,
      endpageSize: 20,
      stopScroll: false,
    };
  },
  components: {
    messagebox,
    searchHistory,
    // MouseRight
  },
  computed: {
    ...mapGetters([
      "endLists",
      "userId",
      "waitLists",
      "sessionLists",
      "currentSession",
      "userInfo",
      "showwait",
      "windowSize",
      "browsingList",
      "layout",
    ]),
  },
  watch: {
    sessionLists(oldval, newval) {
      if (newval.length == 0) this.$store.dispatch("setLuyou", "default");
    },
    endLists(oldval, newval) {
      if (newval.length == 0) this.$store.dispatch("setLuyou", "default");
    },
  },
  methods: {
    formatInitMsg(obj) {
      return msgFormatTemplate.formatNewMsgType(obj);
    },
    cut1() {
      if (this.tab1 == 1) {
        return;
      } else {
        this.tab1 = 1;
        (this.$refs.strip.style.left = "12px"), this.$store.commit("SET_SESSIONLISTS", []);
        this.currentSession.chatId = null;
        this.$store.commit("UPDATE_CURRENT_SESSION", this.currentSession);
        this.stopsessionScroll = false;
        this.sessionpageNum = 1;
      }
      this.sessionEnd();
    },
    cut2() {
      if (this.tab1 == 2) {
        return;
      } else {
        this.tab1 = 2;
        this.$refs.strip.style.left = "142px";
        this.$store.commit("SET_ENDLISTS", []);
        this.stopScroll = false;
        this.endpageNum = 1;
        this.currentSession.chatId = null;
        this.$store.commit("UPDATE_CURRENT_SESSION", this.currentSession);
      }
      this.scrollEnd();
    },
    newsearch() {
      this.stopScroll = false;
      this.$store.commit("SET_ENDLISTS", []);
    },
    opensearch() {
      this.$store.dispatch("setLayout", ["list", "search", false]);
    },
    sessionEnd() {
      if (this.stopsessionScroll) return;
      let obj = {
        type: 2,
        currentPage: this.sessionpageNum,
        pageSize: this.endpageSize,
      };
      this.sessionpageNum = this.sessionpageNum + 1;
      this.$api.getVisitorList(obj).then((res) => {
        this.setVisitorList(res, "sessionEnd");
      });
    },
    setVisitorList(res, mode) {
      console.log(mode);
      let visitorList = new Array();
      let unreadNumAll = 0;
      res.data.list.forEach((element) => {
        const { newMsgId, visitorUuid, switched, preSessionId } = element;
        let unReadNum = element.newMsgId - element.readId;
        unReadNum = unReadNum < 0 ? 0 : unReadNum;
        unreadNumAll += unReadNum;
        let payLoad = {
          ...sessionItemPool(element),
          switched,
          visitorUuid,
          preSessionId,
          chatType: sessionEnum.visitor,
          newMsgId,
          unread: unReadNum,
        };

        switch (mode) {
          case "sessionEnd":
            payLoad.online = 1;
            break;
          case "scroll":
            break;
          default:
            break;
        }
        visitorList.push(payLoad);
      });

      switch (mode) {
        case "sessionEnd":
          if (this.sessionpageNum - 1 == res.data.pages) this.stopScroll = true;
          if (this.sessionpageNum - 1 == 1) {
            this.$store.commit("SET_SESSIONLISTS", visitorList);
          } else {
            this.$store.commit("ADD_SESSIONLISTSBOTTOM", visitorList);
          }
          this.$store.commit("SET_UNREAD_NUMBER", {
            unReadNum: unreadNumAll,
          });
          break;
        case "scroll":
          if (this.endpageNum - 1 == res.data.pages || res.data.pages == 0) this.stopScroll = true;
          if (this.endpageNum - 1 == 1) {
            this.$store.commit("SET_ENDLISTS", visitorList);
          } else {
            this.$store.commit("ADD_ENDLISTS", visitorList);
          }
          break;
        default:
          break;
      }
    },
    scrollEnd() {
      if (this.stopScroll) return;
      let condition = window.sessionStorage.getItem("condition");
      condition = JSON.parse(condition);

      if (condition) {
        condition.currentPage = this.endpageNum;
        this.endpageNum = this.endpageNum + 1;
        this.$api.getAllVisitorSession(condition).then((res) => {
          this.setVisitorList(res, "scroll");
        });
      } else {
        let paylaod = {
          type: 3,
          currentPage: this.endpageNum,
          pageSize: this.endpageSize,
        };
        this.endpageNum = this.endpageNum + 1;
        this.$api.getVisitorList(paylaod).then((res) => {
          this.setVisitorList(res, "scroll");
        });
      }
    },
    //切换聊更改选中样式
    handleChange(val) {
      if (this.currentSession) {
        return;
      } else {
        for (let key in this.sessionLists) {
          let sCache = this.sessionLists[key];
          if (sCache.isActivity) {
            sCache.isActivity = false;
          }
        }
        for (let key in this.endLists) {
          let sCache = this.endLists[key];
          if (sCache.isActivity) {
            sCache.isActivity = false;
          }
        }
      }
    },
    pitch(item) {
      for (let key in this.sessionLists) {
        let sCache = this.sessionLists[key];
        if (sCache.isActivity) {
          sCache.isActivity = false;
        }
      }
      for (let key in this.endLists) {
        let sCache = this.endLists[key];
        if (sCache.isActivity) {
          sCache.isActivity = false;
        }
      }
      let unreadNumAll = this.$store.state.redPoint.unReadNum - item.unread || 0;
      this.$store.commit("SET_UNREAD_NUMBER", {
        unReadNum: unreadNumAll,
      });
      item.unread = 0;
      this.$set(item, "isActivity", true);
      this.$store.dispatch("setLuyou", "dialogue");
      this.$store.commit("UPDATE_CURRENT_SESSION", item);
    },
    pitchhistory(item) {
      for (let key in this.sessionLists) {
        let sCache = this.sessionLists[key];
        if (sCache.isActivity) {
          sCache.isActivity = false;
        }
      }
      for (let key in this.endLists) {
        let sCache = this.endLists[key];
        if (sCache.isActivity) {
          sCache.isActivity = false;
        }
      }
      this.$set(item, "isActivity", true);
      this.$store.dispatch("setLuyou", "history");
      this.$store.commit("UPDATE_CURRENT_SESSION", item);
    },
  },
  created() {
    this.$api.getAndSetReadedSessionList({ sessionType: 10 }).then((data) => {
      let time = data.data.time; //记录时间戳
      this.$store.commit("SET_SESSION_TIME", time);
    });
  },
  mounted() {
    this.$store.dispatch("setLuyou", "default");
    // 获取问候语
  },
};
</script>

<style lang="scss" scoped>
.seeeion {
  display: flex;
  height: calc(100vh - 60px);

  .sessionlist {
    width: 320px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid $border-color;
    .search {
      position: relative;
      width: 100%;
      height: 66px;
      display: flex;
      align-items: center;

      .tab1 {
        height: 66px;
        width: 250px;
        background: #fff;
        display: flex;
        align-items: center;
        position: relative;

        .stock {
          width: 152px;
          text-align: center;
          cursor: pointer;
        }

        .question {
          width: 152px;
          text-align: center;
          cursor: pointer;
        }

        .strip {
          position: absolute;
          width: 102px;
          height: 3px;
          background: $color-theme;
          border-radius: 2px;
          bottom: 0;
          left: 12px;
          transition: 0.5s ease;
        }
      }
      .search-icon {
        width: 20px;
        position: relative;
        img {
          cursor: pointer;
        }
      }
    }

    .conversation {
      width: 100%;
      border-top: 1px solid $border-color;

      div {
        .list {
          position: relative;
          height: calc(100vh - 127px);

          .listitem {
            &.active {
              background: #e6f4ff;
            }
            cursor: pointer;
            height: 102px;
            position: relative;
            display: flex;
            align-items: center;
            // justify-content:space-between;
            .unread {
              position: absolute;
              display: inline-block;
              width: 28px;
              height: 18px;
              text-align: center;
              color: #fff;
              background: #ff7a75;
              border: 1px solid #ffffff;
              border-radius: 9px;
              margin-top: 16px;
              right: 4px;
            }
            .img {
              margin-left: 16px;
            }
            .box {
              width: 234px;
              margin-left: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              .top-box {
                display: flex;
                justify-content: space-between;
              }
              .time {
                color: #949ca4;
              }
            }
            .content {
              height: 102px;
              width: 112px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-left: 10px;
            }
            .ip {
              color: #949ca4;
              display: inline-block;
              width: 200px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-top: 20px;
            }
            .news {
              position: absolute;
              right: 14px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              // margin-right: 14px;
              .time {
                color: #949ca4;
              }

              .unread {
                display: inline-block;
                width: 28px;
                height: 18px;
                text-align: center;
                color: #fff;
                background: #ff7a75;
                border: 1px solid #ffffff;
                border-radius: 9px;
                margin-top: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
