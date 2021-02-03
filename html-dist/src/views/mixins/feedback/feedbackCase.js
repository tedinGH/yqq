import api from "@/api";

export default {
	name: 'feedback-case',
	data() {
		return {
			helpName: this.$route.params.helpName,
			type: this.$route.params.type,
			list: [],
			listLoading:true,
			dataNone: false,
		}
	},
	methods: {
		goback(){
			window.history.go(-1);
		},
		getHelpFeedback(opt) {
			api.getProblemList(opt).then(
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
			let type = this.$route.params.type;
			if(type == 2) {
				this.$router.push({
          name: 'feedback-form',
          params: {
            pId: item.helpId, 
            helpName: item.helpName
          }
        })
			} else {
				this.$router.push({
          name:'feedback-result',
          params: {
            pId: item.helpId,
            helpName: item.helpName
          }
        })
			}
		},
		goToOther(){
			this.$router.push({name: 'feedback-other'});
		}
	},
	mounted() {
    	document.title = this.helpName;
		this.getHelpFeedback({helpId: this.$route.params.pId});
	}
}