<template>
	<div class="main">
		<div class="security-panel">
			<h3 class="main-title crumb"><span class="em" @click="$router.push('/security')">အကောင့်လုံခြုံမူ</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div class="form">
				<div class="mb60">
					<p class="font16">အီးမေး</p>
					<div class="input-box">
						<input type="text" class="input" ref="email" placeholder="အီးမေး၏နေရပ်လိပ်စာကိုရိုက်ထည့်ရန်" v-model="email">
					</div>
				</div>
				<div class="mb60">
					<p class="font16">အီးမေးလ်အတည်ပြုကုဒ်<span class="right-tip">ကျေးဇူးပြု၍ အတည်ပြုအီးမေးလ်ကိုစစ်ဆေးပါ</span></p>
					<div class="input-box">
						<input type="tel" class="input" ref="code" maxlength="4" placeholder="ကျေးဇူးပြု၍ အတည်ပြုနံပတ်ရိုက်ထည့်ရန်">
						<email-code v-model="email" :indx="indx" :codeKey="true"></email-code>
					</div>
				</div>
				<button class="submit" @click="binding">ချည်နှောင်</button>
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
