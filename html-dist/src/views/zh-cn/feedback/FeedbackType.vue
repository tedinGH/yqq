<template>
	<div class="feedback-wraper">
		<!-- 账号安全 -->
		<header>
			<span @click="goBack()"><i></i></span>
			{{helpName}}
		</header>
		<div class="title">
			<p v-if="type=='1'">问题类型</p>
			<p v-if="type=='2'">请选择问题发生的情况</p>
		</div>
		<div class="form-content">
			<loading v-if="listLoading"></loading>
			<div class="form-item" @click="jump(item)" v-for="(item,index) in list" :key="index">
				<span v-text="item.helpName"></span>
				<i></i>
			</div>
			<div class="form-item nodata" v-if="dataNone">暂无数据选项</div>
			<div v-if="type=='2'" class="form-item" @click="goToOther()">
				<span>其他意见反馈</span>
				<i></i>
			</div>
		</div>
		<div v-if="type=='1' && userId!=0" class="form-other" @click="goToType()">
			<span>意见反馈</span>
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
