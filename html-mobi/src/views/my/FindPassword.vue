<template>
	<div class="wrap">
		<!-- 确认密码 -->
		<div class="WrapContent">
			<div class="tip">
					<i class="icon-account success"></i>
        <span class="account-line"></span>
				<i class="icon-password on"></i>
        <span class="password-line"></span>
				<i class="icon-complete"></i>
			</div>
			<div class="tip-text">
				<span class="text-account success">အကောင့်</span>
				<span class="text-password on">စကားဝှက်</span>
				<span class="text-complete">ပြီးပြည့်စုံ</span>
			</div>
			<div class="form-content">
				<div class="form-item">
					<div class="form-title">
						<span>စကားဝှက်ကိုသတ်မှတ်ပါ</span>
					</div>
					<div class="item-input">
						<input class="password passwords" type="text" maxlength="20" autocomplete="off" placeholder="8-20 ဂဏန်း, အကြီးနှင့်အကြီးအက္ခရာများ" v-model="send.firstpwd"  v-if="showFirstpwd" />
						<input class="password passwords" type="password" maxlength="20" autocomplete="off" placeholder="8-20 ဂဏန်း, အကြီးနှင့်အကြီးအက္ခရာများ" v-model="send.firstpwd"  v-if="!showFirstpwd" />
						<div class="eyes" :class="{active: showFirstpwd}" @click.stop="showFirstpwd=!showFirstpwd"></div>
					</div>
				</div>
				<div class="form-item">
					<div class="form-title double">
						<span>စကားဝှက်ကိုအတည်ပြုပါ</span>
					</div>
					<div class="item-input">
						<input class="password passwords" type="text" maxlength="20" autocomplete="off" placeholder="8-20 ဂဏန်း, အကြီးနှင့်အကြီးအက္ခရာများ" v-model="send.secondpwd" v-if="showSecondpwd" />
						<input class="password passwords" type="password" maxlength="20" autocomplete="off" placeholder="8-20 ဂဏန်း, အကြီးနှင့်အကြီးအက္ခရာများ" v-model="send.secondpwd" v-if="!showSecondpwd" />
						<div class="eyes" :class="{active: showSecondpwd}" @click.stop="showSecondpwd=!showSecondpwd"></div>
					</div>
				</div>
				<div class="form-button">
					<a class="next" href="javascript:;" @click="next();">နောက်တဆင့်</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import findPassword from '../mixins/findPassword';
	export default {
		name: 'findPassword',
		mixins: [findPassword] 
	}
</script>
<style  lang="scss" scoped>
  .WrapContent{
     z-index: 10;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
  }
</style>
