<template>
	<div class="main" v-show="showPage">
		<div class="security-panel">
			<h3 class="main-title">账号安全</h3>
		</div>
		<div class="security-panel">
			<h3 class="title">基本信息</h3>
			<div class="row">
				<span class="name">账号：</span><span v-if="data.mobile">{{data.mobile | filterPhone}}</span><span v-else>未绑定</span>
			</div>
			<div class="row">
				<span class="name">EchatAPP ID：</span><span>{{data.userId}}</span>
			</div>
			<div class="row">
				<span class="name">登录密码：</span><span>********</span><div class="operation" @click="$router.push({name:'forget-password'})">修改</div>
			</div>
		</div>
		<div class="security-panel">
			<h3 class="title">安全验证信息</h3>
			<div class="row">
				<div class="left">
					<img class="status-img" v-if="data.mobile" src="../../../assets/images/authenticated.png" />
					<img class="status-img" v-else src="../../../assets/images/uncertified.png"/>
					<span class="name">手机验证：</span><span v-if="data.mobile">{{data.mobile | filterPhone}}</span><span v-else>未绑定</span>
				</div>
				<span class="grey">用于登录、找回密码和相关的安全设置</span>
				<div class="operation" v-if="data.mobile" @click="$router.push({name:'modify-phone'})">修改</div>
				<div class="operation" v-else @click="$router.push({name:'binding-phone'})">去绑定</div>
			</div>
			<div class="row">
				<div class="left">
					<img class="status-img" v-if="data.email" src="../../../assets/images/authenticated.png" />
					<img class="status-img" v-else src="../../../assets/images/uncertified.png" />
					<span class="name">邮箱验证：</span><span v-if="data.email">{{data.email | filterEmail}}</span><span v-else>未绑定</span>
				</div>
				<span class="grey">用于登录、找回密码和相关的安全设置</span>
				<div class="operation" v-if="data.email" @click="$router.push({name:'modify-email'})">修改</div>
				<div class="operation" v-else @click="$router.push({name:'binding-email'})">去绑定</div>
			</div>
			<div class="row">
				<div class="left">
					<img class="status-img" v-if="data.googleSwitch" src="../../../assets/images/authenticated.png" />
					<img class="status-img" v-else src="../../../assets/images/uncertified.png" />
					<span class="name">谷歌验证：</span><span>{{data.googleSwitch?'已开启':'暂未开启'}}</span>
				</div>
				<span class="grey">用于登录和修改安全设置</span>
				<div class="operation" v-if="data.googleSwitch" @click="$router.push({name:'stop-google'})">去关闭</div>
				<div class="operation" v-else @click="googleVerify">去开启</div>
			</div>
		</div>
		<code-component ref="code"  @codeConfirm="codeHandler"></code-component>
		<double-verify v-model="data" @verify="verifyHandler" ref="verify"></double-verify>
		<google-component v-model="data"  @google="googleHandler" ref="google"></google-component>
	</div>
</template>
 
<script> 
import logic from '../../mixins/security/index'
	
export default {
	name: 'security',
	mixins: [logic]
}
</script>