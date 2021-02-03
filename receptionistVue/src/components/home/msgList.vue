<template>
  <ul class="message-list">
    <li v-for="(item, index) in chatlist" :key="index" :id="`anchor${item.id}`">
      <div v-if="item.type == msgEnumTypes.newTransferEntry" class="list clearfix">
        <div class="no-chat">
          <span class="text"> {{ item.item.fromUserName }} transfer conversation to {{ item.item.nickName }}</span>
        </div>
      </div>
      <div
        v-if="item.type == msgEnumTypes.textHyperLink || item.type == msgEnumTypes.text || item.type == msgEnumTypes.inout || item.id == -100"
        v-html="item.item"
        class="list clearfix"
        @click="openUrl($event)"
      ></div>
      <!-- 图片 -->
      <div v-if="item.type == msgEnumTypes.img" class="list clearfix">
        <div
          class="chat-name"
          :class="{
            self: item.isSender
          }"
        >
          {{ userInfo.id ? userInfo.nickName : item.fromName }}
        </div>
        <div
          class="chat-item"
          :class="{
            self: item.isSender
          }"
        >
          <div
            class="item-box msg-detail msg-img"
            ondragstart="return false;"
            v-imagePreview
            :data-index="`{%type%:%message%,%mid%:${item.id},%msgType%:${item.type}}`"
            :style="{
              width:
                item.item.imgWidth > 254 || item.item.imgHeigh > 142
                  ? item.item.imgWidth / item.item.imgHeigh > 254 / 142
                    ? 254 + 'px'
                    : (item.item.imgWidth / item.item.imgHeigh) * 142 + 'px'
                  : item.item.imgWidth + 'px',
              height:
                item.item.imgWidth > 254 || item.item.imgHeigh > 142
                  ? item.item.imgWidth / item.item.imgHeigh < 254 / 142
                    ? 142 + 'px'
                    : (item.item.imgHeigh / item.item.imgWidth) * 254 + 'px'
                  : item.item.imgHeigh + 'px'
            }"
          >
            <!-- class="img thumbnails"   请勿随意修改此属性值，修改时，请同步修改loadOriginalImg方法对应值 -->
            <img
              class="img thumbnails"
              ondragstart="return false"
              :src="
                item.item.imgUrl
                  ? item.item.imgUrl.indexOf('data:') < 0
                    ? global.fileDownUrl.replace('/cs/', '/') + 'compress/' + item.item.imgUrl
                    : item.item.imgUrl
                  : ''
              "
              :data-idx="index"
              :data-id="item.id"
              v-viewer:list="chatlist"
              @load="loadOriginalImg($event, item.item.imgUrl)"
            />
            <div class="msg-status display-flex">
              <span class="time">
                {{ item.time }}
                <span
                  v-if="item.isSender"
                  :id="`${item.id}_state_span`"
                  :class="{
                    senging: item.id > 1000000000,
                    wait: item.id > 1000000000 && currentSession.newMsgId <= item.id,
                    sendsuccess: currentSession.newMsgId >= item.id
                  }"
                ></span>
              </span>
              <!-- <span
                        class="send"
                        :class="{
                          loading: item.loading == 0,
                          read: item.readNum > 0,
                          fail: item.loading == 2,
                          fail: item.loading == 3
                        }"
                        @click="reSend(item)"
                      ></span> -->
            </div>
          </div>
        </div>
      </div>
      <!-- 视频 -->
      <div v-if="item.type == msgEnumTypes.video" class="list clearfix">
        <div
          class="chat-name"
          :class="{
            self: item.isSender
          }"
        >
          {{ userInfo.id ? userInfo.nickName : item.fromName }}
        </div>
        <div
          class="chat-item"
          :class="{
            self: item.isSender
          }"
        >
          <div
            class="item-box msg-detail msg-video"
            :data-index="`{%type%:%message%,%id%:${item.id},%msgType%:${item.type}}`"
            :style="{
              width:
                item.item.imgWidth > 254 || item.item.imgHeigh > 142
                  ? item.item.imgWidth / item.item.imgHeigh > 254 / 142
                    ? 254 + 'px'
                    : (item.item.imgWidth / item.item.imgHeigh) * 142 + 'px'
                  : item.item.imgWidth + 'px',
              height:
                item.item.imgWidth > 254 || item.item.imgHeigh > 142
                  ? item.item.imgWidth / item.item.imgHeigh < 254 / 142
                    ? 142 + 'px'
                    : (item.item.imgHeigh / item.item.imgWidth) * 254 + 'px'
                  : item.item.imgHeigh + 'px'
            }"
            :data-progress="item.item.progress"
            v-videoError
            v-if="item.type == msgEnumTypes.video"
          >
            <img
              class="img"
              ondragstart="return false"
              :data-thumb="item.item.imgUrl"
              :src="item.item.progress > 0 ? global.fileDownUrl.replace('/cs/', '/') + 'compress/' + item.item.fileUrl + '.png' : item.item.imgUrl"
              :data-idx="index"
              :data-id="item.id"
              v-viewer:list="chatlist"
            />
            <a
              class="cancelUpload cancelVideo"
              v-if="item.item.progress < 100"
              @click="cancelUpload(item)"
              href="javascript:;"
              target="_self"
              :alt="item.item.fileId"
            >
              <div class="cancelUploadBtn"></div>
            </a>
            <div class="msg-status display-flex" :class="{ hide: userInfo.id != item.bodyFrom }">
              <span class="time">
                {{ item.time }}
                <span
                  v-if="item.isSender"
                  :id="`${item.id}_state_span`"
                  :class="{
                    senging: item.id > 1000000000,
                    wait: item.id > 1000000000 && currentSession.newMsgId <= item.id,
                    sendsuccess: currentSession.newMsgId >= item.id
                  }"
                ></span>
              </span>
              <!-- <span
                          class="send"
                          :class="{
                            loading: item.loading == 0,
                            read: item.readNum > 0,
                            fail: item.loading == 2
                          }"
                          @click="reSend(item)"
                        ></span> -->
            </div>
          </div>
        </div>
      </div>

      <!-- 文件 -->
      <div v-if="item.type == msgEnumTypes.files" class="list clearfix">
        <div
          class="chat-name"
          :class="{
            self: item.isSender
          }"
        >
          {{ userInfo.id ? userInfo.nickName : item.fromName }}
        </div>
        <div
          class="chat-item"
          :class="{
            self: item.isSender
          }"
        >
          <div
            :style="{ background: userInfo.id == item.bodyFrom ? bubbles.mybackground : bubbles.adversebackground }"
            class="item-box msg-file display-flex"
            ondragstart="return false"
            :data-index="`{%type%:%message%,%mid%:${item.mId},%msgType%:${item.bodyType}}`"
          >
            <a
              class="download"
              v-if="item.item.progress == 100"
              :href="global.fileDownUrl + item.item.fileUrl + '#' + item.item.dl64"
              target="_blank"
              :alt="item.item.fileId"
            >
              <div class="file-icon" :class="item.item.fileUrl | fileFitler"></div>
            </a>
            <a
              class="cancelUpload"
              v-if="item.item.progress < 100"
              @click="cancelUpload(item)"
              href="javascript:;"
              target="_self"
              :alt="item.item.fileId"
            >
              <div v-if="item.item.progress <= 100" class="file-icon" :class="item.item.fileUrl | fileFitler">
                <div class="cancelUploadBtn"></div>
              </div>
            </a>
            <div class="file-info display-flex-item">
              <p class="title">{{ item.item.fileName || item.item.fileId | fileName(15) }}</p>
              <div class="file-info-item display-flex-item">
                <div class="size">
                  <span v-if="item.item.progress == 100 || (item.loading == 2 && item.item.progress == 500)">{{ item.item.size | fileSize }}</span>
                  <div class="progress-bar" v-if="item.item.progress < 100">
                    <span class="bar" :style="{ width: item.item.progress + '%' }"></span>
                  </div>
                  <span v-if="item.item.progress < 100">{{ item.item.progress > 0 ? item.item.progress : 0 }}%</span>
                </div>
                <div v-if="item.item.progress == 100" class="msg-status file-info-item">
                  <span class="time">
                    {{ item.time }}
                    <span
                      v-if="item.isSender"
                      :id="`${item.id}_state_span`"
                      :class="{
                        senging: item.id > 1000000000,
                        wait: item.id > 1000000000 && currentSession.newMsgId <= item.id,
                        sendsuccess: currentSession.newMsgId >= item.id
                      }"
                    ></span>
                  </span>
                </div>
                <div class="msg-status uploading file-info-item" v-if="item.item.progress < 100">
                  <span class="uploading display-flex-item" v-if="item.loading == 2 && item.item.progress == 500">{{
                    $t("msg.chatPanel.network")
                  }}</span>
                  <span class="time">
                    {{ item.time }}
                    <span class="time">
                      <img src="../../assets/img/file-loading.png" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { msgEnumTypes, sessionEnumTypes } from "@/common/enum";
