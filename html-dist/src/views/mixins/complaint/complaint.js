import api from "@/api";
import { Util } from '@/utils/utils';

export default {
  data (){
    return {
      list: [],
      listLoading:true,
      dataNone: false,
      showNotice: false,
      type: this.$route.params.type, 
      noticeText: ''
    }
  },
  methods: {
    getHelpFeedback(opt) {
      api.getCompainList(opt).then(
        data => {
          if(data.complainList && data.complainList.length) {
            data.complainList.forEach(item => {
              if(item.complainName) this.list.push(item);
            })
          }
          if(!(this.list && this.list.length)) this.dataNone = true;
          this.listLoading = false;
          
          this.noticeText = data.content
          this.$store.commit('setComplaintInfo', {
            userId: this.$route.params.userId,//投诉用户ID
            ownerId: this.$route.params.ownerId,//被投诉用户(群聊)ID
            ownerType: this.$route.params.type,//投诉用户/群聊类型
            noticeText: this.noticeText,//投诉须知信息
          }) 
        }, () => {
          this.listLoading = false;
        }
      )
    },
    jump(item){
      this.$router.push({
        name:'complaint-type',
        params: {
          id: item.complainId,
          name: item.complainName
        }
      })
    },
    close(){
      let device = Util.getEnvironmet();
      if(device == 'IOS') {
        window.webkit.messageHandlers.back.postMessage("");
      } else if(device == 'Android') {
        native.back();
      }
    }
  },
  mounted() {
    this.getHelpFeedback({ type: this.$route.params.type }, this.getHelpFeedbackHandler)
    //设置title
    document.title = this.$t('msg').menu.complaint;
    /*let device = Util.getEnvironmet()
    if(device == 'IOS') {
      window.webkit.messageHandlers.hideNavbar.postMessage("");
    } else if(device == 'Android') {
      native.hideNavbar();
    }*/
  }
}