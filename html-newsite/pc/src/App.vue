<template>
  <div id="app" class="home">
    <header :class="['head', isFixed ? 'head-fixed' : '']" :style="{ opacity: opacity }">
      <div class="company-logo fl">
        <span class="logo fl"></span>
        <el-link class="website-name fl" ref="website-name">EchatAPP</el-link>
      </div>
      <nav class="nav fl">
        <a @click="gotoHead" class="btn btn-text" v-if="isFixed">{{ $t("home") }}</a>
      </nav>
      <menu class="head-right fr">
        <!-- <li v-if="!loginInfo"><span @click="login" class="btn btn-text">{{$t('login')}}</span></li> -->
        <!-- <li v-if="loginInfo">
          <el-dropdown placement="bottom" @command="handleCommand" trigger="click">
            <span class="el-dropdown-link pointer">
              <span class="avatar"><img :src="base.headUrl+'/'+loginInfo.avatar" /></span>{{loginInfo.nickName}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>{{$t('security')}}</el-dropdown-item>
              <el-dropdown-item>{{$t('authentication')}}</el-dropdown-item>
              <el-dropdown-item command="logout">{{$t('logOut')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li> -->
        <li><span class="btn btn-text">{{$t('help')}}</span></li>
        <li @mouseenter="openlangs()" @mouseleave='closelang()' :class="{active:openlang}">
          <el-select v-model="lang" ref="click_out_dom" class="select-btn" @change="changeLang">
            <el-option label="English" value="en_US"></el-option>
            <el-option label="中文" value="zh_CN"></el-option>
            <!-- <el-option label="မည်သည့်နေရာ" value="my"></el-option> -->
          </el-select>
        </li>
      </menu>
    </header>
    <div class="server" @click="goserve">
      <img src="./assets/images/333.png" >
    </div>
    <section class="main">
      <swiper ref="mySwiper" :options="swiperOption" data-hash="head">
        <swiper-slide class="swiper-slide">
          <div class="banner">
            <div class="baner-disc">
              <h1>{{ $t("L10000") }}</h1>
              <h3>{{ $t("L10001") }}</h3>
              <p v-show="!downloadIndex">
                {{ $t("L10002") }}
              </p>
              <div class="btn banner-go" @click="login" v-show="!downloadIndex">
                {{$t('web')}} <i class="el-icon-arrow-right"></i>
              </div>
              <div class="download-code" v-show="downloadIndex" @click.stop="">
                <h4 v-show="downloadIndex === 1">
                  {{$t('andqrcode')}}
                </h4>
                <h4 v-show="downloadIndex === 2">IOS scan QR code download</h4>
                <ul>
                  <li v-show="downloadIndex === 1">
                    <canvas id="google"></canvas>
                    <p> {{$t('google')}} </p>
                  </li>
                  <li v-show="downloadIndex === 1&&AndroidList.length>0">
                    <div v-for="(item, index) in AndroidList" :key="index">
                      <canvas :id="item.id"></canvas>
                    </div>
                    <p>{{$t('beta')}} </p>
                  </li>
                  <li v-show="downloadIndex === 2">
                    <canvas id="apple"></canvas>
                    <p>{{$t('app')}}</p>
                  </li>
                  <li v-show="downloadIndex === 2&&showIOS">
                    <canvas id="base"></canvas>
                    <p>{{$t('beta')}}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="banner-img">
              <img :src="require(`./assets/images/${bannerimg[bannerIndex]}.png`)" class="icon" :style="{
                  'margin-left': !bannerIndex ? '' : '',
                  'margin-top': !bannerIndex ? '10%' : '15%',
                }" />
            </div>
            <div class="inst-disc">{{ $t("L10003") }}</div>

            <el-row type="flex" class="banner-download-list">
              <el-col :span="6" class="text-center">
                <div class="btn btn-icon btn-c-android" @click="downloadHandler(1)" v-clickoutside="downloadCodeHide">
                  <img src="./assets/images/icon-andiron.png" class="icon" />
                  <div class="animate-wrap down-animate">
                    <div class="animate-inner">
                      <span class="circle circle-one"></span>
                      <span class="circle circle-two"></span>
                      <span class="animate__animated animate__bounce arrow">
                        <i class="el-icon-bottom"></i>
                      </span>
                      <span class="line"></span>
                    </div>
                  </div>
                  <p class="name-download" v-html="$t('Android')"></p>
                  <!-- <p class="for">for Android</p> -->
                </div>
              </el-col>
              <el-col :span="6" class="text-center">
                <div class="btn btn-icon btn-c-ios" @click="downloadHandler(2)" v-clickoutside="downloadCodeHide">
                  <img src="./assets/images/icon-ios.png" class="icon" />
                  <div class="animate-wrap down-animate">
                    <div class="animate-inner">
                      <span class="circle circle-one"></span>
                      <span class="circle circle-two"></span>
                      <span class="animate__animated animate__bounce arrow">
                        <i class="el-icon-bottom"></i>
                      </span>
                      <span class="line"></span>
                    </div>
                  </div>
                  <p class="name-download" v-html="$t('ios')"></p>
                  <!-- <p class="for">for IOS</p> -->
                </div>
              </el-col>
              <el-col :span="6" class="text-center">
                <div class="btn btn-icon" @click="downloadHandler(3)">
                  <a :href="data.filePath || 'javascript:;'">
                    <img src="./assets/images/icon-windows.png" class="icon" />
                    <div class="animate-wrap down-animate">
                      <div class="animate-inner">
                        <span class="circle circle-one"></span>
                        <span class="circle circle-two"></span>
                        <span class="animate__animated animate__bounce arrow">
                          <i class="el-icon-bottom"></i>
                        </span>
                        <span class="line"></span>
                      </div>
                    </div>
                    <p class="name-download" v-html="$t('window')"></p>
                    <!-- <p class="for">for Windows</p> -->
                  </a>
                </div>
              </el-col>
              <el-col :span="6" class="text-center">
                <div class="btn btn-icon" @click="downloadHandler(4)">
                  <a :href="macData.filePath || 'javascript:;'">
                    <img src="./assets/images/icon-mac.png" class="icon" />
                    <div class="animate-wrap down-animate">
                      <div class="animate-inner">
                        <span class="circle circle-one"></span>
                        <span class="circle circle-two"></span>
                        <span class="animate__animated animate__bounce arrow">
                          <i class="el-icon-bottom"></i>
                        </span>
                        <span class="line"></span>
                      </div>
                    </div>
                    <p class="name-download" v-html="$t('mac')"></p>
                    <!-- <p class="for">for Mac</p> -->
                  </a>
                </div>
              </el-col>
            </el-row>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="main-section right">
            <img src="./assets/images/img1.png" class="preview-img" style="margin-top: 15%" />
            <div class="section-disc" style="margin-top: 7%">
              <h3>{{ $t("L10004") }}</h3>
              <p>{{ $t("L10005") }}</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="main-section left">
            <img src="./assets/images/img2.png" class="preview-img" style="margin-top: 17%" />
            <div class="section-disc" style="margin-top: 9%">
              <h3>{{ $t("L10006") }}</h3>
              <p>{{ $t("L10007") }}</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="main-section right">
            <img src="./assets/images/img3.png" class="preview-img" style="margin-top: 15%" />
            <div class="section-disc" style="margin-top: 5%">
              <h3>{{ $t("L10008") }}</h3>
              <p>{{ $t("L10009") }}</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="main-section left">
            <img src="./assets/images/img4.png" class="preview-img"
              style="margin-top: 17%; position: relative; right: -30px" />
            <div class="section-disc" style="margin-top: 33%">
              <h3>{{ $t("L10010") }}</h3>
              <p>{{ $t("L10011") }}</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <div class="main-section right">
            <img src="./assets/images/img5.png" class="preview-img" style="margin-top: 17%; margin-left: -20px" />
            <div class="section-disc" style="margin-top: 7%">
              <h3>{{ $t("L10012") }}</h3>
              <p>{{ $t("L10013") }}</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <footer class="footer">
            <div class="footer-row">
              <el-row :gutter="120">
                <el-col :span="8">
                  <div class="footer-top-title">COMPANY</div>
                  <nav class="footer-nav">
                    <a href="#">About</a>
                    <!-- <a href="https://www.santapp.com/visitor/#/728324/https%3A%2F%2Fwww.echatapp.com/0/0/1400257192/75febc070478bf200dd559668e403124/EchatApp" target="_blank">Services</a> -->
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
                  <a href="#" class="btn btn-icon"><img src="./assets/images/footer-img1.png" /></a>
                  <a href="#" class="btn btn-icon"><img src="./assets/images/footer-img2.png" /></a>
                  <a href="#" class="btn btn-icon"><img src="./assets/images/footer-img3.png" /></a>
                  <a href="#" class="btn btn-icon"><img src="./assets/images/footer-img4.png" /></a>
                  <a href="#" class="btn btn-icon"><img src="./assets/images/footer-img5.png" /></a>
                </el-col>
              </el-row>
            </div>
          </footer>
        </swiper-slide>
      </swiper>
    </section>
  </div>
</template>

<script>
  // import _ from "lodash";
  import Clickoutside from "element-ui/src/utils/clickoutside";
  import {
    Swiper,
    SwiperSlide
  } from "vue-awesome-swiper"; //局部引入
  import "swiper/dist/css/swiper.css";
  import QRCode from "qrcode";
  import api from './api'
  import {
    Util
  } from './until/utils';
  export default {
    name: "App",
    data() {
      return {
        lang: "en_US",
        bannerimg: [
          "banner-img-init",
          "banner-img1",
          "banner-img2",
          "banner-img3",
          "banner-img4",
        ],
        arrowShow: false,
        bannerIndex: 0,
        downloadIndex: 0,
        offsetTop: 0,
        isFixed: false,
        opacity: 1,
        nowScrollVal: 0,
        swiperOption: {
          notNextTick: true,
          direction: "vertical",
          mousewheel: true,
          mousewheelControl: true,
          autoHeight: true,
          height: window.innerHeight,
          keyboard: true,
          replaceState: true,
          //observeParents: true,
          on: {
            //监听滑动切换事件，返回swiper对象
            slideChange: () => {
              let swiper = this.$refs.mySwiper.$swiper;
              if (swiper.activeIndex) {
                this.isFixed = true;
              } else {
                this.isFixed = false;
              }
            },
          },
        },
        AndroidList: [],
        IOSList: [{
          filePath: 'https://testflight.apple.com/join/evPvwAWm',
          id: "base"
        }],
        showIOS:false,
        data: {},
        macData: {},
        base: base,
        openlang: false
      };
    },
    directives: {
      Clickoutside,
    },
    components: {
      Swiper,
      SwiperSlide,
      QRCode,
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper;
      },
      loginInfo() {
        return this.$store.state.loginInfo;
      },
    },
    created() {
      const lang = localStorage.getItem("locale") || "en_US";
      if (lang) {
        this.lang = lang;
        this.$i18n.locale = lang;
      }
      // api.getstyle({}).then(
      //   res => {
      //     let reg = /\"(.+?)\"/g
      //     let url = res.match(reg)[0]
      //     url = url.replace(/"/g, '');
      //     var scriptElement = document.createElement('script');
      //     document.body.appendChild(scriptElement);
      //     scriptElement.src = url
      //   }
      // )
    },
    mounted() {
      Util.checkCookie('eUcShEaRt').then(
        res => {
          this.setLoginInfo(res);
        },
        () => {
          let info = sessionStorage.getItem("eUcShEaRt");
          if (info) {
            this.setLoginInfo(info);
          } else {
            this.$store.commit('setLoginInfo', null)
            Util.removeStore('token')
          }
        }
      )
      this.createQrCode()
      window.addEventListener("click", (e) => {
        const arr = e.path.filter(
          (o) =>
          o.className &&
          (o.className.indexOf("btn-c-ios") > -1 ||
            o.className.indexOf("btn-c-android") > -1 ||
            o.className.indexOf("el-select") > -1)
        );
        if (!arr.length) {
          this.downloadCodeHide();
          this.$refs["click_out_dom"].blur();
        }
      });
      window.onresize = () => {
        return (() => {
          let winHeight = 0;
          if (window.innerHeight) {
            winHeight = window.innerHeight;
          } else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
          //通过深入Document内部对body进行检测，获取浏览器窗口高度
          if (document.documentElement && document.documentElement.clientHeight) {
            winHeight = document.documentElement.clientHeight;
          }
          this.swiperOption.height = winHeight
          // this.$refs.mySwiper.initSwiper()
          setTimeout(() => {
            this.$refs.mySwiper.initSwiper()
          }, 10);
        })();
      };
    },
    beforeDestroy() {
      //hack
      window.removeEventListener("click");
    },
    methods: {
      setLoginInfo(data) {
        api.setLoginInfo({});
        let info = JSON.parse(Util.decryptByDES(data, 'echat000'));
        this.$store.commit('setToken', info.token);
        Util.clearCookie("eUcShEaRt");
        sessionStorage.setItem("eUcShEaRt", data);
      },
      handleCommand(command) {
        if (command == 'logout') {
          this.loginOut()
        }
      },
      loginOut() {
        api.logout({}).then(
          data => {
            Util.clearCookie("eUcShEaRt");
            Util.removeStore('securityInfo');
            window.sessionStorage.removeItem("eUcShEaRt");
          }, () => {}
        )
      },
      login() {
        window.open(base.loginUrl + "scan-login");
      },
      goserve(){
        window.open('https://www.santapp.com/visitor/#/28867/https%3A%2F%2Fwww.echatapp.com/0/0/-70472034/c80abee89f0b66cb8b426d9d6696569c/Contact us');
      },
      useqrcode(path, id) {
        let canvas = document.getElementById(id);
        canvas.width = 180;
        canvas.height = 180;
        QRCode.toCanvas(canvas, path, (error) => {
          if (error) console.error(error);
        });
      },
      createQrCode() {
        api.loadUrl({
          channelCode: 'windows'
        }).then(
          data => {
            for (let i = 0; i < data.length; i++) {
              if (data[i].os == "windows") {
                this.data = data[i];
              }
              if (data[i].os == "mac") {
                this.macData = data[i];
              }
            }
          }, () => {}
        )
        //获取安卓IOS下载
        api.getUrl({}).then(
          data => {
            for (let i = 0; i < data.length; i++) {
              let item = data[i];
              item.id = "qrcodeId_" + (i + 1);
              if (item.os == "ios-ipa") {
                //显示苹果商店
                if (item.channelCode == "appstore_ios") {
                  setTimeout(() => { 
                    this.useqrcode(item.filePath, "apple");
                  }, 100)
                }else{
                  this.showIOS = true;
                  this.qrcodeInit(this.IOSList);
                }
              }
              if (item.os == "android") {
                //显示谷歌商店
                if (item.channelCode == "google_pay") {
                  setTimeout(() => {
                    this.useqrcode(item.filePath, "google");
                  }, 100)
                } else {
                  this.AndroidList.push(item)
                }
              }
            }
            setTimeout(() => {
              this.qrcodeInit(this.AndroidList);
            }, 100)
          }, () => {}
        )

      },
      qrcodeInit(list) {
        if (list && list.length) {
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            this.useqrcode(item.filePath, item.id);
          }
        }
      },

      downloadCodeHide() {
        this.downloadIndex = 0;
        this.bannerIndex = 0;
      },
      bannerHandler(index) {
        this.bannerIndex = index || 0;
      },
      downloadHandler(index) {
        switch (index) {
          case 1:
            //下载安卓版
            this.downloadIndex = index;
            break;
          case 2:
            //下载IOS版
            this.downloadIndex = index;
            break;
          case 3:
            //下载Windows版
            this.downloadIndex = 0;
            break;
          case 4:
            //下载Mac版
            this.downloadIndex = 0;
            break;
          default:
            this.downloadIndex = 0;
        }
        this.bannerIndex = index || 0;
      },
      gotoHead() {
        let swiper = this.$refs.mySwiper.$swiper;
        swiper.activeIndex = 0
        this.isFixed = false
        setTimeout(() => {
          this.$refs.mySwiper.initSwiper()
        }, 10);
      },
      changeLang(val) {
        // 保存语言配置到localStorage
        localStorage.setItem("locale", val);
        // 修改显示语言
        this.$i18n.locale = val;
      },
      openlangs(){
        this.openlang = true
        // console.log(111111);
      },
      closelang(){
        this.openlang = false
      }
    },
  };

