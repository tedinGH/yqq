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
				<span class="text-account">အကောင့်</span>
				<span class="text-password">စကားဝှက်</span>
				<span class="text-complete">ပြီးပြည့်စုံ</span>
			</div>
			<div class="form-content">
        <div  v-if="tab=='1'">
					<span @click="showCountryCode()" class="countryname" v-text="country"></span>
				</div>
				<div class="form-item" v-if="tab=='1'">
					<div class="item-input">
						<span  class="countrycode" v-text="send.phoneCode"></span>
						<input type="number" placeholder="ကျေးဇူးပြု၍ဖုန်းနံပါတ်ရိုက်ထည့်ပါ" v-model="send.userName" class="tel">
					</div>
				</div>
				<div  v-if="tab=='2'">
				</div>
				<div class="form-item" v-if="tab=='2'" style="margin-top:1.92rem">
					<div class="item-input">
						<input class="password" type="text" placeholder="ကျေးဇူးပြုပြီးအီးမေးလ်နံပါတ်ထည့်ပါ" v-model="send.userName">
					</div>
				</div>
				<div class="form-button" :class="tab==2?'email':''">
					<a class="next" href="javascript:;" @click="submit();">နောင်တဆင့်</a>
					<a v-if="tab=='2'" class="switch" href="javascript:;" @click="tab = '1';send.userName=''">ဖုန်းဖြင့်ရှာမည</a>
					<a v-if="tab=='1'" class="switch" href="javascript:;" @click="tab = '2';send.userName=''">အီးေမးနံပါတ္ကိုရွာေဖြျခင္း</a>
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