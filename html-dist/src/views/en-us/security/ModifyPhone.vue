<template>
	<div class="main">
		<div class="security-panel en-us">
			<h3 class="main-title crumb"><span class="em" @click="$router.push('/security')">Account Security</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div class="form">
				<p class="form-title mb60">The mobile phone number you have bound is:{{data.mobile}}</p>
				<p class="mb60">For the sake of your account security, you need to re-verify your mobile phone number before changing it. Please choose the way you need to verify it.</p>
				<ul class="radio-box">
					<li>
						<label class="radio"><input type="radio" name="modifyType" @click="modifyType(1)">Using Verify Code<i></i></label>
						<div class="input-box" v-show="modify_Type==1">
							<input type="tel" class="input" ref="code" maxlength="4" placeholder="VerifyCode" autocomplete="off">
							<sms-code v-model="data.mobile" indx="10007"></sms-code>
						</div>
					</li>
					<li>
						<label class="radio"><input type="radio" name="modifyType" @click="modifyType(2)">Using Password<i></i></label>
						<div class="input-box" v-show="modify_Type==2">
							<input type="password" maxlength="20" class="input" ref="psw" placeholder="Password" autocomplete="new-password">
						</div>
					</li>
				</ul>
				<button class="submit" @click="next">Next</button> 
			</div>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/security/modifyPhone'
	
export default {
	name: 'modifyPhone',
	mixins: [logic]
}
</script>
