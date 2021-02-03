<template>
	<div class="wrap">
		<div class="mobi-bg"></div>
		<!-- 第一步 -->
		<div class="WrapContent top"  style="width:100%;box-shadow: 0 0 0">
      <div class="title">邀请注册</div>
      <img class="success-img" src="../../assets/images/register-success.png" />
			<p class="success-info">注册成功</p>
			<a class="success-download" href="javascript:;" @click="goToDownload()">下载EchatAPP</a>
			<a class="success-index" href="javascript:;" @click="goToLogin()">前往官网</a>
		</div>
    </div>
</template>
<script>
    import registerSuccess from '../mixins/registerSuccess';
    export default {
        name: 'registerSuccess',
        mixins: [registerSuccess] 
    }
</script>