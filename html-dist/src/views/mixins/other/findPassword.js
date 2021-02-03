import CodeComponent from '@/components/common/CodeComponent.vue'
import { Util } from '@/utils/utils';
import { validate } from '@/utils/validate';
import api from '@/api'

export default {
	data () {
		return {
			showFirstpwd: false,
			showSecondpwd: false,
			send: {
				firstpwd: '',
				secondpwd: '',
			},
			status: 2, //0重置密码失败 1重置密码成功 2设置新密码
			locales: this.$store.state.langData
		}
	},
	components: { 
		CodeComponent
	},
	methods: {
		codeHandler() {
			var postData = {
				userName: sessionStorage.getItem('findPswName'),
				password: Util.encryptByMd5(this.send.firstpwd),
				selectionCodeKey: this.$store.state.selectionCodeKey,
      		}
      
			api.resetPassword(postData).then(
				data => {
					this.$toast(data);
					sessionStorage.removeItem('findPswName');
					this.status = 1;
				},() => {
					this.status = 0;
				}
			)
		},
		next(){
			if (!validate.isPsw(this.send.firstpwd)) {
				this.$toast(this.locales.pswError);
				return false;
			}
			if(this.send.firstpwd!=this.send.secondpwd){
				this.$toast(this.locales.comparisonPsw);
				return false;
			}
			this.$refs.code.showcode();
		},
		goback(){
			this.$router.push({name: 'forget-password'});
		},
		goLogin(){
			this.$store.commit('setLoginInfo', null);
			Util.clearCookie('user');
			Util.removeStore('token');
			this.$router.push({name: 'scan-login'});
		}
	},
	mounted() {
		if(!sessionStorage.getItem('findPswName')){
			this.$router.push({name: 'forget-password'});
		}
	}
}