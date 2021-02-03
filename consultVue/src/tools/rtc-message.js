import store from "@/store";
import { actionApi } from "@/api";
import { msgEnumTypes, sessionEnumTypes } from "@/common/enum";
import Msg from "./msg";
import { msgUtil } from "@/tools/msgUtil";
import { msgFormatTemplate } from "@/tools/msgFormatTemplate";
export default {
  timer: null,
  onMessage(data) {
    // console.log(data);
    let bodyFrom = data.bodyFrom;
    let fromId = data.fromId;
    let chatType = data.chatType;
    let msgType = data.msgType;
    let name = data.name
    let isSender = bodyFrom == store.state.userId; //是否为消息发送者 true-消息发送者 false-消息接收者
    if (
      !isSender &&
      msgType != 8 &&
      msgType != 7 &&
      msgType != 6 &&
      msgType != 5
    ) {
      //发送消息已读
      this.sendMsgRead(fromId, chatType, data.msgId);
    }
    switch (msgType) {
      case msgEnumTypes.text:
        break;
      //普通文本
      case msgEnumTypes.inout:
        // console.log(data);
        //进入离开协议
        if (isSender) {
          return;
        }
        let body = JSON.parse(data.body);
        body.name = name || body.name
        if (body.type == 1) {
          sessionStorage.setItem("serviceInfo", data.body)
          store.commit("SET_SERVICEINFO", body)
          store.commit("SET_CUSTOMER_SERVICE_ID", fromId)
          store.commit("SET_MSGING", true)
        } else{
          store.commit("SET_MSGING", false)
        }
        break;
      case msgEnumTypes.sessionOver:
        //会话结束
        break;
      case msgEnumTypes.msgTyping:
        //输入中
        break;
      case msgEnumTypes.msgReaded:
        //消息已读
        if (isSender) {
          return;
        }
        break;
        case msgEnumTypes.textHyperLink:
        break;
      case msgEnumTypes.newTransferEntry:
        let content = JSON.parse(data.body);
        let str = {
          avatar:content.toUserAvatar,
          name: content.toUserName
        }
        sessionStorage.setItem("serviceInfo", JSON.stringify(str))
        store.commit("SET_CUSTOMER_SERVICE_ID", fromId)
        store.commit("SET_SERVICEINFO", str)
        break;
            // 上传
      case msgEnumTypes.img:
        //图片
        break;
      case msgEnumTypes.video:
        //视频文件
        break;
      case msgEnumTypes.audio:
        // 音频文件
        break;
      case msgEnumTypes.files:
        // 其它文件
        break;
      default:
        break;
    }
    msgFormatTemplate
      .formatMsgNew({
        isSender: isSender,
        fromId: fromId,
        bodyFrom: bodyFrom,
        timeStamp: data.time,
        id: data.msgId,
        type: msgType,
        body: data.body,
        chatType
      })
      .then((data) => {
        let chatPanel = store.state.activityComponents["Home"];
        if (chatPanel) {
          chatPanel.pushMsg(data);
        }
        Msg.notice(data);
      });
  },
  rtc() {
    actionApi
      .rtc()
      .then(
        (data) => {
          // console.log(data.state);
          if (data.state == -3 || data.state == 123 || !store.state.msging) {
            return;
          } else if (data.state == -2) {
            //超时
          } else if (data.state == 2 && !(data.data.idSeq < data.data.oldIdSeq)) {
            //消息存在断层
            //调取断层获取接口
            actionApi
              .getCacheMsg({
                startIndex: data.data.oldIdSeq,
                endIndex: data.data.idSeq
              })
              .then(
                (data) => {
                  let list = data.data.list;
                  if (list) {
                    list.forEach((element) => {
                      this.onMessage(JSON.parse(element));
                    });
                  }
                  store.commit("SET_ID_SEQ", data.data.idSeq);
                  this.rtc();
                },
                () => {
                  this.throttle();
                }
              );
            // alert('消息断层');
            return;
          } else if (data.state == 0) {
            if(data.data.idSeq - data.data.oldIdSeq > 1){
                actionApi
                .getCacheMsg({
                  startIndex: data.data.oldIdSeq,
                  endIndex: data.data.idSeq
                })
                .then(
                  data => {
                    let list = data.data.list;
                    if (list) {
                      list.forEach(element => {
                        this.onMessage(JSON.parse(element));
                      });
                    }
                    store.commit("SET_ID_SEQ", data.data.idSeq);
                    this.rtc();
                  },
                  () => {
                    this.throttle();
                  }
                );
              return;
            } else if (data.data.idSeq < data.data.oldIdSeq) {
              // 
            } else {
              this.onMessage(data.data);
            }
          }
          this.rtc();
        },
        (rej) => {
          this.throttle();
        }
      )
      .catch((error) => {
        console.error(error);
        this.throttle();
      });
  },
  throttle() {
    clearTimeout(this.timer);
    let that = this;
    this.timer = setTimeout(function() {
      that.rtc();
    }, 5000);
  },
  sendMsgRead(fromId, chatType, mId) {
    actionApi
      .sendMsg({
        msgType: 8,
        toId: fromId,
        chatType: chatType,
        isSeq: false,
        msg: JSON.stringify({ mId: mId }),
      })
      .then((data) => {               
          console.log(data)
      });
  },
};
