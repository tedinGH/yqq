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
      this.$store.commit("SET_TRANSLATE", this.$t('msg'));
    },
  }

</script>
<style src="./assets/css/base.css"></style>
<style lang="scss">
// 上传需求样式
@import "@/assets/css/msg";
  .el-date-table td.current:not(.disabled) span{
    background: #809AE3;
  }
  .el-button--text{
    color: #809AE3;
    &:hover{
      color: #809AE3;
    }
  }
  .el-button.is-plain{
    background: #809AE3;
    color: #fff;
    &:hover{
      background: #809AE3;
      color: #fff;
      border: 1px solid #809AE3;
    }
  }
  
  .el-time-panel__btn {
    &.confirm{
        color: #809AE3;
    }
  }
</style>
