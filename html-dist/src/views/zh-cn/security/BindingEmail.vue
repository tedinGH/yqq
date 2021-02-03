<template>
	<div class="main">
		<div class="security-panel">
			<h3 class="main-title crumb"><span class="em" @click="$router.push('/security')">账号安全</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div class="form">
				<div class="mb60">
					<p class="font16">邮箱</p>
					<div class="input-box">
						<input type="text" class="input" ref="email" placeholder="请输入邮箱号" v-model="email">
					</div>
				</div>
				<div class="mb60">
					<p class="font16">邮箱验证码<span class="right-tip">验证邮件可能会被误判为垃圾邮件，请注意查收</span></p>
					<div class="input-box">
						<input type="tel" class="input" ref="code" maxlength="4" placeholder="请输入验证码">
            <email-code v-model="email" :indx="indx" :codeKey="true"></email-code>
					</div>
				</div>
				<button class="submit" @click="binding">绑定</button>
			</div>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/security/bindingEmail'
	
export default {
	name: 'bindingEmail',
	mixins: [logic]
}
</script>
