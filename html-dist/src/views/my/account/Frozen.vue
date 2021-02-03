<template>
	<!-- <div class="wraper account">
		<div class="title my">အီခ်က္အသံုးျပဳရန္ကန္႔သတ္သည့္အေကာင့္နံပါတ</div>
		<div class="frozen my"><i>?</i>သင္ခ်ိတ္ဆက္ထားေသာဖုန္းနံပါတ္(သို႔)အီးေမးနံပါတ္ကိုအသံုးျပဳ၍အေကာင့္ကိုအသံုးျပဳရန္ကန္႔</div>
		<div class="tip my">
			<span @click="chickTab(1)" :class="{active: tab=='1'}">ဖုန်းနံပါတ်အေးခဲ</span>
			<span @click="chickTab(2)" :class="{active: tab=='2'}">စာတိုက်ပုံးအေးခဲသည်</span>
		</div>
		<div class="form-content">
			<form autocomplete="off">
				<div class="form-item" v-show="tab=='1'">
					<div class="item-label">
						<span class="input_label">ဖုန်းနံပါတ</span>
					</div>
					<div class="item-input">
						<span class="countrycode" v-text="send.phoneCode" @click="showSelect=!showSelect"></span>
						<div class="select-box" v-show="showSelect">
							<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
						</div>
						<input type="number" placeholder="ကျေးဇူးပြု၍ ဖုန်းနံပါတ်ရိုက်ထည့်ပါ" v-model="mobile" class="tel">
					</div>
					<div class="item-label">
						<span class="input_label">လက္ကိုင္ဖုန္း၏စိစစ္နံပါတ္</span>
					</div>
					<div class="item-code">
						<input type="tel" maxlength="4" placeholder="ကျေးဇူးပြု၍ စိစစ္နံပါတ္ကိုရိုက်ထည့်ပါ" v-model="send.verifyCode">
            			<sms-code v-model="codePhone" indx="10017" :codeKey="true"></sms-code>
					</div>
				</div>
				<div class="form-item" v-show="tab=='2'">
					<div class="item-label">
						<span class="input_label">အီးေမးနံပါတ္်</span>
					</div>
					<div class="item-input">
					<input type="text" placeholder="ေက်းဇူးျပဳ၍အီးေမးနံပါတ္ကိုျဖည့္သြင္းပါ" v-model="email">
					</div>
					<div class="item-label">
						<span class="input_label">အီးေမးစိစစ္နံပါတ္္</span>
					</div>
					<div class="item-code">
						<input type="tel" maxlength="4" placeholder="ကျေးဇူးပြု၍ စိစစ္နံပါတ္ကိုရိုက်ထည့်ပါ" v-model="send.verifyCode">
						<email-code v-model="email" indx="117" :codeKey="true"></email-code>
					</div>
				</div>
			</form>
		</div>
		<div class="footer">
			<button type="button" @click="submit">နောင်တဆင့်</button>
		</div>
	</div> -->
  <div class="wraper account">
    <div class="frozen my"><img src="../../../assets/images/！.png">သင္ခ်ိတ္ဆက္ထားေသာဖုန္းနံပါတ္(သို႔)အီးေမးနံပါတ္ကိုအသံုးျပဳ၍အေကာင့္ကိုအသံုးျပဳရန္ကန္႔</div>
    <div class="tip">
      <span @click="chickTab(1)" :class="{active: tab=='1'}">ဖုန်းနံပါတ်အေးခဲ</span>
      <span @click="chickTab(2)" :class="{active: tab=='2'}">စာတိုက်ပုံးအေးခဲသည်</span>
    </div>
    <div class="form-content">
      <form autocomplete="off">
        <div class="form-item" v-show="tab=='1'">
          <div class="item-input">
            <span class="countrycode" v-text="send.phoneCode" @click="showSelect=!showSelect"></span>
            <div class="select-box" v-show="showSelect">
              <CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
            </div>
            <input type="number" placeholder="ကျေးဇူးပြု၍ စိစစ္နံပါတ္ကိုရိုက်ထည့်ပါ" v-model="mobile" class="tel">
          </div>
          <div class="item-code">
            <input type="tel" maxlength="4" placeholder="ကျေးဇူးပြု၍ စိစစ္နံပါတ္ကိုရိုက်ထည့်ပါ" v-model="send.verifyCode">
            <sms-code v-model="codePhone" indx="10017" :codeKey="true"></sms-code>
          </div>
        </div>
        <div class="form-item" v-show="tab=='2'">
          <div class="item-input">
            <input type="text" placeholder="ေက်းဇူးျပဳ၍အီးေမးနံပါတ္ကိုျဖည့္သြင္းပါ" v-model="email">
          </div>
          <div class="item-code">
            <input type="tel" maxlength="4" placeholder="ကျေးဇူးပြု၍ စိစစ္နံပါတ္ကိုရိုက်ထည့်ပါ" v-model="send.verifyCode">
            <email-code v-model="email" indx="117" :codeKey="true"></email-code>
          </div>
        </div>
      </form>
    </div>
    <div class="footer">
      <button type="button" @click="submit">နောင်တဆင့်</button>
    </div>
  </div>
</template>

<script> 
import logic from '../../mixins/account/frozen';
	
export default {
	name: 'account-frozen',
	mixins: [logic]
}
</script>
