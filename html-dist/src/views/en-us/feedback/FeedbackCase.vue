<template>
	<div class="feedback-wraper">
		<header>
			<span @click="goback"><i></i></span>
			{{helpName}}
		</header>
		<div class="title">
			<p v-if="type=='1'">Common problem</p>
			<p v-if="type=='2'">Please select the problems you encounter.</p>
		</div>
		<div class="form-content">
			<loading v-if="listLoading"></loading>
			<div class="form-item" v-for="(item,index) in list" :key="index" @click="jump(item)">
				<span v-text="item.helpName"></span>
				<i></i>
			</div>
			<div class="form-item nodata" v-if="dataNone">No data options are available for the time being</div>
			<div class="form-item" @click="goToOther()" v-if="type=='2'">
				<span>Other abnormal feedback</span>
				<i></i>
			</div>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/feedback/feedbackCase';
	
export default {
	name: 'feedbackCase',
	mixins: [logic]
}
</script>

<style lang="scss">
	@import "../../../assets/scss/feedback.scss"; 
</style>