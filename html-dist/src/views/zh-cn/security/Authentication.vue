<template>
	<div class="main" v-show="showPage">
		<div class="security-panel authentication">
			<h3 class="main-title crumb"><span class="em">身份认证</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div  v-if="step==0">
				<div class="authentication-tip">
					<div class="txt">请填写您的真实信息，一经通过无法修改</div>
				</div>
				<div class="authentication-type">
					<span :class="[type == 0 ? 'active' : '']" @click="setType(0)">身份证认证</span>
					<span class="line"></span>
					<span :class="[type == 1 ? 'active' : '']" @click="setType(1)">护照认证</span>
				</div>
				<div class="form">
					<div class="mb30">
						<span class="item">国家</span>
						<div class="input-box" @click="showCountryCode">
							<input type="text" class="input" placeholder="请选择国家" :value="send.phoneCode+'  '+send.country" readonly>
							<div class="select-box" v-show="showSelect">
								<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
							</div>
						</div>
					</div>
					<div class="mb30">
						<p class="item">名字</p>
						<div class="input-box">
							<input type="text" class="input" ref="name" placeholder="请输入您的名字" maxlength="20">
						</div>
					</div>
					<div class="mb30">
						<p class="item">姓氏</p>
						<div class="input-box">
							<input type="text" class="input" ref="surname" placeholder="请输入您的姓氏" maxlength="20">
						</div>
					</div>
					<div class="mb30">
						<p class="item">证件号码</p>
						<div class="input-box">
							<input type="tel" class="input" ref="idcard" placeholder="请输入证件号码" maxlength="25">
						</div>
						<div class="promise">
							<label class="radio"><input type="radio" @click="agree" :checked="isAgree"><i></i></label>
							<div class="content">本人承诺，本人所提交的认证信息均为本人合法所有，不存在盗用、冒用他人信息和身份的情况</div>
						</div>
					</div>
					<button class="submit" @click="next">下一步</button>
				</div>
			</div>
			<div v-else-if="step==4" class="step2-form">
				<p>请确保照片的内容完整并清晰可见</p>
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
							<p class="tip">请上传证件照片（正面）</p>
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
							<p class="tip">请上传证件照片（背面）</p>
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
							<p class="tip">请上传手持证件正面和个人签名照</p>
						</div>
					</div>
				</div>
				<p class="red-tip">备注：支持上传jpg、png、jpeg格式照片，照片大小不超过1M</p>
				<button class="security-btn" @click="submit">提交</button>
			</div>
			<div v-else-if="step==1">
				<img src="../../../assets/images/authentication/wait.png" class="wait">
				<p class="font18 textC">资料已提交，请耐心等待审核结果</p>
				<button class="security-btn step3-btn" @click="$router.push('index')">确定</button>
			</div>
			<div v-else-if="step==2">
				<img src="../../../assets/images/authentication/success.png" class="wait">
				<p class="font18 textC">您的身份信息已经通过认证</p>
				<div class="reAuth"> </div>
			</div>
			<div v-else-if="step==3">
				<img src="../../../assets/images/authentication/fail.png" class="wait">
				<p class="font18 textC">您的身份信息未通过认证</p>
				<div class="reAuth" @click="reAuth">重新认证</div>
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