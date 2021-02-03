<template>
	<div class="m-wraper warper2">
		<header>
			<span @click="goback"><i></i></span>ပေးပို့ထားသောအချက်များကိုEchatAPP groupမှစစ်ဆေးပေးခြင်း
		</header>
		<div class="title title2"><em>*</em>ဓာတ်ပုံသက်သေ
			<span>{{send.uploadImgArr.length+'/9'}}</span>
		</div>
		<div class="form-content">
			<div class="form-img">
				<div class="item-img upload" v-for="(item,index) in send.uploadImgArr" :key="index">
					<img preview="0" :src="item.url"><i @click="deleteImg(index)"></i>
				</div>
				<div class="item-img" v-if="send.uploadImgArr.length<9">
					<input type="file" id="file" accept=".jpg,.png,.jpeg,.gif,.bmp" v-if="!isIOS" @change="uploadImg($event)" capture="camera" multiple/>
					<input type="file" id="file" accept=".jpg,.png,.jpeg,.gif,.bmp" v-if="isIOS" @change="uploadImg($event)" />
					<img src="../../../assets/images/feedback/upload.png">
				</div>
			</div>
		</div>
		<div class="title">တိုင္ၾကားရျခင္း၏အေၾကာင္းအရာ
		</div>
		<div class="form-content">
			<div class="form-textarea">
				<textarea name="" rows="8" maxlength="200" v-model="send.content" cols="" placeholder="ကျေးဇူးပြု၍တိုင်ခံရသောတဖတ်သူ၏လုပ်ဆောင်မူကိုအသေးစိတ်ဖော်ြပပါ"></textarea>
        <span class="sum">{{send.content.length+'/200'}}</span>
			</div>
		</div>
		<div class="footer">
			<button type="button" @click="doSubmit()">ပေးပို့သည်</button>
		</div>
		<!-- 确认弹层 -->
		<div class="b-popup" v-show="layerConfirm">
			<div :class="['mask',layerConfirm?'in':'']" @click="layerConfirm=false"></div>
			<div :class="['b-popup-box layer-confirm',layerConfirm?'in':'']">
				<div><p>မင်းရဲ့တင်သွင်းမှုကိုအတည်ပြုပါသလား？</p></div>
				<button class="cancel" @click="layerConfirm=false">ဖျက်သိမ်း</button>
				<button class="comfirm" @click="doSubmit()" >အတည်ပြု</button>
			</div>
		</div>
	</div>
</template>

<script> 
import logic from '../../mixins/complaint/complaintForm'
	
export default {
	name: 'complaintForm',
	mixins: [logic]
}
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/mobile.scss"; 
</style>

