<template>
	<div class="fixed-page" :class="{active: isShow}">
		<header>
			<span @click="hide"><i></i></span>
			Supplementary information
		</header>
		<div class="title">Please describe the details.
			<span>{{send.remark.length+'/200'}}</span>
		</div>
		<div class="form-content">
			<div class="form-textarea">
				<textarea name="" rows="8" maxlength="200" v-model="send.remark" cols="" placeholder="Please fill in more than ten words of question description so that we can provide the best help and service."></textarea>
			</div>
		</div>
		<div class="title">Pictures (Selected Fills, Provides Question Screens)
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
			<button type="button" @click="doComfirm">Submit</button>
		</div>
		<!-- 确认弹层 -->
		<div class="b-popup" v-show="layerConfirm">
			<div :class="['mask',layerConfirm?'in':'']" @click="layerConfirm=false"></div>
			<div :class="['b-popup-box layer-confirm',layerConfirm?'in':'']">
				<div><p>Are submissions confirmed?</p></div>
				<button class="cancel" @click="layerConfirm=false;">Cancel</button>
				<button class="comfirm" @click="doSubmit()" >Comfirm</button>
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