</script>

<style lang="scss">
  body {
    overflow: hidden;
  }

  canvas {
    height: 144px !important;
    width: 144px !important;
  }

  .head {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    height: 76px;
    line-height: 42px;
    padding: 18px 180px 0 180px;
    color: #fff;
    transition: all 0.5s;

    &.head-fixed {
      position: fixed;
      background-color: #29a99d;
    }

    .company-logo {
      overflow: hidden;
      margin-top: -5px;

      .logo {
        display: inline-block;
        height: 52px;
        width: 52px;
        background: url("./assets/images/logo.png") no-repeat;
      }

      .website-name {
        display: inline-block;
        margin-left: 28px;
        font-size: 20px;
        line-height: 52px;
        font-weight: bold;
      }
    }

    .nav {
      margin-left: 110px;

      .btn {
        font-size: 14px;
      }
    }

    .head-right {
      margin: 0;
      padding: 0;

      li {
        list-style: none;
        float: left;
        margin: 0 15px;

        &:last-child {
          margin-right: 0;
        }
        &.active{   
          .el-select .el-input .el-select__caret {
            &.el-icon-arrow-up:before {
              color: #40B1A7 ;
            }
          }
        }
        .el-input__inner {
          height: 42px;
          line-height: 42px;
          border-radius: 24px;
          color: #fff;
          text-align: center;
          border: none;
          width: 150px;
          background: #61D6AD;
          color: #FFF;

          &:hover {
            background: #FFFFFF;
            color: #40B1A7;
            opacity: 1;

            & .el-select .el-input .el-select__caret {
              color: #40B1A7;
            }
          }

          &:active {
            opacity: 0.77;
          }
        }

        .el-select .el-input .el-select__caret {
          color: #fff;
          position: relative;
          top: -3px;
          left: -3px;

          &.el-icon-arrow-up:before {
            content: "\E78f";
          }
        }
      }
    }

    .el-popper {
      margin-top: 0 !important;
    }

    .el-dropdown {
      font-size: 16px;
      color: #fff;
    }

    .avatar {
      display: inline-block;
      height: 42px;
      line-height: 42px;
      width: 42px;
      border-radius: 21px;
      border: 1px solid #fff;
      overflow: hidden;
      vertical-align: bottom;
      margin-right: 10px;

      img {
        width: 100%;
      }
    }
  }
