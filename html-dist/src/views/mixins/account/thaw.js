import CountryCode from '@/components/common/CountryCode';
import CodeComponent from '@/components/common/CodeComponent.vue';
import DoubleVerify from '@/components/common/DoubleVerify.vue';
import api from '@/api'
import { Util } from '@/utils/utils';
import { validate } from '@/utils/validate';

export default {
	name: 'account-thaw',
	data () {
		return {
			tab: '1',
			isThaw: true,
			phoneCode: '+',
      phone: '',
      email: '',
			validateInfo: {},
			layerOther: false,
			layerSystem: false, 
			showSelect: false,
			locales: this.$store.state.langData
		}
	},
	components: { 
		CountryCode,
		CodeComponent,
		DoubleVerify
	},
	methods: {
		chickTab(val){
			this.tab = val + '';
		},
		//国家区号
		countrycodeHandler(data){
			this.showSelect = !this.showSelect;
			this.phoneCode = data.PHONE_CODE;
		},
		codeConfirmHandler() {
			let postData = { 
        userName: this.tab == '1' ? this.phoneCode + this.phone : this.email
      };

			api.getUnfrozenInfo(postData).then(
				data => {
					this.validateInfo = {
						userName: this.tab == '1' ? this.phoneCode + this.phone : this.email,
						mobile: data.mobile,
						email: data.email
					}
					this.$refs.verify.show(['118','10018','118']);
				}, () => {}
			)
		},
		verifyHandler() {
			let postData = {
				userName: this.tab == '1' ? this.phoneCode + this.phone : this.email,
				selectionCodeKey: this.$store.state.selectionCodeKey
			}

			api.unfrozenUser(postData).then(
				data => {
					this.$toast(data);
					this.isThaw = false;
				}, () => {}
			)
		},
		//检查用户状态
		doCheckFrozenState() {
			let postData = { 
        userName: this.tab == '1' ? this.phoneCode + this.phone : this.email
      };
      postData.userName = Util.encryptByDES(postData.userName, 'echat000');
      
			api.checkFrozenState(postData).then(
				data => {
					if (data == '0') {
						this.$toast(this.locales.user_log_out);
						return false;
					} else if (data == '2') { 
						this.codeConfirmHandler();
					} else {
						this.layerOther = true;
					}
				}, data => {
					if (data.code == 100003) { //该账号没冻结或者账号不存在
						this.layerOther = true;
					} else if (data.code == 100035) { //该账号被系统冻结
						this.layerSystem = true;
					}
				}
			)
		},
		//提交
		submit(){
			if (this.tab == 1) {
				if(this.phoneCode=='+') { 
          			this.$toast(this.locales.selectArea)
          			return
        		}
				if (!validate.isPhone(this.phone)) { 
					this.$toast(this.locales.phoneError);
					return false;
				}
				if (this.phoneCode == '86') {
					if(!validate.isChinessPhone(this.phone)) {
						this.$toast(this.locales.phoneError);
						return false;
					} 
				}
			} else {
				if (!validate.isEmail(this.email)) {
					this.$toast(this.locales.emailError);
					return false;
				}
			}
			this.doCheckFrozenState();
    },
    goToLogin(){
			let device = Util.getEnvironmet();
			if (device == 'IOS') {
				window.webkit.messageHandlers.backToLogin.postMessage("");
			} else if (device == 'Android') {
				native.backToLogin();
			} else {
				this.$router.push({name: 'scan-login'});
			}
		},
		customer(){
			location.href = 'https://chat.liveneed.net/chat/Hotline/channel.jsp?cid=5003568&cnfid=4437&j=9533413181&s=1';
		}
	},
	mounted() {
	}
}