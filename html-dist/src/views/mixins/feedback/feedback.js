import api from "@/api";
import { Util } from '@/utils/utils';

export default {
	data (){
		return {
			device: '', 
			menuList: [
				{
					helpId: 1,
					helpName: this.$t('msg').menu.questions,
					userId: '100',
				},
				{
					helpId: 2,
					helpName: this.$t('msg').menu.feedback,
					userId: this.$route.params.userId,
				},
			],
			all: [],
			allLoading:true,
			allNone: false,
			feedback: [],
			feedbackLoading:true,
			feedbackNone: false,
		}
	},
	computed: {
		list(){
			return this.menuList;
			//return this.menuList.filter(v => v.userId != 0);
		}
	},
	methods: {
		jump(item){
			this.$router.push({
		        name: 'feedback-type',
		        params: { 
		        	userId: this.$route.params.userId,
		          	type: item.helpId,
		          	pId:item.helpId,
		          	helpName: item.helpName
		        }
      		})
		},
		jumpItem(item,type){
			this.$store.commit('setFeedbackInfo', {
				userId: this.$route.params.userId,//用户ID
				problemType: item.helpName,//问题类型
			})
			this.$router.push({
		        name: 'feedback-case',
		        params: {
		          type: type,
		          pId: item.helpId,
		          helpName: item.helpName
		        }
      		})
		},
	  	close(){
			if(this.device == 'IOS') {
	        	window.webkit.messageHandlers.back.postMessage("");
	      	} else if (this.device == 'Android') {
	        	native.back();
	      	}
	  	},
		getAll(opt) {
			api.getReasonList(opt).then(
				data => {

					if(data && data.length){
						data.forEach(item => {
							if(item.helpName) this.all.push(item);
						})
					}
					if(!(this.all && this.all.length)) this.allNone = true;
					this.allLoading = false;
					this.getFeedback({type: 2})
				},() => {
					this.allLoading = false;
				}
			)
		},
		getFeedback(opt) {
			api.getReasonList(opt).then(
				data => {
					if(data && data.length){
						data.forEach(item => {
							if(item.helpName) this.feedback.push(item)
						})
					}
					if(!(this.feedback && this.feedback.length)) this.feedbackNone = true;
					this.feedbackLoading = false;
				}, () => {
					this.feedbackLoading = false;
				}
			)
		},
	},
	mounted() {
		this.getAll({type:1});
		//修改rem值
		window.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		let size = (window.screenWidth / 7.5);
		document.getElementsByTagName('html')[0].style.fontSize = size + 'px'

		this.$store.commit('setFeedbackInfo', {
			userId: this.$route.params.userId,//用户ID
			problemType: '',//问题类型
		})
		//设置title
    	document.title = this.$t('msg').menu.helpAndFeedback;
    	/*this.device = Util.getEnvironmet();
		if(this.device == 'IOS') {
      		window.webkit.messageHandlers.hideNavbar.postMessage("");
    	} else if (this.device == 'Android') {
      		native.hideNavbar();
    	}*/
	}
}