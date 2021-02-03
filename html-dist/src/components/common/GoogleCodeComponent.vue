<template>
	<div class="googleCode" :class="{active: isShow}" @click="hide()">
		<div class="googleCode-content" :class="{active: showContent}" @click.stop=";">
			<div class="googleCode-title">安全验证<i></i></div>
			<div class="googleCode-label">谷歌验证码</div>
			<div class="googleCode-input">
				<input type="tel" maxlength="4" placeholder="请输入谷歌验证码" v-model="send.googleCode">
			</div>
			<a class="googleCode-button" @click="doConfirm()" :class="{active: send.googleCode.length==6}" href="javascript:;">确认</a>
		</div>
	</div>
</template>

<script>
  import { validate } from '@/utils/validate';

	export default {
		name: 'GoogleCodeComponent',
		data() {
			return {
				isShow:false,
				showContent:false,
				send:{
					googleCode:''
				},
				locales: this.$store.state.langData
			}
		},
		methods: {
			show() {
				this.isShow = true;
				this.showContent = true
			},
			hide() {
				this.isShow = false
				this.showContent = false
				this.send.googleCode = ''
			},
			doConfirm() {
				if(!validate.isSmsCode(this.send.googleCode)){
					this.$toast(this.locales.codeError)
					return false
				}
				this.$emit('googleCodeHandler',this.send.googleCode)
			},
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped="" type="text/css">
.googleCode {
	display: none;
	z-index: 10;
	position: fixed;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	background: rgba(0, 0, 0, .7);
	color: #777777;
	&.active {
		display: block;
	}
	.googleCode-content {
		position: relative;
		left: 50%;
		top: 50%;
		width: 461px;
		height: 228px;
		margin-top: 1180px;
		transform: translate(-50%, 0);
		-webkit-transform: translate(-50%, 0);
		transition: all .5s;
		background: #FFFFFF;
		&.active{
			margin-top: -118px;
		}
		.googleCode-title {
			font-size: 15px;
			padding: 11px 0;
			margin: 0 25px;
			border-bottom: 1px solid #e3e3e3;
		}
		.googleCode-label {
			font-size: 12px;
			padding: 15px 25px 30px 25px;
		}
		.googleCode-input {
			height: 30px;
			line-height: 1;
			margin: 0 25px;
			padding-bottom: 9px;
			border-bottom: 1px solid #e3e3e3;
			>input{
				height: 100%;
				width: 100%;
				background: transparent;
				border: none;
				outline: none;
				font-size: 18px;
				color: #777777;
			}
		}
		.googleCode-button{
			position: absolute;
			left: 25px;
			bottom: 15px;
			height:51px;
			line-height:51px;
			width: calc(100% - 50px);
			font-size: 18px;
			text-align: center;
			color: #fff;
			background: #C6C6C6;
			border-radius: 10px;
			outline: none;
		}
		.googleCode-button.active{
			background: #ffb358;
		}
	}
}

	/*mobile*/
	@media only screen and (min-width: 0px) and (max-width: 900px) {
		.googleCode {
			.googleCode-content {
				left: 0;
				top: 100%;
				width: 100%;
				height: 13.7rem;
				margin-top: 0;
				transform: none;
				.googleCode-title {
					font-size: .88rem;
					padding: .7rem 0;
					margin: 0 1.51rem;
				}
				.googleCode-label {
					font-size: .74rem;
					padding: .92rem 1.51rem 2.48rem 1.51rem;
				}
				.googleCode-input {
					height: 1.87rem;
					line-height: 1.07rem;
					margin: 0 1.51rem;
					padding-bottom: .59rem;
					>input{
						font-size: 1rem;
					}
				}
				.googleCode-button{
					left: 1.51rem;
					bottom: .71rem;
					height:3.22rem;
					line-height:3.22rem;
					width: calc(100% - 3.02rem);
					font-size: 1rem;
				}
				.googleCode-button.active{
					background: #ffb358;
				}
			}
			.googleCode-content.active{
				margin-top: -13.7rem;
			}
		}
		
	}

</style>
