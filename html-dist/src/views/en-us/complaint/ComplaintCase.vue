<template>
	<div class="m-wraper">
		<header>
			<span @click="goback"><i></i></span>{{name}}
		</header>
		<div class="title">You can</div>
		<div class="form-content">
			<div class="form-item" @click="jump(2)">
				<span>Submitted to the EchatAPP team for review</span>
				<i></i>
			</div>
			<div class="form-item" @click="jump(1)">
				<span>Pull this account blacklist</span>
				<i></i>
			</div>
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
import logic from '../../mixins/complaint/complaintCase'
	
export default {
	name: 'complaint-case',
	mixins: [logic]
}
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/mobile.scss"; 
</style>
