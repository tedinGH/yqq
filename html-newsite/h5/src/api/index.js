import './serves'
import * as urls from './urls'
import store from '../store/'
import axios from 'axios'
// import { Toast } from 'mint-ui'

const api = {
  getUrl(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GRT_URL, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  loadUrl(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.LOAD_URL, data).then(
        res => {
          if(res.code == 0){
            resolve(res.data)
          }else{
            reject()
          } 
        },
        () => {
        }
      )
    })
  },
  setLoginInfo(data){
    axios.post(urls.SET_INFO, data).then(
      res => {
        store.commit('setLoginInfo',res.data)
      },
      () => {}
    )
  },
  logout(data){
    return new Promise(resolve => {
      axios.post(urls.LOG_OUT, data).then(
        res => {
          store.commit('setLoginInfo', null)
          resolve()
        },
        () => {}
      )
    })
  },
  getstyle(data){
    return new Promise(resolve => {
      axios.post(urls.GET_STYLE, data).then(
        res => {
          if(res.code == 0){
            resolve(res.data)
          }else{
            reject()
          } 
        },
        () => {}
      )
    })
  },
}

export default api
