<template>
  <div class="friend">
    <div class="friendlist">
      <div class="search">
        <div class="tab1">
          <div class="stock" @click="cut1">
            Contact
          </div>
          <div class="question" @click="cut2">
            Group
          </div>
          <div class="strip" ref="strip"></div>
        </div>
        <div><img src="../../../assets/images/search.png" /></div>
        <div style="margin-left:20px;margin-right:18px">
          <img src="../../../assets/images/add.png" />
        </div>
      </div>
      <div v-if="tab1 == 1" class="collapse-cross">
        <div v-scrollBar :style="{ 'max-height': activeHeight }">
          <el-collapse v-model="activeNameList" @change="handleChange">
            <el-collapse-item
              class="chat-ing"
              v-for="(item, idx) in sessionColleagueList"
              :key="idx"
              :title="item.departmentName + '（' + item.listUser.length + '）'"
              :name="idx + 1"
            >
              <ul v-scrollBar :style="{ 'max-height': height }">
                <li class="listitem" :class="i.isActivity ? 'active' : ''" @click.stop="pitch(i)" v-for="(i, index) in item.listUser" :key="index">
                  <div class="head">
                    <img class="img" :src="config.imgurl + 'original/' + i.avatar" v-if="i.avatar" />
                    <img src="../../../assets/img/chat/history.png" v-else />
                    <img class="online" v-if="i.online == 1" src="../../../assets/img/chat/online.png" />
                    <img class="online" v-else src="../../../assets/img/chat/offline.png" />
                  </div>
                  <span class="visitor">{{ i.name }}</span>
                  <span class="unread" v-show="i.unread && i.unread > 0">{{ i.unread }}</span>
                </li>
              </ul>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div v-if="tab1 == 2"></div>
    </div>
    <friendbox></friendbox>
  </div>
</template>

<script>
import friendbox from "@/components/home/friend/friendbox";
import { mapGetters } from "vuex";
export default {
  name: "friendlist",
  data() {
    return {
      activeName: [1],
      activeNameList: [1],
      collapseStatus: false,
      tab1: "1",
      getDepartmentUser: true
    };
  },
  components: {
    friendbox
  },
  computed: {
    ...mapGetters(["departmentUsers", "sessionColleagueList"]),
    height() {
      let num = this.sessionColleagueList.length * 48 + 128;
      return `calc(100vh - ${num}px)`;
    },
    activeHeight() {
      let num = this.sessionColleagueList.length * 48 - 66;
      return `calc(100vh - ${num}px)`;
    }
  },
  methods: {
    handleChange(e) {
      // if (this.collapseStatus) {
      //   this.activeNameList = [0];
      // } else {
      //   let tmpCol = [];
      //   for (let index = 0; index < this.sessionColleagueList.length; index++) {
      //     tmpCol.push(index + 1);
      //   }
      //   this.activeNameList = tmpCol;
      // }
      // this.collapseStatus = !this.collapseStatus
    },
    updateColleagueList(res) {
      this.$store.commit("SET_DEPARTMENTUSERS", res);
      let cacheList;
      res.forEach(v => {
        cacheList = new Array();
        for (var i = 0; i < v.listUser.length; i++) {
          let cache = v.listUser[i];
          cacheList.push({
            ...cache,
            isActivity: false,
            online: 0,
            chatId: cache.id,
            chatType: 0,
            name: cache.name,
            avatar: cache.avatarUrl,
            unread: 0,
            msgId: 0
          });
        }
        v.listUser = cacheList;
      });
      this.$api.getonlineuser().then(data => {
        res.forEach(v => {
          for (var i = 0; i < v.listUser.length; i++) {
            for (let key in data.data) {
              if (key == v.listUser[i].chatId) {
                v.listUser[i].online = 1;
              }
            }
          }
        });
        this.$store.commit("SET_SESSION_COLLEAGUE_LIST", res);
      });
      this.$api.getAndSetReadedSessionList({ sessionType: 0 }).then(data => {
        let time = data.data.time; //记录时间戳
        let cacheData = data.data.list;
        let unreadNumAll = 0;
        res.forEach(v => {
          for (var i = 0; i < v.listUser.length; i++) {
            let cU = v.listUser[i];
            for (let key in cacheData) {
              let cacheL = cacheData[key];
              if (cacheL.sessionId == cU.chatId) {
                cU.msgId = cacheL.msgId;
                let unReadNum = cacheL.msgId - cacheL.readId;
                cU.unread = unReadNum < 0 ? 0 : unReadNum;
                cU.otherReadId = cacheL.otherReadId;
                unreadNumAll += cU.unread;
              }
            }
          }
        });
        this.$store.commit("SET_UNREAD_NUMBER", {
          colleagueUnReadNum: unreadNumAll
        });
        this.$store.commit("SET_SESSION_COLLEAGUE_LIST", res);
        this.$store.commit("SET_SESSION_TIME", time);
      });
    },
    cut1() {},
    cut2() {},
    pitch(item) {
      this.sessionColleagueList.forEach(e => {
        for (var i = 0; i < e.listUser.length; i++) {
          let sCache = e.listUser[i];
          if (sCache.isActivity) {
            sCache.isActivity = false;
          }
        }
      });
      let unreadNumAll = this.$store.state.redPoint.colleagueUnReadNum - item.unread || 0;
      this.$store.commit("SET_UNREAD_NUMBER", {
        colleagueUnReadNum: unreadNumAll
      });
      item.unread = 0;
      this.$set(item, "isActivity", true);
      this.$store.commit("UPDATE_CURRENT_SESSION", item);
    }
  },
  created() {
    this.$api.getdepartmentuser().then(res => {
      this.updateColleagueList(res.data);
    });
  }
};
</script>

<style lang="scss" scoped>
.friend {
  display: flex;
  height: calc(100vh - 60px);
  .collapse-cross {
    overflow: hidden;
  }
  .friendlist {
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
    }

    .chat-ing {
      /deep/.el-collapse-item__header {
        text-indent: 14px;
        font-size: 16px;
        background-position: 14px;
        color: #949ca4;
        .el-icon-arrow-right {
          text-indent: 0px;
        }
      }

      /deep/.el-collapse-item__content {
        padding: 0;
      }

      ul {
        // max-height: 456px;
        position: relative;
      }

      .listitem {
        cursor: pointer;
        display: flex;
        height: 73px;
        align-items: center;
        position: relative;
        .head {
          position: relative;
          margin-left: 16px;

          .img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
          }

          img {
            display: block;
          }

          .online {
            position: absolute;
            top: 0;
          }
        }

        .visitor {
          margin-left: 12px;
        }

        .unread {
          position: absolute;
          right: 20px;
          width: 28px;
          color: #fff;
          height: 18px;
          text-align: center;
          line-height: 18px;
          background: #ff7975;
          border-radius: 9px;
        }

        &:hover {
          background: #e6f4ff;
        }

        &.active {
          background: #e6f4ff;
        }
      }
    }
  }
}
</style>
