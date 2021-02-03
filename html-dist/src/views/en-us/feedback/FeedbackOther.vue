<template>
	<div class="feedback-wraper">
		<header>
			<span @click="goback"><i></i></span>
			Feedback
		</header>
		<div class="title">Please describe the details.
			<span>{{send.remark.length+'/200'}}</span>
		</div>
		<div class="form-content">
			<div class="form-textarea">
				<textarea name="" rows="8" maxlength="200" v-model="send.remark" placeholder="Please fill in more than ten words of question description so that we can provide the best help and service."></textarea>
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
					<img src="../../../assets/images/feedback/upload.png">
				</div>
			</div>
		</div>
		<div class="title">Please choose your contact information.</div>
		<div class="form-content">
			<div class="form-tab">
					<div class="item-tab" @click="send.contactType='1';send.contactNum='';" :class="{active:send.contactType=='1'}">Phone</div>
					<div class="item-tab" @click="send.contactType='3';send.contactNum='';" :class="{active:send.contactType=='3'}">Other</div>
					<div class="item-tab" @click="send.contactType='2';send.contactNum='';" :class="{active:send.contactType=='2'}">Email</div>
			</div>
			<div class="form-input">
				<input type="text" id="contact" v-model="send.contactNum" placeholder="Enter your contact information" />
			</div>
		</div>
		<div class="footer">
			<button type="button" @click="doSubmit">Submit</button>
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