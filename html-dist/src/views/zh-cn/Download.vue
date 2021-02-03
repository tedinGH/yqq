<template>
  <div class="download-wrapper">
    <img class="phone" src="../../assets/images/download/phone.png">
    <img src="../../assets/images/download/bottom.png"  class="bottom">
    <div class="container">
      <img class="logo" src="../../assets/images/download/logo.png">
       <div class="main">
        <h4 class="title">点击下载地址,开始您专属的EchatAPP之旅</h4>
        <div class="display-flex " v-if="os=='android'">
          <div class="display-flex" v-if="androidurl.length==1&&androidurl[0].channelCode=='google_pay'">
            <a class="android-btn" :href="gugeurl">{{$t("msg.download.googlestore")}}</a>
          </div>
          <div class="display-flex" v-else-if="androidurl.length==1&&androidurl[0].channelCode=='official_android'">
            <a class="btn" :href="gugeurl">{{$t("msg.download.download")}}1
            </a>
          </div>
          <div class="else" v-else>
            <a class="android-btn" :href="gugeurl">{{$t("msg.download.googlestore")}}</a>
            <a class="btn" v-for="(item, index) in elseandroidurl" :key="index" :href="item.filePath">体验版
            </a>
          </div>
        </div>
        <div class="display-flex " v-if="os=='ios-ipa'">
          <div class="else" v-if="iosurl.length==1&&iosurl[0].channelCode=='appstore_ios'">
            <a class="ios-btn" :href="osurl">{{$t("msg.download.applestore")}}</a>
            <a class="btn" v-for="(item, index) in elseiosurl" :key="index" :href="item.filePath">体验版
            </a>
          </div>
          <div class="else" v-else-if="iosurl.length==1&&iosurl[0].channelCode=='official_ios'">
            <a class="btn" :href="osurl">{{$t("msg.download.download")}}1
            </a>
            <a class="btn" v-for="(item, index) in elseiosurl" :key="index" :href="item.filePath">体验版</a>
          </div>
          <div class="else" v-else>
            <a class="ios-btn" :href="osurl">{{$t("msg.download.applestore")}}</a>
            <a class="btn" v-for="(item, index) in elseiosurl" :key="index" :href="item.filePath">体验版
            </a>
          </div>
        </div>
        <!-- <p class="notice">注：下载速度过慢可选择另外一个地址下载哦</p> -->
      </div>
      <!-- <a :href="tellApp" v-if="addType=='echat'" id="test" style="display:none;"></a>
      <a :href="tellApp" v-if="addType=='group'" id="test" style="display:none;"></a>
      <a :href="tellApp" v-if="addType=='alias'" id="test" style="display:none;"></a> -->
      <a :href="tellApp" id="test" style="display:none;"></a>
    </div>
    <div class="wx-mask" :class="{active: isWx}">
      <div class="tip-ios" v-show="device=='IOS'"></div>
      <div class="tip-android" v-show="device=='Android'"></div>
    </div>
  </div>
</template>

<script>
  import logic from '../mixins/download';
  export default {
    name: 'download',
    mixins: [logic]
  }

</script>
<style lang="scss">
  @import "../../assets/scss/download.scss";

</style>
