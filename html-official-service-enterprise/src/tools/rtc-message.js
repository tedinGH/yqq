import store from "@/store";
import { actionApi } from "@/api";
import Msg from "./msg";
import { msgFormatTemplate } from "@/tools/msgFormatTemplate";
import { msgTypeProtocol } from "@/session/msgTypeProtocol";
import { msgUtil } from "@/tools/msgUtil";

export default {
  timer: null,
  onMessage(data) {
    // console.log(data)
    // let jsons = JSON.parse(data.body);
    let bodyFrom = data.bodyFrom;
    let fromId = data.fromId;
    let chatType = data.chatType;
    let msgType = data.msgType;
    let source = data.source;
    let toId = data.toId;
    let newMsg = data.newMsg;
    let updateTime = data.time;
    let sessionId = data.bodyFrom;
    let switchID = msgType == 14 ? JSON.parse(data.body).preSessionId : "";
    let isSender = bodyFrom == toId; //是否为消息发送者 true-消息发送者 false-消息接收者
    //  (currentSession && currentSession.sessionId == sessionId )   判断当前是否在此聊天页面
    let currentSession = store.state.currentSession;
    if (!isSender) {
      if (
        currentSession.sessionId &&
        currentSession.sessionId == sessionId &&
        currentSession.chatType == chatType &&
        msgType != 8 &&
        msgType != 7 &&
        msgType != 6 &&
        msgType != 5 &&
        msgType != 9 &&
        msgType != 10 &&
        msgType != 16
      ) {
        //发送消息已读
        this.sendMsgRead(fromId, chatType, data.msgId);
      }
    }

    if (chatType == 10) {
      store.state.sessionLists.forEach(element => {
        if (element.chatId == fromId) {
          element.msgId = data.msgId;
        }
      });
    }

    if (chatType == 0) {
      // store.state.sessionColleagueList.forEach(element => {
      //   if (element.chatId == fromId) {
      //     element.msgId = data.msgId;
      //   }
      // });
    }

    switch (msgType) {
      case 1:
      //普通文本
      case 2:
      //图片协议
      case 3:
      //视频协议
      case 4:
        //语音协议
        break;
      case 5:
        //进入离开协议
        if (isSender) {
          return;
        }
        if (fromId > 0) {
          break;
        }
        this.inout(data);
        break;
      case 6:
        //会话结束
        break;
      case 7:
        //输入中
        break;
      case 8:
        //消息已读
        break;
      case 9:
        //网页进入/离开协议
        // if (json.type == 1) {
        //   store.commit("ADD_BROWSING", {
        //     isActivity: false,
        //     online: 1,
        //     chatId: fromId,
        //     chatType: 10,
        //     name: json.name,
        //     avatar: undefined,
        //     msgId: data.msgId,
        //     preview: json.title
        //   });
        // } else {
        //   store.commit("REMVOE_BROWSING", fromId);
        // }
        return;
      case 10:
        //访客弹窗协议
        break;
      case 13:
        break;
      case 14:
        let info= JSON.parse(data.body);
        store.commit("ADD_SESSIONLISTS", {
            isActivity: false,
            chatId: bodyFrom,
            sessionId: info.sessionId,
            chatType: 10,
            online: 1,
            avatar: undefined,
            msgId: 0,
            unread: 1,
            switched: 1,
            time: data.time,
            preSessionId: info.preSessionId
        });
        // actionApi.getVisitorList({ type: 2, currentPage: 1, pageSize: 20 }).then(res => {
        //   let session = res.data.list;
        //   session.forEach(element => {
        //     if (element.visitorId == data.fromId) {
        //       store.commit("ADD_SESSIONLISTS", {
        //         isActivity: false,
        //         id: element.id,
        //         chatId: element.visitorId,
        //         sessionId: element.sessionId,
        //         chatType: 10,
        //         name: element.ipSource,
        //         online: 1,
        //         avatar: undefined,
        //         msgId: 0,
        //         unread: 1,
        //         switched: 1,
        //         time: element.updateTime,
        //         preSessionId: element.preSessionId
        //       });
        //     }
        //   });
        // });
        break;
      case 16:
        let nums = JSON.parse(data.body);
        store.commit("SET_WAITNUM", nums.waitingCount);
        return;
      case 11:
        //客服在线协议
        let a = JSON.parse(data.body);
        store.commit("UPDATE_SESSION_COLLEAGUE_ONLINE", {
          fromId,
          type: a.type
        });
        return;
      default:
        break;
    }
    msgFormatTemplate
      .formatMsgNew({
        isSender: isSender,
        bodyFrom: bodyFrom,
        timeStamp: data.time,
        id: data.msgId,
        type: msgType,
        body: data.body,
        chatType,
        userId: fromId,
        sessionId: switchID,
        newMsgType: msgType
      })
      .then(data => {
        let componentName = null;
        // 更新数据主流程
        if (data.chatType == 10) {
          componentName = "dialogue";
        } else if (data.chatType == 0) {
          componentName = "friendbox";
        }

        if (msgType) {
          if (msgType != 8) {
            if (data.chatType == 10) {
              store.commit("UPDATE_SESSION_PREVIEW", data);
            } else if (data.chatType == 0) {
              store.commit("UPDATE_SESSION_COLLEAGUE_PREVIEW", data);

              let nickName = "";
              store.state.departmentUsers.forEach(item => {
                if (item.listUser) {
                  item.listUser.forEach(childItem => {
                    if (childItem.chatId == fromId) {
                      nickName = childItem.nickName == "" ? childItem.name : childItem.nickName;
                      return;
                    }
                  })
                }
              })
              data.nickName = nickName;
            }
            Msg.notice(data);
          }
        }

        if (currentSession && currentSession.chatId == data.userId && currentSession.chatType == data.chatType) {
          let chatPanel = store.state.activityComponents[componentName];
          if (chatPanel) {
            chatPanel.pushMsg(data);
          }
        }
      });
  },
  rtc() {
    actionApi
      .rtc()
      .then(
        data => {
          if (data.state == 123) {
            return;
          }
          if (data.state == -2) {
            //超时
          } else if (data.state == 2) {
            //消息存在断层
            //调取断层获取接口
            actionApi
              .getCacheMsg({
                startIndex: store.state.idSeq,
                endIndex: data.data.idSeq
              })
              .then(
                data => {
                  let list = data.data.list;
                  if (list) {
                    list.forEach(element => {
                      this.onMessage(JSON.parse(element));
                    });
                  }
                  store.commit("SET_ID_SEQ", data.data.idSeq);
                  this.rtc();
                },
                () => {
                  this.throttle();
                }
              );
            return;
          } else if (data.state == 0) {
            this.onMessage(data.data);
          }
          this.rtc();
        },
        rej => {
          this.throttle();
        }
      )
      .catch(error => {
        // console.error(error)
        this.throttle();
      });
  },
  // 重连RTC服务
  throttle() {
    clearTimeout(this.timer);
    let that = this;
    this.timer = setTimeout(function() {
      that.rtc();
    }, 5000);
  },
  sendMsgRead(fromId, chatType, mId) {
    actionApi.sendMsg({
      msgType: msgTypeProtocol.MsgReadProtocol,
      toId: fromId,
      chatType: chatType,
      isSeq: false,
      msg: JSON.stringify({
        mId: mId
      })
    });
  },
  //进入离开
  inout(data) {
    let visitorsJson = JSON.parse(data.body);
    let fromId = data.fromId;
    let sessionId = data.sessionId;
    let updateTime = data.time;
    let bodyFrom = data.bodyFrom;
    let msgType = data.msgType;
    let toId = data.toId;
    if (visitorsJson.type == 1) {
      store.commit("ADD_SESSIONLISTS", {
        isActivity: store.state.currentSession.sessionId && store.state.currentSession.sessionId == sessionId ? true : false,
        online: 1,
        chatId: fromId,
        sessionId: sessionId,
        chatType: 10,
        name: visitorsJson.name,
        newMsgType: msgType,
        avatar: undefined,
        unread: store.state.currentSession && store.state.currentSession.sessionId == sessionId ? 0 : 1,
        time: updateTime,
        preSessionId: visitorsJson.preSessionId
      });
      setTimeout(() => {
        if (store.state.greetings != null && bodyFrom != toId) {
          if (store.state.greetings.usStatus == 1) {
            let txtValue;
            txtValue = msgUtil.htmlToTxt(store.state.greetings.contentUs); //移除无用html标签
            actionApi
              .sendMsg({
                msgType: 1,
                toId: fromId,
                msg: txtValue,
                chatType: 10
              })
              .then(data => {
                msgFormatTemplate
                  .formatMsgNew({
                    isSender: true,
                    bodyFrom: store.state.userId,
                    timeStamp: data.time,
                    id: data.msgId,
                    type: 1,
                    body: txtValue,
                    chatType: 10,
                    userId: fromId,
                    fromName: store.state.userInfo.nickName
                  })
                  .then(res => {
                    let componentName = null;
                    if (res.chatType == 10) {
                      componentName = "dialogue";
                      store.commit("UPDATE_SESSION_PREVIEW", res);
                    } else if (res.chatType == 0) {
                      componentName = "friendbox";
                      store.commit("UPDATE_SESSION_COLLEAGUE_PREVIEW", res);
                    }

                    if (
                      store.state.currentSession &&
                      store.state.currentSession.chatId == res.userId &&
                      store.state.currentSession.chatType == res.chatType
                    ) {
                      let chatPanel = store.state.activityComponents[componentName];
                      if (chatPanel) {
                        chatPanel.pushMsg(res);
                      }
                    }
                  });
              });
          }
        }
      }, 1000);
    } else {
      //离开
      store.commit("UPDATE_SESSION_OFFLINE", data);
      actionApi.getVisitorList({ type: 1, currentPage: 1, pageSize: 20 }).then(res => {
        store.commit("SET_WAITLISTS", res.data.list);
        store.commit("SET_WAITNUM", res.data.total);
        if (res.data.total == 0) return;
        let sessionLength = store.state.sessionLists.length - 1;
        let upLimit = store.state.admitLimit;
        if (sessionLength < upLimit) {
          let cacheWaitList = store.state.waitLists;
          if (cacheWaitList) {
            let waitCache = cacheWaitList.shift()
            if (waitCache) {
              store.commit("ADD_SESSIONLISTS", {
                isActivity: false,
                id: waitCache.id,
                chatId: waitCache.visitorId,
                sessionId: waitCache.sessionId,
                chatType: 10,
                name: waitCache.ipSource,
                online: 1,
                newMsg: waitCache.newMsg,
                avatar: undefined,
                msgId: 0,
                unread: 0,
                time: waitCache.updateTime,
                preSessionId: waitCache.preSessionId
              });
              actionApi.connectManager(waitCache.sessionId).then(data => {});
              store.commit("SET_WAITNUM", res.data.total - 1);
            }
          }
        }
      });
    }
  }
};
