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
				<div class="footer-title">Have you solved your problem?
					<span class="solve" @click="updateSolve('1',solve)" :class="{active: solve}"><i></i>Solved</span>
					<span class="nosolve" @click="isUpdate=!isUpdate" :class="{active: !solve&&!isUpdate}"><i></i>Unresolved</span>
				</div>
				<div class="footer-tab" v-show="!solve&&!isUpdate">
					<div class="tab-title"><span>Unresolved causes (optional)</span></div>
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
					text:'The description is not clear',
					selected:false,
				},
				{
					type:'3',
					text:'Unresolved after operation',
					selected:false,
				},
				{
					type:'4',
					text:'The rules are unreasonable',
					selected:false,
				},
				{
					type:'5',
					text:'Poor functionality',
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
