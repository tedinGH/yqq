<template>
  <div class="on-center">
    <div class="wraper comfirm-psw">
    	<div class="title my">မိမိ၏စကားဝှက်ကိုပြန်လည်ပြင်မည်</div>
			<!-- 设置新密码 -->
    	<div class="form-content" v-if="status==2">
				<form autocomplete="off">
					<div class="form-item mt40">
						<div class="item-label my">
							<span class="input_label">ကျေးဇူးပြု၍  စကား၀ှက်နံပါတ်ရိုက်ထည့်ပေးပါ</span>
						</div>
						<div class="item-input my">
							<input type="text" maxlength="20" autocomplete="off" placeholder="ကျေးဇူးပြု၍  စကား၀ှက်နံပါတ်ရိုက်ထည့်ပေးပါ" v-model="send.firstpwd"  v-if="showFirstpwd" />
							<input type="password" maxlength="20" autocomplete="off" placeholder="ကျေးဇူးပြု၍  စကား၀ှက်နံပါတ်ရိုက်ထည့်ပေးပါ" v-model="send.firstpwd"  v-if="!showFirstpwd" />
							<div class="eyes" :class="{active: showFirstpwd}" @click.stop="showFirstpwd=!showFirstpwd"></div>
						</div>
						<div class="item-label my">
							<span class="input_label">ကျေးဇူးပြု၍  စကား၀ှက်နံပါတ်ကိုနောက်တစ်ကြိမ်ရိုက်ထည့်ပေးပါ</span>
						</div>
						<div class="item-input my">
							<input type="text" maxlength="20" autocomplete="off" placeholder="ကျေးဇူးပြု၍  စကား၀ှက်နံပါတ်ကိုနောက်တစ်ကြိမ်ရိုက်ထည့်ပေးပါ" v-model="send.secondpwd" v-if="showSecondpwd" />
							<input type="password" maxlength="20" autocomplete="off" placeholder="ကျေးဇူးပြု၍  စကား၀ှက်နံပါတ်ကိုနောက်တစ်ကြိမ်ရိုက်ထည့်ပေးပါ" v-model="send.secondpwd" v-if="!showSecondpwd" />
							<div class="eyes" :class="{active: showSecondpwd}" @click.stop="showSecondpwd=!showSecondpwd"></div>
						</div>
					</div>
				</form>
			</div>
			<!-- 重置密码成功 -->
			<div class="status-content" v-else-if="status==1">
				<img src="../../../assets/images/success.png" />
				<div>စကားဝှက်ကိုပြန်လည်စတင်ပြီးပါပြီ</div>
			</div>
			<!-- 重置密码失败 -->
			<div class="status-content" v-else>
				<img src="../../../assets/images/fail.png" />
				<div>စကားဝှက်ကိုပြန်လည်သတ်မှတ်ရန်မအောင်မြင်ပါ</div>
			</div>
			<div class="footer">
				<button type="button" @click="next" v-if="status==2">နောက်တဆင့်</button>
				<button type="button" @click="goLogin" v-else-if="status==1">ပြီးဆုံးသည်</button>
				<button type="button"  @click="goback" v-else>ထပ်ကြိုးစားပါ</button>
			</div>
    </div>
    <code-component ref="code"  @codeConfirm="codeHandler"></code-component>
  </div>
</template>

<script>
	import logic from '../../mixins/other/findPassword';
	
	export default {
		name: 'find-password',
		mixins: [logic]
	}
</script>
