import { EchatDB } from "@/session/indexedDB";
import { msgEnum } from "@/common/enum";
export const baseSession = {
  /**
   * 分页获取消息
   * @param {*} resolve 回调对象
   * @param {*} tabelName 表名
   * @param {*} sessionId 会话ID
   * @param {*} maxMsgId 需要查询的最大消息ID
   * @param {*} pageSize 页面大小
   */
  openCursorMsgPage(resolve, tabelName, sessionId, maxMsgId, pageSize) {
    let dbStores = EchatDB.db.transaction(tabelName, "readonly").objectStore(tabelName);
    let stores;
    try {
      stores = dbStores.index("fromIdAndId");
      let dbKeyRange = IDBKeyRange.bound([sessionId, 1], [sessionId, maxMsgId]);
      this.openCursorMsgPageNormal(stores, resolve, pageSize, dbKeyRange);
    } catch (error) {
      stores = dbStores.index("fromId");
      let dbKeyRange = IDBKeyRange.only(sessionId);
      this.openCursorMsgPageIE(stores, resolve, maxMsgId, pageSize, dbKeyRange);
    }
  },

  /**
   * 分页获取消息 普通
   * @param {*} resolve
   * @param {*} pageSize
   * @param {*} dbKeyRange
   */
  openCursorMsgPageNormal(stores, resolve, pageSize, dbKeyRange) {
    let request = stores.openCursor(dbKeyRange, "prev");

    let msgList = [];
    let index = 0;
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        index++;
        msgList.push(cursor.value);
        if (index >= pageSize) {
          return resolve(msgList);
        }
        cursor.continue();
      } else {
        return resolve(msgList);
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },

  /**
   * 分页获取消息 IE
   * @param {*} resolve
   * @param {*} sessionId
   * @param {*} pageSize
   * @param {*} dbKeyRange
   */
  openCursorMsgPageIE(stores, resolve, maxMsgId, pageSize, dbKeyRange) {
    let request = stores.openCursor(dbKeyRange, "prev");

    let msgList = [];
    let index = 0;
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let value = cursor.value;
        if (value.id <= maxMsgId) {
          // index++;
          msgList.push(value);
          // if(index>=pageSize){
          //   return resolve(msgList);
          // }
        }
        cursor.continue();
      } else {
        msgList.sort((a, b) => b.timeStamp - a.timeStamp); //排序
        let bb = [];
        for (let i = 0; i < msgList.length; i++) {
          index++;
          bb.push(msgList[i]);
          if (index >= pageSize) {
            break;
          }
        }
        return resolve(bb);
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },

  /**
   * 移除指定会话所有消息
   */
  removeMsgAll(tabelName, sessionId) {
    let stores = EchatDB.db
      .transaction(tabelName, "readwrite")
      .objectStore(tabelName)
      .index("fromId");
    let request = stores.openCursor(IDBKeyRange.only(sessionId));

    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      } else {
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },

  /**
   * 消息删除
   * @param {*} tabelName
   * @param {*} sessionId
   * @param {*} mId
   * @param {*} isAll
   */
  removeMsg(tabelName, sessionId, mId, isAll) {
    let dbKeyRange;
    try {
      if (isAll) {
        dbKeyRange = IDBKeyRange.bound([sessionId, 1], [sessionId, mId]);
      } else {
        dbKeyRange = IDBKeyRange.only([sessionId, mId]);
      }
      this.removeMsgNormal(tabelName, dbKeyRange);
    } catch (error) {
      dbKeyRange = IDBKeyRange.only(sessionId);
      this.removeMsgIE(tabelName, mId, dbKeyRange, isAll);
    }
  },

  removeMsgNormal(tabelName, dbKeyRange) {
    let stores = EchatDB.db
      .transaction(tabelName, "readwrite")
      .objectStore(tabelName)
      .index("fromIdAndId");
    let request = stores.openCursor(dbKeyRange, "prev");
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      } else {
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  removeMsgIE(tabelName, mId, dbKeyRange, isAll) {
    let stores = EchatDB.db
      .transaction(tabelName, "readwrite")
      .objectStore(tabelName)
      .index("fromId");
    let request = stores.openCursor(dbKeyRange, "prev");
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let value = cursor.value;
        if (isAll) {
          if (value.id <= mId) {
            return cursor.delete();
          }
        } else {
          if (value.id == mId) {
            return cursor.delete();
          }
        }
        cursor.continue();
      } else {
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  /**
   * 清空所有缓存数据
   */
  clearMsg(tabelName) {
    let stores = EchatDB.db.transaction(tabelName, "readwrite").objectStore(tabelName);
    stores.clear();
  },
  /**
   * 定期清理本地消息
   * @param { sessionId } 用户/群聊ID
   * @param { lastTime } 清理多久之前的消息时间戳
   */
  regularCleaning(sessionId, lastTime, cycle, tabelName) {
    let nowTime = Date.now();

    if (nowTime < lastTime || cycle == 0) return;

    if (cycle == 2) {
      cycle = 3;
    } else if (cycle == 3) {
      cycle = 7;
    } else if (cycle == 4) {
      cycle = 30;
    } else if (cycle == 5) {
      cycle = 1 / 60 / 24;
    }
    let clearTime = lastTime - cycle * 24 * 60 * 60 * 1000;
    try {
      let dbKeyRange = IDBKeyRange.bound([sessionId, 1], [sessionId, clearTime]);
      this.regularCleaningNormal(tabelName, dbKeyRange);
    } catch (error) {
      let dbKeyRange = IDBKeyRange.only(sessionId);
      this.regularCleaningIE(clearTime, tabelName, dbKeyRange);
    }
  },
  regularCleaningNormal(tabelName, dbKeyRange) {
    let stores = EchatDB.db
      .transaction(tabelName, "readwrite")
      .objectStore(tabelName)
      .index("sessionIdAndTime");
    let request = stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        //firstMsgId重置
        cursor.delete();
        cursor.continue();
      } else {
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  regularCleaningIE(clearTime, tabelName, dbKeyRange) {
    let stores = EchatDB.db
      .transaction(tabelName, "readwrite")
      .objectStore(tabelName)
      .index("fromId");
    let request = stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        //firstMsgId重置
        let data = cursor.value;
        if (data.timeStamp <= clearTime) {
          cursor.delete();
        }
        cursor.continue();
      } else {
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },

  /**
   * 消息编辑
   * @param {*} sessionId
   * @param {*} mId
   * @param {*} content
   */
  editMsg(sessionId, mId, content, tabelName) {
    try {
      let dbKeyRange = IDBKeyRange.only([sessionId, mId]);
      this.editMsgNormal(content, tabelName, dbKeyRange);
    } catch (error) {
      let dbKeyRange = IDBKeyRange.only(sessionId);
      this.editMsgIE(mId, content, tabelName, dbKeyRange);
    }
  },
  editMsgNormal(content, tabelName, dbKeyRange) {
    let stores = EchatDB.db
      .transaction(tabelName, "readwrite")
      .objectStore(tabelName)
      .index("fromIdAndId");
    let request = stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let data = cursor.value;
        data.bodyType = 28;
        data.msgContent = content;
        return cursor.update(data);
      } else {
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  editMsgIE(mId, content, tabelName, dbKeyRange) {
    let stores = EchatDB.db
      .transaction(tabelName, "readwrite")
      .objectStore(tabelName)
      .index("fromId");
    let request = stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let data = cursor.value;
        if (data.id == mId) {
          data.bodyType = 28;
          data.msgContent = content;
          return cursor.update(data);
        }
        cursor.continue();
      } else {
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  /**
   * 根据用户ID设置消息已读
   * @param {*} sessionId
   * @param {*} tabelName
   */
  setReadMsgBySessionId(sessionId, tabelName, maxReadId) {
    let dbStores = EchatDB.db.transaction(tabelName, "readwrite").objectStore(tabelName);
    let stores;
    if (maxReadId) {
      try {
        stores = dbStores.index("fromIdAndId");
        let dbKeyRange = IDBKeyRange.bound([sessionId, 1], [sessionId, maxReadId]);
        this.setReadMsgBySessionIdNormal(stores, dbKeyRange);
      } catch (error) {
        stores = dbStores.index("fromId");
        let dbKeyRange = IDBKeyRange.only(sessionId);
        this.setReadMsgBySessionIdIE(stores, maxReadId, dbKeyRange);
      }
    } else {
      stores = dbStores.index("fromId");
      let dbKeyRange = IDBKeyRange.only(sessionId);
      this.setReadMsgBySessionIdNormal(stores, dbKeyRange);
    }
  },

  setReadMsgBySessionIdIE(stores, maxReadId, dbKeyRange) {
    let request = stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let data = cursor.value;
        if (data.id <= maxReadId) {
          if (!data.readNum) {
            data.readNum = 1;
            cursor.update(data);
          }
        }
        cursor.continue();
      } else {
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  setReadMsgBySessionIdNormal(stores, dbKeyRange) {
    let request = stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let data = cursor.value;
        if (!data.readNum) {
          data.readNum = 1;
          cursor.update(data);
        }
        cursor.continue();
      } else {
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  /**
   * 批量更新消息
   * @param {*} sessionId
   * @param {*} record
   */
  updateMsgBatch(sessionId, record, tabelName) {
    let dbStore = EchatDB.db.transaction(tabelName, "readwrite").objectStore(tabelName);
    for (var key in record) {
      let c = record[key];
      c.userId = sessionId;
      try {
        let stores = dbStore.index("fromIdAndId");
        let dbKeyRange = IDBKeyRange.only([c.userId, c.id]);
        this.updateMsgBatchNormal(stores, dbStore, c, dbKeyRange);
      } catch (error) {
        let stores = dbStore.index("fromId");
        let dbKeyRange = IDBKeyRange.only(sessionId);
        this.updateMsgBatchIE(stores, dbStore, c, dbKeyRange);
      }
    }
  },
  updateMsgBatchNormal(stores, dbStore, c, dbKeyRange) {
    let request = stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        c.readNum = cursor.value.readNum;
        return cursor.update(c);
      } else {
        let request1 = dbStore.put(c);
        request1.onsuccess = event => {
          // console.log(event);
        };
        request1.onerror = event => {
          console.error("onerror" + c);
          console.error(event);
        };
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  updateMsgBatchIE(stores, dbStore, c, dbKeyRange) {
    let request = stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let value = cursor.value;
        if (value.id == c.id) {
          c.readNum = value.readNum;
          return cursor.update(c);
        }
        cursor.continue();
      } else {
        let request1 = dbStore.add(c);
        request1.onsuccess = event => {
          // console.log(event);
        };
        request1.onerror = event => {
          console.error("onerror" + c);
          console.error(event);
        };
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  /**
   * 更新消息
   * @param {*} record
   */
  updateMsg(record, tabelName) {
    try {
      let dbKeyRange = IDBKeyRange.only([record.userId, record.id]);
      this.updateMsgNormal(tabelName, record, dbKeyRange);
    } catch (error) {
      let dbKeyRange = IDBKeyRange.only(record.userId);
      this.updateMsgIE(tabelName, record, dbKeyRange);
    }
  },
  updateMsgNormal(tabelName, c, dbKeyRange) {
    let dbStore = EchatDB.db.transaction(tabelName, "readwrite").objectStore(tabelName);
    let stores = dbStore.index("fromIdAndId");
    let request = stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        return cursor.update(c);
      } else {
        let request1 = dbStore.put(c);
        request1.onsuccess = event => {
          // console.log(event);
        };
        request1.onerror = event => {
          console.error("onerror" + c);
          console.error(event);
        };
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  updateMsgIE(tabelName, c, dbKeyRange) {
    let dbStore = EchatDB.db.transaction(tabelName, "readwrite").objectStore(tabelName);
    let stores = dbStore.index("fromId");
    let request = stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let value = cursor.value;
        if (value.id == c.id) {
          return cursor.update(c);
        }
        cursor.continue();
      } else {
        let request1 = dbStore.add(c);
        request1.onsuccess = event => {
          // console.log(event);
        };
        request1.onerror = event => {
          console.error("onerror" + c);
          console.error(event);
        };
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  /**
   * 获取本地消息
   * @param {*} resolve
   * @param {*} sessionId
   * @param {*} mId
   * @param {*} tabelName
   */
  getLocalMsg(resolve, sessionId, mId, tabelName) {
    try {
      let dbKeyRange = IDBKeyRange.only([sessionId, mId]);
      this.getLocalMsgNormal(resolve, tabelName, dbKeyRange);
    } catch (error) {
      let dbKeyRange = IDBKeyRange.only(sessionId);
      this.getLocalMsgIE(resolve, mId, tabelName, dbKeyRange);
    }
  },
  getLocalMsgNormal(resolve, tabelName, dbKeyRange) {
    let dbStore = EchatDB.db.transaction(tabelName, "readonly").objectStore(tabelName);
    let stores = dbStore.index("fromIdAndId");
    let request = stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        return resolve(cursor.value);
      } else {
        return resolve();
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  getLocalMsgIE(resolve, mId, tabelName, dbKeyRange) {
    let dbStore = EchatDB.db.transaction(tabelName, "readonly").objectStore(tabelName);
    let stores = dbStore.index("fromId");
    let request = stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let value = cursor.value;
        if (value.id == mId) {
          return resolve(value);
        }
        cursor.continue();
      } else {
        return resolve();
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  /**
   * 根据消息类型获取本地消息
   * @param {*} resolve
   * @param {*} sessionId
   * @param {Number,Array[Number]} type
   * @param {*} tabelName
   */
  getLocalMsgByType(resolve, sessionId, typeArray, tabelName) {
    try {
      let dbKeyRange = IDBKeyRange.bound([sessionId, typeArray[0]], [sessionId, typeArray[1]]);
      this.getLocalMsgByTypeNormal(resolve, tabelName, dbKeyRange);
    } catch (error) {
      let dbKeyRange = IDBKeyRange.only(sessionId);
      this.getLocalMsgByTypeIE(resolve, typeArray, tabelName, dbKeyRange);
    }
  },
  getLocalMsgByTypeNormal(resolve, tabelName, dbKeyRange) {
    let dbStore = EchatDB.db.transaction(tabelName, "readonly").objectStore(tabelName);
    let stores = dbStore.index("fromIdAndType");
    let request = stores.openCursor(dbKeyRange);
    let msgArray = [];
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        msgArray.push(cursor.value);
        cursor.continue();
      } else {
        return resolve(msgArray);
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  getLocalMsgByTypeIE(resolve, typeArray, tabelName, dbKeyRange) {
    let dbStore = EchatDB.db.transaction(tabelName, "readonly").objectStore(tabelName);
    let stores = dbStore.index("fromId");
    let request = stores.openCursor(dbKeyRange);
    let msgArray = [];
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let value = cursor.value;
        if (value.bodyType == typeArray[0] || value.bodyType == typeArray[1]) {
          msgArray.push(value);
        }
        cursor.continue();
      } else {
        return resolve(msgArray);
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  /**
   * 模糊搜索
   * @param {*} resolve
   * @param {*} keyWord 关键字
   * @param {*} tabelName
   */
  vagueFind(resolve, keyWord, tabelName) {
    let stores = EchatDB.db.transaction(tabelName, "readonly").objectStore(tabelName);
    let request = stores.openCursor();
    let msgArray = [];
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let record = cursor.value;
        if (record.preview.indexOf(keyWord) >= 0) {
          if (record.bodyType == 1 || record.bodyType == 13 || record.bodyType == 24 || record.bodyType == 28 || record.bodyType == 30)
            msgArray.push(record);
        }
        cursor.continue();
      } else {
        return resolve(msgArray);
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  /**
   * 已读更新消息
   * @param {*} record
   */
  updateMsgRead(userId, mId, tabelName) {
    try {
      let dbKeyRange = IDBKeyRange.only([userId, mId]);
      this.updateMsgReadNormal(tabelName, dbKeyRange);
    } catch (error) {
      let dbKeyRange = IDBKeyRange.only(userId);
      this.updateMsgReadIE(tabelName, mId, dbKeyRange);
    }
  },
  updateMsgReadNormal(tabelName, dbKeyRange) {
    let dbStore = EchatDB.db.transaction(tabelName, "readwrite").objectStore(tabelName);
    let stores = dbStore.index("fromIdAndId");
    let request = stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let value = cursor.value;
        if (typeof(value.viewShow) == "string") {
          value.viewShow = value.viewShow.replace('class="wait"', 'class="sendsuccess"').replace('class="senging"', 'class="sendsuccess"');
        }
        return cursor.update(value);
      } else {
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  },
  updateMsgReadIE(tabelName, mId, dbKeyRange) {
    let dbStore = EchatDB.db.transaction(tabelName, "readwrite").objectStore(tabelName);
    let stores = dbStore.index("fromId");
    let request = stores.openCursor(dbKeyRange);
    request.onsuccess = event => {
      let cursor = event.target.result;
      if (cursor) {
        let value = cursor.value;
        if (value.id == mId) {
          let value = cursor.value;
          value.viewShow = value.viewShow.replace('class="wait"', 'class="sendsuccess"').replace('class="senging"', 'class="sendsuccess"');
          return cursor.update(value);
        }
        cursor.continue();
      } else {
        return;
      }
    };
    request.onerror = event => {
      console.error(event);
    };
  }
};
