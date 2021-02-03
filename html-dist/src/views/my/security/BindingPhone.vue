<template>
	<div class="main">
		<div class="security-panel">
			<h3 class="main-title crumb"><span class="em" @click="$router.push('/security')">အကောင့်လုံခြုံမူ</span><i>＞</i><span>ချိတ်ထားသောဖုန်းနံပါတ်</span></h3>
			<div class="form">
				<div class="mb60">
					<p class="font16">ဖုန္း</p>
					<div class="input-box" @click="showCountryCode">
						<input type="text" class="input" placeholder="နိုင်ငံ/‌ဒေသ ရှာဖွေခြင်း" :value="send.phoneCode+'  '+send.country" readonly>
						<img class="select" src="../../../assets/images/icon-right.png" />
						<div class="select-box" v-show="showSelect">
							<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
						</div>
					</div>
					<div class="input-box">
						<input type="number" class="input" ref="mobile" placeholder="ကျေးဇူးပြု၍ဖုန်းနံပါတ်ရိုက်ထည့်ပါ" v-model="phone">
					</div>
				</div>
				<div class="mb60">
					<p class="font16">ဖုန်းcodeနံပါတ</p>
					<div class="input-box">
						<input type="tel" class="input" ref="code" maxlength="4" placeholder="ကျေးဇူးပြု၍ စိစစ္နံပါတ္ကိုရိုက်ထည့်ပါ">
						<sms-code v-model="codePhone" :indx="indx" :codeKey="true"></sms-code>
					</div>
				</div>
				<button class="submit" @click="binding">ချိတ်ခြင်း</button>
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