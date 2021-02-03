<template>
  <div class="my-popup send-picture" v-show="pasteImage.show">
    <div :class="pasteImage.info.length > 1 ? 'my-popup-content small' : 'my-popup-content'">
      <span class="my-popup-close" @click="close"></span>
      <div class="text" v-if="pasteImage.info.length > 1 && lang == 'zh_CN'">
        {{ $t("msg.chatPanel.imgselected") }}{{ pasteImage.info.length }}张图片
      </div>
      <div class="text" v-else-if="pasteImage.info.length > 1 && lang != 'zh_CN'">
        {{ pasteImage.info.length }}{{ $t("msg.chatPanel.imgselected") }}
      </div>
      <div v-else class="paste-img-container">
        <img :src="pasteImage.imgUrl" />
      </div>
      <div :class="pasteImage.info.length > 1 ? 'explain small' : 'explain'">
        <input type="text" v-model="explain" :placeholder="$t('msg.menu.Pmessage')" :class="pasteImage.info.length > '1' ? '' : 'big'" />
      </div>
      <p class="popup-btn">
        <button :class="pasteImage.info.length > '1' ? 'btn btn-white' : 'btn btn-white big'" type="button" @click="dropImgAction(false)">
          {{ $t("msg.common.cancel") }}
        </button>
        <button class="btn btn-active" type="button" @click="dropImgAction(true, explain)">
          {{ $t("msg.common.send") }}
        </button>
      </p>
    </div>
    <input type="file" hidden="true" id="uploadImg" @change="selectImg($event)" accept=".jpg,.png,.git,.jpeg,.gif,.ico,.bmp" />
  </div>
</template>

<script>
import { Util } from "@/tools/utils";
import { timeUtil } from "@/tools/timeUtil";
import { mapGetters } from "vuex";
import { msgEnumTypes } from "@/common/enum";
import { msgFormatTemplate } from "@/tools/msgFormatTemplate";
import { actionApi } from "@/api";
import Vue from "vue";

export default {
  name: "image-popup",
  data() {
    return {
      time: "",
      explain: "",
      lang: Vue.config.lang
    };
  },
  computed: {
    ...mapGetters(["userInfo", "currentSession"]),
    pasteImage() {
      if (this.imgInfo.show) {
        window.addEventListener("keyup", this.sendEvent);
      } else {
        window.removeEventListener("keyup", this.sendEvent);
      }
      return this.imgInfo;
    }
  },
  props: {
    imgInfo: {
      type: Object,
      default: {}
    }
  },
  methods: {
    close() {
      this.pasteImage.show = false;
      this.$parent.draguplod = false;
    },
    selectImg(event) {
      if (!event.target.files[0]) {
        return;
      }
      var file = event.target.files;
      if (file.length > 9) {
        this.$store.commit("SET_TOAST_TEXT", this.$t("msg.chatPanel.fileNum") + file.length + this.$t("msg.chatPanel.num"));
        return;
      } else {
        for (let i = 0; i < file.length; i++) {
          this.initSendInfo(file[i], JSON.parse(JSON.stringify(this.currentSession)));
        }
      }
      event.target.value = "";
    },
    selectImg2(event) {
      var file = event;
      for (let i = 0; i < file.length; i++) {
        this.initSendInfo(file[i], JSON.parse(JSON.stringify(this.currentSession)));
      }
    },
    dropImgAction(type, msg) {
      this.$parent.draguplod = false;
      this.pasteImage.show = false;
      if (type) {
        if (this.pasteImage.info.length > 1) {
          this.selectImg2(this.pasteImage.info);
        } else {
          this.initSendInfo(this.pasteImage.info, JSON.parse(JSON.stringify(this.currentSession)));
        }
        if (msg != "") {
          console.log("testcase 1");
          let time = new Date().getTime();
          this.$parent.updataChatHistory(msg, "1", time);
          let obj = {
            msg,
            msgType: "1",
            chatType: this.currentSession.fromType,
            toId: this.currentSession.paramId,
            time,
            userId: this.userInfo.id
          };
          this.$store.dispatch("sendMsg", obj).then(() => {});
          this.explain = "";
        }
      }
    },
    initSendInfo(file, sessionInfo) {
      // debugger;
      let nameArr = file.name.split(".");
      let fileName = nameArr[nameArr.length - 1];
      //过滤不支持的图片格式
      if (!/(jpg|jpeg|png|gif|ico|bmp|tif|svg)$/i.test(fileName)) {
        this.$store.commit("SET_TOAST_TEXT", this.$t("msg.chatPanel.notAllow"));
        return;
      }

      let reader = new FileReader();
      let sendInfo = {};
      let that = this;
      sendInfo.size = file.size;
      sendInfo.time = new Date().getTime();
      sendInfo.mediaIndex = `abc${sendInfo.time}`;
      reader.readAsDataURL(file);
      reader.onload = function() {
        let img = new Image();
        img.src = this.result;
        img.onload = () => {
          sendInfo.imgWidth = img.width;
          sendInfo.imgHeigh = img.height;
          sendInfo.fileUrl = img.src;
          sendInfo.src = img.src;
          sendInfo.uploadStatus = false;
          sendInfo.progress = 50;
          that.sendImg(sendInfo, sessionInfo);
        };
      };

      Util.getFileUrl(file, 1).then(
        data => {
          sendInfo = {
            ...data,
            ...sendInfo,
            fileUrl: data.fileUrl,
            progress: 100,
            uploadStatus: true
          };
          this.sendImg(sendInfo, sessionInfo);
        },
        err => {
          this.$store.dispatch("setLayout", ["error", "close", true]);
        }
      );
    },
    // 发送图片消息
    sendImg(sendInfo, sessionInfo) {
      // let obj = {
      //   msg: JSON.stringify(sendInfo),
      //   msgType: msgEnumTypes.img,
      //   chatType: sessionInfo.chatType,
      //   toId: sessionInfo.chatId,
      //   time: sendInfo.time,
      //   userId: this.userInfo.id,
      // };
      // console.log(obj);

      // 发送消息
      console.log(sendInfo)
      if (sessionInfo.chatId == this.currentSession.chatId) {
        const {imgWidth, imgHeigh, time, uploadStatus, mediaIndex} = sendInfo;
        this.$parent.send({
            imgUrl: sendInfo.fileUrl,
            imgWidth,
            imgHeigh,
            time,
            type: msgEnumTypes.img,
            mediaIndex,
            progress: sendInfo.progress,
            uploadStatus
        });
      }
    },
    sendEvent(event, mag) {
      if (event.keyCode === 13) {
        this.dropImgAction(true, this.explain);
      }
    }
  },
  mounted() {}
};
</script>
