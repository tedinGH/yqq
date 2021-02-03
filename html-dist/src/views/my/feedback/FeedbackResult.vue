<template>
	<div class="feedback-wraper">
		<header>
			<span @click="goback"><i></i></span>
			{{helpName}}
		</header>
		<section class="result-content">
			<div class="result-title" v-text="page.problemName"></div>
			<div class="result-html" id="content" v-html="page.content"></div>
			<div class="result-footer">
				<div class="footer-title">有没有解决您的问题：
					<span class="solve" @click="updateSolve('1',solve)" :class="{active: solve}"><i></i>解决了</span>
					<span class="nosolve" @click="isUpdate=!isUpdate" :class="{active: !solve&&!isUpdate}"><i></i>未解决</span>
				</div>
				<div class="footer-tab" v-show="!solve&&!isUpdate">
					<div class="tab-title"><span>未解决原因（可多选）</span></div>
					<div class="tab-conetnt">
						<div class="tab-item" 
							:class="{active: item.selected==true}" 
							v-for="(item,index) in typeList" 
							:key="index"
							@click="updateType(item)"
						>{{item.text}}</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script> 
import logic from '../../mixins/feedback/feedbackResult';
	
export default {
	name: 'feedbackResult',
	mixins: [logic],
	data (){
		return {
			typeList:[
				{
					type:'2',
					text:'描述不清楚',
					selected:false,
				},
				{
					type:'3',
					text:'操作后未解决',
					selected:false,
				},
				{
					type:'4',
					text:'规则不合理',
					selected:false,
				},
				{
					type:'5',
					text:'功能不好用',
					selected:false,
				},
			]
		}
	},
}
</script>

<style lang="scss">
	@import "../../../assets/scss/feedback.scss";
</style>
