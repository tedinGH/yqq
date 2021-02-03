import api from "@/api";

export default {
	name: 'feedback-result',
	data (){
		return {
			helpName: this.$route.params.helpName,
			solve: false,
			isUpdate: true,
			page: {
				content: '',
				helpId: '',
				problemName: '',
			},
			locales: this.$store.state.langData
		}
	},
	methods: {
		goback() {
			window.history.go(-1);
		},
		updateHelpNumber(opt) {
			api.getHelpHistory(opt).then(
				() => {
					this.$toast(this.locales.feedback_success);
				}, () => {}
			)
		},
		updateSolve(type,status){
			let postData = {
				type: type,
				helpId: this.$route.params.pId
      }
      
			if(!status && this.isUpdate){
				this.updateHelpNumber(postData);
				this.solve = true;
			}
		},
		updateType(item){
			let postData = {
				type: item.type,
				helpId: this.$route.params.pId
			}
			item.selected = true;
			this.updateHelpNumber(postData);
		},
		getPageInfo(opt) {
			api.getProblemDetail(opt).then(
				data => {
          this.page = data;
          
					if(this.page.content) {
            this.page.content = this.page.content.replace(/http:/, "https:")
          }

					setTimeout(()=>{
            let a = document.getElementById("content").getElementsByTagName("img");
            
						for(let i = 0; i < a.length; i++){
							a[i].setAttribute("preview","0");
            }
            
						this.$previewRefresh();
					}, 100)
				}, () => {}
			)
		},
	},
	mounted() {
    	document.title = this.helpName;
		this.getPageInfo({ helpId: this.$route.params.pId }, this.getPageInfoHandler);
	}
}