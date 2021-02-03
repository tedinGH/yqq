<template>
	<div class="main en-us" v-show="showPage">
		<div class="security-panel authentication">
			<h3 class="main-title crumb"><span class="em">Account Security</span><i>＞</i><span>{{$route.meta.title}}</span></h3>
			<div  v-if="step==0">
				<div class="authentication-tip">
					<div class="txt">Please fill in your true information, once passed, it can not be modified.</div>
				</div>
				<div class="authentication-type">
					<span :class="[type==0?'active':'']" @click="setType(0)">Identity Card</span>
					<span class="line"></span>
					<span :class="[type==1?'active':'']" @click="setType(1)">Passport</span>
				</div>
				<div class="form">
					<div class="mb30">
						<span class="item">Country</span>
						<div class="input-box" @click="showCountryCode">
							<input type="text" class="input" placeholder="Your country" :value="send.phoneCode+'  '+send.country" readonly>
							<div class="select-box" v-show="showSelect">
								<CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
							</div>
						</div>
					</div>
					<div class="mb30">
						<p class="item">Name</p>
						<div class="input-box">
							<input type="text" class="input" ref="name" placeholder="Your name" maxlength="20">
						</div>
					</div>
					<div class="mb30">
						<p class="item">Surname</p>
						<div class="input-box">
							<input type="text" class="input" ref="surname" placeholder="Your surname" maxlength="20">
						</div>
					</div>
					<div class="mb30">
						<p class="item">ID Number</p>
						<div class="input-box">
							<input type="tel" class="input" ref="idcard" placeholder="Number" maxlength="25">
						</div>
						<div class="promise">
							<label class="radio"><input type="radio" @click="agree" :checked="isAgree"><i></i></label>
							<div class="content">I promise that all the authentication information I submit is lawfully owned by myself and that there is no case of embezzlement or fraudulent use of other people's information and identity.</div>
						</div>
					</div>
					<button class="submit" @click="next">next</button>
				</div>
			</div>
			<div v-else-if="step==4" class="step2-form">
				<p>Make sure the content of the photo is complete and clear.</p>
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
							<p class="tip">Please upload your ID photo (front)</p>
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
							<p class="tip">Please upload your ID photo (back)</p>
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
							<p class="tip">Please upload the front of your hand-held certificate and your personal signature photo.</p>
						</div>
					</div>
				</div>
				<p class="red-tip">Note: Supports uploading jpg, png, JPEG format photos, the size of the photos does not exceed 1M</p>
				<button class="security-btn" @click="submit">Submit</button>
			</div>
			<div v-else-if="step==1">
				<img src="../../../assets/images/authentication/wait.png" class="wait">
				<p class="font18 textC">The information has been submitted. Please be patient and wait for the results of the audit.</p>
				<button class="security-btn step3-btn" @click="$router.push('index')">Comfirm</button>
			</div>
			<div v-else-if="step==2">
				<img src="../../../assets/images/authentication/success.png" class="wait">
				<p class="font18 textC">Your identity information has been authenticated</p>
				<div class="reAuth"> </div>
			</div>
			<div v-else-if="step==3">
				<img src="../../../assets/images/authentication/fail.png" class="wait">
				<p class="font18 textC">Your identity information has not been authenticated</p>
				<div class="reAuth" @click="reAuth">Recertification</div>
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