import store from "../store";
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

      if (param.chatType == 10) {
        if (param.newMsgType == 14) {
          if (sessionDesktopNotifyState) {
            if (sessionVoiceNotifyState) {
              this.voiceAction("sessionVoiceNotifyState");
            } else {
              return;
            }
          }
        } else {
          if (visitorMsgDesktopNotifyState) {
            if (visitorMsgVoiceNotifyState) {
              this.voiceAction("visitorMsgVoiceNotifyState");
            }
          } else {
            return;
          }
        }
      } else {
        if (parterMsgDesktopNotify) {
          if (parterMsgVoiceNotify) {
            this.voiceAction("parterMsgVoiceNotify");
          }
        } else {
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
    switch (param.chatType) {
      case 10:
        if (param.newMsgType == 14) {
          title = `New dialogue entry`;
        } else {
          title = `Dialogue #${filter.name(param.userId)}`;
        }
        break;
      case 0:
        title = param.nickName;
        break;
      default:
        break;
    }
    const payload = {
      ...param,
      title
    };

    var notify = new Notification(payload.title, {
      // icon: param.img,
      body: payload.preview.replace(/&nbsp;/g, " ").replace(/<br\/>/g, "\n"),
      tag: payload.id // param.paramId + "-" + param.fromType + "-" + param.bodyFrom
    });
    notify.onclick = () => {
      window.focus();
      param.isActivity = true;
      param.unreadNum = 0;
      notify.close();
    };
  }
};

export default messageParse;
