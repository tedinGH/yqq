<template>
    <div class="on-center">
		<div class="wraper">
			<div class="title">EchatAPP登录<span class="code-login" @click="$router.push({ name: 'scan-login'})"></span></div>
			<div class="tip">
				<span @click="chickTab(1)" :class="{active: tab=='1'}">手机号登录</span>
				<span @click="chickTab(2)" :class="{active: tab=='2'}">邮箱号登录</span>
			</div>
			<div class="form-content">
				<form autocomplete="off">
					<div class="form-item" v-show="tab=='1'">
						<div class="item-label">
							<span class="input_label">手机号登录</span>
						</div>
						<div class="item-input">
							<span class="countrycode" v-text="send.phoneCode" @click="showSelect=!showSelect;"></span>
							<div class="select-box" v-show="showSelect">
								<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
							</div>
							<input type="number" placeholder="请输入手机号码" v-model="send.userName" class="tel">
						</div>
						<section v-show="type=='password'">
							<div class="item-label"> 
								<span class="input_label">密码登录</span> 
							</div>
							<div class="item-input">
								<input type="text" placeholder="请输入密码" v-model="send.password" v-if="showPassword" autocomplete="new-password"/>
								<input type="password" placeholder="请输入密码" v-model="send.password" v-if="!showPassword" autocomplete="new-password"/>
								<div class="eyes" :class="{active: showPassword}" @click.stop="showPassword=!showPassword"></div>
							</div>
						</section>
						<section v-show="type=='code'">
							<div class="item-label">
								<span class="input_label">验证码</span>
							</div>
							<div class="item-code">
								<input type="tel" maxlength="4" placeholder="请输入验证码" v-model="send.verifyCode">
								<div class="floatR"> 
									<button class="get-code" type="button" @click="getPhone()" :disabled="isClick">{{codeText}}</button>
								</div>
							</div>
						</section>
						<div class="item-label code-span">
							<span @click.stop="loginType()">{{type=='code'?'密码登录':'验证码登录'}}</span>
						</div>
					</div>
					<div class="form-item" v-show="tab=='2'">
						<div class="item-label">
							<span class="input_label">邮箱号登录</span>
						</div>
						<div class="item-input">
							<input type="text" placeholder="请输入邮箱号" v-model="send.userName">
						</div>
						<section v-show="type=='password'">
							<div class="item-label">
								<span class="input_label">密码登录</span>
							</div>
							<div class="item-input">
								<input type="text" placeholder="请输入密码" v-model="send.password" v-if="showPassword" autocomplete="new-password"/>
								<input type="password" placeholder="请输入密码" v-model="send.password" v-if="!showPassword" autocomplete="new-password"/>
								<div class="eyes" :class="{active: showPassword}" @click.stop="showPassword=!showPassword"></div>
							</div>
						</section>
						<section v-show="type=='code'">
							<div class="item-label">
								<span class="input_label">验证码</span>
							</div>
							<div class="item-code">
								<input type="tel" maxlength="4" placeholder="请输入验证码" v-model="send.verifyCode">
								<div class="floatR"> 
									<button class="get-code" type="button" @click="getEmail();" :disabled="isClick">{{codeText}}</button>
								</div>
							</div>
						</section>
						<div class="item-label code-span">
							<span @click.stop="loginType()">{{type=='code'?'密码登录':'验证码登录'}}</span>
						</div>
					</div>
				</form>
			</div>
			<div class="footer">
				<button type="button" @click="submit();">立即登录</button>
				<div class="item-help">
					<router-link class="forget" exact :to="{ name: 'forget-password'}">忘记密码？</router-link>
					还没有账号？<router-link exact :to="{ name: 'register', params: { userSourceType: 0, inviterId: 0}}">点击注册</router-link>
				</div>
			</div>
		</div>
		<CodeComponent ref="code"  @codeConfirm="codeLoginHandler"></CodeComponent>
		<GoogleCodeComponent ref="googleCode" @googleCodeHandler="googleCodeHandler" ></GoogleCodeComponent>
	</div>
</template>

<script>
	import logic from '../../mixins/other/login';
	export default {
		name: 'login',
		mixins: [logic]
	}
</script>


