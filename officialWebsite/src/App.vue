<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {
      return {
        version:'1.0.1'
      }
    },
    methods: {
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
      let lang = localStorage.getItem('locale') || 'en_US'
      this.$store.commit("SET_LANG", lang);
    },
  }

</script>
<style src="./assets/css/base.css"></style>
<style lang="scss">
</style>
