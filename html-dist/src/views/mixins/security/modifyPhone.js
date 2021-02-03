import api from '@/api'
import { validate } from '@/utils/validate';
import { Util } from '@/utils/utils';

export default {
  data (){
		return {
			data: {},
			modify_Type: 0,
			locales: this.$store.state.langData,
		}
	},
	methods: {
		modifyType(i) {
			this.modify_Type = i;
		},
		next() {
			if(!this.modify_Type){
				this.$toast(this.locales.verifyType);
				return;
			} else if (this.modify_Type == 1){ 
        let code = this.$refs.code.value;
        
				if(!validate.isSmsCode(code)){
					this.$toast(this.locales.codeError);
					return false;
        }

        api.resetMobileBySms({verifyCode: code}).then(
          () => {
            this.$router.push({name:'binding-phone'});
          },() => {}
        )
			} else {
        let psw = this.$refs.psw.value;
        
				if(!validate.isPsw(psw)){
					this.$toast(this.locales.pswError);
					return false;
        }

        api.resetMobileByPsw({password: Util.encryptByMd5(psw)}).then(
          () => {
            this.$router.push({name:'binding-phone'});
          },() => {}
        )
			}
		}
	},
	mounted() {
		this.data = JSON.parse(Util.getStore('securityInfo'));
		this.locales = this.$t('msg').tip;
	}
}