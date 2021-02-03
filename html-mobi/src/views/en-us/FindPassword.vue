<template>
	<div class="wrap">
		<!-- 确认密码 -->
		<div class="WrapContent">
			<div class="tip">
				<i class="icon-account success"></i>
        <span class="account-line"></span>
				<i class="icon-password on"></i>
        <span class="password-line"></span>
				<i class="icon-complete"></i>
			</div>
			<div class="tip-text">
				<span class="text-account success">Account</span>
				<span class="text-password on">Password</span>
				<span class="text-complete">Finish</span>
			</div>
			<div class="form-content">
				<div class="form-item">
					<div class="form-title">
						<span>New password</span>
					</div>
					<div class="item-input">
						<input class="password passwords" type="text" maxlength="20" autocomplete="off" placeholder="8-20 digits, upper and lower case letters" v-model="send.firstpwd"  v-if="showFirstpwd" />
						<input class="password passwords" type="password" maxlength="20" autocomplete="off" placeholder="8-20 digits, upper and lower case letters" v-model="send.firstpwd"  v-if="!showFirstpwd" />
						<div class="eyes" :class="{active: showFirstpwd}" @click.stop="showFirstpwd=!showFirstpwd"></div>
					</div>
				</div>
				<div class="form-item">
					<div class="form-title double">
						<span>Confirm Password</span>
					</div>
					<div class="item-input">
						<input class="password passwords" type="text" maxlength="20" autocomplete="off" placeholder="8-20 digits, upper and lower case letters" v-model="send.secondpwd" v-if="showSecondpwd" />
						<input class="password passwords" type="password" maxlength="20" autocomplete="off" placeholder="8-20 digits, upper and lower case letters" v-model="send.secondpwd" v-if="!showSecondpwd" />
						<div class="eyes" :class="{active: showSecondpwd}" @click.stop="showSecondpwd=!showSecondpwd"></div>
					</div>
				</div>
				<div class="form-button">
					<a class="next" href="javascript:;" @click="next();">Next</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import findPassword from '../mixins/findPassword';
	export default {
		name: 'findPassword',
		mixins: [findPassword] 
	}
</script>
<style  lang="scss" scoped>
  .WrapContent{
     z-index: 10;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
  }
</style>
