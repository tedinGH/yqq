
<template>
	<div class="on-center">
		<div class="wraper" v-show="showContent=='code'">
			<!-- <div class="title">EchatAPP登录</div> -->
			<div class="codeBox" :class="{acitve: hideCode}" id="qrcode">
				<canvas id="qrcodeCanvas"></canvas>
        <div class="wraps"></div>
				<!-- <i :class="{acitve: showLogo}"></i> -->
				<!-- <img @click="refresh" src="../../../assets/images/invalidCode.png" /> -->
			</div>
			<div class="explain" v-show="!hideCode">请使用EchatAPP扫码登录</div>
			<div class="explain" v-show="hideCode">二维码已失效，请点击<a href="javascript:;" @click="refresh">刷新</a></div>
			<div class="goLogin">
				网页版EchatAPP需配合手机使用
				<!-- <router-link exact :to="{ name: 'login'}">返回账号登录</router-link> -->
			</div>
		</div>
		<div class="wraper" v-show="showContent=='user'">
			<div class="title">EchatAPP登录</div>
			<div class="userInfo" >
				<img :src="user.avatar" v-headError v-if="user.avatar" />
        <img src="../../../assets/images/error-head.png" v-if="!user.avatar">
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
	    	<button type="button" @click="showContent='code';" class="logout">退出EchatAPP网页版</button>
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
