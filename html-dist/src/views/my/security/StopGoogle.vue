<template>
	<div class="main">
		<div class="security-panel">
			<h3 class="main-title crumb"><span class="em">账号安全</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div class="form">
				<div class="mb30">
					<p class="font16">登录密码</p>
					<div class="input-box">
						<input type="password" maxlength="20" class="input" ref="psw" placeholder="请输入登录密码" autocomplete="new-password"/>
					</div>
				</div>
				<div class="mb30">
					<p class="font16">谷歌验证码</p>
					<div class="input-box">
						<input type="tel" maxlength="6" class="input" ref="code" placeholder="请输入谷歌验证码">
					</div>
					<p class="textR font16">谷歌验证码丢失？<span class="goto" @click="$router.push('/google-code')">点击这里</span></p>
				</div>
				<button class="submit" @click="stopGoogle">停用谷歌验证</button>
			</div>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/security/stopGoogle'
	
export default {
	name: 'stopGoogle',
	mixins: [logic]
}
</script>
