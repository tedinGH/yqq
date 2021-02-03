<template>
  <div class="heads">
    <div class="left display-flex">
      <div class="unfold" @click="cutUnfold">
        <img src="../../assets/images/unfold.png" v-if="!unfold" />
        <img src="../../assets/images/connecting.png" v-else />
      </div>
      <div class="wait" @click.stop="openWait">
        <el-badge :value="waitnum" class="item" type="primary" :max="99" :hidden="waitnum == 0">
          <img src="../../assets/images/wait.png" />
        </el-badge>
      </div>
    </div>
    <!-- <div>{{nums}}</div>
    <div @click="gett">拿</div> -->
    <div class="right display-flex">
      <div class="state">
        <div v-if="online" class="display-flex">
          <img src="../../assets/images/on-line.png" />
          <span class="line">Online</span>
          <img style="cursor: pointer" src="../../assets/images/open.png" @click="cutline(1)" />
        </div>
        <div v-else>
          <img src="../../assets/images/off-line.png" />
          <span class="line">Offline</span>
          <img style="cursor: pointer" src="../../assets/images/close.png" @click="cutline(0)" />
        </div>
      </div>
      <div class="user display-flex">
        <img class="img" style="border: 2px solid #ffffff;" v-if="userInfo.avatarUrl" :src="config.imgurl + 'original/' + userInfo.avatarUrl" />
        <img class="img" v-else src="../../assets/images/history.png" />
        <span style="margin-left: 8px; cursor: pointer;" v-if="!showPersonage" @click.stop="showPersonage = !showPersonage">
          {{ userInfo.nickName }}
          <img src="../../assets/images/down.png" style="margin-left: 10px;" />
        </span>
        <span style="margin-left: 8px; cursor: pointer;" v-else @click.stop="showPersonage = !showPersonage">
          {{ userInfo.nickName }}
          <img src="../../assets/images/up.png" style="margin-left: 10px;" />
        </span>
        <div class="info" v-show="showPersonage">
          <div @click.stop="gotoPersonage">Account information</div>
          <div @click.stop="openset">Personal settings</div>
        </div>
      </div>
      <div class="close" @click.stop="Close()" style="cursor: pointer">
        <img src="../../assets/images/quit.png" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "heads",
  data() {
    return {
      timer: null,
      showPersonage: false,
      time: 60,
      pageNum: 1,
      pageSize: 20,
      nums: null
    };
  },
  computed: {
    ...mapGetters(["userInfo", "unfold", "waitLists", "online", "waitnum"])
  },
  components: {},
  created() {
    if (window.sessionStorage.getItem("status") == 0 || window.sessionStorage.getItem("status") == null) {
      this.$store.commit("SET_ONLINE", true);
    } else {
      this.$store.commit("SET_ONLINE", false);
    }
    let that = this;
    window.onblur = function() {
      if (that.online && that.userInfo.swithAutoChangeStatus == 1) {
        that.timer = setTimeout(() => {
          that.$store.dispatch("setLayout", ["home", "linebox", true]);
          that.$api.setchatstatus({ status: 1 }).then(res => {
            if (res.code == 0) {
              that.$store.commit("SET_ONLINE", false);
              window.sessionStorage.setItem("status", 1);
            }
          });
        }, that.userInfo.autoChangeStatusTime * 1000);
      }
    };
    window.onfocus = function() {
      clearInterval(that.timer);
    };
    // 测试使用
    // this.$api.getEnableJoinInfo().then(
    //   res=>{
    //     this.nums=res.data.joinedCount
    //   }
    // )
  },
  methods: {
    // 测试使用
    gett() {
      //   this.$api.getEnableJoinInfo().then(
      //   res=>{
      //     this.nums=res.data.joinedCount
      //   }
      // )
    },
    Close() {
      console.log();
      this.$store.dispatch("setLuyou", "default");
      this.$store.dispatch("setLayout", ["home", "out", true]);
    },
    cutline(idx) {
      if (idx == 1) {
        this.$api.setchatstatus({ status: idx }).then(res => {
          if (res.code == 0) {
            this.$store.commit("SET_ONLINE", false);
            window.sessionStorage.setItem("status", 1);
          }
        });
      } else {
        this.$api.setchatstatus({ status: idx }).then(res => {
          if (res.code == 0) {
            this.$store.commit("SET_ONLINE", true);
            window.sessionStorage.setItem("status", 0);
          }
        });
      }
    },
    openWait() {
      this.$api
        .getVisitorList({
          type: 1,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          let waitLists = [];
          res.data.list.forEach(v => {
            waitLists.push({
              ipSource: v.ipSource,
              visitorsId: v.visitorsId,
              source: v.source,
              createTime: v.createTime,
              waittime: null,
              visitNum: v.visitNum,
              sysTime: v.sysTime,
              sourceUrl: v.sourceUrl,
              onlineStatus: v.onlineStatus
            });
          });
          this.$store.commit("SET_WAITLISTS", waitLists);
          this.$store.dispatch("setLayout", ["home", "wait", true]);
        });
    },
    cutUnfold() {
      this.$store.commit("SET_UNFOLD", !this.unfold);
    },
    gotoPersonage() {
      this.$router.push({
        name: "personageinfo"
      });
      this.showPersonage = false;
    },
    openset() {
      this.showPersonage = false;
      this.$store.dispatch("setLayout", ["home", "setting", true]);
    }
  }
};
</script>

<style lang="scss" scoped>
.heads {
  height: 60px;
  width: 100%;
  display: flex;
  background: #e1e5f1;
  justify-content: space-between;

  .unfold {
    margin-left: 16px;
    cursor: pointer;
  }

  .wait {
    margin-left: 27px;
    cursor: pointer;

    /deep/.el-badge__content--primary {
      background: rgba(221, 242, 255, 0.4);
      border: 1px solid #549dff;
      color: #549dff;
    }
  }

  .state {
    margin-right: 32px;

    .line {
      margin: 0 10px 0 5px;
    }
  }

  .user {
    margin-right: 120px;
    position: relative;
    .img {
      width: 44px;
      height: 44px;
      display: block;
      border-radius: 50%;
      cursor: pointer;
    }
    .info {
      width: 164px;
      // height: 34px;
      background: #ffffff;
      box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.24);
      border-radius: 5px;
      text-align: center;
      line-height: 34px;
      position: absolute;
      top: 38px;
      left: 45px;
      cursor: pointer;
      z-index: 10;
      div:nth-child(1) {
        border-bottom: 1px solid $border-color;
      }
    }
  }

  .close {
    margin-right: 17px;
  }
}
</style>
