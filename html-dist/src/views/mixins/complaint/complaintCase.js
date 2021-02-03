import { Util } from '@/utils/utils';

export default {
	name: 'complaint-case',
	data (){
		return {
			name: this.$route.params.name,
			list: [],
			dataNone: false,
			showNotice: false,
			noticeText: this.$store.state.complaintInfo.noticeText
		}
	},
	methods: { 
		goback(){
			window.history.go(-1);
		}, 
		jump(type){
      let device = Util.getEnvironmet();
      
			if(type=='1'){
				if(device == 'IOS') {
          window.webkit.messageHandlers.WebAddBlack.postMessage(this.$store.state.complaintInfo.ownerId)
        } else if(device == 'Android') {
          native.WebAddBlack()
        }
			} else if(type=='2') {
				this.$router.push({
          name:'complaint-form',
          params: {
            id: this.$route.params.id,
            name: this.$route.params.name
          }
        })
			}
		},
		goToSuccess(){
			//处理APP拉黑操作然后跳转至拉黑成功页面
			this.$router.push({name: 'complaint-success', params: { type: 1 }})
		},
	},
	mounted() {
    	document.title = this.$route.params.name;
		window.WebAddBlackSuccess = data => {
			if(data == '0') this.goToSuccess();
		}
	}
}