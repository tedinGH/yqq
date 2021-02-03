import store from "@/store";
import filter from "@/common/filters";
import { timeUtil } from "@/tools/timeUtil";
import { msgManager } from "@/session/msgManager";
import { msgTypeProtocol } from "@/session/colleague";
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
        lang = store.state.translate;
        switch (content.type) {
          case 1: //普通文本
            this.textTemp(resolve, content);
            break;
          case 2: //图片
            this.imgTemp(resolve, content);
            break;
          case 3: //离线视频
            this.offlineVideoTemp(resolve, content);
            break;
          case 4: //离线音频
            this.offlineAudioTemp(resolve, content);
            break;
          case 5: //进入/离开协议
            this.inOrOutTemp(resolve, content);
            break;
          case 6: //会话结束协议
            this.sessionCloseTemp(resolve, content);
            break;
          case 7: //输入中
            break;
          case 8: //消息已读
            this.msgRead(resolve, content);
            break;
          case 13: //链接
            this.textTemp(resolve, content);
            break;
          case 14: //转接协议
            this.swichTemp(resolve, content);
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
          if (data.id > 1000000000) {
            return resolve(data);
          }
          msgManager.updateMsg(data.chatType, data);
        }
        resolve(data);
      });
    });
  },
  formatNewMsgType(content) {
    let cacheJson = {};
    switch (content.newMsgType) {
      case 5:
        return `#${filter.name(content.chatId)} Enter`;
      case 14:
        cacheJson = JSON.parse(content.newMsg);
        return `${cacheJson.fromUserName} transfer conversation to ${cacheJson.toUserName}`;
      default:
        return content.newMsg;
    }
  },
  /**
   * 普通文本协议
   * @param {*} resolve
   * @param {string} content
   */
  textTemp(resolve, content) {
    let html = face.resetUrl(content.body);
    let preview = content.body;
    let regExp = new RegExp("\r\n", "g")
    let name = content.bodyFrom == store.state.userInfo.id ? store.state.userInfo.nickName : content.fromName
    let a = `<div class="chat-name ${content.isSender ? "self" : ""}">${name}</div><div class="chat-item ${
      content.isSender ? "self" : ""
    }"><div class="item-box" ><div>${html.replace(regExp, "<br>")}</div><div class="time" >${content.time}${
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
    let cacheJson = {};
    cacheJson.body = content;
    cacheJson.viewShow = JSON.parse(content);
    if (cacheJson.viewShow) {
      if (cacheJson.viewShow.imgUrl.indexOf("/") == 0) {
        cacheJson.viewShow.imgUrl = cacheJson.viewShow.imgUrl.substr(1);
      }
    }
    cacheJson.preview = "[" + lang.common.image + "]";
    resolve(cacheJson);
  },
  /**
   * 离线语音模板
   * @param {string} content
   */
  offlineAudioTemp(resolve, content) {
    let cacheJson = {};
    cacheJson.body = content;
    cacheJson.viewShow = JSON.parse(content);
    //console.log(content.viewShow)
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
    let cacheJson = {};
    cacheJson.body = content;
    cacheJson.viewShow = JSON.parse(content);
    if (cacheJson.viewShow) {
      if (cacheJson.viewShow.imgUrl) {
        if (cacheJson.viewShow.imgUrl.indexOf("/") == 0) {
          cacheJson.viewShow.imgUrl = cacheJson.viewShow.imgUrl.substr(1);
        }
      } else {
        cacheJson.viewShow.imgUrl = cacheJson.viewShow.videoUrl + ".png";
        cacheJson.bodyContent = JSON.stringify(content.viewShow);
      }

      if (cacheJson.viewShow.videoUrl.indexOf("/") == 0) {
        cacheJson.viewShow.videoUrl = cacheJson.viewShow.videoUrl.substr(1);
      }
    }
    cacheJson.preview = "[" + lang.common.video + "]";
    resolve(cacheJson);
  },
  inOrOutTemp(resolve, content) {
    let cacheJson = JSON.parse(content.body);
    let msgTxt;
    if (cacheJson.type == 0) {
      //离开
      msgTxt = lang.common.out;
      cacheJson.name = "";
    } else {
      //加入
      if (content.bodyFrom != content.userId) return;
      msgTxt = lang.common.in;
    }
    content.viewShow = `<div class="no-chat"> <span class="text">${cacheJson.name + msgTxt}</span> </div> `;
    content.preview = cacheJson.name + msgTxt;
    resolve(content);
  },
  sessionCloseTemp(resolve, content) {
    content.viewShow = `<div class="no-chat"> <span>${lang.common.sessionClose}</span> </div>`;
    content.preview = lang.common.sessionClose;
    resolve(content);
  },
  swichTemp(resolve, content) {
    let cacheJson = JSON.parse(content.body);
    content.viewShow = {
      sessionId: cacheJson.preSessionId,
      fromUserName: cacheJson.fromUserName,
      nickName: cacheJson.toUserName,
      fromUserId: cacheJson.fromUserId
    };
    // content.type = 14
    resolve(content);
  },
  /**
   * 消息已读
   * @param {*} content
   */
  msgRead(resolve, content) {
    if (!content.isSender) {
      let readJson = JSON.parse(content.body);
      //更新本地数据库  ？？？
      msgManager.updateMsgRead(content.chatType, content.userId, readJson.mId);
      let currentSession = store.state.currentSession;
      if (currentSession.chatId == content.userId && currentSession.chatType == content.chatType) {
        let componentName = null;
        if (content.chatType == 10) {
          componentName = "dialogue";
        } else if (content.chatType == 0) {
          componentName = "friendbox";
        }
        //发送消息已读
        let chatPanel = store.state.activityComponents[componentName];
        if (chatPanel) {
          chatPanel.msgRead(readJson.mId);
          resolve(content);
        }
      }
    }
  }
};
