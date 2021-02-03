<template>
  <div id="app" class="home">
    <header class="head" id="head">
      <div class="company-logo fl">
        <span
          class="website-name fl"
          v-show="isFixed || show != 'bottom'"
          @click="showTopBar"
          >Download</span
        >
      </div>
      <div class="head-right fr">
        <div class="language" @click="showLang = !showLang">
          {{ $t("lang") }}
          <i :class="showLang ? 'active arrow' : 'arrow'"></i>
          <ul :class="['nav-drop', showLang ? 'active' : '']">
            <li
              v-for="(item, index) in languageList.list"
              :key="index"
              @click="setLanguage(item)"
              :class="item.lang == lang ? 'active' : ''"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div
      :class="['down-fixed', show == 'bottom' ? 'bottom' : 'top']"
      v-if="(show == 'bottom' || show == 'top')&&dbshow  "
    >
      <el-row>
        <el-col :span="17" style="white-space: nowrap">
          <span class="bottom-logo"></span>
          <span class="bottom-name">Echat APP<br />{{ $t("L10015") }}</span>
        </el-col>
        <el-col :span="7">
          <span class="btn download-btn" @click="goto">{{
            $t("download")
          }}</span>
        </el-col>
      </el-row>
      <span
        class="bottom-fixed-close"
        v-if="show == 'bottom'"
        @click="closeBottomBar"
        ><i class="el-icon-close"></i
      ></span>
    </div>
    <div
      class="top-fixed"
      v-if="client == 'other' && (show == 'top' || show == 'bottom')"
    >
      <el-row>
        <el-col :span="6">
          <a href="#" class="top-logo ios"></a>
        </el-col>
        <el-col :span="6">
          <a href="#" class="top-logo android"></a>
        </el-col>
        <el-col :span="6">
          <a href="#" class="top-logo mac"></a>
        </el-col>
        <el-col :span="6">
          <a href="#" class="top-logo windows"></a>
        </el-col>
      </el-row>
    </div>
    <section class="main">
      <swiper ref="mySwiper" :options="swiperOption">
        <swiper-slide class="swiper-slide">
          <div class="banner">
            <div class="baner-disc">
              <!-- <img class="toplogo" src="./assets/images/toplogo.png"> -->
              <div class="toplogo"></div>
              <div class="logoT">EchatAPP</div>
              <h1>{{ $t("L10000") }}</h1>
              <div :class="[ 'first-img', client == 'ios'? 'ios' : client == 'android'? 'android': 'other', ]"></div>
              <a v-if="client == 'ios'" class="first-disc" :href='iosurl'>
                <!-- <img src="./assets/images/ios.png" > -->
              </a> 
              <a v-else-if="client == 'android'" class="first-disc androidurl" :href="androidurl">
              </a> 
              <div>
                <a v-if="client == 'ios'&&eliosurl" class="base" :class="{en:lang=='en_US'}" :href='eliosurl'>
                {{ $t("down") }}
                </a> 
              </div>
              <div>
                <a v-if="client == 'android'&&elandurl"  class="base" :href='elandurl'>
                {{ $t("down") }}
                </a>  
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="main-section">
            <img class="preview-img" />
            <div class="section-disc">
              <h3>{{ $t("L10004") }}</h3>
              <div class="main-img second"></div>
              <p>{{ $t("L10005") }}</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="main-section">
            <img class="preview-img" />
            <div class="section-disc three">
              <h3>{{ $t("L10006") }}</h3>
              <div class="main-img three"></div>
              <p>{{ $t("L10007") }}</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="main-section">
            <img class="preview-img" />
            <div class="section-disc four">
              <h3>{{ $t("L10008") }}</h3>
              <div class="main-img four"></div>
              <p>{{ $t("L10009") }}</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="main-section">
            <img class="preview-img" />
            <div class="section-disc five">
              <h3>{{ $t("L10010") }}</h3>
              <div class="main-img five"></div>
              <p>{{ $t("L10011") }}</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="main-section">
            <img class="preview-img" />
            <div class="section-disc six">
              <h3>{{ $t("L10012") }}</h3>
              <div class="main-img six"></div>
              <p>{{ $t("L10013") }}</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <footer class="footer">
            <div class="footer-row">
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="footer-top-title">COMPANY</div>
                  <nav class="footer-nav">
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Our products</a>
                    <a href="#">Our culture</a>
                    <a href="#">Team</a>
                  </nav>
                </el-col>
                <el-col :span="8">
                  <div class="footer-top-title">MORE LINKS</div>
                  <nav class="footer-nav">
                    <a href="#">Team&conditions</a>
                    <a href="#">Our careers</a>
                    <a href="#">Support & FAQ</a>
                    <a href="#">Sign up</a>
                    <a href="#">Log in</a>
                  </nav>
                </el-col>
                <el-col :span="8" class="tiuch">
                  <div class="footer-top-title">GET IN TIUCH</div>
                  <a href="#" class="btn btn-icon one"></a>
                  <a href="#" class="btn btn-icon two"></a>
                  <a href="#" class="btn btn-icon three"></a>
                  <a href="#" class="btn btn-icon four"></a>
                  <a href="#" class="btn btn-icon five"></a>
                </el-col>
              </el-row>
            </div>
          </footer>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </section>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper"; //局部引入
