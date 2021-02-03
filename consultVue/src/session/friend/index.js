import { actionApi } from "@/api";
import store from "@/store";
import { friendDB } from "./friendDB"; 
export const friend = {
    sessionType:0,
    tempHeadImg: "./static/images/chat/img-username.png",
    activeLength:0,//当前活跃长度

/**
   * 获取单聊消息
   * @param {*} sessionId 用户ID
   * @param {*} maxMsgId 需要获取的最小ID
   * @param {*} firstMsgId 截止ID
   * @param {*} pageSize 页面大小
   */
  getMsg(sessionId,maxMsgId,firstMsgId,pageSize=20){
    sessionId=Number(sessionId);
    maxMsgId=Number(maxMsgId);
    firstMsgId=Number(firstMsgId);
    return new Promise(resolve => {
        if(maxMsgId!=null&&maxMsgId<=firstMsgId){
            return resolve({firstMsgId:firstMsgId,paramId:sessionId,fromType:this.sessionType});
        }
        friendDB.readPrivateMsgPage(sessionId,maxMsgId,pageSize).then(data => {
          resolve(data);           
        });
      });
  },




/**
 * 消息更新
 * @param {*} sessionId 
 * @param {*} data 
 */
  updateMsg(sessionId,data){
    //更新数据库
    sessionId=Number(sessionId);
    friendDB.updatePrivateMsg(sessionId,data);
  },
  updateMsgBatch(sessionId,data){
    //更新数据库
    sessionId=Number(sessionId);
    friendDB.updatePrivateMsgBatch(sessionId,data);
  },

  /**
   * 清空所有缓存数据
   */
  clearMsg(){
    friendDB.clearMsg();
  },
    /**
     * 获取本地消息
     * @param {*} sessionId 
     * @param {*} mId 
     */
    getLocalImgAndVideo(sessionId){
        return new Promise(resolve => {
            friendDB.getLocalImgAndVideo(resolve,sessionId);
        })
    },
    vagueFind(keyWord){
        return new Promise(resolve => {
            friendDB.vagueFind(resolve,keyWord);
        })
    },
    updateMsgRead(mId){
      friendDB.updateMsgRead(mId);
    },
}