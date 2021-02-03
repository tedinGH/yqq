<template>
	<div class="validate" @click="hide();" v-if="isShow" :class="{active: isShow}">
		<div class="validate-content" @click.stop=";">
			<section v-show="validateInfo.email!=null">
				<span class="validate-email">您的邮箱：<span v-text="validateInfo.tempEmail"></span></span>
				<div class="validate-item">
					<div class="item-label">邮箱验证码</div>
					<div class="item-code">
						<input type="tel" maxlength="4" placeholder="请输入邮箱验证码" v-model="send.emailVerifyCode">
						<span class="get-code" @click="getEmail();" v-text="code.emailVal"></span>
					</div>
				</div>
			</section>
			<section v-show="validateInfo.mobile!=null">
				<span class="validate-phone">您的手机：<span v-text="validateInfo.tempMobile"></span></span>
				<div class="validate-item">
					<div class="item-label">手机验证码</div>
					<div class="item-code">
						<input type="tel" maxlength="4" placeholder="请输入手机验证码" v-model="send.mobileVerifyCode">
						<span class="get-code" @click="getPhone();" v-text="code.phoneVal"></span>
					</div>
				</div>
			</section>
			<div class="footer">
				<a href="javascript:;" @click="submit();">确定</a>
			</div>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery';
	import md5 from 'md5';
	import CryptoJS from 'crypto-js';
	import {Toast} from 'mint-ui';

	export default {
		name: 'CodeComponent',
		data() {
			return {
				isShow:false,
				type:'',
				mobileType:'',
				emailType:'',
				code:{
					emailVal:'获取验证码',
					emailNum:60,
					emailStatus:true,
					phoneVal:'获取验证码',
					phoneNum:60,
					phoneStatus:true,
				},
				validateInfo:{
					userName:null,
					email:null,
					mobile:null,
					tempEmail:null,
					tempMobile:null,
				},
				send:{
					emailVerifyCode:'',
					mobileVerifyCode:''
				}
			}
		},
		methods: {
			show(type,mobileType,emailType) {
				var that = this;
				that.type = type;
				that.mobileType = mobileType;
				that.emailType = emailType;
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
			hide() {
				var that = this;
				that.isShow = false;
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
			//获取邮箱验证吗
			getEmailCode(opt, cb, cberr) {
				var url = base.baseUrl+'/msg/mail/send.htm';
			    httpPost(url, opt).then(cb, cberr);
			},
			getEmailCodeHandler(data) {
				var that = this;
				if(data.code == 0) {
					that.$toast(data.data);
					that.emailTimeOut();
				}else{
					that.$toast(data.data);
					that.emailTimeOut();
				}
			},
			getEmail(){
				var that = this;
				if(that.code.emailStatus){
					that.code.emailStatus = false;
					that.getEmailCode({
						'email':that.validateInfo.email,
						'indx':that.emailType,
					},that.getEmailCodeHandler);
				}
			},
			emailTimeOut(){
				var that = this;
				if(that.code.emailNum==0){
					that.code.emailVal = '获取验证码';
					that.code.emailNum = 60;
					that.code.emailStatus = true;
					return;
				}else{
					that.code.emailNum--;
					that.code.emailVal = that.code.emailNum +'秒后可获取';
				}
				setTimeout(function(){
					that.emailTimeOut();
				},1000);
			},
			//获取手机验证码
			getPhoneCode: function(opt, cb, cberr) {
				var url = base.baseUrl+'/msg/sms/send.htm';
				httpPost(url, opt).then(cb, cberr);
			},
			getPhoneCodeHandler: function(data) {
				var that = this;
				if(data.code == 0) {
					that.$toast(data.data);
					that.phoneTimeOut();
				}else{
					that.$toast(data.data);
					that.phoneTimeOut();
				}
			},
			getPhone(){
				var that = this;
				if(that.code.phoneStatus){
					that.code.phoneStatus = false;
					that.getPhoneCode({
						'mobileNo':that.validateInfo.mobile,
						'indx':that.mobileType,
					},that.getPhoneCodeHandler);
				}
			},
			phoneTimeOut(){
				var that = this;
				if(that.code.phoneNum==0){
					that.code.phoneVal = '获取验证码';
					that.code.phoneNum = 60;
					that.code.phoneStatus = true;
					return;
				}else{
					that.code.phoneNum--;
					that.code.phoneVal = that.code.phoneNum +'秒后可获取';
				}
				setTimeout(function(){
					that.phoneTimeOut();
				},1000);
			},
			//安全验证
			doSecurityAuth(opt, cb, cberr) {
				var url = base.baseUrl+'/user/securityAuth.htm';
			    httpPost(url, opt).then(cb, cberr);
			},
			doSecurityAuthHandler: function(data) {
				var that = this;
				if(data.code == 0) {
					that.$toast(data.data);
					that.$emit('dalidateConfirmHandler');
				}else{
					that.$toast(data.data);
				}
			},
			submit(){
				var postData = {
					userName:this.validateInfo.userName,
					securityAuthType:this.type,
				};
				if(this.validateInfo.email!=null){
					postData.emailVerifyCode = this.send.emailVerifyCode;
					
					var reg = new RegExp("^[0-9]*$");
					if(this.send.emailVerifyCode.length != 4 || !validate.isRequired(this.send.emailVerifyCode) || !reg.test(this.send.emailVerifyCode)){
					
						this.$toast('邮箱验证码格式有误！');
						return false;
					}
				}
				if(this.validateInfo.mobile!=null){
					postData.mobileVerifyCode = this.send.mobileVerifyCode;
					var reg = new RegExp("^[0-9]*$");
					if(this.send.mobileVerifyCode.length != 6 || !validate.isRequired(this.send.mobileVerifyCode) || !reg.test(this.send.mobileVerifyCode)){
						this.$toast('手机验证码格式有误！');
						return false;
					}
				}
				console.log(postData);
				this.doSecurityAuth(postData,this.doSecurityAuthHandler);
			},
			
		},
		mounted: function() {
			
		}
	}
</script>

<style scoped>
	.validate {
		display: none;
		z-index: 10;
		position: fixed;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, .7);
	}

	.validate.active {
		display: block;
	}

	.validate-content {
		position: relative;
		left: 50%;
		top: 50%;
		width: 606px;
		height: 391px;
		padding-top: 71px;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		background: #FFFFFF;
		border-radius:10px;
	}

	.validate-content .validate-email {
		display: inline-block;
		position: relative;
		margin: 0 12px 0 159px;
		height: 16px;
		width: auto;
		line-height: 16px;
		font-size: 14px;
		color: #FF5050;
	}
	.validate-content .validate-phone {
		display: inline-block;
		position: relative;
		margin: 29px 12px 0 159px;
		height: 16px;
		width: auto;
		line-height: 16px;
		font-size: 14px;
		color: #FF5050;
	}
	.validate-content .validate-item{
		position: relative;
		height: 53px;
		line-height: 53px;
		margin-top: 12px;
		padding: 0 40px;
	}
	.validate-content .validate-item .item-label{
		position: relative;
		height: 53px;
		line-height: 53px;
		width: 105px;
		text-align: right;
	}
	.validate-content .validate-item .item-code{
		position: absolute;
		top: 0;
		left: 160px;
		height: 53px;
		line-height: 53px;
		width: 393px;
		text-align: right;
		font-size: 17px;
	}

	.validate-content .validate-item .item-code > input{
		height: 100%;
		width: 100%;
		border:1px solid #D2D2D2;
		border-radius:10px;
		padding-left: 15px;
		font-size: 15px;
		outline-color: #FFB358;
	}

	.validate-content .validate-item .item-code > .get-code{
		position: absolute;
		top:15px;
		right: 0;
		height: 27px;
		line-height: 27px;
		text-align: center;
		width: 115px;
		color: #FF8F0A;
		border-left: 1px solid #bbb;
		cursor: pointer;
	}
	.validate-content .footer{
		position: absolute;
		bottom: 34px;
		height:auto;
		width: 100%;
	}
	.validate-content .footer > a{
		display: inline-block;
		width:233px;
		height:43px;
		line-height:43px;
		border-radius:10px;
		background: #FFB358;
		font-size: 16px;
		text-align: center;
		color:#fff;
		margin-left: 187px;
		cursor: pointer;
		outline: none;
	}
	/*mobile*/
	@media only screen and (min-width: 0px) and (max-width: 350px) {
		.validate-content {
			transform: translate(-50%, -50%) scale(.40);
			-webkit-transform: translate(-50%, -50%) scale(.40);
		}
	}

	@media only screen and (min-width: 350px) and (max-width: 400px) {
		.validate-content {
			transform: translate(-50%, -50%) scale(.48);
			-webkit-transform: translate(-50%, -50%) scale(.48);
		}
	}

	@media only screen and (min-width: 400px) and (max-width: 450px) {
		.validate-content {
			transform: translate(-50%, -50%) scale(.55);
			-webkit-transform: translate(-50%, -50%) scale(.55);
		}
	}

	@media only screen and (min-width: 450px) and (max-width: 1050px) {
		.validate-content {
			transform: translate(-50%, -50%) scale(1);
			-webkit-transform: translate(-50%, -50%) scale(1);
		}
	}
</style>
