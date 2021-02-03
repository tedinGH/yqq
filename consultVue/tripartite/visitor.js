//本地开发
// document.write('<script src="md5.min.js"></script>')
// document.write('<script language=javascript src="utfx.min.js"></script>');
// document.write('<script language=javascript src="base.js"></script>');
// document.write('<script language=javascript src="base_device_info.js"></script>');
// document.write('<script src="style.js"></script>')

let URL_BASE_A = "";
let jsParam_1 = getJsParam();
let styleId_1 = jsParam_1.st;
let cssID = jsParam_1.cp

let script1 = document.createElement("script");
document.body.appendChild(script1);
script1.src = URL_BASE_A + "/test/md5.min.js";

let script2 = document.createElement("script");
document.body.appendChild(script2);
script2.src = URL_BASE_A + "/test/utfx.min.js";

let script3 = document.createElement("script");
document.body.appendChild(script3);
script3.src = URL_BASE_A + "/test/base.js";

let script4 = document.createElement("script");
document.body.appendChild(script4);
script4.src = URL_BASE_A + "/test/base_device_info.js";

let script5 = document.createElement("script");
document.body.appendChild(script5);
script5.src = URL_BASE_A + "/test/style.js";

//正式
// let URL_CSS = 'https://d1ncrv8thw9gt7.cloudfront.net/';   
//  测试 预发布
let URL_CSS = 'https://d3by3xf7fqf07v.cloudfront.net/';
document.write('<link rel="stylesheet" href="' + URL_CSS +cssID+' "></link>');

function getJsParam() {
  var js = document.getElementsByTagName("script");
  let url = undefined;
  for (let i = 0; i < js.length; i++) {
    let a = js[i];
    if (a.src.includes("visitor.js")) {
      url = a.src;
      break;
    }
  }
  //得到当前引用a.js一行的script，并把src用'?'分隔成数组
  if (url) {
    var arraytemp = url.split("?");
    var obj = new Object();
    //如果不带参数，则不执行下面的代码
    if (arraytemp.length > 1) {
      var params = arraytemp[1].split("&");
      URL_BASE_A = arraytemp[0].split("/test")[0];
      for (var i = 0; i < params.length; i++) {
        var parm = params[i].split("=");
        //将key和value定义给obj
        obj[parm[0]] = parm[1];
      }
    }
    return obj;
  } else {
    return;
  }
}


let d_recordCode;
var utfx;
let channelId, userId;
let rtcRun = false;
let idIndex = 0;
window.onload = function() {
  //引用外部js
  utfx = dcodeIO.utfx;
  channelId = localStorage.getItem("channel");
  userId = localStorage.getItem("userId");
  connect();
};
//浏览器被关闭后触发
window.onunload = function() {
  closeConnect();
};
function closeConnect() {
  let cacheCode = sessionStorage.getItem("d_recordCode");
  if (d_recordCode) {
    sessionStorage.setItem("d_recordCode", d_recordCode);
  }
  if (!cacheCode) {
    cacheCode = d_recordCode;
  }
  if (cacheCode) {
    let a = {
      httpUrl: BASE_URL.RTC_URL + "/consultants/close/" + cacheCode,
    };
    httpRequest(a, function(data) {
      sessionStorage.removeItem("d_recordCode");
    });
  }
}

/**
 * 右下角弹窗
 * @param {*} params
 */
function popupRightBottom() {
  alert("我是右下角弹窗");
}
/**
 * 居中弹窗
 * @param {*} params
 */
function popupCenter() {
  alert("我是居中弹窗");
}

/**
 * 创建链接
 */
function connect() {
  var jsParam = getJsParam();
  var device = baseDeviceInfo.getDevice();
  let param = {
    httpUrl: BASE_URL.RTC_URL + "/vrtc/connect",
    data: {
      url: baseDeviceInfo.getUrl(),
      companyId: jsParam.cl,
      webTitle: baseDeviceInfo.getWebTitle(),
      deviceType: device.type,
      siteName: device.device,
      styleId: jsParam.st,
      channel: channelId,
      visitorUuid: userId,
    },
  };
  createDiv(device.isMobile, jsParam.cl);
  httpRequest(param, function(data) {
    if (data.code == 0) {
      let json = data.data;
      // d_recordCode = json.recordCode;
      channelId = json.visitorUuid;
      userId = json.visitorId;
      localStorage.setItem("channel", channelId);
      localStorage.setItem(jsParam.cl + "fromId", userId);
      // sessionStorage.setItem("d_recordCode", d_recordCode);
      rtcMessage.respMsg();
    } else {
      // alert("初始化失败");
    }
  });
}

