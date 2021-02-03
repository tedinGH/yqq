<template>
  <div class="loading" :class="{active: isShow}">
    <img src="../../assets/images/index/loading.gif">
  </div>
</template>

<script>
  import $ from 'jquery';
  export default {
    name: 'LoadingComponent',
    data ()
    {
      return {
        isShow: false
      }
    },
    methods: {
      showLoading: function() {
        this.isShow = true;
      },
      hideLoading: function() {
        this.isShow = false;
      }
    },
    mounted: function () {
    }
  }
</script>

<style scoped>
  .loading{display: none;position: fixed;z-index: 3;width: 100%;height: 100%;top: 0;left: 0;background-color:rgba(0,0,0,.3);}
  .loading.active{display: block;}
  .loading>img{position: absolute;top: 50%;left: 50%;width: 30px;height: auto;
    -webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);}
</style>
