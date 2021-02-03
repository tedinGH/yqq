import CountryCode from '@/components/common/CountryCode'
import CodeComponent from '@/components/common/CodeComponent'
import { browser } from '@/utils/browser.js';
import api from '@/api'
import { Util } from '@/utils/utils';
import { validate } from '@/utils/validate';
export default {
data () {
	return {
		params:{
			userSourceType:this.$route.params.userSourceType,
			inviterId:this.$route.params.inviterId
		},
		tab:'1',
		ischecked:false,
		showMsg:false,
		showSelect:false,
		timer:null,
		isClick:false,
		codeText:'',
		send:{
			userName:'',
			verifyCode:'',
			phoneCode:'+',
		},
		locales: this.$store.state.langData,
	}
},
components: { 
	CountryCode,
	CodeComponent
},
methods: {
	chickTab(val){
		this.tab = val+''
		this.send = {
			userName:'',
			verifyCode:'',
			phoneCode:'+',
		}
		this.codeText = this.locales.codeText
		this.isClick = false
		clearInterval(this.timer)
	},
	goLogin(){
		sessionStorage.setItem("tab",this.tab);
		this.$router.push({name: 'scan-login'});
	},
	countrycodeHandler(data){
		this.showSelect = !this.showSelect;
		this.send.phoneCode = data.PHONE_CODE;
	},
	getPhone(){
		if(this.send.phoneCode=='+') { 
			this.$toast(this.locales.selectArea)
			return
		}
		if(this.send.phoneCode=='86'){
       		if(!validate.isChinessPhone(this.send.userName)){
				this.$toast(this.locales.phoneError)
				return 
			}
		}
		if(!validate.isPhone(this.send.userName)) { 
			this.$toast(this.locales.phoneError)
			return
		}
		this.$refs.code.showcode()
	},
	getPhoneCode(o) {
		let opt = {
			mobileNo:this.send.phoneCode+this.send.userName,
			indx:'10000',
			selectionCodeKey: this.$store.state.selectionCodeKey,
		}
		api.getSmsCodeNo(opt).then(
		  	data => {
				this.$toast(data)
				this.isClick = true
				this.countDown()
		  	},() => {}
		)
	},
	getEmail(){
		if(validate.isEmail(this.send.userName)){
			this.$refs.code.showcode()
		}else{
			this.$toast(this.locales.emailError)
		}
	},
	getEmailCode() {
		let opt = {
			email:this.send.userName,
			indx:'100',
			selectionCodeKey: this.$store.state.selectionCodeKey,
		}
		api.getEmailCodeNo(opt).then(
			data => {
				this.$toast(data)
				this.isClick = true
				this.countDown()
			},() => {}
		)
	},
	countDown(){
		let second = 60
		this.timer = setInterval(() => {
			second --
			if (second > 0) {
				this.codeText = this.locales.resend+'(' + second + 's)'
			} else {
				clearInterval(this.timer)
				this.codeText = this.locales.codeText
				this.isClick = false
				second = 60
			}
		}, 1000)
	},
	doCheckUserState() {
		let opt = {userName: this.send.userName}
		if(this.tab==1) opt.userName = this.send.phoneCode+this.send.userName
		opt.userName = Util.encryptByDES(opt.userName,'echat000');
		api.checkFrozenState(opt).then(
			res => {
				this.showMsg = true
			},() => {
				if(this.tab == 1){
					this.getPhoneCode()
					this.isClick = true
				}else{
					this.getEmailCode()
					this.isClick  = true
				}
			}
		)
	},
	//点选验证码回调
	codeLoginHandler(){
		this.doCheckUserState()
	},
	//检查用户状态
	doCheckFrozenState(opt) {
		opt.userName = Util.encryptByDES(opt.userName,'echat000');
		api.checkFrozenState(opt).then(
			res => {
				this.showMsg = true;
			},() => {
				var postData = {
					userName: this.send.userName,
					verifyCode: this.send.verifyCode,
				}
				if(this.tab==1) postData.userName = this.send.phoneCode+this.send.userName
				this.doCheckRegisterCode(postData);
			}
		)
	},
	//验证注册验证码是否正确
    doCheckRegisterCode(opt) {
      api.checkRegisterCode(opt).then(
        res => {
          	let info = {
				tab: this.tab,
				userName: this.send.userName,
				verifyCode: this.send.verifyCode,
				phoneCode: this.send.phoneCode,
			}
			sessionStorage.setItem('registerInfo',JSON.stringify(info))
			this.$router.push({name: 'confirm-psw',params: {userSourceType: this.params.userSourceType,inviterId: this.params.inviterId}});
        },() => {}
      )
    },
	//注册协议
	showAgreement(){
		this.$refs.agreement.show();
	},
	//隐私政策
	showPrivacyPolicy(){
		this.$refs.privacyPolicy.show();
	},
	//下一步
	submit(){
		if(this.tab == 1){
			if(this.send.phoneCode=='+') { 
				this.$toast(this.locales.selectArea)
				return
			}
			if(!validate.isPhone(this.send.userName)) { 
				this.$toast(this.locales.phoneError)
				return
			}
			if(this.send.phoneCode=='86'){
				if(!validate.isChinessPhone(this.send.userName)){
					this.$toast(this.locales.phoneError);
					return false;
				}
			}
			if(!validate.isSmsCode(this.send.verifyCode)){
				this.$toast(this.locales.codeError);
				return false;
			}

			if(!this.ischecked){
				this.$toast(this.locales.isCheck);
				return false;
			}
			//验证账号是否存在
			var postData = {
				userName: this.send.phoneCode+this.send.userName,
			};
			this.doCheckFrozenState(postData);
		}
		if(this.tab == 2){
			if(!validate.isEmail(this.send.userName)){
				this.$toast(this.locales.emailError);
				return false;
			}
			if(!validate.isEmailCode(this.send.verifyCode)){
				this.$toast(this.locales.codeError);
				return false;
			}

			if(!this.ischecked){
				this.$toast(this.locales.isCheck);
				return false;
			}
			//验证账号是否存在
			var postData = {
				userName: this.send.userName,
			};
			this.doCheckFrozenState(postData);
		}
		
	},
},
mounted() {
	this.locales=this.$t('msg').tip
	console.log(this.locales);
	this.codeText = this.locales.codeText
	if(this.$store.state.loginInfo){
		this.$toast(this.locales.logout);
		this.$router.push('/index');
	}
}
}