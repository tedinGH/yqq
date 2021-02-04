import Vue from "vue";
import { Util } from "@/tools/utils";
import { msgEnum } from "@/common/enum";
import * as types from "./mutation-types";

export default {
  [types.SET_LANG](state, payload) {
    state.lang = payload;
  },
  [types.SET_TOKEN](state, payload) {
    state.token = payload;
  },
  [types.SET_TRANSLATE](state, payload) {
    state.translate = payload;
  },
  [types.SET_LAYOUT](state, payload) {
    state.layout.module = payload[0];
    state.layout.child = payload[1];
    state.layout.mask = payload[2];
  },
  [types.SET_HISTORY](state, payload) {
    state.history = payload;
  },
  [types.SET_ENDLISTS](state, payload) {
    state.endLists = payload;
  },
  [types.ADD_ENDLISTS](state, payload) {
    for (let i = 0; i < payload.length; i++) {
      state.endLists.push(payload[i]);
    }
  },
  [types.SET_ONLINE](state, payload) {
    state.online = payload;
  },
  [types.SET_WAITNUM](state, payload) {
    state.waitnum = payload;
  },
  [types.SET_WAITLISTS](state, payload) {
    state.waitLists = payload;
  },
  [types.SET_DELETETO](state, payload) {
    state.deleteto = payload;
  },
  [types.SET_COMPILETO](state, payload) {
    state.compileto = payload;
  },
  [types.SET_USERINFO](state, payload) {
    state.userInfo = payload;
  },
  [types.SET_SHOWWAIT](state, payload) {
    state.showwait = payload;
  },
  [types.SET_WINDOWSIZE](state, payload) {
    state.windowSize = payload;
  },
  [types.SET_SESSIONLISTS](state, payload) {
    state.sessionLists = payload;
  },
  [types.SET_GREETINGS](state, payload) {
    state.greetings = payload;
  },
  [types.ADD_SESSIONLISTS](state, payload) {
    for (let i = 0; i < state.sessionLists.length; i++) {
      let session = state.sessionLists[i];
      if (session.chatId == payload.chatId) {
        state.sessionLists.splice(i, 1);
        //重置i，否则i会跳一位
        i--;
      }
    }
    state.sessionLists.unshift(payload);
  },
  [types.ADD_SESSIONLISTSBOTTOM](state, payload) {
    for (let i = 0; i < payload.length; i++) {
      state.sessionLists.push(payload[i]);
    }
  },
  [types.SET_DEPARTMENTUSERS](state, payload) {
    state.departmentUsers = payload;
  },
  [types.UPDATE_SESSION_OFFLINE](state, payload) {
    state.sessionLists.forEach(element => {
      if (element.chatId == payload.fromId) {
        element.online = 0;
      }
    });
  },
  [types.UPDATE_SESSION_PREVIEW](state, payload) {
    let unReadNum = 0;
    state.sessionLists.forEach(element => {
      element.newMsgId = payload.id;
      if (element.chatId == payload.userId) {
        element.time = payload.timeStamp;
        element.newMsg = Util.replaceText(payload.newMsg || payload.preview);
        if (payload.type) {
          element.type = payload.type;
        }
        if (state.currentSession.chatId != payload.userId) {
          if (payload.type != msgEnum.inout) {
            element.unread += 1;
          } else {
            element.unread = 1;
          }
        } else {
          element.unread = 0;
        }
      }
      unReadNum += element.unread;
    });
    state.redPoint.unReadNum = unReadNum;
  },
  [types.REMVOE_SESSIONLISTS](state, payload) {
    for (let i = 0; i < state.sessionLists.length; i++) {
      let session = state.sessionLists[i];
      if (session.chatId == payload) {
        state.sessionLists.splice(i, 1);
        if (state.sessionLists.length == 0) return;
        else {
          state.currentSession = state.sessionLists[0];
          state.currentSession.isActivity = true;
          return;
        }
      }
    }
  },
  [types.UPDATE_CURRENT_SESSION](state, payload) {
    state.currentSession = payload;
  },
  // 未读数
  [types.SET_UNREAD_NUMBER](state, payload) {
    for (let item in payload) {
      state.redPoint[item] = payload[item];
    }
  },
  // 通知
  [types.SET_REMINDERSETTING](state, payload) {
    state.reminderSettings = payload;
  },
  [types.SET_CHANNEL](state, payload) {
    state.channel = payload;
  },
  [types.SET_USER_ID](state, payload) {
    state.userId = payload;
  },
  [types.SET_ID_SEQ](state, payload) {
    window.localStorage.setItem("idSeq", payload);
    state.idSeq = payload;
  },
  [types.SET_CUSTOMER_SERVICE_ID](state, payload) {
    state.customerServiceId = payload;
  },
  [types.SET_ADMIT_LIMIT](state, payload) {
    state.admitLimit = payload;
  },
  [types.SET_RESPONSE](state, payload) {
    state.response = payload;
  },
  [types.SET_GENERALRES](state, payload) {
    state.generalres = payload;
  },
  [types.SET_FAMILIAR](state, payload) {
    state.familiar = payload;
  },
  [types.SET_HOT](state, payload) {
    state.hot = payload;
  },
  [types.SET_LUYOU](state, payload) {
    state.luyou = payload;
  },
  [types.SET_UNFOLD](state, payload) {
    state.unfold = payload;
  },
  [types.ADD_BROWSING](state, payload) {
    state.browsingList.push(payload);
  },

  [types.REMVOE_BROWSING](state, payload) {
    for (let i = 0; i < state.browsingList.length; i++) {
      let session = state.browsingList[i];
      if (session.chatId == payload) {
        state.browsingList.splice(i, 1);
        //重置i，否则i会跳一位
        break;
      }
    }
  },
  //同事 start
  [types.SET_SESSION_COLLEAGUE_LIST](state, payload) {
    state.sessionColleagueList = payload;
  },
  [types.UPDATE_SESSION_COLLEAGUE_ONLINE](state, payload) {
    state.sessionColleagueList.forEach(element1 => {
      element1.listUser.forEach(element => {
        if (element.chatId == payload.fromId) {
          element.online = payload.type;
        }
      });
    });
  },
  // 内部分组会话列表（同事列表）
  [types.UPDATE_SESSION_COLLEAGUE_PREVIEW](state, payload) {
    let unReadNum = 0;
    state.sessionColleagueList.forEach(element1 => {
      element1.listUser.forEach(element => {
        if (element.chatId == payload.userId) {
          element.newMsg = Util.replaceText(payload.preview);
          if (state.currentSession.chatId != payload.userId) {
            element.unread += 1;
          } else {
            element.unread = 0;
          }
        }
        element.msgId = payload.id || payload.msgId;
        unReadNum += element.unread;
      });
    });
    state.redPoint.colleagueUnReadNum = unReadNum;
  },
  //同事 end
  [types.SET_SESSION_TIME](state, time) {
    state.sessionTime = time;
  },
  // 上传
  [types.ADD_UPLOAD_LIST](state, payload) {
    state.uploadInfo.push(payload);
  },
  [types.DELETE_UPLOAD_LIST](state, payload) {
    if (payload) {
      state.uploadInfo.splice(payload, 1);
    } else {
      state.uploadInfo.shift();
    }
  },
  [types.UPDATE_PROGRESS](state, payload) {
    state.progress = payload;
  },
  [types.SET_FILESIZE](state, payload) {
    state.filesize = payload;
  },
  [types.SET_TOAST_TEXT](state, payload) {
    state.toastText = payload;
  },
  [types.SET_BUBBLES](state, payload) {
    state.bubbles = payload;
  },
  [types.SET_EVALUATE_CONF](state, payload) {
    state.evaluateConf = payload;
  },
};