let rtcMessage = {
  /**
   * 消息发送
   * @param {*} params
   */
  sendMsg(txt) {
    let params = {
      httpUrl: BASE_URL.RTC_URL + "/crtc/send",
      data: msgUtil.msgEntityToBuffer(txt),
    };
    httpRequest(params, function(blob) {
      let b = msgUtil.bufferToMsgEntity(blob);
      if (b.state == 2) {
        //存在消息断层
        //获取消息断层
      } else if (b.state == 0) {
        idIndex = b.data.msgId;
      }
    });
  },
  /**
   * 消息接收
   */
  respMsg() {
    if (rtcRun) {
      return;
    }
    rtcRun = true;
    let params = {
      httpUrl: BASE_URL.RTC_URL + "/vrtc/rtc/" + idIndex,
      responseType: "arraybuffer",
    };
    httpRequest(
      params,
      function(blob) {
        let b = msgUtil.bufferToMsgEntity(blob);
        if (b.state == 2) {
          //存在消息断层
          //获取消息断层
          alert("消息断层");
          return;
        } else if (b.state == 0) {
          idIndex = b.data.msgId;
          rtcMessage.onMessage(b.data);
        } else if (b.state == -3) {
          return;
        }
        rtcRun = false;
        rtcMessage.respMsg();
      },
      function() {
        //失败
        setTimeout(() => {
          rtcRun = false;
          rtcMessage.respMsg();
        }, 5000);
      }
    );
  },
  onMessage(data) {
    console.log(data);
    let bodyFrom = data.bodyFrom;
    let fromId = data.fromId;
    let chatType = data.chatType;
    let msgType = data.msgType;
    let isSender = bodyFrom == userId; //是否为消息发送者 true-消息发送者 false-消息接收者
    // if (!isSender && msgType != 8 && msgType != 7 && msgType != 6 && msgType != 5) {
    //     //发送消息已读
    //     this.sendMsgRead(fromId, chatType, data.msgId);
    // }
    switch (msgType) {
      case 1:
        break;
      case 10:
        //访客弹窗协议
        let json = JSON.parse(data.body);
        if (json.type == 0) {
          //右下角弹窗
          popupRightBottom();
        } else if (json.type == 1) {
          //居中弹窗
          popupCenter();
        }
        break;
      default:
        break;
    }
  },
  /**
   * 点击会话
   */
  clickChat() {
    let params = {
      httpUrl:
        BASE_URL.RTC_URL + "/consultants/clickChat?" + d_recordCode,
    };
    httpRequest(params, function(data) {});
    let jsParam = getJsParam();
    let id = jsParam.cl;
    let styleid = jsParam.st;
    let user = userId;
    let url = encodeURIComponent(baseDeviceInfo.getUrl());
    let data = new Date().getTime();
    let device = baseDeviceInfo.getWebTitle();
    let checkcode = md5(id + url + data + userId + styleid);
    window.open(
      BASE_URL.CALLER_RUL +
        id +
        "/" +
        url +
        "/" +
        user +
        "/" +
        data +
        "/" +
        styleid +
        "/" +
        checkcode +
        "/" +
        device
    );
  },
  /**
   * 移动停留会话
   */
  moveToChat() {
    // let params = {
    //   httpUrl:
    //     BASE_URL.RTC_URL + "/consultants/moveToChat?recordCode=" + d_recordCode,
    // };
    // httpRequest(params, function(data) {});
  },
};

