<template>
	<div class="wraper comfirm-psw">
		<div class="title">အီချက် ကောင့်ဖွင့်မည်</div>
		<!-- 确认密码 -->
		<div class="form-content" v-if="status==2">
			<form autocomplete="off">
				<div class="form-item mt40">
					<div class="item-label">
						<span class="input_label">အကောင့်လျိူ၀ှက်နံပါတ်</span>
					</div>
					<div class="item-input">
						<input type="text" maxlength="20" autocomplete="off" placeholder="ကျေးဇူးပြု၍  စကား၀ှက်နံပါတ်ရိုက်ထည့်ပေးပါ" v-model="send.firstpwd"  v-if="showFirstpwd" />
						<input type="password" maxlength="20" autocomplete="off" placeholder="ကျေးဇူးပြု၍  စကား၀ှက်နံပါတ်ရိုက်ထည့်ပေးပါ" v-model="send.firstpwd"  v-if="!showFirstpwd" />
						<div class="eyes" :class="{active: showFirstpwd}" @click.stop="showFirstpwd=!showFirstpwd"></div>
					</div>
					<div class="item-label">
						<span class="input_label">အတည်ပြုအကောင့်လျိူ၀ှက်နံပါတ်</span>
					</div>
					<div class="item-input">
						<input type="text" maxlength="20" autocomplete="off" placeholder="ကျေးဇူးပြု၍  စကား၀ှက်နံပါတ်ကိုနောက်တစ်ကြိမ်ရိုက်ထည့်ပေးပါ" v-model="send.secondpwd" v-if="showSecondpwd" />
						<input type="password" maxlength="20" autocomplete="off" placeholder="ကျေးဇူးပြု၍  စကား၀ှက်နံပါတ်ကိုနောက်တစ်ကြိမ်ရိုက်ထည့်ပေးပါ" v-model="send.secondpwd" v-if="!showSecondpwd" />
						<div class="eyes" :class="{active: showSecondpwd}" @click.stop="showSecondpwd=!showSecondpwd"></div>
					</div>
				</div>
			</form>
		</div>
		<!-- 注册成功 -->
		<div class="status-content" v-else-if="status==1">
			<img class="my" src="../../../assets/images/success.png" />
			<div> အကောင့်သစ်ဖွင့်ခြင်းအောင်မြင်ပါြပီ</div>
		</div>
		<!-- 注册失败 -->
		<div class="status-content" v-else>
			<img class="my" src="../../../assets/images/fail.png" />
			<div>အကောင့်သစ်ဖွင့်ခြင်းမှုမအောင်မြင်ပါ</div>
		</div>
		<div class="footer">
			<button type="button" @click="next" v-if="status==2">နောက်တဆင့် 2/3</button>
			<button type="button" @click="goLogin" v-else-if="status==1">နောက်တဆင့် 3/3</button>
			<button type="button"  @click="goback" v-else>ထပ်ကြိုးစားပါ</button>
		</div>
	</div>
</template>

<script>
	import logic from '../../mixins/other/comfirmPassword';
	export default {
		name: 'confirm-psw',
		mixins: [logic]
	}
</script>