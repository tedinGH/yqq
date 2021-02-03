
<template>
	<div class="on-center"> 
		<div class="wraper" v-show="showContent=='code'">
			<!-- <div class="title">Log in</div> -->
			<div class="codeBox" :class="{acitve: hideCode}" id="qrcode">
				<canvas id="qrcodeCanvas"></canvas>
        <div class="wraps"></div>
				<!-- <i :class="{acitve: showLogo}"></i> -->
				<!-- <img @click="refresh" src="../../../assets/images/invalidCode.png" /> -->
			</div>
			<div class="explain" v-show="!hideCode">Please log in by using EchatAPP scanner</div>
			<div class="explain" v-show="hideCode">QR code has expired, please click<a href="javascript:;" @click="refresh"> refresh</a></div>
			<div class="goLogin">
				EchatAPP of web should be used with mobile phone
				<!-- <router-link exact :to="{ name: 'login'}">Account login</router-link> -->
			</div>
		</div>
		<div class="wraper" v-show="showContent=='user'">
			<div class="title">Log in</div>
			<div class="userInfo" >
				<img :src="user.avatar" v-headError v-if="user.avatar" />
        <img src="../../../assets/images/error-head.png" v-if="!user.avatar">
				<p class="font18">Please confirm your login on the mobile phone</p>
				<p class="backCode" @click="switching">Return to the QR-code page</p>
			</div>
		</div>
		<div class="wraper" v-show="showContent=='loading'">
			<div class="title">Log in</div>
			<div class="userInfo" >
				<img :src="user.avatar" />
				<div class="font18">loading...</div>
			</div>
			<div class="footer">
        <button type="button" @click="showContent='code';" class="logout">Log out EchatAPP</button>
			</div>
		</div>
		<div class="wraper" v-show="showContent=='login'">
			<div class="title">Log in</div>
			<div class="userInfo" >
				<img :src="preInfo.avatar" />
				<p class="font18">{{preInfo.nickName}}</p>
			</div> 
			<div class="footer">
				<button type="button" @click="loginAgain">Log in</button>
				<button class="switch-btn" type="button" @click="switching">Switching Accounts</button>
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