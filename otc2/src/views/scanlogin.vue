<template>
  <div class="on-center">
    <div class="right">
      <div class="language"  @click="showLang=!showLang">{{lang=='en_US'?'English':'简体中文'}}
        <i class="arrow"></i>
        <ul class='nav-drop' v-if="showLang">
          <li v-for="(item,index) in languageList.list" :key="index" @click="setLocale(item.lang)">{{item.name}}</li>
        </ul>
      </div>
		</div> 
    <div class="wraper" v-show="showContent=='code'">
      <div class="tip" v-if="tip">{{$t('msg.login.Failed')}}</div>
      <div class="codeBox" :class="{acitve: hideCode}" id="qrcode">
        <canvas id="qrcodeCanvas"></canvas>
        <div class="wraps"></div>
      </div>
      <div class="explain" v-show="!hideCode">{{$t("msg.login.scanner")}}</div>
      <div class="explain" v-show="hideCode">{{$t("msg.login.expired")}} <a href="javascript:;"
          @click="refresh">{{$t("msg.login.refresh")}}</a></div>
      <div class="goLogin" @click="showContent='sms'">
        {{$t("msg.login.should")}}
      </div>
    </div>
    <div class="wraper" v-show="showContent=='user'">
      <div class="title">{{$t("msg.login.Login")}}</div>
      <div class="userInfo">
        <img :src="user.avatar" v-headError v-if="user.avatar" />
        <img src="../assets/images/error-head.png" v-if="!user.avatar">
        <p class="font18">{{$t("msg.login.phone")}}</p>
        <p class="backCode" @click="switching">{{$t("msg.login.Return")}}</p>
      </div>
    </div>
    <div class="wraper" v-show="showContent=='loading'">
      <div class="title">{{$t("msg.login.Login")}}</div>
      <div class="userInfo">
        <img :src="user.avatar" />
        <div class="font18">loading...</div>
      </div>
      <div class="footer">
        <button type="button" @click="showContent='code';" class="logout">{{$t("msg.login.Logout")}}</button>
      </div>
    </div>
    <div class="wraper" v-show="showContent=='login'">
      <div class="title">{{$t("msg.login.Login")}}</div>
      <div class="userInfo">
        <img :src="preInfo.avatar" />
        <p class="font18">{{preInfo.nickName}}</p>
      </div>
      <div class="footer">
        <button type="button" @click="loginAgain">{{$t("msg.login.Logins")}}</button>
        <button class="switch-btn" type="button" @click="switching">{{$t("msg.login.Switch")}}</button>
      </div>
    </div>
    <div class="wraper" v-show="showContent=='sms'">
      <div class="number">{{$t("msg.login.number")}}</div>
      <p class="text">{{$t("msg.login.use")}}</p>
      <div class="select" @click="showSelect=!showSelect">{{countryname}}<span class="icon"
          :class="{active:showSelect}"></span></div>
      <div class="select-box" v-show="showSelect">
        <CountryCode ref="countrycode" @precise="precise" @countrycodeHandler="countrycodeHandler"></CountryCode>
      </div>
      <div class="item-input">
        +<input class="countrycode" v-model="phoneCode"  type="text" onkeyup="value=value.replace(/[^\d]/g,'')">
        <input type="text" :placeholder="$t('msg.login.please')" v-model="userName"
          onkeyup="value=value.replace(/[^\d]/g,'')" class="tel">
      </div>
      <div class="code">
        <input class="code-input" onkeyup="value=value.replace(/[^\d]/g,'')" :placeholder="$t('msg.login.code')"
          v-model="code" @mousewheel.prevent>
        <div style="height:12px; align-self:center;border-right: 1px solid #E1E6EC;"></div>
        <div class="gain" v-if="!wait" @click="getPhone">{{$t('msg.login.gain')}}</div>
        <div v-else class="text2">{{time}}s</div>
      </div>
      <div class="footer">
        <button type="button" @click="smslogin">{{$t("msg.login.Logins")}}</button>
      </div>
      <div class="goqr" @click="showContent='code'">
        {{$t("msg.login.useqr")}}
      </div>
    </div>
    <CodeComponent ref="code" @codeConfirm="codeLoginHandler"></CodeComponent>
    <toast></toast>
  </div>
</template>

