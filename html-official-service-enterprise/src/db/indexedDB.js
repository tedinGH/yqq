/**
 *  indexedDB本地缓存消息
 */

export const EchatDB = {
  name: "echatDB",
  version: 1,
  db: null,
  msgList: "msg_list", // 我的消息表
  openDB(userId) {
    // // In the following line, you should include the prefixes of implementations you want to test.
    return new Promise((resolve, reject) => {
      let indexedDBName = userId + "2";
      let idName = window.localStorage.getItem("idName");
      if (!idName || idName != indexedDBName) {
        if (idName) {
          // 删除不是当前用户数据库indexedDB
          window.indexedDB.deleteDatabase(idName);
        } else {
          window.indexedDB.deleteDatabase(indexedDBName);
        }
        //有变化时，清空localStorage
        var aspect = Object.keys(window.localStorage);
        for (var i = 0; i < aspect.length; i++) {
          if (aspect[i].substring(0, 7) != "aspect-") {
            if ("AU5CngR0ARAKqpHgAXDj2g==" == aspect[i]) {
              break;
            }
            window.localStorage.removeItem(aspect[i]);
          }
        }
        window.localStorage.setItem("idName", indexedDBName);
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
        // this.myGetAll()
        console.log("创建/打开数据库成功。");
        // this.dbCheck(e)
      };
      request.onupgradeneeded = e => {
        this.dbCheck(e);
      };
    });
  },
  dbCheck(e) {
    this.db = e.target.result;
    //删除表
    if (e.oldVersion < this.version) {
      try {
        this.db.deleteObjectStore(this.msgList);
      } catch (error) {
        console.error(error);
      }
    }
    let storeNames = this.db.objectStoreNames;
    //deleteObjectStore()//删除表
    //消息DB  ---------start
    if (!storeNames.contains(this.msgList)) {
      //访客消息表创建
      let objectStore = this.db.createObjectStore(this.msgList, {
        autoIncrement: true
      });
      //创建唯一消息索引
      objectStore.createIndex("fromIdAndId", ["userId", "id"], {
        unique: true
      });
      objectStore.createIndex("fromId", "userId", { unique: false });
      objectStore.createIndex("fromIdAndType", ["userId", "type"], {
        unique: false
      });
      objectStore.createIndex("fromIdAndDate", ["userId", "date"], {
        unique: false
      }); //用于定期清理
    }
    //消息DB  ---------end

    console.log("DB version changed to " + this.version);
  }
};
