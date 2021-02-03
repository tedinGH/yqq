<template>
	<div class="main">
		<div class="security-panel">
			<h3 class="main-title crumb"><span class="em" @click="$router.push('/security')">အကောင့်လုံခြုံမူ</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div class="form">
				<p class="form-title mb60">သင်ချိတ်ထားသောဖုန်းနံပါတ်သည်：{{data.mobile}}</p>
				<p class="mb60">သင့်ရဲ့အကောင့်လုံခြုံမူအတွက်,ဖုန်းနံပါတ်ပြောင်းမည်ဆိုပါကcodeနံပါတ်နောက်တကြိမ်ရ,ူပါ,ကျေးဇူးပြု၍codeနံပါတ်ရ,ူမည်ပုံစံရွေးချ,်ပါ</p>
				<ul class="radio-box">
					<li>
						<label class="radio my"><input type="radio" name="modifyType" @click="modifyType(1)">code နံပါတ်အသုံးပြုခြင်း<i></i></label>
						<div class="input-box my" v-show="modify_Type==1">
							<input type="tel" class="input" ref="code" maxlength="4" placeholder="ကျေးဇူးပြု၍ codeရိုက်ထည့်ပါ" autocomplete="off">
							<sms-code v-model="data.mobile" indx="10007"></sms-code>
						</div>
					</li>
					<li>
						<label class="radio my"><input type="radio" name="modifyType" @click="modifyType(2)">လျိူ၀ှက်နံပါတ်အသုံးပြုခြင်း<i></i></label>
						<div class="input-box my" v-show="modify_Type==2">
							<input type="password" maxlength="20" class="input" ref="psw" placeholder="ကျေးဇူးပြု၍ login password ရိုက်ပါ" autocomplete="new-password">
						</div>
					</li>
				</ul>
				<button class="submit" @click="next">နောက်တဆင့်</button>
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