<script>
import { browser } from '@/tools/browser.js';
import { Util } from '@/tools/utils';
import QRCode from 'qrcode'
import { Config } from "@/common/config"
import { Crypto } from "@/tools/crypto";
import CountryCode from '../components/UserCenter/CountryCode'
import { validate } from '@/tools/validate';
import Toast from "@/components/popup/Toast"
import CodeComponent from '@/components/common/CodeComponent'
  export default {
    name: "scanlogin",
    data() {
      return {
        screenWidth: document.body.clientWidth,
        hideCode: false,
        showContent: 'code',
        user: {},
        uId: '',
        serviceName: '',
        preInfo: {},
        timer: null,
        showSelect: false,
        countryname: this.$t('msg.login.select'),
        phoneCode: '',
        userName: '',
        code: '',
        wait: false,
        time: '',
        timer: null,
        lang:null,
        languageList: {
            list: [
              { lang: "en_US", name: "English" },
              { lang: "zh_CN", name: "简体中文" }
            ]
        },
        showLang:false,
        tip:false,
        countrycode:''
      }
    },
    components: {
      QRCode,
      CountryCode,
      Toast,
      CodeComponent
    },
    watch:{
      phoneCode(news,old){
        this.$refs.countrycode.precise(news)
      }
    },
    methods: {
      setLocale(val) {
      if (this.lang == val) return;
      this.locale = val;
      this.$i18n.locale = val
      localStorage.lang = val
      location.reload()
    },
      //生成二维码
      useqrcode(path) {
        var canvas = document.getElementById('qrcodeCanvas');
        QRCode.toCanvas(canvas, path, error => {
          if (error) console.error(error)
        })
      },
      refresh() {
        location.reload();
      },
      doQrcodeLogin(opt) {
        this.$http.qrcodeLogin(opt).then(
          data => {
            localStorage.setItem('preInfo',
              `{"userId":"${data.userId}","nickName":"${data.nickName}","avatar":"${Config.fileDownUrl+'compress/' + data.avatar}"}`
              );
            let userObj = {
              userId: data.userId,
              token: data.token
            }
            let userStr = Crypto.encryptByDES(JSON.stringify(userObj), 'echat000');
            Util.setCookie("eUcShEaRt", userStr, data.expireTime);
            sessionStorage.setItem("eUcShEaRt", userStr);
            //通知父级页面刷新
            // if (window.opener) window.opener.location.reload();
            this.$router.push({
              name: 'index'
            });
          }, () => {}
        )
      },
      loginAgain() {
        var obj = {
          imSessionId: this.uId,
          imServiceId: this.serviceName,
          userId: JSON.parse(localStorage.getItem('preInfo')).userId
        }
        this.$http.loginAgain(obj).then(
          () => {
            this.showContent = 'user';
            this.user = this.preInfo;
            this.getLoginState({
              uid: this.uId,
              type: 2
            });
          }
        )
      },
      codeInit() {
        var url = window.origin + `/bcircleweb/qrindex/index_moble.html?XF${this.uId}&${this.serviceName}&Web`;
        this.useqrcode(url);
        this.getLoginState({
          uid: this.uId
        });
        this.tmid = setTimeout(() => {
          this.hideCode = true;
        }, 60 * 1000);
      },
      getLoginState(obj) {
        this.$http.getloginState(obj).then(
          data => {
            this.loginStateHandler(JSON.parse(data.list[0]))
          },
          () => {
            if (!this.hideCode) {
              this.getLoginState({
                uid: this.uId
              });
            }
          }
        )
      },
      loginStateHandler(info) {
        if(info){
          if(info.type==0){
            this.user = {
              nickName: info.nickName,
              avatar: require('../assets/images/img-username.png')
            }
            if (info.avatar) this.user.avatar = Config.fileDownUrl + 'compress/' + info.avatar;
            clearTimeout(this.tmid);
            this.showContent = 'user';
            this.getLoginState({
              uid: this.uId,
              type: info.type
            });
          }else if(info.type==1){
            this.showContent = 'loading';
            let deviceId = this.getDeviceId();
            var postData = {
              token: info.token,
              deviceType: '2',
              deviceName: browser.deviceName,
              deviceId: deviceId,
              os: browser.OS,
              version: Config.version,
            };
            this.doQrcodeLogin(postData)
          }else{
            location.reload();
          }
        }
        // if (this.showContent == 'code') { // 扫码成功
        //   this.user = {
        //     nickName: info.nickName,
        //     avatar: require('../assets/images/img-username.png')
        //   }
        //   if (info.avatar) this.user.avatar = Config.fileDownUrl + 'compress/' + info.avatar;
        //   clearTimeout(this.tmid);
        //   this.showContent = 'user';
        //   this.getLoginState({
        //     uid: this.uId,
        //     type: info.type
        //   });
        // } else if (this.showContent == 'user') { // 确认登录
        //   //0-登录提示--pc/web  * 1-确认登录  * 2-登录提示--app  * -1-取消登录
        //   if (info.type == 1) {
        //     this.showContent = 'loading';
        //     let deviceId = this.getDeviceId();
        //     var postData = {
        //       token: info.token,
        //       deviceType: '2',
        //       deviceName: browser.deviceName,
        //       deviceId: deviceId,
        //       os: browser.OS,
        //       version: Config.version,
        //     };
        //     this.doQrcodeLogin(postData)
        //   } else {
        //     location.reload();
        //   }
        // }
      },
      switching() {
        this.showContent = 'code'
        localStorage.removeItem('preInfo')
        clearTimeout(this.timer);
        this.hideCode = false;
        this.init();
        this.timer = setTimeout(() => {
          this.hideCode = true;
        }, 60000);
      },
      init() {
        this.$http.getQrcodeUrl({}).then(
          data => {
            this.uId = data.uId;
            this.serviceName = data.serviceName;
            if (localStorage.getItem('preInfo')) {
              this.showContent = 'login'
              this.preInfo = JSON.parse(localStorage.getItem('preInfo'))
            } else {
              this.codeInit();
            }
          },() => {
            this.tip = true
          }
        )
      },
      getDeviceId() {
        let deviceId = localStorage.getItem('deviceId');
        if (!deviceId) {
          let ua = window.navigator.userAgent.toLowerCase().slice(0, 60);
          deviceId = Crypto.md5(ua);
          localStorage.setItem('deviceId', deviceId);
        }
        return deviceId;
      },
      precise(data){
        if(data.COUNTRY_NAME_EN){
          let lang = localStorage.getItem("lang") || "en_US"
          if (lang == 'en_US') {
            this.countryname = data.COUNTRY_NAME_EN
            this.countrycode = data.COUNTRY_CODE
          } else {
            this.countryname = data.COUNTRY_NAME
            this.countrycode = data.COUNTRY_CODE
          }
        }else{
          this.countryname = data
        }
        
      },
      countrycodeHandler(data) {
        this.showSelect = !this.showSelect;
        let lang = localStorage.getItem("lang") || "en_US"
        if (lang == 'en_US') {
          this.countryname = data.COUNTRY_NAME_EN
        } else {
          this.countryname = data.COUNTRY_NAME
        }
        this.phoneCode =  data.PHONE_CODE
        this.countrycode = data.COUNTRY_CODE
      },
      codeLoginHandler() {
        let opt = {
          mobileNo: this.phoneCode + this.userName,
          indx: '10004',
          selectionCodeKey: this.$store.state.selectionCodeKey,
        }
        this.$http.getSmsCodeNo(opt).then(
          res => {
            if (res.code == 0) {
              let second = 60
              this.timer = setInterval(() => {
                second--
                if (second > 0) {
                  this.wait = true
                  this.time = second
                } else {
                  clearInterval(this.timer)
                  this.wait = false
                }
              }, 1000)
            } else {
              return
            }
          },
          () => {}
        )
      },
      getPhone() {
        if (this.phoneCode == '') {
          this.$store.commit('SET_TOAST_TEXT', this.$t("msg.login.inputtext"));
          return
        }
        if (this.userName == '') {
          this.$store.commit('SET_TOAST_TEXT', this.$t("msg.login.please"));
          return
        }
        if (this.phoneCode == '+86') {
          if (!validate.isChinessPhone(this.userName)) {
            this.$store.commit('SET_TOAST_TEXT', this.$t("msg.login.phoneError"));
            return
          }
        }
        if (!validate.isPhone(this.userName)) {
          this.$store.commit('SET_TOAST_TEXT', this.$t("msg.login.phoneError"));
          return
        }
        this.$refs.code.showcode()
      },
      smslogin() {
        if (this.phoneCode == '') {
          this.$store.commit('SET_TOAST_TEXT', this.$t("msg.login.inputtext"));
          return
        }
        if (this.userName == '') {
          this.$store.commit('SET_TOAST_TEXT', this.$t("msg.login.please"));
          return
        }
        if (this.phoneCode == '+86') {
          if (!validate.isChinessPhone(this.userName)) {
            this.$store.commit('SET_TOAST_TEXT', this.$t("msg.login.phoneError"));
            return
          }
        }
        if (!validate.isPhone(this.userName)) {
          this.$store.commit('SET_TOAST_TEXT', this.$t("msg.login.phoneError"));
          return
        }
        if(this.code == ''){
          this.$store.commit('SET_TOAST_TEXT', this.$t("msg.login.code"));
          return
        }
      let deviceId = this.getDeviceId();
      let postData = {
        countryCode: this.countrycode,
        userName:this.phoneCode + this.userName,
        selectionCodeKey: this.$store.state.selectionCodeKey,
        // googleCode:code,
        deviceType: '2',
        deviceId: deviceId,
        deviceName: browser.deviceName,
        os: browser.OS,
        version: Config.version,
        loginType:"1",
        verifyCode:this.code
      }
        this.doLogin(postData)
      },
      doLogin(opt) {
      this.$http.smslogin(opt).then(
        data => {
        
            let userObj = {
              userId: data.userId,
              token: data.token
            }
            let userStr = Crypto.encryptByDES(JSON.stringify(userObj), 'echat000');
            Util.setCookie("eUcShEaRt", userStr, data.expireTime);
            sessionStorage.setItem("eUcShEaRt", userStr);
          if(data.avatar&&data.nickName){
            this.$router.push({
              name: 'index'
            });
          }else{
            this.$router.push({
              name: 'complete'
            });
          }

        }, () => {
        }
      )
    },
    },
    mounted() {
      this.lang = localStorage.getItem("lang") || "en_US"
      this.init()
    }
  }

