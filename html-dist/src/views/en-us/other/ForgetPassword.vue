<template>
  <div class="on-center">
    <div class="wraper comfirm-psw"> 
    	<div class="title">Forget password</div>
    	<div class="tip">
				<span @click="chickTab(1)" :class="{active: tab=='1'}">Phone</span>
				<span @click="chickTab(2)" :class="{active: tab=='2'}">Email</span>
    	</div>
    	<div class="form-content">
    		<form autocomplete="off">
    			<div class="form-item" v-show="tab=='1'">
    				<div class="item-label">
    					<span class="input_label">Phone</span>
    				</div>
						<div class="item-input">
							<span class="countrycode" v-text="phoneCode" @click="showSelect = !showSelect;"></span>
							<div class="select-box" v-show="showSelect">
								<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
							</div>
							<input type="number" placeholder="Phone number" v-model="mobile" class="tel">
						</div>
    			</div>
    			<div class="form-item" v-show="tab=='2'">
    				<div class="item-label">
    					<span class="input_label">Email</span> 
    				</div>
    				<div class="item-input">
						<input type="text" placeholder="Email" v-model="email">
    				</div>
    			</div>
    		</form>
    	</div>
			<div class="footer">
				<button type="button" @click="submit();">Next</button>
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
