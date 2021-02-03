<template>
	<div class="m-wraper">
		<!-- 拉黑 -->
		<header>
			<span @click="goback"><i></i></span>Pull black
		</header>
		<div class="success-content" v-if="type=='1'">
			<img src="../../../assets/images/safe/success.png" />
			<div class="success-title">Submitted</div>
			<div class="mb30">Having blackened the other party, you will no longer accept the other party's news. If necessary, you can modify the blacklist settings by choosing "the other party - details - data settings"</div>
			<div class="footer">
				<button type="button" @click="close">Close</button>
			</div>
		</div>
		<!-- 投诉 -->
		<header>
			<span @click="goback"><i></i></span>Submit to EchatAPP Group for Audit
		</header>
		<div class="success-content" v-if="type=='2'">
			<img src="../../../assets/images/safe/success.png" />
			<div class="success-title">Your complaint has been submitted.</div>
			<div class="mb30">The EchatAPP team will verify as soon as possible and inform you of the results through the “EchatAPP Team”. Thank you for your support.</div>
			<div class="footer">
				<button type="button" @click="close">Close</button>
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