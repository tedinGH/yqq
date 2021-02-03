<template>
  <div class="my-popup send-file" v-show="dropFileInfo.show">
    <div :class="dropFileInfo.info.length > 1 ? 'my-popup-content small' : 'my-popup-content'">
      <span class="my-popup-close" @click="close"></span>
      <div class="text" v-if="dropFileInfo.info.length > 1 && lang == 'zh_CN'">
        {{ $t("msg.chatPanel.filesselected") }}{{ dropFileInfo.info.length }}个文件
      </div>
      <div class="text" v-else-if="dropFileInfo.info.length > 1 && lang != 'zh_CN'">
        {{ dropFileInfo.info.length }}{{ $t("msg.chatPanel.filesselected") }}
      </div>
      <div class="drop-file-container display-flex" v-else>
        <div class="drop-file-icon" :class="dropFileInfo.info.name | fileFitler"></div>
        <div>
          <div class="drop-file-name">{{ dropFileInfo.info.name }}</div>
          <div class="drop-file-size">
            {{ dropFileInfo.info.size | fileSize }}
          </div>
        </div>
      </div>
      <div :class="dropFileInfo.info.length > 1 ? 'explain small' : 'explain'">
        <div>{{ $t("msg.chatPanel.comment") }}</div>
        <input type="text" v-model="explain" />
      </div>
      <p class="popup-btn">
        <button class="btn btn-white" type="button" @click="dropFileAction(false)">
          {{ $t("msg.common.cancel") }}
        </button>
        <button class="btn btn-active" type="button" @click="dropFileAction(true, explain)">
          {{ $t("msg.common.send") }}
        </button>
      </p>
    </div>
    <input
      type="file"
      hidden="true"
      id="file"
      accept=".doc,.docx,.pdf,.ppt,.xlsx,.xls,.csv,.txt,.mp4,.aac,.mp3,.bmp,.png,.jpg,.jpeg,.gif"
      @change="selectFile($event)"
    />
    <div id="video-thumb" style="display:none"></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Vue from "vue";
import { Util } from "@/tools/utils";
import { timeUtil } from "@/tools/timeUtil";
import { msgUtil } from "@/tools/msgUtil";
import { msgEnumTypes } from "@/common/enum";
import { msgFormatTemplate } from "@/tools/msgFormatTemplate";
import { actionApi } from "@/api";
// import BMF from'browser-md5-file';

