import { EchatDB } from "@/session/indexedDB";
import { baseSession } from "../base";
export const officialDB = {
  //好友信息

  //好友信息end
  //单聊消息-------------- start---------------
  /**
   * 批量单聊消息更新
   * @param {*} userId 群ID
   * @param {*} record 消息集合
   */
  updatePrivateMsgBatch(userId, record) {
    userId = Number(userId);
    baseSession.updateMsgBatch(userId, record, EchatDB.officialDB);
  },

  /**
   * 单聊消息更新
   * @param {*} record 消息体
   */
  updatePrivateMsg(record) {
    baseSession.updateMsg(record, EchatDB.officialDB);
  },
  /**
   *
   * @param {*} userId
   * @param {*} maxMsgId 查询的最大消息ID
   * @param {*} pageSize
   */
  readPrivateMsgPage(userId, maxMsgId, pageSize) {
    return new Promise((resolve, reject) => {
      baseSession.openCursorMsgPage(resolve, EchatDB.officialDB, userId, maxMsgId, pageSize);
    });
  },
  /**
   * 移除指定会话所有消息
   */
  removeMsgAll(sessionId) {
    baseSession.removeMsgAll(EchatDB.officialDB, sessionId);
  },
  /**
   * 移除指定消息
   */
  removeMsg(sessionId, mId, isAll) {
    baseSession.removeMsg(EchatDB.officialDB, sessionId, mId, isAll);
  },
  /**
   * 清空所有缓存数据
   */
  clearMsg() {
    baseSession.clearMsg(EchatDB.officialDB);
  },
  /**
   * 定期清理
   * @param {*} sessionId
   * @param {*} lastTime
   * @param {*} cycle
   */
  regularCleaning(sessionId, lastTime, cycle) {
    baseSession.regularCleaning(sessionId, lastTime, cycle, EchatDB.officialDB);
  },
  editMsg(sessionId, mId, content) {
    baseSession.editMsg(sessionId, mId, content, EchatDB.officialDB);
  },
  setReadMsgBySessionId(sessionId, maxReadId) {
    baseSession.setReadMsgBySessionId(sessionId, EchatDB.officialDB, maxReadId);
  },
  //单聊消息---------------- end ------------
  /**
   * 获取本地消息
   * @param {*} sessionId
   * @param {*} mId
   */
  getLocalMsg(resolve, sessionId, mId) {
    baseSession.getLocalMsg(resolve, sessionId, mId, EchatDB.officialDB);
  },
  /**
   * 获取本地音视频文件
   * @param {*} resolve
   * @param {*} sessionId
   */
  getLocalImgAndVideo(resolve, sessionId) {
    baseSession.getLocalMsgByType(resolve, sessionId, [3, 5], EchatDB.officialDB);
  },
  vagueFind(resolve, keyWord) {
    baseSession.vagueFind(resolve, keyWord, EchatDB.officialDB);
  },
  /**
   * 更新消息已读
   * @param {*} userId 用户ID
   * @param {*} mId 消息ID
   */
  updateMsgRead(userId, mId) {
    baseSession.updateMsgRead(userId, mId, EchatDB.officialDB);
  }
};
