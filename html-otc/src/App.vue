<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {localStore} from "@/tools/localStorage";
  import {Config} from "@/common/config"
  import store from "@/store";

  export default {
    name: 'app',
    data() {
      return {
        version: Config.version,
        // q:''
      }
    },
    methods: {
      goIndex() {
        /*let lang = localStorage.getItem("lang");
        if (lang) {
          window.location = window.location.origin + '/dist/' + lang + '/#/index';
        } else {
          window.location = window.location.origin + '/dist/en_US/#/index';
        }*/
        //window.open( "./static/version.txt");
      },
      autodivheight() {
        let winHeight = 0;
        let winWidth = 0
        if (window.innerHeight) {
          winHeight = window.innerHeight;
          winWidth = window.winWidth;
        } else if ((document.body) && (document.body.clientHeight))
          winHeight = document.body.clientHeight;
        winWidth = document.body.clientWidth;
        //通过深入Document内部对body进行检测，获取浏览器窗口高度
        if (document.documentElement && document.documentElement.clientHeight) {
          winHeight = document.documentElement.clientHeight;
          winWidth = document.documentElement.clientWidth;
        }
        let windowSize = {
          width: winWidth,
          height: winHeight
        }
        this.$store.commit("SET_WINDOWSIZE", windowSize);
      }
    },
    mounted() {
      this.$store.commit("SET_LANG", this.$t("msg"));
      // document.cookie = "eUcShEaRt=QcgrEasfGw5PAumgx1GIruJ06VwpUIwLOlJyjqKTsX216gHhUKee5SiVdGOBQRdp0wYfjtPO06WggO5OTjoH0Q=="
     
      // console.log(navigator.userAgent);
      // this.q = navigator.userAgent
    }
  }

</script>
<style src="./assets/css/base.css"></style>
<style lang="scss" type="text/css">
  @import "./assets/css/style.scss";

</style>
