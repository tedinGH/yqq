import axios from 'axios';
import store from '../store'
import Qs from 'qs'
let pending = [];  // 存储每个请求的取消函数和标识
let cancelToken = axios.CancelToken;

let removePending = (ever) => {  
  for(let p in pending){
    if(pending[p].u === ever.url + '&' + ever.method) { // 当前请求在数组中存在时执行函数体 
      pending[p].f();  // 执行取消操作
      pending.splice(p, 1); 
    }
  }
}

axios.interceptors.request.use(
  config => {
    // 转换请求数据
    config.transformRequest = [function(data) {
      data = Qs.stringify(data);
      return data;
    }]
    // 请求头配置
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded', 
      token: store.state.token, 
      locale: window.localStorage.lang || 'zh_CN', 
      deviceType: '2'
    }
    removePending(config);  // 在请求发送前执行一下取消操作
    config.cancelToken = new cancelToken((c)=>{
      pending.push({ u: config.url + '&' + config.method, f: c });  
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  res => {
    removePending(res.config);  // 把已经完成的请求从pending中移除
    if (res.data.code != 0 && res.data.code != -2) {  // -2请求超时

      if(res.data.code == 100003){//用户注册  用户不存在100003
        return Promise.reject(res.data)
      }

      if(res.data.code == 100108 || res.data.code == 100106){
        store.commit('setAutoLogout', res.data.data)
      }else{
        Toast(res.data.data)
      }
      return Promise.reject(res.data)
    }
    return Promise.resolve(res.data)
  },
  error => {
    if (error.message) {
      Toast(store.state.langData.server_error)
    }
    return Promise.reject(error)
  }
)