import UplaodFiles from "@/components/common/uploadFile";

export default {
  name: "fileMsgList",
  data() {
    return {
      msgEnumTypes
    };
  },
  mixins: [UplaodFiles],
  props: {
    userInfo: Object,
    chatlist: Array,
    currentSession: Object
  },
  methods: {
    openUrl(ev) {
      let tagName = ev.target.tagName;
      if (tagName != "A") return;
      let url = ev.target.innerHTML;
      if (!(url.indexOf("ftp") >= 0 || url.indexOf("http") >= 0 || url.indexOf("https") >= 0)) {
        url = "https://" + url;
      }
      var a = document.createElement("a");
      var event = new MouseEvent("click");
      a.href = url;
      a.target = "_blank";
      a.dispatchEvent(event);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/var";
.message-list {
  position: relative;
  background: $backgroup-color;
  .list {
    /deep/.no-chat {
      padding: 5px 80px;
      text-align: center;

      .text {
        display: inline-block;
        text-align: center;
        padding: 4px 15px;
        color: #000;
        background: rgba(128, 153, 227, 0.2);
        border-radius: 10px;
        font-size: 12px;
      }
    }
    /deep/.chat-name {
      display: none;
      &.self {
        display: block;
        text-align: right;
        padding-right: 30px;
        color: $color-theme;
      }
    }
    /deep/.getLast {
      color: $color-theme;
      text-align: center;
      cursor: pointer;
      margin: 20px 0;
    }
    /deep/.chat-item {
      position: relative;
      width: 100%;
      height: auto;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      &.self {
        .item-box {
          background: #c5d2f8;
          border-radius: 26px 26px 0 26px;
          margin-right: 20px;
          align-self: flex-end;
          display: flex;
          &.msg-file .file-info .size {
            color: #fff;
          }
          .time {
            color: #fff;
            span {
              margin-left: 6px;
              display: block;
            }

            .sendsuccess {
              width: 13px;
              height: 9px;
              background: url(../../assets/img/chat/success.png) no-repeat;
            }

            .wait {
              width: 10px;
              height: 8px;
              background: url(../../assets/img/chat/wait.png) no-repeat;
            }

            .senging {
              width: 15px;
              height: 15px;
              background: url(../../assets/img/chat/loading.gif) no-repeat;
              background-size: 100%;
            }
          }
        }
      }

      .item-box {
        align-self: flex-start;
        position: relative;
        margin-left: 20px;
        // max-width: 482px;
        min-height: 42px;
        padding: 6px 15px;
        border-radius: 26px 26px 26px 0;
        border: 1px solid #e2e2e2;
        line-height: 30px;
        word-break: break-all;
        background: #fff;
        font-size: 16px;
        display: flex;
        div {
          max-width: 482px;
        }
        &.msg-img {
          padding: 0;
          background: none;
          border-radius: 20px;
          border: 2px solid #c5d2f8;
          min-width: 82px;
          min-height: 82px;
        }
        &.msg-video {
          padding: 0;
          background: none;
          border-radius: 20px;
          border: 2px solid #c5d2f8;
        }
        &.msg-detail.msg-img .msg-status .time {
          color: #fff;
        }
      }
      .time {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #949ca4;
        margin-left: 10px;
        align-self: flex-end;
      }
    }
  }
}
.cancelUpload {
  &.cancelVideo {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 2;
  }
  .cancelUploadBtn {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.4) url(../../assets/img/cancel-upload.png) center center no-repeat;
  }
}
</style>
