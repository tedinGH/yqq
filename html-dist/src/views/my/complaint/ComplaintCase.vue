<template>
	<div class="m-wraper">
		<header>
			<span @click="goback"><i></i></span>{{name}}
		</header>
		<div class="title">သင်လုပ်နိုင်ပါသည်</div>
		<div class="form-content">
			<div class="form-item my" @click="jump(2)">
				<span>ပေးပို့ထားသောအချက်များကိုEchatAPP groupမှစစ်ဆေးပေးခြင်း</span>
				<i></i>
			</div>
			<div class="form-item my" @click="jump(1)">
				<span>ထိုအေကာင့္ပိုင္ရွင္ကိုႏႈတ္ပိတ္လူစာရင္း(black list)ထဲသို႔သြင္းျခင္း</span>
				<i></i>
			</div>
		</div>
		<div class="form-other" @click="showNotice=true">
			<span>တိုင္ၾကားရာတြင္သိရိွရမည့္အခ်က္မ်ား</span>
		</div>
		<!-- 投诉须知弹层 -->
		<div class="fixed-page" :class="{active:showNotice}">
			<header>
				<span @click="showNotice=false"><i></i></span>တိုင္ၾကားရာတြင္သိရိွရမည့္အခ်က္မ်ား
			</header>
			<div class="notice-content" v-text="noticeText"></div>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/complaint/complaintCase'
	
export default {
	name: 'complaint-case',
	mixins: [logic]
}
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/mobile.scss"; 
</style>
