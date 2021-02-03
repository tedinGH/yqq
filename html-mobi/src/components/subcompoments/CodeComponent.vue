<template>
	<div class="code" v-if="isShow" :class="{active: isShow}">
		<div class="code-content">
			<div class="code-head"><span v-html="$t('msg').codeComp.clickBlow"></span><span class="code-col" v-text="codeStr"></span></div>
			<div class="code-bg">
				<img src="../../assets/images/code-bg.jpg" />
				<div class="codebox">
					<span v-for="(item,idx) in codeArr" :key="idx" v-bind:style="{top:(item.point.top/60)+'rem',left:(item.point.left/60)+'rem'}"  :class="{active: item.checked}" @click="codeClick(item.value,item.checked);if(!item.checked){item.temp=tempStr.length}item.checked=true;" v-text="item.temp"></span>
				</div>
			</div>
			<div class="code-wait" :class="{active: codeTimeStatus}" >{{this.$t('msg').codeComp.busy}}<span v-text="codeTime"></span>s</div>
			<div class="code-refash" @click="doRefresh()"></div>
			<div class="code-cancel" @click="doCancel()"></div>
			<a href="javascript:;" class="code-btn" :class="{active: comfirmStatus}" @click="doConfirm()">{{this.$t('msg').codeComp.confirm}}</a>
		</div>
	</div>
</template>

<script>
	import api from '@/api'
  	import { Util } from '@/utils/utils';
	export default {
		name: 'CodeComponent',
		data() {
			return {
				data:null,
				codeData:null,
				codeIndex:0,
				codeStr: '',
				codeArr: null,
				codeTime:25,
				codeTimeStatus:false,
				isShow: false,
				comfirmStatus: false,
				tempStr: '',
				timeOut:true
			}
		},
		methods: {
			createPoint(h,w,num) {
				var pointArr = [];
				var check = function(top,left,arr) {
					var status = false;
					if(arr && arr.length){
						for(var i=0;i<arr.length;i++){
							if(Math.abs(arr[i].top-top)<40 && Math.abs(arr[i].left-left)<40){status = true;}
						}
						return status;
					}else{return false;}
				}
				var createOnePoint = function() {
					let top,left,item;
					let createCircleTimes = 0
					top = Math.floor(Math.random() * h);
					left = Math.floor(Math.random() * w);
					if(check(top,left,pointArr)){return false;}
					item = {'top':top,'left':left}
					pointArr.push(item)
				}
				let n = 0
				while(pointArr.length < num) {
					pointArr = []
					let i = 0;
					while (pointArr.length < num) {
						createOnePoint();
						i ++ ;
						if (i >= 100) {break;}
					}
					n ++ 
					if (n > 100) {break;}
				}
				return pointArr;
			},
			//获取验证码
			getCodeInfo() {

				api.createSelectCode({}).then(
					data => {
						this.data = data;
						this.codeData = this.codeToArr(data);
						this.codeIndex = 0;
						this.codeStr = this.codeData[this.codeIndex].value;
						this.codeArr = this.codeData[this.codeIndex].arr;
					}, () => {}
				)
			},
			//格式化
			codeToArr(codeObj){
				var option = {h: 40,w: 40,ph: 190,pw: 365};
				var result = [];
				for(var key in codeObj.codeMap){
					var value = Util.decryptByDES(codeObj.codeMap[key], codeObj.selectionCodeKey);
					var pointArray = this.createPoint(130,287,value.length);
					var arr = [];
					for (var i = 0; i < value.length; i++) {
						var val = {
							"value": value[i],
							"temp": value[i],
							"checked": false,
							"point": pointArray[i]
						};
						arr.push(val);
					}
					var item = {
						'key': key,
						'value': value,
						'arr': arr
					}
					result.push(item);
				}
				return result;
			},
			showcode() {
				var that = this;
				that.getCodeInfo();
				that.isShow = true;
				that.comfirmStatus = false;
				that.tempStr = '';
				that.codeTimeStatus = false;
				that.codeTime = 25;
				this.timeOut = true;
			},
			doCancel() {
				this.isShow = false;
				this.codeTime = 25;
				this.codeTimeStatus = false;
			},
			doRefresh() {
				var that = this;
				if(this.codeIndex<this.codeData.length-1){
					this.codeIndex++;
					this.codeStr = this.codeData[this.codeIndex].value;
					this.codeArr = this.codeData[this.codeIndex].arr;
					this.comfirmStatus = false;
					this.tempStr = '';
				}else{
					if(!this.codeTimeStatus){
						this.codeTimeStatus = true;
						this.vCodeTimeOut();
					}
				}
			},
			//倒计时
			vCodeTimeOut(){
				if(this.codeTimeStatus){
          this.codeTime--;
          
					if(this.codeTime > 0){
						setTimeout(() => {
							this.vCodeTimeOut();
						}, 1000)
					}else{
						this.getCodeInfo();
						this.codeTimeStatus = false;
						this.isShow = true;
						this.comfirmStatus = false;
						this.tempStr = '';
						this.codeTime = 25;
					}
				}
			},
			randomNum(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			},
			codeClick(text,status) {
				if(!status){
					this.tempStr += text;
				}
				if (this.tempStr.length == this.codeStr.length) {
					this.comfirmStatus = true;
				}
				//console.log(this.tempStr)
			},
			doConfirm() {
				if (!this.comfirmStatus) {
					return false;
				}
				//验证验证码
				var postData = {
					'selectionCodeKey': this.data.selectionCodeKey,
					'selectionCode': Util.encryptByMd5(this.tempStr),
					'selectionCodeNumber': this.codeIndex+1,
				}

				api.checkSelectCode(postData).then(
					data => {
						this.$store.commit('setSelectionCodeKey', data);
						this.$emit('codeConfirmHandler');
						this.isShow = false;
					}, () => {
						this.doRefresh();
					}
				)
			},
		},
		mounted(){}
	}
