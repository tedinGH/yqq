import { serves } from "@/api/serves";
import * as urls from './urls'
import { msgUtil } from "@/tools/msgUtil";
import { timeUtil } from "@/tools/timeUtil";
import store from "@/store";

export const actionApi = {
  connect(data) {
    return new Promise(resolve => {
      let param = {
        httpUrl: urls.CONNECT,
        data
      }
      serves.post(param).then(
        res => {
        let channel =res.data.visitorUuid
        if (channel) {
          store.commit("SET_CHANNEL", channel);
          localStorage.setItem("channel", channel);
        }
          let fromId = res.data.visitorId;
          if (fromId) {
            localStorage.setItem(store.state.companyId + 'fromId', fromId);
            store.commit("SET_USER_ID", fromId);
          }
          
          resolve(res)
        },
        () => { }
      )
    })

  },
  closeConnect() {
    let param = {
      httpUrl: urls.CONNECT_CLOSE
    }
    serves.post(param).then(
      res => {
        console.log(111);
      },
      () => { }
    )
  },
  /**
   * 
   * @param {Json} data
   *  {
   *    msgType:,//消息类型
   *    toId:,//接收者
   *    msg://具体消息
   * isSeq:true消息序列化 false消息非序列化
   * } 
   */
  sendMsg(data) {
    return new Promise(resolve => {
      data.msgId = timeUtil.nowTimestamp();
      let param = {
        httpUrl: urls.SEND,
        data: msgUtil.msgEntityToBuffer(10, data.toId, data.msgType, data.msg, data.msgId, data.isSeq)
      }
      serves.postBuffer(param).then(
        res => {
          let b = msgUtil.bufferToMsgEntity(res);
          if (b.state == 1) {
            store.commit("SET_ID_SEQ", b.data.idSeq);
            resolve(b.data);
          } else if (b.state == 20) {
            console.log('非法消息');
          }
        },
        () => { }
      )
    })
  },
  open(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.OPEN,
        data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  rtc() {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.GET_RTC  + '/' + store.state.idSeq,
        responseType: "arraybuffer"
      }
      serves.post(param).then(
        res => {
          // console.log("testcase3", res)
          let b = msgUtil.bufferToMsgEntity(res)
          // console.log(b, res)
          if (b.state == 0 || b.state == 2) {
            b.data.oldIdSeq = store.state.idSeq || 0;
            store.commit("SET_ID_SEQ", b.data.idSeq)
          }
          resolve(b);
        },
        () => { reject() }
      )
    })
  },
  getCacheMsg(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.GET_CACHE_MSG,
        data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  getadverti(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.GET_ADVERTI,
        data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  getcompanyname(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.GET_COMPANYNAME,
        data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  getvisitorsort(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.GET_VISITORSORT,
        data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  getsysreplebytype(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.GET_SYSREPLEBYTYPE,
        data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  saveleavemsg(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.SAVE_LEAVEMSG,
        data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  getcustomfield(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.GET_CUSTOMFIELD,
        data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  getleaveconf(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.GET_LEAVECONF,
        data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  getstyle(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.GET_STYLE,
        data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  getdefaultstyle(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.GET_DEFAULTSTYLE,
        data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  ininFileChannelUploadFile(data) {
    return new Promise((resolve, reject) => {
      let param = {
        httpUrl: urls.INITFILE_CHANNEL_UPLOAD_FILE,
        data
      };
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => {
          reject();
        }
      );
    });
  },
  // 客服评价
  getEvaluateConf(data) {
    return new Promise((resolve, reject) => {
      let param = {
        httpUrl: urls.GET_EVALUATE_CONF,
        data
      };
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => {
          reject();
        }
      );
    });
  },
  getIsEvaluate(data) {
    return new Promise((resolve, reject) => {
      let param = {
        httpUrl: urls.GET_IS_EVALUATE,
        data
      };
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => {
          reject();
        }
      );
    });
  },
  setSaveEvaluate(data) {
    return new Promise((resolve, reject) => {
      let param = {
        httpUrl: urls.SET_SAVE_EVALUATE,
        data
      };
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => {
          reject();
        }
      );
    });
  },
  setEvaluateInvitionRecord(data) {
    return new Promise((resolve, reject) => {
      let param = {
        httpUrl: urls.SET_EVALUATE_INVITION_RECORD,
        data
      };
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => {
          reject();
        }
      );
    });
  }
}