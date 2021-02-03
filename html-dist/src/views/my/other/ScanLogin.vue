
<template>
	<div class="on-center">
		<div class="wraper" v-show="showContent=='code'">
			<!-- <div class="title">မွတ္ပံုတင္ရန</div> -->
			<div class="codeBox" :class="{acitve: hideCode}" id="qrcode">
				<canvas id="qrcodeCanvas"></canvas>
        <div class="wraps"></div>
				<!-- <i :class="{acitve: showLogo}"></i> -->
				<!-- <img @click="refresh" src="../../../assets/images/invalidCode.png" /> -->
			</div>
			<div class="explain" v-show="!hideCode">ကျေးဇူးပြု၍ EchatAPP ကို သုံး၍ စကင်ဖတ်ပြီးဝင်ပါ</div>
			<div class="explain" v-show="hideCode">ကျေးဇူးပြုပြီး QR ကုဒ်သက်တမ်းကုန်သွားပါပြီ<a href="javascript:;" @click="refresh">Refresh</a></div>
			<div class="goLogin">
				အီခ်က္၏အင္တာနက္စာမ်က္ႏွာသည္ဖုန္းျဖင့္အသံုးျပဳရန္လိုအပ္သည္။
				<!-- <router-link exact :to="{ name: 'login'}">返回账号登录</router-link> -->
			</div>
		</div>
		<div class="wraper" v-show="showContent=='user'">
			<div class="title">မွတ္ပံုတင္ရန</div>
			<div class="userInfo" >
				<img :src="user.avatar" />
				<p class="font18">ကျေးဇူးပြု၍ လက်ကိုင်ဖုန်းဖြင့်လော့အင်ကိုအတည်ပြုပါ</p>
				<p class="backCode" @click="showContent='code';">နောက်ကျော QR ကုဒ်စာမျက်နှာသို့</p>
			</div>
		</div>
		<div class="wraper" v-show="showContent=='loading'">
			<div class="title">မွတ္ပံုတင္ရန</div>
			<div class="userInfo" >
				<img :src="user.avatar" />
				<div class="font18">loading...</div>
			</div>
			<div class="footer">
	    	<button type="button" @click="showContent='code';" class="logout">EchatAPP Web Edition မှထွက်ပါ</button>
			</div>
		</div>
		<div class="wraper" v-show="showContent=='login'">
			<div class="title">Log in</div>
			<div class="userInfo" >
				<img :src="user.avatar" v-headError v-if="user.avatar" />
        <img src="../../../assets/images/error-head.png" v-if="!user.avatar">
				<p class="font18">{{preInfo.nickName}}</p>
			</div>
			<div class="footer">
				<button type="button" @click="loginAgain">၀င်ရန်</button>
				<button class="switch-btn" type="button" @click="switching">အကောင့်အသစ်‌ပြောင်းမည်</button>
			</div>
		</div>
	</div>
</template>

<script>
	import logic from '../../mixins/other/scanLogin';
	export default {
		name: 'scanLogin',
		mixins: [logic] 
	}
</script>
<style>
  .wraper {
  width: 384px;
  height: 594px;
  font-size: 16px;
  box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
  opacity: 0.92;
  border-radius: 8px;
  background: #fff;
  margin:auto;
  overflow: hidden;
  }
</style>