<template>
	<div class="wrap">
	    <div class="WrapContent">
			<div class="tip success">
				<i class="icon-account success"></i>
        <span class="account-line"></span>
				<i class="icon-password "></i>
        <span class="password-line"></span>
				<i class="icon-complete success"></i>
			</div>
			<div class="tip-text">
				<span class="text-account success">အကောင့်</span>
				<span class="text-password success">စကားဝှက်</span>
				<span class="text-complete success">ပြီးပြည့်စုံ</span>
			</div>
	    	<img class="success-img" src="../../assets/images/forget/findpwd-success.png" />
			<p class="success-info">စကားဝှက်ကိုအောင်မြင်စွာသတ်မှတ်ပြီး</p>
	    	<a class="success-download" href="javascript:;" @click="finish();">ပြီးပြည့်စုံ</a>
	    </div>
  	</div>
</template>
<script>
	import findpwdSuccess from '../mixins/findpwdSuccess';
	export default {
		name: 'findpwdSuccess',
		mixins: [findpwdSuccess] 
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

