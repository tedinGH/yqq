<template>
	<div class="m-wraper">
		<!-- 账号安全 -->
		<header>
			<span @click="goback"><i></i></span>{{name}}
		</header>
		<div class="title">Please choose what kind of illegal content</div>
		<div class="form-content">
			<loading v-if="listLoading"></loading>
			<div class="form-item" v-for="(item,index) in list" :key="index" @click="jump(item)">
				<span v-text="item.sonName"></span>
				<i></i>
			</div>
			<div class="form-item nodata" v-if="dataNone">No data options are available for the time being</div>
		</div>
		<div class="form-other" @click="showNotice=true">
			<span>Notice of Complaint</span>
		</div>
		<!-- 投诉须知弹层 -->
		<div class="fixed-page" :class="{active:showNotice}">
			<header>
				<span @click="showNotice=false"><i></i></span>Notice of Complaint
			</header>
			<div class="notice-content" v-text="noticeText"></div>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/complaint/complaintType'
	
export default {
	name: 'complaint-type',
	mixins: [logic]
}
</script>

<style lang="scss">
	@import "../../../assets/scss/mobile.scss"; 
</style>
