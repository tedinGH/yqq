<template>
  <div class="historyinfo" @click.stop="">
    <header>
      <span class="head-text"> #{{ currentSession.chatId | name }}</span>
      <div>
        <span class="search" title="搜索" @click="search"></span>
        <span class="derive" title="导出" @click="derive"></span>
        <span class="close" @click="close"></span>
      </div>
    </header>
    <div v-show="!inSearchMode.status" class="classify">
      <span v-for="(i, index) in classify" :key="index" :class="{ active: classType == i.type }" @click="classType = i.type">{{ i.text }}</span>
    </div>
    <div v-if="inSearchMode.inCoText" class="date-classify-back">
      <el-button type="text" @click="backToInCoText"><img src="../../../assets/images/chat/arrow-left.png" />{{ $t("msg.search.backResult") }}</el-button>
      <el-button type="text" @click="closeSearchResult">{{ $t("msg.search.closeResult") }}</el-button>
    </div>
    <div v-show="inSearchMode.status" class="date-classify-bar">
      <div class="date-classify">
        <span
          v-for="(i, index) in dateClassify"
          :key="index"
          :class="{ active: dateClassifyType == i.type }"
          @click="searchKeyWord(i.type, 'button');"
        >
          {{ i.name }}
        </span>
        <span v-if="dateClassifyType == 'custom'">
          <el-date-picker
            class="time"
            v-model="time"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="to"
            value-format="timestamp"
            format="yyyy-MM-dd"
            start-placeholder="Start date"
            end-placeholder="Ending date"
            popper-class="history-info-date-picker"
            align="right"
          >
          </el-date-picker>
        </span>
        <span
          class="keywordInput"
          :class="{
            inCustom: dateClassifyType == 'custom'
          }"
        >
          <el-input placeholder="Please enter key words" v-model="searchMsgContent" clearable @clear="clearSearchKeyword" @change="onChangeMsgContent" @blur="onBlurMsgContent">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="searchKeyWord"></i>
          </el-input>
        </span>
      </div>
      <div v-if="inSearchMode.status && !infoNoData && !inSearchMode.inCoText" class="search-title">
        <p>{{ $t("msg.search.resultTitle") }}</p>
      </div>
    </div>
    <div class="msgListContent" :class="{ hasSearchResult: inSearchMode.status || this.inSearchMode.inCoText }">
      <div class="msgList" v-scrollBar  @ps-y-reach-end="more" id="msgList">
        <ul>
          <li v-for="(item, idx) in msgList" :key="idx" :class="{haskeyword: inSearchMode.hasKeyWord ? (item.type == msgEnumTypes.text || item.type == msgEnumTypes.textHyperLink) : false }">
              <div class="view-co-text" @click="viewCoText(item)">
                {{ $t("msg.search.inCoText")}}
              </div>
              <div class="text" v-if="(item.type == msgEnumTypes.text || item.type == msgEnumTypes.textHyperLink) && classType == 'all'">
                <div class="name" v-if="currentSession.chatId == item.fromId">#{{ currentSession.chatId | name }} {{ item.createTime | timeFilter3 }}</div>
                <div class="name" v-else>{{ item.fromName }} {{ item.createTime | timeFilter3 }}</div>
                <div class="msg" @click="openUrl($event)" v-html="item.msg"></div>
              </div>
              <div class="text" v-if="item.type == msgEnumTypes.img && (classType == 'img' || classType == 'all')">
                <div class="name" v-if="currentSession.chatId == item.fromId">
                  #({{ currentSession.chatId | name }}) {{ item.createTime | timeFilter3 }}
                </div>
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
              <div class="text" v-if="item.type == msgEnumTypes.video && (classType == 'video' || classType == 'all')">
                <div class="name" v-if="currentSession.chatId == item.fromId">
                  #({{ currentSession.chatId | name }}) {{ item.createTime | timeFilter3 }}
                </div>
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
              <div class="text" v-if="item.type == msgEnumTypes.files && (classType == 'files' || classType == 'all')">
                <div class="name" v-if="currentSession.chatId == item.fromId">
                  #({{ currentSession.chatId | name }}) {{ item.createTime | timeFilter3 }}
                </div>
                <div class="name" v-else>{{ item.fromName }} {{ item.createTime | timeFilter3 }}</div>
                <div class="msg">
                  <div class="item-box msg-file display-flex" style="float: none">
                    <a class="download" :href="global.fileDownUrl + item.item.fileUrl + '#' + item.item.dl64" target="_blank" :alt="item.item.fileId">
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
              <div class="text" v-if="item.type == msgEnumTypes.textHyperLink && (classType == 'link' || classType == 'all')">
                <div class="name" v-if="currentSession.chatId == item.fromId">
                  #({{ currentSession.chatId | name }}) {{ item.createTime | timeFilter3 }}
                </div>
                <div class="name" v-else>{{ item.fromName }} {{ item.createTime | timeFilter3 }}</div>
                <div class="msg" v-to-url @click="openUrl($event)" v-html="item.msg"></div>
              </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="info-no-data" v-if="infoNoData">
      <div>
        <img src="../../../assets/images/no-data.png" />
        <p v-if="!inSearchMode.status">{{ $t("msg.search.noData") }}</p>
        <p v-else>{{ $t("msg.search.noData") }}</p>
      </div>
    </div>
    <Popup :hideClose="false" :closeBtnFun="'confirmTips'" @confirmTips="confirmTips" v-if="inSearchMode.exportLimitPopup" :radius="10">
      <div class="seal" slot="body">
        <div class="content">{{ $t("msg.search.exportLimit") }}</div>
        <div class="btn" @click="confirmTips">{{ $t("msg.common.confirm") }}</div>
      </div>
    </Popup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { msgEnumTypes, sessionEnumTypes } from "@/common/enum";
