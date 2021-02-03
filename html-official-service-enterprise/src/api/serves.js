import store from "@/store";
import Qs from 'qs'
let deviceType = 2;
export const serves = {
  post(paramObj) {
    return new Promise(function (resolve, reject) {
      var xmlhttp = initHttp();
      /*判断是否支持请求*/
      if (xmlhttp == null) {
        alert('你的浏览器不支持XMLHttp');
        return;
      }
      /*请求方式，并且转换为大写*/
      var httpType = paramObj.type || 'POST';
      /*请求接口*/
      var httpUrl = paramObj.httpUrl || '';
      /*是否异步请求*/
      var async = paramObj.async || true;
      xmlhttp.responseType = paramObj.responseType || 'json';

      /*请求参数--post请求参数格式为：foo=bar&lorem=ipsum*/
      var requestData = null;
      if (paramObj.data) {
        requestData = Qs.stringify(paramObj.data);
      }
      xmlhttp.open(httpType, httpUrl, async);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      initHead(xmlhttp)
      xmlhttp.send(requestData);


      /*请求接收*/
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            
            if ('json' == xmlhttp.responseType) {
              
            }
            resolve(xmlhttp.response);
          } else {
            /*失败回调函数*/
            reject();
          }
        }
      }
    });
  },
}

function initHead(xmlhttp) {
  xmlhttp.setRequestHeader("Accept-Language", store.getters.lang || "en_US");//国际化 en_US 英文   zh_CN中文
  xmlhttp.setRequestHeader('deviceType', deviceType);
  xmlhttp.setRequestHeader('version', "1.0.0.1");
  xmlhttp.setRequestHeader('Network', "wifi");
  xmlhttp.setRequestHeader('token', store.getters.token);
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