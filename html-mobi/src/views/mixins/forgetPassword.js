import HeaderComponent from '@/components/subcompoments/HeaderComponent.vue'
import CountryCode from '@/components/subcompoments/CountryCode.vue'
import DoubleValidateComponent from '@/components/subcompoments/DoubleValidateComponent.vue'
import { validate } from '@/utils/validate';
import api from '@/api'
export default {
  name: 'forgetPassword',
  data() {
    return {
      params: {
        type: this.$route.params.type,
        account: this.$route.params.account,
        code: this.$route.params.code
      },
      tab: '1',
      isFirst: true,
      send: {
        userName: '',
        phoneCode: '+',
      },
      country:this.$t('msg').menu.countryHolder
    }
  },
  components: {
    HeaderComponent,
    CountryCode,
    DoubleValidateComponent,
  },
  methods: {
    countrycodeHandler(data) {
      console.log(data);
      let lang=this.$store.state.language ;
      if(lang=='zh_CN'){
        this.country=data.COUNTRY_NAME
      }else if(lang=='en_US'){
        this.country=data.COUNTRY_NAME_EN
      }else{
        this.country=data.COUNTRY_NAME_MY
      }
      this.send.phoneCode = data.PHONE_CODE;
      this.$refs.countrycode.hide();
    },
    //区号
    showCountryCode() {
      this.$refs.countrycode.show();
    },
    next() {
      var postData = {
        userName: this.send.userName,
      }
      if(this.isFirst){
        this.isFirst = false;
        if (this.tab == 1) {
          postData.userName = this.send.phoneCode + this.send.userName;
        }
        api.findPwdFirst(postData).then(
          data => {
            var userName = this.send.userName;
            if (this.tab == 1) {
              userName = this.send.phoneCode + this.send.userName;
            }
            this.$store.commit('setValidateInfo', {
              userName: userName, //类型
              mobile: data.mobile, //手机
              email: data.email, //邮箱
            });
            this.$refs.dalidate.show();
          }, data => {
            app.myalert(data);
          }
        )
      }
      setTimeout(() => {
        this.isFirst = true;
      }, 2000)
    },
    //登录
    submit() {
      if (this.tab == 1) {
        if (this.send.phoneCode == '+') {
          app.myalert(this.$t('msg').tip.selectArea)
          return
        }
        if (!this.send.userName) {
          app.myalert(this.$t('msg').tip.phoneNumber);
          return;
        }
        if (this.send.phoneCode == '86') {
          if (this.send.userName.length != 11 || !(/^(13[0-9]|12[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/i.test(this.send.userName))) {
            app.myalert(this.$t('msg').tip.phoneError);
            return false;
          }
        }
        if (this.send.phoneCode != '+' && this.send.phoneCode != '86') {
          if (!validate.isPhone(this.send.userName)) {
            app.myalert(this.$t('msg').tip.phoneError);
            return
          }
        }
        this.next();
      }
      if (this.tab == 2) {
        if (!this.send.userName) {
          app.myalert(this.$t('msg').tip.emailNumber);
          return;
        }
        if (!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.send.userName))) {
          app.myalert(this.$t('msg').tip.emailError);
          return false;
        }
        this.next();
      }
      this.$store.commit('setForgetPasswordInfo', {
        type: this.tab,//类型
        account: this.send.userName,//账号
        code: this.send.phoneCode,//区号
      });
    },
  },
  mounted() {


    //设置title
    document.title = this.$t('msg').menu.setPwd;
    //手机
    if (this.params.type == '1') {
      this.send.userName = this.params.account;
      this.send.phoneCode = this.params.code;
    }
    //邮箱
    else if (this.params.type == '2') {
      this.send.userName = this.params.account;
      this.send.phoneCode = '';
      this.tab = '2';
    }
    //其他
    else {
      this.send.userName = '';
      this.send.phoneCode = '+';
      this.tab = '1';
    }
    this.$store.commit('setForgetPasswordInfo', {
      type: this.params.type,//类型
      account: this.params.account,//账号
      code: this.params.code,//区号
    });

  }
}