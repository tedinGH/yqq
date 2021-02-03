/**
 *  indexedDB本地缓存消息
 */

export const EchatDB = {
  name: "echatDB",
  version: 1,
  db: null,
  msgVisitorTN: "visitor_history", //访客消息表
  msgGroupTN: "group_history", //同事群消息表
  msgColleagueTN: "colleague_history", //同事消息表
  groupMemberTN: "group_member", //同事消息表
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
        this.db.deleteObjectStore(this.msgGroupTN);
      } catch (error) {
        console.error(error);
      }
      try {
        this.db.deleteObjectStore(this.msgVisitorTN);
      } catch (error) {
        console.error(error);
      }
      try {
        this.db.deleteObjectStore(this.groupMemberTN);
      } catch (error) {
        console.error(error);
      }
      try {
        this.db.deleteObjectStore(this.msgColleagueTN);
      } catch (error) {
        console.error(error);
      }
    }
    let storeNames = this.db.objectStoreNames;
    //deleteObjectStore()//删除表
    //消息DB  ---------start
    if (!storeNames.contains(this.msgVisitorTN)) {
      //访客消息表创建
      let objectStore = this.db.createObjectStore(this.msgVisitorTN, {
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
    if (!storeNames.contains(this.msgGroupTN)) {
      //同事群聊消息表创建
      let objectStore = this.db.createObjectStore(this.msgGroupTN, {
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
    if (!storeNames.contains(this.msgColleagueTN)) {
      //同事消息表创建
      let objectStore = this.db.createObjectStore(this.msgColleagueTN, {
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

    //群信息DB--------start
    //群成员DB
    if (!storeNames.contains(this.groupMemberTN)) {
      let objectStore = this.db.createObjectStore(this.groupMemberTN, {
        autoIncrement: true
      });
      //创建唯一群成员索引
      objectStore.createIndex("goupIdAndUserId", ["groupId", "userId"], {
        unique: true
      });
      objectStore.createIndex("groupId", "groupId", { unique: false });
    }
    //群信息DB--------end

    console.log("DB version changed to " + this.version);
  }
};
