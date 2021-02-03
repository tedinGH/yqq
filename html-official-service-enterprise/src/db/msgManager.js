/**
 * 消息管理器
 *
 */
import { official } from "@/db/official";
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
  getMsg(fromType, sessionId, maxMsgId, firstMsgId, isMore, pageSize = 20) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    // if(this.activeId==sessionId){
    if (isMore) {
      maxMsgId--;
    } else {
      this.activeId = sessionId;
    }
    return new Promise(resolve => {
      official.getMsg(sessionId, maxMsgId, firstMsgId, pageSize).then(data => {
        // console.log(data);
        resolve(data);
      });
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
    official.updateMsg(data);
  },
  updateMsgBatch(fromType, sessionId, data) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    official.updateMsgBatch(sessionId, data);
  },
  /**
   * 移除指定会话所有消息
   */
  removeMsgAll(fromType, sessionId) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    official.removeMsgAll(sessionId);
  },
  /**
   * 移除指定消息
   */
  removeMsg(fromType, sessionId, mId, isAll) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    mId = Number(mId);
    official.removeMsg(sessionId, mId, isAll);
  },
  /**
   * 清空所有缓存数据
   */
  clearMsg(fromType) {
    fromType = Number(fromType);
    official.clearMsg();
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
    official.regularCleaning(sessionId, lastTime, cycle);
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
    official.editMsg(sessionId, mId, content);
  },
  setReadMsgBySessionId(fromType, sessionId, maxReadId) {
    fromType = Number(fromType);
    sessionId = Number(sessionId);
    official.setReadMsgBySessionId(sessionId, maxReadId);
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
      official.getLocalMsg(sessionId, mId).then(data => {
        resolve(data);
      });
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
      official.getLocalImgAndVideo(sessionId).then(data => {
        resolve(data);
      });
    });
  },
  /**
   * 模糊搜索
   * @param {*} keyWord 关键字
   * @param {function } callback 回调函数
   */
  vagueFind(keyWord, callback) {
    //公众号消息
    official.vagueFind(keyWord).then(data => {
      callback(data, 0);
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
    official.getMsg(sessionId, maxMsgId, firstMsgId, pageSize).then(data => {
      this.skipSpecifyMsgTwo(fromType, sessionId, firstMsgId, specifyMsgId, data, callback);
    });
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
    official.updateMsgRead(userId, mId);
  }
};
