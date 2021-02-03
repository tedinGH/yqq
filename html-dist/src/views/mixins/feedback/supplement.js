import { Util } from '@/utils/utils';

export default {
	name: 'supplement',
	data (){
		return {
			isShow: false,
			send: {
				remark: '',
				uploadImgArr: []
			},
			timeReady: true,
			layerConfirm: false,
			isIOS: false,
			locales: this.$store.state.langData
		}
	},
	watch: {
     	'send.remark': {
         	handler() {
            	if(this.send.remark.length>200){
            		let basic = this.send.remark;
            		basic = basic.substring(0, basic.length - 2);
            		this.send.remark = basic;
            	}
         	},
    	}
	},
	methods: {
		hide(){
			this.$indicator.close();
			this.isShow = false;
			this.send.remark = '';
			this.send.uploadImgArr = [];
			this.$emit('supplementHandler',null);
		},
		show(){
			this.isShow = true;
			this.layerConfirm=false;
		},
		deleteImg: function(idx) {	
			this.send.uploadImgArr.splice(idx, 1);
			this.$previewRefresh();
		},
		uploadImg(e){
			let file = e.target.files[0];
			//过滤不支持的图片格式
	      	if(!/(jpg|jpeg|png|gif|bmp)$/i.test(file.name)) {
	      		document.getElementById('file').value = '';
		        this.$toast(this.locales.notAllow); 
		        return;
	      	}
			this.$indicator.open({
        		text: this.locales.uploading,
        		spinnerType: 'fading-circle'
      		});
			let reader = new FileReader();
			reader.readAsDataURL(file);
			let newform=new FormData();          
			newform.append("mFile",file);            
			newform.append("privateFile",true);
			newform.append("uid",this.$store.state.feedbackInfo.userId);
			let xml = new XMLHttpRequest();
			xml.open("post", base.imfileUrl + '/upload/picture1.htm', true);
			xml.send(newform);
			xml.onreadystatechange = () => {//回调函数
			  if(xml.status == 200){
					setTimeout(() => {
						let b = xml.responseText;
						let obj = JSON.parse(b);
						this.uploadImgHandler(obj);
					},10)
			  }
			};//回调返回信息
		},
		uploadImgHandler(data){
			setTimeout(() => {
				this.$indicator.close();
      		}, 100)
      
			if(data.code == 0) {
				let item = {
					url: base.headUrl+data.data,
					data:data.data
				}
				if (this.timeReady) {
					this.timeReady = false;
					this.send.uploadImgArr.push(item);
					this.$previewRefresh();
					let file = document.getElementById('file');
					file.value = '';
					setTimeout(() => { 
						this.timeReady = true;
					}, 1000)
				}
			} else {
				this.$toast(data.data);
			}
    	},
    	doComfirm(){
      		if(this.send.remark.length < 10){
				this.layerConfirm = false;
				this.$toast(this.locales.ten_description);
				return false;
			}
      		this.layerConfirm=true
    	},
		doSubmit(){
			this.$emit('supplementHandler',this.send);
			this.$indicator.close();
			this.isShow = false;
		}
	},
	mounted() {
		let device = Util.getEnvironmet()
		if(device == 'IOS'){
			this.isIOS = true;
		} else if (device == 'Android') {
			this.isIOS = false;
		}
	}
}