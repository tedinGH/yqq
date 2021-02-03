/**
 * 消息管理器
 * 
 */
import { friend } from "@/session/friend";
import store from "@/store";

export const msgManager = {
  activeId:0,//当前活跃ID
/**
 * 获取消息
 * @param {*} fromType 
 * @param {*} sessionId 
 * @param {*} maxMsgId 
 * @param {*} firstMsgId 
 * @param {boolean} isMore 是否上拉加载
 * @param {*} pageSize 
 */
    getMsg(fromType,sessionId,maxMsgId,firstMsgId,isMore,pageSize=20){
        fromType=Number(fromType);
        sessionId=Number(sessionId);
        if(isMore){
          maxMsgId--;
        }else{
            this.activeId=sessionId;
        }
        return new Promise(resolve => {
            if(fromType==0){
              //单聊消息
              friend.getMsg(sessionId,maxMsgId,firstMsgId,pageSize).then(data => {
                resolve(data);
              });
            }else{              
              resolve();
            }
        })
    },

    /**
     * 更新指定消息
     * @param {*} fromType 会话类型
     * @param {*} sessionId 会话ID
     * @param {*} data 消息
     */
    updateMsg(fromType,sessionId,data){
        fromType=Number(fromType);
        sessionId=Number(sessionId);
        if(fromType==0){
        //单聊消息
            friend.updateMsg(sessionId,data);
        }else{
            
        }
    },
    updateMsgBatch(fromType,sessionId,data){
      fromType=Number(fromType);
      sessionId=Number(sessionId);
      if(fromType==0){
      //单聊消息
          friend.updateMsgBatch(sessionId,data);
      }else{
          
      }
  },

  /**
   * 清空所有缓存数据
   */
  clearMsg(fromType){
    fromType=Number(fromType);
    if(fromType==0){
    //单聊消息
        friend.clearMsg();
    }else{
        
    }
  },

 

  showPage(list){
   let userId = store.state.userId
   let messages = store.state.message;
   let cacheMessages={};
   for(let key in messages){
     if(key>1000000000){
       cacheMessages[key]=messages[key];
     }
   }
    for(let key in list){
      let msgItem=list[key];
      if(msgItem.bodyFrom==userId){
        for(let key1 in cacheMessages){
          let cache=cacheMessages[key1];
          if(msgItem.bodyContent==cache.bodyContent){
            store.commit("DELETE_MESSAGE", key1);
            delete cacheMessages[key1];
            break;
          }
        }
      }
      let history = {
        bodyContent: msgItem.bodyContent,
        msgContent: msgItem.msgContent,
        bodyFrom:  msgItem.bodyFrom,
        bodyTime: msgItem.bodyTime,
        bodyType: msgItem.bodyType,
        preview: msgItem.preview,
        mId: msgItem.mId,
        createTime: msgItem.bodyTime,
        checked: false,
        chatInfo:msgItem.chatInfo,
        noChatInfo:msgItem.noChatInfo
      };
      store.commit("UPDATE_MESSAGE", history);
    }
  },

  
  /**
 * 获取本地消息
 * @param {*} sessionId 
 * @param {*} mId 
 */
  getLocalImgAndVideo(fromType,sessionId){
    fromType=Number(fromType);
    sessionId=Number(sessionId);
    return new Promise(resolve => {
      if(fromType==0){
        //单聊消息
        friend.getLocalImgAndVideo(sessionId).then(data=>{
          resolve(data);
        });
      }else{
        resolve();
      }
    })
  },
/**
 * 模糊搜索
 * @param {*} keyWord 关键字
 * @param {function } callback 回调函数
 */
  vagueFind(keyWord,callback){
    //单聊消息
    friend.vagueFind(keyWord).then(data=>{
      callback(data,0);
    });
  },
  updateMsgRead(mId){
    friend.updateMsgRead(mId);
  },
}