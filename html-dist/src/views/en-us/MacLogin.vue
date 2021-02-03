
<template>
	<div>
		<div class="wraper" v-show="showContent=='code'">
			<div class="title">Log in</div>
			<div class="codeBox" :class="{acitve: hideCode}" id="qrcode">
				<canvas id="qrcodeCanvas"></canvas>
				<i :class="{acitve: showLogo}"></i>
				<img @click="refresh" src="../../assets/images/invalidCode.png" />
			</div>
			<div class="explain" v-show="!hideCode">Please log in by using EchatAPP scanner</div>
			<div class="explain" v-show="hideCode">QR code has expired, please click<a href="javascript:;" @click="refresh">refresh</a></div>
			<div class="goLogin">
				EchatAPP should be used with mobile phone
				<!-- <router-link exact :to="{ name: 'login'}">返回账号登录</router-link> -->
			</div>
		</div>
		<div class="wraper" v-show="showContent=='user'">
			<div class="title">Log in</div>
			<div class="userInfo" >
				<img :src="user.avatar" />
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
	import logic from '../mixins/macLogin';
	export default {
		name: 'macLogin',
		mixins: [logic] 
	}
</script>
<style lang="scss">
	@import "../../assets/scss/maclogin.scss"; 
 </style>
