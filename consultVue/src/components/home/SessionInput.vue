<template>
  <div class="session-input">
    <div v-show="msging">
      <div class="instrument" style="position: relative;">
        <img
          @click.stop="closeemoji"
          src="../../assets/img/chat/emoji-active.png"
          style="cursor: pointer;margin-left:27px;margin-right:15px"
          v-if="layout.module == 's' && layout.child == 'emoji'"
        />
        <img
          @click.stop="showemoji"
          src="../../assets/img/chat/emoji.png"
          style="cursor: pointer;margin-left:27px;margin-right:15px"
          v-else
        />
        <a class="icon icon-image" style="margin-right:15px">
          <label class="lable" for="upAll"></label>
          <input
            type="file"
            hidden="true"
            id="upAll"
            @change="$emit('selectAll', $event)"
            accept=".doc, .docx, .pdf, .ppt, .xlsx, .xls, .csv, .txt, .mp4, .aac, .mp3, .png, .jpg, .jpeg, .gif"
          />
        </a>
        <a
          class="icon icon-evaluate"
          v-if="evaluateConf.activeStatus"
          @click.stop="pushEvaluate(evaluateCSEnum.invitationType.visitorPush)"
        ></a>
        <emoji v-if="layout.module == 's' && layout.child == 'emoji'"></emoji>
      </div>
      <div class="content">
        <div class="input-send">
          <div class="input-placeholder" v-if="editFocus">{{ $t("msg.chatPanel.say") }}</div>
          <pre
            class="input-msg"
            contenteditable="true"
            ref="editMsg"
            @focus="editFocus = false"
            @blur="saveDraft()"
            @paste="pasteMessage($event)"
            @keyup="msgChange($event)"
            @keydown="preKeydown($event)"
          ></pre>
        </div>
        <div @click="$emit('send')" class="send">
          <img src="../../assets/img/chat/send.png" />
        </div>
      </div>
    </div>
    <div v-if="!msging">
      <div class="tip-title">This session has ended, you can</div>
      <div class="checkBtn">
        <p @click="LeaveBeforeEvaluate()" style="margin-right:20px">Leave</p>
        <p @click="refresh()" style="margin-left:20px">Continue</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { actionApi } from "@/api";
import { msgEnum, sessionEnum, evaluateCSEnum } from "@/common/enum";
import emoji from "@/components/home/emoji";
import filter from "@/common/filters";
import { Util } from "@/tools/utils";

