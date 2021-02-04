import store from "@/store";
import filter from "@/common/filters";
import { msgEnum, sessionEnum } from "@/common/enum";
import { timeUtil } from "@/tools/timeUtil";
import { msgManager } from "@/session/msgManager";
import { Config } from "@/common/config";
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
    // console.log(content)
    return new Promise(resolve => {
      try {
        lang = store.state.translate;
        switch (content.type) {
          case msgEnum.text: //普通文本
            this.textTemp(resolve, content);
            break;
          case msgEnum.img: //图片
            this.imgTemp(resolve, content);
            break;
          case msgEnum.video: //离线视频
            this.offlineVideoTemp(resolve, content);
            break;
          case msgEnum.audio: //离线音频
            this.offlineAudioTemp(resolve, content);
            break;
          case 18: //历史记录文件类型，新增至18时，会影响历史记录文件
            this.fileTemp(resolve, content);
            break;
          case msgEnum.files: //文件
            this.fileTemp(resolve, content);
            break;
          case msgEnum.inout: //进入/离开协议
            this.inOrOutTemp(resolve, content);
            break;
          case msgEnum.sessionOver: //会话结束协议
            this.sessionCloseTemp(resolve, content);
            break;
          case msgEnum.msgTyping: //输入中
            break;
          case msgEnum.msgReaded: //消息已读
            this.msgRead(resolve, content);
            break;
          case msgEnum.textHyperLink: //链接
            this.textTemp(resolve, content);
            break;
          case msgEnum.newTransferEntry: //转接协议
            this.swichTemp(resolve, content);
            break;
          case msgEnum.evaluateCustomerService: //客服评价
            this.evaluateTemp(resolve, content);
            break;
          default:
            throw "Not currently supported";
            break;
        }
        // console.log(content, content.body, content.viewShow)
        if (!content.body && !content.viewShow) {
          // console.log(content)
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
    lang = store.state.translate;
    switch (content.type) {
      case msgEnum.inout:
        return `#${filter.name(content.chatId)} Enter`;
      case msgEnum.evaluateCustomerService:
        const { isEvaluate = 0} = content;
        if (isEvaluate == 0) {
          //发起评价
          return `[${lang.evaluate.sendEvaluate}]`;
        } else {
          //评价结束
          return `[${lang.evaluate.evaluationEnd}]` ;
        }
      case msgEnum.files:
        return `[${lang.common.file}]`;
      case msgEnum.video:
        return `[${lang.common.video}]`;
      case msgEnum.audio:
        return `[${lang.common.audio}]`;
      case msgEnum.img:
        return `[${lang.common.image}]`;
      case msgEnum.newTransferEntry:
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
    let regExp = new RegExp("\r\n", "g");
    let name = content.bodyFrom == store.state.userInfo.id ? store.state.userInfo.nickName : content.fromName;
    let isReaded = store.state.currentSession.newMsgId >= content.id;
    let a = `<div class="chat-name ${content.isSender ? "self" : ""}">${name}</div>
      <div class="chat-item ${content.isSender ? "self" : ""}">
        <div class="item-box" >
          <div>${html.replace(regExp, "<br>")}</div>
          <div class="time">
          ${content.time}
          ${content.isSender ? '<span id="' + content.id + '_state_span" class="' + (isReaded ? "sendsuccess" : (content.id > 1000000000 ? "senging" : "wait")) + '"></span>' : ""}
          </div>
      </div>
    </div>`;
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
    // console.log(content);
    cacheJson.viewShow = JSON.parse(content.body);
    cacheJson.viewShow.progress = cacheJson.viewShow.progress < 100 ? 0 : 100;
    cacheJson.preview = "[" + lang.common.file + "]";
    if (cacheJson.viewShow) {
      if (cacheJson.viewShow.fileUrl && cacheJson.viewShow.fileUrl.indexOf("/") == 0) {
        cacheJson.viewShow.fileUrl = cacheJson.viewShow.fileUrl.substr(1);
      }
    }
    let obj = {
      url: global.fileDownUrl + "original/" + cacheJson.viewShow.url,
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
    // console.log(content);
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
    // console.log(content);
    cacheJson.viewShow = JSON.parse(content.body);
    cacheJson.viewShow.progress = cacheJson.viewShow.progress < 100 ? 0 : 100;
    if (cacheJson.viewShow) {
      if (cacheJson.viewShow.fileUrl) {
        if (cacheJson.viewShow.fileUrl.indexOf('data:image') < 0) {
          cacheJson.viewShow.fileUrl = cacheJson.viewShow.fileUrl.substr(1); 
        }
      } else {
        cacheJson.viewShow.fileUrl = cacheJson.viewShow.fileUrl + ".png";
        cacheJson.bodyContent = JSON.stringify(content.viewShow);
      }
    }
    cacheJson.preview = "[" + lang.common.video + "]";
    resolve(cacheJson);
  },
  inOrOutTemp(resolve, content) {
    // debugger
    let cacheJson = JSON.parse(content.body);
    let msgTxt;
    if (cacheJson.type == 0) {
      //离开
      msgTxt = lang.common.out;
      cacheJson.name = "";
      if (content.bodyFrom > 0) return;
    } else {
      //加入
      if (content.bodyFrom != content.userId) return;
      msgTxt = lang.common.in;
    }
    content.viewShow = `<div class="no-chat"> <span class="text">#${filter.name(content.bodyFrom) + msgTxt}</span> </div> `;
    content.preview = cacheJson.name + msgTxt;
    resolve(content);
  },
  // 客服评价
  evaluateTemp(resolve, content) {
    // debugger
    let cacheJson = JSON.parse(content.body);
    let msgTxt = lang.evaluate.sendEvaluate;
    const { isEvaluate = 0} = cacheJson;
    if (isEvaluate == 0) {
      //发起评价
      msgTxt = lang.evaluate.sendEvaluate;
    } else {
      //评价结束
      msgTxt = lang.evaluate.evaluationEnd;
    }
    content.viewShow = `<div class="no-chat"> <span class="text">${filter.timeFilter3(content.timeStamp)} ${msgTxt}</span> </div> `;
    content.preview = msgTxt;
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
        if (content.chatType == sessionEnum.visitor) {
          componentName = "dialogue";
        } else if (content.chatType == sessionEnum.friend) {
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
