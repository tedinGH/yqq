<template>
  <div class="on-center">
    <div class="wraper comfirm-psw"> 
    	<div class="title">စကားဝှက်ကိုပြန်လည်ရယူပါ</div>
    	<div class="tip">
				<span @click="chickTab(1)" class="my" :class="{active: tab=='1'}">ဖုန်းနံပတ်</span>
				<span @click="chickTab(2)" class="my" :class="{active: tab=='2'}">အီးေမးနံပါတ္ကိုရွာေဖြျခင္း</span>
    	</div>
    	<div class="form-content">
    		<form autocomplete="off">
    			<div class="form-item" v-show="tab=='1'">
    				<div class="item-label">
    					<span class="input_label">ဖုန်းနံပတ်</span>
    				</div>
						<div class="item-input">
							<span class="countrycode" v-text="phoneCode" @click="showSelect = !showSelect;"></span>
							<div class="select-box" v-show="showSelect">
								<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
							</div>
							<input type="number" placeholder="ကျေးဇူးပြု၍ဖုန်းနံပါတ်ရိုက်ထည့်ပါ" v-model="mobile" class="tel">
						</div>
    			</div>
    			<div class="form-item" v-show="tab=='2'">
    				<div class="item-label">
    					<span class="input_label">အီးေမးနံပါတ္ကိုရွာေဖြျခင္း</span>
    				</div>
    				<div class="item-input">
						<input type="text" placeholder="ကျေးဇူးပြု၍အီးမေးအကောင့်ရိုက်ထည့်ပေးပါ" v-model="email">
    				</div>
    			</div>
    		</form>
    	</div>
			<div class="footer">
				<button type="button" @click="submit();">နောက်တဆင့်</button>
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
