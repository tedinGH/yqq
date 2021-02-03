<template>
  <div id="app">
    <!-- <div class="app-logo">
      <span class="logo"></span>
      <span class="version">{{ version }}</span>
    </div> -->
    <!-- <el-dropdown class="cutlang" trigger="click">
      <div class="cut" style="cursor: pointer;">{{$t("msg.common.cut")}}</div>
      <el-dropdown-menu slot="dropdown" class="lang" style="width:168px;">
        <el-dropdown-item @click.native="toggleLang('zh_CN')" :disabled="$i18n.locale == 'zh_CN'" style="text-align: center;">中文</el-dropdown-item>
        <el-dropdown-item @click.native="toggleLang('en_US')" :disabled="$i18n.locale == 'en_US'" style="text-align: center;">English
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    <router-view></router-view>
  </div>
</template>
<script>
import { Crypto } from "@/tools/crypto";
import { actionApi } from "@/api";
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    toggleLang(lang) {
      if (lang == "zh_CN") {
        localStorage.setItem("locale", "zh_CN");
        this.$i18n.locale = localStorage.getItem("locale");
        this.$store.commit("SET_LANG", this.$i18n.locale);
        this.$message({
          message: "切换为中文！",
          type: "success"
        });
      } else if (lang == "en_US") {
        localStorage.setItem("locale", "en_US");
        this.$i18n.locale = localStorage.getItem("locale");
        this.$store.commit("SET_LANG", this.$i18n.locale);
        this.$message({
          message: "Switch to English!",
          type: "success"
        });
      }
    },
    autodivheight() {
      let winHeight = 0;
      let winWidth = 0;
      if (window.innerHeight) {
        winHeight = window.innerHeight;
        winWidth = window.winWidth;
      } else if (document.body && document.body.clientHeight) winHeight = document.body.clientHeight;
      winWidth = document.body.clientWidth;
      //通过深入Document内部对body进行检测，获取浏览器窗口高度
      if (document.documentElement && document.documentElement.clientHeight) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
      }
      if (winWidth <= 723) {
        winWidth = 723;
      }
      if (winHeight <= 360) {
        winHeight = 360;
      }
      let windowSize = {
        width: winWidth,
        height: winHeight
      };
      this.$store.commit("SET_WINDOWSIZE", windowSize);
    }
  },
  mounted() {
    // this.autodivheight()
    let lang = localStorage.getItem("locale") || "en_US";
    this.$store.commit("SET_LANG", lang);
    this.$store.commit("SET_TRANSLATE", this.$t("msg"));
    let Authorization = sessionStorage.getItem("user");
    this.$store.commit("SET_TOKEN", Authorization);
    if (!Authorization) {
      this.$router.push({
        path: "login/" + "en_US"
      });
    }
  }
};
</script>
<style src="./assets/css/base.css"></style>
<style lang="scss">
// 上传需求样式
@import "@/assets/css/msg";
#app {
  width: 100%;
  height: 100%;
  .cutlang {
    position: fixed;
    top: 27px;
    right: 27px;
    .cut {
      width: 168px;
      height: 46px;
      background: rgba(127, 153, 227, 1);
      border-radius: 25px;
      color: #fff;
      line-height: 46px;
      text-align: center;
    }
  }
  .seal {
    width: 400px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .content {
      margin-top: 50px;
      text-align: center;
      padding: 0 32px;
    }

    .btn {
      width: 78px;
      height: 34px;
      background: #7f99e3;
      color: #fff;
      text-align: center;
      line-height: 34px;
      border-radius: 5px;
      margin-top: 45px;
      cursor: pointer;
    }
  }
}
</style>