import filter from "@/common/filters";
import { Config } from "@/common/config";
import { timeUtil } from "@/tools/timeUtil";
import { exportHtml, repalceToRed } from "@/tools/utils";
import { msgFormatTemplate } from "@/tools/msgFormatTemplate";

export default {
  name: "historyinfo",
  data() {
    return {
      msgEnumTypes,
      currentPage: 1,
      pageSize: 40,
      inSearchMode: {
        status: false,
        hasKeyWord: false,
        exporting: false,
        exportLimitPopup: false,
        exportingCount: 1,
        exportingLimit: 1, // 限制连续3次导出
        inCoText: false // 上下文
      },
      searchMsgContent: null,
      searchMsgContentTmp: null,
      msgList: [],
      exChangePool: {
        searchMsgContent: null,
        msgList: []
      }, // 临时交换结果列表
      stopScroll: false,
      classify: [
        {
          type: "all",
          text: "All"
        },
        {
          type: "img",
          text: "Image"
        },
        {
          type: "video",
          text: "Video"
        },
        {
          type: "files",
          text: "File"
        },
        {
          type: "link",
          text: "Link"
        }
      ],
      classType: "all",
      dateClassify: [
        {
          name: "Today",
          type: "today"
        },
        {
          name: "Yesterday",
          type: "yesterday"
        },
        {
          name: "Selection time",
          type: "custom"
        }
      ],
      dateClassifyType: "today",
      pickerOptions: {
        shortcuts: [
          {
            text: "Today",
            onClick(picker) {
              let { startTime, endTime } = timeUtil.getDateRangeTimestamp("today");
              picker.$emit("pick", [startTime, endTime]);
            }
          },
          {
            text: "Yesterday",
            onClick(picker) {
              let { startTime, endTime } = timeUtil.getDateRangeTimestamp("yesterday");
              picker.$emit("pick", [startTime, endTime]);
            }
          },
          {
            text: "Last 7 day",
            onClick(picker) {
              let { startTime, endTime } = timeUtil.getDateRangeTimestamp("last7day");
              picker.$emit("pick", [startTime, endTime]);
            }
          },
          // 本月
          {
            text: "This month",
            onClick(picker) {
              let { startTime, endTime } = timeUtil.getDateRangeTimestamp("thisMonth");
              picker.$emit("pick", [startTime, endTime]);
            }
          },
          // 上个月
          {
            text: "Last month",
            onClick(picker) {
              let { startTime, endTime } = timeUtil.getDateRangeTimestamp("lastMonth");
              picker.$emit("pick", [startTime, endTime]);
            }
          },
          // 最近一个月
          {
            text: "Last 30 day",
            onClick(picker) {
              let { startTime, endTime } = timeUtil.getDateRangeTimestamp("last30day");
              picker.$emit("pick", [startTime, endTime]);
            }
          }
        ]
      },
      time: []
    };
  },
  computed: {
    ...mapGetters(["currentSession", "userInfo", "layout"]),
    infoNoData() {
      let msgListIndex = -1;
      switch (this.classType) {
        case "all":
          msgListIndex = this.msgList.findIndex(
            item =>
              item.type == msgEnumTypes.video ||
              item.type == msgEnumTypes.img ||
              item.type == msgEnumTypes.files ||
              item.type == msgEnumTypes.textHyperLink ||
              item.type == msgEnumTypes.text
          );
          // console.log(msgListIndex);
          if (msgListIndex < 0) {
            return true;
          }
          break;
        case "img":
          msgListIndex = this.msgList.findIndex(item => item.type == msgEnumTypes.img);
          if (msgListIndex < 0) {
            return true;
          }
          break;
        case "video":
          msgListIndex = this.msgList.findIndex(item => item.type == msgEnumTypes.video);
          if (msgListIndex < 0) {
            return true;
          }
          break;
        case "files":
          msgListIndex = this.msgList.findIndex(item => item.type == msgEnumTypes.files);
          if (msgListIndex < 0) {
            return true;
          }
          break;
        case "link":
          msgListIndex = this.msgList.findIndex(item => item.type == msgEnumTypes.textHyperLink);
          if (msgListIndex < 0) {
            return true;
          }
          break;
        default:
          break;
      }
      return false;
    }
  },
  watch: {},
  methods: {
    confirmTips() {
      this.inSearchMode.exportLimitPopup = false;
    },
    close() {
      this.$store.dispatch("setLayout", ["", "", false]);
    },
    search() {
      if(this.inSearchMode.status || this.inSearchMode.inCoText) return;
      this.inSearchMode.status = true;
    },
    derive() {
      if (this.inSearchMode.exporting && this.inSearchMode.exportingCount == 0) {
        // 导出提示。
        this.inSearchMode.exportLimitPopup = true;
        return;
      }
      this.inSearchMode.exporting = true;
      this.inSearchMode.exportingCount -= 1;
      let that = this;
      let obj = {
        channelId: this.currentSession.visitorUuid
      };
      if (this.dateClassifyType == "today") {
        obj.startTime = timeUtil.getDateRangeTimestamp("today").startTime;
        this.time[0] = obj.startTime;
      } else if (this.dateClassifyType == "yesterday") {
        obj.startTime = timeUtil.getDateRangeTimestamp("yesterday").startTime;
        this.time[0] = obj.startTime;
      } else if (this.dateClassifyType == "custom") {
        obj.startTime = this.time[0];
        obj.endTime = this.time[1];
      }

      let exportList = [];

      this.$api.exportSessionRecord(obj).then(res => {
        res.data.forEach(element => {
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
              chatType: sessionEnumTypes.visitor,
              userId: toId
            })
            .then(data => {
              exportList.push({
                type: data.type,
                fromName,
                fromId,
                createTime,
                msg,
                msgId,
                item: data.viewShow
              });
            });
        });
        setTimeout(() => {
          exportList.map(item => {
            item.name =
              that.currentSession.chatId == item.fromId
                ? `#${filter.name(that.currentSession.chatId)} ${filter.timeFilter3(item.createTime)}`
                : `${item.fromName} ${filter.timeFilter3(item.createTime)}`;
          });

          try {
            this.exportDataToHtml(exportList);
            this.inSearchMode.exporting = false;
            this.inSearchMode.exportingCount += 1;
          } catch (error) {
            this.inSearchMode.exporting = false;
            this.inSearchMode.exportingCount += 1;
          }

        }, 600);
      });
    },
    exportDataToHtml(exportData) {
      let title = `<div class="title">#${filter.name(this.currentSession.chatId)} ${filter.timeFilter3(this.time[0])}${
        this.time[1] ? ` ~ ${filter.timeFilter3(this.time[1])}` : ""
      } History</div>`;
      let fileName = `#${filter.name(this.currentSession.chatId)} ${filter.timeFilter3(this.time[0])}${this.time[1] ? ` - ${filter.timeFilter3(this.time[1])}` : ""} History.html`

      let msgItem = null;

      exportData
        .map(
          item => {
            switch (item.type) {
              case msgEnumTypes.img:
                msgItem = JSON.parse(item.msg);
                item.viewShow = `
                <div class="text">
                    <div class="name">
                      ${item.name}
                    </div>
                    <div class="msg">
                      <a target="_blank" href=${Config.fileDownUrl.replace('/cs/', '/') + '1080' + msgItem.imgUrl}>
                        <img src=${Config.fileDownUrl.replace('/cs/', '/') + 'compress' + msgItem.imgUrl} />
                      </a>
                    </div>
                </div>
                `
                break;
              case msgEnumTypes.video:
                msgItem = JSON.parse(item.msg);
                item.viewShow = `
                <div class="text">
                    <div class="name">
                      ${item.name}
                    </div>
                    <div class="msg">
                      <video src="${Config.fileDownUrl.replace('/cs/', '/cs') + msgItem.fileUrl}" controls="controls">
                      您的浏览器不支持 video 标签。
                      </video>
                    </div>
                </div>
                `
                break;
              case msgEnumTypes.files:
                msgItem = JSON.parse(item.msg);
                item.viewShow = `
                <div class="text">
                    <div class="name">
                      ${item.name}
                    </div>
                    <div class="msg">
                      <a target="_blank" href=${Config.fileDownUrl.replace('/cs/', '/cs') + msgItem.fileUrl}>
                        ${msgItem.fileId}
                      </a>
                    </div>
                </div>
                `
                break;
            
              default:
                item.viewShow = `
                <div class="text">
                    <div class="name">
                      ${item.name}
                    </div>
                    <div class="msg">
                      ${item.msg}
                    </div>
                </div>
                `
                break;
            }
          }
        )

      let list = `
          ${exportData
            .map(
              item => `${item.viewShow}`
            ).join("")}`;

      let template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="initial-scale=1.0">
            <title>Export Html</title>
        </head>
        <style>
          .msgList {
            height: 580px;
            width: 700px;
            position: relative;
            border: 1px solid #f0f2f7;
            border-radius: 8px;
            margin: 0 auto;
          }
          .msgListContent {
            height: 100%;
            position: relative;
            border-radius: 8px;
            padding: 18px;
            margin: 0 auto;
            overflow: auto;
          }
          .title{
            padding: 8px;
            border-bottom: 1px solid #f0f2f7;
          }
          .name {
            color: #8099e3;
          }
          .msg {
            padding: 14px 0 11px 0;
            max-width: 600px;
            word-wrap: break-word;
          }
          .msg a:link{
            color: #333333;
          }
          .msg-video {
            text-align: left;
          }
          .file-icon {
            margin-left: 14px;
          }
        </style>
        <script>
          var s=0;
          alert('内部资料,请勿外泄');
        </\script>
        <body>
          <div class="msgList">
            ${title}
            <div class="msgListContent">
              ${list}
            </div>
          </div>
        </body>
        </html>
        `;

      exportHtml(fileName, template);
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
      this.searchKeyWord("morePage");
    },
    viewCoText(item) {
      // 计算上下文
      this.inSearchMode.inCoText = true;
      this.inSearchMode.status = false;
      let currentPage = parseInt(item.msgId / this.pageSize);
      this.currentPage = currentPage < 1  ? 1 : currentPage;
      this.searchKeyWord();
      // 
    },
    backToInCoText() {
      this.msgList = this.exChangemsgList.msgList;
      this.inSearchMode.inCoText = false;
      this.inSearchMode.status = true;
      this.currentPage = 1;
      this.searchKeyWord();
    },
    closeSearchResult() {
      this.inSearchMode.inCoText = false;
      this.searchMsgContent = null;
      this.inSearchMode.status = true;
      this.searchKeyWord("today", "button");
    },
    clearSearchKeyword() {
      this.searchMsgContent = null;
      this.searchKeyWord() 
    },
    onChangeMsgContent() {
      console.log(this.searchMsgContent)
    },
    onBlurMsgContent() {
      setTimeout(() => {
        // this.searchMsgContent = this.searchMsgContentTmp;
      }, 300);
    },
    resetSearchFilter() {
      //
    },
    searchKeyWord(mode, modeType) {
      let that = this;
      // payload
      let obj = {
        channelId: this.currentSession.visitorUuid,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      if (mode == "morePage") {
        if (this.stopScroll) return;
        this.currentPage = this.currentPage + 1;
      }
      // 点击固定时间按钮重置时间范围值time
      if(modeType == "button") {
        this.classType = "all";
        this.dateClassifyType = mode;
        obj.startTime = "";
        obj.endTime = "";
      }
      // 其它搜索条件插入
      if (this.searchMsgContent) {
        this.classType = "all";
        obj.msgContent = this.searchMsgContent;
        this.inSearchMode.hasKeyWord = true;
        if(this.searchMsgContent == "") {
          this.inSearchMode.hasKeyWord = false;
          this.searchMsgContent = null
        } else {
          this.searchMsgContentTmp = this.searchMsgContent;
        }
      } else {
        this.inSearchMode.hasKeyWord = false;
      }
      // 固定时间段time搜索赋值
      if (this.dateClassifyType == "today") {
        obj.startTime = timeUtil.getDateRangeTimestamp("today").startTime;
      } else if (this.dateClassifyType == "yesterday") {
        obj.startTime = timeUtil.getDateRangeTimestamp("yesterday").startTime;
      } else if (this.dateClassifyType == "custom") {
        if(this.time && this.time[0]) {
          obj.startTime = this.time[0];
          obj.endTime = this.time[1];
        } else {
          return
        }
      }

      // 组织数据
      if(this.inSearchMode.inCoText) {
        this.exChangePool.msgContent = this.msgContent;
        this.exChangePool.msgList = this.msgList;
        this.msgList = [];
        delete obj["msgContent"];
        delete obj["startTime"];
        delete obj["endTime"];
      } else {
        this.msgList = [];
      }

      this.$api.getSessionRecord(obj).then(res => {
        if (mode == "morePage") {
          if (this.currentPage > res.data.pages) {
            this.stopScroll = true;
            return;
          }
          if (this.currentPage == res.data.pages) this.stopScroll = true;
        }
        res.data.list.forEach(element => {
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
              chatType: sessionEnumTypes.visitor,
              userId: toId
            })
            .then(data => {
              const addmsgList= () => {
                that.msgList.unshift({
                  type: data.type,
                  fromName,
                  fromId,
                  createTime,
                  msg,
                  msgId,
                  item: data.viewShow
                });
              }
              // 文字和链接标红
              if (
                this.searchMsgContent
              ) {
                // 上下文场景插入消息对象
                if(this.inSearchMode.inCoText) {
                  if(data.type == msgEnumTypes.text || data.type == msgEnumTypes.textHyperLink){
                    msg = repalceToRed(this.searchMsgContent, msg);
                  }
                  addmsgList();
                } else {
                  if(data.type == msgEnumTypes.text || data.type == msgEnumTypes.textHyperLink){
                    msg = repalceToRed(this.searchMsgContent, msg);
                    addmsgList();
                  }
                }

              } else {
                addmsgList(); 
              }
            });
        });
        if (res.data.pages > this.currentPage) {
          this.stopScroll = false;
        } else {
          this.stopScroll = true;
        }
      });
    }
  },
  created() {
    this.searchKeyWord("init", "");
  },
  mounted() {
    // window.searchKeyWord = this.searchKeyWord;
  }
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
      /deep/.el-button--text{
        color: $color-theme;
      }
      Button{
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
  .msgListContent{
    height: 519px;
    position: relative;
    overflow: hidden;
    &.hasSearchResult{
       .haskeyword{
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
    ul{
      li {
        border-top: 1px solid $border-color;
        padding: 18px;
        position: relative;
        &.haskeyword{
          display: none;
        }
        &:first-child{
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
    .text{
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
    .view-co-text{
      display: none;
      position:absolute;
      width: 20%;
      right: 0;
      color: $color-theme;
      top:45%;
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
