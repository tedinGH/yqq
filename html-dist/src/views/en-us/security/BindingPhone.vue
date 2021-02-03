<template>
	<div class="main">
		<div class="security-panel">
			<h3 class="main-title crumb"><span class="em" @click="$router.push('/security')">Account Security</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div class="form">
				<div class="mb30">
					<p class="font16">Phone</p>
					<div class="input-box" @click="showCountryCode">
						<input type="text" class="input" :value="send.phoneCode + '  ' + send.country" readonly>
						<img class="select" src="../../../assets/images/icon-right.png" />
						<div class="select-box" v-show="showSelect">
							<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
						</div>
					</div>
					<div class="input-box">
						<input type="number" class="input" ref="mobile" placeholder="Phone number" v-model="phone">
					</div>
				</div>
				<div class="mb30">
					<p class="font16">Phone VerifyCode</p>
					<div class="input-box">
						<input type="tel" class="input" ref="code" maxlength="4" placeholder="VerifyCode">
						<sms-code v-model="codePhone" :indx="indx" :codeKey="true"></sms-code>
					</div>
				</div>
				<button class="submit" @click="binding">Binding</button>
			</div>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/security/bindingPhone'
	
export default {
	name: 'bindingPhone',
	mixins: [logic]
}
</script>
