import { EchatDB } from "@/session/indexedDB";
import { baseSession } from "../base";
export const visitorDB = {
  //服务号消息-------------- start---------------
  /**
   * 批量服务号消息更新
   * @param {*} userId 群ID
   * @param {*} record 消息集合
   */
  updateServiceMsgBatch(userId, record) {
    userId = Number(userId);
    baseSession.updateMsgBatch(userId, record, EchatDB.msgVisitorTN);
  },

  /**
   * 服务号消息更新
   * @param {*} userId 群ID
   * @param {*} record 消息体
   */
  updateServiceMsg(record) {
    baseSession.updateMsg(record, EchatDB.msgVisitorTN);
  },
  /**
   *
   * @param {*} userId
   * @param {*} maxMsgId 查询的最大消息ID
   * @param {*} pageSize
   */
  readServiceMsgPage(userId, maxMsgId, pageSize) {
    return new Promise((resolve, reject) => {
      baseSession.openCursorMsgPage(
        resolve,
        EchatDB.msgVisitorTN,
        userId,
        maxMsgId,
        pageSize
      );
    });
  },
  /**
   * 移除指定会话所有消息
   */
  removeMsgAll(sessionId) {
    baseSession.removeMsgAll(EchatDB.msgVisitorTN, sessionId);
  },
  /**
   * 移除指定消息
   */
  removeMsg(sessionId, mId, isAll) {
    baseSession.removeMsg(EchatDB.msgVisitorTN, sessionId, mId, isAll);
  },
  /**
   * 清空所有缓存数据
   */
  clearMsg() {
    baseSession.clearMsg(EchatDB.msgVisitorTN);
  },
  /**
   * 定期清理
   * @param {*} sessionId
   * @param {*} lastTime
   * @param {*} cycle
   */
  regularCleaning(sessionId, lastTime, cycle) {
    baseSession.regularCleaning(
      sessionId,
      lastTime,
      cycle,
      EchatDB.msgVisitorTN
    );
  },
  editMsg(sessionId, mId, content) {
    baseSession.editMsg(sessionId, mId, content, EchatDB.msgVisitorTN);
  },
  setReadMsgBySessionId(sessionId, maxReadId) {
    baseSession.setReadMsgBySessionId(
      sessionId,
      EchatDB.msgVisitorTN,
      maxReadId
    );
  },
  //服务号消息---------------- end ------------
  /**
   * 获取本地消息
   * @param {*} sessionId
   * @param {*} mId
   */
  getLocalMsg(resolve, sessionId, mId) {
    baseSession.getLocalMsg(resolve, sessionId, mId, EchatDB.msgVisitorTN);
  },

  /**
   * 获取本地音视频文件
   * @param {*} resolve
   * @param {*} sessionId
   */
  getLocalImgAndVideo(resolve, sessionId) {
    baseSession.getLocalMsgByType(
      resolve,
      sessionId,
      [3, 5],
      EchatDB.msgVisitorTN
    );
  },
  vagueFind(resolve, keyWord) {
    baseSession.vagueFind(resolve, keyWord, EchatDB.msgVisitorTN);
  },
  /**
   * 更新消息已读
   * @param {*} userId 用户ID
   * @param {*} mId 消息ID
   */
  updateMsgRead(userId, mId) {
    baseSession.updateMsgRead(userId, mId, EchatDB.msgVisitorTN);
  }
};
