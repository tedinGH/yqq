<template>
	<div class="wrap">
		<!-- <div class="mobi-bg"></div> -->
		<div class="register">
      <div class="title">Invitation to register</div>
      <div  v-if="userinvite">
          <div  class="invite" v-if="userlist.groupName">
            <img :src="base.headUrl+userlist.groupAvatar" v-if="userlist.groupAvatar" v-headErrors>
          <img src="../../assets/images/error-head2.png"  v-if="!userlist.groupAvatar">
                <div class="nickName">{{userlist.groupName}}（{{userlist.groupCount}}）</div>
            <div class="text-box">
              <div>——</div> <div class="text">“{{userlist.nickName}} Invite you to EcahtAPP {{userlist.groupName}}”</div> <div>——</div> 
            </div>
          </div>
          <div  class="invite" v-else>
             <img :src="base.headUrl+userlist.userAvatar"  v-headError  v-if="userlist.userAvatar">
              <img src="../../assets/images/error-head.png"  v-if="!userlist.userAvatar">
              <div class="nickName">{{userlist.nickName}}</div>
              <div class="text-box">
              <div>——</div> <div class="text">“{{userlist.nickName}}” Invite you to EcahtAPP </div><div>——</div> 
            </div>
          </div>
      </div> 
			<div :class= "userinvite? 'form-content form-content2' : 'form-content'">
				<!-- <div class="form-title">
					<span>Phone</span>
				</div> -->
				<div class="form-item">
					<div class="item-input">
						<span @click="showCountryCode()" class="countrycode" v-text="send.phoneCode"></span>
						<input type="tel" @input="phoneChange()" maxlength="11" placeholder="Phone number" v-model="send.userName" class="tel">
					</div>
					<div class="item-code">
						<input type="tel" maxlength="4" placeholder="Phone verifyCode" v-model="send.verifyCode">
						<button class="getcode" :class="{frozen: isClick}" @click="getCode()" :disabled="isClick">{{txt}}</button>
					</div>
				</div>
				<div class="form-button">
					<a class="next" href="javascript:;" @click="submit();">Next</a>
				</div>
				<div class="agreement" id="agreement" :class="{active:ischecked}" @click="ischecked = !ischecked">
					<i></i>
					I have read and agree to the<br>
				</div>
         <span style="color: #46B4AA; font-size: .28rem;margin-left:.8rem" @click="showAgreement();">《User Agreement》</span>
         &<span style="color: #46B4AA; font-size: .28rem;" @click="showPrivacyPolicy();">《Privacy Policy》</span>
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
	import Agreement from '@/views/en-us/Agreement.vue'
	import PrivacyPolicy from '@/views/en-us/PrivacyPolicy.vue'
	export default {
		name: 'register',
		mixins: [register],
    	components: {
      		Agreement,
      		PrivacyPolicy
		},
	}
</script>
