<template>
  <div class="historyinfo" @click.stop>
    <header v-show="!tableInHistory">
      <span class="head-text">评价详情</span>
      <div>
        <span class="close" @click="close"></span>
      </div>
    </header>
    <header v-show="tableInHistory">
      <span class="head-text">#{{ chatId| name }}</span>
      <div>
        <span class="close" @click="close"></span>
      </div>
    </header>
    <div class="gradeTable" v-show="!tableInHistory">
      <el-table :data="gradeTableData.dataList">
        <el-table-column
          v-for="(item, index) in gradeTableData.columns"
          :key="index"
          :prop="`${gradeTableData.columns[index].id}`"
          :label="item.lableContent"
          width="140"
        >
          <template slot-scope="scope">
            <el-button
              v-if="item.id == 'visitorId'"
              @click.native.prevent="getHistory(scope.$index)"
              type="text"
              size="small"
            >{{ scope.row[item.id] }}</el-button>
            <div v-else>{{ scope.row[item.id] }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="msgListContent">
      <div class="msgList" v-scrollBar @ps-y-reach-end="more" id="msgList">
        <ul>
          <li v-for="(item, idx) in msgList" :key="idx">
            <div
              class="text"
              v-if="(item.type == msgEnum.text || item.type == msgEnum.textHyperLink)"
            >
              <div
                class="name"
                v-if="currentSession.chatId == item.fromId"
              >#{{ currentSession.chatId | name }} {{ item.createTime | timeFilter3 }}</div>
              <div class="name" v-else>{{ item.fromName }} {{ item.createTime | timeFilter3 }}</div>
              <div class="msg" @click="openUrl($event)" v-html="item.msg"></div>
            </div>
            <div class="text" v-if="item.type == msgEnum.evaluateCustomerService">
              <div
                class="name"
                v-if="currentSession.chatId == item.fromId"
              >#{{ currentSession.chatId | name }} {{ item.createTime | timeFilter3 }}</div>
              <div class="name" v-else>{{ item.fromName }} {{ item.createTime | timeFilter3 }}</div>
              <div class="msg" v-html="item.item"></div>
            </div>
            <div class="text" v-if="item.type == msgEnum.img && (classType == 'img')">
              <div
                class="name"
                v-if="currentSession.chatId == item.fromId"
              >#({{ currentSession.chatId | name }}) {{ item.createTime | timeFilter3 }}</div>
              <div class="name" v-else>{{ item.fromName }} {{ item.createTime | timeFilter3 }}</div>
              <div class="msg">
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
                  :data-idx="idx"
                  :data-id="item.msgId"
                  v-viewer:list="msgList"
                />
              </div>
            </div>
            <div class="text" v-if="item.type == msgEnum.video && (classType == 'video')">
              <div
                class="name"
                v-if="currentSession.chatId == item.fromId"
              >#({{ currentSession.chatId | name }}) {{ item.createTime | timeFilter3 }}</div>
              <div class="name" v-else>{{ item.fromName }} {{ item.createTime | timeFilter3 }}</div>
              <div class="msg">
                <div
                  class="msg-detail msg-video"
                  style="float: none"
                  :data-index="`{%type%:%message%,%id%:${item.msgId},%msgType%:${item.type}}`"
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
                >
                  <img
                    class="img"
                    ondragstart="return false"
                    :data-thumb="item.item.imgUrl"
                    :src="item.item.progress > 0 ? global.fileDownUrl.replace('/cs/', '/') + 'compress/' + item.item.fileUrl + '.png' : item.item.imgUrl"
                    :data-idx="idx"
                    :data-id="item.msgId"
                    v-viewer:list="msgList"
                  />
                </div>
              </div>
            </div>
            <div class="text" v-if="item.type == msgEnum.files && (classType == 'files')">
              <div
                class="name"
                v-if="currentSession.chatId == item.fromId"
              >#({{ currentSession.chatId | name }}) {{ item.createTime | timeFilter3 }}</div>
              <div class="name" v-else>{{ item.fromName }} {{ item.createTime | timeFilter3 }}</div>
              <div class="msg">
                <div class="item-box msg-file display-flex" style="float: none">
                  <a
                    class="download"
                    :href="global.fileDownUrl + item.item.fileUrl + '#' + item.item.dl64"
                    target="_blank"
                    :alt="item.item.fileId"
                  >
                    <div class="file-icon" :class="item.item.fileUrl | fileFitler"></div>
                  </a>
                  <div class="file-info display-flex-item">
                    <p class="title">{{ item.item.fileName || item.item.fileId | fileName(15) }}</p>
                    <div class="file-info-item display-flex-item">
                      <div class="size">
                        <span v-if="item.item.progress == 100">{{ item.item.size | fileSize }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text" v-if="item.type == msgEnum.textHyperLink && (classType == 'link')">
              <div
                class="name"
                v-if="currentSession.chatId == item.fromId"
              >#({{ currentSession.chatId | name }}) {{ item.createTime | timeFilter3 }}</div>
              <div class="name" v-else>{{ item.fromName }} {{ item.createTime | timeFilter3 }}</div>
              <div class="msg" v-to-url @click="openUrl($event)" v-html="item.msg"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="info-no-data" v-if="infoNoData <= 0 && tableInHistory">
      <div>
        <img src="../../../assets/images/no-data.png" />
        <p>{{ $t("msg.search.noData") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { msgEnum, sessionEnum } from "@/common/enum";
import filter from "@/common/filters";
import { Config } from "@/common/config";
import { timeUtil } from "@/tools/timeUtil";
import { exportHtml, repalceToRed } from "@/tools/utils";
import { msgFormatTemplate } from "@/tools/msgFormatTemplate";

export default {
  name: "gradeListDetailPopup",
  data() {
    return {
      msgEnum,
      tableInHistory: false,
      msgList: [],
      chatId: "",
      currentPage: 1,
      pageSize: 40,
    };
  },
  props: {
    gradeTableData: Object,
  },
  computed: {
    ...mapGetters(["currentSession", "userInfo", "layout"]),
    infoNoData() {
      return this.msgList.length;
    },
  },
  methods: {
    close() {
      this.$store.dispatch("setLayout", ["", "", false]);
    },
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
    },
    more() {
      // this.searchKeyWord("morePage");
    },
    getHistory(index) {
      this.channelId = this.gradeTableData.dataList[index].channelId;
      this.chatId = this.gradeTableData.dataList[index].visitorId;
      this.searchKeyWord();
    },
    searchKeyWord(mode = "", modeType = "") {
      let that = this;
      // payload
      let obj = {
        channelId: this.channelId,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      if (mode == "morePage") {
        if (this.stopScroll) return;
        this.currentPage = this.currentPage + 1;
      }
      // 组织数据
      this.msgList = [];

      this.$api.getSessionRecord(obj).then((res) => {
        if (mode == "morePage") {
          if (this.currentPage > res.data.pages) {
            this.stopScroll = true;
            return;
          }
          if (this.currentPage == res.data.pages) this.stopScroll = true;
        }
        this.tableInHistory = true;
        res.data.list.forEach((element) => {
          const { msgType, fromName, fromId, toId, createTime, msgId } = element;
          let { msg } = element;
          msgFormatTemplate
            .formatMsgNew({
              isSender: true,
              bodyFrom: fromId,
              timeStamp: createTime,
              id: msgId,
              type: msgType,
              body: msg,
              chatType: sessionEnum.visitor,
              userId: toId,
            })
            .then((data) => {
              const addmsgList = () => {
                that.msgList.unshift({
                  type: data.type,
                  fromName,
                  fromId,
                  createTime,
                  msg,
                  msgId,
                  item: data.viewShow,
                });
              };
              // 文字和链接标红
              addmsgList();
            });
        });
        if (res.data.pages > this.currentPage) {
          this.stopScroll = false;
        } else {
          this.stopScroll = true;
        }
      });
    },
  },
  created() {
    // this.searchKeyWord("init", "");
  },
  mounted() {
    // window.searchKeyWord = this.searchKeyWord;
  },
};
</script>

<style lang="scss" scoped>
.historyinfo {
  z-index: 1040; // 受限于，lg-gallery 不能高于1040, 如需修改，请一并修改lg-gllery z-index
  position: absolute;
  box-shadow: 0px 0px 10px #999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 666px;
  background: #ffffff;
  border-radius: 10px;
  header {
    height: 40px;
    padding-top: 14px;
    display: flex;
    justify-content: space-between;
    .head-text {
      padding: 0 0 0 20px;
    }
    .close {
      display: inline-block;
      width: 19px;
      height: 17px;
      background: url(../../../assets/images/chat/close.png);
      margin-right: 14px;
      cursor: pointer;
    }
    .derive {
      display: inline-block;
      width: 19px;
      height: 17px;
      background: url(../../../assets/images/chat/derive.png);
      margin-right: 14px;
      cursor: pointer;
    }
    .search {
      display: inline-block;
      width: 19px;
      height: 17px;
      margin-right: 17px;
      cursor: pointer;
      background: url(../../../assets/images/chat/search.png);
    }
  }
  .classify {
    height: 38px;
    display: flex;
    border-bottom: 1px solid $border-color;
    justify-content: space-around;
    span {
      cursor: pointer;
      line-height: 38px;
      &.active {
        color: $color-theme;
      }
    }
  }
  .date-classify-bar {
    .search-title {
      padding: 23px 0;
      text-align: center;
      border-bottom: 1px solid $border-color;
    }
  }

  .date-classify-back {
    text-align: center;
    padding: 0 8px;
    display: flex;
    border-bottom: 1px solid $border-color;
    /deep/.el-button--text {
      color: $color-theme;
    }
    Button {
      margin-right: 24px;
    }
  }

  .date-classify {
    height: 38px;
    display: flex;
    border-bottom: 1px solid $border-color;
    padding: 5px 7px;
    background-color: $backgroup-color;
    span {
      cursor: pointer;
      line-height: 29px;
      padding: 0 8px;
      border-radius: 4px;
      &.active {
        background-color: $color-theme;
        color: $color-white;
      }
    }
    .keywordInput {
      &.inCustom {
        width: 160px;
      }
    }
    /deep/.el-input__inner {
      height: 29px;
    }
    /deep/.el-range-editor {
      width: 240px;
    }
    /deep/.el-input__icon {
      line-height: 26px;
    }
    /deep/.el-date-editor .el-range-separator {
      line-height: 24px;
    }
    /deep/.el-icon-time.el-icon-time:before {
      content: "";
      background: url("../../../assets/images/chat/datepicker.png");
      width: 23px;
      height: 21px;
      top: 0;
      left: 0;
      display: inline-block;
    }
    /deep/.el-date-editor .el-range__icon {
      line-height: 25px;
    }
    /deep/.el-date-editor .el-range__close-icon {
      line-height: 25px;
    }
  }
  .msgListContent {
    height: 519px;
    position: relative;
    overflow: hidden;
    &.hasSearchResult {
      .haskeyword {
        display: block;
        .view-co-text {
          display: block;
        }
      }
    }
  }
  .msgList {
    height: 519px;
    position: relative;
    ul {
      li {
        border-top: 1px solid $border-color;
        padding: 18px;
        position: relative;
        &.haskeyword {
          display: none;
        }
        &:first-child {
          border-top: none;
        }
      }
    }
    .name {
      color: $color-theme;
    }
    .msg {
      padding: 14px 0 11px 0;
      max-width: 600px;
      word-wrap: break-word;
    }
    .text {
      width: 80%;
    }
    .msg-detail.msg-video {
      text-align: left;
    }
    .msg-file {
      .file-icon {
        margin-left: 14px;
      }
    }
    .view-co-text {
      display: none;
      position: absolute;
      width: 20%;
      right: 0;
      color: $color-theme;
      top: 45%;
      cursor: pointer;
    }
  }
  .info-no-data {
    height: 484px;
    width: 700px;
    position: absolute;
    top: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    p {
      padding-top: 12px;
    }
  }
}
</style>