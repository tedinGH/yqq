import store from "@/store";
import { actionApi } from "@/api";
import { visitorDB } from "./visitorDB";
export const visitor = {
  sessionType: 2,
  activeLength: 0, //当前活跃长度
  /**
   * 获取访客消息
   * @param {*} sessionId 服务号ID
   * @param {*} maxMsgId 查询的最大消息ID
   * @param {*} firstMsgId 截止ID
   * @param {*} pageSize 页面大小
   * @returns  {firstMsgid:1,data:data} 数据集
   */
  getMsg(sessionId, maxMsgId, firstMsgId, pageSize = 20) {
    sessionId = Number(sessionId);
    maxMsgId = Number(maxMsgId);
    firstMsgId = Number(firstMsgId);

    return new Promise(resolve => {
      if (maxMsgId != null && maxMsgId <= firstMsgId) {
        return resolve([]);
      }
      visitorDB.readServiceMsgPage(sessionId, maxMsgId, pageSize).then(data => {
        // data.sort((x,y)=>{return x.id-y.id})
        return resolve(
          data.sort((x, y) => {
            return x.id - y.id;
          })
        );
      });
    });
  },
  /**
   * 消息更新
   * @param {*} sessionId
   * @param {*} data
   */
  updateMsg(data) {
    //更新数据库
    visitorDB.updateServiceMsg(data);
  },

  updateMsgBatch(sessionId, data) {
    //更新数据库
    sessionId = Number(sessionId);
    visitorDB.updateServiceMsgBatch(sessionId, data);
  },
  /**
   * 移除指定会话所有消息
   */
  removeMsgAll(sessionId) {
    visitorDB.removeMsgAll(sessionId);
  },
  /**
   * 移除指定消息
   */
  removeMsg(sessionId, mId, isAll) {
    visitorDB.removeMsg(sessionId, mId, isAll);
  },
  /**
   * 清空所有缓存数据
   */
  clearMsg() {
    visitorDB.clearMsg();
  },
  /**
   * 定期清理
   * @param {*} sessionId
   * @param {*} lastTime
   * @param {*} cycle
   */
  regularCleaning(sessionId, lastTime, cycle) {
    visitorDB.regularCleaning(sessionId, lastTime, cycle);
  },
  editMsg(sessionId, mId, content) {
    visitorDB.editMsg(sessionId, mId, content);
  },
  setReadMsgBySessionId(sessionId, maxReadId) {
    visitorDB.setReadMsgBySessionId(sessionId, maxReadId);
  },
  /**
   * 获取断层消息
   * @param {*} resolve
   * @param {*} record
   * @param {*} obj
   * @param {*} rData
   * @param {*} sessionId
   */
  httpGet(resolve, record, obj, rData, sessionId) {
    actionApi.getMesssages(obj).then(data => {
      if (data != undefined) {
        let data1 = Object.values(data);
        this.activeLength = data1.length;
        //去重？
        if (this.activeLength == 0) {
          record.firstMsgId = obj.minId;
          record.data = rData;
          return resolve(record);
        } else {
          if (data1.length < obj.pageSize) {
            //重置firstMsgId
            record.firstMsgId = data1[0].mId;
          }
          let cache = this.removalDuplicate(rData, data1);
          visitorDB.updateServiceMsgBatch(sessionId, cache);
          record.data = cache;
          return resolve(record);
        }
      } else {
        record.firstMsgId = obj.minId - 1;
        record.data = rData;
        return resolve(record);
      }
    });
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
      cache[a.id] = a;
    }
    for (let i = data1.length - 1; i >= 0; i--) {
      let a = data1[i];
      let b = cache[a.id];
      if (b) {
        b.body = a.body;
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
   * 获取服务号信息
   * @param {*} sessionId
   */
  getChatInfo(sessionId) {
    let chatInfo = {};
    chatInfo.userId = sessionId;
    switch (sessionId) {
      case 1000150:
        chatInfo.headImg = "./static/images/logo.png";
        chatInfo.nickName = "EchatAPP";
        break;
      case 1000100:
        chatInfo.headImg = "./static/images/chat/img-pay.png";
        chatInfo.nickName = "EchatAPP Pay";
        break;
      default:
        return;
    }
    return chatInfo;
  },
  /**
   * 获取本地消息
   * @param {*} sessionId
   * @param {*} mId
   */
  getLocalMsg(sessionId, mId) {
    return new Promise(resolve => {
      visitorDB.getLocalMsg(resolve, sessionId, mId);
    });
  },
  /**
   * 获取本地消息
   * @param {*} sessionId
   * @param {*} mId
   */
  getLocalImgAndVideo(sessionId) {
    return new Promise(resolve => {
      visitorDB.getLocalImgAndVideo(resolve, sessionId);
    });
  },
  vagueFind(keyWord) {
    return new Promise(resolve => {
      visitorDB.vagueFind(resolve, keyWord);
    });
  },
  /**
   * 更新消息已读
   * @param {*} userId 用户ID
   * @param {*} mId 消息ID
   */
  updateMsgRead(userId, mId) {
    visitorDB.updateMsgRead(userId, mId);
  }
};
