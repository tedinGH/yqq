import { browser } from '@/utils/browser.js';
import QRCode from 'qrcode'
import api from '@/api'
import { Config } from "@/common/config"
import { Util } from '@/utils/utils';

export default {
  data() {
    return {
      screenWidth: document.body.clientWidth,
      hideCode: false,
      showLogo: false,
      showContent: 'code',
      locales: this.$store.state.langData,
      user: {},
      uId: '',
      serviceName: '',
      preInfo: {},
      timer: null
    }
  },
  components: {
    QRCode
  },
  methods: {
    //生成二维码
    useqrcode(path) {
      var canvas = document.getElementById('qrcodeCanvas');
      QRCode.toCanvas(canvas, path, error => {
        if (error) console.error(error)
      })
      this.showLogo = true;
    },
    refresh() {
      location.reload();
    },
    doQrcodeLogin(opt) {
      api.qrcodeLogin(opt).then(
        data => {
          this.$store.commit('setLoginInfo', data)
          localStorage.setItem('preInfo', `{"userId":"${data.userId}","nickName":"${data.nickName}","avatar":"${base.headUrl + '/' + data.avatar}"}`);
          let userObj = {
            userId: data.userId,
            token: data.token
          }
          let userStr = Util.encryptByDES(JSON.stringify(userObj), 'echat000');
          Util.setCookie("eUcShEaRt", userStr, data.expireTime)
          window.location.href = window.location.origin + '/otc/#/mac'
        }, () => { }
      )
    },
    loginAgain() {
      var obj = {
        imSessionId: this.uId,
        imServiceId: this.serviceName,
        userId: JSON.parse(localStorage.getItem('preInfo')).userId
      }
      api.loginAgain(obj).then(
        () => {
          this.showContent = 'user';
          this.user = this.preInfo;
          this.getLoginState({ uid: this.uId, type: 2 });
        }
      )
    },
    codeInit() {
      var url = window.origin + `/bcircleweb/qrindex/index_moble.html?XF${this.uId}&${this.serviceName}&Web`;
      this.useqrcode(url);
      this.getLoginState({ uid: this.uId });
      this.tmid = setTimeout(() => {
        this.hideCode = true;
      }, 60 * 1000);
    },
    getLoginState(obj) {
      api.getloginState(obj).then(
        data => {
          this.loginStateHandler(JSON.parse(data.list[0]))
        },
        () => {
          if (!this.hideCode) {
            this.getLoginState({ uid: this.uId });
          }
        }
      )
    },
    loginStateHandler(info) {
      if (this.showContent == 'code') {  // 扫码成功
        this.user = {
          nickName: info.nickName,
          avatar: require('../../assets/images/img-username.png')
        }
        if (info.avatar) this.user.avatar = base.headUrl + '/' + info.avatar;
        clearTimeout(this.tmid);
        this.showContent = 'user';
        this.getLoginState({ uid: this.uId, type: info.type });
      } else if (this.showContent == 'user') {  // 确认登录

        //0-登录提示--pc/web  * 1-确认登录  * 2-登录提示--app  * -1-取消登录
        if (info.type == 1) {
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
        } else {
          location.reload();
        }
      }
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
      api.getQrcodeUrl({}).then(
        data => {
          this.uId = data.uId;
          this.serviceName = data.serviceName;
          if (localStorage.getItem('preInfo')) {
            this.showContent = 'login'
            this.preInfo = JSON.parse(localStorage.getItem('preInfo'))
          } else {
            this.codeInit();
          }
        }
      )
    },
    getDeviceId() {
      let deviceId = localStorage.getItem('deviceId');

      if (!deviceId) {
        let ua = window.navigator.userAgent.toLowerCase().slice(0, 60);
        deviceId = Util.encryptByMd5(ua);
        localStorage.setItem('deviceId', deviceId);
      }

      return deviceId;
    }
  },
  mounted() {
    /*if(this.$store.state.loginInfo){//判断是否存在登录信息
      this.$toast(this.locales.logout)
      this.$router.push({name:'index'})
  }*/
    this.init();
  }
}