import "swiper/dist/css/swiper.css";
  import api from './api'
export default {
  name: "App",
  data() {
    return {
      showLang: false,
      languageList: {
        name: this.$t("lang"),
        list: [
          { lang: "en_US", name: "English" },
          { lang: "zh_CN", name: "简体中文" },
          // { lang: "my", name: "တရုတ်ဘာသာ" },
        ],
      },
      lang: "",
      iosurl:'',
      androidurl:'',
      eliosurl:null,
      elandurl:null,
      bannerimg: [
        "banner-img-init",
        "banner-img1",
        "banner-img2",
        "banner-img3",
        "banner-img4",
      ],
      show: "bottom",
      dbshow:false,
      client: "ios",
      isFixed: false,
      swiperOption: {
        notNextTick: true,
        mousewheel: true,
        direction: "vertical",
        mousewheelControl: true,
        autoHeight: true,
        height: window.innerHeight,
        observeParents: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
        },
        on: {
          //监听滑动切换事件，返回swiper对象
          slideChange: () => {
            let swiper = this.$refs.mySwiper.$swiper;
            if (swiper.activeIndex) {
              // this.isFixed = true;
              // this.show = "";
            } else {
              this.isFixed = false;
            }
            if(swiper.activeIndex==0) {
              this.dbshow = false
            }else{
              this.dbshow = true
            }
          },
        },
      },
    };
  },

  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  created() {
    const lang = localStorage.getItem("locale") || "en_US";
    this.lang = lang;
    localStorage.setItem("locale", lang);
    if (lang) {
      this.lang = lang;
      this.$i18n.locale = lang;
    }
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      //判断iPhone|iPad|iPod|iOS
      this.client = "ios";
    } else if (/(Android)/i.test(navigator.userAgent)) {
      //判断Android
      //alert(navigator.userAgent);
      this.client = "android";
    } else {
      //pc
      this.client = "other";
    }
    this.get()
  },
  mounted() {
  },

  beforeDestroy() {},
  methods: {
    get(){
      api.getUrl({}).then(
          data => {
              for (let i = 0; i < data.length; i++) {
              let item = data[i];
              item.id = "qrcodeId_" + (i + 1);
              if (item.os == "ios-ipa") {
                //显示苹果商店
                if (item.channelCode == "appstore_ios") {
                  this.iosurl=item.filePath
                }else{
                  this.eliosurl = 'https://testflight.apple.com/join/evPvwAWm'
                }
              }
              if (item.os == "android") {
                //显示谷歌商店
                if (item.channelCode == "google_pay") {
                  this.androidurl=item.filePath
                } 
                if(item.channelCode == "official_android"){
                  this.elandurl = item.filePath
                }
              }
            }
          }, () => {}
        )
    },
    goto() {
      let lang = localStorage.getItem("locale") || "en_US";
      window.location.href = window.location.origin + "/dist/" + lang + "/#/download/0/0"
    },
    setLanguage(val) {
      localStorage.setItem("locale", val.lang);
      this.$i18n.locale = val.lang;
      this.lang = val.lang;
    },
    closeBottomBar() {
      this.show = "";
    },
    showTopBar() {
      this.show = "bottom";
    },
  },
};
</script>

