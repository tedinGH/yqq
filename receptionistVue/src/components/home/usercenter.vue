<template>
  <div class="usercenter" :class="unfold ? 'active' : ''">
    <div class="display-flex">
      <img class="small-logo" src="../../assets/images/logo.png" />
      <span class="text" v-if="unfold">Customer service</span>
    </div>
    <div class="usercolumn">
      <div class="user-content">
        <div class="message" @click="checkmessage('session')">
          <el-badge :value="redPoint.unReadNum" :hidden="redPoint.unReadNum <= 0" :max="999" class="item" ref="message">
            <img v-if="!show.session" src="../../assets/images/message.png" />
            <img v-else src="../../assets/images/message-dis.png" />
            <span v-if="unfold" class="text" :class="show.session ? 'active' : ''">Online consultation</span>
          </el-badge>
        </div>
        <div class="colleague" @click="checkcolleague('friend')">
          <el-badge :value="redPoint.colleagueUnReadNum" :hidden="redPoint.colleagueUnReadNum <= 0" :max="999" class="item" ref="colleague">
            <img v-if="!show.friend" src="../../assets/images/colleague.png" />
            <img v-else src="../../assets/images/colleague-dis.png" />
            <span v-if="unfold" class="text" :class="show.friend ? 'active' : ''">Colleague</span>
          </el-badge>
        </div>
      </div>
    </div>
    <div class="setting" @click="setting" @mouseenter="isset = true" @mouseleave="isset = false">
      <img v-if="!isset" src="../../assets/images/set.png" />
      <img v-else src="../../assets/images/set-dis.png" />
      <span v-if="unfold" class="text" :class="isset ? 'active' : ''">Settings</span>
    </div>
  </div>
</template>

<script>
import { sessionEnumTypes } from "@/common/enum";
import { Util, sessionItemPool } from "@/tools/utils";
import { mapGetters } from "vuex";
import { Config } from "@/common/config";
export default {
  name: "usercenter",
  data() {
    return {
      show: {
        session: false,
        friend: false
      },
      isset: false,
      pageNum: "1",
      pageSize: 20
    };
  },
  computed: {
    ...mapGetters(["userInfo", "unfold", "waitLists", "waitnum"]),
    redPoint() {
      return this.$store.state.redPoint;
    }
  },
  components: {},
  watch: {
    $route(newval, oldval) {
      let obj = newval.name;
      for (let key in this.show) {
        this.show[key] = false;
        if ((key = obj)) {
          this.show[obj] = true;
        }
      }
    }
  },
  methods: {
    getlist() {
      this.$api
        .getVisitorList({
          type: 1,
          currentPage: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          this.$store.commit("SET_WAITLISTS", res.data.list);
          this.$store.commit("SET_WAITNUM", res.data.total);
        });
      this.$api
        .getVisitorList({
          type: 2,
          currentPage: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          let sessionList = new Array();
          let unreadNumAll = 0;

          res.data.list.forEach(element => {
            const { readId, newMsgId, switched, preSessionId } = element;
            let unReadNum = newMsgId - readId;
            unReadNum = unReadNum < 0 ? 0 : unReadNum;
            unreadNumAll += unReadNum;
            sessionList.push({
              ...sessionItemPool(element),
              preSessionId,
              newMsgId,
              switched,
              unread: unReadNum,
              chatType: sessionEnumTypes.visitor
            });
          });
          this.$store.commit("SET_UNREAD_NUMBER", {
            unReadNum: unreadNumAll
          });
          // 插入等待列表
          let upLimit = this.$store.state.admitLimit;
          if (sessionList.length < upLimit) {
            for (let i = upLimit; i > sessionList.length; i--) {
              let waitCache = this.waitLists.shift();
              if (!waitCache) {
                break;
              }
              sessionList.push({
                ...sessionItemPool(waitCache),
                msgId: 0,
                unread: 0,
                chatType: sessionEnumTypes.visitor
              });
              this.$api.connectManager(waitCache.sessionId).then(data => {});
              this.$store.commit("SET_WAITNUM", this.waitnum - 1);
            }
          }
          this.$store.commit("SET_SESSIONLISTS", sessionList);
        });
    },
    checkmessage(obj) {
      if (this.show.ismessage != true) {
        this.getlist();
      }
      for (let key in this.show) {
        this.show[key] = false;
        if ((key = obj)) {
          this.show[obj] = true;
        }
      }
      if (this.$route.name != "session") {
        this.$router.push({
          name: "session"
        });
      }
    },
    checkcolleague(obj) {
      for (let key in this.show) {
        this.show[key] = false;
        if ((key = obj)) {
          this.show[obj] = true;
        }
      }
      this.$store.commit("UPDATE_CURRENT_SESSION", {});
      if (this.$route.name != "friend") {
        this.$router.push({
          name: "friend"
        });
      }
    },
    setting() {
      window.open(Config.operateurl);
    }
  },
  created() {
    let obj = this.$route.name;
    for (let key in this.show) {
      this.show[key] = false;
      if ((key = obj)) {
        this.show[obj] = true;
      }
    }
    this.getlist();
    // 同事列表 - 用于获取同事昵称
    this.$api.getdepartmentuser().then(res => {
      this.$store.commit("SET_DEPARTMENTUSERS", res.data);
    });
  }
};
</script>

<style lang="scss" scoped>
.usercenter {
  height: 100%;
  width: 74px;
  height: 100%;
  background: #333c50;
  padding-top: 8px;
  position: relative;
  // transition: .2s ease;
  .small-logo {
    display: block;
    margin-left: 8px;
  }
  .usercolumn {
    height: auto;
    display: flex;
    margin-top: 100px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .user-content {
      display: flex;
      flex-direction: column;
      margin-top: 10px;

      .message {
        margin-bottom: 28px;
        cursor: pointer;
        .item {
          user-select: none;
        }
      }
    }

    .colleague {
      cursor: pointer;
    }
  }

  .setting {
    position: absolute;
    bottom: 20px;
    left: 23px;
    cursor: pointer;
  }

  &.active {
    width: 234px;

    .text {
      font-family: PingFang SC;
      font-size: 16px;
      color: #82a2ff;
      margin-left: 9px;
      margin-top: 22px;
    }

    .message,
    .colleague,
    .setting {
      .text {
        color: #667088;

        &.active {
          color: #82a2ff;
        }
      }
    }
  }
  /deep/ .el-badge__content {
    border: none;
  }
}
</style>
