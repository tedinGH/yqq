<template>
  	<div class="on-center">
	    <!-- 第一步 -->
	    <div class="wraper">
	    	<div class="title">Register</div>
	    	<div class="tip">
					<span @click="chickTab(1)" :class="{active: tab=='1'}">Phone</span>
					<span @click="chickTab(2)" :class="{active: tab=='2'}">Email</span>
	    	</div>
	    	<div class="form-content">
	    		<form autocomplete="off">
	    			<div class="form-item" v-show="tab=='1'">
	    				<div class="item-label">
	    					<span class="input_label">Phone number</span>
	    				</div>
	    				<div class="item-input">
								<span class="countrycode" v-text="send.phoneCode" @click="showSelect=!showSelect;"></span>
								<div class="select-box" v-show="showSelect">
									<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
								</div>
								<input type="number" placeholder="Phone number" v-model="send.userName" class="tel">
							</div>
	    				<div class="item-label">
	    					<span class="input_label">VerifyCode</span>
	    				</div>
	    				<div class="item-code">
							<input type="tel" maxlength="4" placeholder="Phone verifyCode" v-model="send.verifyCode">
							<div class="floatR">
	    						<button class="get-code" type="button" @click="getPhone()" :disabled="isClick">{{codeText}}</button>
	    					</div>
	    				</div>
	    			</div>
	    			<div class="form-item" v-show="tab=='2'">
	    				<div class="item-label">
	    					<span class="input_label">Email</span>
	    				</div>
	    				<div class="item-input">
							<input type="text" placeholder="Email" v-model="send.userName">
	    				</div>
	    				<div class="item-label">
	    					<span class="input_label">VerifyCode</span>
	    				</div>
	    				<div class="item-code">
							<input type="tel" maxlength="4" placeholder="Email verifyCode" v-model="send.verifyCode">
							<div class="floatR">
	    						<button class="get-code" type="button" @click="getEmail();" :disabled="isClick">{{codeText}}</button>
	    					</div>
	    				</div>
	    			</div>
	    			<div class="checkbox" :class="{active:ischecked}" @click="ischecked = !ischecked">
	    				<i></i>
	    				<p>I have read and agree to the<br><span class="udl" @click="showAgreement();">《User Agreement》</span>&<span class="udl" @click="showPrivacyPolicy();">《Privacy Policy》</span></p>
	    			</div>
	    		</form>
	    	</div>
			<div class="footer">
	    	<button type="button" @click="submit();">Next 1/3</button>
				<div class="item-help">Already have an account? <router-link to="/login">Login</router-link>
				</div>
			</div>
	    </div>
		<CodeComponent ref="code"  @codeConfirm="codeLoginHandler"></CodeComponent>
		<Agreement ref="agreement"></Agreement>
		<PrivacyPolicy ref="privacyPolicy"></PrivacyPolicy>
		<div class="b-popup" v-show="showMsg">
			<div :class="['mask',showMsg?'in':'']" @click="showMsg=false"></div>
			<div :class="['b-popup-box register',showMsg?'in':'']">
				<div>
					<span v-show="tab=='1'">The mobile phone number has been registered</span>
					<span v-show="tab=='2'">The mailbox number has been registered</span>
				</div>
				<button class="cancel" @click="showMsg=false;">Cancel</button>
				<button class="comfirm" @click="goLogin()">Login</button>
			</div>
		</div>
 	</div>
</template>

<script>
	import logic from '../../mixins/other/register';
	import Agreement from '@/views/en-us/other/Agreement'
	import PrivacyPolicy from '@/views/en-us/other/PrivacyPolicy'
	export default {
		name: 'register',
		mixins: [logic],
		components: { 
			Agreement,
			PrivacyPolicy
		},
	}
</script>