</script><style lang="scss" scoped="" type="text/css">
.code {
	display: none;
	z-index: 100;
	position: fixed;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	background: rgba(0, 0, 0, .4);
	.code-content {
		position: relative;
		left: 50%;
		top: 50%;
		width: 6.4rem;
		height: 5.02rem;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		background: #FFFFFF;
		border-radius: .2rem;
		.code-head {
			height: .77rem;
			line-height: .77rem;
			padding-left: .35rem;
			font-size: .24rem;
			.col {
				color: rgb(235, 145, 69);
			}

			.code-col {
				padding-left: 15px;
				color: rgb(235, 145, 69);
				letter-spacing: .8em;
			}
		}
		.code-bg {
			position: relative;
			left: .35rem;
			width: 5.69rem;
			height: 2.96rem;
			img {
				width: 5.69rem;
				height: 2.96rem;
			}
			.codebox {
				position: absolute;
				top: 0;
				left: 0;
				width: 5.69rem;
				height: 2.96rem;
				span {
					position: absolute;
					left: 0;
					top: 0;
					display: inline-block;
					height: .62rem;
					line-height: .62rem;
					width: .62rem;
					text-align: center;
					border-radius: 50%;
					background: #FFF;
					font-size: .3rem;
					color: #555;
					cursor: pointer;
				}
				span.active {
					background: #FFA405;
					color: #FFF;
				}
			}
		}
		.code-refash {
			position: absolute;
			left: .34rem;
			bottom: .4rem;
			display: inline-block;
			height: .5rem;
			width: .5rem;
			background-image: url(../../assets/images/refash.png);
			background-size: 100% 100%;
		}

		.code-cancel {
			position: absolute;
			right: .27rem;
			top: .14rem;
			display: inline-block;
			height: .42rem;
			width: .42rem;
			background-image: url(../../assets/images/cancel.png);
			background-size: 100% 100%;
		}
		.code-wait {
			display: none;
			position: absolute;
			left: 1rem;
			bottom: .45rem;
			height: .42rem;
			line-height: .42rem;
			font-size: .19rem;
			width: auto;
			color: #f40;
		}
		.code-wait.active{
			display: inline-block;
		}
		.code-btn {
			position: absolute;
			right: .37rem;
			bottom: .34rem;
			display: inline-block;
			height: .65rem;
			line-height: .65rem;
			width: 1.59rem;
			background: #bbb;
			font-size: .25rem;
			color: #fff;
			text-align: center;
			border-radius: .33rem;
		}

		.code-btn.active {
			background: #46B4AA;
		}
	}
}
.code.active {
	display: block;
}
</style>
