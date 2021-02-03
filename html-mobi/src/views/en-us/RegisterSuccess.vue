<template>
	<div class="wrap">
		<div class="mobi-bg"></div>
		<!-- 第一步 -->
		<div class="WrapContent top"  style="width:100%;box-shadow: 0 0 0">
      <div class="title">Invitation to register</div>
      <img class="success-img" src="../../assets/images/register-success.png" />
			<p class="success-info">Registration success</p>
			<a class="success-download" href="javascript:;" @click="goToDownload()">Download EchatAPP</a>
			<a class="success-index" href="javascript:;" @click="goToLogin()">Go to official website</a>
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