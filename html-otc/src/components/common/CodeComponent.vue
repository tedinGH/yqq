<template>
	<div class="code" v-if="isShow">
		<div class="code-content">
			<div class="code-head"><span v-html="$t('msg').login.clickBlow"></span><span class="code-col" v-text="codeStr"></span></div>
			<div class="code-bg">
				<img src="../../assets/images/code-bg.jpg" />
				<div class="codebox">
					<span v-for="(item,index) in codeArr" 
						:key="index" 
						:style="{top:item.point.top+'px',left:item.point.left+'px'}" 
						:class="{active: item.checked}" 
						@click="codeClick(item)" 
						v-text="item.temp">
					</span>
				</div>
			</div>
			<div class="code-wait en" :class="{active: codeTimeStatus}" >{{this.$t('msg').login.busy}}<span v-text="codeTime"></span>s</div>
			<div class="code-refash" @click="doRefresh()"></div>
			<div class="code-cancel" @click="doCancel()"></div>
			<a href="javascript:;" class="code-btn" :class="{active: comfirmStatus}" @click="doConfirm()">{{this.$t('msg').common.confirms}}</a>
		</div>
	</div>
</template>

<script>
  import { Crypto } from '../../tools/crypto';

	export default {
		name: 'CodeComponent',
		data() {
			return {
				data: null,
				codeData: null,
				codeIndex: 0,
				codeStr: '',
				codeArr: null,
				codeTime: 25,
				codeTimeStatus: false,
				isShow: false,
				comfirmStatus: false,
				tempStr: '',
				timeOut: true
			}
		},
		methods: {
			createPoint(h, w, num) {
				let pointArr = []
				let check = function(top,left,arr) {
					let status = false
					if(arr && arr.length){
						for(let i=0;i<arr.length;i++){
							if(Math.abs(arr[i].top-top)<40 && Math.abs(arr[i].left-left)<40) status = true
						}
						return status
					}else{
						return false
					}
				}
				let createOnePoint = function() {
					let top,left,item
					let createCircleTimes = 0
					top = Math.floor(Math.random() * h)
					left = Math.floor(Math.random() * w)
					if(check(top,left,pointArr)) return false 
					item = {'top':top,'left':left}
					pointArr.push(item)
				}
				let n = 0
				while(pointArr.length < num) {
					pointArr = []
					let i = 0
					while (pointArr.length < num) {
						createOnePoint();
						i ++ 
						if (i >= 100)  break 
					}
					n ++ 
					if (n > 100) break 
				}
				return pointArr
			},
			//获取验证码
			getCodeInfo() {
				this.$http.createSelectCode({}).then(
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
				let option = {h: 40, w: 40, ph: 190, pw: 365},
          result = [];
				for(let key in codeObj.codeMap){
					let value = Crypto.decryptByDES(codeObj.codeMap[key], codeObj.selectionCodeKey),
            pointArray = this.createPoint(150, 325, value.length),
            arr = [];
					for (let i = 0; i < value.length; i++) {
						let val = {
							"value": value[i],
							"temp": value[i],
							"checked": false,
							"point": pointArray[i]
						};
						arr.push(val);
					}
					let item = {
						'key': key,
						'value': value,
						'arr': arr
					};
					result.push(item);
				}
				return result;
			},
			showcode() {
				this.getCodeInfo();
				this.isShow = true;
				this.comfirmStatus = false;
				this.tempStr = '';
				this.codeTimeStatus = false;
				this.codeTime = 25;
				this.timeOut = true;
			},
			doCancel() {
				this.isShow = false;
				this.codeTime = 25;
				this.codeTimeStatus = false;
			},
			doRefresh() {
				if(this.codeIndex < this.codeData.length-1){
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
			codeClick(item) {	
				if(!item.checked) {
					this.tempStr += item.value;
					item.temp = this.tempStr.length;
					item.checked = true;
				}
				if (this.tempStr.length == this.codeStr.length) this.comfirmStatus = true;
			},
			doConfirm() {
				if (!this.comfirmStatus) return false;
				let postData = {
					'selectionCodeKey': this.data.selectionCodeKey,
					'selectionCode': Crypto.md5(this.tempStr),
					'selectionCodeNumber': this.codeIndex+1,
				}
        this.$http.checkSelectCode(postData).then(
					res => {
						this.$store.commit('SET_SELECTIONCODEKEY', res);
						this.$emit('codeConfirm');
						this.isShow = false;
					}, () => {
						this.doRefresh();
					}
				)
      },
		},
		mounted() {
		}
	}
</script>

<style scoped>
	.code {
		position: fixed;
		left: 0;
    top: 0;
    z-index: 999;
		height: 100%;
    width: 100%;
    text-align: left;
		background: rgba(0, 0, 0, .7);
	}

	.code-content {
		position: relative;
		left: 50%;
		top: 50%;
		width: 411px;
		height: 320px;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		background: #FFFFFF;
	}

	.code-content .code-head {
		height: 48px;
		line-height: 48px;
		padding-left: 22px;
	}

	.code-bg {
		position: relative;
		left: 22px;
		height: 190px;
		width: 365px;
	}

	.code-bg img {
		height: 190px;
		width: 365px;
	}

	.codebox {
		position: absolute;
		top: 0;
		left: 0;
		height: 190px;
		width: 365px;
	}

	.codebox span {
		position: absolute;
		left: 0;
		top: 0;
		display: inline-block;
		height: 40px;
		line-height: 40px;
		width: 40px;
		text-align: center;
		border-radius: 50%;
		background: #FFF;
		color: #555;
		cursor: pointer;
	}
	
	.codebox span.active {
		background: #31FF3B;
		color: #FFF;
	}

	.col {
		color: rgb(235, 145, 69);
	}

	.code-col {
		padding-left: 15px;
		color: rgb(235, 145, 69);
		font-size: 17px;
		letter-spacing: .8em;
	}

	.code-btn {
		position: absolute;
		right: 23px;
		bottom: 22px;
		display: inline-block;
		height: 42px;
		line-height: 42px;
		width: 103px;
		background: #bbb;
		color: #fff;
		text-align: center;
		border-radius: 5px;
	}

	.code-btn.active {
		background: #45B4AA;
	}
	.code-wait {
		display: none;
		position: absolute;
		right: 140px;
		bottom: 26px;
		height: 34px;
		line-height: 34px;
		font-size: 14px;
		width: auto;
		color: #f40;
	}
	.code-wait.en{
		right: 130px;
		font-size: 13px;
	}
	.code-wait.active{
		display: inline-block;
	}
	.code-refash {
		position: absolute;
		left: 21px;
		bottom: 26px;
		display: inline-block;
		height: 34px;
		width: 30px;
		background-image: url(../../assets/images/refash.png);
		background-size: 100% 100%;
	}

	.code-cancel {
		position: absolute;
		right: 11px;
		top: 11px;
		display: inline-block;
		height: 25px;
		width: 25px;
		background-image: url(../../assets/images/cancel.png);
		background-size: 100% 100%;
	}

	/*mobile*/
	@media only screen and (min-width: 0px) and (max-width: 350px) {
		.code-content {
			transform: translate(-50%, -50%) scale(.53);
			-webkit-transform: translate(-50%, -50%) scale(.53);
		}
	}

	@media only screen and (min-width: 350px) and (max-width: 400px) {
		.code-content {
			transform: translate(-50%, -50%) scale(.63);
			-webkit-transform: translate(-50%, -50%) scale(.63);
		}
	}

	@media only screen and (min-width: 400px) and (max-width: 450px) {
		.code-content {
			transform: translate(-50%, -50%) scale(.73);
			-webkit-transform: translate(-50%, -50%) scale(.73);
		}
	}

	@media only screen and (min-width: 450px) and (max-width: 1050px) {
		.code-content {
			transform: translate(-50%, -50%) scale(1);
			-webkit-transform: translate(-50%, -50%) scale(1);
		}
	}
</style>
