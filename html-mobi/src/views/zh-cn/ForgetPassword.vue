<template>
	<div class="wrap">
		<!-- 第一步 -->
		<div class="WrapContent">
			<div class="tip">
				<i class="icon-account"></i>
        <span class="account-line"></span>
				<i class="icon-password"></i>
        <span class="password-line"></span>
				<i class="icon-complete"></i>
			</div>
			<div class="tip-text">
				<span class="text-account">确认账号</span>
				<span class="text-password">设置密码</span>	
				<span class="text-complete">完成</span>
			</div>
			<div class="form-content">
				<div  v-if="tab=='1'">
					<span @click="showCountryCode()" class="countryname" v-text="country"></span>
				</div>
				<div class="form-item" v-if="tab=='1'">
					<div class="item-input">
						<span  class="countrycode" v-text="send.phoneCode"></span>
						<input type="number" placeholder="请输入手机号" v-model="send.userName" class="tel">
					</div>
				</div>
				<div  v-if="tab=='2'">
					<!-- <span class="input_label">邮箱号</span> -->
				</div>
				<div class="form-item" v-if="tab=='2'" style="margin-top:1.92rem">
					<div class="item-input">
						<input class="password" type="text" placeholder="请输入邮箱号" v-model="send.userName">
					</div>
				</div>
				<div class="form-button" :class="tab==2?'email':''">
					<a class="next" href="javascript:;" @click="submit();">下一步</a>
					<a v-if="tab=='2'" class="switch" href="javascript:;" @click="tab = '1';send.userName=''">手机找回</a>
					<a v-if="tab=='1'" class="switch" href="javascript:;" @click="tab = '2';send.userName=''">邮箱找回</a>
				</div>
			</div>
		</div>
		<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
		<DoubleValidateComponent ref="dalidate"></DoubleValidateComponent>
	</div>
</template>
<script>
	import forgetPassword from '../mixins/forgetPassword';
	export default {
		name: 'forgetPassword',
		mixins: [forgetPassword] 
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
