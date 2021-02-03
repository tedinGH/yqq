<template>
  <div v-if="tip">
    <div class="out outs" @click.stop="" v-if="sessionLists.length == 0">
      <span class="close" @click="close"></span>
      <div class="text">Whether to log out or not</div>
      <div class="btnbox">
        <div class="btns exit" @click="close">Cancel</div>
        <div class="btns" @click="out()">Confirm</div>
      </div>
    </div>
    <div v-else class="out outs" @click.stop="">
      <span class="close" @click="close"></span>
      <div class="text2">The current system has a session, whether to continue to exit</div>
      <div class="btnbox">
        <div class="btns exit" @click="out()">Ignore and exit</div>
        <div class="btns" @click="goswich">Switch</div>
      </div>
    </div>
  </div>
  <div v-else class="check" @click.stop="">
    <header>
      Select the agent to be transferred
      <span class="close" @click="close"></span>
    </header>
    <ul class="list" v-scrollBar>
      <li v-for="(i, index) in sessionLists" :key="index" class="list-item">
        <span class="point" :class="{ active: i.online == 2 }" @click="choice(i)"></span>
        <img src="../../assets/images/chat/phone.png" v-if="i.source == '2'" />
        <img src="../../assets/images/chat/pc.png" v-else />
        <p class="text">#{{ i.chatId | name }}</p>
      </li>
    </ul>
    <div class="btn" @click="confirm">
      Confirm
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "out",
  data() {
    return {
      tip: true
    };
  },
  computed: {
    ...mapGetters(["userInfo", "currentSession", "sessionLists"])
  },
  methods: {
    close() {
      this.$store.dispatch("setLayout", ["", "", false]);
    },
    out() {
      this.$api.logout().then(res => {
        if (res.code == 0) {
          let lang = localStorage.getItem("locale") || "en_US";
          this.$router.push({
            path: "login/" + lang
          });
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("condition");
          sessionStorage.removeItem("userinfo");
        }
      });
    },
    goswich() {
      if (this.sessionLists.length == 1) {
        this.$store.commit("UPDATE_CURRENT_SESSION", this.sessionLists[0]);
        this.$store.dispatch("setLayout", ["home", "switchs", false]);
      } else {
        this.tip = false;
      }
    },
    choice(item) {
      if (item.online == 2) {
        this.$set(item, "online", 1);
        this.$store.commit("UPDATE_CURRENT_SESSION", {});
      } else {
        for (let key in this.sessionLists) {
          let sCache = this.sessionLists[key];
          if (sCache.online) {
            sCache.online = 1;
          }
        }
        this.$set(item, "online", 2);
        this.$store.commit("UPDATE_CURRENT_SESSION", item);
      }
    },
    confirm() {
      if (this.currentSession.online) {
        this.$store.dispatch("setLayout", ["home", "switchs", false]);
      } else {
        this.$message.warning("Please select session");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.out {
  z-index: 9999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 399px;
  height: 205px;
  background: rgba(255, 255, 255, 0.99);
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.24);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .close {
    position: absolute;
    display: inline-block;
    width: 19px;
    height: 17px;
    background: url(../../assets/images/xx.png);
    right: 13px;
    top: 10px;
    cursor: pointer;
  }
  &.outs {
    justify-content: space-around;
  }
  .text {
    text-align: center;
    font-size: 18px;
    margin-top: 70px;
  }
  .text2 {
    text-align: center;
    padding: 0 20px;
    font-size: 18px;
    margin-top: 40px;
  }
  .btnbox {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .btn {
    margin-top: 60px;
    display: inline-block;
    padding: 10px 25px;
    background: $color-theme;
    border: 1px solid $color-theme;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
  }
  .btns {
    // margin-top: 40px;
    display: inline-block;
    padding: 10px 25px;
    background: $color-theme;
    border: 1px solid $color-theme;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    &.exit {
      background: #999;
      border: 1px solid #999;
    }
  }
}
.check {
  z-index: 9999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 380px;
  height: 559px;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding-top: 14px;
  padding-left: 20px;
  padding-right: 20px;
  header {
    position: relative;
    .close {
      position: absolute;
      display: inline-block;
      width: 19px;
      height: 17px;
      background: url(../../assets/images/xx.png);
      right: 0;
      cursor: pointer;
    }
  }
  .list {
    margin-top: 45px;
    height: 370px;
    position: relative;
    .list-item {
      display: flex;
      align-items: center;
      margin-bottom: 26px;
      .point {
        cursor: pointer;
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url(../../assets/img/dot.png);
        margin-right: 13px;
        &.active {
          background: url(../../assets/img/dot-active.png);
        }
      }
      .text {
        margin-left: 13px;
      }
    }
  }
  .btn {
    margin: auto;
    width: 78px;
    height: 34px;
    background: $color-theme;
    border-radius: 5px;
    color: #fff;
    line-height: 34px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
