<template>
	<div class="m-wraper">
		<header>
			<span @click="close()"><i></i></span>投诉
		</header>
		<div class="title" v-if="type=='1'">请选择投诉该账号原因</div>
		<div class="title" v-if="type=='2'">请选择投诉该群（成员）原因</div>
		<div class="form-content">
			<loading v-if="listLoading"></loading>
			<div class="form-item" v-for="(item,index) in list" :key="index" @click="jump(item)">
				<span v-text="item.complainName"></span>
				<i></i>
			</div>
			<div class="form-item nodata" v-if="dataNone">暂无数据选项</div>
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
import logic from '../../mixins/complaint/complaint'
	
export default {
	name: 'complaint',
	mixins: [logic]
}
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/mobile.scss"; 
</style>