import { serves } from "@/api/serves";
import * as urls from "./urls";
import { msgUtil } from "@/tools/msgUtil";
import { timeUtil } from "@/tools/timeUtil";
import store from "@/store";
let isRtc = false;
export const actionApi = {
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
        data: msgUtil.msgEntityToBuffer(data.chatType, data.toId, data.msgType, data.msg, data.msgId, data.isSeq)
      };
      serves.postBuffer(param).then(
        res => {
          let b = msgUtil.bufferToMsgEntity(res);
          if (b.state == 1) {
            store.commit("SET_ID_SEQ", b.data.idSeq);
            resolve(b.data);
          } else if (b.state == 20) {
            console.log("非法消息");
          }
        },
        () => {}
      );
    });
  },
  rtc() {
    if (isRtc) {
      return;
    }
    isRtc = true;
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_RTC + "/" + store.state.idSeq,
        responseType: "arraybuffer"
      };
      serves.post(param).then(
        res => {
          isRtc = false;
          let b = msgUtil.bufferToMsgEntity(res);
          if (b.state == 0 || b.state == 2) {
            b.data.oldIdSeq = store.state.idSeq || 0;
            store.commit("SET_ID_SEQ", b.data.idSeq);
          }
          resolve(b);
        },
        () => {
          isRtc = false;
          reject();
        }
      );
    });
  },
  login(data) {
    return new Promise(resolve => {
      let param = {
        httpUrl: urls.LOGIN,
        data: data
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
  logout() {
    return new Promise(resolve => {
      let param = {
        httpUrl: urls.LOGOUT
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
  updatepactstatus() {
    return new Promise(resolve => {
      let param = {
        httpUrl: urls.UPDATE_PACTSTATUS
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

  gettemporarytoken() {
    return new Promise(resolve => {
      let param = {
        httpUrl: urls.GET_TEMPORARYTOKEN
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
  getVisitorList(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_VISITORLIST,
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
  getdepartmentuser() {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_DEPARTMENTUSER
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
  getonlineuser() {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_ONLINEUSER
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
  getgrouping(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_GROUPING,
        data: data
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
  getDetails(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_DETAILS,
        data: data
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
  getqueslist(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_QUESLIST,
        data: data
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
  getCSChatRecord(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_CSCHATRECORD,
        data: data
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
  getCoWorkerRecord(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_COWORKERRECORD,
        data: data
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
  deletedetails(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.DELETE_DETAILS,
        data: data
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
  editdetails(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.EDIT_DETAILS,
        data: data
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
  editgrouping(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.EDIT_GROUPING,
        data: data
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
  deletegrouping(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.DELETE_GROUPING,
        data: data
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
  getgreetingsconf(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_GREETINGSCONF,
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
  getvisitorinfo(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_VISITORINFO,
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
  getbaseinfo() {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_BASEINFO
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
  setbaseinfo(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.SET_BASEINFO,
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
  getReminderSetting(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_USERNOTIFY + "/" + data.userId,
        type: "GET"
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
  setReminderSetting(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.SET_USERNOTIFY,
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
  setchatstatus(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.SET_CHATSTATUS,
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
  /**
   * 获取指定访客信息
   * @param {*} data
   */
  getVisitor(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_VISITOR,
        data
      };
      serves.post(param).then(
        res => {
          if (res.code == 0) {
            resolve(res.data);
          } else {
            reject();
          }
        },
        () => {
          reject();
        }
      );
    });
  },
  /**
   * 获取指定访客信息
   * @param {*} data
   */
  connectManager(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.CONNECT_MANAGER + "/" + data
      };
      serves.post(param).then(
        res => {
          if (res.code == 0) {
            resolve(res.data);
          } else {
            reject();
          }
        },
        () => {
          reject();
        }
      );
    });
  },
  // 转接
  switchsession(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.SWITCH_SESSION,
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
  //关闭会话
  closemanager(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.CLOSE_MANAGER + "/" + data
      };
      serves.post(param).then(
        res => {
          if (res.code == 0) {
            resolve(res.data);
          } else {
            reject();
          }
        },
        () => {
          reject();
        }
      );
    });
  },
  /**
   * 获取断层消息
   * @param {*} data
   */
  getCacheMsg(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_CACHE_MSG,
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
  /**
   * 获取转接列表
   * @param {*} data
   */
  getlistswitch(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_LISTSWITCH,
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
  /**
   * 获取同事会话列表
   * @param {*} data
   */
  getColleagueSessionList(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_COLLEAGUE_SESSION_LIST,
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
  /**
   * 设置消息已读
   * API: https://kefu.bcirclepay.com/swagger/doc.html#/chat%E5%AE%A2%E6%9C%8D%E5%AF%B9%E8%AF%9D%E6%9C%8D%E5%8A%A1/%E4%BC%9A%E8%AF%9D%E5%88%97%E8%A1%A8%E6%8E%A7%E5%88%B6%E5%99%A8/getListUsingPOST_2
   * @param {*} data
   */
  getAndSetReadedSessionList(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_SESSION_LIST,
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
  /**
   * 获取消息列表
   * @param {*} data
   */
  getMsgListByMid(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_MSG_LIST_BYMID,
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

  //获取访问轨迹
  getVisitorTrajectory(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_VISITORTRAJECTORY,
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

  //获取所有客服会话记录
  getAllVisitorSession(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_ALLVISITORSESSION,
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

  //根据条件获取客服-访客聊天记录getSessionRecord
  getSessionRecord(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_SESSIONRECORD,
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
  // 根据条件导出客服-访客聊天记录 getSessionRecord
  exportSessionRecord(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.EXPORTSESSIONRECORD,
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
  //获取客服列表
  getlistcustomer(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GET_LISTCUSTOMER,
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
  //获取上一会话信息
  getbysessionid(data) {
    return new Promise(function(resolve, reject) {
      let param = {
        httpUrl: urls.GETBYSESSIONID + "/" + data
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
  },
  getEvaluateChart(data) {
    return new Promise((resolve, reject) => {
      let param = {
        httpUrl: urls.GET_EVALUATE_CHART,
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
  getEvaluateDeparmentType(data) {
    return new Promise((resolve, reject) => {
      let param = {
        httpUrl: urls.GET_EVALUATE_DEPPARTMENT_TYPE,
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
  getEvaluatelableTable(data) {
    return new Promise((resolve, reject) => {
      let param = {
        httpUrl: urls.GET_EVALUATE_LABLE_TABLE,
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
  // getEnableJoinInfo() {
  //   return new Promise(function(resolve, reject) {
  //     let param = {
  //       httpUrl: urls.GETENABLEJOININFO ,
  //       type: "GET"
  //     };
  //     serves.post(param).then(
  //       res => {
  //         resolve(res);
  //       },
  //       () => {
  //         reject();
  //       }
  //     );
  //   });
  // },
};
