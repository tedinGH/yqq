<template>
	<div class="wraper account">
		<!-- 未冻结 -->
		<div class="safe-content" v-if="!isFrozen">
			<img src="../../../assets/images/safe/symbol.png" />
			<div  class="symbol">အကောင့်ကိုလောခ်ကျ‌အောင်လုပ်ပြီး အကောင့်ငွေသားများထိန်းသိမ်းထားပေးခြင်း</div>
			<div>အရင်ကအကောင့်：
				<span v-if="frozenInfo.tab == '1'">{{this.frozenInfo.userName | filterPhone}}</span>
				<span v-else>{{this.frozenInfo.userName | filterEmail}}</span>
			</div>
			<div>ကျေးဇူးပြု၍ ဖုန်းပျောက်ကွယ်သွားသောအချိန် (သို့) ငွေသားအန္တရာယ်များဖြစ်ပေါ်သောအချိန်တွင် ,အကောင့်ကိုလောခ်ကျပေးပါ</div>
		</div>
		<!-- 冻结成功 -->
		<div class="safe-content" v-else>
			<img src="../../../assets/images/safe/frozen.png" />
			<div>ခုအကောင့်လောခ်ကျနေသည်, အကယ်၍ပုံမှန်အသုံးပြုလိုလျှင်, လောခ်ကိုပြန်ဖြည်ပါ</div>
			<div>အရင်ကအကောင့်：
				<span v-if="frozenInfo.tab == '1'">{{this.frozenInfo.userName | filterPhone}}</span>
				<span v-else>{{this.frozenInfo.userName | filterEmail}}</span>
			</div>
		</div>
		<div class="footer">
			<button type="button" @click="next" v-if="!isFrozen">ချက်ချင်းလောခ်ကျအောင်လုပ်မည်</button>
			<button type="button" @click="$router.push({name: 'account-safe'})" v-else>အကောင့်လုံခြုံမူကိုပြန်သွားမည်</button>
		</div>
		<div class="b-popup" v-show="showMsg">
			<div :class="['mask',showMsg?'in':'']" @click="showMsg=false"></div>
			<div :class="['b-popup-box register',showMsg?'in':'']">
				<div>
					<p>လောခ်ကျပြီးနောက်,လောခ်ပြန်ဖြည်မှသာ ပုံမှန်အသုံးပြုနိုင်သည်,</p>
					<p>လောခ်ကျအောင်လုပ်မည်သေချာသလား?</p>
				</div>
				<button class="cancel" @click="showMsg=false">ဖျက်သိမ်း</button>
				<button class="comfirm"  @click="doFrozenUser">အတည်ပြု</button>
			</div>
		</div>
	</div>
</template>

<script>
import api from '@/api'

export default {
    name: 'frozen-state',
    data (){
		return {
			frozenInfo:{},
			showMsg:false,
			isFrozen:false
		}
    },
    methods: {
		doFrozenUser() {
			let postData = {
				userName: this.frozenInfo.userName,
				verifyCode: this.frozenInfo.verifyCode,
				selectionCodeKey: this.$store.state.selectionCodeKey,
			}
			api.frozenUser(postData).then(
				data => {
					this.$toast(data);
					this.isFrozen = true;
					this.showMsg = false;
				},() => {
          this.$router.push({name:'account-frozen'});
        }
			)
		},
		next(){
			this.showMsg = true;
		}
    },
    mounted() {
		this.frozenInfo = JSON.parse(sessionStorage.getItem('frozenInfo'))
		if(this.frozenInfo){
			if(this.frozenInfo.status==2) this.isFrozen = true
		}
		else this.$router.push({name:'account-frozen'})
    }
}
</script>