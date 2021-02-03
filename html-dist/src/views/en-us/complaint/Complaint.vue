<template>
	<div class="m-wraper">
		<header>
			<span @click="close()"><i></i></span>Complaint
		</header>
		<div class="title" v-if="type=='1'">Please select the reason for complaining about this account.</div>
		<div class="title" v-if="type=='2'">Please select the reasons for complaining about the group (members)</div>
		<div class="form-content">
			<loading v-if="listLoading"></loading>
			<div class="form-item" v-for="(item,index) in list" :key="index" @click="jump(item)">
				<span v-text="item.complainName"></span>
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
import logic from '../../mixins/complaint/complaint'
	
export default {
	name: 'complaint',
	mixins: [logic]
}
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/mobile.scss"; 
</style>