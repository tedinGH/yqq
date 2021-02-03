import store from "@/store";

let deviceType = 2;
export const serves = {
  /**
   * 提交二进制流请求
   **/
  postBuffer(paramObj) {
    return new Promise(function(resolve, reject) {
      var xmlhttp = initHttp();
      /*判断是否支持请求*/
      if (xmlhttp == null) {
        alert("你的浏览器不支持XMLHttp");
        return;
      }
      /*请求接口*/
      var httpUrl = paramObj.httpUrl || "";
      /*请求参数--post请求参数格式为：foo=bar&lorem=ipsum*/
      var paramData = paramObj.data || [];
      xmlhttp.responseType = "arraybuffer";

      /*请求接收*/
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            /*成功回调函数*/
            resolve(xmlhttp.response);
          } else {
            /*失败回调函数*/
            reject();
          }
        }
      };
      xmlhttp.open("POST", httpUrl, true);
      initHead(xmlhttp);
      xmlhttp.send(paramData);
    });
  },
  post(paramObj) {
    return new Promise(function(resolve, reject) {
      var xmlhttp = initHttp();
      /*判断是否支持请求*/
      if (xmlhttp == null) {
        alert("你的浏览器不支持XMLHttp");
        return;
      }
      /*请求方式，并且转换为大写*/
      var httpType = "POST";
      /*请求接口*/
      var httpUrl = paramObj.httpUrl || "";
      /*是否异步请求*/
      var async = paramObj.async || true;
      xmlhttp.responseType = paramObj.responseType || "json";

      /*请求参数--post请求参数格式为：foo=bar&lorem=ipsum*/
      var requestData = null;
      if (paramObj.data) {
        requestData = JSON.stringify(paramObj.data);
      }
      xmlhttp.open(httpType, httpUrl, async);
      xmlhttp.setRequestHeader("Content-type", "application/json");
      initHead(xmlhttp);
      xmlhttp.send(requestData);

      /*请求接收*/
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            /*成功回调函数*/
            // let channel = xmlhttp.getResponseHeader('set-channel');
            // if (channel) {
            //   store.commit("SET_CHANNEL", channel);
            //   sessionStorage.setItem("channel", channel);
            // }
            resolve(xmlhttp.response);
          } else {
            /*失败回调函数*/
            reject();
          }
        }
      };
    });
  },
};

function initHead(xmlhttp) {
  xmlhttp.setRequestHeader("Accept-Language", store.state.lang); //国际化 en_US 英文   zh_CN中文
  if (store.getters.channel) {
    xmlhttp.setRequestHeader("channel", store.getters.channel);
    xmlhttp.setRequestHeader("visitorId", store.getters.userId);
  }
  let device = getDevice();
  xmlhttp.setRequestHeader("deviceType", device.type);
  xmlhttp.setRequestHeader("version", "1.0.0.1");
  xmlhttp.setRequestHeader("Network", "wifi");
}

function getDevice() {
  let device = {
    isMobile: false, //是否手机设备
    type: 1,
    device: navigator.userAgent,
    platform: navigator.platform, //操作系统
  };
  if (
    navigator.userAgent.match(
      /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
    )
  ) {
    device.isMobile = true;
    device.type = 0;
  }
  return device;
}

function initHttp() {
  var xmlhttp = null;
  /*创建XMLHttpRequest对象，
   *老版本的 Internet Explorer（IE5 和 IE6）使用 ActiveX 对象：new ActiveXObject("Microsoft.XMLHTTP")
   * */
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xmlhttp;
}
