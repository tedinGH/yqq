<template>
	<div class="main">
		<div class="security-panel">
			<h3 class="main-title crumb"><span class="em" @click="$router.push('/security')">账号安全</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div class="form">
				<p class="form-title mb60">您已经绑定的邮箱号为：{{data.email}}</p>
				<p class="mb60">为了您的账号安全，更换邮箱号前需要重新进行验证，请选择您需要验证的方式</p>
				<ul class="radio-box">
					<li>
						<label class="radio"><input type="radio" name="modifyType" @click="modifyType(1)">使用验证码<i></i></label>
						<div class="input-box" v-show="modify_Type==1">
							<input type="tel" class="input" ref="code" maxlength="4" placeholder="请输入验证码" autocomplete="off">
              <email-code v-model="data.email" indx="106"></email-code>
						</div>
					</li>
					<li>
						<label class="radio"><input type="radio" name="modifyType" @click="modifyType(2)">使用登录密码<i></i></label> 
						<div class="input-box" v-show="modify_Type==2">
							<input type="password" maxlength="20" class="input" ref="psw" placeholder="请输入登录密码" autocomplete="new-password">
						</div>
					</li>
				</ul>
				<button class="submit" @click="next">下一步</button>
			</div>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/security/modifyEmail'
	
export default {
	name: 'modifyEmail',
	mixins: [logic]
}
</script>
