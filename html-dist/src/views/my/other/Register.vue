<template>
  	<div class="on-center">
	    <!-- 第一步 -->
	    <div class="wraper partOne">
	    	<div class="title">အီချက် ကောင့်ဖွင့်မည်</div>
	    	<div class="tip">
	    		<span @click="chickTab(1)" class="my" :class="{active: tab=='1'}">ဖုန်းနံပါတ်ဖြင့်အကောင့်ဖွင့်မည်</span>
				<span @click="chickTab(2)" class="my" :class="{active: tab=='2'}">အီေမး ဖြင့်အ‌ကောင့်ဖွင့်မည်</span>
	    	</div>
	    	<div class="form-content">
	    		<form autocomplete="off">
	    			<div class="form-item" v-show="tab=='1'">
	    				<div class="item-label">
	    					<span class="input_label">ဖုန်းနံပါတ</span>
	    				</div>
	    				<div class="item-input">
								<span class="countrycode" v-text="send.phoneCode" @click="showSelect=!showSelect;"></span>
								<div class="select-box" v-show="showSelect">
									<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
								</div>
								<input type="number" placeholder="ဖုန်းနံပါတ်ရိုက်ထည့်ပါ" v-model="send.userName" class="tel">
							</div>
	    				<div class="item-label">
	    					<span class="input_label">လက္ကိုင္ဖုန္း၏စိစစ္နံပါတ္
	    					</span>
	    				</div>
	    				<div class="item-code">
							<input type="tel" maxlength="4" placeholder="ကျေးဇူးပြု၍ codeရိုက်ထည့်ပါ" v-model="send.verifyCode">
							<div class="floatR">
	    						<button class="get-code" type="button" @click="getPhone()" :disabled="isClick">{{codeText}}</button>
	    					</div>
	    				</div>
	    			</div>
	    			<div class="form-item" v-show="tab=='2'">
	    				<div class="item-label">
	    					<span class="input_label">အီးေမးနံပါတ္</span>
	    				</div>
	    				<div class="item-input">
							<input type="text" placeholder="ေက်းဇူးျပဳ၍အီးေမးနံပါတ္ကိုျဖည့္သြင္းပါ" v-model="send.userName">
	    				</div>
	    				<div class="item-label">
	    					<span class="input_label">အီးေမးစိစစ္နံပါတ္</span>
	    				</div>
	    				<div class="item-code">
							<input type="tel" maxlength="4" placeholder="ကျေးဇူးပြု၍ codeရိုက်ထည့်ပါ" v-model="send.verifyCode">
							<div class="floatR">
	    						<button class="get-code" type="button" @click="getEmail();" :disabled="isClick">{{codeText}}</button>
	    					</div>
	    				</div>
	    			</div>
	    			<div class="checkbox" :class="{active:ischecked}" @click="ischecked = !ischecked">
	    				<i></i>
	    				<p>ငါဖတ်ပြီးသဘောတူသည်<span class="udl" @click="showAgreement();">《အသုံးပြုသူသဘောတူညီချက်》</span>&<span class="udl" @click="showPrivacyPolicy();">《သီးသန့်တည်ရှိမှုမူဝါဒ》</span></p>
	    			</div>
	    		</form>
	    	</div>
			<div class="footer">
	    	<button type="button" @click="submit();">နောက်တဆင့်1/3</button>
				<div class="item-help">
					အကောင့်ရှိပြီးသားပါ?<router-link to="/login">၀င်မည်ကိုနှိပ်ပါ</router-link>
				</div>
			</div>
	    </div>
		<CodeComponent ref="code"  @codeConfirm="codeLoginHandler"></CodeComponent>
		<Agreement ref="agreement"></Agreement>
		<PrivacyPolicy ref="privacyPolicy"></PrivacyPolicy>
		<div class="b-popup" v-show="showMsg">
			<div :class="['mask',showMsg?'in':'']" @click="showMsg=false"></div>
			<div :class="['b-popup-box register',showMsg?'in':'']">
				<div>
					<span v-show="tab=='1'">ဖုန်းနံပါတ်ကိုမှတ်ပုံတင်ထားတယ်</span>
					<span v-show="tab=='2'">စာတိုက်ပုံးနံပါတ်ကိုမှတ်ပုံတင်ပြီးဖြစ်သည်</span>
				</div>
				<button class="cancel" @click="showMsg=false;">ဖျက်သိမ်း</button>
				<button class="comfirm" @click="goLogin()">အကောင့်၀င်မည်</button>
			</div>
		</div>
 	</div>
</template>

<script>
	import logic from '../../mixins/other/register';
	import Agreement from '@/views/my/other/Agreement'
	import PrivacyPolicy from '@/views/my/other/PrivacyPolicy'
	export default {
		name: 'register',
		mixins: [logic],
		components: { 
			Agreement,
			PrivacyPolicy
		},
	}
</script>