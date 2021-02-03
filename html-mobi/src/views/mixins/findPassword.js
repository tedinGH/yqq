import HeaderComponent from '@/components/subcompoments/HeaderComponent.vue'
import api from '@/api'
import { Util } from '@/utils/utils'
export default {
	name: 'findPassword',
	data () {
		return {
			showFirstpwd:false,
			showSecondpwd:false,
			send:{
				firstpwd:'',
				secondpwd:'',
			}
		}
	},
    components: { 
      	HeaderComponent: HeaderComponent
    },
	computed: {
		currentProjectInfo(){
			return this.$store.state.validateInfo;
		}
	},
	methods: {

		//提交
		submit() {
			var postData = {
				userName: this.$store.state.validateInfo.userName,
				password: Util.encryptByMd5(this.send.firstpwd),
				selectionCodeKey: this.$store.state.selectionCodeKey,
			}
			api.resetPassword(postData).then(
				data => {
					console.log(data)
					this.$router.push({name: 'findpwd-success'});
				},data => {
					app.myalert(data);
					this.$router.push({name: 'findpwd-fail'});
				}
			)
		},
		//设置密码
		next(){

			var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d:~!\\@#$%^&*()_+{}|=:\-"<>\[\]\;\'\,\.\/]{8,20}$/;
			var result = re.test(this.send.firstpwd);
			if (!re.test(this.send.firstpwd)) {
				app.myalert(this.$t('msg').tip.pswError);
				return false;
			}if (!re.test(this.send.secondpwd)) {
				app.myalert(this.$t('msg').tip.pswError);
				return false;
			}if(this.send.firstpwd!=this.send.secondpwd){
				app.myalert(this.$t('msg').tip.comparisonPsw);
				return false;
			}
			this.submit();
		},
	},
  	mounted() {

      	//设置title
      	document.title = this.$t('msg').menu.setPwd;
      	
		if(!this.currentProjectInfo.userName) {
			this.$router.replace({name: 'forget-password'});
			return;
		} 
  	}
}