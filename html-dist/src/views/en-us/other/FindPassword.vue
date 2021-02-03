<template>
  <div class="on-center">
    <div class="wraper comfirm-psw">
    	<div class="title">Reset password</div>
			<!-- 设置新密码 -->
    	<div class="form-content" v-if="status==2">
				<form autocomplete="off">
					<div class="form-item mt40">
						<div class="item-label">
							<span class="input_label">New password</span>
						</div>
						<div class="item-input">
							<input type="text" maxlength="20" autocomplete="off" placeholder="8-20 digits, upper and lower case letters" v-model="send.firstpwd"  v-if="showFirstpwd" />
							<input type="password" maxlength="20" autocomplete="off" placeholder="8-20 digits, upper and lower case letters" v-model="send.firstpwd"  v-if="!showFirstpwd" />
							<div class="eyes" :class="{active: showFirstpwd}" @click.stop="showFirstpwd=!showFirstpwd"></div>
						</div>
						<div class="item-label">
							<span class="input_label">Confirm Password</span>
						</div>
						<div class="item-input">
							<input type="text" maxlength="20" autocomplete="off" placeholder="8-20 digits, upper and lower case letters" v-model="send.secondpwd" v-if="showSecondpwd" />
							<input type="password" maxlength="20" autocomplete="off" placeholder="8-20 digits, upper and lower case letters" v-model="send.secondpwd" v-if="!showSecondpwd" />
							<div class="eyes" :class="{active: showSecondpwd}" @click.stop="showSecondpwd=!showSecondpwd"></div>
						</div>
					</div>
				</form>
			</div>
			<!-- 重置密码成功 -->
			<div class="status-content" v-else-if="status==1">
				<img src="../../../assets/images/success.png" />
				<div>Password Reset Successfully</div>
			</div>
			<!-- 重置密码失败 -->
			<div class="status-content" v-else>
				<img src="../../../assets/images/fail.png" />
				<div>Password Reset Failed</div>
			</div>
			<div class="footer">
				<button type="button" @click="next" v-if="status==2">Next</button>
				<button type="button" @click="goLogin" v-else-if="status==1">Finish</button>
				<button type="button"  @click="goback" v-else>Try again</button>
			</div>
    </div>
	<CodeComponent ref="code"  @codeConfirm="codeHandler"></CodeComponent>
  </div>
</template>

<script>
	import logic from '../../mixins/other/findPassword';
	
	export default {
		name: 'find-password',
		mixins: [logic]
	}
</script>
