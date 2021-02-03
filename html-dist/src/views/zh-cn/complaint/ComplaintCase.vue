<template>
	<div class="m-wraper">
		<header>
			<span @click="goback"><i></i></span>{{name}}
		</header>
		<div class="title">您可以</div>
		<div class="form-content">
			<div class="form-item" @click="jump(2)">
				<span>提交给EchatAPP团队审核</span>
				<i></i>
			</div>
			<div class="form-item" @click="jump(1)">
				<span>把此账户拉入黑名单</span>
				<i></i>
			</div>
		</div>
		<div class="form-other" @click="showNotice=true">
			<span>投诉须知</span>
		</div>
		<!-- 投诉须知弹层 -->
		<div class="fixed-page" :class="{active:showNotice}">
			<header>
				<span @click="showNotice=false"><i></i></span>投诉须知
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
