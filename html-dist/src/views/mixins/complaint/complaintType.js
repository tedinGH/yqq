import api from "@/api";

export default {
	data ()
	{
		return {
			name: this.$route.params.name,
			list: [],
			listLoading:true,
			dataNone: false,
			showNotice: false,
			noticeText: this.$store.state.complaintInfo.noticeText
		}
	},
	methods: {
		goback(){
			window.history.go(-1);
		},
		getHelpFeedback(opt) {
			api.getCompainType(opt).then(
				data => {
					if(data && data.length){
						data.forEach(item => {
							if(item.sonName) this.list.push(item);
						})
					}
					if(!(this.list && this.list.length)) this.dataNone = true;
					this.listLoading = false;
				},() => {
					this.listLoading = false;
				}
			)
		},
		jump(item){
			if(this.$store.state.complaintInfo.ownerType == '2') {
				this.$router.push({
          name:'complaint-form',
          params: {
            cause: this.$route.params.id,
            breakLaw: item.sonId,
            name: this.$route.params.name
          }
        })
				return false;
			}
			if(item.state=='1'){
				this.$router.push({
          name:'complaint-case',
          params: {
            cause: this.$route.params.id,
            breakLaw: item.sonId,name:item.sonName
          }
        })
			} else if(item.state=='2'){
				this.$router.push({
          name:'complaint-form',
          params: {
            cause: this.$route.params.id,
            breakLaw: item.sonId,
            name: this.$route.params.name
          }
        })
			}
		}
	},
	mounted() {
    	document.title = this.$route.params.name;
		this.getHelpFeedback({ complainId: this.$route.params.id }, this.getHelpFeedbackHandler)
	}
}