let msgUtil = {
  /**
   * 字符串转二进制
   * @param {*} toId  接收者
   * @param {*} msg
   * @param {*} isSeq false-不序列化 true-序列化
   */
  msgEntityToBuffer(toId, msg, isSeq = true) {
    if (msg != undefined && msg != null) {
      let length = 17;
      let strLength = 0;
      let strCodes;

      strCodes = this.stringSource(msg);
      strLength = utfx.calculateUTF16asUTF8(strCodes)[1];
      length = 26 + strLength;

      let buffer = new ArrayBuffer(length); // 初始化长度为UTF8编码后字符串长度+4个Byte的二进制缓冲区
      let view = new DataView(buffer);

      view.setUint8(0, isSeq ? 1 : 0);
      view.setBigUint64(1, BigInt(new Date().getTime()));
      view.setUint8(9, 10);
      view.setUint32(10, toId);
      view.setUint32(14, userId);
      view.setUint32(18, userId);
      view.setUint32(22, 1);
      if (length > 26) {
        let offset = 26;
        utfx.encodeUTF16toUTF8(
          this.stringSource(msg),
          function(b) {
            view.setUint8(offset++, b);
          }.bind(this)
        );
      }
      return buffer;
    }
    return null;
  },
  stringSource(s) {
    var i = 0;
    return function() {
      return i < s.length ? s.charCodeAt(i++) : null;
    };
  },
  /**
   * 二进制转换字符串过程
   * @param {*} arrayBuffer
   */
  bufferToMsgEntity(arrayBuffer) {
    let arraySize = arrayBuffer.byteLength; //数组大小
    let view = new DataView(arrayBuffer);
    let msgEntity = {};
    let result = []; // Unicode编码字符
    let resp = {};
    resp.state = view.getInt8();
    if (resp.state == 0) {
      if (arraySize >= 38) {
        msgEntity.idSeq = view.getUint32(1); //本人接收消息的数量排序
        msgEntity.msgId = Number(view.getBigUint64(5)); //本消息ID
        msgEntity.time = Number(view.getBigUint64(13)); //消息时间

        msgEntity.chatType = view.getUint8(21);
        msgEntity.toId = view.getInt32(22);
        msgEntity.fromId = view.getInt32(26);
        msgEntity.bodyFrom = view.getInt32(30);
        msgEntity.msgType = view.getUint32(34);
        let offset = 38;
        let end = arraySize;
        utfx.decodeUTF8toUTF16(
          function() {
            return offset < end ? view.getUint8(offset++) : null; // 返回null时会退出此转换函数
          }.bind(this),
          (char) => {
            result.push(char);
          }
        );

        let strResult = result.reduce((prev, next) => {
          return prev + String.fromCharCode(next);
        }, "");
        msgEntity.body = strResult;
        resp.data = msgEntity;
      }
    } else if (resp.state == 1) {
      if (arraySize == 21) {
        msgEntity.idSeq = view.getUint32(1); //本人接收消息的数量排序
        msgEntity.msgId = Number(view.getBigUint64(5)); //本消息ID
        msgEntity.time = Number(view.getBigUint64(13)); //消息时间
        resp.data = msgEntity;
      }
    } else if (resp.state == 2) {
      //存在消息断层
      //当前缓存ID 与idseq 获取中间断层消息
      msgEntity.idSeq = view.getUint32(1); //本人接收消息的数量排序
      resp.data = msgEntity;
    }
    return resp;
  },
  /**
   * html标签转普通文本
   * @param {String} html
   */
  htmlToTxt(html) {
    let regExp = new RegExp("<br>", "g");
    var stringtemp = html.replace(regExp, "\r\n");
    let regExp2 = new RegExp("<[^>]+>", "g");
    var stringtemp = stringtemp.replace(regExp2, "");
    return stringtemp;
  },
  /**
   * 普通文本转html标签
   * @param {String} txt
   */
  txtToHtml(txt) {},
};

function httpRequest(paramObj, fun, errFun) {
  var xmlhttp = null;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  /*判断是否支持请求*/
  if (xmlhttp == null) {
    alert("你的浏览器不支持XMLHttp");
    return;
  }
  xmlhttp.responseType = paramObj.responseType || "json";
  var requestData = null;
  if (paramObj.data) {
    requestData = JSON.stringify(paramObj.data);
  }
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        /*成功回调函数*/
        fun(xmlhttp.response);
      } else {
        /*失败回调函数*/
        errFun();
      }
    }
  };
  xmlhttp.open("POST", paramObj.httpUrl, true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.setRequestHeader("Accept-Language", "en_US"); //国际化 en_US 英文   zh_CN中文
  if (channelId) {
    xmlhttp.setRequestHeader("channel", channelId);
    xmlhttp.setRequestHeader("visitorId", userId);
  }
  let device = baseDeviceInfo.getDevice();
  xmlhttp.setRequestHeader("deviceType", device.type);
  xmlhttp.setRequestHeader("version", "1.0.0.1");
  xmlhttp.setRequestHeader("Network", "wifi");
  xmlhttp.send(requestData);
}
/**
 * 提交二进制流请求
 **/
function postBuffer(paramObj, fun, errFun) {
  var xmlhttp = null;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (xmlhttp == null) {
    alert("你的浏览器不支持XMLHttp");
    return;
  }
  xmlhttp.responseType = "arraybuffer";
  /*请求接收*/
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      /*成功回调函数*/
      fun(xmlhttp.response);
    } else {
      /*失败回调函数*/
      errFun;
    }
  };
  xmlhttp.open("POST", paramObj.httpUrl, true);
  xmlhttp.setRequestHeader("channel", channelId);
  let device = baseDeviceInfo.getDevice();
  xmlhttp.setRequestHeader("deviceType", device.type);
  xmlhttp.send(paramObj.data);
}
