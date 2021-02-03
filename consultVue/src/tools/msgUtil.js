import store from "@/store";
var  utfx  =  require("utfx"); 
export const msgUtil = {
    // utfx:dcodeIO.utfx,
        /**
         * 字符串转二进制
         * @param {*} chatType 聊天类型
         * @param {*} toId 接收者
         * @param {*} msgType 消息类型
         * @param {*} msg 消息
         * @param {*} msgId 消息ID
         * @param {*} isSeq 是否序列化 false-否 true-是
         */
        msgEntityToBuffer(chatType, toId, msgType, msg,msgId,isSeq=true) {
            if (msgType != undefined && msgType != null) {
                let length = 26
                let strLength = 0;
                let strCodes;
    
                if (msg != undefined && msg != null) {
                    strCodes = this.stringSource(msg);
                    strLength = utfx.calculateUTF16asUTF8(strCodes)[1];
                    length = 26 + strLength;
                }
                let buffer = new ArrayBuffer(length); // 初始化长度为UTF8编码后字符串长度+4个Byte的二进制缓冲区
                let view = new DataView(buffer);
                view.setUint8(0, isSeq?1:0);
                view.setBigUint64(1,BigInt(msgId));
                view.setUint8(9, chatType);
                view.setUint32(10, toId);
                view.setUint32(14, store.getters.userId);
                view.setUint32(18, store.getters.userId);
                view.setUint32(22, msgType);
                if (length > 26) {
                    let offset = 26;
                    utfx.encodeUTF16toUTF8(this.stringSource(msg), function (b) {
                        view.setUint8(offset++, b);
                    }.bind(this));
    
                }
                return buffer;
            }
            return null;
        },
    stringSource(s) {
        var i = 0;
        return function () {
            return i < s.length ? s.charCodeAt(i++) : null;
        };
    },
    /**
     * 二进制转换字符串过程
     * @param {*} arrayBuffer 
     */
    bufferToMsgEntity(arrayBuffer) {
        let arraySize = arrayBuffer.byteLength;//数组大小
        let view = new DataView(arrayBuffer);
        let msgEntity = {};
        let result = []; // Unicode编码字符
        let resp = {};
        resp.state = view.getInt8();
        if (resp.state == 0) {
            if (arraySize >= 38) {
                msgEntity.idSeq = view.getUint32(1)//本人接收消息的数量排序
                msgEntity.msgId = Number(view.getBigUint64(5)); //本消息ID
                msgEntity.time = Number(view.getBigUint64(13)); //消息时间

                msgEntity.chatType = view.getUint8(21);
                msgEntity.toId = view.getInt32(22);
                msgEntity.fromId = view.getInt32(26);
                msgEntity.bodyFrom = view.getInt32(30);
                msgEntity.msgType = view.getUint32(34);
                let offset = 38;
                let end = arraySize;
                utfx.decodeUTF8toUTF16(function () {
                    return offset < end ? view.getUint8(offset++) : null; // 返回null时会退出此转换函数
                }.bind(this), (char) => {
                    result.push(char);
                });

                let strResult = result.reduce((prev, next) => {
                    return prev + String.fromCharCode(next);
                }, '');
                msgEntity.body = strResult;
                resp.data = msgEntity;
            }
        } else if (resp.state == 1) {
            if (arraySize == 21) {
                msgEntity.idSeq = view.getUint32(1)//本人接收消息的数量排序
                msgEntity.msgId = Number(view.getBigUint64(5)); //本消息ID
                msgEntity.time = Number(view.getBigUint64(13)); //消息时间
                resp.data = msgEntity;
            }
        } else if (resp.state == 2) {
            //存在消息断层
            //当前缓存ID 与idseq 获取中间断层消息
            msgEntity.idSeq = view.getUint32(1)//本人接收消息的数量排序
            resp.data = msgEntity;
        }
        return resp;
    },
    /**
     * html标签转普通文本
     * @param {String} html 
     */
    htmlToTxt(html){
      let regExp = new RegExp("<br>", 'g');
      var stringtemp = html.replace(regExp, "\r\n");
      let regExp2 = new RegExp("<[^>]+>", 'g');
      var stringtemp =stringtemp.replace(regExp2, "");
        return stringtemp;
    },
    /**
     * 普通文本转html标签
     * @param {String} txt 
     */
    txtToHtml(txt){

    },
}