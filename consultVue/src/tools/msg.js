import store from "../store";
import { msgEnum, sessionEnum } from "@/common/enum";
let _vioceReady = true;
let lang = null;
let _langIdx = 0;

if (localStorage.lang == "en_US") _langIdx = 1;
if (localStorage.lang == "my") _langIdx = 2;

const messageParse = {
  voiceAction(notifyType) {
    let audio_msg = null;
    switch (notifyType) {
      case "visitorMsgVoiceNotifyState":
        audio_msg = document.getElementById("audio_remind_news");
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
    // console.log(param);
    this.showNotify(param);

    try {
      const {
        visitorMsgDesktopNotifyState,
        visitorMsgVoiceNotifyState
      } = store.state.reminderSettings;

      if (param.chatType == sessionEnum.visitor) {
        if (visitorMsgDesktopNotifyState) {
          if (visitorMsgVoiceNotifyState) {
            this.voiceAction("visitorMsgVoiceNotifyState");
          }
        } else {
          return;
        }
      }

      if (document.hidden !== undefined) {
        if (!document.hidden) {
          return;
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
    var Notification =
      window.Notification ||
      window.mozNotification ||
      window.webkitNotification;
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
    // console.log(param);
    const payload = {
      ...param,
      title: param.chatType == sessionEnum.visitor ? `News ${param.id}` : ""
    };

    var notify = new Notification(payload.title, {
      icon: "",
      body: payload.preview.replace(/&nbsp;/g, " ").replace(/<br\/>/g, "\n"),
      tag: payload.id
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
