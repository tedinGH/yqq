import store from "@/store";
import { actionApi } from "@/api";
import { colleagueDB } from "./colleagueDB";
import { msgFormatTemplate } from "@/tools/msgFormatTemplate";
export const colleague = {
  sessionType: 0,
  tempHeadImg: "./static/images/chat/img-username.png",
  activeLength: 0, //当前活跃长度

  /**
   * 获取单聊消息
   * @param {*} sessionId 用户ID
   * @param {*} maxMsgId 需要获取的最小ID
   * @param {*} firstMsgId 截止ID
   * @param {*} pageSize 页面大小
   */
  getMsg(sessionId, maxMsgId, firstMsgId, pageSize = 20, currentPage) {
    sessionId = Number(sessionId);
    maxMsgId = Number(maxMsgId);
    firstMsgId = Number(firstMsgId);
    return new Promise(resolve => {
      if (maxMsgId != null && maxMsgId <= firstMsgId) {
        return resolve([]);
      }
      colleagueDB.readPrivateMsgPage(sessionId, maxMsgId, pageSize).then(data => {
        data.sort((x, y) => {
          return x.id - y.id;
        });
        // 本地数据库数据时,拉取接口数据。
        if (data.length == 0) {
          if (maxMsgId > 0) {
            return this.getNetworkMsgList(maxMsgId, 0, sessionId, data, resolve, false, pageSize, currentPage);
          }
        } else {
          data.sort((x, y) => {
            return x.id - y.id;
          });
          let cacheMsg = data[data.length - 1];
          if (cacheMsg.id < maxMsgId) {
            return this.getNetworkMsgList(maxMsgId, cacheMsg.id + 1, sessionId, data, resolve, false, pageSize, currentPage);
          } else {
            if (data.length < 30 && data[0].id > 1) {
              return this.getNetworkMsgList(data[0].id + 1, 0, sessionId, data, resolve, true, pageSize, currentPage);
            }
          }
        }
        return resolve(data);
      });
    });
  },
  async getNetworkMsgList(startId, endId, sessionId, localMsgList, resolve, isAll = false) {
    let data = await actionApi.getMsgListByMid({
      startId: startId,
      endId: endId,
      sessionId: sessionId,
      sessionType: 0
    });
    //保存
    data = data.data;
    for (let i = 0; i < data.length; i++) {
      let cd = data[i];
      let data1 = await msgFormatTemplate.formatMsgNew({
        isSender: store.getters.userId == cd.fromId,
        bodyFrom: cd.fromId,
        timeStamp: cd.createTime,
        id: cd.msgId,
        type: cd.msgType,
        body: cd.msg,
        chatType: 0,
        userId: sessionId
      });
      data[i] = data1;
    }
    if (isAll) {
      localMsgList.push.apply(localMsgList, data);
    } else {
      if (data.length == 30) {
        data.sort((x, y) => {
          return x.id - y.id;
        });
        if (data[0].id == endId) {
          localMsgList.push.apply(localMsgList, data);
        }
        localMsgList = data;
      } else {
        localMsgList.push.apply(localMsgList, data);
      }
    }
    localMsgList.sort((x, y) => {
      return x.id - y.id;
    });
    resolve(localMsgList);
  },

  /**
   * 去重
   * @param {*} rData
   * @param {*} data1
   */
  removalDuplicate(rData, data1) {
    let cache = {};
    for (let key in rData) {
      let a = rData[key];
      cache[a.mId] = a;
    }
    for (let i = data1.length - 1; i >= 0; i--) {
      let a = data1[i];
      let b = cache[a.mId];
      if (b) {
        b.bodyContent = a.bodyContent;
        b.bodyFrom = a.bodyFrom;
        b.preview = a.preview;
        b.checked = a.checked;
        b.readNum = a.readNum;
      } else {
        cache[a.mId] = a;
      }
    }
    return cache;
  },

  /**
   * 消息更新
   * @param {*} data
   */
  updateMsg(data) {
    //更新数据库
    colleagueDB.updatePrivateMsg(data);
  },
  updateMsgBatch(sessionId, data) {
    //更新数据库
    sessionId = Number(sessionId);
    colleagueDB.updatePrivateMsgBatch(sessionId, data);
  },

  /**
   * 获取网络请求资源
   * @param {*} userId
   */
  getNetworkSession(userId) {
    userId = Number(userId);
    return new Promise(resolve => {
      actionApi.getTempFriendInfo({ sessionId: userId }).then(data => {
        data.checked = false;
        data.nickName = data.notes || data.nickName || data.userName;
        if (data.avatar) data.headImg = data.avatar;
        //else data.headImg = this.tempHeadImg
        colleagueDB.updateFriend(userId, data);
        //更新当前session
        let currentSessionCache = store.state.currentSession;
        if (currentSessionCache) {
          if (currentSessionCache.paramId == userId) {
            currentSessionCache = JSON.parse(JSON.stringify(currentSessionCache));
            currentSessionCache.name = data.nickName;
            currentSessionCache.img = data.headImg;
            store.commit("UPDATE_CURRENT_SESSION", currentSessionCache);
          }
        }

        //更新sessionList
        let sessionCache = store.state.session.record[userId + "-0"];
        if (sessionCache) {
          sessionCache = JSON.parse(JSON.stringify(sessionCache));
          sessionCache.name = data.nickName;
          sessionCache.img = data.headImg;
          store.commit("UPDATE_SESSION", sessionCache);
        }
        return resolve(data);
      });
    });
  },
  /**
   * 获取网络好友请求配置信息
   * @param {*} userId
   */
  getNetworkFriendInfo(userId) {
    userId = Number(userId);
    return new Promise(resolve => {
      actionApi.searchInfo({ ids: userId }).then(data => {
        data = data[0];
        data.checked = false;
        data.nickName = data.notes || data.nickName || data.userName;
        if (data.avatar) {
          data.headImg = data.avatar;
        }

        //else data.headImg = this.tempHeadImg
        // colleagueDB.updateFriend(userId,data)
        store.commit("ADD_FRIEND_INFO", { userId, info: data });
        return resolve(data);
      });
    });
  },
  /**
   * 移除指定会话所有消息
   */
  removeMsgAll(sessionId) {
    colleagueDB.removeMsgAll(sessionId);
  },
  /**
   * 移除指定消息
   */
  removeMsg(sessionId, mId, isAll) {
    colleagueDB.removeMsg(sessionId, mId, isAll);
  },
  /**
   * 清空所有缓存数据
   */
  clearMsg() {
    colleagueDB.clearMsg();
  },
  /**
   * 定期清理
   * @param {*} sessionId
   * @param {*} lastTime
   * @param {*} cycle
   */
  regularCleaning(sessionId, lastTime, cycle) {
    colleagueDB.regularCleaning(sessionId, lastTime, cycle);
  },
  editMsg(sessionId, mId, content) {
    colleagueDB.editMsg(sessionId, mId, content);
  },
  setReadMsgBySessionId(sessionId, maxReadId) {
    colleagueDB.setReadMsgBySessionId(sessionId, maxReadId);
  },

  /**
   * 获取聊天信息
   * @param {*} sessionId
   */
  getChatInfo(sessionId) {
    //好友-非好友的区分？
    let chatInfo = {};
    chatInfo.userId = sessionId;
    return new Promise(resolve => {
      this.getFriend(sessionId).then(data => {
        if (data) {
          chatInfo.headImg = data.headImg;
          chatInfo.nickName = data.nickName;
          chatInfo.isTop = data.isTop;
          chatInfo.isInterruption = data.isInterruption;
          chatInfo.isBanned = data.isBanned;
          chatInfo.alias = data.alias || "";
          return resolve(chatInfo);
        } else {
          return resolve();
        }
      });
    });
  },
  /**
   * 获取本地消息
   * @param {*} sessionId
   * @param {*} mId
   */
  getLocalMsg(sessionId, mId) {
    return new Promise(resolve => {
      colleagueDB.getLocalMsg(resolve, sessionId, mId);
    });
  },
  /**
   * 获取本地消息
   * @param {*} sessionId
   * @param {*} mId
   */
  getLocalImgAndVideo(sessionId) {
    return new Promise(resolve => {
      colleagueDB.getLocalImgAndVideo(resolve, sessionId);
    });
  },
  vagueFind(keyWord) {
    return new Promise(resolve => {
      colleagueDB.vagueFind(resolve, keyWord);
    });
  },
  /**
   * 更新消息已读
   * @param {*} userId 用户ID
   * @param {*} mId 消息ID
   */
  updateMsgRead(userId, mId) {
    colleagueDB.updateMsgRead(userId, mId);
  }
};
