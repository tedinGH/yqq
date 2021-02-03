<template>
	<div class="b-popup" v-show="showPopup">
		<div :class="['mask',showPopup?'in':'']"></div>
		<div :class="['b-popup-box comfirm-box',showPopup?'in':'']">
			<p class="tip-txt">{{data.tipText||"提示"}}</p>
			<button class="otc-Btn-s bgTheme" @click="comfirm">{{data.btnText||"确认"}}</button>
		</div>
	</div>
</template>

<script>
  export default {
    data (){
			return {
				data:{} //接受两个参数tipText、btnText
			}
		},
		computed:{
			showPopup(){
				return this.value
			}
		},	
		props: {
			value:{
				type:Boolean
			},
			content:{
				type:Object
			}
		},		
		methods: {
			comfirm() {
				this.$emit('comfirm',false);
			}
		},
		mounted(){
	    if (this.$options.propsData.content !== undefined) this.data = this.$options.propsData.content;
    }
  }
</script>




