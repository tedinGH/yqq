import HeaderComponent from '@/components/subcompoments/HeaderComponent.vue'
import { Util } from '@/utils/utils'
export default {
    name: 'findpwdSuccess',
    data ()
    {
      return {
        device: Util.getEnvironmet(),
      }
    },
    components: { 
      HeaderComponent: HeaderComponent,
    },
    methods: {
		  finish(){
  			//检测 IOS/Android
  			if(this.device == 'IOS'){
      		window.webkit.messageHandlers.back.postMessage("1");
  			}
  			else if(this.device == 'Android') native.back("1");
		  }
    },
    mounted(){
      //设置title
      document.title = this.$t('msg').menu.setPwd;
    }
}