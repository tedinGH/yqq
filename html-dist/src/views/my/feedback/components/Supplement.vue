<template>
	<div class="fixed-page" :class="{active: isShow}">
		<header>
			<span @click="hide"><i></i></span>
			မတ်ဆေ့ပြန်လည်ဖြည့်စွပ်ခြင်း
		</header>
		<div class="title">ကျေးဇူးပြု၍ သေချာသောပြသနာကိုဖော်ပြပါ
			<span>{{send.remark.length+'/200'}}</span>
		</div>
		<div class="form-content">
			<div class="form-textarea">
				<textarea name="" rows="8" maxlength="200" v-model="send.remark" cols="" placeholder="ကျေးဇူးပြု၍သင့်ပြသနာအကြောင်းရင်းကိုစာလုံး၁၀လုံးအထက်ရေးပြီး ကျွန်တော်တို့ထံတင်ပါ ကျွနှပ်တို့အ‌ကောင်းဆုံးသောအကူညီနှင့်၀န်ဆောင်မူပေးပါမည်"></textarea>
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
					<img src="../../../../assets/images/feedback/upload.png">
				</div>
			</div>
		</div>
		<div class="footer">
			<button type="button" @click="doComfirm">ပေးပို့သည်</button>
		</div>
		<!-- 确认弹层 -->
		<div class="b-popup" v-show="layerConfirm">
			<div :class="['mask',layerConfirm?'in':'']" @click="layerConfirm=false"></div>
			<div :class="['b-popup-box layer-confirm',layerConfirm?'in':'']">
				<p>မင်းရဲ့တင်သွင်းမှုကိုအတည်ပြုပါသလား？</p>
				<button class="cancel" @click="layerConfirm=false;">ဖျက်သိမ်း</button>
				<button class="comfirm" @click="doSubmit()" >အတည်ပြု</button>
			</div>
		</div>
	</div>
</template>

<script>
import logic from '../../../mixins/feedback/supplement'
	
export default {
	name: 'supplement',
	mixins: [logic],
}
</script>