<template>
	<div class="feedback-wraper">
		<!-- 账号安全 -->
		<header>
			<span @click="goBack()"><i></i></span>
			{{helpName}}
		</header>
		<div class="title">
			<p v-if="type=='1'">Type of problem</p>
			<p v-if="type=='2'">Please choose what happened to the problem.</p>
		</div>
		<div class="form-content">
			<loading v-if="listLoading"></loading>
			<div class="form-item" @click="jump(item)" v-for="(item,index) in list" :key="index">
				<span v-text="item.helpName"></span>
				<i></i>
			</div>
			<div class="form-item nodata" v-if="dataNone">No data options are available for the time being</div>
			<div v-if="type=='2'" class="form-item" @click="goToOther()">
				<span>Other feedback</span>
				<i></i>
			</div>
		</div>
		<div v-if="type=='1' && userId!=0" class="form-other" @click="goToType()">
			<span>Feedback</span>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/feedback/feedbackType'
	
export default {
	name: 'feedbackType',
	mixins: [logic]
}
</script>

<style lang="scss">
	@import "../../../assets/scss/feedback.scss"; 
</style>
