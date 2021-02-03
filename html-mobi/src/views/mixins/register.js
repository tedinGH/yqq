import CountryCode from '@/components/subcompoments/CountryCode.vue'
import CodeComponent from '@/components/subcompoments/CodeComponent.vue'
import api from '@/api'
import { Util } from '@/utils/utils'
export default {
  name: 'register',
  data() {
    return {
      device: Util.getEnvironmet(),
      addFriend: 'bcircleapp://callmainmodel?model=82100&otherID=',
      openFriend: 'bcircleapp://callmainmodel?model=82102&otherID=',
      openFriend2: "bcircleapp://callmainmodel?model=82103&otherID=",
      addGroup: 'bcircleapp://callmainmodel?model=82101&groupID=',
      addAlias: 'bcircleapp://callmainmodel?model=80800&type=0&alias=',
      tellApp: 'javascript:;',
      params: {
        userSourceType: this.$route.params.userSourceType,
        inviterId: 0
      },
      groupId: null,
      ischecked: false,
      isClick: false,
      txt: this.$t('msg').tip.codeText,
      send: {
        userName: '',
        verifyCode: '',
        phoneCode: '+',
      },
      countryData: {
        "COUNTRY_NAME": "中国",
        "COUNTRY_NAME_EN": "China",
        "COUNTRY_CODE": "CN",
        "PHONE_CODE": "+",
        "TIME_DIFF": "0"
      },
      isWx: false,
      userinvite: false,
      userlist: [],
      base: base,
      petname: null
    }
  },
  components: {
    CountryCode,
    CodeComponent,
  },
  methods: {

    countrycodeHandler(data) {
      console.log(data);
      this.countryData = data;
      this.send.phoneCode = data.PHONE_CODE;
      this.$refs.countrycode.hide();
    },
    //区号
    showCountryCode() {
      this.$refs.countrycode.show();
    },
    //注册协议
    showAgreement() {
      var that = this;
      that.$refs.agreement.show();
    },
    //隐私政策
    showPrivacyPolicy() {
      this.$refs.privacyPolicy.show();
    },
    resetCode() {
      let second = 60, timer = null;
      timer = setInterval(() => {
        second--
        if (second > 0) {
          this.txt = second + 's'
        } else {
          clearInterval(timer)
          this.txt = this.$t('msg').tip.codeText;
          this.isClick = false;
        }
      }, 1000)
    },
    phoneChange() {
      this.isClick = false;
    },
    getCode() {
      if (!this.isClick) {
        if (this.send.phoneCode == '+') {
          app.myalert(this.$t('msg').tip.selectArea)
          return
        }
        if (!this.send.userName) {
          app.myalert(this.$t('msg').tip.phoneNumber); return;
        }
        if (this.send.phoneCode == '86') {
          if (this.send.userName.length != 11 || !(/^(13[0-9]|12[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/i.test(this.send.userName))) {
            app.myalert(this.$t('msg').tip.phoneError);
            return false;
          }
        }
        this.$refs.code.showcode();
      }
    },
    //点选验证码回调
    codeLoginHandler() {

      //验证账号是否存在
      var postData = {
        userName: this.send.phoneCode + this.send.userName,
      };
      postData.userName = Util.encryptByDES(postData.userName, 'echat000');
      api.checkFrozenState(postData).then(
        res => {
          app.myalert(this.$t('msg').tip.accountRegistered);
          this.isClick = true
        }, () => {
          let opt = {
            mobileNo: this.send.phoneCode + this.send.userName,
            indx: '10000',
            selectionCodeKey: this.$store.state.selectionCodeKey,
          }
          api.getSmsCodeNo(opt).then(
            data => {
              app.myalert(data);
              this.isClick = true;
              this.resetCode();
            }, () => { }
          )
        }
      )
    },
    //提交
    submit() {
      var that = this;
      if (this.send.phoneCode == '+') {
        app.myalert(this.$t('msg').tip.selectArea)
        return
      }
      if (!this.send.userName) { app.myalert(this.$t('msg').tip.phoneNumber); return; }
      if (this.send.phoneCode == '86') {
        if (this.send.userName.length != 11 || !(/^(13[0-9]|12[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/i.test(this.send.userName))) {
          app.myalert(this.$t('msg').tip.phoneError);
          return false;
        }
      }
      if (!this.send.verifyCode) { app.myalert(this.$t('msg').dbVerify.phonePlaceholder); return; }
      var reg = new RegExp("^[0-9]*$");
      if (this.send.verifyCode.length != 4 || !this.send.verifyCode || !reg.test(this.send.verifyCode)) {
        app.myalert(this.$t('msg').dbVerify.phoneCodeError);
        return false;
      }

      if (!this.ischecked) {
        app.myalert(this.$t('msg').tip.isCheck);
        return false;
      }
      //验证账号是否存在
      var postData = {
        userName: this.send.phoneCode + this.send.userName,
      };
      postData.userName = Util.encryptByDES(postData.userName, 'echat000');
      api.checkFrozenState(postData).then(
        res => {
          app.myalert(this.$t('msg').tip.accountRegistered);
        }, () => {
          var opt = {
            userName: that.send.phoneCode + that.send.userName,
            verifyCode: this.send.verifyCode,//验证码
          };
          //验证注册验证码
          api.checkRegisterCode(opt).then(
            res => {
              var postData = {
                userName: this.send.phoneCode + this.send.userName,
                verifyCode: this.send.verifyCode,
                selectionCodeKey: this.$store.state.selectionCodeKey,
                userSourceType: this.params.userSourceType,
                inviterId: this.params.inviterId || '0',
                countryCode: this.countryData.COUNTRY_CODE
              }
              console.log(postData);
              //用户注册接口
              this.doRegister(postData);
            }, () => { }
          )
        }
      )
    },
    //用户注册接口
    doRegister(opt) {
      api.register(opt).then(
        res => {
          this.$router.replace({ name: 'register-success' });
        }, () => { }
      )
    },
    paramsInit(content) {
      if (content.indexOf("@") > -1) {
        this.petname = content.substring(1)
        this.tellApp = this.addAlias + content.substr(1);
        this.getuserInvite()
      } else {
        content = content.replace(/-/g, "/");
        var url = Util.decryptByDES(content, 'echat000');
        console.log(url)
        //旧链接只传userID
        if (url.length == 7) {
          this.addType == 'echat';
          this.tellApp = this.addFriend + url;
          this.params.inviterId = url;
        } else {
          var urlArr = url.split('/');
          this.addType = urlArr[0];
          if (this.addType == 'echat') {
            if (urlArr[2] == 'f') {
              this.tellApp = this.addFriend + urlArr[1];
              this.params.inviterId = urlArr[1];
            }
            else if (urlArr[2] == 'q') {
              this.tellApp = this.openFriend + urlArr[1];
              this.params.inviterId = urlArr[1];
            }
            else if (urlArr[2] == 't') {
              this.tellApp = this.openFriend2 + urlArr[1];
              this.params.inviterId = urlArr[1];
            }

          } else if (this.addType == 'group') {
            this.tellApp = this.addGroup + urlArr[1] + '&inviterId=' + urlArr[2];
            this.groupId = urlArr[1]
            this.params.inviterId = urlArr[2];
          }
        }
        this.getuserInvite()
      }
      window.setTimeout(function () {
        document.getElementById("test").click();
      }, 1000);
    },
    getuserInvite() {
      this.userinvite = true;
      let obj = {
        alias: this.petname,
        userId: this.params.inviterId,
        groupId: this.groupId
      }
      api.userInvite(obj).then(
        data => {
          this.userlist = data
        }, () => { }
      )
    },
  },
  created() {
    if (this.$route.params.inviterId != 0) {
      this.paramsInit(this.$route.params.inviterId)
    };
    let content = window.location.pathname
    content = content.replace(/\/mobi/, "");
    window.location = window.location.origin+'/dist'+content+'#/download/0/'+this.$route.params.inviterId
  },
  mounted: function () {
    var that = this;
    let size = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / 7.5;
    let heightRem = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) / +size;
    if (heightRem < 13) document.getElementsByTagName('body')[0].style.height = 13 + 'rem';

    //设置title
    document.title = this.$t('msg').menu.register;

    //解决手机软盘问题
    var h = document.body.scrollHeight;
    window.onresize = function () {
      if (document.body.scrollHeight < h) {
        document.getElementById('agreement').style.display = 'none';
      } else {
        document.getElementById('agreement').style.display = 'block';
      }
    };

    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      that.isWx = true;
    } else if (ua.match(/\sQQ/i) == " qq") {
      that.isWx = true;
    }
  }
}