</script>
<style lang="scss" scoped>
 @import "../assets/css/var";
  .on-center {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;

    .wraper {
      width: 384px;
      height: 594px;
      font-size: 16px;
      box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
      opacity: 0.92;
      border-radius: 8px;
      background: #fff;
      margin: auto;
      overflow: hidden;
      position: relative;

      .tip{
        position:absolute;
        width: 344px;
        color: #E84741;
        background: rgba($color: #E84741, $alpha: 0.1)  ;
        border-radius: 4px;
        text-align: center;
        top: 74px;
        left: 20px;
        padding: 6px 10px;
        font-size: 12px;
      }
      .number {
        color: #122030;
        font-size: 18px;
        margin: 70px 2px 0 20px;
      }

      .text {
        color: #5F717F;
        font-size: 14px;
        margin: 13px 20px 0 20px;
      }

      .select {
        height: 40px;
        width: 304px;
        margin: 55px 40px 0 40px;
        border-bottom: 1px solid #E1E6EC;
        line-height: 40px;
        cursor: pointer;
        color: #5F717F;
        position: relative;

        .icon {
          position: absolute;
          display: inline-block;
          width: 24px;
          height: 24px;
          background: url(../assets/images/icon/sss.png);
          right: 0;
          top: 10px;

          &.active {
            background: url(../assets/images/icon/sss180.png);
          }
        }
      }

      .item-input {
        height: 40px;
        width: 304px;
        margin: 24px 40px 0 40px;
        border-bottom: 2px solid #45B4AA;

        .countrycode {
          display: inline-block;
          width: 56px;
          border-right: 1px solid #E1E6EC;
          height: 16px;
          margin-top: 10px;
          line-height: 16px;
          color: #122030;
        }

        .tel {
          padding-left: 20px;
        }
      }

      .code {
        height: 40px;
        width: 304px;
        display: flex;
        margin: 24px 40px 0 40px;
        border-bottom: 2px solid #45B4AA;
        justify-content: space-between;

        .code-input {
          width: 200px;
        }

        .gain {
          align-self: center;
          color: #45B4AA;
          font-size: 14px;
          cursor: pointer;
        }

        .text2 {
          align-self: center;
          color: #5F717F;
          padding: 0 22px;
        }
      }

      .select-box {
        margin-left: 20px;
      }

      .codeBox {
        position: relative;
        height: 226px;
        width: 226px;
        margin: 139px auto 0;
        canvas {
          display: block;
          height: 100% !important;
          width: 100% !important;
        }

        .wraps {
          position: absolute;
          top: 0;
          height: 100% !important;
          width: 100% !important;
          background: rgba($color: #fff, $alpha: 0.9);
          display: none;
        }

        &.acitve {
          i.acitve {
            display: none;
          }

          .wraps {
            display: block;
          }

          img {
            display: block;
            cursor: pointer;
          }
        }

        i {
          display: none;
          position: absolute;
          left: 50%;
          top: 50%;
          height: 50px;
          width: 50px;
          margin-top: -25px;
          margin-left: -25px;
          // background-image: url(../../../assets/images/logo/logo.png);
          // background-size: 100% 100%;

          &.acitve {
            display: block;
          }
        }

        img {
          display: none;
          height: 100%;
          width: 100%;
        }
      }
    }

    .explain {
      margin-top: 18px;
      text-align: center;
      color: #122030;

      a {
        color: #46B4AA;
      }
    }

    .goLogin {
      display: block;
      margin: 70px auto 50px;
      padding: 0 10px;
      text-align: center;
      color: #46B4AA;
      cursor: pointer;
    }

    .goqr {
      display: block;
      margin: 47px auto 50px;
      padding: 0 10px;
      text-align: center;
      color: #46B4AA;
      cursor: pointer;
    }

    .title {
      position: relative;
      font-size: 32px;
      padding: 18px 20px 0 20px;
      color: #3B3C41;
    }

    .userInfo {
      margin: 30px 15px;
      text-align: center;

      img {
        width: 130px;
        height: 130px;
        margin: 30px 0;
        border-radius: 50%;
      }

      .backCode {
        margin: 100px 0 50px;
        color: #46B4AA;
        cursor: pointer;
      }
    }

    .footer {
      button {
        display: block;
        width: 304px;
        height: 48px;
        border-radius: 5px;
        background: #45B4AA;
        font-size: 16px;
        color: #fff;
        margin: 68px auto 0;
      }

      .btn {
        width: 9.28rem;
      }

      .switch-btn {
        margin-top: 30px;
        background-color: #fff;
        color: #45B4AA;
        border: 1px solid #45B4AA;
      }

      .item-help {
        padding: 0 40px 30px 40px;
        line-height: 40px;
        text-align: right;

        &.my {
          font-size: 12px;
        }

        a {
          color: #0099FF;

          &.forget {
            float: left;
            color: #0099FF;
          }
        }
      }

      .logout {
        margin: 90px auto 50px;
        text-align: center
      }
    }
     .right{
      position: fixed;
      top: 0;
      right: 15%;
        .language {
          cursor: pointer;
          position: relative;
          display: inline-block;
          width: 174px;
          height: 40px;
          line-height: 40px;
          margin: 21px 16px;
          border: 1px solid #FFFFFF;
          border-radius: 20px;
          color: #fff;
          font-size: 16px;
          padding-left: 14px;
          text-align: center;
          background: url(../assets/images/lang.png)  no-repeat;
          background-position: 18px 8px;
          .arrow {
            position: absolute;
            right: 16px;
            top: 16px;
            display: inline-block;
            height: 7px;
            width: 10px;
            background-image: url(../assets/images/icon-down.png);
            background-size: 100% 100%;
          }
          .nav-drop {
            cursor: pointer;
            position: absolute;
            left: 50%;
            top: 50px;
            margin-left: -86px;
            width: 174px;
            line-height: 40px;
            background: #fff;
            color: #000;
            box-shadow: 0 5px 15px #e6e6e6;
            li{
              &:hover{
                color: #45B4AA;
              }
            }
          }
        .nav-drop::after{content: '';position: absolute;top:-10px;left: 50%;width:0;height:0;margin-left: -5px;border-left:5px solid transparent;border-right:5px solid         transparent;border-bottom:10px solid #fff;}
        }

    }
  }

</style>
