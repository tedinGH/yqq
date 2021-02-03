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
				<span class="text-account success">确认账号</span>
				<span class="text-password on">设置密码</span>
				<span class="text-complete">完成</span>
			</div>
			<div class="form-content">
				<div class="form-item">
					<div class="form-title">
						<span>设置密码</span>
					</div>
					<div class="item-input">
						<input class="password passwords" type="text" maxlength="20" autocomplete="off" placeholder="请输入8位以上包含大写字母、小写字母以及数字的密码" v-model="send.firstpwd"  v-if="showFirstpwd" />
						<input class="password passwords" type="password" maxlength="20" autocomplete="off" placeholder="请输入8位以上包含大写字母、小写字母以及数字的密码" v-model="send.firstpwd"  v-if="!showFirstpwd" />
						<div class="eyes" :class="{active: showFirstpwd}" @click.stop="showFirstpwd=!showFirstpwd"></div>
					</div>
				</div>
				<div class="form-item">
					<div class="form-title double">
						<span>确认密码</span>
					</div>
					<div class="item-input">
						<input class="password passwords" type="text" maxlength="20" autocomplete="off" placeholder="请输入8位以上包含大写字母、小写字母以及数字的密码" v-model="send.secondpwd" v-if="showSecondpwd" />
						<input class="password passwords" type="password" maxlength="20" autocomplete="off" placeholder="请输入8位以上包含大写字母、小写字母以及数字的密码" v-model="send.secondpwd" v-if="!showSecondpwd" />
						<div class="eyes" :class="{active: showSecondpwd}" @click.stop="showSecondpwd=!showSecondpwd"></div>
					</div>
				</div>
				<div class="form-button">
					<a class="next" href="javascript:;" @click="next();">下一步</a>
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
