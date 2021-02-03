<template>
	<div class="m-wraper warper2">
		<header>
			<span @click="goback"><i></i></span>提交给EchatAPP团队审核
		</header>
		<div class="title title2"><em>*</em> 图片证据
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
		<div class="title">投诉内容（选填）
		</div>
		<div class="form-content">
			<div class="form-textarea">
				<textarea name="" rows="8" maxlength="200" v-model="send.content" cols="" placeholder="请详细描述被举报对象的恶意行为"></textarea>
        <span class="sum">{{send.content.length+'/200'}}</span>
			</div>
		</div>
		<div class="footer">
			<button type="button" @click="doSubmit()">提交</button>
		</div>
		<!-- 确认弹层 -->
		<div class="b-popup" v-show="layerConfirm">
			<div :class="['mask',layerConfirm?'in':'']" @click="layerConfirm=false"></div>
			<div :class="['b-popup-box layer-confirm',layerConfirm?'in':'']">
				<div><p>是否确认提交？</p></div>
				<button class="cancel" @click="layerConfirm=false">取消</button>
				<button class="comfirm" @click="doSubmit()" >确认</button>
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