<style lang="less">
@import "./assets/css/mixin.less";

body {
  overflow: hidden;
}
.head {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 40px;
  line-height: 42px;
  color: #000;
  transition: all 0.5s;
  position: fixed;
  background-color: #fff;
  border-bottom: 2px solid #7ccac3;

  .company-logo {
    overflow: hidden;
    margin: 7px 15px;

    .logo {
      display: inline-block;
      height: 26px;
      width: 26px;
      background-repeat: no-repeat;
      background-size: contain;
      .bg-image("./assets/images/top-logo");
    }

    .website-name {
      position: relative;
      display: inline-block;
      // margin-left: 13px;
      font-size: 14px;
      line-height: 26px;
      font-weight: 500;
      color: #010101;
      // padding-left: 13px;

      // &::before {
      //   position: absolute;
      //   top: 4px;
      //   left: 0;
      //   content: "";
      //   height: 18px;
      //   width: 1px;
      //   background-color: #cbf2ef;
      // }

      &.text-success {
        color: #46b4aa;
      }
    }
  }
  .language {
    position: relative;
    display: inline-block;
    width: 174px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 16px;
    padding-left: 14px;
    text-align: center;
    .arrow {
      position: absolute;
      right: 16px;
      top: 16px;
      display: inline-block;
      height: 7px;
      width: 10px;
      background-image: url(./assets/images/icon-down.png);
      background-size: 100% 100%;
      transition: all 0.2s linear;
      &.active {
        transform: rotate(-180deg);
        transition: all 0.2s linear;
      }
    }
    .nav-drop {
      display: none;
      padding-left: 0;
      padding-right: 0;
      background: #fff;
      box-shadow: 0 5px 15px #e6e6e6;
      margin: 0;
      z-index: 999;
      &.active {
        display: block;
      }
      li {
        list-style: none;
        &.active {
          color: #46b4aa;
          background: #f5f7fa;
        }
      }
    }
  }
  .nav {
    margin-left: 110px;

    .btn {
      font-size: 14px;
    }
  }

  .el-popper {
    margin-top: 0 !important;
  }
}

.el-dropdown-menu__item {
  color: #000;
  text-align: center;
}

.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #f5f7fa;
  color: #46b4aa;
}

.el-popper .popper__arrow {
  display: none !important;
}

.btn {
  display: inline-block;
  min-height: 42px;
  line-height: 42px;
  padding: 0 24px;
  border-width: 1px;
  border-radius: 24px;
  border-style: solid;
  font-size: 16px;
  cursor: pointer;

  &.btn-default {
    border-color: #fff;
    color: #fff;
  }

  &.btn-text {
    border: none;
  }

  &:hover {
    opacity: 0.75;
    // border-color: #01ff8a;
    // color: #01ff8a;
  }
}

