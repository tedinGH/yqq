<template>
  <div class="home">
    <!-- <el-button class="btn" type="success" @click="cut()">{{$t('msg.btn.login')}}</el-button> -->
    <techweb ref="techweb"></techweb>
    <waitlist v-if="layout.module=='home'&&layout.child=='wait'"></waitlist>
    <agreement v-if="layout.module=='home'&&layout.child=='agreement'"></agreement>
    <linebox v-if="layout.module=='home'&&layout.child=='linebox'"></linebox>
    <setting v-if="layout.module=='home'&&layout.child=='setting'"></setting>
    <switchs  v-if="layout.module=='home'&&layout.child=='switchs'"></switchs>
    <historyinfo v-if="layout.module=='home'&&layout.child=='hf'"></historyinfo>
    <out v-if="layout.module=='home'&&layout.child=='out'"></out>
    <div class="mask" v-if="layout.mask" @click.stop=""></div>
     <!-- 语音提示 -->
    <audio id="audio_remind_access" style="opacity: 0" src="../assets/voice/access.mp3" muted="true"></audio>
    <audio id="audio_remind_news" style="opacity: 0" src="../assets/voice/news.mp3" muted="true"></audio>
    <audio id="audio_remind_tongshi" style="opacity: 0" src="../assets/voice/tongshi.mp3" muted="true"></audio>
  </div>
</template>
<script>
import { actionApi } from "@/api";
import agreement from "@/components/home/agreement";
import setting from "@/components/home/setting";
import linebox from "@/components/home/linebox";
import Rtc from "@/tools/rtc-message";
import techweb from "@/components/home/techweb";
import waitlist from "@/components/home/waitlist";
import switchs from "@/components/home/session/switch";
import historyinfo from "@/components/home/session/historyinfo";
import out from "@/components/home/out";
import { mapGetters } from "vuex";
import { Crypto } from "@/tools/crypto";
import { EchatDB } from "@/session/indexedDB";
import LoginVue from "./Login.vue";
export default {
  name: "Home",
  components: {
    agreement,
    techweb,
    waitlist,
    linebox,
    setting,
    out,
    switchs,
    historyinfo
  },
  computed: {
    ...mapGetters(["layout", "token", "lang", "windowSize", "layout"])
  },
  methods: {
    cut() {
      let lang = localStorage.getItem("locale") || "en_US";
      this.$router.push({
        path: "login/" + lang
      });
    }
  },
  created() {
    this.$api.getbaseinfo().then(res => {
      if (res.code == 103) {
        alert(res.data);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("userinfo");
        this.$router.push({
          path: "login/" + "en_US"
        });
        return;
      }
      // this.$store.commit("SET_USERINFO", res.data)
      window.sessionStorage.setItem("userinfo", Crypto.encrypt(res.data));
      this.$store.commit("SET_ADMIT_LIMIT", res.data.upperLimit);
      let userInfo = window.sessionStorage.getItem("userinfo");
      let userinfo = Crypto.decrypt(userInfo);
      let user = JSON.parse(userinfo);
      this.$store.commit("SET_ADMIT_LIMIT", user.upperLimit);
      this.$store.commit("SET_USERINFO", user);
      let Authorization = sessionStorage.getItem("user");
      let regExp = new RegExp('"', "g");
      Authorization = Authorization.replace(regExp, "");
      if (Authorization) {
        this.$store.commit("SET_TOKEN", Authorization);
        EchatDB.openDB(this.$store.getters.userId).then(() => {
          Rtc.rtc();
        });
      }
      this.$api
        .getgreetingsconf({
          companyId: user.companyId,
          customerServiceId: user.id
        })
        .then(res => {
          if (res.data) {
            if (res.data.usStatus == 1) {
              this.$store.commit("SET_GREETINGS", res.data);
            }
          }
        });
      // 获取通知设置
      this.$api
        .getReminderSetting({
          userId: user.id
        })
        .then(res => {
          if (res.code == 0) {
            this.$store.commit("SET_REMINDERSETTING", res.data);
          }
        });
    });
    let idSeq = window.localStorage.getItem("idSeq");
    if (idSeq) {
      this.$store.state.idSeq = idSeq;
    }

    this.$store.state.activityComponents[this.$options.name] = this; //注册
  },
  mounted() {
    let that = this;
    // let lang = localStorage.getItem('locale') || 'en_US'
    // if (lang == 'en_US') {
    //   lang = "en"
    // } else {
    //   lang = "zh"
    // }
    let d = new Date();
    d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toGMTString();
    //填写去企业后台token
    document.cookie = "Admin-Token=" + this.token + ";" + expires + ";path=/;";
    window.addEventListener("click", event => {
      this.$store.dispatch("setLayout", ["", "", false]);
      if(that.$refs.techweb){
        that.$refs.techweb.$refs.heads.showPersonage = false
      }
    });
    let _beforeUnload_time = 0,
      _gap_time = 0;
    let is_fireFox = navigator.userAgent.indexOf("Firefox") > -1; //是否是火狐浏览器
    window.onunload = function() {
      _gap_time = new Date().getTime() - _beforeUnload_time;
      if (_gap_time <= 2) {
        actionApi.logout();
      } else {
        console.log("刷新");
      }
    };
    window.onbeforeunload = function() {
      _beforeUnload_time = new Date().getTime();
      if (is_fireFox) {
        //火狐关闭执行
        actionApi.logout();
      }
    };
  },
  destroyed() {
    console.log(this.$options.name + " 被销毁");
    // delete this.$store.state.activityComponents[this.$options.name]; //销毁
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .btn {
    position: absolute;
    top: 100px;
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
}
</style>
