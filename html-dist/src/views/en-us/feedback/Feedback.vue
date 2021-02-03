<template>
	<div class="feedback-wraper">
		<header>
			<span @click="close()"><i></i></span>
			Help and Feedback
		</header>
		<div class="feedback-title">
			<img class="item-icon" src="../../../assets/images/logo/logo.png">
			<p>EchatAPP</p>
		</div>
		<div class="feedback-form">
			<div class="form-title">
				<i class="all"></i>All Questions<span @click="jump(list[0])">More</span>
			</div>
			<div class="form-content">
				<p>Catgories:</p>
				<ul>
					<loading v-if="allLoading"></loading>
					<li v-for="(item,index) in all" @click="jumpItem(item,1)" :key="index"><i>{{index+1}}</i><span v-text="item.helpName"></span></li>
					<li v-show="allNone"><i>!</i>No Data</li>
				</ul>
			</div>
		</div>
		<div class="feedback-form mt15" v-if="list[1].userId!=0">
			<div class="form-title">
				<i class="feedback"></i>Feedback<span @click="jump(list[1])">More</span>
			</div>
			<div class="form-content">
				<p>Please select the scenario where the problem occurs:</p>
				<ul>
					<loading v-if="feedbackLoading"></loading>
					<li v-for="(item,index) in feedback" @click="jumpItem(item,2)" :key="index"><i>{{index+1}}</i><span v-text="item.helpName"></span></li>
					<li v-show="feedbackNone"><i>!</i>No Data</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/feedback/feedback'	
export default {
	name: 'feedback',
	mixins: [logic]
}
</script>
<style lang="scss">
	@import "../../../assets/scss/feedback.scss"; 
</style>