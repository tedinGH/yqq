<template>
	<div class="main" v-show="showPage">
		<div class="security-panel">
			<h3 class="main-title">အကောင့်လုံခြုံမူ</h3>
		</div>
		<div class="security-panel">
			<h3 class="title">မတ်ဆေ</h3>
			<div class="row">
				<span class="name">အကောင့်：</span><span v-if="data.mobile">{{data.mobile | filterPhone}}</span><span v-else>အကန့်အသတ်မရှိ</span>
			</div>
			<div class="row">
				<span class="name">EchatAPP ID：</span><span>{{data.userId}}</span>
			</div>
			<div class="row">
				<span class="name">အကောင့်လျိူ၀ှက်နံပါတ：</span><span>********</span><div class="operation" @click="$router.push({name:'forget-password'})">ပြုပြင်ခြင်း</div>
			</div>
		</div>
		<div class="security-panel">
			<h3 class="title">လျိူ၀ှက်codeနံပါတ်</h3>
			<div class="row">
				<div class="left">
					<img class="status-img" v-if="data.mobile" src="../../../assets/images/authenticated.png" />
					<img class="status-img" v-else src="../../../assets/images/uncertified.png"/>
					<span class="name">လက္ကိုင္ဖုန္းစိစစ္နံပါတ：</span><span v-if="data.mobile">{{data.mobile | filterPhone}}</span><span v-else>အကန့်အသတ်မရှိ</span>
				</div>
				<span class="grey">၀င်မည်,လျိူ၀ှက်နံပါတ်ပြန်ရှာဖွေမည်,လုံခြုံမူsetting</span>
				<div class="operation" v-if="data.mobile" @click="$router.push({name:'modify-phone'})">ပြုပြင်ခြင်း</div>
				<div class="operation" v-else @click="$router.push({name:'binding-phone'})">ချည်နှောင်ရန်</div>
			</div>
			<div class="row">
				<div class="left">
					<img class="status-img" v-if="data.email" src="../../../assets/images/authenticated.png" />
					<img class="status-img" v-else src="../../../assets/images/uncertified.png" />
					<span class="name">အီးေမးစိစစ္နံပါတ္：</span><span v-if="data.email">{{data.email | filterEmail}}</span><span v-else>အကန့်အသတ်မရှိ</span>
				</div>
				<span class="grey">၀င်မည်,လျိူ၀ှက်နံပါတ်ပြန်ရှာဖွေမည်,လုံခြုံမူsetting</span>
				<div class="operation" v-if="data.email" @click="$router.push({name:'modify-email'})">ပြုပြင်ခြင်း</div>
				<div class="operation" v-else @click="$router.push({name:'binding-email'})">ချည်နှောင်ရန်</div>
			</div>
			<div class="row">
				<div class="left">
					<img class="status-img" v-if="data.googleSwitch" src="../../../assets/images/authenticated.png" />
					<img class="status-img" v-else src="../../../assets/images/uncertified.png" />
					<span class="name">ကြက္ကဲစိစစ္နံပါတ：</span><span>{{data.googleSwitch?'ဖွင့်လှစ်':'မဖွင့်သေးပါ'}}</span>
				</div>
				<span class="grey">မွတ္ပံုတင္ျခင္းႏွင့္ျပဳျပင္ရာတြင္လံုျခံဳမႈရိွေစရန္ျပဳလုပ္ျခင္း</span>
				<div class="operation" v-if="data.googleSwitch" @click="$router.push({name:'stop-google'})">အနီးကပ်သွား</div>
				<div class="operation" v-else @click="googleVerify">ဖွင့်မည်</div>
			</div>
		</div>
		<code-component ref="code"  @codeConfirm="codeHandler"></code-component>
		<double-verify v-model="data" @verify="verifyHandler" ref="verify"></double-verify>
		<google-component v-model="data"  @google="googleHandler" ref="google"></google-component>
	</div>
</template>
 
<script> 
import logic from '../../mixins/security/index'
	
export default {
	name: 'security',
	mixins: [logic]
}
</script>