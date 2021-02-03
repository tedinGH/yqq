<template>
	<diV style="height: 100%;width: 100%;" v-if="isShow">
		<div class="WrapContent">
      <div class="tip">
				<i class="icon-account"></i>
        <span class="account-line"></span>
				<i class="icon-password"></i>
        <span class="password-line"></span>
				<i class="icon-complete"></i>
			</div>
			<div class="tip-text">
				<span class="text-account">{{ $t('msg').menu.Account }}</span>
				<span class="text-password">{{ $t('msg').menu.Password }}</span>	
				<span class="text-complete">{{ $t('msg').menu.Finish }}</span>
			</div>
			<div class="form-content double" v-show="validateInfo.email!=null">
					
				<div class="form-item">
					<div class="item-code double">
            <p style=" font-size: .28rem;margin-bottom:0.1rem">{{ this.$t('msg').dbVerify.yourEmail }}：{{validateInfo.email}}</p>
						<input type="tel" maxlength="4" :placeholder="$t('msg').dbVerify.emailPlaceholder" v-model="send.emailVerifyCode">
						<EmailCode ref="email" v-model="validateInfo.email" :indx="'101'" :codeKey="true"></EmailCode>
					</div>
				</div>
			</div>
			<div class="form-content double" v-show="validateInfo.mobile!=null">
				<div class="form-item">
					<div class="item-code double"  :class="validateInfo.mobile!=null&&validateInfo.email!=null?'doubles':''">
            <p style=" font-size: .28rem;margin-bottom:0.1rem">{{this.$t('msg').dbVerify.yourPhone}}：{{validateInfo.mobile}}</p>
						<input type="tel" maxlength="4" :placeholder="$t('msg').dbVerify.phonePlaceholder" v-model="send.mobileVerifyCode">
						<SmsCode ref="sms" v-model="validateInfo.mobile" :indx="'10001'" :codeKey="true"></SmsCode>
					</div>
				</div>
			</div>
			<div class="form-content double">
				<div class="form-button"  :class="validateInfo.mobile!=null&&validateInfo.email!=null?'doubles':''">
					<a class="next" href="javascript:;" @click="submit();">{{this.$t('msg').dbVerify.confirm}}</a>
				</div>
			</div>
		</div>
		<select-code ref="code" @codeConfirmHandler="confirmHandler"></select-code>
	</diV>
</template>
<script>
	import api from '@/api'
	import EmailCode from '@/components/subcompoments/EmailCode.vue'
	import SmsCode from '@/components/subcompoments/SmsCode.vue'
	import SelectCode from '@/components/subcompoments/CodeComponent.vue'
	export default {
		name: 'CodeComponent',
		data() {
			return {
				isShow:false,
				validateInfo:{
					userName:null,
					email:null,
					mobile:null,
					tempEmail:null,
					tempMobile:null,
				},
				type:'1',
				send:{
					emailVerifyCode:'',
					mobileVerifyCode:''
				}
			}
		},
		components: {
			EmailCode,
			SmsCode,
			SelectCode
		},
		methods: {
			show() {
				var that = this;
				that.validateInfo = {
					userName:this.$store.state.validateInfo.userName,
					email:this.$store.state.validateInfo.email,
					mobile:this.$store.state.validateInfo.mobile,
					tempEmail:this.hideEmail(this.$store.state.validateInfo.email),
					tempMobile:this.hideMobile(this.$store.state.validateInfo.mobile),
        }
				console.log(this.$store.state.validateInfo)
				that.isShow = true;
			},
			hideEmail(val){
				if(val!=null){
					var arr = val.split('@');
					var email = arr[0].substr(0,arr[0].length-1)+'*@';
					email = '*'+ email.substr(1,arr[0].length)+arr[1];
					return email;
				}
			},
			hideMobile(telVal){
				var newTelVal = '';
				if(telVal!=null){
					if(telVal.length > 0){
						for(var i = 0; i < telVal.length; i++){
							if(i < telVal.length-8){
								newTelVal += telVal[i];
							}else{
								if(i > telVal.length-5){
									newTelVal += telVal[i];
								}else{
									newTelVal += '*';
								}
							}
						}
						return newTelVal;
					}
				}
			},
			showcode(type){
				this.type = type;
				this.$refs.code.showcode();
			},
      		confirmHandler() {
        		//手机
				if(this.type=='1'){
					this.$refs.sms.getCodeApi();
				}
				//邮箱
				else if(this.type=='2'){
					this.$refs.email.getCodeApi();
				}
      		},
			submit(){
				var postData = {
					userName:this.validateInfo.userName,
					securityAuthType:'101',
				};
				if(this.validateInfo.email!=null){
					postData.emailVerifyCode = this.send.emailVerifyCode;
					var reg = new RegExp("^[0-9]*$");
					if(this.send.emailVerifyCode.length != 4 || !this.send.emailVerifyCode || !reg.test(this.send.emailVerifyCode)){
					
						app.myalert(this.$t('msg').dbVerify.emailCodeError);
						return false;
					}
				}
				if(this.validateInfo.mobile!=null){
					postData.mobileVerifyCode = this.send.mobileVerifyCode;
					var reg = new RegExp("^[0-9]*$");
					if(this.send.mobileVerifyCode.length != 4 || !this.send.mobileVerifyCode || !reg.test(this.send.mobileVerifyCode)){
						
						app.myalert(this.$t('msg').dbVerify.phoneCodeError);
						return false;
					}
				}
				console.log(postData);
				//安全验证
				api.doubleVerify(postData).then(
					data => {
						app.myalert(data);
						this.$router.push({name: 'find-password'});
					},data => {
						app.myalert(data);
					}
				)
			},
			
		},
		mounted: function() {
			
		}
	}
</script>
<style  lang="scss" scoped>
  .WrapContent{
    width: 100%;
    height: 100%;
    background: #fff;
  }
</style>
