<template>
	<div class="m-wraper warper2">
		<header>
			<span @click="goback"><i></i></span>Submit to EchatAPP Group for Audit
		</header>
		<div class="title title2"><em>*</em> Picture evidence
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
		<div class="title">Complaints (optional)
		</div>
		<div class="form-content">
			<div class="form-textarea">
				<textarea name="" rows="8" maxlength="200" v-model="send.content" placeholder="Please describe in detail the malicious behavior of the reported object."></textarea>
        <span class="sum">{{send.content.length+'/200'}}</span>
      </div>
		</div>
		<div class="footer">
			<button type="button" @click="doSubmit()">Submit</button>
		</div>
		<!-- 确认弹层 -->
		<div class="b-popup" v-show="layerConfirm">
			<div :class="['mask',layerConfirm?'in':'']" @click="layerConfirm=false"></div>
			<div :class="['b-popup-box layer-confirm',layerConfirm?'in':'']">
				<div><p>Are submissions confirmed?</p></div>
				<button class="cancel" @click="layerConfirm=false">Cancel</button>
				<button class="comfirm" @click="doSubmit()" >Comfirm</button>
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

