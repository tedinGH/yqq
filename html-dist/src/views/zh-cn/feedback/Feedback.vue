<template>
	<div class="feedback-wraper">
		<header>
			<span @click="close()"><i></i></span>
			帮助与反馈
		</header>
		<div class="feedback-title">
			<img class="item-icon" src="../../../assets/images/logo/logo.png">
			<p>EchatAPP</p>
		</div>
		<div class="feedback-form">
			<div class="form-title">
				<i class="all"></i>全部问题<span @click="jump(list[0])">更多</span>
			</div>
			<div class="form-content">
				<p>问题类型:</p>
				<ul>
					<loading v-if="allLoading"></loading>
					<li v-for="(item,index) in all" @click="jumpItem(item,1)" :key="index"><i>{{index+1}}</i><span v-text="item.helpName"></span></li>
					<li v-show="allNone"><i>!</i>暂无数据</li>
				</ul>
			</div>
		</div>
		<div class="feedback-form mt15" v-if="list[1].userId!=0">
			<div class="form-title">
				<i class="feedback"></i>意见反馈<span @click="jump(list[1])">更多</span>
			</div>
			<div class="form-content">
				<p>请选择问题发生的情况:</p>
				<ul>
					<loading v-if="feedbackLoading"></loading>
					<li v-for="(item,index) in feedback" @click="jumpItem(item,2)" :key="index"><i>{{index+1}}</i><span v-text="item.helpName"></span></li>
					<li v-show="feedbackNone"><i>!</i>暂无数据</li>
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