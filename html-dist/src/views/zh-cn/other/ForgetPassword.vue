<template>
  <div class="on-center">
    <div class="wraper comfirm-psw"> 
    	<div class="title">EchatAPP找回密码</div>
    	<div class="tip">
				<span @click="chickTab(1)" :class="{active: tab=='1'}">手机号找回</span>
				<span @click="chickTab(2)" :class="{active: tab=='2'}">邮箱号找回</span>
    	</div>
    	<div class="form-content">
    		<form autocomplete="off">
    			<div class="form-item" v-show="tab == '1'">
    				<div class="item-label">
    					<span class="input_label">手机号</span>
    				</div>
						<div class="item-input">
							<span class="countrycode" v-text="phoneCode" @click="showSelect = !showSelect;"></span>
							<div class="select-box" v-show="showSelect">
								<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
							</div>
							<input type="number" placeholder="请输入手机号" v-model="mobile" class="tel">
						</div>
    			</div>
    			<div class="form-item" v-show="tab == '2'">
    				<div class="item-label">
    					<span class="input_label">邮箱号</span>
    				</div>
    				<div class="item-input"> 
						<input type="text" placeholder="请输入邮箱号" v-model="email">
    				</div>
    			</div>
    		</form>
    	</div>
			<div class="footer">
				<button type="button" @click="submit();">下一步</button>
			</div>
		</div>
		<code-component ref="code"  @codeConfirm="codeHandler"></code-component>
		<double-verify v-model="validateData" ref="validate"  @verify="validateHandler"></double-verify>
  </div>
</template>

<script>
	import logic from '../../mixins/other/forgetPassword';
	
	export default {
		name: 'forget-password',
		mixins: [logic]
	}
</script>
