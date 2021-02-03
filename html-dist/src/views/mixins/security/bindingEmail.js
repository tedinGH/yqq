import api from '@/api'
import { Util } from '@/utils/utils';
import { validate } from '@/utils/validate';

export default {
  data (){
		return {
			data: '',
      email: '',
      indx: '104',
			locales: this.$store.state.langData
		}
	},
	methods: {
		binding(){
			let code = this.$refs.code.value;
          
			if(!validate.isEmail(this.email)) {
				this.$toast(this.locales.emailError);
				return false;
      }
      
			if(!validate.isEmailCode(code)) {
				this.$toast(this.locales.codeError);
				return false;
      } 

			let obj = {
        email: this.email,
        verifyCode: code
      };
      
			if(this.data.email) {
        api.resetEmail(obj).then(
          data => {
            this.$toast(data);
					  this.$router.push({name: 'security'});
          },() => {}
        )
      } else {
        api.setEmail(obj).then(
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
    
    if(this.data.email){
      this.indx = '105';
    }
	}
}