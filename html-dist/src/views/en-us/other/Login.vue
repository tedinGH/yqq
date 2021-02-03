<template>
    <div class="on-center">
		<div class="wraper">
			<div class="title">Log in<router-link class="code-login" exact :to="{ name: 'scan-login'}"></router-link></div>
			<div class="tip">
				<span @click="chickTab(1)" :class="{active: tab=='1'}">Phone</span>
				<span @click="chickTab(2)" :class="{active: tab=='2'}">Email</span>
			</div>
			<div class="form-content">
				<form autocomplete="off">
					<div class="form-item" v-show="tab=='1'">
						<div class="item-label">
							<span class="input_label">Phone number</span>
						</div>
						<div class="item-input">
							<span class="countrycode" v-text="send.phoneCode" @click="showSelect=!showSelect;"></span>
							<div class="select-box" v-show="showSelect">
								<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
							</div>
							<input type="number" placeholder="Phone number" v-model="send.userName" class="tel">
						</div>
						<section v-show="type=='password'">
							<div class="item-label">
								<span class="input_label">Password</span> 
							</div>
							<div class="item-input">
								<input type="text" placeholder="Password" v-model="send.password" v-if="showPassword" autocomplete="new-password"/>
								<input type="password" placeholder="Password" v-model="send.password" v-if="!showPassword" autocomplete="new-password"/>
								<div class="eyes" :class="{active: showPassword}" @click.stop="showPassword=!showPassword"></div>
							</div>
						</section>
						<section v-show="type=='code'">
							<div class="item-label">
								<span class="input_label">VerifyCode</span>
							</div>
							<div class="item-code">
								<input type="tel" maxlength="4" placeholder="Phone verifyCode" v-model="send.verifyCode">
								<div class="floatR">
									<button class="get-code" type="button" @click="getPhone()" :disabled="isClick">{{codeText}}</button>
								</div>
							</div>
						</section>
						<div class="item-label code-span">
							<span @click.stop="loginType()">{{type=='code'?'Password':'VerifyCode'}}</span>
						</div>
					</div>
					<div class="form-item" v-show="tab=='2'">
						<div class="item-label">
							<span class="input_label">Email</span>
						</div>
						<div class="item-input">
							<input type="text" placeholder="Email" v-model="send.userName">
						</div>
						<section v-show="type=='password'">
							<div class="item-label">
								<span class="input_label">Password</span>
							</div>
							<div class="item-input">
								<input type="text" placeholder="Password" v-model="send.password" v-if="showPassword" autocomplete="new-password"/>
								<input type="password" placeholder="Password" v-model="send.password" v-if="!showPassword" autocomplete="new-password"/>
								<div class="eyes" :class="{active: showPassword}" @click.stop="showPassword=!showPassword"></div>
							</div>
						</section>
						<section v-show="type=='code'">
							<div class="item-label">
								<span class="input_label">VerifyCode</span>
							</div>
							<div class="item-code">
								<input type="tel" maxlength="4" placeholder="Email verifyCode" v-model="send.verifyCode">
								<div class="floatR">
									<button class="get-code" type="button" @click="getEmail();" :disabled="isClick">{{codeText}}</button>
								</div>
							</div>
						</section>
						<div class="item-label code-span">
							<span @click.stop="loginType()">{{type=='code'?'Password':'VerifyCode'}}</span>
						</div>
					</div>
				</form>
			</div>
			<div class="footer">
				<button type="button" @click="submit();">Log in</button>
				<div class="item-help">
					<router-link class="forget" exact :to="{ name: 'forget-password'}">Forgot password?</router-link>
					<router-link exact :to="{ name: 'register', params: { userSourceType: 0, inviterId: 0}}">Register</router-link>
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

