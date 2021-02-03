<template>
	<div class="m-wraper">
		<!-- 拉黑 -->
		<header v-if="type=='1'">
			<span @click="goback"><i></i></span>အနက်ရောင်စာရင်းထည့်ပါ
		</header>
		<div class="success-content" v-if="type=='1'">
			<img src="../../../assets/images/safe/success.png" />
			<div class="success-title">ပေးပို့ပြီး</div>
			<div class="mb30">သင္သည္တစ္ဖက္ေသာသူအားႏႈတ္ပိတ္လူစာရင္းထဲသို႔ထည့္သြင္းျပီးျဖစ္သည္။ထိုသူမွေပးပို႔ေသာအခ်က္အလက္မ်ားကိုလက္ခံရရိွေတာ့မည္မဟုတ္ပါ။</div>
			<div class="footer">
				<button type="button" @click="close">ပိတ်သည်</button>
			</div>
		</div>
		<!-- 投诉 -->
		<header v-if="type=='2'">
			<span @click="goback"><i></i></span>ပေးပို့ထားသောအချက်များကိုEchatAPP groupမှစစ်ဆေးပေးခြင်း
		</header>
		<div class="success-content" v-if="type=='2'">
			<img src="../../../assets/images/safe/success.png" />
			<div class="success-title">သင္၏တိုင္ၾကားစာကိုေပးပို႔ျပီးျဖစ္သည္။</div>
			<div class="mb30">EchatAPP groupမှလျင်မြန်သောစစ်ဆေးချက်,“EchatAPP group”ကစစ်ဆေးသောအဖြေကိုပေးပို့ပေးမည်,အားပေးမူကိုအထူးကျေးဇူးတင်ရှိပါသည်。	</div>
			<div class="footer">
				<button type="button" @click="close">ပိတ်သည်</button>
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