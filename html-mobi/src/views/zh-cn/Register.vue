<template>
	<div class="wrap">
		<!-- <div class="mobi-bg"></div> -->
		<div class="register">
      <div class="title">邀请注册</div>
      <div  v-if="userinvite">
          <div  class="invite" v-if="userlist.groupName">
          <img :src="base.headUrl+userlist.groupAvatar" v-if="userlist.groupAvatar" v-headErrors>
          <img src="../../assets/images/error-head2.png"  v-if="!userlist.groupAvatar">
          <div class="nickName">{{userlist.groupName}}（{{userlist.groupCount}}）</div>
            <div class="text-box">
              <div>——</div> <div class="text">“{{userlist.nickName}}”邀请你加入“{{userlist.groupName}}”</div><div>——</div> 
            </div>
          </div>
          <div  class="invite" v-else>
              <img :src="base.headUrl+userlist.userAvatar"  v-headError  v-if="userlist.userAvatar">
              <img src="../../assets/images/error-head.png"  v-if="!userlist.userAvatar">
              <div class="nickName">{{userlist.nickName}}</div>
              <div class="text-box">
              <div>——</div> <div class="text">“{{userlist.nickName}}”邀请你加入EcahtAPP</div><div>——</div> 
            </div>
          </div>
      </div> 
		 	<div  :class= "userinvite? 'form-content form-content2' : 'form-content'">
				<!-- <div class="form-title">
					<span>手机号注册</span>
				</div> -->
				<div class="form-item">
					<div class="item-input">
						<span @click="showCountryCode()" class="countrycode" v-text="send.phoneCode"></span>
						<input type="tel" @input="phoneChange()" maxlength="11" placeholder="请输入手机号码" v-model="send.userName" class="tel">
					</div>
					<div class="item-code">
						<input type="tel" maxlength="4" placeholder="请输入验证码" v-model="send.verifyCode">
						<button class="getcode" :class="{frozen: isClick}" @click="getCode()" :disabled="isClick">{{txt}}</button>
					</div>
				</div>
				<div class="form-button">
					<a class="next" href="javascript:;" @click="submit();">下一步</a>
				</div>
				<div class="agreement" id="agreement" :class="{active:ischecked}" @click="ischecked = !ischecked">
					<i></i>
					勾选表示同意<span class="udl" @click="showAgreement();">《EchatAPP协议》</span>和<span class="udl" @click="showPrivacyPolicy();">《隐私政策》</span>
				</div>
			</div>
		</div>
				
		<Agreement ref="agreement"></Agreement>
		<PrivacyPolicy ref="privacyPolicy"></PrivacyPolicy>
		<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
		<CodeComponent ref="code"  @codeConfirmHandler="codeLoginHandler"></CodeComponent>
		<div class="wx-mask" :class="{active: isWx}">
      <div class="tip-ios" v-show="device=='IOS'"></div>
      <div class="tip-android" v-show="device=='Android'"></div>
    </div>
    <a :href="tellApp" id = "test">跳转APP</a>
	</div>
</template>

<script>
	import register from '../mixins/register';
	import Agreement from '@/views/zh-cn/Agreement.vue'
	import PrivacyPolicy from '@/views/zh-cn/PrivacyPolicy.vue'
	export default {
		name: 'register',
		mixins: [register],
    	components: {
      		Agreement,
      		PrivacyPolicy
		},
	}
</script>
