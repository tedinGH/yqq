<template>
  <transition name="scale-x">
    <div class="my-popup" @click.stop="">
      <div class="my-popup-content invite-friend" @click="showBigCard = false">
        <span class="my-popup-close" @click.stop="hide"></span>
        <div class="invite-wrap">
          <transition name="pop">
            <div class="invite-box">
              <div class="user-avatar">
                <img
                  v-if="currentSession.img"
                  class="img"
                  :src="global.fileDownUrl + 'compress/' + currentSession.img"
                  v-headErrors
                />
                <span
                  class="default"
                  v-defaultHead
                  v-if="!currentSession.img"
                  v-text="currentSession.name"
                >
                </span>
                <div class="user-name">
                  <p class="text">{{ currentSession.name }}</p>
                  <p class="text-you">
                    {{ $t("msg.inviteFriend.inviteGroup") }}
                  </p>
                </div>
              </div>
              <div class="title">{{ $t("msg.common.links") }}</div>
              <div class="copy-link">
                <div class="links">{{ urlData }}</div>
                <button class="invite-btn" @click="copyLink">
                  {{ $t("msg.inviteFriend.copyLink") }}
                </button>
              </div>
              <div class="title" style="margin-top: 22px">
                {{ $t("msg.detail.QRcode") }}
              </div>
              <div class="QRcode">
                <div class="code" @click.stop="transfer">
                  <canvas id="invite"></canvas>
                </div>
                <div class="card">
                  <p class="user-detail">
                    {{ $t("msg.inviteFriend.clickView") }}
                  </p>
                  <button
                    type="button"
                    class="invite-btn"
                    @click.stop="downloadCard"
                  >
                    {{ $t("msg.inviteFriend.download") }}
                  </button>
                </div>
              </div>
            </div>
          </transition>
          <transition name="pop">
            <div class="big-card" id="codeCard" v-show="showBigCard">
              <div class="display-flex header">
                <div class="user-avatar">
                  <img
                    class="img"
                    :src="global.fileDownUrl + 'compress/' + currentSession.img"
                  />
                  <span
                    class="default"
                    v-defaultHead
                    v-if="!currentSession.img"
                    v-text="currentSession.name"
                  >
                  </span>
                </div>
                <div class="display-flex-item">
                  <p class="user-name">{{ currentSession.name }}</p>
                  <!-- <p class="user-name">EchatAPP ID: {{ currentSession.paramId }}</p> -->
                </div>
              </div>
              <div class="card-code">
                <canvas id="inviteCard"></canvas>
              </div>
              <p class="intro">{{ $t("msg.inviteFriend.info2") }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import QRCode from "qrcode";
import { Util } from "@/tools/utils";
import canvasExt from "@/tools/screenshot";

export default {
  name: "InviteJoinGroup",
  data() {
    return {
      showBigCard: false,
      urlData: "",
    };
  },
  props: {
    groupInfo: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["userId", "currentSession"]),
  },
  components: {
    QRCode,
  },
  methods: {
    show() {
      this.showBigCard = false;

      let obj = {
        groupId: this.currentSession.paramId,
        identifying: "g",
      };
      this.$http.getShareUrl(obj).then((data) => {
        this.urlData = data.shortUrl;
        this.useqrcode(data.shortUrl, "invite");
      });
    },
    hide() {
      this.$emit("input", false);
    },
    useqrcode(path, id) {
      let canvas = document.getElementById(id);
      QRCode.toCanvas(canvas, path, (error) => {
        if (error) console.error(error);
      });
    },
    transfer() {
      this.showBigCard = true;
      this.useqrcode(this.urlData, "inviteCard");
    },
    downloadCard() {
      // this.transfer();
      setTimeout(() => {
        let targetDom = document.getElementById("codeCard");
        canvasExt.cropper(targetDom, 320, 405, 0, 0, this.download);
      }, 400);
    },
    download(imgData) {
      var a = document.createElement("a");
      var event = new MouseEvent("click");
      var timestamp = new Date().getTime();
      var name = imgData.src.substring(22, 30) + timestamp + ".png";
      a.download = name;
      a.href = imgData.src;
      a.dispatchEvent(event);
    },
    copyLink() {
      let oInput = document.createElement("input");
      oInput.value = this.urlData;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      document.body.removeChild(oInput);
      this.$store.commit("SET_TOAST_TEXT", this.$t("msg.menu.copySuccess"));
    },
  },
  mounted() {
    this.show();
    try {
      new MouseEvent("test");
      return false; // No need to polyfill
    } catch (e) {
      // Need to polyfill - fall through
    }
    var MouseEvent = function (eventType, params) {
      params = params || { bubbles: false, cancelable: false };
      var mouseEvent = document.createEvent("MouseEvent");
      mouseEvent.initMouseEvent(
        eventType,
        params.bubbles,
        params.cancelable,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      return mouseEvent;
    };
    MouseEvent.prototype = Event.prototype;
    window.MouseEvent = MouseEvent;
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/var";
.default {
  margin-right: 10px;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  text-align: center;
  line-height: 32px;
  font-weight: 550;
  color: #fff;
}
// 视频播放弹窗
.invite-friend {
  z-index: 198;
  border-radius: 10px;
  text-align: left;
  width: 731px;
  height: 492px;
  .invite-wrap {
    width: 731px;
    background: #ffffff;
    box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
    
    height: 492px;
    border-radius: 10px;
    position: relative;
    .invite-box {
      width: 731px;
      padding: 24px 39px;
      height: 492px;
      border-radius: 10px;
      background: #fff;
    }
    .user-avatar {
      border-radius: 0;
      margin-right: 10px;
      height: 80px;
      display: flex;
      img {
        border-radius: 50%;
        width: 80px;
        height: 80px;
      }
      .default{
        width: 80px;
        height: 80px;
        line-height: 80px;
        font-size: 28px;
      }
      .user-name {
        margin-left: 20px;
        align-self: center;
        .text {
          color: $name-color;
          font-size: 18px;
          margin-bottom: 12px;
          font-weight: 600;
        }
        .text-you {
          text-align: left;
          color: #5f717f;
        }
      }
    }
    .title {
      color: $title-color;
      margin-top: 40px;
    }
    .copy-link {
      width: 100%;
      display: flex;
      align-items: center;
      // height: 100%;
      margin-top: 10px;
      .links {
        width: 472px;
        height: 44px;
        background: #f7f8fd;
        border: 1px solid #e1e6ec;
        border-radius: 4px;
        display: inline-block;
        font-size: 14px;
        line-height: 44px;
        padding-left: 10px;
        color: #5F717F;
      }
      .invite-btn {
        margin-left: 20px;
        width: 192px;
        height: 40px;
        border-radius: 5px;
        color: #fff;
        display: inline-block;
        background: $color-theme;
      }
    }

    .QRcode {
      display: flex;
      width: 100%;
      height: 200px;
      align-items: center;
      .code {
        width: 198px;
        height: 198px;
        background: #ffffff;
        box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
        
        border-radius: 4px;
        margin-top: 10px;
        cursor: pointer;
        #invite {
          width: 198px !important;
          height: 198px !important;
        }
      }
      .card {
        margin-left: 30px;
        .user-detail{
          color: #8D95A2;
          font-size: 14px;
        }
        .invite-btn {
          margin-top: 20px;
          width: 192px;
          height: 40px;
          border-radius: 5px;
          color: #fff;
          background: $color-theme;
        }
      }
    }

    .big-card {
      position: absolute;
      width: 256px;
      height: 366px;
      background: rgba($color: #000000, $alpha: 0.7);
      border-radius: 8px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .header {
        width: 256px;
        margin: 20px;
        .user-avatar {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        .user-name {
          font-size: 16px;
          display: inline-block;
          width: 180px;
          overflow: hidden;
          white-space: nowrap;
          color: #fff;
          text-overflow: ellipsis;
        }
      }
      .card-code {
        // width: 216px;
        // height: 216px;
        margin: 0 0 0 20px;
        // background: #fff;
        #inviteCard {
          width: 216px !important;
          height: 216px !important;
        }
      }
      .intro {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
        padding: 15px;
        color: #fff;
        font-size: 12px;
      }
    }
  }
}
</style>
