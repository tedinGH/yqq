<template>
	<div class="fixed-page" :class="{active: isShow}">
		<!-- <header>
			<span @click="hide"><i></i></span>
			补充信息
		</header> -->
		<div class="title">请描述具体情况
			<span>{{send.remark.length+'/200'}}</span>
		</div>
		<div class="form-content">
			<div class="form-textarea">
				<textarea name="" rows="8" maxlength="200" v-model="send.remark" cols="" placeholder="请填写十个字以上的问题描述以便我们提供最好的帮助和服务"></textarea>
			</div>
		</div>
		<div class="title">图片（选填，提供问题截图）
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
			<button type="button" @click="doComfirm">提交</button>
		</div>
		<!-- 确认弹层 -->
		<div class="b-popup" v-show="layerConfirm">
			<div :class="['mask',layerConfirm?'in':'']" @click="layerConfirm=false"></div>
			<div :class="['b-popup-box layer-confirm',layerConfirm?'in':'']">
				<p>是否确认提交？</p>
				<button class="cancel" @click="layerConfirm=false;">取消</button>
				<button class="comfirm" @click="doSubmit()" >确认</button>
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