.server{
  width: 95px;
  height: 95px;
  background: #4BC6AD;
  border: 4px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0px 2px 2px 0px rgba(16, 113, 93, 0.38);
  border-radius: 48px;
  position: absolute;
  z-index: 9999;
  right: 25px;
  top: 82%;
  cursor: pointer;
  img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    animation: mylogo .6s linear 0s infinite alternate;
  }
}
@keyframes mylogo
{
from  {top: 48%;}
to  {top: 52%;}
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

  .el-select-dropdown__item.selected {
    color: #46b4aa;
  }

  .el-select-dropdown__item {
    color: #000;
    text-align: center;
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
      background: #61D6AD;
      border-radius: 21px;
      color: #FFF;

      &:hover {
        background: #FFFFFF;
        color: #40B1A7;
        opacity: 1
      }

      &:active {
        opacity: 0.77;
      }
    }

    &:hover {
      opacity: 0.75;
      // border-color: #01ff8a;
      // color: #01ff8a;
    }
  }

  // .select-btn{

  // }
  .banner {
    position: relative;
    overflow: hidden;
    height: 100vh;
    max-width: 1920px;
    margin: 0 auto;
    padding: 10% 280px 0 280px;
    background-image: url("./assets/images/bannerbg.png"),
      linear-gradient(top, #83edad, #0091ae);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
    color: #fff;

    .baner-disc {
      width: 500px;
      height: 421px;

      >h1 {
        font-size: 54px;
        line-height: 64px;
        margin-top: 0;
      }

      >h3 {
        font-size: 20px;
        margin: 20px 0;
      }

      >p {
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
      right: 20px;

      >img {
        margin-top: 160px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .banner-go {
      margin-top: 40px;
      background: linear-gradient(74deg, #83EDAD, #4FCFAE);
      border: 0;
      transition: all .3s;

      &:hover {
        background: linear-gradient(74deg, #83EDAD, #4FCFAE);
        box-shadow: 0px 6px 18px 0px rgba(0, 0, 0, 0.3);
        margin-top: 37px;
      }

      &:active {
        opacity: 0.77;
      }

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

  .download-code {
    background: rgba(255, 255, 255, 0.5);
    width: 464px;
    border-radius: 12px;
    padding: 1% 20px;
    position: absolute;
    top: 34%;
    color: #000;
    text-align: center;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);

    >h4 {
      margin: 15px 0 30px 0;
    }

    ul {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-around;

      li {
        list-style: none;
        float: left;
        // width: 50%;
        white-space: nowrap;
      }
    }
  }

  .main {
    height: 100%;
    width: 100%;
  }

  .main-section {
    width: 1360px;
    height: 100vh;
    margin: 0 auto;
    overflow: hidden;

    .section-disc {
      width: 500px;
      text-align: left;

      h3 {
        font-size: 36px;
        font-weight: normal;
        margin-top: 300px;
        color: #303c4b;
      }

      p {
        color: #90a1ad;
        line-height: 34px;
        margin-right: 80px;
      }
    }

    &.right {
      .section-disc {
        float: right;
      }
    }

    &.left {
      .preview-img {
        float: right;
      }
    }
  }

  .footer {
    background-color: #f2f2f2;
    padding: 15% 0 90px 0;
    height: 100vh;

    .footer-row {
      width: 1120px;
      margin: 0 auto;

      .footer-nav {
        a {
          display: block;
          font-size: 20px;
          text-decoration: underline;
          line-height: 50px;
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
        height: 52px;
        width: 52px;
        border-radius: 26px;
        padding: 0;
        border: none;
        margin-right: 28px;
        margin-bottom: 40px;
      }

      .footer-top-title {
        margin-bottom: 35px;
      }
    }

    .footer-top-title {
      font-size: 24px;
      color: #303c4b;
      margin-bottom: 20px;
    }
  }

  .down-animate {
    height: 64px;
    width: 64px;

    .animate-inner {
      position: relative;
      height: 64px;
      width: 100%;

      .circle {
        position: absolute;
        top: 20%;
        left: 19%;
        transform: translate(-50%, -50%);
        display: inline-block;
        height: 40px;
        width: 40px;
        border-radius: 100%;
        border: 1px solid #00ff8b;
        opacity: 0;
        transform-origin: center center;
        animation: circle-animate 3s infinite;

        &.circle-one {
          animation-delay: 0.1s;
        }

        &.circle-two {
          animation-delay: 1.5s;
        }
      }

      .arrow {
        color: #00ff8b;
        font-size: 18px;
        display: inline-block;
        position: absolute;
        width: 30px;
        text-align: center;
        top: 50%;
        left: 50%;
        margin-left: -15px;
        height: 30px;
        line-height: 30px;
        margin-top: -16px;
        animation: arrow-animate 1.5s infinite;
      }

      .line {
        position: absolute;
        bottom: 20px;
        left: 50%;
        margin-left: -8px;
        width: 16px;
        height: 2px;
        background-color: #00ff8b;
      }
    }
  }

  .swiper-slide {
    overflow: hidden;
  }

  @keyframes circle-animate {
    0% {
      opacity: 0.5;
      transform: scale(1);
    }

    99% {
      opacity: 0;
      transform: scale(1.8);
    }

    100% {
      opacity: 0;
      transform: scale(1);
    }
  }

  @keyframes arrow-animate {
    0% {
      transform: translateY(-3px);
    }

    50% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-3px);
    }
  }

  @media screen and (max-width: 1500px) {
    .banner .banner-download-list .btn {
      width: 205px;
    }

    .download-code {
      top: 37%;
    }

    .banner .banner-img {
      text-align: center;
      transform: scale(0.8);
      right: -160px;
    }
  }

</style>
