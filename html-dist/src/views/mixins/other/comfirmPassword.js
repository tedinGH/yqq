
import { countrycode } from '@/utils/countrycode.js';
import api from '@/api'
import { Util } from '@/utils/utils';
import { validate } from '@/utils/validate';
export default {
	data () {
		return {
			tab:'1',
			showFirstpwd:false,
			showSecondpwd:false,
			registerInfo:{},
			send:{
				firstpwd:'',
				secondpwd:'',
			},
			status:2, //0注册失败 1注册成功 2确认密码
			locales: this.$store.state.langData
		}
	},
	methods: {
		gcountrycode(val) {
			for (let i = 0; i < countrycode.length; i++) {
				if(countrycode[i].PHONE_CODE==val){
					return countrycode[i].COUNTRY_CODE
				}
			}
		},
		next(){
			if (!validate.isPsw(this.send.firstpwd)) {
				this.$toast(this.locales.pswError)
				return false
			}
			if(this.send.firstpwd!=this.send.secondpwd){
				this.$toast(this.locales.comparisonPsw)
				return false
			}
			var postData = {
				userName: this.registerInfo.userName,
				verifyCode: this.registerInfo.verifyCode,
				password: Util.encryptByMd5(this.send.firstpwd),
				selectionCodeKey: this.$store.state.selectionCodeKey,
				userSourceType: this.$route.params.userSourceType,
				inviterId: this.$route.params.inviterId,
			}
			if(this.registerInfo.tab==1){
				postData.userName = this.registerInfo.phoneCode+this.registerInfo.userName
				postData.countryCode = this.gcountrycode(this.registerInfo.phoneCode)
			}
			this.doRegister(postData, this.doRegisterHandler)
		},
		doRegister(opt) {
			api.register(opt).then(
				data => {
					this.$toast(data)
					this.status = 1
				},() => {
					this.status = 0
				}
			)
		},
		goback(){
			this.$router.push({name: 'register',params: {userSourceType: this.$route.params.userSourceType,inviterId: this.$route.params.inviterId}})
		},
		goLogin(){
			this.$router.push({name: 'login'})
		}
	},
	mounted () {
		this.registerInfo = JSON.parse(sessionStorage.getItem('registerInfo'))
		if(!this.registerInfo) {
			this.$router.replace({name: 'register'})
		}
	}
}