export default {
  name: "file-popup",
  data() {
    return {
      fileList: [], //name:'', size:null, fileId: '', fileUrl: '', fileArr: [], time
      history: [],
      cutSize: 1024 * 1024 * 50,
      ready: false,
      count: 0,
      fileXml: null,
      fileNum: 1,
      explain: "",
      lang: Vue.config.lang
    };
  },
  computed: {
    ...mapGetters(["userInfo", "currentSession", "filesize"]),
    dropFileInfo() {
      if (this.fileInfo.show) {
        window.addEventListener("keyup", this.sendEvent);
      } else {
        window.removeEventListener("keyup", this.sendEvent);
      }
      return this.fileInfo;
    }
  },
  watch: {
    fileList() {
      if (this.fileList.length > 0 && this.ready) {
        this.ready = false;
        // let cacheFile = this.fileList[0];
        // //重复上传的文件不做分割上传，直接发送
        // if (cacheFile.type == 0) {
        //   this.sendFile(cacheFile.viewShow, cacheFile.bodyType, cacheFile);
        // } else {
        //   //续传
        //   if (cacheFile.progressIndex > 0) {
        //     let pr = {
        //       id: cacheFile.time,
        //       num: (cacheFile.progressIndex / cacheFile.count) * 100
        //     };
        //     this.$store.commit("UPDATE_PROGRESS", pr);
        //   }
        //   this.uploadHandler(cacheFile, 0);
        // }
      } else {
        this.ready = false;
      }
    }
    // fileInfo: {
    //   handler() {
    //     if (this.fileInfo.info && !this.fileInfo.show) {
    //       let files = this.fileInfo.info;
    //       for (let i = 0; i < files.length; i++) {
    //         this.initFile(files[i]);
    //       }
    //     }
    //   },
    //   deep: true
    // }
  },
  props: {
    fileInfo: {
      type: Object,
      default: {}
    }
  },
  methods: {
    close() {
      this.dropFileInfo.show = false;
      this.$parent.draguplod = false;
    },
    selectFile(e) {
      if (!e.target.files[0]) {
        return;
      }
      let files = e.target.files;
      if (files.length > 9) {
        this.$store.commit("SET_TOAST_TEXT", this.$t("msg.chatPanel.fileNum") + files.length + this.$t("msg.chatPanel.num"));
        return;
      }
      this.fileNum = files.length;
      this.ready = false;

      for (let i = 0; i < files.length; i++) {
        this.initFile(files[i], i);
      }
      e.target.value = "";
    },
    //拖动多个
    selectFile2(e) {
      let files = e;
      this.fileNum = files.length;
      this.ready = false;

      for (let i = 0; i < files.length; i++) {
        this.initFile(files[i], i);
      }
    },
    dropFileAction(type, msg) {
      this.dropFileInfo.show = false;
      this.$parent.draguplod = false;
      if (type) {
        if (this.dropFileInfo.info.length > 1) {
          this.selectFile2(this.dropFileInfo.info);
        } else {
          this.initFile(this.dropFileInfo.info, 0);
        }
        if (msg != "") {
          let time = new Date().getTime();
          this.$parent.updataChatHistory(msg, "1", time);
          let obj = {
            msg,
            msgType: "1",
            chatType: this.currentSession.chatType,
            toId: this.currentSession.chatId,
            time,
            userId: this.userInfo.id
          };
          this.$store.dispatch("sendMsg", obj).then(() => {});
          this.explain = "";
        }
      }
    },
    initFile(file, i) {
      const fileType = file.type;
      let nameArr = file.name.split(".");
      let fileName = nameArr[nameArr.length - 1];

      if (file.size == 0 || file.size > 1024 * 1024 * this.filesize) {
        this.$store.dispatch("setLayout", ["oversize", "close", true]);
        return false;
      }
      console.log(fileType)
      // TODO 正则
      if (
        fileType.indexOf("msword") < 0 &&
        fileType.indexOf("officedocument") < 0 &&
        fileType.indexOf("pdf") < 0 &&
        fileType.indexOf("ppt") < 0 &&
        fileType.indexOf("xls") < 0 &&
        fileType.indexOf("csv") < 0 &&
        fileType.indexOf("text/plain") < 0 &&
        fileType.indexOf("mp4") < 0 &&
        fileType.indexOf("mp3") < 0 &&
        fileType.indexOf("png") < 0 &&
        fileType.indexOf("jpg") < 0 &&
        fileType.indexOf("jpeg") < 0 &&
        fileType.indexOf("jpeg") < 0 &&
        fileType.indexOf("gif") < 0 &&
        fileType.indexOf("bmp") < 0
      ) {
        this.$store.dispatch("setLayout", ["fileTypeSupport", "", true]);
        return;
      }

      if (fileType.indexOf("image/") >= 0) {
        //图片
        this.getImageInfo(file).then(data => {
          this.initFileTwo(
            i,
            file,
            {
              imgUrl: data.imgUrl,
              imgWidth: data.width,
              imgHeigh: data.height,
              size: file.size
            },
            msgEnumTypes.img
          );
        });
      } else {
        let uploadFileType = msgEnumTypes.files;

        if (fileType.indexOf("video/") >= 0) {
          uploadFileType = msgEnumTypes.video;
          this.getVideoInfo(file).then(data => {
            browserMD5File(file, (err, md5) => {
              let viewShow = {
                name: file.name,
                fileName: file.name,
                imgUrl: data.imgUrl,
                size: file.size,
                url: "",
                progress: -1,
                md5: md5
              };
              this.initFileTwo(i, file, viewShow, uploadFileType);
            });
          });
        } else {
          browserMD5File(file, (err, md5) => {
            let viewShow = {
              name: file.name,
              fileName: file.name,
              size: file.size,
              url: "",
              progress: -1,
              md5: md5
            };
            this.initFileTwo(i, file, viewShow, uploadFileType);
          });
        }
        // 音乐文件类型
        //  else if(fileType.indexOf("audio/") >= 0 ) {
        //   uploadFileType = msgEnumTypes.audio;
        // }
        //文件

      }
    },
    initFileTwo(i, file, viewShow, bodyType) {
      let time = new Date().getTime();
      viewShow.mediaIndex = `abc${time}`;
      this.history[i] = {
        viewShow,
        bodyFrom: this.userInfo.id,
        bodyTime: time,
        bodyType,
        mId: time,
        loading: true,
        preview: "[" + this.$t("msg.common.file") + "]",
        toId: this.currentSession.chatId,
        chatInfo: {
          headImg: this.userInfo.headImg,
          nickName: this.userInfo.nickName
        }
      };
      let count = parseInt(file.size / this.cutSize);
      if (file.size % this.cutSize > 0) {
        count++;
      }
      //缓存发送文件信息
      let fileItem = {
        name: file.name,
        size: file.size,
        time: time,
        imgUrl: viewShow.imgUrl|| "",
        fileName: file.name,
        mediaIndex: `abc${time}`,
        chatType: this.currentSession.chatType,
        toId: this.currentSession.chatId,
        count: count
      };
      // 更新会话记录列表
      this.getFileData(fileItem, i, file, bodyType);
    },
    getFileData(item, i, file, bodyType) {
      let videoPreview = require("../../assets/images/file-icon/mp4.png");
      // 数据整理过程
      const reqTouch = data => {
        item.uploadId = data.uploadId;
        item.fileId = data.fileId;
        item.fileUrl = data.fileUrl;
        item.type = data.type;
        item.idx = i;
        item.fileIndex = data.fileIndex;
        item.progressIndex = parseInt(item.fileIndex / this.cutSize);
        item.fileArr = this.cutFile(file, item.progressIndex, item.fileId);

        let historyC = this.history[i];
        switch (historyC.bodyType) {
          case msgEnumTypes.img:
            //图片
            historyC.viewShow.imgUrl = data.fileUrl;
            break;
          case msgEnumTypes.audio:
            historyC.viewShow.imgUrl = data.fileUrl;
            //音频
            break;
          case msgEnumTypes.video:
            // historyC.viewShow.imgUrl = require("../../assets/images/file-icon/mp4.png");
            //视频
            break;
          default:
            historyC.viewShow.url = data.fileUrl;
            let obj = JSON.stringify({
              url: this.global.fileDownUrl + "original/" + historyC.viewShow.url,
              name: historyC.viewShow.name
            });
            let d = window.encodeURIComponent(obj);
            let str = window.btoa(d);
            historyC.viewShow.dl64 = str;
            historyC.viewShow.progress = data.type == 0 ? 100 : 0;
            break;
        }

        item.viewShow = historyC.viewShow;
        item.viewShow.progress = 100;
        item.bodyType = historyC.bodyType;
        item.mediaIndex = `${historyC.viewShow.mediaIndex}`;
        // this.$store.commit("ADD_UPLOAD_LIST", historyC);

        this.sendFile(item, bodyType, data);

        this.fileList.push(item);
        if (this.fileList.length == this.fileNum) {
          this.fileList = this.fileList.sort((a, b) => a.time - b.time);
          this.ready = true;
        }
      };
      // mockTest
      // reqTouch(payload);

      //上传文件初始化
      this.$parent.send({
        imgUrl: item.imgUrl,
        fileUrl: bodyType == msgEnumTypes.video ? videoPreview : item.name,
        fileId: item.name,
        fileName: item.name,
        size: item.size,
        progress: 0, // item.viewShow && item.viewShow.progress || 0,
        mediaIndex: item.mediaIndex,
        type: bodyType || msgEnumTypes.files,
        uploadStatus: false
      });

      Util.getFileUrl(file).then(
        data => {
          console.log(data);
          reqTouch(data);
        },
        err => {
          console.log(err);
          this.fileNum--;
          if (this.fileList.length == this.fileNum) {
            this.fileList = this.fileList.sort((a, b) => a.time - b.time);
            this.ready = true;
          }
          this.$store.dispatch("setLayout", ["error", "close", true]);
        }
      );
    },

    uploadFile(fileBlock, uploadId) {
      return new Promise((resolve, reject) => {
        fileBlock.file.arrayBuffer().then(data => {
          try {
            let a = { fileName: fileBlock.file.name, fileIndex: fileBlock.index, fileId: fileBlock.fileId, indexNum: fileBlock.indexNum };
            if (uploadId) {
              a.uploadId = uploadId;
            }
            let dataParams = JSON.stringify(a);
            let myArray = msgUtil.msgEntityToBufferV1(this.$store.getters.token, "/fileShare/fileUploadV2.htm", dataParams, data);

            var xml = new XMLHttpRequest();
            xml.open("post", base.imfileUrl + "/apiV1.htm", true);
            xml.send(myArray);
            xml.onreadystatechange = () => {
              //回调函数
              if (xml.status == 200) {
                setTimeout(() => {
                  let res = JSON.parse(xml.responseText);
                  if (res.code == 0) {
                    resolve();
                  } else {
                    reject();
                  }
                }, 20);
              }
            };
          } catch (error) {
            console.error(error);
          }
        });
      });
    },

    uploadHandler(cacheFile, uploadCount) {
      let arr = cacheFile.fileArr;
      let cacheItem = arr[uploadCount];
      this.uploadFile(cacheItem, cacheFile.uploadId).then(() => {
        uploadCount++;
        cacheFile.progressIndex = cacheFile.progressIndex + 1;
        let pr = {
          id: cacheFile.time,
          num: parseInt((cacheFile.progressIndex / cacheFile.count) * 100)
        };
        let list = this.$store.state.uploadInfo;
        list.forEach(item => {
          if (pr.id == item.mId) {
            item.viewShow.progress = pr.num;
          }
        });
        this.$store.commit("UPDATE_PROGRESS", pr);
        if (uploadCount < arr.length) {
          this.uploadHandler(cacheFile, uploadCount);
        } else {
          this.sendFile(cacheFile.viewShow, cacheFile.bodyType, cacheFile);
        }
      });
    },
    sendFile(item, msgType, data) {
      this.$parent.send({
        uploadId: data.uploadId,
        fileId: data.fileId,
        fileIndex: data.fileIndex,
        fileName: item.fileName,
        fileUrl: data.fileUrl,
        size: item.size,
        mediaIndex: item.mediaIndex,
        progress: 100, // item.viewShow.progress,
        type: msgType || msgEnumTypes.files,
        uploadStatus: true
      });

      this.ready = true;
      this.count = 0;
      this.fileList.shift();
      this.history.shift();
      //   this.$store.commit("DELETE_UPLOAD_LIST", 0);
    },
    cutFile(file, indexNum, fileId) {
      let count = parseInt(file.size / this.cutSize) | 0,
        fileArr = [];
      for (let i = indexNum; i < count; i++) {
        fileArr.push({
          indexNum: i + 1,
          name: file.name + ".part" + (i + 1),
          file: file.slice(this.cutSize * i, this.cutSize * (i + 1)),
          index: this.cutSize * i,
          fileId
        });
      }
      if (file.size % this.cutSize > 0) {
        fileArr.push({
          indexNum: count + 1,
          name: file.name + ".part" + (count + 1),
          file: file.slice(this.cutSize * count, file.size),
          index: this.cutSize * count,
          fileId
        });
      }

      return fileArr;
    },
    uploadCancel(data) {
      //取消上传
      console.log(this.fileList)
      this.$parent.cancelUploadMsg(data.id);

      // 多个文件上传
      // if (this.fileList.length > 0) {
      //   if (data.timeStamp == this.fileList[0].time && this.fileXml) {
      //     this.$parent.cancelUploadMsg(data.id);
      //     this.fileXml.abort();
      //     this.$store.commit("DELETE_UPLOAD_LIST", 0);
      //     this.fileList.shift();
      //     this.ready = true;
      //   } else {
      //     for (let i = 0; i < this.fileList.length; i++) {
      //       if (this.fileList[i].time == data.timeStamp) {
      //         this.fileList.splice(i, 1);
      //         this.$store.commit("DELETE_UPLOAD_LIST", i);
      //         break;
      //       }
      //     }
      //   }
      // }
      // 删除消息
      // this.$store.commit("DELETE_MESSAGE", data.bodyTime);
    },
    sendEvent(event) {
      if (event.keyCode === 13) {
        this.dropFileAction(true, this.explain);
      }
    },
    getImageInfo(file) {
      return new Promise(resolve => {
        let fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = function() {
          //onload文件读取完成事件
          let img = new Image();
          img.src = fr.result;
          img.onload = function() {
            let width = img.width;
            let height = img.height;
            let imgUrl = fr.result;
            resolve({
              width,
              height,
              imgUrl
            });
          };
        };
      });
    },
    getVideoInfo(file) {
      return new Promise(resolve => {
        let windowURL = window.URL || window.webkitURL,
          url = windowURL.createObjectURL(file);
        document.getElementById("video-thumb").innerHTML = '<video id="video-thumb-source" muted controls ><source src="' + url + '" type="video/mp4"></video>';
        var videoElement = document.getElementById("video-thumb-source");
        videoElement.addEventListener("canplay", _event => {
          var canvas = document.createElement("canvas");
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          videoElement.play();
          setTimeout(() => {
            canvas.getContext("2d").drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            let img = new Image();
            img.src = canvas.toDataURL("image/png");
            img.onload = function() {
              videoElement.pause();
              let width = img.width;
              let height = img.height;
              let imgUrl = img.src;
              resolve({
                width,
                height,
                imgUrl
              });
            };
          }, 100);
        });
      });
    },
    getAudioInfo(file) {
      return new Promise(resolve => {
        let fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = function() {
          //onload文件读取完成事件
          let audio = new Audio();
          audio.src = fr.result;
          audio.onload = function() {
            let width = audio.width;
            let height = audio.height;
            let url = fr.result;
            resolve({
              width,
              height,
              url
            });
          };
        };
      });
    }
  },
  mounted() {}
};
</script>
