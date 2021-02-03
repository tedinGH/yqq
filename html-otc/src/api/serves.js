import axios from 'axios';
import store from '../store'
import Qs from 'qs'
import { msgUtil} from "@/tools/msgUtil";
var  utfx  =  require("utfx");
var ByteBuffer = require("bytebuffer");

let pending = []; // 存储每个请求的取消函数和标识
let cancelToken = axios.CancelToken;

let removePending = (ever) => {
  for (let p in pending) {
    if (pending[p].u === ever.url + '&' + ever.method) { // 当前请求在数组中存在时执行函数体 
      pending[p].f(); // 执行取消操作
      pending.splice(p, 1);
    }
  }
}

axios.interceptors.request.use(
  config => {
    // 转换请求数据
    config.transformRequest = [function (data) {
      let apiName;
      let index=config.url.indexOf('/imscweb/');
      let projectLen=8;
      if(index<0){
        index=config.url.indexOf('/imweb/');
        projectLen=6;
        if(index<0){
          index=config.url.indexOf('/imrtcweb/');
          projectLen=9;
          if(index<0){
            index=config.url.indexOf('/imfileweb/');
            projectLen=10;
            if(index<0){
              index=config.url.indexOf('/emojiweb/');
              projectLen=9;
              if(index<0){
                data = Qs.stringify(data);
                return data;
              }
            }
          }
        }
      }
      // data = Qs.stringify(data);
      // return data;
      apiName=config.url.substring(index+projectLen);
      config.url=config.url.substring(0,index+projectLen+1)+'apiV1.htm';
      try {
        data=msgUtil.msgEntityToBuffer(store.getters.token,apiName,data!=null?JSON.stringify(data):data);
        config.headers = {
          'Content-Type': 'application/octet-stream',
          locale: localStorage.lang || 'en_US',
          deviceType: '2'
        }
      } catch (error) {
        console.error(apiName,error);
      }
      return data;
    }]
    // 请求头配置
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'application/octet-stream',
      token: store.getters.token,
      locale: localStorage.lang || 'en_US',
      deviceType: '2'
    }
    //removePending(config); // 在请求发送前执行一下取消操作
    config.cancelToken = new axios.CancelToken(function (cancel) {
      store.commit('PUSHTOKEN', {cancelToken: cancel})
    })
    config.timeout = 25 * 1000;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  res => {
    //removePending(res.config); // 把已经完成的请求从pending中移除
    if (res.data.code != 0 && res.data.code != -2 && res.data.code != 101012) {
      if (res.request.responseURL.lastIndexOf('/group/getGroupUser.htm') > -1) {
        return Promise.reject(res.data)
      }
      if (res.data.code == 100108 || res.data.code == 100107 || res.data.code == 100106) {
        store.dispatch("setLoginFail", true)
      } else {
        if (res.data.code == 101017 || res.data.code ==101004 || res.data.code ==101006 || res.config.url.indexOf("getReadNumWeb.htm") >= 0) {
          // 
        } else if (res.data.code == 101026 && res.data.data == 'ဂရု(ပ်)အက်(တ်)မင်သည် သင်ဝင်ရောက်ခြင်းကို တားမြစ်သည်' || res.data.data == 'The group administrator forbids you to join' || res.data.data == '群管理员禁止您的加入') {
          store.commit('SET_TOAST_BOX', res.data.data);
        } else {
          store.commit('SET_TOAST_TEXT', res.data.data);
        }
      }
      return Promise.reject(res.data)
    }
    return Promise.resolve(res.data)
  },
  error => {
    return Promise.reject(error)
  }
);