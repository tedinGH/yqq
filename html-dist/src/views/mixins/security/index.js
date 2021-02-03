import GoogleComponent from '@/components/common/GoogleComponent.vue'
import CodeComponent from '@/components/common/CodeComponent'
import doubleVerify from '@/components/common/DoubleVerify.vue'
import { Util } from '@/utils/utils';
import api from '@/api'
	 
export default {
  data (){
		return {
			data: {},
			verify: false,
			showPage: false,
			locales: this.$store.state.langData
		}
	},
	components: { 
		GoogleComponent,
	  CodeComponent,
		doubleVerify
	},
	methods: {
		getData(resolve){
      api.queryInfo({}).then(
        data => {
          this.data = data
					Util.setStore('securityInfo', JSON.stringify(data));
					if (typeof resolve == "function") resolve();
        },() => {}
      )
		},
		googleVerify(){ 
			this.$refs.code.showcode();
		},
		codeHandler() {
			if(this.data.mobile&&this.data.email){
				this.$refs.verify.show(['109','10011','109']);
				return;
			}
			if(!this.data.mobile) {
        this.$toast(this.locales.bindingPhone);
      }
			if(!this.data.email) {
        this.$toast(this.locales.bindingEmail);
      }
	  },
		verifyHandler(){
			this.$refs.google.show();
		},
		googleHandler(){
			this.getData();
		},
	},
	mounted() {
		new Promise((resolve)=>{
			this.$indicator.open();
			this.getData(resolve);
		}).then(() => {
			this.$indicator.close();
			this.showPage = true;
		})
	}
}