export default {
  name: "SessionInput",
  data() {
    return {
      msgEnum,
      evaluateCSEnum,
      editFocus: true,
    };
  },
  components: {
    emoji,
  },
  computed: {
    ...mapGetters(["companyId", "customerServiceId", "evaluateConf"]),
  },
  props: {
    layout: Object,
    moreThan: Boolean,
    chatlist: Array,
    msging: Boolean,
  },
  methods: {
    focus(value) {
      this.editFocus = value;
    },
    saveDraft() {
      //失去焦点 保存草稿
      let draft = this.$refs.editMsg.innerHTML;
      let regExp = new RegExp("(&nbsp*)|(<br>*)|(s*)", "g");
      if (!draft || draft.replace(regExp, "").length == 0) {
        this.editFocus = true;
      }
    },
    pasteMessage(event) {
      event.preventDefault();
      let clipboardData = event.clipboardData || window.clipboardData;
      let items = clipboardData.items;
      let files = clipboardData.files;
      let pastedData = clipboardData.getData("Text");
      if (!pastedData) return;
      if (pastedData.length > 2000) {
        this.moreThan = true;
      }
      if (Util.browserType() === "FF") {
        pastedData = pastedData.replace(/\[\[/g, "[").replace(/\]\]/g, "]");
      }
      pastedData = pastedData.replace(/</g, "&lt;");
      pastedData = pastedData.replace(/>/g, "&gt;");
      pastedData = pastedData.replace(/ /g, "&nbsp;");
      pastedData = pastedData.replace(/\n/g, "<br/>");
      Util.insert(this.$refs.editMsg, pastedData, false);
    },
    msgChange(event) {
      // do something
    },
    preKeydown(event) {
      if (localStorage.getItem("enterType") == 1 || !localStorage.getItem("enterType")) {
        if (event.keyCode === 13 && event.ctrlKey) {
          let insertHtml = "<br/><br/>";
          if (this.$refs.editMsg.innerHTML.indexOf("<br><br>") > -1) {
            insertHtml = "<br/>";
          }
          // safari自身可以换行，不用处理
          if (!Util.isSafari()) {
            Util.insert(this.$refs.editMsg, insertHtml, false);
          }
        } else if (event.keyCode === 13) {
          event.preventDefault();
          this.$emit("send");
        }
      } else {
        if (event.keyCode == 13 && event.ctrlKey) {
          event.preventDefault();
          this.$emit("send");
        } else if (event.keyCode === 13) {
          let insertHtml = "<br/>";
          if (this.$refs.editMsg.innerHTML.indexOf("<br><br>") > -1) {
            insertHtml = "<br/>";
          }
          if (!Util.isSafari()) {
            Util.insert(this.$refs.editMsg, insertHtml, false);
          }
        }
      }
    },
    closeemoji() {
      this.$store.commit("SET_LAYOUT", ["", "", false]);
    },
    showemoji() {
      this.$store.commit("SET_LAYOUT", ["s", "emoji", false]);
    },
    insertEmoji(value) {
      this.focus(false);
      Util.insert(this.$refs.editMsg, value, false);
    },
    pushEvaluate(mode = 0) {
      //mock message
      // 1、获取评价类型
      // 2、是否已进行回复 - evaluatedFirst
      let replyIndex = this.chatlist.findIndex((item) => item.type == msgEnum.text);
      console.log(replyIndex);
      if (replyIndex < 1) {
        this.$store.commit("SET_LAYOUT", ["evaluatedFirst", "", false]);
        return;
      }

      if (this.evaluateConf.activeStatus && mode == evaluateCSEnum.invitationType.visitorPush) {
        return;
      }

      if (this.evaluateConf.endStatus && mode == evaluateCSEnum.invitationType.systemSessionOverPush) {
        return;
      }

      if (this.evaluateConf.status && mode == evaluateCSEnum.invitationType.visitorClose) {
        return;
      }

      // 3、getIsEvaluate
      this.$store
        .dispatch("getIsEvaluate", {
          visitorId: this.userId,
          companyId: this.companyId,
          customerServiceId: this.customerServiceId,
          userId: this.userId,
        })
        .then((res) => {
          if (res && res.code == 0) {
            if (res.data == 0) {
              actionApi
                .getEvaluateConf({
                  userId: this.userId,
                  companyId: this.companyId,
                })
                .then((data) => {
                  this.$store.commit("SET_EVALUATE_CONF", data.data);
                });
              this.$store.commit("SET_LAYOUT", ["evaluatePop", "", false]);
            } else {
              // 判断是否重复评价
              this.$store.commit("SET_LAYOUT", ["evaluated", "", false]);
            }
          } else {
            //
          }
        });
    },
    //关闭当前页面
    Leave() {
      window.location.href = "about:blank";
      window.close();
    },
    LeaveBeforeEvaluate() {
      this.pushEvaluate(evaluateCSEnum.invitationType.visitorClose);
    },
    refresh() {
      window.location.reload();
    },
  },
  mounted() {
    // console.log(this.$el)
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/var";

.session-input {
  width: 100%;
  height: 135px;
  background: #fff;

  .tip-title {
    padding-top: 30px;
    text-align: center;
    font-size: 20px;
  }

  .checkBtn {
    display: flex;
    margin-top: 30px;
    justify-content: center;

    p {
      border-radius: 5px;
      padding: 10px 12px;
      background: $color-theme;
      color: #fff;
      cursor: pointer;
    }
  }

  .instrument {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;

    img {
      display: block;
      cursor: pointer;
    }
    .cancelUpload {
      .cancelUploadBtn {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.4) url(../../assets/img/cancel-upload.png) center center no-repeat;
      }
    }
    .icon-image {
      display: inline-block;
      width: 25px;
      height: 25px;
      cursor: pointer;
      background: url(../../assets/img/chat/file.png) center top no-repeat;
      // &:hover {
      //   background:url(../../assets/images/chat/up2.png);
      // }
      .lable {
        display: block;
        width: 34px;
        height: 34px;
      }
    }
    .icon-evaluate {
      display: inline-block;
      width: 25px;
      height: 25px;
      cursor: pointer;
      background: url(../../assets/img/chat/evaluate.png) center top no-repeat;
    }
    .emoji {
      width: 440px;
      height: 271px;
      background: rgba(255, 255, 255, 0.99);
      box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.24);
      border-radius: 10px;
      position: absolute;
      bottom: 50px;
      left: 10px;
    }
  }

  .content {
    align-items: center;
    position: relative;

    .input-send {
      display: block;

      .input-placeholder {
        position: absolute;
        left: 20px;
        color: #888;
        font-size: 14px;
        padding-left: 10px;
        pointer-events: none;
        border-left: 1px solid #999;
      }

      .input-msg {
        width: 85%;
        height: 70px;
        position: absolute;
        left: 20px;
        font-size: 16px;
        font-family: "Microsoft Yahei", Tahoma, Helvetica, Arial, sans-serif !important;
        outline: 0px solid #fff;
        white-space: normal;
        word-break: break-all;
        overflow-y: scroll;
        scrollbar-color: transparent transparent;
        scrollbar-track-color: transparent;
        -ms-scrollbar-track-color: transparent;
      }

      .input-msg::-webkit-scrollbar {
        width: 6px;
        height: 5px;
      }

      .input-msg::-webkit-scrollbar-thumb {
        background: #bfbfbf;
        border-radius: 10px;
      }

      .input-msg::-webkit-scrollbar-thumb:hover {
        background: #333;
      }
    }

    .send {
      position: absolute;
      right: 5%;
      cursor: pointer;
    }
  }
}
</style>
