<template>
  <div class="on-center">
    <div class="wraper comfirm-psw">
    	<div class="title">EchatAPP重置密码</div>
			<!-- 设置新密码 -->
    	<div class="form-content" v-if="status==2">
				<form autocomplete="off">
					<div class="form-item mt40">
						<div class="item-label">
							<span class="input_label">输入新密码</span>
						</div>
						<div class="item-input">
							<input type="text" maxlength="20" autocomplete="off" placeholder="请输入8-20位大小写字母和数字组合" v-model="send.firstpwd"  v-if="showFirstpwd" />
							<input type="password" maxlength="20" autocomplete="off" placeholder="请输入8-20位大小写字母和数字组合" v-model="send.firstpwd"  v-if="!showFirstpwd" />
							<div class="eyes" :class="{active: showFirstpwd}" @click.stop="showFirstpwd=!showFirstpwd"></div>
						</div>
						<div class="item-label">
							<span class="input_label">再次输入新密码</span>
						</div>
						<div class="item-input">
							<input type="text" maxlength="20" autocomplete="off" placeholder="请输入8-20位大小写字母和数字组合" v-model="send.secondpwd" v-if="showSecondpwd" />
							<input type="password" maxlength="20" autocomplete="off" placeholder="请输入8-20位大小写字母和数字组合" v-model="send.secondpwd" v-if="!showSecondpwd" />
							<div class="eyes" :class="{active: showSecondpwd}" @click.stop="showSecondpwd=!showSecondpwd"></div>
						</div>
					</div>
				</form>
			</div>
			<!-- 重置密码成功 -->
			<div class="status-content" v-else-if="status==1">
				<img src="../../../assets/images/success.png" />
				<div>重置密码成功</div>
			</div>
			<!-- 重置密码失败 -->
			<div class="status-content" v-else>
				<img src="../../../assets/images/fail.png" />
				<div>重置密码失败</div>
			</div>
			<div class="footer">
				<button type="button" @click="next" v-if="status==2">下一步</button>
				<button type="button" @click="goLogin" v-else-if="status==1">完成</button>
				<button type="button"  @click="goback" v-else>再试一次</button>
			</div>
    </div>
	<code-component ref="code"  @codeConfirm="codeHandler"></code-component>
  </div>
</template>

<script>
	import logic from '../../mixins/other/findPassword';
	
	export default {
		name: 'find-password',
		mixins: [logic]
	}
</script>
