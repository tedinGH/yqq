import { Util } from '@/utils/utils'
import api from '@/api'
import { validate } from '@/utils/validate';

export default {
  data (){
		return {
      data: {},
      locales: {}
		}
	},
	methods: {
		getGoogleCheck(){
			api.queryInfo({userName: this.data.userName}).then(
				data => {
					if (!data.googleSwitch) {
						this.$router.push({name:'security'});
					}
				},() => {}
			)
		},
		stopGoogle(){
			let psw = this.$refs.psw.value,
        code = this.$refs.code.value;
          
			if(!validate.isPsw(psw)){
				this.$toast(this.locales.pswError);
				return false; 
      }
      
			if(!validate.isSmsCode(code)){
				this.$toast(this.locales.codeError);
				return false;
      }
      
			let postData = {
        googleCode: code, 
        password: Util.encryptByMd5(psw)
      }

			api.closeGoogle(postData).then(
				data => {
					this.$toast(data);
					this.$router.push({name:'security'});
				}, () => {}
			)
		}
	},
	mounted() {
    this.data = JSON.parse(Util.getStore('securityInfo'));
    this.locales = this.$t('msg').tip;
		this.getGoogleCheck();
	}
}