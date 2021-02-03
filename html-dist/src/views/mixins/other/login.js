import { browser } from '@/utils/browser.js';
import api from '@/api'
import { Config } from "@/common/config"
import { Util } from '@/utils/utils';
import { validate } from '@/utils/validate';
import CodeComponent from '@/components/common/CodeComponent'
import GoogleCodeComponent from '@/components/common/GoogleCodeComponent'
import CountryCode from '@/components/common/CountryCode'

export default {
  data () {
    return {
      screenWidth: document.body.clientWidth,
      tab: '1',
      type: 'password',
      showPassword: false,
      showSelect: false,
      timer: null,
      isClick: false,
      codeText: '',
      send:{
        userName:'',
        verifyCode:'', 
        password:'',
        phoneCode:'+',
      },
      deviceId:'',
      getCode:false, //true获取验证码 false登录
      locales: this.$store.state.langData,
    }
  },
  components: { 
    CodeComponent,
    GoogleCodeComponent,
    CountryCode
  },
  methods: {
    chickTab(val){
      this.tab = val+''
      this.send = {
        userName:'',
        password:'',
        verifyCode:'',
        phoneCode:'+',
      }
      this.codeText = this.locales.codeText
      this.isClick = false
      clearInterval(this.timer)
    },
    loginType(){
      if(this.type == 'code'){
        this.type = 'password';
      }else{
        this.type = 'code';
      }
    },
    //国家区号
    countrycodeHandler(data){
      this.showSelect = !this.showSelect;
      this.send.phoneCode = data.PHONE_CODE;
    },
    //生成uuid
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
    },
    //获取手机验证码
    getPhone(){
      if(this.send.phoneCode=='+') { 
        this.$toast(this.locales.selectArea)
        return
      }
      if(this.send.phoneCode=='86'){
        if(!validate.isChinessPhone(this.send.userName)){
          this.$toast(this.locales.phoneError)
          return 
        }
      }
      if(!validate.isPhone(this.send.userName)) { 
        this.$toast(this.locales.phoneError)
        return
      }
      this.getCode = true
      this.$refs.code.showcode()

    },
    getPhoneCode(){
      let opt = {
        mobileNo:this.send.phoneCode+this.send.userName,
        indx:'10004',
        selectionCodeKey: this.$store.state.selectionCodeKey,
      }
      api.getSmsCodeNo(opt).then(
        data => {
          this.$toast(data)
          this.isClick = true
          this.countDown() 
          this.getCode = false
        },() => {}
      )
    },
    //获取邮箱验证吗
    getEmail(){
      if(validate.isEmail(this.send.userName)){
        this.getCode = true
        this.$refs.code.showcode()
      }else{
        this.$toast(this.locales.emailError)
      }
    },
    getEmailCode(){
      let opt = {
        email:this.send.userName,
        indx:'110',
        selectionCodeKey: this.$store.state.selectionCodeKey,
      }
      api.getEmailCodeNo(opt).then(
        data => {
          this.$toast(data)
          this.isClick = true
          this.countDown()
          this.getCode = false
        },() => {}
      )
    },
    countDown(){
      let second = 60
      this.timer = setInterval(() => {
        second --
        if (second > 0) {
          this.codeText = this.locales.resend+'(' + second + 's)'
        } else {
          clearInterval(this.timer)
          this.codeText = this.locales.codeText
          this.isClick = false
          second = 60
        }
      }, 1000)
    },

    //检查用户状态
    doCheckUserState() {
      let postData = {userName: this.send.userName,};
      if(this.tab==1){
        postData.userName = this.send.phoneCode+this.send.userName;
      }
      api.checkFrozenState(postData).then(
        () => {
          if(this.tab == 1){
            this.getPhoneCode()
          }
          if(this.tab == 2){
            this.getEmailCode()
          }
        }, data => {
          this.$toast(data)
        }
      )
    },
    codeLoginHandler() {
      //验证账号是否存在
      let opt = {userName: this.send.userName}
      if(this.tab==1) opt.userName = this.send.phoneCode+this.send.userName
      if(this.getCode) this.doCheckUserState(opt)
      else this.doCheckFrozenState(opt)
    },
    //判断是否需要谷歌动态验证码登录
    doGoogleCheck(opt) {
      api.googleCheck(opt).then(
        data => {
          if(data == 'true'){
            this.$refs.googleCode.show()
          }else{
            this.googleCodeHandler()
          }
        },() => {}
      )
    },
    //真正登录前谷歌验证码回调
    googleCodeHandler(code){
      let postData = {
        userName: this.send.userName,
        selectionCodeKey: this.$store.state.selectionCodeKey,
        googleCode:code,
        deviceType: '2',
        deviceId: this.deviceId,
        deviceName: browser.deviceName,
        os: browser.OS,
        version: Config.version,
      }
      if(this.tab==1){
        postData.userName = this.send.phoneCode+this.send.userName
        postData.countryCode = this.send.phoneCode
      }
      if(this.type=='password'){
        postData.loginType = '2'
        postData.password = Util.encryptByMd5(this.send.password)
      }
      if(this.type=='code'){
        postData.loginType = '1'
        postData.verifyCode = this.send.verifyCode
      }
      this.doLogin(postData, this.doLoginHandler)
      
    },
    //登录
    doLogin(opt) {
      api.login(opt).then(
        data => {
          //this.$router.push({name: this.$store.state.goBack})
          this.$store.commit('setLoginInfo', data)
          
          let userObj = {
            userId: data.userId,
            token: data.token
          }
          let userStr = Util.encryptByDES(JSON.stringify(userObj), 'echat000');
          Util.setCookie("eUcShEaRt", userStr, data.expireTime);
          this.$store.commit('setToken', data.token);

          sessionStorage.setItem("eUcShEaRt", userStr);
          window.location.href = window.location.origin + '/otc/#/';
        }, () => {}
      )
    },
    //检查用户状态
    doCheckFrozenState() {
      let postData = {userName: this.send.userName}
      if(this.tab==1) postData.userName = this.send.phoneCode+this.send.userName
      postData.userName = Util.encryptByDES(postData.userName, 'echat000');
      api.checkFrozenState(postData).then(
        () => {
          let postData = {userName: this.send.userName}
          if(this.tab==1) postData.userName = this.send.phoneCode+this.send.userName
          if(this.type=='password'){
            postData.password = Util.encryptByMd5(this.send.password)
            this.doCheckLoginPsw(postData)
          }else{
            postData.verifyCode = this.send.verifyCode
            this.doCheckLoginCode(postData)
          }
        }, data => {
          this.$toast(data)
        }
      )
    },
    //检验登录验证码是否正确
    doCheckLoginCode(opt) {
      api.checkVerifyCode(opt).then(
        () => {
          this.doGoogleCheck(opt)
        },() => {}
      )
    },
    //检验登录密码是否正确
    doCheckLoginPsw(opt) {
      api.checkPassword(opt).then(
        res => {
          this.doGoogleCheck(opt)
        },() => {}
      )
    },
    //提交数据、登录类型检验
    submit(){
      if(this.tab == 1){
        let postData = {userName: this.send.userName}
        if(this.send.phoneCode=='+') { 
          this.$toast(this.locales.selectArea)
          return
        }
        if(!validate.isPhone(this.send.userName)) { 
          this.$toast(this.locales.phoneError)
          return false
        }
        if(this.send.phoneCode=='86'){
          if(!validate.isChinessPhone(this.send.userName)){
            this.$toast(this.locales.phoneError)
            return false
          } 
        }
        if(this.type=='code'){
          postData.verifyCode = this.send.verifyCode
          if(!validate.isSmsCode(this.send.verifyCode)){
            this.$toast(this.locales.codeError)
            return false
          }
          this.doCheckFrozenState()
        }
        if(this.type=='password'){
          postData.password = this.send.password
          if(!validate.isPsw(this.send.password)){
            this.$toast(this.locales.pswError)
            return false
          }
          this.$refs.code.showcode()
        }
      }
      if(this.tab == 2){
        let postData = {userName: this.send.userName}
        if(!validate.isEmail(this.send.userName)){
          this.$toast(this.locales.emailError)
          return false
        }
        if(this.type=='code'){
          postData.verifyCode = this.send.verifyCode
          if(!validate.isEmailCode(this.send.verifyCode)){
            this.$toast(this.locales.codeError)
            return false
          }
          this.doCheckFrozenState()
        }
        if(this.type=='password'){
          postData.password = this.send.password
          if(!validate.isPsw(this.send.password)){
            this.$toast(this.locales.pswError)
            return false
          }
          this.$refs.code.showcode()
        }
      }
    },
  },
  mounted() {
    //生成唯一设备ID
    this.deviceId = this.guid()
    this.locales=this.$t('msg').tip
    this.codeText = this.locales.codeText
    Util.setStore('deviceId',this.deviceId)
    //判断是否存在登录信息
    if(this.$store.state.loginInfo){
      this.$toast(this.locales.logout)
      this.$router.push({name:'index'})
    }
  }
}