import './serves'
import * as urls from './urls'
import store from '../store'
import axios from 'axios'
import { Toast } from 'mint-ui'

const api = {
  queryInfo(data){
    return new Promise(resolve => {
      axios.post(urls.QUERY_INFO, data).then(
        res => {
          resolve(res.data)  
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
  getQrcodeUrl(data){
    return new Promise(resolve => {
      axios.post(urls.LOGIN_QR_CODE, data).then(
        res => {
          resolve(res.data)
        },
        () => {}
      )
    })
  },
  getloginState(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.LOGIN_STATE, data).then(
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
  qrcodeLogin(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.QR_LOGIN, data).then(
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
  checkPassword(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.CHECK_PASSWORD, data).then(
        res => { 
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  checkVerifyCode(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.CHECK_VERIFY_CODE, data).then(
        res => { 
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  register(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.REGISTER, data).then(
        res => { 
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  checkRegisterCode(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.CHECK_REGISTER_CODE, data).then(
        res => { 
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  login(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.LOGIN, data).then(
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
  loadApp(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.LOAD_APP, data).then(
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
  loadVersion(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.LOAD_VERSION, data).then(
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
  loginAgain(data){
    return new Promise(resolve => {
      axios.post(urls.LOGIN_AGAIN, data).then(
        res => {
          resolve()
        },
        () => {}
      )
    })
  },
  logout(data){
    return new Promise(resolve => {
      axios.post(urls.LOG_OUT, data).then(
        res => {
          store.commit('setLoginInfo', null)
          Toast(res.data)
          resolve()
        },
        () => {}
      )
    })
  },
  downloadUrl(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.DOWNLOAD_APP, data).then(
        res => {
          resolve(res.data)
        },
        () => {
        }
      )
    })
  },
  getSystemStatus(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.SYSTEM_STATUS, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  checkAuth(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.CHECK_AUTH, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  userAuth(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.USER_AUTH, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  getSmsCode(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_SMS_CODE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  getEmailCode(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_EMAIL_CODE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  getSmsCodeNo(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_SMS_CODE_NO, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  createSelectCode(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.CREATE_CODE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  checkSelectCode(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.CHECK_CODE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  checkFrozenCode(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.CHECK_FROZEN_CODE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  checkFrozenState(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.CHECK_FROZEN_STATE, data).then(
        res => {
          resolve(res.data)
        },
        res => {
          reject(res.data)
        }
      )
    })
  },
  frozenUser(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.FROZEN_USER, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  unfrozenUser(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.UNFROZEN_USER, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  getUnfrozenInfo(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_UNFROZEN_INFO, data).then(
        res => {
          resolve(res.data)
        },
        res => {
          reject(res.data)
        }
      )
    })
  },
  resetPassword(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.RESET_PASSWORD, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  doubleVerify(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.DOUBLE_VERIFY, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  getEmailCodeNo(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_EMAIL_CODE_NO, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  setMobile(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.SET_MOBILE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  resetMobileBySms(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.RESET_MOBILE_BY_SMS, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  resetMobileByPsw(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.RESET_MOBILE_BY_PSW, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  resetMobile(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.RESET_MOBILE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  setEmail(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.SET_EMAIL, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  resetEmailBySms(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.RESET_EMAIL_BY_SMS, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  resetEmailByPsw(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.RESET_EMAIL_BY_PSW, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  resetEmail(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.RESET_EMAIL, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  createGoogleCode(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.CREATE_GOOGLE_CODE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  openGoogle(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.OPEN_GOOGLE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  closeGoogle(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.CLOSE_GOOGLE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  googleCheck(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GOOGLE_CHECK, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  getReasonList(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_REASON_LIST, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  getProblemList(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_PROBLEM_LIST, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  getHelpFeekback(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_HELP_FEEKBACK, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  addHelpFeekback(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.ADD_HELP_FEEKBACK, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  getHelpHistory(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_HELP_HISTORY, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  getProblemDetail(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_PROBLEM_DETAIL, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  getCompainList(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_COMPLAIN_LIST, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  addCompain(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.ADD_COMPLAIN, data).then(
        res => {
          resolve(res)
        },
        () => {
          reject()
        }
      )
    })
  },
  getCompainType(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_COMPLAIN_TYPE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
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
}

export default api
