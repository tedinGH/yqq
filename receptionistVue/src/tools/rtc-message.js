import store from "@/store";
import { actionApi } from "@/api";
import Msg from "./notice";
import { msgEnumTypes, sessionEnumTypes } from "@/common/enum";
import { msgFormatTemplate } from "@/tools/msgFormatTemplate";
import { msgTypeProtocol } from "@/session/msgTypeProtocol";
import { msgUtil, Util } from "@/tools/msgUtil";
import { sessionItemPool } from "@/tools/utils";

export default {
  timer: null,
  onMessage(data) {
    // console.log(data)
    let { body, bodyFrom, fromId, chatType, msgType, source, toId, newMsg } = data;
    let updateTime = data.time;
    let sessionId = data.bodyFrom;
    let switchID = msgType == msgEnumTypes.newTransferEntry ? JSON.parse(body).preSessionId : "";
    let isSender = bodyFrom == toId; //是否为消息发送者 true-消息发送者 false-消息接收者
    //  (currentSession && currentSession.sessionId == sessionId )   判断当前是否在此聊天页面
    let { currentSession } = store.state;
    if (!isSender) {
      if (
        ((currentSession.sessionId && currentSession.sessionId == sessionId) || currentSession.chatId == sessionId) &&
        currentSession.chatType == chatType &&
        msgType != msgEnumTypes.msgReaded &&
        msgType != msgEnumTypes.msgTyping &&
        msgType != msgEnumTypes.sessionOver &&
        msgType != msgEnumTypes.inout &&
        msgType != msgEnumTypes.webPluginInout &&
        msgType != msgEnumTypes.visitorPopWin &&
        msgType != msgEnumTypes.visitorWait
      ) {
        //发送消息已读
        actionApi.getAndSetReadedSessionList({ sessionType: chatType, sessionId, maxId: data.msgId, time: store.state.sessionTime }).then(data => {
          let time = data.data.time; //记录时间戳
          store.commit("SET_SESSION_TIME", time);
        });
        console.log("发送消息已读");
      }
    }

    if (chatType == sessionEnumTypes.visitor) {
      store.state.sessionLists.forEach(element => {
        if (element.chatId == fromId) {
          element.msgId = data.msgId;
        }
      });
    }

    if (chatType == sessionEnumTypes.friend) {
      // store.state.sessionColleagueList.forEach(element => {
      //   if (element.chatId == fromId) {
      //     element.msgId = data.msgId;
      //   }
      // });
    }

    switch (msgType) {
      case msgEnumTypes.text:
        break;
      //普通文本
      case msgEnumTypes.inout:
        //进入离开协议
        // 广播
        if (isSender) {
          return;
        }
        if (fromId > 0) {
          break;
        }
        this.inout(data);
        break;
      case msgEnumTypes.sessionOver:
        //会话结束
        break;
      case msgEnumTypes.msgTyping:
        //输入中
        break;
      case msgEnumTypes.msgReaded:
        //消息已读
        break;
      case msgEnumTypes.webPluginInout:
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
      case msgEnumTypes.visitorPopWin:
        //访客弹窗协议
        break;
      case msgEnumTypes.textHyperLink:
        break;
      case msgEnumTypes.newTransferEntry:
        let info = JSON.parse(body);
        // console.log(info, data)
        const sessionItem = {
          ...data,
          newMsg: body,
          updateTime: data.time,
          visitorId: bodyFrom,
          sessionId: info.sessionId
        };
        store.commit("ADD_SESSIONLISTS", {
          ...sessionItemPool(sessionItem),
          msgId: 0,
          unread: 0,
          switched: 1,
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
      case msgEnumTypes.visitorWait:
        let nums = JSON.parse(body);
        store.commit("SET_WAITNUM", nums.waitingCount);
        return;
      case msgEnumTypes.csOnlineStatus:
        //客服在线协议
        let a = JSON.parse(body);
        store.commit("UPDATE_SESSION_COLLEAGUE_ONLINE", {
          bodyFrom,
          type: a.type
        });
        return;
      // 上传
      case msgEnumTypes.img:
        //图片
        break;
      case msgEnumTypes.video:
        //视频文件
        break;
      case msgEnumTypes.audio:
        // 音频文件
        break;
      case msgEnumTypes.files:
        // 其它文件
        break;
      default:
        break;
    }
    msgFormatTemplate
      .formatMsgNew({
        isSender,
        bodyFrom,
        timeStamp: data.time,
        id: data.msgId,
        type: msgType,
        body,
        chatType,
        userId: fromId,
        sessionId: switchID,
        newMsg: body
      })
      .then(res => {
        let componentName = null;
        // 更新数据主流程
        if (res.chatType == sessionEnumTypes.visitor) {
          componentName = "dialogue";
        } else if (res.chatType == sessionEnumTypes.friend) {
          componentName = "friendbox";
        }

        if (msgType) {
          if (msgType != msgEnumTypes.msgReaded) {
            if (res.chatType == sessionEnumTypes.visitor) {
              if (msgType == msgEnumTypes.newTransferEntry) {
                res.preview = "";
              }
              store.commit("UPDATE_SESSION_PREVIEW", res);
            } else if (res.chatType == sessionEnumTypes.friend) {
              store.commit("UPDATE_SESSION_COLLEAGUE_PREVIEW", res);
              let nickName = "";
              store.state.departmentUsers.forEach(item => {
                if (item.listUser) {
                  item.listUser.forEach(childItem => {
                    if (childItem.chatId == fromId) {
                      nickName = childItem.nickName == "" ? childItem.name : childItem.nickName;
                      return;
                    }
                  });
                }
              });
              res.nickName = nickName;
            }
            res.isActivity = currentSession.isActivity;
            Msg.notice(res);

            if (currentSession && currentSession.chatId == res.userId && currentSession.chatType == res.chatType) {
              let chatPanel = store.state.activityComponents[componentName];
              if (chatPanel) {
                chatPanel.pushMsg(res);
              }
            }
          }
        }
      });
  },
  rtc() {
    actionApi
      .rtc()
      .then(
        data => {
          if (data.state == -3 || data.state == 123) {
            return;
          }
          if (data.state == -2) {
            //超时
          } else if (data.state == 2) {
            //调取断层获取接口
            actionApi
              .getCacheMsg({
                startIndex: data.data.oldIdSeq,
                endIndex: data.data.idSeq
              })
              .then(
                data => {
                  let list = data.data.list;
                  if (list && list[0].msgId > store.state.currentSession.newMsgId) {
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
            if (data.data.idSeq - data.data.oldIdSeq > 1) {
              actionApi
                .getCacheMsg({
                  startIndex: data.data.oldIdSeq,
                  endIndex: data.data.idSeq
                })
                .then(
                  data => {
                    let list = data.data.list;
                    if (list && list[0].msgId > store.state.currentSession.newMsgId) {
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
            } else if (data.data.idSeq < data.data.oldIdSeq) {
            } else {
              this.onMessage(data.data);
            }
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
      chatType,
      isSeq: false,
      msg: JSON.stringify({
        mId: mId
      })
    });
  },
  //进入离开
  inout(data) {
    let visitorsJson = JSON.parse(data.body);
    let { fromId, sessionId, bodyFrom, toId } = data;
    const { currentSession, greetings, activityComponents } = store.state;
    if (visitorsJson.type == 1) {
      const sessionItem = {
        ...data,
        updateTime: data.time,
        isActivity: currentSession.sessionId && currentSession.sessionId == sessionId ? true : false,
        visitorId: fromId,
        sessionId: visitorsJson.sessionId || sessionId,
        name: visitorsJson.name
      };
      store.commit("ADD_SESSIONLISTS", {
        ...sessionItemPool(sessionItem),
        chatType: sessionEnumTypes.visitor,
        unread: currentSession && currentSession.sessionId == sessionId ? 0 : 1,
        preSessionId: visitorsJson.preSessionId
      });
      setTimeout(() => {
        if (greetings != null && bodyFrom != toId) {
          if (greetings.usStatus == 1) {
            let txtValue;
            txtValue = msgUtil.htmlToTxt(greetings.contentUs); //移除无用html标签
            actionApi
              .sendMsg({
                msgType: 1,
                toId: fromId,
                msg: txtValue,
                chatType: sessionEnumTypes.visitor
              })
              .then(data => {
                msgFormatTemplate
                  .formatMsgNew({
                    isSender: true,
                    bodyFrom: store.state.userId,
                    timeStamp: data.time,
                    id: data.msgId,
                    type: msgEnumTypes.text,
                    body: txtValue,
                    chatType: sessionEnumTypes.visitor,
                    userId: fromId,
                    fromName: store.state.userInfo.nickName
                  })
                  .then(res => {
                    let componentName = null;
                    if (res.chatType == sessionEnumTypes.visitor) {
                      componentName = "dialogue";
                      store.commit("UPDATE_SESSION_PREVIEW", res);
                    } else if (res.chatType == sessionEnumTypes.friend) {
                      componentName = "friendbox";
                      store.commit("UPDATE_SESSION_COLLEAGUE_PREVIEW", res);
                    }

                    if (currentSession && currentSession.chatId == res.userId && currentSession.chatType == res.chatType) {
                      let chatPanel = activityComponents[componentName];
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
            let waitCache = cacheWaitList.shift();
            if (waitCache) {
              store.commit("ADD_SESSIONLISTS", {
                ...sessionItemPool(waitCache),
                chatType: sessionEnumTypes.visitor,
                msgId: 0,
                unread: 0,
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
