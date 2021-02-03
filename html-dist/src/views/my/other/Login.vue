<template>
    <div class="on-center">
		<div class="wraper">
			<div class="title">အီခ်က္မွတ္ပံုတင္ရန<span class="code-login" @click="$router.push({ name: 'scan-login'})"></span></div>
			<div class="tip">
				<span @click="chickTab(1)" class="my" :class="{active: tab=='1'}">ဖုန်းနံပါတ်ဖြင့်၀င်မည</span>
				<span @click="chickTab(2)" class="my" :class="{active: tab=='2'}">အီးေမးနံပါတ္ဝင္ေရာက္ျခင္း</span>
			</div>
			<div class="form-content">
				<form autocomplete="off">
					<div class="form-item" v-show="tab=='1'">
						<div class="item-label">
							<span class="input_label">ဖုန်းနံပါတ်ဖြင့်၀င်မည</span>
						</div>
						<div class="item-input">
							<span class="countrycode" v-text="send.phoneCode" @click="showSelect=!showSelect;"></span>
							<div class="select-box" v-show="showSelect">
								<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
							</div>
							<input type="number" placeholder="ဖုန်းနံပါတ်ရိုက်ထည့်ပါ" v-model="send.userName" class="tel">
						</div>
						<section v-show="type=='password'">
							<div class="item-label"> 
								<span class="input_label">လျှိူ၀ှက်နံပါတ်ဖြင့်၀င်မည်</span> 
							</div>
							<div class="item-input">
								<input type="text" placeholder="လျှိူ၀ှက်နံပါတ်ရိုက်ထည့်ပါ" v-model="send.password" v-if="showPassword" autocomplete="new-password"/>
								<input type="password" placeholder="လျှိူ၀ှက်နံပါတ်ရိုက်ထည့်ပါ" v-model="send.password" v-if="!showPassword" autocomplete="new-password"/>
								<div class="eyes" :class="{active: showPassword}" @click.stop="showPassword=!showPassword"></div>
							</div>
						</section>
						<section v-show="type=='code'">
							<div class="item-label">
								<span class="input_label">လက္ကိုင္ဖုန္း၏စိစစ္နံပါတ္</span>
							</div>
							<div class="item-code">
								<input type="tel" maxlength="4" placeholder="ကျေးဇူးပြု၍ စိစစ္နံပါတ္ကိုရိုက်ထည့်ပါ" v-model="send.verifyCode">
								<div class="floatR">
									<button class="get-code" type="button" @click="getPhone()" :disabled="isClick">{{codeText}}</button>
								</div>
							</div>
						</section>
						<div class="item-label code-span">
							<span @click.stop="loginType()">{{type=='code'?'လျှိူ၀ှက်နံပါတ်ဖြင့်၀င်မည်':'code ဖြင့်၀င်မည်'}}</span>
						</div>
					</div>
					<div class="form-item" v-show="tab=='2'">
						<div class="item-label">
							<span class="input_label">အီးေမးနံပါတ္ဝင္ေရာက္ျခင္း</span>
						</div>
						<div class="item-input">
							<input type="text" placeholder="ေက်းဇူးျပဳ၍အီးေမးနံပါတ္ကိုျဖည့္သြင္းပါ" v-model="send.userName">
						</div>
						<section v-show="type=='password'">
							<div class="item-label">
								<span class="input_label">လျှိူ၀ှက်နံပါတ်ဖြင့်၀င်မည်</span>
							</div>
							<div class="item-input">
								<input type="text" placeholder="လျှိူ၀ှက်နံပါတ်ရိုက်ထည့်ပါ" v-model="send.password" v-if="showPassword" autocomplete="new-password"/>
								<input type="password" placeholder="လျှိူ၀ှက်နံပါတ်ရိုက်ထည့်ပါ" v-model="send.password" v-if="!showPassword" autocomplete="new-password"/>
								<div class="eyes" :class="{active: showPassword}" @click.stop="showPassword=!showPassword"></div>
							</div>
						</section>
						<section v-show="type=='code'">
							<div class="item-label">
								<span class="input_label">အီးေမးစိစစ္နံပါတ္</span>
							</div>
							<div class="item-code">
								<input type="tel" maxlength="4" placeholder="ကျေးဇူးပြု၍ စိစစ္နံပါတ္ကိုရိုက်ထည့်ပါ" v-model="send.verifyCode">
								<div class="floatR">
									<button class="get-code" type="button" @click="getEmail();" :disabled="isClick">{{codeText}}</button>
								</div>
							</div>
						</section>
						<div class="item-label code-span">
							<span @click.stop="loginType()">{{type=='code'?'လျှိူ၀ှက်နံပါတ်ဖြင့်၀င်မည်':'code ဖြင့်၀င်မည်'}}</span>
						</div>
					</div>
				</form>
			</div>
			<div class="footer">
				<button type="button" @click="submit();">ချက်ချင်းလောခ်၀င်ပါမည်</button>
				<div class="item-help my">
					<router-link class="forget" exact :to="{ name: 'forget-password'}">လျှိူ၀ှက်နံပါတ်မမှတ်မိတော့ပါ?</router-link>
					အကောင့်မရှိသေးပါ?<router-link exact :to="{ name: 'register', params: { userSourceType: 0, inviterId: 0}}">အကောင့်အသစ်ဖွင့်မည်</router-link>
				</div>
			</div>
		</div>
		<CodeComponent ref="code"  @codeConfirm="codeLoginHandler"></CodeComponent>
		<GoogleCodeComponent ref="googleCode" @googleCodeHandler="googleCodeHandler" ></GoogleCodeComponent>
	</div>
</template>

<script>
	import logic from '../../mixins/other/login';
	export default {
		name: 'login',
		mixins: [logic]
	}
</script>


