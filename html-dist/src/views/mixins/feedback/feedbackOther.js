import api from "@/api";
import { Util } from '@/utils/utils';
import { validate } from '@/utils/validate';

export default {
	data (){
		return {
			timeReady:true,
			send:{
				contactType:'1',
				contactNum:'',
				remark:'',
				uploadImgArr:[],
			},
			isIOS:false,
			locales:this.$store.state.langData,
			isFirst:true,
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
		goback(){
			this.$indicator.close();
			window.history.go(-1);
		},
	  	deleteImg(idx) {
      		this.send.uploadImgArr.splice(idx,1)
			this.$previewRefresh()
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
				spinnerType: 'fading-circle',
			})
			let reader = new FileReader();
			reader.readAsDataURL(file);
			let newform = new FormData();           
			newform.append("mFile", file);         
			newform.append("privateFile", true);
			newform.append("uid",this.$store.state.feedbackInfo.userId);
			let xml = new XMLHttpRequest();
			xml.open("post", base.imfileUrl + '/upload/picture1.htm', true);
			xml.send(newform);
			xml.onreadystatechange = () => {
				if(xml.status == 200) {
					setTimeout(()=>{
						let b = xml.responseText;
						let obj = JSON.parse(b);
						this.uploadImgHandler(obj);
					}, 10)
				}
			}//回调返回信息
		},
		uploadImgHandler(data){
			setTimeout(() => {
				this.$indicator.close();
      }, 100)
      
			if(data.code == 0) {
				let item = {
					url: base.headUrl+data.data,
					data: data.data
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
		addUserFeedbackInfo(opt) {
			api.addHelpFeekback(opt).then(
				() => {
					this.$toast(this.locales.feedback_success);
					setTimeout(() => {
						this.$router.push({
              name: 'feedback',
              params: {
                userId: this.$store.state.feedbackInfo.userId
              }
            })
					}, 2000)
				},() => {}
			)
		},
		doSubmit(){
			let postData = {
				userId: this.$store.state.feedbackInfo.userId,//问题类型
				problemType: this.$store.state.feedbackInfo.problemType,//
				problemDetails: this.send.remark,
				contactWay: this.send.contactType,
				contactNum: this.send.contactNum,
				imageUrl: this.getImgUrls(this.send.uploadImgArr),
			}
			if(!postData.problemDetails || postData.problemDetails.length < 10) { 
				this.$toast(this.locales.ten_description); 
				return; 
			}
			if(postData.contactWay == '1' && !validate.isPhone(postData.contactNum)) {
        this.$toast(this.locales.phoneError);
        return false;
			}
			if(postData.contactWay == '2' && !validate.isEmail(postData.contactNum)) {
        this.$toast(this.locales.emailError);
        return false;
			}
			// if(postData.contactWay == '3' && !/^\w+$/.test(postData.contactNum)){
      //   this.$toast(this.locales.wechat_error);
      //   return false;
			// }

			if (this.isFirst) {
				this.isFirst = false;
        this.addUserFeedbackInfo(postData, this.addUserFeedbackInfoHandler);
        
				setTimeout(() => {
					this.isFirst = true;
				}, 1000)
			}
			
		},
		getImgUrls(list){
			let result = ''
			if(list && list.length){
				for(let i = 0; i < list.length; i++){
					let item = list[i];
					result += item.url + ',';
				}
				result = result.substr(0,result.length-1);
			} else {
				result = '';
			}
			return result;
		}
	},
	mounted() {
		
		//设置title
    	document.title = this.$t('msg').menu.feedback;
		let device = Util.getEnvironmet();
		if(device == 'IOS') {
	      	this.isIOS = true;
	    }
		if(device == 'Android') {
			this.isIOS = false
			//解决手机软盘问题
			let h = document.body.scrollHeight;
			window.onresize = () => {
        		let contact = document.getElementById('contact');
        
				if (contact == document.activeElement) {
					let ele = document.getElementById('content');
					ele.scrollTop = ele.scrollHeight;
				}
			}
		}
	}
}