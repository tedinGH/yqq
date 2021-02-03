<template>
	<div class="main">
		<div class="security-panel">
			<h3 class="main-title crumb"><span class="em" @click="$router.push('/security')">အကောင့်လုံခြုံမူ</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div class="form">
				<p class="form-title mb60">သင်ချိတ်ထားသော အီးမေးအကောင့်သည်：{{data.email}}</p>
				<p class="mb60">သင်၏အကောင့်လုံခြုံရေးအတွက်စာတိုက်ပုံးနံပါတ်မပြောင်းမီပြန်လည်စစ်ဆေးရန်လိုအပ်သည်။ သင်အတည်ပြုရန်လိုအပ်သည့်နည်းလမ်းကို ကျေးဇူးပြု၍ ရွေးချယ်ပါ။</p>
				<ul class="radio-box">
					<li>
						<label class="radio my"><input type="radio" name="modifyType" @click="modifyType(1)">code နံပါတ်အသုံးပြုခြင်း<i></i></label>
						<div class="input-box my" v-show="modify_Type==1">
							<input type="tel" class="input" ref="code" maxlength="4" placeholder="ကျေးဇူးပြု၍ codeရိုက်ထည့်ပါ" autocomplete="off">
							<email-code v-model="data.email" indx="106"></email-code>
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
import logic from '../../mixins/security/modifyEmail'
	
export default {
	name: 'modifyEmail',
	mixins: [logic]
}
</script>
