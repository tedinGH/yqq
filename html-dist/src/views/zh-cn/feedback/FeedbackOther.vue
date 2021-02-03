<template>
	<div class="feedback-wraper">
		<header>
			<span @click="goback"><i></i></span>
			意见反馈
		</header>
		<div class="title">请描述具体情况
			<span>{{send.remark.length+'/200'}}</span>
		</div>
		<div class="form-content">
			<div class="form-textarea">
				<textarea name="" rows="8" maxlength="200" v-model="send.remark" placeholder="请填写十个字以上的问题描述以便我们提供最好的帮助和服务"></textarea>
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
					<img src="../../../assets/images/feedback/upload.png">
				</div>
			</div>
		</div>
		<div class="title">请选择您的联系方式</div>
		<div class="form-content">
			<div class="form-tab">
				<div class="item-tab" @click="send.contactType='1';send.contactNum='';" :class="{active:send.contactType=='1'}">手机号</div>
				<div class="item-tab" @click="send.contactType='3';send.contactNum='';" :class="{active:send.contactType=='3'}">其他</div>
				<div class="item-tab" @click="send.contactType='2';send.contactNum='';" :class="{active:send.contactType=='2'}">邮箱</div>
			</div>
			<div class="form-input">
				<input type="text" id="contact" v-model="send.contactNum" placeholder="输入您的联系方式" />
			</div>
		</div>
		<div class="footer">
			<button type="button" @click="doSubmit();">提交</button>
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