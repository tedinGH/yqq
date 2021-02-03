<template>
	<div class="main">
		<div class="security-panel en-us">
			<h3 class="main-title crumb"><span class="em" @click="$router.push('/security')">Account Security</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div class="form">
				<p class="form-title mb60">The Email number you have bound is:{{data.email}}</p>
				<p class="mb60">For the sake of your account security, you need to re-verify before changing your email number. Please choose the way you need to verify.</p>
				<ul class="radio-box">
					<li>
						<label class="radio"><input type="radio" name="modifyType" @click="modifyType(1)">Using Verify Code<i></i></label>
						<div class="input-box" v-show="modify_Type==1">
							<input type="tel" class="input" ref="code" maxlength="4" placeholder="VerifyCode" autocomplete="off">
							<email-code v-model="data.email" indx="106"></email-code>
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
import logic from '../../mixins/security/modifyEmail'
	
export default {
	name: 'modifyEmail',
	mixins: [logic]
}
</script>
