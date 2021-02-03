<template>
	<div class="header">
		<span class="back" @click="back()"></span>
		<span>{{title}}</span>
	</div>
</template>

<script>
import { Util } from '@/utils/utils';
export default {
    name: 'PublicHeader',
    	data (){
      		return {
				device: Util.getEnvironmet(),
      		}
		},
		props:{
			title:{
				type:String,
				default:"标题"
			}
		},
    methods: {
      	back(){
      		//检测 IOS/Android
			if(this.device == 'IOS') window.webkit.messageHandlers.back.postMessage("");
			else if(this.device == 'Android') native.back();
      	}
    },
    mounted() {
		//检测 IOS/Android
		if(this.device == 'IOS'){
      		window.webkit.messageHandlers.hideNavbar.postMessage("");
		}
    }
}
</script>
<style lang="scss" scoped>
.header{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
	width: 100%;
	height: .75rem;
	font-size: .3rem;
	line-height: .75rem;
	text-align: center;
	background-color: #F7F7F7;
	.back{
		position: absolute;
		top: .2rem;
		left:.2rem;
		height: .33rem;
		width: .12rem;
		background: url(../../assets/images/agreement-back.png) no-repeat;
		background-size: contain;
	}
}
</style>