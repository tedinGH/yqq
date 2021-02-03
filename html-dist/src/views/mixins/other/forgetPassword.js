import CountryCode from '@/components/common/CountryCode'
import CodeComponent from '@/components/common/CodeComponent'
import DoubleVerify from '@/components/common/DoubleVerify'
import api from '@/api'
import { validate } from '@/utils/validate';

export default {
  data() {
    return {
      showSelect: false,
      tab: '1',
      phoneCode: '+',
      mobile: '',
      email: '',
      validateData: {},
      locales: this.$store.state.langData
    }
  },
  components: {
    CountryCode,
    CodeComponent,
    DoubleVerify
  },
  methods: {
    chickTab(val) {
      this.tab = val + '';
    },
    countrycodeHandler(data) {
      this.showSelect = !this.showSelect;
      this.phoneCode = data.PHONE_CODE;
    },
    codeHandler() {
      let postData = {
        userName: this.tab == '1' ? this.phoneCode + this.mobile : this.email
      }
      sessionStorage.setItem('findPswName', postData.userName)
      
      api.getUnfrozenInfo(postData).then(
        data => {
          this.validateData = data;
          this.validateData.userName = postData.userName;
          this.$refs.validate.show(['101', '10001', '101']);
        }, data => {
          this.$toast(data)
        }
      )
    },
    validateHandler() {
      this.$router.replace({name: 'find-password'});
    },
    submit() {
      if (this.tab == 1) {
        if(this.phoneCode=='+') { 
          this.$toast(this.locales.selectArea)
          return
        }
        if (!validate.isPhone(this.mobile)) {
          this.$toast(this.locales.phoneError)
          return
        }
        this.$refs.code.showcode();
      }

      if (this.tab == 2) {
        if (!validate.isEmail(this.email)) {
          this.$toast(this.locales.emailError)
          return false;
        }
        this.$refs.code.showcode();
      }
    },
  },
  mounted() {
  }
}