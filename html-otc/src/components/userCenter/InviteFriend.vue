<template>
  <transition name="scale-x">
    <Popup :hideHeader='true' :radius="'8'">
      <div class="invite-friend" slot="body">
      <span class="close" @click="close"></span>
        <div class="invite-wrap" @click="showBigCard = false">
          <transition name="pop">
            <div class="invite-box">
              <div class="user-avatar">
                <img
                  class="img"
                  :src="global.fileDownUrl + 'compress/' + userInfo.headImg"
                  v-if="userInfo.headImg"
                  v-headError
                />
                <!-- <span
                  class="default"
                  v-defaultHead
                  v-if="!userInfo.headImg"
                  v-text="userInfo.name"
                >
                </span> -->
                <img class="avatar" src="../../assets/images/error-head.png" v-if="!userInfo.headImg" v-headViewer>
                <div class="user-name">
                    <p class="text">
                      {{ userInfo.nickName || userInfo.userName }}
                    </p>
                    <p class="text-you">{{ $t("msg.inviteFriend.inviteYou") }}</p>
                </div>
              </div>
              <div class="title">{{ $t("msg.common.links") }}</div>
              <div class="copy-link">
                <div class="links">{{ urlData }}</div>
                <button class="invite-btn" @click="copyLink">
                  {{ $t("msg.inviteFriend.copyLink") }}
                </button>
              </div>
              <div class="title" style="margin-top:22px">{{ $t("msg.detail.QRcode") }}</div>
              <div class="QRcode">
                <div class="user-code"  @click.stop="transfer">
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
                    :src="global.fileDownUrl + 'compress/' + userInfo.headImg"
                    v-if="userInfo.headImg"
                    v-headError
                  />
                  <img class="avatar" src="../../assets/images/error-head.png" v-if="!userInfo.headImg" v-headViewer>
                </div>
                <div class="display-flex-item">
                  <p class="user-name">
                    {{ userInfo.nickName || userInfo.userName }}
                  </p>
                  <p v-if="userInfo.alias" class="user-name">
                    @{{ userInfo.alias }}
                  </p>
                </div>
              </div>
              <div class="user-code">
                <canvas id="inviteCard"></canvas>
              </div>
              <p class="intro">{{ $t("msg.inviteFriend.info") }}</p>
            </div>
          </transition>
        </div>
      </div>
    </Popup>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
import QRCode from "qrcode";
import { Util } from "@/tools/utils";
import { Crypto } from "@/tools/crypto" 
import canvasExt from "@/tools/screenshot";

export default {
  name: "Video",
  data() {
    return {
      showBigCard: false,
      urlData: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  components: {
    QRCode,
  },
  methods: {
    close() {
        this.$store.dispatch("setLayout", ["", "", false]);
      },
    show() {
      this.showBox = true;
      let obj = {
        identifying: "f",
      };
      this.$http.getShareUrl(obj).then((data) => {
        this.urlData = data.shortUrl;
        setTimeout(() => {
          this.useqrcode(data.shortUrl, "invite");
        }, 100);
      });
    },
    hide() {
      this.$store.dispatch("setLayout", ["", "", false]);
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
      // var event = new MouseEvent("click");
      // var timestamp = new Date().getTime();
      // var name = imgData.src.substring(22, 30) + timestamp + ".png";
      var name = "invite friends QR.png";
      a.download = name;
      a.href = imgData.src;
      a.click();
      // a.dispatchEvent(event);
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
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/var";

.invite-friend {
  z-index: 198;
  width: 731px;
  height: 492px;
  border-radius: 10px;
  .close {
      width: 12px;
      height: 12px;
      display: block;
      position: absolute;
      top: 15px;
      right: 15px;
      z-index: 10;
      background: url(../../assets/images/chat/icon-window-close.png) center center no-repeat;
      cursor: pointer;
      &:hover{
        background: url(../../assets/images/chat/icon-window-close-red.png) center center no-repeat;
      }
    }
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
      border-radius: 10px;
      background: #fff;
    }
    .user-avatar {
      border-radius: 0;
      margin-right: 10px;
      height: 80px;
      display: inline-block;
      display: flex;
      img {
        border-radius: 50%;
        width: 80px;
        height: 80px;
      }
      .user-name {
        margin-left: 20px;
        align-self :center;
        .text{
          color: $name-color;
          font-weight: 600;
          font-size: 18px;
          margin-bottom: 12px;
        }
        .text-you{
          color: #5F717F;
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
      height: 100%;
      margin-top: 10px;
      .links {
        width: 472px;
        height: 44px;
        background: #f7f8fd;
        border: 1px solid #e1e6ec;
        border-radius: 4px;
        display: inline-block;
        line-height: 44px;
        padding-left: 10px;
        color: #5F717F;
        font-size: 14px;
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
    .user-code {
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

.QRcode{
  display: flex;
  align-items:center;
  .card{
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
      height: 389px;
      background: rgba($color: #000000, $alpha: .7);
      border-radius: 8px;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      .header {
        width: 256px;
        margin: 20px ;
        .user-avatar {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          img{
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
      .user-code {
        width: 216px;
        height: 216px;
        margin: 0 0 0 20px;
        background: #Fff;
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
