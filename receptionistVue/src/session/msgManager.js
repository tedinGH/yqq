/**
 * 消息管理器
 *
 */
import { sessionEnum } from "@/common/enum";
import { group } from "@/session/group";
import { visitor } from "@/session/visitor";
import { colleague } from "@/session/colleague";
import { api } from "../api";
import store from "@/store";

export const msgManager = {
  activeId: 0, //当前活跃ID
  /**
   * 获取消息
   * @param {*} fromType
   * @param {*} sessionId
   * @param {*} maxMsgId
   * @param {*} firstMsgId
   * @param {boolean} isMore 是否上拉加载
   * @param {*} pageSize
   */
  getMsg(fromType, sessionId, maxMsgId, firstMsgId, isMore, pageSize = 20, currentPage) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    // if(this.activeId==sessionId){
    if (isMore) {
      maxMsgId--;
    } else {
      this.activeId = sessionId;
    }
    return new Promise(resolve => {
      if (fromType == sessionEnum.friend) {
        //同事聊天消息
        colleague.getMsg(sessionId, maxMsgId, firstMsgId, pageSize, currentPage).then(data => {
          // console.log(data);
          resolve(data);
        });
      } else if (fromType == sessionEnum.group) {
        //群聊消息
        group.getMsg(sessionId, maxMsgId, firstMsgId, pageSize).then(data => {
          resolve(data);
        });
      } else if (fromType == sessionEnum.visitor) {
        //访客消息
        visitor.getMsg(sessionId, maxMsgId, firstMsgId, pageSize).then(data => {
          resolve(data);
        });
      } else {
        resolve();
      }
    });
  },

  /**
   * 更新指定消息
   * @param {*} fromType 会话类型
   * @param {*} sessionId 会话ID
   * @param {*} data 消息
   */
  updateMsg(fromType, data) {
    fromType = Number(fromType);
    if (fromType == 0) {
      //单聊消息
      colleague.updateMsg(data);
    } else if (fromType == 1) {
      //群聊消息
      group.updateMsg(data);
    } else if (fromType == 10) {
      //服务号消息
      // console.log(data);
      visitor.updateMsg(data);
    } else {
    }
  },
  updateMsgBatch(fromType, sessionId, data) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    if (fromType == 0) {
      //单聊消息
      colleague.updateMsgBatch(sessionId, data);
    } else if (fromType == 1) {
      //群聊消息
      group.updateMsgBatch(sessionId, data);
    } else if (fromType == 10) {
      //服务号消息
      visitor.updateMsgBatch(sessionId, data);
    } else {
    }
  },
  /**
   * 移除指定会话所有消息
   */
  removeMsgAll(fromType, sessionId) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    if (fromType == 0) {
      //单聊消息
      colleague.removeMsgAll(sessionId);
    } else if (fromType == 1) {
      //群聊消息
      group.removeMsgAll(sessionId);
    } else if (fromType == 10) {
      //服务号消息
      visitor.removeMsgAll(sessionId);
    } else {
    }
  },
  /**
   * 移除指定消息
   */
  removeMsg(fromType, sessionId, mId, isAll) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    mId = Number(mId);
    if (fromType == 0) {
      //单聊消息
      colleague.removeMsg(sessionId, mId, isAll);
    } else if (fromType == 1) {
      //群聊消息
      group.removeMsg(sessionId, mId, isAll);
    } else if (fromType == 10) {
      //服务号消息
      visitor.removeMsg(sessionId, mId, isAll);
    } else {
    }
  },
  /**
   * 清空所有缓存数据
   */
  clearMsg(fromType) {
    fromType = Number(fromType);
    if (fromType == 0) {
      //单聊消息
      colleague.clearMsg();
    } else if (fromType == 1) {
      //群聊消息
      group.clearMsg();
    } else if (fromType == 10) {
      //服务号消息
      visitor.clearMsg();
    } else {
    }
  },
  /**
   * 定期清理
   * @param {*} sessionId
   * @param {*} lastTime
   * @param {*} cycle
   */
  regularCleaning(fromType, sessionId, lastTime, cycle) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    if (fromType == 0) {
      //单聊消息
      colleague.regularCleaning(sessionId, lastTime, cycle);
    } else if (fromType == 1) {
      //群聊消息
      group.regularCleaning(sessionId, lastTime, cycle);
    } else if (fromType == 10) {
      //服务号消息
      visitor.regularCleaning(sessionId, lastTime, cycle);
    } else {
    }
  },
  /**
   * 消息编辑
   * @param {*} fromType
   * @param {*} sessionId
   * @param {*} mId
   * @param {*} content
   */
  editMsg(fromType, sessionId, mId, content) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    mId = Number(mId);
    if (fromType == 0) {
      //单聊消息
      colleague.editMsg(sessionId, mId, content);
    } else if (fromType == 1) {
      //群聊消息
      group.editMsg(sessionId, mId, content);
    } else if (fromType == 10) {
      //服务号消息
      visitor.editMsg(sessionId, mId, content);
    } else {
    }
  },
  setReadMsgBySessionId(fromType, sessionId, maxReadId) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    if (fromType == 0) {
      //单聊消息
      colleague.setReadMsgBySessionId(sessionId, maxReadId);
    } else if (fromType == 1) {
      //群聊消息
      group.setReadMsgBySessionId(sessionId, maxReadId);
    } else if (fromType == 10) {
      //服务号消息
      visitor.setReadMsgBySessionId(sessionId, maxReadId);
    } else {
    }
  },

  showPage(list) {
    let userId = store.state.userInfo.userId;
    let messages = store.state.message;
    let cacheMessages = {};
    for (let key in messages) {
      if (key > 1000000000) {
        cacheMessages[key] = messages[key];
      }
    }
    for (let key in list) {
      let msgItem = list[key];
      if (msgItem.bodyFrom == userId) {
        for (let key1 in cacheMessages) {
          let cache = cacheMessages[key1];
          if (msgItem.bodyContent == cache.bodyContent) {
            store.commit("DELETE_MESSAGE", key1);
            delete cacheMessages[key1];
            break;
          }
        }
      }
      let history = {
        bodyContent: msgItem.bodyContent,
        msgContent: msgItem.msgContent,
        bodyFrom: msgItem.bodyFrom,
        preview: msgItem.preview,
        checked: false,
        chatInfo: msgItem.chatInfo,
        noChatInfo: msgItem.noChatInfo
      };
      store.commit("UPDATE_MESSAGE", history);
    }
  },
  /**
   * 获取本地消息
   * @param {*} fromType
   * @param {*} sessionId
   * @param {*} mId
   */
  getLocalMsg(fromType, sessionId, mId) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    mId = Number(mId);
    return new Promise(resolve => {
      if (fromType == 0) {
        //单聊消息
        colleague.getLocalMsg(sessionId, mId).then(data => {
          resolve(data);
        });
      } else if (fromType == 1) {
        //群聊消息
        group.getLocalMsg(sessionId, mId).then(data => {
          resolve(data);
        });
      } else if (fromType == 10) {
        //服务号消息
        visitor.getLocalMsg(sessionId, mId).then(data => {
          resolve(data);
        });
      } else {
        resolve();
      }
    });
  },
  /**
   * 获取本地消息
   * @param {*} sessionId
   * @param {*} mId
   */
  getLocalImgAndVideo(fromType, sessionId) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    return new Promise(resolve => {
      if (fromType == 0) {
        //单聊消息
        colleague.getLocalImgAndVideo(sessionId).then(data => {
          resolve(data);
        });
      } else if (fromType == 1) {
        //群聊消息
        group.getLocalImgAndVideo(sessionId).then(data => {
          resolve(data);
        });
      } else if (fromType == 10) {
        //服务号消息
        visitor.getLocalImgAndVideo(sessionId).then(data => {
          resolve(data);
        });
      } else {
        resolve();
      }
    });
  },
  /**
   * 模糊搜索
   * @param {*} keyWord 关键字
   * @param {function } callback 回调函数
   */
  vagueFind(keyWord, callback) {
    //单聊消息
    colleague.vagueFind(keyWord).then(data => {
      callback(data, 0);
    });
    //群聊消息
    group.vagueFind(keyWord).then(data => {
      callback(data, 1);
    });
    //服务号消息
    visitor.vagueFind(keyWord).then(data => {
      callback(data, 2);
    });
  },

  /**
   * 跳转到指定消息ID
   * @param {*} fromType
   * @param {*} sessionId
   * @param {*} maxMsgId
   * @param {*} firstMsgId
   * @param {*} specifyMsgId
   * @param {*} callback
   */
  skipSpecifyMsg(fromType, sessionId, maxMsgId, firstMsgId, specifyMsgId, callback) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    if (this.activeId == sessionId) {
      maxMsgId--;
    } else {
      this.activeId = sessionId;
    }
    let pageSize = 30;
    if (fromType == 0) {
      //单聊消息
      colleague.getMsg(sessionId, maxMsgId, firstMsgId, pageSize).then(data => {
        this.skipSpecifyMsgTwo(fromType, sessionId, firstMsgId, specifyMsgId, data, callback);
      });
    } else if (fromType == 1) {
      //群聊消息
      group.getMsg(sessionId, maxMsgId, firstMsgId, pageSize).then(data => {
        this.skipSpecifyMsgTwo(fromType, sessionId, firstMsgId, specifyMsgId, data, callback);
      });
    } else if (fromType == 10) {
      //服务号消息
      visitor.getMsg(sessionId, maxMsgId, firstMsgId, pageSize).then(data => {
        this.skipSpecifyMsgTwo(fromType, sessionId, firstMsgId, specifyMsgId, data, callback);
      });
    }
  },

  skipSpecifyMsgTwo(fromType, sessionId, firstMsgId, specifyMsgId, record, callback) {
    if (specifyMsgId <= record.firstMsgId && record.firstMsgId > 1) {
      specifyMsgId = record.firstMsgId;
      //不在循环
      callback(record);
      return;
    }
    let data = record.data;
    let miniMsgId;
    if (data != undefined) {
      if (data.constructor == Array && data.length > 0) {
        miniMsgId = data[data.length - 1].mId;
      } else {
        let cData = Object.values(data);
        cData.sort((a, b) => b.timeStamp - a.timeStamp); //倒叙
        let b = cData[cData.length - 1];
        if (b != undefined) {
          miniMsgId = b.mId;
        }
      }
      if (miniMsgId != undefined) {
        callback(record);
        if (specifyMsgId < miniMsgId) {
          this.skipSpecifyMsg(fromType, sessionId, miniMsgId, firstMsgId, specifyMsgId, callback);
        }
      }
    }
  },

  /**
   * 更新消息已读
   * @param {*} chatType 会话类型
   * @param {*} userId  用户ID
   * @param {*} mId  消息ID
   */
  updateMsgRead(chatType, userId, mId) {
    if (chatType == sessionEnum.friend) {
      //单聊消息
      colleague.updateMsgRead(userId, mId);
    } else if (chatType == sessionEnum.group) {
      //群聊消息
      group.updateMsgRead(userId, mId);
    } else if (chatType == sessionEnum.visitor) {
      //访客消息
      visitor.updateMsgRead(userId, mId);
    }
  }
};
