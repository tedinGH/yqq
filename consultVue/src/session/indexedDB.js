
/**
 *  indexedDB本地缓存消息
 */

export const EchatDB = {
  name: 'echatDB',
  version: 1,
  db: null,
  msgTN: 'msg_history',//单聊（好友与非好友）消息表
  openDB(userId) {
    // // In the following line, you should include the prefixes of implementations you want to test.

    // window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    // // DON'T use "var indexedDB = ..." if you're not in a function.
    // // Moreover, you may need references to some window.IDB* objects:
    // window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
    // window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
    return new Promise((resolve, reject) => {
      let indexedDBName = userId + "2";
      let idName = window.localStorage.getItem('idName');
      if (!idName || idName != indexedDBName) {
        if (idName) {
          // 删除不是当前用户数据库indexedDB
          window.indexedDB.deleteDatabase(idName);
        } else {
          window.indexedDB.deleteDatabase(indexedDBName);
        }
        //有变化时，清空localStorage
        // var aspect = Object.keys(window.localStorage)
        // for (var i = 0; i < aspect.length; i++) {
        //   if (aspect[i].substring(0, 7) != "aspect-") {
        //     window.localStorage.removeItem(aspect[i]);
        //   }
        // }
        window.localStorage.setItem('idName', indexedDBName);
      }


      let request = window.indexedDB.open(indexedDBName, this.version);
      request.onerror = e => {
        console.log(e);
        alert("当前浏览器版本过低，请升级到最新版本！");
        reject();
      };
      request.onsuccess = e => {
        this.db = request.result;
        resolve();
        // this.myGetAll();
        console.log("创建/打开数据库成功。");
        // this.dbCheck(e);
      };
      request.onupgradeneeded = e => {
        this.dbCheck(e);
      };
    })
  },
  dbCheck(e) {
    this.db = e.target.result;
    //删除表
    if (e.oldVersion < this.version) {
      try {
        this.db.deleteObjectStore("msg_history");
      } catch (error) {
        console.error(error);
        // console.error(error);
      }
    }
    let storeNames = this.db.objectStoreNames;
    //deleteObjectStore()//删除表
    //消息DB  ---------start
    if (!storeNames.contains(this.msgTN)) {
      //单聊消息表创建
      let objectStore = this.db.createObjectStore(this.msgTN, { autoIncrement: true });
      //创建唯一消息索引
      objectStore.createIndex('id', 'id', { unique: true })
      objectStore.createIndex('type', 'type', { unique: false })
      objectStore.createIndex('date', 'date', { unique: false })
    }
    console.log('DB version changed to ' + this.version);
  },
  /**
   * 兼容不支持.getAll方法的浏览器
   */
  myGetAll() {
    if (typeof IDBObjectStore.prototype.getAll != 'function') {
      IDBObjectStore.prototype.getAll = function (params) {
        var request = {};

        var req = this.openCursor(params);
        req.onerror = function (evt) {
          if (typeof request.onerror == 'function') {
            request.onerror(evt);
          }
        };

        var rst_values = [];
        req.onsuccess = function (evt) {
          if (typeof request.onsuccess == 'function') {
            var cursor = event.target.result;
            if (cursor) {
              rst_values.push(cursor.value);
              cursor.continue();
            } else {
              request.result = rst_values;
              evt.target.result = rst_values;
              request.onsuccess(evt);
            }
          }
        }
        return request;
      }
    }
  },
}