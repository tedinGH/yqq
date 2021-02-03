import store from "@/store";
import filter from "@/common/filters";
import { Config } from "@/common/config";
import { msgEnumTypes, sessionEnumTypes } from "@/common/enum";
import { timeUtil } from "@/tools/timeUtil";
import { msgManager } from "@/session/msgManager";
import { face } from "@/tools/emoji";
let lang = null;

export const msgFormatTemplate = {
  /**
   * 单个消息解析
   * @param {JSON} content 消息
   * {
   *     isSender://是否消息拥有着（true-消息拥有者）
   *     fromId://
   *     bodyFrom://
   *     timeStamp:,//消息发送时间(时间戳)
   *
   *     id:,//消息ID
   *     type:,//消息类型
   *     time:,//消息发送时间（小时+分钟）
   *     date:,//消息发送日期
   *     body:,//原消息体
   *     viewShow:,//用于Html展示消息
   *     preview:,//用于列表展示消息
   * }
   */
  formatMsg(content) {
    //最近聊天消息格式化
    content.time = timeUtil.toTime(content.timeStamp);
    content.date = timeUtil.toDate(content.timeStamp);
    return new Promise(resolve => {
      try {
        if (!lang) lang = store.state.translate;
        switch (content.type) {
          case msgEnumTypes.text: //普通文本
          case msgEnumTypes.textHyperLink: //转接协议
            this.textTemp(resolve, content);
            break;
          case msgEnumTypes.img: //图片
            this.imgTemp(resolve, content);
            break;
          case msgEnumTypes.video: //离线视频
            this.offlineVideoTemp(resolve, content);
            break;
          case msgEnumTypes.aduio: //离线音频
            this.offlineAudioTemp(resolve, content);
            break;
          case msgEnumTypes.inout: //进入/离开协议
            this.inOrOutTemp(resolve, content);
            break;
          case msgEnumTypes.sessionOver: //会话结束协议
            this.sessionCloseTemp(resolve, content);
            break;
          case msgEnumTypes.newTransferEntry: //转接协议
            this.swichTemp(resolve, content);
            break;
          case msgEnumTypes.msgTyping: //输入中
            break;
          case msgEnumTypes.msgReaded: //消息已读
            this.msgRead(content);
            break;
          // 上传
          case msgEnumTypes.files: //文件
            this.fileTemp(resolve, content);
            break;
          default:
            throw "Not currently supported";
            break;
        }
        if (!content.body && !content.viewShow) {
          throw "Parse error";
        }
      } catch (error) {
        console.error(error);
        content.type = 49;
        content.noChatInfo = true;
        content.preview = error == "Not currently supported" ? lang.msgPanel.notSupported : lang.msgPanel.parseError;
        content.viewShow = error == "Not currently supported" ? lang.msgPanel.notSupported : lang.msgPanel.parseError;
        resolve(content);
      }
    });
  },
  formatMsgNew(content) {
    return new Promise(resolve => {
      this.formatMsg(content).then(data => {
        if (data) {
          //消息保存
          msgManager.updateMsg(0, 0, data);
        }
        resolve(data);
      });
    });
  },
  /**
   * 普通文本协议
   * @param {*} resolve
   * @param {string} content
   */
  textTemp(resolve, content) {
    // let preview = face.previewI18n(content.body);
    // let html = face.stringToHtml(content.body);
    let html = face.resetUrl(content.body);
    let preview = content.body;
    let regExp = new RegExp("\r\n", "g");
    let a = `<div class="chat-name ${content.isSender ? "self" : "him"}">${store.state.serviceInfo.name}</div><div class="chat-item ${
      content.isSender ? "self" : "him"
    }"><div class="item-box" style="background:${content.isSender ? store.state.themeColour : "#fff"}"><div>${html.replace(
      regExp,
      "<br>"
    )}</div><div class="time" >${content.time}${
      content.isSender ? '<span id="' + content.id + '_state_span" class="' + (content.id > 1000000000 ? "senging" : "wait") + '"></span>' : ""
    }</div></div></div>`;
    content.viewShow = a;
    content.preview = preview;
    resolve(content);
  },
  /**
   * 图片模板
   * @param {string} content
   */
  imgTemp(resolve, content) {
    let cacheJson = {
      ...content
    };
    console.log(content);
    cacheJson.viewShow = JSON.parse(content.body);
    if (cacheJson.viewShow) {
      if (cacheJson.viewShow.imgUrl && cacheJson.viewShow.imgUrl.indexOf("/") == 0) {
        cacheJson.viewShow.imgUrl = cacheJson.viewShow.imgUrl.substr(1);
      }
    }
    cacheJson.preview = "[" + lang.common.image + "]";
    resolve(cacheJson);
  },
  /**
   * 文件模板
   * @param {*} content
   */
  fileTemp(resolve, content) {
    let cacheJson = {
      ...content
    };
    console.log(content);
    cacheJson.viewShow = JSON.parse(content.body);
    cacheJson.viewShow.progress = cacheJson.viewShow.progress < 100 ? 0 : 100;
    cacheJson.preview = "[" + lang.common.file + "]";
    if (cacheJson.viewShow) {
      if (cacheJson.viewShow.fileUrl && cacheJson.viewShow.fileUrl.indexOf("/") == 0) {
        cacheJson.viewShow.fileUrl = cacheJson.viewShow.fileUrl.substr(1);
      }
    }
    let obj = {
      url: Config.fileDownUrl + "original/" + cacheJson.viewShow.url,
      name: cacheJson.viewShow.name
    };
    let d = JSON.stringify(obj);
    d = window.encodeURIComponent(d);
    let str = window.btoa(d);
    cacheJson.viewShow.dl64 = str;
    cacheJson.progress = 100;
    resolve(cacheJson);
  },
  /**
   * 离线语音模板
   * @param {string} content
   */
  offlineAudioTemp(resolve, content) {
    let cacheJson = {
      ...content
    };
    console.log(content);
    cacheJson.viewShow = JSON.parse(content.body);
    cacheJson.viewShow.progress = cacheJson.viewShow.progress < 100 ? 0 : 100;
    cacheJson.viewShow.isPlaying = false;
    cacheJson.viewShow.isPlay = false;
    cacheJson.viewShow.proNum = 0;
    cacheJson.preview = "[" + lang.common.voice + "]";
    resolve(cacheJson);
  },
  /**
   * 离线视频模板
   *@param {string} content
   */
  offlineVideoTemp(resolve, content) {
    let cacheJson = {
      ...content
    };
    console.log(content);
    cacheJson.viewShow = JSON.parse(content.body);
    cacheJson.viewShow.progress = cacheJson.viewShow.progress < 100 ? 0 : 100;
    if (cacheJson.viewShow) {
      if (cacheJson.viewShow.fileUrl) {
        cacheJson.viewShow.fileUrl = cacheJson.viewShow.fileUrl.substr(1);
      } else {
        cacheJson.viewShow.fileUrl = cacheJson.viewShow.fileUrl + ".png";
        cacheJson.bodyContent = JSON.stringify(content.viewShow);
      }
    }
    cacheJson.preview = "[" + lang.common.video + "]";
    resolve(cacheJson);
  },
  swichTemp(resolve, content) {
    let cacheJson = JSON.parse(content.body);
    content.viewShow = `<div class="no-chat"> <span class="text"> Next ${cacheJson.toUserName} will serve you</span> </div>`;
    resolve(content);
  },
  inOrOutTemp(resolve, content) {
    let cacheJson = JSON.parse(content.body);
    let msgTxt;
    if (cacheJson.type == 0) {
      //离开
      return;
    } else {
      //加入
      msgTxt = lang.common.in;
      content.viewShow = `<div class="no-chat"> <span class="text">${cacheJson.name + msgTxt}</span> </div> `;
    }
    content.preview = cacheJson.name + msgTxt;
    resolve(content);
  },
  sessionCloseTemp(resolve, content) {
    content.viewShow = `<div class="no-chat"> <span>${lang.common.sessionClose}</span> </div>`;
    content.preview = lang.common.sessionClose;
    resolve(content);
  },
  /**
   * 消息已读
   * @param {*} content
   */
  msgRead(content) {
    if (!content.isSender) {
      let readJson = JSON.parse(content.body);
      //更新本地数据库  ？？？
      msgManager.updateMsgRead(readJson.mId);
      //发送消息已读
      let chatPanel = store.state.activityComponents["Home"];
      if (chatPanel) {
        chatPanel.msgRead(readJson.mId);
      }
    }
  }
};
