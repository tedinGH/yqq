
<template>
	<div>
		<div class="wraper" v-show="showContent=='code'">
			<div class="title">EchatAPP登录</div>
			<div class="codeBox" :class="{acitve: hideCode}" id="qrcode">
				<canvas id="qrcodeCanvas"></canvas>
				<i :class="{acitve: showLogo}"></i>
				<img @click="refresh" src="../../assets/images/invalidCode.png" />
			</div>
			<div class="explain" v-show="!hideCode">请使用Echat APP扫码登录</div>
			<div class="explain" v-show="hideCode">二维码已失效，请点击<a href="javascript:;" @click="refresh">刷新</a></div>
			<div class="goLogin">
				EchatAPP需配合手机使用
				<!-- <router-link exact :to="{ name: 'login'}">返回账号登录</router-link> -->
			</div>
		</div>
		<div class="wraper" v-show="showContent=='user'">
			<div class="title">EchatAPP登录</div>
			<div class="userInfo" >
				<img :src="user.avatar" />
				<p class="font18">请在手机端确认登录</p>
				<p class="backCode" @click="switching">返回二维码页面</p>
			</div>
		</div>
		<div class="wraper" v-show="showContent=='loading'">
			<div class="title">EchatAPP登录</div>
			<div class="userInfo" >
				<img :src="user.avatar" />
				<div class="font18">loading...</div>
			</div>
			<div class="footer">
	    		<button type="button" @click="showContent='code';" class="logout">退出EchatAPP</button>
			</div>
		</div>
		<div class="wraper" v-show="showContent=='login'">
			<div class="title">Log in</div>
			<div class="userInfo" >
				<img :src="preInfo.avatar" />
				<p class="font18">{{preInfo.nickName}}</p>
			</div>
			<div class="footer">
				<button type="button" @click="loginAgain">登录账号</button>
				<button class="switch-btn" type="button" @click="switching">切换账号</button>
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
