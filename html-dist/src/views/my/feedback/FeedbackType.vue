<template>
	<div class="feedback-wraper">
		<!-- 账号安全 -->
		<header>
			<span @click="goBack()"><i></i></span>
			{{helpName}}
		</header>
		<div class="title">
			<p v-if="type=='1'">ပြသနာအမျိုးစား</p>
			<p v-if="type=='2'">ကျေးဇူးပြု၍ဖြစ်ပေါ်နေသည့်ပြသနာကိုရွေးချယ်ပြီးပေးပို့ပါ</p>
		</div>
		<div class="form-content">
			<loading v-if="listLoading"></loading>
			<div class="form-item" @click="jump(item)" v-for="(item,index) in list" :key="index">
				<span v-text="item.helpName"></span>
				<i></i>
			</div>
			<div class="form-item nodata" v-if="dataNone">ခုရွေးချ,်၍မရပါ</div>
			<div v-if="type=='2'" class="form-item" @click="goToOther()">
				<span>အခြားအမြင်တုံ့ပြန်မူ</span>
				<i></i>
			</div>
		</div>
		<div v-if="type=='1' && userId!=0" class="form-other" @click="goToType()">
			<span>အမြင်တုံ့ပြန်မူ</span>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/feedback/feedbackType';
	
export default {
	name: 'feedbackType',
	mixins: [logic]
}
</script>

<style lang="scss">
	@import "../../../assets/scss/feedback.scss"; 
</style>
