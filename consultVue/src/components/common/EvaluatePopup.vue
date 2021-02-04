<template>
  <transition name="scale-x">
    <div class="e-popup" @click.stop>
      <div class="e-popup-box" :style="{ 'border-radius': radius + 'px' }" @click.stop>
        <div
          class="seal-evaluate-header"
          slot="header"
        >{{ evaluateConf.invitedCopywriter || $t("msg.evaluate.evaluateInvite") }}</div>
        <div class="seal-evaluate" slot="body">
          <div
            class="display-flex"
            style="
              width: 464px;
          justify-content: space-around;
          "
          >
            <div class="gradeBtn" @click="evaluateLableChoosen('goodLables')">
              <img
                v-show="evaluateData.grade != evaluateCSEnum.grade.good"
                src="../../assets/img/evaluate/good.png"
              />
              <img
                v-show="evaluateData.grade == evaluateCSEnum.grade.good"
                src="../../assets/img/evaluate/good_selected.png"
              />
              {{ $t("msg.evaluate.evaluteGrade3") }}
            </div>
            <div class="gradeBtn" @click="evaluateLableChoosen('moderateLables')">
              <img
                v-show="evaluateData.grade != evaluateCSEnum.grade.medium"
                src="../../assets/img/evaluate/medium.png"
              />
              <img
                v-show="evaluateData.grade == evaluateCSEnum.grade.medium"
                src="../../assets/img/evaluate/medium_selected.png"
              />
              {{ $t("msg.evaluate.evaluteGrade2") }}
            </div>
            <div class="gradeBtn" @click="evaluateLableChoosen('poorLables')">
              <img
                v-show="evaluateData.grade != evaluateCSEnum.grade.normal"
                src="../../assets/img/evaluate/normal.png"
              />
              <img
                v-show="evaluateData.grade == evaluateCSEnum.grade.normal"
                src="../../assets/img/evaluate/normal_selected.png"
              />
              {{ $t("msg.evaluate.evaluteGrade1") }}
            </div>
          </div>
          <div
            class="evaluate-label-list display-flex"
            v-show="evaluateData.grade == evaluateLabel.type"
            v-for="evaluateLabel in evaluateConf.evaluationSatisfals"
            :key="evaluateLabel.id"
          >
            <span
              class="evaluate-label"
              v-for="evaluateLabelItem in evaluateLabel[evaluateData.gradeLabel]"
              :key="evaluateLabelItem.id"
              :class="{
                selected: evaluateLabelItem.selected
              }"
              @click="addEvaluateLabelList(evaluateLabelItem)"
            >{{evaluateLabelItem.selected}}{{ evaluateLabelItem.lableContent }}</span>
          </div>
          <div class="input-send">
            <div class="input-placeholder" v-if="editFocus">{{ evaluateConf.invitedCopywriter }}</div>
            <pre
              class="input-msg"
              contenteditable="true"
              ref="editEvaluateMsg"
              @focus="editFocus = false"
              @blur="saveDraft()"
              @paste="pasteMessage($event)"
              @keyup="msgChange($event)"
              @keydown="preKeydown($event)"
            ></pre>
          </div>
          <div class="btn" @click="submitEvaluate">{{ $t("msg.evaluate.evaluateSubmit") }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { actionApi } from "@/api";
import { msgUtil } from "@/tools/msgUtil";
import { msgEnum, sessionEnum, evaluateCSEnum } from "@/common/enum";
import { Util } from "@/tools/utils";

export default {
  name: "EvaluatePopup",
  data() {
    return {
      evaluateData: {
        grade: evaluateCSEnum.grade.good,
        gradeLabel: "goodLables",
        lableIds: [],
      },
      evaluateCSEnum,
      editFocus: false,
    };
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    isLeave: {
      type: Boolean,
      default: false,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    hideClose: {
      type: Boolean,
      default: false,
    },
    titleAlign: {
      type: String,
      default: "left",
    },
    radiu: {
      type: String,
      default: "0",
    },
    radius: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    ...mapGetters(["evaluateConf", "customerServiceId", "userId", "companyId"]),
  },
  methods: {
    close() {
      this.$store.dispatch("setLayout", ["", "", false]);
    },
    submitEvaluate() {
      if (this.evaluateData.lableIds.length < 1) {
        this.$store.dispatch("setLayout", ["", "", false]);
        return;
      }

      let htmlValue = this.$refs.editEvaluateMsg.innerHTML;
      // let txtValue = face.htmlToString(htmlValue) //表情解析
      let txtValue = msgUtil.htmlToTxt(htmlValue); //移除无用html标签
      let regExp = new RegExp("(&nbsp*)|(<br>*)|( )", "g");

      if (txtValue.replace(regExp, "").length == 0) {
        this.$message.warning(this.$t("msg.sessionlist.notEmpty"));
        return;
      }
      let payload = {
        channelId: localStorage.getItem("channel"),
        companyId: this.companyId,
        content: txtValue,
        customerServiceId: this.customerServiceId,
        invitationType: this.evaluateCSEnum.invitationType.csPush,
        lableIds: this.evaluateData.lableIds,
        type: this.evaluateData.grade,
        visitorId: this.userId,
      };
      actionApi.setSaveEvaluate(payload).then((res) => {
        if (res.code == 0) {
          this.$parent.send({
            type: msgEnum.evaluateCustomerService,
            invitationType: evaluateCSEnum.invitationType.csPush,
            isEvaluate: evaluateCSEnum.evaluateStatus.evaluated,
            gradeType: this.evaluateData.grade,
            evaluateOverText: this.evaluateConf.thankCopy || this.$t("msg.evaluate.evaluateOverThankCopy"),
          });
          // 回写本地ID。不再评价
          this.$store.dispatch("setLayout", ["", "", false]);

          setTimeout(() => {
            if (this.isLeave) {
              this.$parent.Leave();
            }
          }, 300);
        }
      });
    },
    addEvaluateLabelList(gradeLabelItem) {
      this.evaluateConf.evaluationSatisfals.map((item) => {
        if (item.type == evaluateCSEnum.grade.good) {
          let goodLablesIndex = item.goodLables.findIndex((childItem) => childItem.id == gradeLabelItem.id);
          if (item.goodLables[goodLablesIndex].selected) {
            item.goodLables[goodLablesIndex].selected = false;
          } else {
            item.goodLables[goodLablesIndex].selected = true;
          }
        }
      });
      this.$store.commit("SET_EVALUATE_CONF", this.evaluateConf);
      this.evaluateData.lableIds.push(gradeLabelItem.id);
    },
    evaluateLableChoosen(gradeLabel) {
      this.evaluateData.gradeLabel = gradeLabel;
      this.evaluateData.lableIds = [];
      switch (gradeLabel) {
        case "goodLables":
          this.evaluateData.grade = evaluateCSEnum.grade.good;
          break;
        case "moderateLables":
          this.evaluateData.grade = evaluateCSEnum.grade.medium;
          break;
        case "poorLables":
          this.evaluateData.grade = evaluateCSEnum.grade.normal;
          break;
        default:
          break;
      }
    },
    focus(value) {
      this.editFocus = value;
    },
    saveDraft() {
      //失去焦点 保存草稿
      let draft = this.$refs.editEvaluateMsg.innerHTML;
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
      Util.insert(this.$refs.editEvaluateMsg, pastedData, false);
    },
    msgChange(event) {
      // do something
    },
    preKeydown(event) {
      if (localStorage.getItem("enterType") == 1 || !localStorage.getItem("enterType")) {
        if (event.keyCode === 13 && event.ctrlKey) {
          let insertHtml = "<br/><br/>";
          if (this.$refs.editEvaluateMsg.innerHTML.indexOf("<br><br>") > -1) {
            insertHtml = "<br/>";
          }
          // safari自身可以换行，不用处理
          if (!Util.isSafari()) {
            Util.insert(this.$refs.editEvaluateMsg, insertHtml, false);
          }
        } else if (event.keyCode === 13) {
          event.preventDefault();
          this.submitEvaluate();
        }
      } else {
        if (event.keyCode == 13 && event.ctrlKey) {
          event.preventDefault();
          this.submitEvaluate();
        } else if (event.keyCode === 13) {
          let insertHtml = "<br/>";
          if (this.$refs.editEvaluateMsg.innerHTML.indexOf("<br><br>") > -1) {
            insertHtml = "<br/>";
          }
          if (!Util.isSafari()) {
            Util.insert(this.$refs.editEvaluateMsg, insertHtml, false);
          }
        }
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "../../assets/css/var";

.e-popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 299;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  &-box {
    position: absolute;
    top: 50%;
    left: 50%;
    background: #fff;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    box-shadow: 0 0 8px #999;
  }
  .popup-header {
    position: relative;
    height: 40px;
    padding: 0 15px;
    line-height: 40px;

    .title {
      font-size: 16px;
    }
    .close {
      width: 12px;
      height: 12px;
      display: block;
      position: absolute;
      top: 15px;
      right: 15px;
      background: url(../../assets/img/icon-window-close.png) center center no-repeat;
      cursor: pointer;
      &:hover {
        background: url(../../assets/img/icon-window-close-red.png) center center no-repeat;
      }
    }
  }
  .search-box {
    width: 327px;
    height: 64px;
    border: 0;
    padding: 15px 10px;
    .search-input {
      width: 100%;
      height: 34px;
      margin-left: 0;
      border: 1px solid #b5b5b5;
      input {
        height: 34px;
        line-height: 32px;
      }
    }
  }
  .search-btn {
    display: inline-block;
    width: 78px;
    height: 34px;
    line-height: 34px;
    border-radius: 3px;
    background: $color-theme;
    color: #fff;
  }
}
.seal-evaluate {
  width: 516px;
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 50px;
    text-align: center;
    padding: 0 32px;
  }

  .gradeBtn {
    width: 78px;
    text-align: center;
    border-radius: 5px;
    margin-top: 42px;
    cursor: pointer;
    img {
      margin-bottom: 8px;
    }
  }
  .evaluate-label-list {
    width: 464px;
    flex-shrink: 1;
    flex-flow: row wrap;
    margin-top: 44px;
  }
  .evaluate-label {
    font-size: 14px;
    line-height: 48px;
    cursor: pointer;
    padding: 0 24px;
    text-align: center;
    border: 1px solid $border-color-2;
    border-radius: 24px;
    display: inline-block;
    margin: 0 12px 19px 0;
    &.selected {
      border: 1px solid $color-theme;
    }
  }
  .btn {
    width: 100%;
    height: 34px;
    background: #7f99e3;
    color: #fff;
    text-align: center;
    line-height: 34px;
    border-radius: 5px;
    margin-top: 45px;
    cursor: pointer;
  }
  .input-send {
    display: block;
    position: relative;
    width: 100%;
    height: 125px;
    border-radius: 10px;
    border: 1px solid $border-color-2;
    .input-placeholder {
      position: absolute;
      left: 12px;
      top: 12px;
      height: 120px;
      overflow: hidden;
      color: #888;
      font-size: 14px;
      padding-left: 10px;
      pointer-events: none;
      border-left: 1px solid #999;
      word-break: break-all;
    }

    .input-msg {
      width: 90%;
      height: 120px;
      position: absolute;
      left: 12px;
      top: 12px;
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
}

.seal-evaluate-header {
  height: 77px;
  width: 516px;
  background-color: $color-theme;
  color: #fff;
  text-align: left;
  padding: 0 22px;
  font-size: 20px;
  border-radius: 10px 10px 0 0;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  align-items: center;
}
</style>
