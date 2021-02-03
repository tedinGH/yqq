import api from "@/api";

export default {
	name: 'feedback-type',
	data() {
		return {
			userId: this.$route.params.userId,
			helpName: this.$route.params.helpName,
			type: this.$route.params.type,
			list: [],
			listLoading:true,
			dataNone: false,
		}
	},
	methods: {
		getHelpFeedback(opt) {
			api.getReasonList(opt).then(
				data => {
					if(data && data.length) {
						data.forEach(item => {
							if(item.helpName) this.list.push(item);
						})
					}
					if(!(this.list && this.list.length)) this.dataNone = true;
					this.listLoading = false;
				}, () => {
					this.listLoading = false;
				}
			)
		},
		jump(item){
			this.$store.commit('setFeedbackInfo', {
				userId: this.$store.state.feedbackInfo.userId,//用户ID
				problemType: item.helpName,//问题类型
			})
			this.$router.push({ 
        name:'feedback-case',
        params: {
          type: this.$route.params.type,
          pId: item.helpId,helpName: item.helpName
        }
      })
		},
		goToOther(){
			this.$router.push({name:'feedback-other'});
		},
		goToType(){
			this.$router.push({
        name: 'feedback-type',
        params: {
          userId: this.$route.params.userId,
          type: 2,
          pId: 2,
          helpName: 'msg.menu.feedback'
        }
      })
			this.userId = this.$route.params.userId;
			this.helpName = this.$route.params.helpName;
			this.type = this.$route.params.type;
			this.getHelpFeedback({ type: this.$route.params.pId }, this.getHelpFeedbackHandler);
		},
		goBack(){
			this.$router.push({name:'feedback', params: {userId: this.$route.params.userId}});
		}

	},
	mounted() {
    	document.title = this.helpName;
		this.getHelpFeedback({type: this.$route.params.pId}, this.getHelpFeedbackHandler)
	}
}