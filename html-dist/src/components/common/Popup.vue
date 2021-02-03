<template>
	<div class="b-popup" v-show="showPopup">
		<div :class="['mask',showPopup?'in':'']" @click="show"></div>
		<div :class="['b-popup-box',showPopup?'in':'']" :style="{width:dwidth?dwidth+'px':'446px'}">
			<slot></slot>
			<img src="../../assets/images/otc/close.png" class="close" @click="show" v-if="icon">
		</div>
	</div>
</template>

<script>
  export default {
    data (){
		return {
			showPopup:false,
			dwidth:'',
			icon:false
		}
	},	
	props: {
		width:{
			type:String
		},
		close:{
			type:Boolean
		}
	},			
    methods: {
		show() {
			this.showPopup = !this.showPopup;
		}
	},
	mounted(){
	    if (this.$options.propsData.width !== undefined) this.dwidth = this.$options.propsData.width;
	    if (this.$options.propsData.close !== undefined) this.icon = this.$options.propsData.close;
    }
  }
</script>




