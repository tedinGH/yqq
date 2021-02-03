<template>
	<div class="m-wraper">
		<!-- 拉黑 -->
		<header>
			<span @click="goback"><i></i></span>拉黑
		</header>
		<div class="success-content" v-if="type=='1'">
			<img src="../../../assets/images/safe/success.png" />
			<div class="success-title">已提交</div>
			<div class="mb30">已经把对方拉黑，您将不再接受对方的消息。<br>如有需要，您可以在选择“对方-详情-资料设置”修改黑名单设置</div>
			<div class="footer">
				<button type="button" @click="close">关闭</button>
			</div>
		</div>
		<!-- 投诉 -->
		<header>
			<span @click="goback"><i></i></span>提交给EchatAPP团队审核
		</header>
		<div class="success-content" v-if="type=='2'">
			<img src="../../../assets/images/safe/success.png" />
			<div class="success-title">您的投诉已提交</div>
			<div class="mb30">EchatAPP团队会尽快核实，并通过“EchatAPP团队”通知您处理结果。感谢您的大力支持。	</div>
			<div class="footer">
				<button type="button" @click="close">关闭</button>
			</div>
		</div>
	</div>
</template>

<script>
import { Util } from '@/utils/utils';

export default {
	name: 'complain-success',
	data (){
		return {
			type:'1', 
		}
	},
	methods: {
		goback(){
			window.history.go(-1)
		}, 
	  close(){
	    let device = Util.getEnvironmet()
			if(device == 'IOS') window.webkit.messageHandlers.back.postMessage("")
			else if(device == 'Android') native.back()
			else console.log('PC')
	  }
	},
	mounted() {
		this.type = this.$route.params.type
	}
}
</script>

<style lang="scss">
	@import "../../../assets/scss/mobile.scss"; 
</style>