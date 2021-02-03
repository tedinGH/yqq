<template>
	<div class="b-popup" v-if="showPopup">
		<div :class="['mask', showPopup?'in':'']" @click="showPopup = false"></div>
		<div :class="['b-popup-box google-download', showPopup?'in':'']">
			<p class="font18">{{this.$t('msg').google.first}}</p>
			<p class="mt8">{{this.$t('msg').google.fp1}}</p>
			<p>{{this.$t('msg').google.fp2}}</p>
			<p>{{this.$t('msg').google.fp3}}</p>
			<div class="download-btn">
				<a href="http://gdown.baidu.com/data/wisegame/b252bbfe27b6894d/shenfenyanzhengqi_5000000.apk">
					<img src="../../assets/images/download.png">
					<span>{{this.$t('msg').google.download}}</span>
				</a>
			</div>
			<p class="font18">{{this.$t('msg').google.second}}</p>
			<p class="font18">{{this.$t('msg').google.sp1}}</p>
			<p class="red font14 mt15">{{this.$t('msg').google.sp2}}</p>
			<div class="QR-code">
				<canvas id="googleCanvas"></canvas>
			</div>
			<p><span class="mr30">{{this.$t('msg').google.laws}}</span>
			<span class="mr30">{{googleDetails.secret}}</span>
			<span class="mr30 blue" id="cpbtn" @click="copy(googleDetails.secret)">{{this.$t('msg').google.copy}}</span>
			<span class="blue" @click="refresh">{{this.$t('msg').google.refash}}</span></p>
			<p class="font18 mt20">{{this.$t('msg').google.third}}</p>
			<input type="text" class="input" autocomplete="off" v-model="googleCode" :placeholder="this.$t('msg').google.tp1" />
			<button class="security-btn" @click="openGoogle">{{this.$t('msg').google.tp2}}</button>
		</div>
	</div>
</template>

<script>
import QRCode from 'qrcode';
import api from '@/api'

export default {
	name: 'GoogleComponent',
	data (){
		return {
			data: {},
			showPopup: false,
			googleDetails: {
				secret: '132465',
				qrCodeData: '132465',
			},
			googleCode: ''
		}
	},
	props: {
		value:{
			type:Object
		}
	},
	components: { 
		QRCode
	},
	methods: {
		show(){
			this.showPopup = true;
			this.data = this.value;
			this.getGoogleDetails();
		},
		useqrcode(path,id){
			var canvas = document.getElementById(id);
			QRCode.toCanvas(canvas, path, function (error) {
			  if (error) console.error(error)
			})
		},
		getGoogleDetails(opt, cb, cberr){
			api.createGoogleCode({}).then(
				data => {
					this.googleDetails = data;
					this.useqrcode(this.googleDetails.qrCodeData, 'googleCanvas');
				},() => {}
			)
		},
		copy(text){
			let oInput = document.createElement('input');
      oInput.value = text;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); 
      document.body.removeChild(oInput);
			this.$toast(this.$t('msg').tip.copy_success);
		},
		refresh(){
			this.getGoogleDetails();
		},
		openGoogle(){
			api.openGoogle({googleCode: this.googleCode}).then(
				data => {
					this.$toast(data);
					this.showPopup = false;
					this.$emit('google',false);
				},() => {}
			)
		}
	}
}
</script>

<style lang="scss" scoped>
.google-download {
	width: 726px;
	padding: 30px 44px;
	p {
		text-align: center;
		line-height: 24px;
		font-size: 16px;
	}
	.download-btn {
		box-sizing: border-box;
		width: 138px;
		height: 46px;
		margin: 15px auto;
		padding: 7px;
		border: 1px solid #a5a5a5;
		border-radius: 5px;
		line-height: 28px;
		font-size: 16px;
		img {
			margin-right: 3px;
		}
	}
	.QR-code {
		width: 160px;
		height: 160px;
		margin: 25px auto;
	}
	.input {
		display: block;
		width: 100%;
		height: 56px;
		padding: 0 8px;
		margin: 20px 0;
		border: 1px solid rgba(187, 187, 187, 1);
		border-radius: 10px;
		font-size: 18px;
	}
	.security-btn {
		display: block;
		width: 444px;
		height: 56px;
		margin: 6px auto;
		border-radius: 10px;
		border: 0;
		background-color: #3D4975;
		color: #fff;
		font-size: 20px;
	}
}

</style>