.banner {
  position: relative;
  // overflow: hidden;
  height: 100vh;
  width: 100vw;
  // max-width: 1920px;
  margin: 0 auto;
  .bg-image("./assets/images/bg");
  background-size: 100%;
  text-align: center;

  .baner-disc {
    >.toplogo{
      margin: auto;
      margin-top: 20%;
      width: 79px;
      height: 79px;
      background: url(./assets/images/toplogo.png);
      background-size: 100%;
    }
    >.logoT{
      color: #46b4aa;
      font-size: 30px;
    }
    > h1 {
      font-size: 16px;
      line-height: 34px;
      padding: 0 14%;
      color: #777777;
      font-weight: 400;
    }

    > h3 {
      font-size: 20px;
      margin: 20px 0;
    }

    > p {
      line-height: 28px;
      margin-right: 100px;
    }
  }

  .banner-img {
    width: 1070px;
    min-height: 595px;
    position: absolute;
    z-index: 9;
    top: 0;
    right: 100px;

    > img {
      margin-top: 160px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .banner-go {
    margin-top: 40px;

    &.btn {
      height: 58px;
      line-height: 58px;
      font-size: 18px;
      border-radius: 30px;
      padding: 0 38px;
    }
  }

  .inst-disc {
    margin: 9% 0 30px 58px;
  }

  .banner-download-list {
    margin: 0 auto;

    .btn {
      width: 220px;
      text-align: left;

      &.btn-icon {
        position: relative;
        padding: 10px 0 10px 100px;
        height: 80px;
        line-height: 30px;

        p {
          margin: 0;
        }

        .icon {
          position: absolute;
          top: 20px;
          left: 30px;
        }

        &:hover {
          opacity: 1;
          border-color: #04ef94 !important;
          color: #04ef94;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.5) inset, 0 0 12px #32fda0;

          .icon {
            display: none;
          }

          .down-animate {
            display: inline-block;
          }
        }
      }

      .down-animate {
        position: absolute;
        top: 8px;
        left: 19px;
        display: none;
      }
    }
  }
}

.first-img {
  background-position: center;
  background-repeat: no-repeat;
  height: 38vh;
  background-size: 81%;

  &.ios {
    .bg-image("./assets/images/iOS");
  }

  &.android {
    .bg-image("./assets/images/Android");
  }

  &.other {
    .bg-image("./assets/images/other");
    background-size: 88%;
  }
}

.first-disc {
  display: inline-block;
  width: 39vw;
  height: 7.3vh;
  background: url(./assets/images/ios.png) no-repeat center;
  background-size: 100%;
}
.androidurl{
  background: url(./assets/images/android.png) no-repeat center;
  background-size: 100%;
}
.base{
    display:inline-block;
    height: .58rem;
    border: 1px solid #4BB8A4;
    border-radius: .1rem;
    padding-left: .62rem;
    padding-right: 0.2rem;
    font-size: .24rem;
    text-align: center;
    line-height: .58rem;
    color: #fff;
    background:#4BB8A4 url(./assets/images/Download.png) .22rem center no-repeat;
    background-size: .32rem;
    &.en{
      font-size: .22rem;
    }
}

.down-fixed {
  position: fixed;
  left: 0;
  right: 0;
  height: 54px;

  background-image: linear-gradient(45deg, #52e7a9, #0594ae);
  color: #fff;
  text-align: left;
  z-index: 99;

  &.bottom {
    bottom: 0;
    top: auto;
    border-radius: 12px 12px 0 0;
  }

  &.top {
    top: 40px;
    bottom: auto;
    border-radius: 0 0 12px 12px;
  }

  .bottom-logo {
    display: inline-block;
    height: 27px;
    width: 27px;
    margin: 13px 7px 0 20px;
    background-repeat: no-repeat;
    background-size: contain;
    .bg-image("./assets/images/download-logo");
  }

  .bottom-name {
    display: inline-block;
    font-size: 12px;
    line-height: 14px;
    position: relative;
    top: -2px;
    width: 170px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .download-btn {
    min-height: 28px;
    line-height: 28px;
    font-size: 14px;
    float: right;
    margin: 13px 20px 0 0;
  }

  .bottom-fixed-close {
    position: absolute;
    bottom: 42px;
    right: 5px;
    display: inline-block;
    height: 22px;
    width: 22px;
    line-height: 22px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
    text-align: center;
    cursor: pointer;
  }
}

.top-fixed {
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  height: 54px;
  border-radius: 0 0 12px 12px;
  background-image: linear-gradient(45deg, #52e7a9, #0594ae);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
  color: #fff;
  text-align: center;
  z-index: 1000;

  .top-logo {
    display: inline-block;
    height: 35px;
    width: 35px;
    margin-top: 9px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

    &.ios {
      .bg-image("./assets/images/iOS-download-btn");
    }

    &.android {
      .bg-image("./assets/images/Android-download-btn");
    }

    &.mac {
      .bg-image("./assets/images/Mac-download-btn");
    }

    &.windows {
      .bg-image("./assets/images/Windows-download-btn");
    }
  }
}

.main-img {
  width: 100%;
  height: 40vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  &.second {
    .bg-image("./assets/images/second-img");
  }

  &.three {
    .bg-image("./assets/images/three-img");
  }

  &.four {
    .bg-image("./assets/images/four-img");
  }

  &.five {
    .bg-image("./assets/images/five-img");
  }

  &.six {
    .bg-image("./assets/images/six-img");
  }
}

.main {
  height: 100%;
  width: 100%;
}

.main-section {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;

  .section-disc {
    text-align: center;
    &.three {
      h3 {
        margin-top: 20%;
      }
      .main-img {
        height: 26vh;
        background-size: contain;
      }
    }
    &.four {
      h3 {
        margin-top: 20%;
      }
      .main-img {
        height: 32vh;
        background-size: contain;
      }
    }
    &.five {
      h3 {
        margin-top: 20%;
      }
      .main-img {
        background-size: 90%;
      }
    }
    &.six {
      h3 {
        margin-top: 20%;
      }
      .main-img {
        height: 38vh;
      }
    }
    h3 {
      font-size: 22px;
      font-weight: normal;
      margin-top: 20%;
      color: #303c4b;
    }

    p {
      color: #90a1ad;
      line-height: 24px;
      font-size: 12px;
      text-align: left;
      margin: 15px 40px;
    }
  }
}

.footer {
  background-color: #f2f2f2;
  padding: 32% 0 90px 0;
  height: 100vh;

  .footer-row {
    margin: 0 28px;

    .footer-nav {
      a {
        display: block;
        font-size: 12px;
        text-decoration: underline;
        line-height: 26px;
        color: #303c4b;

        &:hover {
          color: #29a99d;
        }
      }
    }
  }

  .tiuch {
    .btn {
      display: inline-block;
      height: 27px;
      width: 27px;
      border-radius: 26px;
      padding: 0;
      border: none;
      line-height: 27px;
      min-height: 27px;
      margin-right: 14px;
      margin-bottom: 22px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;

      &.one {
        .bg-image("./assets/images/footer-icon-1");
      }

      &.two {
        .bg-image("./assets/images/footer-icon-2");
      }

      &.three {
        .bg-image("./assets/images/footer-icon-3");
      }

      &.four {
        .bg-image("./assets/images/footer-icon-4");
      }

      &.five {
        .bg-image("./assets/images/footer-icon-5");
      }
    }

    .footer-top-title {
      margin-bottom: 22px;
    }
  }

  .footer-top-title {
    font-size: 14px;
    color: #303c4b;
    margin-bottom: 20px;
  }
}

.swiper-slide {
  overflow: hidden;
}

.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
}

.swiper-pagination-bullet-active {
  background: #46b4aa;
}

.swiper-container-vertical
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  margin: 15px 0;
}
@media screen and (orientation: landscape) {
  .banner .baner-disc > h1 {
    margin-top: 10%;
  }
  .first-img {
    background-position: center;
    background-repeat: no-repeat;
    height: 38vh;
    background-size: contain;
  }
  .main-section {
    .section-disc {
      h3 {
        margin-top: 10%;
      }
      &.three {
        h3 {
          margin-top: 10%;
        }
      }
      &.four{
        h3 {
          margin-top: 10%;
        }
      }
      &.five{
        h3 {
          margin-top: 10%;
        }
      }
      &.six{
        h3 {
          margin-top: 10%;
        }
      }
    }
  }
 
}
</style>
