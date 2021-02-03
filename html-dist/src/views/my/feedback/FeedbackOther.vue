<template>
	<div class="feedback-wraper">
		<header>
			<span @click="goback"><i></i></span>
			အမြင်တုံ့ပြန်မူ
		</header>
		<div class="title">ကျေးဇူးပြု၍ သေချာသောပြသနာကိုဖော်ပြပါ
			<span>{{send.remark.length+'/200'}}</span>
		</div>
		<div class="form-content">
			<div class="form-textarea">
				<textarea name="" rows="8" maxlength="200" v-model="send.remark" placeholder="ကျေးဇူးပြု၍သင့်ပြသနာအကြောင်းရင်းကိုစာလုံး၁၀လုံးအထက်ရေးပြီး ကျွန်တော်တို့ထံတင်ပါ ကျွနှပ်တို့အ‌ကောင်းဆုံးသောအကူညီနှင့်၀န်ဆောင်မူပေးပါမည်"></textarea>
			</div>
		</div>
		<div class="title">ဓါတ္ပံု
			<span>{{send.uploadImgArr.length+'/3'}}</span>
		</div>
		<div class="form-content">
			<div class="form-img">
				<div class="item-img upload" v-for="(item,index) in send.uploadImgArr" :key="index">
					<img preview="0" :src="item.url"><i @click="deleteImg(index)"></i>
				</div>
				<div class="item-img" v-if="send.uploadImgArr.length<3">
					<input type="file" id="file" accept=".jpg,.png,.jpeg,.gif,.bmp" v-if="!isIOS" @change="uploadImg($event)" capture="camera" multiple/>
					<input type="file" id="file" accept=".jpg,.png,.jpeg,.gif,.bmp" v-if="isIOS" @change="uploadImg($event)" />
					<img src="../../../assets/images/feedback/upload.png">
				</div>
			</div>
		</div>
		<div class="title">ကျေးဇူးပြု၍ ဆက်သွယ်ရမည့်နေရာကိုရွေးချယ်ပါ</div>
		<div class="form-content">
			<div class="form-tab">
				<div class="item-tab" @click="send.contactType='1';send.contactNum='';" :class="{active:send.contactType=='1'}">ဖုန်းနံပါတ်</div>
				<div class="item-tab" @click="send.contactType='3';send.contactNum='';" :class="{active:send.contactType=='3'}">အခြား</div>
				<div class="item-tab" @click="send.contactType='2';send.contactNum='';" :class="{active:send.contactType=='2'}">အီးေမး</div>
			</div>
			<div class="form-input">
				<input type="text" id="contact" v-model="send.contactNum" placeholder="ဆက်သွယ်ရမည့်နေရာကိုရိုက်ထည့်ပါ" />
			</div>
		</div>
		<div class="footer">
			<button type="button" @click="doSubmit();">ပေးပို့သည်</button>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/feedback/feedbackOther';
	
export default {
	name: 'feedbackOther',
	mixins: [logic]
}
</script>

<style lang="scss">
	@import "../../../assets/scss/feedback.scss"; 
</style>