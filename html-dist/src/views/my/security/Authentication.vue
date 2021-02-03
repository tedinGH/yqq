<template>
	<div class="main" v-show="showPage">
		<div class="security-panel authentication">
			<h3 class="main-title crumb"><span class="em">မှတ်ပုံတင်</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div  v-if="step==0">
				<div class="authentication-tip">
					<div class="txt">ကျေးဇူးပြု၍သင့်မှန်ကန်သောအ‌ထောက်အထားကိုဖြည့်စွပ်ပါ,အတည်ပြုပြီးပ</div>
				</div>
				<div class="authentication-type">
					<span :class="[type==0?'active':'']" @click="setType(0)">မှတ်ပုံတင်အတည်ပြု</span>
					<span class="line"></span>
					<span :class="[type==1?'active':'']" @click="setType(1)">နိုင်ငံကူးစာအုပ္၏စိစစ္ခ်က္</span>
				</div>
				<div class="form">
					<div class="mb30">
						<span class="item">နိုင်ငံ</span>
						<div class="input-box" @click="showCountryCode">
							<input type="text" class="input" placeholder="ကျေးဇူးပြုပြီးနိုင်ငံတစ်ခုရွေးပါ" :value="send.phoneCode+'  '+send.country" readonly>
							<div class="select-box" v-show="showSelect">
								<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
							</div>
						</div>
					</div>
					<div class="mb30">
						<p class="item">အမည်</p>
						<div class="input-box">
							<input type="text" class="input" ref="name" placeholder="ကျေးဇူးပြု၍အမည်ရိုက်ထည့်ပါ" maxlength="20">
						</div>
					</div>
					<div class="mb30">
						<p class="item">မျိုးနွယ်</p>
						<div class="input-box">
							<input type="text" class="input" ref="surname" placeholder="ကျေးဇူးပြု၍မျိုးနွယ်ရိုက်ထည့်ပါ" maxlength="20">
						</div>
					</div>
					<div class="mb30">
						<p class="item">မှတ်ပုံတင်နံပါတ်</p>
						<div class="input-box">
							<input type="tel" class="input" ref="idcard" placeholder="ကျေးဇူးပြု၍မှတ်ပုံတင်နံပါတ်ရိုက်ထည့်ပါ" maxlength="25">
						</div>
						<div class="promise">
							<label class="radio"><input type="radio" @click="agree" :checked="isAgree"><i></i></label>
							<div class="content">ကိုယ်တိုင်ကတိတည်ရမည်,ပေးပို့ထားသောအချက်များသည်တရား၀င်ပါသည်,
အကောင့်တုခိုးမြန်းခြင်းမဟုတ်</div>
						</div>
					</div>
					<button class="submit" @click="next">နောက်တဆင့်</button>
				</div>
			</div>
			<div v-else-if="step==4" class="step2-form">
				<p>ရိုက်ထားသောပုံများရှင်းလင်းမြင်သာရမည်</p>
				<div class="upload-list">
					<div class="upload-item first">
						<div class="upload-box">	
							<img class="uploadImg" :src="base.headUrl+picture1" v-if="picture1">
							<img class="uploadImg" src="../../../assets/images/authentication/idcard.png" v-if="!picture1&&type==0">
							<img class="uploadImg" src="../../../assets/images/authentication/passport.png" v-if="!picture1&&type==1">
							<label for="picture1" class="upLabel">
								<input type="file" name="file" id="picture1" multiple="multiple" @change="uploadImage($event,1)" accept="image/*">
								<input ref="picture1" name="picture1" type="hidden" :value="picture1">
							</label>
							<p class="tip">မှတ်ပုံတင်ကိုဓာတ်ပုံရိုက်ပါ (ရှေ့)</p>
						</div>
					</div>
					<div class="upload-item second">
						<div class="upload-box">
							<img class="uploadImg" src="../../../assets/images/authentication/back.png" v-if="!picture2">
							<img class="uploadImg" :src="base.headUrl+picture2" v-else>
							<label for="picture2" class="upLabel">
								<input type="file" name="file" id="picture2" multiple="multiple" @change="uploadImage($event,2)" accept="image/*">
								<input ref="picture2" name="picture2" type="hidden" :value="picture2">
							</label>
							<p class="tip">မှတ်ပုံတင်ကိုဓာတ်ပုံရိုက်ပါ (ရှေ့)</p>
						</div>
					</div>
					<div class="upload-item last">
						<div class="upload-box">
							<img class="uploadImg" src="../../../assets/images/authentication/face.png" v-if="!picture3">
							<img class="uploadImg" :src="base.headUrl+picture3" v-else>
							<label for="picture3" class="upLabel">
								<input type="file" name="file" id="picture3" multiple="multiple" @change="uploadImage($event,3)" accept="image/*">
								<input ref="picture3" name="picture3" type="hidden" :value="picture3">
							</label>
							<p class="tip">မှတ်ပုံတင်ကိုကိုင်၍ဓာတ်ပုံရိုက်ပါနှင့်ကို,်တိုင်ရေးလက်မှတ်ဓာတ်ပုံ</p>
						</div>
					</div>
				</div>
				<p class="red-tip">အမှတ်သား-jpg、png、jpegတင်လို့ရပါသည်,ဓာတ်ပုံဆိုဒ်1Mထက်မကျော်ရပါ</p>
				<button class="security-btn" @click="submit">ပေးပို့သည်</button>
			</div>
			<div v-else-if="step==1">
				<img src="../../../assets/images/authentication/wait.png" class="wait">
				<p class="font18 textC">အချက်အလက်များပေးပို့လိုက်ပါြပီ,ကျေးဇူးပြု၍စစ်ဆေးပေးနေပါသည်ခေတ်တစောင့်ဆိုင်းပေးပါ</p>
				<button class="security-btn step3-btn" @click="$router.push('index')">ပေးပို့သည်</button>
			</div>
			<div v-else-if="step==2">
				<img src="../../../assets/images/authentication/success.png" class="wait">
				<p class="font18 textC">သင်ၕအထောက်အထားကိုအတည်ပြုပြီး</p>
				<div class="reAuth"> </div>
			</div>
			<div v-else-if="step==3">
				<img src="../../../assets/images/authentication/fail.png" class="wait">
				<p class="font18 textC">သင့်ရဲ့အထောက်အထားကိုအတည်မပြုရပါ</p>
				<div class="reAuth" @click="reAuth">ပြန်လည်အတည်ပြုခြင်း</div>
			</div>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/security/authentication'
	
export default {
	name: 'authentication',
	mixins: [logic]
}
</script>