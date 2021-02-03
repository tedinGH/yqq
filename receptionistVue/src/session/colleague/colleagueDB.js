import { EchatDB } from "@/session/indexedDB"
import { baseSession } from "../base" 
export const colleagueDB = {
//好友信息

  //好友信息end
  //单聊消息-------------- start---------------
  /**
   * 批量单聊消息更新
   * @param {*} userId 群ID
   * @param {*} record 消息集合
   */
  updatePrivateMsgBatch(userId, record) {
    userId=Number(userId)
    baseSession.updateMsgBatch(userId,record,EchatDB.msgColleagueTN)
  },

  /**
   * 单聊消息更新
   * @param {*} record 消息体
   */
  updatePrivateMsg(record) {
      baseSession.updateMsg(record,EchatDB.msgColleagueTN)
  },
  /**
   * 
   * @param {*} userId 
   * @param {*} maxMsgId 查询的最大消息ID
   * @param {*} pageSize 
   */
  readPrivateMsgPage(userId,maxMsgId,pageSize){
    return new Promise((resolve, reject) => {
        baseSession.openCursorMsgPage(resolve,EchatDB.msgColleagueTN,userId,maxMsgId,pageSize)
    })
  },
  /**
   * 移除指定会话所有消息
   */
  removeMsgAll(sessionId){
    baseSession.removeMsgAll(EchatDB.msgColleagueTN,sessionId)
  },
  /**
   * 移除指定消息
   */
  removeMsg(sessionId,mId,isAll){
    baseSession.removeMsg(EchatDB.msgColleagueTN,sessionId,mId,isAll)
  },
  /**
   * 清空所有缓存数据
   */
  clearMsg(){
    baseSession.clearMsg(EchatDB.msgColleagueTN)
  },
    /**
   * 定期清理
   * @param {*} sessionId 
   * @param {*} lastTime 
   * @param {*} cycle 
   */
  regularCleaning(sessionId, lastTime, cycle){
    baseSession.regularCleaning(sessionId, lastTime, cycle, EchatDB.msgColleagueTN)
  },
  editMsg(sessionId, mId, content){
    baseSession.editMsg(sessionId,mId,content,EchatDB.msgColleagueTN)
  },
  setReadMsgBySessionId(sessionId,maxReadId){
    baseSession.setReadMsgBySessionId(sessionId,EchatDB.msgColleagueTN,maxReadId)
  },
  //单聊消息---------------- end ------------
        /**
     * 获取本地消息
     * @param {*} sessionId 
     * @param {*} mId 
     */
    getLocalMsg(resolve,sessionId,mId){
        baseSession.getLocalMsg(resolve,sessionId,mId,EchatDB.msgColleagueTN)
    },
      /**
   * 获取本地音视频文件
   * @param {*} resolve 
   * @param {*} sessionId 
   */
getLocalImgAndVideo(resolve,sessionId){
    baseSession.getLocalMsgByType(resolve,sessionId,[3,5],EchatDB.msgColleagueTN) 
},
vagueFind(resolve,keyWord){
  baseSession.vagueFind(resolve,keyWord,EchatDB.msgColleagueTN) 
},
  /**
   * 更新消息已读
   * @param {*} userId 用户ID
   * @param {*} mId 消息ID
   */
  updateMsgRead(userId,mId){
    baseSession.updateMsgRead(userId,mId,EchatDB.msgColleagueTN)
  },
}