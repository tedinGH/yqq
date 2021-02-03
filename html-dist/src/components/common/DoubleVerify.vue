<template>
	<div class="b-popup" v-if="showPopup">
		<div :class="['mask', showPopup ? 'in' : '']" @click="showPopup = false"></div>
		<div :class="['b-popup-box', 'double-verify', showPopup ? 'in' : '']">
			<div class="input-item" v-if="value.email">
				<p class="red-tip">{{ this.$t('msg').dbVerify.yourEmail }}：{{ value.email | filterEmail }}</p>
				<div>
					<span class="item">{{ this.$t('msg').dbVerify.emailCode }}:</span>
					<div class="input-box">
						<input type="tel" class="input" v-model="send.emailCode" maxlength="4" :placeholder="$t('msg').dbVerify.emailPlaceholder">
						<email-code v-model="value.email" :indx="codeIdx[0]" :codeKey="true"></email-code>
					</div>
				</div>
			</div>
			<div class="input-item" v-if="value.mobile">
				<p class="red-tip">{{this.$t('msg').dbVerify.yourPhone}}：{{value.mobile | filterPhone}}</p>
				<div>
					<span class="item">{{this.$t('msg').dbVerify.phoneCode}}:</span>
					<div class="input-box">
						<input type="tel" class="input" v-model="send.smsCode" maxlength="4" :placeholder="$t('msg').dbVerify.phonePlaceholder">
            <sms-code v-model="value.mobile" :indx="codeIdx[1]" :codeKey="true"></sms-code>
					</div>
				</div>
			</div>
			<button class="security-btn" @click="confirm">{{this.$t('msg').dbVerify.confirm}}</button> 
		</div>
	</div>
</template>

<script>
  import api from '@/api'
  import { validate } from '@/utils/validate';

  export default {
    data (){ 
			return {
				codeIdx: [],
				showPopup: false,
				send:{
					emailCode:'',
					smsCode:'',
				},
				timer: [],
				locales: this.$store.state.langData
			}
		},	
		props: {
			value:{ 
				type: Object
			}
		},			
		methods: {
			show(val) {
				this.showPopup = true;
				this.codeIdx = val;
			},
			confirm(){

				var emailCode = this.send.emailCode;
				if (this.value.email) {
					if (!validate.isEmailCode(emailCode)) {
						this.$toast(this.locales.codeError);
						return false;
					}
				}
				var smsCode = this.send.smsCode;
				if (this.value.mobile) {
					if (!validate.isSmsCode(smsCode)) {
						this.$toast(this.locales.codeError);
						return false;
					}
				}
				var opt = {
		          	mobileVerifyCode: smsCode,
		          	emailVerifyCode: emailCode,
		          	securityAuthType: this.codeIdx[2],
		          	userName:this.value.userName
		        }
				api.doubleVerify(opt).then(
					res => {
						this.showPopup = false;
						this.$emit('verify', this.showPopup);
					},() => {}
				)
			},
		},
		mounted () {
			this.locales = this.$t('msg').tip;
		}
  }
</script>

<style lang="scss">
.double-verify {
	width: 685px;
	padding: 54px 54px 30px 54px;
	.input-item {
		.red-tip {
			padding-left: 190px;
			color: #FF5050;
		}
		.item {
			display: inline-block;
			width: 175px;
			padding-right:10px;
			font-size: 17px;
			text-align:right;
		}
		.input-box {
			position: relative;
			display: inline-block;
			width: 382px;
			height: 54px;
			border-radius: 10px;
			margin: 10px 0 30px 0;
			border: 1px solid #a5a5a5;
			.input {
				display: block;
				width: 100%;
				height: 100%;
				line-height: 100%;
				padding: 0 8px;
				border: 0;
				background-color: rgba(0, 0, 0, 0);
				font-size: 17px;
        color: #999;
      }
		}
  }
  .get-code {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 150px;
    height: 40px;
    margin: auto 0;
    border: 0;
    border-left: 1px solid #e0e0e0;
    font-size: 17px;
    line-height: 40px;
    white-space:pre;
    text-align: center;
    color: #596C96;
    background-color: rgba(0, 0, 0, 0);
  }
}

	@media only screen and (min-width: 0px) and (max-width: 900px){
		.double-verify{
			width:21.07rem;
			padding:  1.42rem;
			.input-item{
				.red-tip{
          padding: 0;
          color: #8D95A2;
          font-size: .85rem;
				}
				.input-box{
					width: 18.21rem;
					height: 2.85rem;
          margin: 1.42rem 0 1.42rem 0;
          background: #F7F8FD;
          border-radius: 4px;
          border: 0px;
					.input{
						font-size: .8rem;
					}
				}
				.item{
					display: none;
				}
				.get-code {
					width: 7rem;
					height: 1.8rem;
					font-size: .86rem;
          line-height: 1.8rem;
          color: #46B4AA;
				}
			}
		}
		.security-btn{
			width:8.42rem;
			height: 2.57rem;
			margin: 0 auto;
			border-radius: 0.28rem;
      font-size: 1rem;
      background: #46B4AA;
		}
	}
</style>





