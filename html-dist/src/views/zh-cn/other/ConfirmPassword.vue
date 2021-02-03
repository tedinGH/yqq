<template>
	<div class="wraper comfirm-psw">
		<div class="title">EchatAPP注册</div>
		<!-- 确认密码 -->
		<div class="form-content" v-if="status==2">
			<form autocomplete="off">
				<div class="form-item mt40">
					<div class="item-label">
						<span class="input_label">登录密码</span>
					</div>
					<div class="item-input">
						<input type="text" maxlength="20" autocomplete="off" placeholder="请输入8-20位大小写字母和数字组合" v-model="send.firstpwd"  v-if="showFirstpwd" />
						<input type="password" maxlength="20" autocomplete="off" placeholder="请输入8-20位大小写字母和数字组合" v-model="send.firstpwd"  v-if="!showFirstpwd" />
						<div class="eyes" :class="{active: showFirstpwd}" @click.stop="showFirstpwd=!showFirstpwd"></div>
					</div>
					<div class="item-label">
						<span class="input_label">确认登录密码</span>
					</div>
					<div class="item-input">
						<input type="text" maxlength="20" autocomplete="off" placeholder="请输入8-20位大小写字母和数字组合" v-model="send.secondpwd" v-if="showSecondpwd" />
						<input type="password" maxlength="20" autocomplete="off" placeholder="请输入8-20位大小写字母和数字组合" v-model="send.secondpwd" v-if="!showSecondpwd" />
						<div class="eyes" :class="{active: showSecondpwd}" @click.stop="showSecondpwd=!showSecondpwd"></div>
					</div>
				</div>
			</form>
		</div>
		<!-- 注册成功 -->
		<div class="status-content" v-else-if="status==1">
			<img src="../../../assets/images/success.png" />
			<div>注册成功</div>
		</div>
		<!-- 注册失败 -->
		<div class="status-content" v-else>
			<img src="../../../assets/images/fail.png" />
			<div>注册失败</div>
		</div>
		<div class="footer">
			<button type="button" @click="next" v-if="status==2">下一步 2/3</button>
			<button type="button" @click="goLogin" v-else-if="status==1">下一步 3/3</button>
			<button type="button"  @click="goback" v-else>重新注册</button>
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