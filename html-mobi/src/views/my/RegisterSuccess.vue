<template>
	<div class="wrap">
		<div class="mobi-bg"></div>
		<!-- 第一步 -->
		<div class="WrapContent top" style="width:100%;box-shadow: 0 0 0" >
      <div class="title">မှတ်ပုံတင်ရန်ဖိတ်ကြားချက်</div>
    	<img class="success-img" src="../../assets/images/register-success.png" />
			<p class="success-info">အကောင့်သစ်ဖွင့်ခြင်းအောင်မြင်ပါြပီ</p>
			<a class="success-download" href="javascript:;" @click="goToDownload()">Download EchatAPP</a>
			<a class="success-index" href="javascript:;" @click="goToLogin()">တရားဝင်ဝက်ဘ်ဆိုက်သို့သွားပါ</a>
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