import store from "../store";
import { Util } from "@/tools/utils";
import { msgEnumTypes, sessionEnumTypes } from "@/common/enum";
import filter from "@/common/filters";

let _vioceReady = true;
let lang = null;
let _langIdx = 0;

if (localStorage.lang == "en_US") _langIdx = 1;
if (localStorage.lang == "my") _langIdx = 2;

const messageParse = {
  voiceAction(notifyType) {
    let audio_msg = null;
    switch (notifyType) {
      case "sessionVoiceNotifyState":
        audio_msg = document.getElementById("audio_remind_access");
        break;
      case "visitorMsgVoiceNotifyState":
        audio_msg = document.getElementById("audio_remind_news");
        break;
      case "parterMsgVoiceNotify":
        audio_msg = document.getElementById("audio_remind_tongshi");
        break;
      default:
        break;
    }
    try {
      audio_msg.muted = false;
      audio_msg.currentTime = 0;
      audio_msg.play();
    } catch (error) {
      console(error);
    }
  },
  //消息通知
  notice(param) {
    try {
      const {
        sessionDesktopNotifyState,
        sessionVoiceNotifyState,
        visitorMsgDesktopNotifyState,
        visitorMsgVoiceNotifyState,
        parterMsgDesktopNotify,
        parterMsgVoiceNotify
      } = store.state.reminderSettings;

      // 通知开关判断
      if (param.chatType == sessionEnumTypes.visitor) {
        if (param.type == msgEnumTypes.newTransferEntry) {
          if (sessionVoiceNotifyState) {
            this.voiceAction("sessionVoiceNotifyState");
          }
        } else {
          if (visitorMsgVoiceNotifyState) {
            this.voiceAction("visitorMsgVoiceNotifyState");
          }
        }
      } else {
        if (parterMsgVoiceNotify) {
          this.voiceAction("parterMsgVoiceNotify");
        }
      }

      // 声效开关判断
      if (param.chatType == sessionEnumTypes.visitor) {
        if (param.type == msgEnumTypes.newTransferEntry) {
          if (!sessionDesktopNotifyState) {
            return;
          }
        } else {
          if (!visitorMsgDesktopNotifyState) {
            return;
          }
        }
      } else {
        if (!parterMsgDesktopNotify) {
          return;
        }
      }

      if (document.hidden !== undefined) {
        if (!document.hidden) {
          let current = store.getters.currentSession;
          if (param.bodyFrom == current.chatId) {
            if (param.isActivity) {
              return;
            }
          }
        }
      } else {
        let current = store.getters.currentSession;
        console.log(current);
        if (param.bodyFrom == current.chatId) {
          if (param.isActivity) {
            return;
          }
        }
      }
      // 浏览器消息窗体
      this.showNotify(param);
    } catch (error) {
      console.error(error);
    }
  },
  showNotify(param) {
    if (this.checkNotificationPromise()) {
      this.newNotification(param);
    } else {
      this.oldNotification(param);
    }
  },
  /**
   * 检测是否支持promise版本
   */
  checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch (e) {
      return false;
    }
    return true;
  },
  newNotification(param) {
    if (param.isInterruption == 1) {
      return;
    }
    if (!("Notification" in window)) {
      return false;
    } else if (Notification.permission === "granted") {
      //模拟一个click事件
      //判断浏览器版本，火狐72之后需要模拟click事件才能触发
      this.notifyInit(param);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function(permission) {
        if (permission === "granted") {
          this.notifyInit(param);
        }
      });
    }
  },
  oldNotification(param) {
    var Notification = window.Notification || window.mozNotification || window.webkitNotification;
    if (param.isInterruption == 1) {
      return;
    }
    if (Notification) {
      Notification.requestPermission(result => {
        if (result != "granted") {
          return false;
        } else {
          this.notifyInit(param);
        }
      });
    } else {
      return false;
    }
  },
  notifyInit(param) {
    let title = "";
    let body = Util.replaceText(param.preview);
    switch (param.chatType) {
      case sessionEnumTypes.visitor:
        if (param.type == msgEnumTypes.newTransferEntry) {
          title = `New Conversation`;
          body = `Conversation #${filter.name(param.userId)} entry`;
        } else {
          title = `Conversation #${filter.name(param.userId)}`;
          if (param.type == msgEnumTypes.inout) {
            title = `New Conversation`;
            body = `Conversation #${filter.name(param.userId)} entry`;
          }
        }
        break;
      case sessionEnumTypes.firend:
        title = param.nickName;
        break;
      default:
        break;
    }
    const payload = {
      ...param,
      title,
      body
    };
    var notify = new Notification(payload.title, {
      icon: "", // 图标必须开启，空值也可以
      body: payload.body,
      tag: payload.id // param.paramId + "-" + param.fromType + "-" + param.bodyFrom
    });
    notify.onclick = () => {
      window.focus();
      param.isActivity = true;
      param.unReadNum = 0;
      notify.close();
    };
  }
};

export default messageParse;
