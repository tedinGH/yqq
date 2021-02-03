<template>
	<div class="main">
		<div class="security-panel">
			<h3 class="main-title crumb"><span class="em" @click="$router.push('/security')">账号安全</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div class="form">
				<div class="mb60">
					<p class="font16">手机</p>
					<div class="input-box" @click="showCountryCode">
						<input type="text" class="input" placeholder="请选择国家和地区" :value="send.phoneCode+'  '+send.country" readonly>
						<img class="select" src="../../../assets/images/icon-right.png" />
						<div class="select-box" v-show="showSelect">
							<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
						</div>
					</div>
					<div class="input-box">
						<input type="number" class="input" ref="mobile" placeholder="请输入手机号码" v-model="phone">
					</div>
				</div>
				<div class="mb60">
					<p class="font16">手机验证码</p>
					<div class="input-box">
						<input type="tel" class="input" ref="code" maxlength="4" placeholder="请输入验证码">
						<sms-code v-model="codePhone" :indx="indx" :codeKey="true"></sms-code>
					</div>
				</div>
				<button class="submit" @click="binding">绑定</button>
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
