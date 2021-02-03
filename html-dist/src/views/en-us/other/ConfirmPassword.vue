<template>
	<div class="wraper comfirm-psw">
		<div class="title">Sign up</div>
		<!-- 确认密码 -->
		<div class="form-content" v-if="status==2">
			<form autocomplete="off">
				<div class="form-item mt40">
					<div class="item-label">
						<span class="input_label">Enter Password
</span>
					</div>
					<div class="item-input">
						<input type="text" 
							maxlength="20" 
							autocomplete="new-password" 
							placeholder="8-20 digits, upper and lower case letters" 
							v-model="send.firstpwd"  
							v-if="showFirstpwd" />
						<input type="password" 
							maxlength="20" 
							autocomplete="new-password" 
							placeholder="8-20 digits, upper and lower case letters" 
							v-model="send.firstpwd"  
							v-if="!showFirstpwd" />
						<div class="eyes" :class="{active: showFirstpwd}" @click.stop="showFirstpwd=!showFirstpwd"></div>
					</div>
					<div class="item-label">
						<span class="input_label">Confirm Password</span>
					</div>
					<div class="item-input">
						<input type="text" 
							maxlength="20" 
							autocomplete="new-password" 
							placeholder="8-20 digits, upper and lower case letters" 
							v-model="send.secondpwd" 
							v-if="showSecondpwd" />
						<input 
							type="password" 
							maxlength="20" 
							autocomplete="new-password" 
							placeholder="8-20 digits, upper and lower case letters" 
							v-model="send.secondpwd" 
							v-if="!showSecondpwd" />
						<div class="eyes" :class="{active: showSecondpwd}" @click.stop="showSecondpwd=!showSecondpwd"></div>
					</div>
				</div>
			</form>
		</div>
		<!-- 注册成功 -->
		<div class="status-content" v-else-if="status==1">
			<img src="../../../assets/images/success.png" />
			<div>Registration success</div>
		</div>
		<!-- 注册失败 -->
		<div class="status-content" v-else>
    		<img src="../../../assets/images/fail.png" />
				<div>Registration failure</div>
    	</div>
		<div class="footer">
			<button type="button" @click="next" v-if="status==2">Next 2/3</button>
			<button type="button" @click="goLogin" v-else-if="status==1">Next 3/3</button>
			<button type="button"  @click="goback" v-else>Register again</button>
		</div>
	</div>
</template>

<script>
	import logic from '../../mixins/other/comfirmPassword';
	export default {
		name: 'confirm-psw',
		mixins: [logic]
	}
</script>