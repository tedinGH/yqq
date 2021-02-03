<template>
  <div class="footer-body">
    <div class="footer-title">{{$t("msg.menu.contactUs")}}</div>
    <div class="footer-content">{{$t("msg.menu.email")}}：support@bcircle.net&emsp;&ensp;|&emsp;&ensp;{{$t("msg.menu.tel")}}：000-0000000&emsp;&ensp;|&emsp;&ensp;
      <i class="icon wx"></i>
      <i class="icon qq"></i>
      <i class="icon bcircle"></i>
      <i class="icon airplane"></i>
      <i class="icon bird"></i>
    </div>
    <div class="footer-code">©2013-2019 EchatAPP Global</div>
  </div>
</template>

<script>
  export default {
    name: 'BcircleFooterComponent',
    data (){
      return {
      }
    },
    methods: {
    },
    mounted: function () {
    }
  }
</script>

