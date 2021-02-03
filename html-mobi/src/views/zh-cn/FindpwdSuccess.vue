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
				<span class="text-account success">确认账号</span>
				<span class="text-password success">设置密码</span>
				<span class="text-complete success">完成</span>
			</div>
	    	<img class="success-img" src="../../assets/images/forget/findpwd-success.png" />
			<p class="success-info">设置密码成功</p>
	    	<a class="success-download" href="javascript:;" @click="finish();">完成</a>
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

