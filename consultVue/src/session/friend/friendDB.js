import { EchatDB } from "@/session/indexedDB";
import { baseSession } from "../base"; 
export const friendDB = {
  //好友信息end
  //单聊消息-------------- start---------------
  /**
   * 批量单聊消息更新
   * @param {*} userId 群ID
   * @param {*} record 消息集合
   */
  updatePrivateMsgBatch(userId, record) {
    userId=Number(userId);
    baseSession.updateMsgBatch(userId,record,EchatDB.msgTN);
  },

  /**
   * 单聊消息更新
   * @param {*} userId 群ID
   * @param {*} record 消息体
   */
  updatePrivateMsg(userId, record) {
      record.userId=Number(userId);
      baseSession.updateMsg(userId,record,EchatDB.msgTN);
  },
  /**
   * 
   * @param {*} userId 
   * @param {*} maxMsgId 查询的最大消息ID
   * @param {*} pageSize 
   */
  readPrivateMsgPage(userId,maxMsgId,pageSize){
    return new Promise((resolve, reject) => {
        baseSession.openCursorMsgPage(resolve,EchatDB.msgTN,userId,maxMsgId,pageSize);
    })
  },
  /**
   * 清空所有缓存数据
   */
  clearMsg(){
    baseSession.clearMsg(EchatDB.msgTN);
  },
      /**
   * 获取本地音视频文件
   * @param {*} resolve 
   * @param {*} sessionId 
   */
getLocalImgAndVideo(resolve,sessionId){
    baseSession.getLocalMsgByType(resolve,sessionId,[3,5],EchatDB.msgTN); 
},
vagueFind(resolve,keyWord){
  baseSession.vagueFind(resolve,keyWord,EchatDB.msgTN); 
},
updateMsgRead(mId){
  baseSession.updateMsgRead(mId,EchatDB.msgTN); 
}
}