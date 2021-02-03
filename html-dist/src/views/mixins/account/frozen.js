import CountryCode from '@/components/common/CountryCode'
import api from '@/api'
import { Util } from '@/utils/utils';
import { validate } from '@/utils/validate';

export default {
	data() {
		return {
			tab: '1',
			showSelect: false,
			send: {
				verifyCode: '',
				phoneCode: '+',
	      	},
	      	mobile: '',
	      	email: '',
			locales: this.$store.state.langData
		}
	},
	components: {
		CountryCode
  	},
  	computed: {
    	codePhone() {
      		return this.send.phoneCode + this.mobile;
    	}
  	},
	methods: {
		chickTab(val) {
			this.tab = val + '';
			this.send = {
				verifyCode: '',
				phoneCode: '+',
			};
		},
		//国家区号
		countrycodeHandler(data) {
			this.showSelect = !this.showSelect;
			this.send.phoneCode = data.PHONE_CODE;
		},
		//校验验证码 
		doValidateCode() {
      		let postData = {
        		userName: this.tab == 1 ? this.codePhone : this.email,
        		verifyCode: this.send.verifyCode
      		}

			api.checkFrozenCode(postData).then(
				() => {
					this.doCheckUserState();
				}, () => {}
			)
		},
		//检查用户状态->跳转到用户冻结状态页
		doCheckUserState() {
      let userName = this.tab == 1 ? this.codePhone : this.email,
        postData = {
          userName: Util.encryptByDES(userName, 'echat000')
        };
      
			api.checkFrozenState(postData).then(
				data => {
					if (data == '0') {
						this.$toast(this.locales.user_log_out);
						return false;
          }
          
					let frozenInfo = {
						tab: this.tab,
						userName: userName,
						verifyCode: this.send.verifyCode,
						status: data,
          }
          
          sessionStorage.setItem('frozenInfo', JSON.stringify(frozenInfo));
					this.$router.push({name: 'frozen-state'});
				}, () => {}
			)
		},
		submit() {
			if (this.tab == 1) {
				if(this.send.phoneCode=='+') { 
          			this.$toast(this.locales.selectArea)
          			return
        		}
				if (!validate.isPhone(this.mobile)) {
					this.$toast(this.locales.phoneError)
					return
				}
				if (this.send.phoneCode == '86') {
					if (!validate.isChinessPhone(this.mobile)) {
						this.$toast(this.locales.phoneError)
						return false
					}
				}
				if (!validate.isSmsCode(this.send.verifyCode)) {
					this.$toast(this.locales.codeError)
					return false
				}
				this.doValidateCode();
			} else {
				if (!validate.isEmail(this.email)) {
					this.$toast(this.locales.emailError);
					return false;
				}
				if (!validate.isEmailCode(this.send.verifyCode)) {
					this.$toast(this.locales.codeError);
					return false;
				}
				
				this.doValidateCode();
			}
		}
	},
	mounted() {
		this.locales = this.$t('msg').tip;
    this.codeText = this.locales.codeText;
	}
}
