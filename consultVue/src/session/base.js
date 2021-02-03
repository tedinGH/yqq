import { EchatDB } from "@/session/indexedDB";
export const baseSession = {
  /**
   * 分页获取消息
   * @param {*} resolve 回调对象
   * @param {*} tabelName 表名
   * @param {*} sessionId 会话ID
   * @param {*} maxMsgId 需要查询的最大消息ID
   * @param {*} pageSize 页面大小
   */
  openCursorMsgPage(resolve,tabelName,sessionId,maxMsgId,pageSize){
    let dbStores = EchatDB.db.transaction(tabelName, 'readonly')
                         .objectStore(tabelName);
    let stores;
    try {
      stores=dbStores.index('id');
      let dbKeyRange=IDBKeyRange.bound(1,maxMsgId);
      this.openCursorMsgPageNormal(stores,resolve,pageSize,dbKeyRange)
    } catch (error) {
      stores=dbStores.index('id');
      let dbKeyRange=IDBKeyRange.only(sessionId);
      this.openCursorMsgPageIE(stores,resolve,maxMsgId,pageSize,dbKeyRange)
    }
  },

  /**
   * 分页获取消息 普通
   * @param {*} resolve 
   * @param {*} pageSize 
   * @param {*} dbKeyRange 
   */
  openCursorMsgPageNormal(stores,resolve,pageSize,dbKeyRange){
    let request=stores.openCursor(dbKeyRange,'prev');

    let msgList=[];
    let index =0;
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        index++;
        msgList.push(cursor.value);
        if(index>=pageSize){
          return resolve(msgList);
        }
        cursor.continue();
      } else {
        return resolve(msgList);
      }
    }
    request.onerror = event =>{
      console.error(event);
    }
  },

  /**
   * 分页获取消息 IE
   * @param {*} resolve 
   * @param {*} sessionId 
   * @param {*} pageSize 
   * @param {*} dbKeyRange 
   */
  openCursorMsgPageIE(stores,resolve,maxMsgId,pageSize,dbKeyRange){
    let request=stores.openCursor(dbKeyRange,'prev');

    let msgList=[];
    let index =0;
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let value=cursor.value;
        if(value.mId<=maxMsgId){
          // index++;
          msgList.push(value);
          // if(index>=pageSize){
          //   return resolve(msgList);
          // }
        }
        cursor.continue();
      } else {
        msgList.sort((a, b) => b.bodyTime - a.bodyTime);//排序
        let bb=[];
        for(let i=0;i<msgList.length;i++){
          index++;
          bb.push(msgList[i]);
          if(index>=pageSize){            
            break;
          }
        }
        return resolve(bb);
      }
    }
    request.onerror = event =>{
      console.error(event);
    }
  },

 /**
  * 清空所有缓存数据
  */
 clearMsg(tabelName){
   let stores = EchatDB.db.transaction(tabelName, 'readwrite')
   .objectStore(tabelName);
   stores.clear();
 },
 
  /**
   * 批量更新消息
   * @param {*} sessionId 
   * @param {*} record 
   */
  updateMsgBatch(sessionId, record,tabelName) {    
    let dbStore = EchatDB.db.transaction(tabelName, 'readwrite')
      .objectStore(tabelName);
    for(var key in record){
      let c=record[key];
      c.userId=sessionId;
      c.mId=Number(c.mId);
      c.bodyType=Number(c.bodyType);
      c.bodyTime=Number(c.bodyTime);
      try {
        let stores =dbStore.index("sessionIdAndMid");
        let dbKeyRange=IDBKeyRange.only([c.userId,c.mId]);
        this.updateMsgBatchNormal(stores,dbStore,c,dbKeyRange);
      } catch (error) {
        let stores =dbStore.index("userId");
        let dbKeyRange=IDBKeyRange.only(sessionId);
        this.updateMsgBatchIE(stores,dbStore,c, dbKeyRange);
      }
    }
  },
  updateMsgBatchNormal(stores,dbStore,c,dbKeyRange){
    let request=stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        c.readNum=cursor.value.readNum;
        return cursor.update(c);
      } else {
        let request1=dbStore.put(c);
        request1.onsuccess = event => {
          // console.log(event);
        }
        request1.onerror = event =>{
          console.error("onerror"+c);
          console.error(event);
        }
        return ;
      }
    }
    request.onerror = event =>{
      console.error(event);
    }
  },
  updateMsgBatchIE(stores,dbStore,c, dbKeyRange){
    let request=stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let value=cursor.value;
        if(value.mId==c.mId){
          c.readNum=value.readNum;
          return cursor.update(c);
        }
        cursor.continue();
      } else {
        let request1=dbStore.add(c);
        request1.onsuccess = event => {
          // console.log(event);
        }
        request1.onerror = event =>{
          console.error("onerror"+c);
          console.error(event);
        }
        return ;
      }
    }
    request.onerror = event =>{
      console.error(event);
    }
  },
    /**
   * 更新消息
   * @param {*} sessionId 
   * @param {*} record 
   */
  updateMsg(sessionId, record,tabelName) {
    let c=record;
    try {
      let dbKeyRange=IDBKeyRange.only(c.id)
      this.updateMsgNormal(tabelName,c,dbKeyRange);
    } catch (error) {
      let dbKeyRange=IDBKeyRange.only(c.id)
      this.updateMsgIE(tabelName,c,dbKeyRange);
    }
  },
  updateMsgNormal(tabelName,c,dbKeyRange){
    let dbStore = EchatDB.db.transaction(tabelName, 'readwrite')
      .objectStore(tabelName);
    let stores =dbStore.index("id");
    let request=stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        return cursor.update(c);
      } else {
        let request1=dbStore.put(c);
        request1.onsuccess = event => {
          // console.log(event);
        }
        request1.onerror = event =>{
          console.error("onerror"+c);
          console.error(event);
        }
        return ;
      }
    }
    request.onerror = event =>{
      console.error(event);
    }
  },
  updateMsgIE(tabelName,c,dbKeyRange){
    let dbStore = EchatDB.db.transaction(tabelName, 'readwrite')
      .objectStore(tabelName);
    let stores =dbStore.index("id");
    let request=stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let value=cursor.value;
        if(value.mId==c.mId){
          return cursor.update(c);
        }
        cursor.continue();
      } else {
        let request1=dbStore.add(c);
        request1.onsuccess = event => {
          // console.log(event);
        }
        request1.onerror = event =>{
          console.error("onerror"+c);
          console.error(event);
        }
        return ;
      }
    }
    request.onerror = event =>{
      console.error(event);
    }
  },

  /**
   * 根据消息类型获取本地消息
   * @param {*} resolve 
   * @param {*} sessionId 
   * @param {Number,Array[Number]} type 
   * @param {*} tabelName 
   */
  getLocalMsgByType(resolve,sessionId, typeArray,tabelName) {
    try {
      let dbKeyRange=IDBKeyRange.bound(typeArray[0],typeArray[1]);
      this.getLocalMsgByTypeNormal(resolve,tabelName,dbKeyRange);
    } catch (error) {
      let dbKeyRange=IDBKeyRange.only(sessionId);
      this.getLocalMsgByTypeIE(resolve,typeArray, tabelName,dbKeyRange);
    }
  },
  getLocalMsgByTypeNormal(resolve,tabelName,dbKeyRange){
    let dbStore = EchatDB.db.transaction(tabelName, 'readonly')
      .objectStore(tabelName);
    let stores =dbStore.index("type");
    let request=stores.openCursor(dbKeyRange);
    let msgArray=[];
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        msgArray.push(cursor.value);
        cursor.continue();
      } else {
        return resolve(msgArray);
      }
    }
    request.onerror = event =>{
      console.error(event);
    }
  },
  getLocalMsgByTypeIE(resolve,typeArray, tabelName,dbKeyRange){
    let dbStore = EchatDB.db.transaction(tabelName, 'readonly')
      .objectStore(tabelName);
    let stores =dbStore.index("type");
    let request=stores.openCursor(dbKeyRange);
    let msgArray=[];
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let value=cursor.value;
        if(value.bodyType==typeArray[0]||value.bodyType==typeArray[1]){
          msgArray.push(value);
        }        
        cursor.continue();
      } else {
        return resolve(msgArray);
      }
    }
    request.onerror = event =>{
      console.error(event);
    }
  },
  /**
   * 模糊搜索
   * @param {*} resolve 
   * @param {*} keyWord 关键字
   * @param {*} tabelName 
   */
  vagueFind(resolve,keyWord,tabelName) {
    let stores = EchatDB.db.transaction(tabelName, 'readonly')
      .objectStore(tabelName);
    let request=stores.openCursor();
    let msgArray=[];
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let record=cursor.value;
        if(record.preview.indexOf(keyWord)>=0){
          if(record.bodyType==1 || record.bodyType==13 || record.bodyType==24 || record.bodyType==28 || record.bodyType==30) msgArray.push(record);
        }        
        cursor.continue();
      } else {
        return resolve(msgArray);
      }
    }
    request.onerror = event =>{
      console.error(event);
    }
  },
  /**
   * 已读更新消息
   * @param {*} record 
   */
  updateMsgRead(mId,tabelName) {
    try {
      let dbKeyRange=IDBKeyRange.only(mId)
      this.updateMsgReadNormal(tabelName,dbKeyRange);
    } catch (error) {
    }
  },
  updateMsgReadNormal(tabelName,dbKeyRange){
    let dbStore = EchatDB.db.transaction(tabelName, 'readwrite')
      .objectStore(tabelName);
    let stores =dbStore.index("id");
    let request=stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let value=cursor.value;
        value.viewShow=value.viewShow.replace('class="wait"','class="sendsuccess"').replace('class="senging"','class="sendsuccess"');
        return cursor.update(value);
      } else {
        return ;
      }
    }
    request.onerror = event =>{
      console.error(event);
    }
  },
}