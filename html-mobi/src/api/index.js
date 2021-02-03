import './serves'
import * as urls from './urls'
import axios from 'axios'
import { Toast } from 'mint-ui'

const api = {
  findPwdFirst(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.FIND_PWD_FIRST, data).then(
        res => {
          resolve(res.data) 
        },
        res => {
          reject(res.data)
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
  doubleVerify(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.DOUBLE_VERIFY, data).then(
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
  loadEmoji(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.LOAD_EMOJI, data).then(
        res => { 
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  seeItem(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.SEE_ITEM, data).then(
        res => { 
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  userInvite(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.USER_ORGROUP, data).then(
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
