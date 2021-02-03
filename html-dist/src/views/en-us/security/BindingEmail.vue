<template>
	<div class="main">
		<div class="security-panel">
			<h3 class="main-title crumb"><span class="em" @click="$router.push('/security')">Account Security</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div class="form">
				<div class="mb60"> 
					<p class="font16">Email</p>
					<div class="input-box">
						<input type="text" class="input" ref="email" placeholder="Email" v-model="email">
					</div>
				</div>
				<div class="mb60">
					<p class="font16">Email VerifyCode<span class="right-tip">Validation mail may be misjudged as spam.</span></p>
					<div class="input-box">
						<input type="tel" class="input" ref="code" maxlength="4" placeholder="VerifyCode">
						<email-code v-model="email" :indx="indx" :codeKey="true"></email-code>
					</div>
				</div>
				<button class="submit" @click="binding">Binding</button>
			</div>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/security/bindingEmail'
	
export default {
	name: 'bindingEmail',
	mixins: [logic]
}
</script>
