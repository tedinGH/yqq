<template>
	<div class="m-wraper">
		<header>
			<span @click="close()"><i></i></span>တိုင်ခံရခြင်း
		</header>
		<div class="title my" v-if="type=='1'">ထိုအေကာင့္ကိုတိုင္ၾကားရျခင္း၏အေၾကာင္းအရင္းကိုေရးသားပါ</div>
		<div class="title" v-if="type=='2'">ကျေးဇူးပြု၍ ဤအုပ်စု (အသင်း ၀ င်) အားတိုင်ကြားခြင်းအတွက်အကြောင်းပြချက်ကိုရွေးချယ်ပါ။</div>
		<div class="form-content">
			<loading v-if="listLoading"></loading>
			<div class="form-item my" v-for="(item,index) in list" :key="index" @click="jump(item)">
				<span v-text="item.complainName"></span>
				<i></i>
			</div>
			<div class="form-item my nodata" v-if="dataNone">ခုရွေးချ,်၍မရပါ</div>
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
import logic from '../../mixins/complaint/complaint'
	
export default {
	name: 'complaint',
	mixins: [logic]
}
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/mobile.scss"; 
</style>