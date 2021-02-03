import api from "@/api";
import { Util } from '@/utils/utils';

export default {
  data() {
    return {
      isShow: false,
      send: {
        content: '',
        uploadImgArr: [],
      },
      timeReady: true,
      layerConfirm: false,
      isIOS: false,
      locales: this.$store.state.langData,
      isFirst: true,
      // isDisable:false
    }
  },
  watch: {
    'send.content': {
      handler() {
        if (this.send.content.length > 200) {
          let basic = this.send.content;
          basic = basic.substring(0, basic.length - 2);
          this.send.content = basic;
        }
      },
    }
  },
  methods: {
    goback() {
      this.$indicator.close();
      window.history.go(-1);
    },
    deleteImg(idx) {
      this.send.uploadImgArr.splice(idx, 1);
      this.$previewRefresh();
    },
    uploadImg(e) {
      let file = e.target.files[0];
      //过滤不支持的图片格式
      if (!/(jpg|jpeg|png|gif|bmp)$/i.test(file.name)) {
        document.getElementById('file').value = '';
        this.$toast(this.locales.notAllow);
        return;
      }
      this.$indicator.open({
        text: this.locales.uploading,
        spinnerType: 'fading-circle'
      })
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let newform = new FormData();
      newform.append("mFile", file);
      newform.append("privateFile", true);
      newform.append("uid", this.$store.state.complaintInfo.userId);
      let xml = new XMLHttpRequest();
      xml.open("post", base.imfileUrl + '/upload/picture1.htm', true);
      xml.send(newform);
      xml.onreadystatechange = () => {
        if (xml.status == 200) {
          setTimeout(() => {
            let b = xml.responseText;
            let obj = JSON.parse(b);
            this.uploadImgHandler(obj);
          }, 10)
        }
      }
    },
    uploadImgHandler(data) {
      setTimeout(() => {
        this.$indicator.close()
      }, 100)

      if (data.code == 0) {
        let item = {
          url: base.headUrl + data.data,
          data: data.data
        }

        if (this.timeReady) {
          this.timeReady = false;
          this.send.uploadImgArr.push(item);
          this.$previewRefresh();
          let file = document.getElementById('file');
          file.value = '';
          setTimeout(() => {
            this.timeReady = true;
          }, 1000)
        }
      } else {
        this.$toast(data.data);
      }
    },
    addComplain(opt) {
      api.addCompain(opt).then(
        res => {
          if (res.code == 0) {
            this.$toast(this.$t('msg.menu.Complaintsuccess'));
            this.$router.push({ name: 'complaint-success', params: { type: 2 } });
          }
        }, () => { }
      )
    },
    doSubmit() {
      let postData = {
        "userId": this.$store.state.complaintInfo.userId,
        "ownerId": this.$store.state.complaintInfo.ownerId,
        "ownerType": this.$store.state.complaintInfo.ownerType,
        "cause": this.$route.params.cause,
        "breakLaw": this.$route.params.breakLaw,
        "content": this.send.content,
        "imgUrls": this.getImgUrls(this.send.uploadImgArr),
      }
      if (!postData.imgUrls) {
        this.$toast(this.locales.photo_evidence);
        return;
      }
      if (this.isFirst) {
        this.isFirst = false;
        this.addComplain(postData);
      }
      setTimeout(() => {
        this.isFirst = true;
      }, 2000)
    },
    getImgUrls(list) {
      let result = '';
      if (list && list.length) {
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          result += item.url + ',';
        }
        result = result.substr(0, result.length - 1);
      } else {
        result = '';
      }
      return result;
    }
  },
  mounted() {

    //设置title
    document.title = this.$t('msg').menu.complaintFormTitle;
    let device = Util.getEnvironmet();
    if (device == 'IOS') {
      this.isIOS = true;
    } else if (device == 'Android') {
      this.isIOS = false;
    }
  }
}