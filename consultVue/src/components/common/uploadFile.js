import { mapGetters } from "vuex";
import QRCode from "qrcode";
import store from "@/store";
import { Config } from "@/common/config";
import FilePopup from "@/components/common/FilePopup";
import PicturePopup from "@/components/common/PicturePopup";

export default {
  data() {
    return {
      draguplod: false,
      qrCode: {
        show: false,
        left: 0,
        top: 0,
      },
      dropFileInfo: {
        show: false,
        info: {}
      },
      pasteImage: {
        show: false,
        info: {}
      }
    };
  },
  computed: {
    ...mapGetters(["progress","bubbles", "filesize"])
  },
  components: {
    FilePopup,
    PicturePopup,
    QRCode
  },
  methods: {
    outDate() {
      this.$message({
        message: "The video has expired and cannot be played",
        type: "warning"
      });
    },
    // 命名规则 use $_ for mixins properties 
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    mouseEnter(event, data) {
      if (data.progress < 100) return;
      this.qrCode.top = event.clientY;
      this.qrCode.left = event.clientX;
      this.qrCode.show = true;
      let canvas = document.getElementById("qrcodeCanvas");
      QRCode.toCanvas(
        canvas,
        this.global.fileDownUrl + "original/" + data.url,
        (error) => {
          if (error) console.error(error);
        }
      );
    },
    cancelUpload(item) {
      item.viewShow.progress = 200;
      this.$refs.sendFile.uploadCancel(item);
      
      // EchatDB.deleteTempMsg(this.currentSession.paramId, item.createTime + "");
    },
    // 图片
    loadOriginalImg(t, imgUrl) {
      if (imgUrl.indexOf("data:") >= 0) {
        return;
      }
      var imgCache = t.currentTarget;
      if (imgCache.className.indexOf("img thumbnails complete") >= 0) {
        return;
      }
      imgUrl = Config.fileDownUrl + "1080/" + imgUrl;
      var imgObject = new Image();
      imgObject.src = imgUrl;
      imgObject.onload = function() {
        imgCache.src = imgUrl;
        imgCache.setAttribute("class", "img thumbnails complete");
      };
    },
    selectAll(event) {
      let file = event.target.files;
      let type = [];
      for (let i = 0; i < file.length; i++) {
        type.push(file[i].type.substring(0, 5));
      }
      let ifImg = type.every(item => {
        return item == "image";
      });
      if (ifImg) {
        this.$refs.sendPicture.selectImg(event);
      } else {
        this.$refs.sendFile.selectFile(event);
      }
    },
    dropArea(event) {
      event.preventDefault();
      const fileList = event.dataTransfer.files;
      if (fileList.length === 0) {
        return false;
      }
      let type = [];
      for (let i = 0; i < fileList.length; i++) {
        type.push(fileList[i].type.substring(0, 5));
      }
      let ifImg = type.every(function(item) {
        return item == "image";
      });

      if (ifImg) {
        if (fileList.length === 1) {
          this.pasteImage.info = fileList[0];
          this.pasteImage.imgUrl = window.URL.createObjectURL(fileList[0]);
          this.pasteImage.show = true;
        } else if (fileList.length > 9) {
          this.$store.commit("SET_TOAST_TEXT", this.$t("msg.chatPanel.fileNum") + fileList.length + this.$t("msg.chatPanel.num"));
          // this.draguplod = false
          return false;
        } else {
          this.pasteImage.info = fileList;
          this.pasteImage.show = true;
        }
      } else {
        if (fileList.length === 1) {
          this.dropFileInfo.info = fileList[0];
          this.dropFileInfo.show = true;
        } else if (fileList.length > 9) {
          this.$store.commit("SET_TOAST_TEXT", this.$t("msg.chatPanel.fileNum") + fileList.length + this.$t("msg.chatPanel.num"));
          // this.draguplod = false
          return false;
        } else {
          this.dropFileInfo.info = fileList;
          this.dropFileInfo.show = true;
        }
      }
      this.$refs.editMsg.blur();
    }
  },
  mounted() {
    // 文件过期提示
    window.outDate = this.outDate;
  }
};
