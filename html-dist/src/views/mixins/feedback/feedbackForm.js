import api from "@/api";
import { Util } from '@/utils/utils';
import { validate } from '@/utils/validate';
import Vue from 'vue'
import { DatetimePicker } from 'mint-ui';

Vue.component(DatetimePicker.name, DatetimePicker);
import moment from "moment";

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


export default {
	name: 'feedback-form',
	data (){
		return {
			helpName: this.$route.params.helpName,
			list: [],
			listLoading:true,
			dataNone: false,
			showSupple: false,
			send: {
				dateText: this.getDateTimeNow(),
				dateTime: Date.now(),
				contactType: '1',
				contactNum: '',
				remark: '',
				uploadImgArr: [],
			},
			locales: this.$store.state.langData,
      isFirst: true,
      // 选择时间
      pickerValue:"",
      dataval:new Date,
      startDate: new Date(),
      
      showPopup:false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
		}
	},
	methods: {
		goback(){
			window.history.go(-1);
		},
		getHelpFeedback(opt) {
			api.getHelpFeekback(opt).then(
				data => {
					if (data && data.length) {
						data.forEach(item => {
							item.selected = false;
							if(item.scenarioName) this.list.push(item);
						})
					}
					if(!(this.list && this.list.length)) this.dataNone = true;
					this.listLoading = false;
				}, () => {
					this.listLoading = false;
				}
			)
		},
		showScroller() {
			this.$refs.scroller.show();
		},
		scrollerHandler(data) {
			this.send.dateText = data.text;
			this.send.dateTime = data.time;
		},
		showSupplement(){
			this.$refs.supplement.show();
			this.showSupple = true;
		},
		supplementHandler(data) {
			this.showSupple = false;
			if (data != null) {
				this.send.remark = data.remark;
				this.send.uploadImgArr = data.uploadImgArr;
			} else {
				this.send.remark = '';
				this.send.uploadImgArr = '';
			}		
		},
		//添加反馈信息接口
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
				}, () => {}
			)
		},
		doSubmit(){
			let postData = {
				userId: this.$store.state.feedbackInfo.userId,//问题类型
				problemType: this.$store.state.feedbackInfo.problemType,//问题类型
				scenarioName: this.getHelpIds(this.list),//场景问题名称
				happenTime: Date.now(this.send.dateTime),//请选择问题发生时间
				problemDetails: this.send.remark,//请选择问题发生的情况
				contactWay: this.send.contactType,//联系类型
				contactNum: this.send.contactNum,//输入您的联系方式
				imageUrl: this.getImgUrls(this.send.uploadImgArr),
			}
			if (!postData.scenarioName) { 
				this.$toast(this.locales.select_question_case); 
				return;
			}
			if (!postData.problemDetails) { 
				this.$toast(this.locales.supplement);
				return;
			}
			if (postData.contactWay == '1' && !validate.isPhone(postData.contactNum)){
        this.$toast(this.locales.phoneError);
        return false;
			}
			if (postData.contactWay == '2' && !validate.isEmail(postData.contactNum)){
        this.$toast(this.locales.emailError);
        return false;
			}
			// if (postData.contactWay == '3' && !/^\w+$/.test(postData.contactNum)) {
      //   this.$toast(this.locales.wechat_error);
      //   return false;
			// }
			if (this.isFirst) {
				this.isFirst = false;
				this.addUserFeedbackInfo(postData);
				setTimeout(() => {
					this.isFirst = true;
				}, 1000)
			}
			
		},
		getImgUrls(list){
			let result = '';
			if (list && list.length) {
				for(let i = 0; i < list.length; i++){
					let item = list[i];
					result += item.url + ',';
				}
				result = result.substr(0,result.length-1);
			} else {
				result = '';
			}
			return result;
		},
		getHelpIds(list){
			let result = '';
			if (list && list.length) {
				for(let i = 0; i < list.length; i++){
					let item = list[i];
					if(item.selected == true) result += item.scenarioName + ',';
				}
				result = result.substr(0,result.length-1);
			} else {
				result = '';
			}
			return result;
		},
		getDateTimeNow(){
			let toNum = n => {
				if(n < 10) {
          			return '0' + n
        		} else {
          			return n
        		}
      		}
			let dateTime = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate() + ' ' + toNum(new Date().getHours()) + ':' + toNum(new Date().getMinutes());
			return dateTime;
    },
    
     //打开时间选择
     openPicker() {
 
      let time = moment().subtract(30, 'days')

       this.minDate= new Date(time);
      this.showPopup= true;
      },
      handleConfirm(){
  
      this.send.dateTime = moment(this.currentDate).format('YYYY-MM-DD HH:mm:ss');

      this.send.dateText =  this.send.dateTime;

      this.showPopup= false;
      
      },

      closePopup(){
        this.showPopup= false;
      }

	},
	mounted() {
    	document.title = this.helpName;
		this.getDateTimeNow();
		this.getHelpFeedback({ helpId: this.$route.params.pId }, this.getHelpFeedbackHandler);
    	let device = Util.getEnvironmet();
    
		if (device == 'Android') {
      		//解决手机软盘问题
			let h = document.body.scrollHeight;
	    	window.onresize = () => {
	      		let ele = document.getElementById('content');
				ele.scrollTop = ele.scrollHeight;
	    	}
		}
	}
}