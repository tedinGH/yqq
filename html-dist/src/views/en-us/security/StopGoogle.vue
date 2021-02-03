<template>
	<div class="main">
		<div class="security-panel">
			<h3 class="main-title crumb"><span class="em">Account Security</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div class="form">
				<div class="mb30">
					<p class="font16">Login Password</p>
					<div class="input-box">
						<input type="password" maxlength="20" class="input" ref="psw" placeholder="Password" autocomplete="new-password"/>
					</div>
				</div>
				<div class="mb30">
					<p class="font16">Google VerifyCode</p>
					<div class="input-box">
						<input type="tel" maxlength="6" class="input" ref="code" placeholder="Google Verify Code">
					</div>
					<p class="textR font16">Loss of Google VerifyCode？<span class="goto" @click="$router.push('/google-code')">click here</span></p>
				</div>
				<button class="submit" @click="stopGoogle">Discontinue Google Verification</button>
			</div>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/security/stopGoogle'
	
export default {
	name: 'stopGoogle',
	mixins: [logic]
}
</script>
