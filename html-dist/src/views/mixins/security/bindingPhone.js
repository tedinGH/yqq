import api from '@/api'
import { Util } from '@/utils/utils';
import { validate } from '@/utils/validate';
import CountryCode from '@/components/common/CountryCode.vue'

export default {
  data (){
		return {
			data: {},
			showSelect: false,
			send: {
				phoneCode: '+',
				country: ''
      },
      phone: '',
      indx: '10005',
			locales: this.$store.state.langData,
      lang:this.$store.state.language
		}
  },
  computed: {
    codePhone() {
      return this.send.phoneCode + this.phone;
    }
  },
  components: { 
		CountryCode
	},
	methods: {
		showCountryCode() {
      this.showSelect = !this.showSelect;
		},
		countrycodeHandler(data){
      this.showSelect = !this.showSelect;
      this.send.phoneCode = data.PHONE_CODE;
      this.send.country =  data.COUNTRY_NAME;
      if(this.lang=='en_US') this.send.country =  data.COUNTRY_NAME_EN;
      if(this.lang=='my') this.send.country =  data.COUNTRY_NAME_MY;
		},
		binding(){
			let code = this.$refs.code.value;
      if(this.send.phoneCode=='+') { 
        this.$toast(this.locales.selectArea)
        return
      }
			if(!validate.isPhone(this.phone)) { 
				this.$toast(this.locales.phoneError) 
				return false
      }
      
			if(this.send.phoneCode == '86' && !validate.isChinessPhone(this.phone)){
        this.$toast(this.locales.phoneError);
        return false; 
      }
      
			if(!validate.isSmsCode(code)){
				this.$toast(this.locales.codeError);
				return false;
      }
      
      let obj = {
        mobile: this.codePhone, 
        verifyCode: code
      }
      
			if(this.data.mobile) {
        api.resetMobile(obj).then(
          data => {
            this.$toast(data);
					  this.$router.push({name: 'security'});
          },() => {}
        )
      } else {
        api.setMobile(obj).then(
          data => {
            this.$toast(data);
					  this.$router.push({name: 'security'});
          },() => {}
        )
      }
    }
	},
	mounted() {
    this.data = JSON.parse(Util.getStore('securityInfo'));
		this.locales = this.$t('msg').tip;
    
    if(this.data.mobile){
      this.indx = '10006';
    }
	}
}