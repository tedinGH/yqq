import { serves } from "@/api/serves";
import * as urls from './urls'
import store from "@/store";

export const actionApi = {

  createSelectCode() {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.CREATECODE,
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  getlist() {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.GETLIST,
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  checkSelectCode(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.CHECKCODE,
        data: data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })

  },
  getSmsCodeNo(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.SEND,
        data: data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  checksmscode(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.CHECKSMSCODE,
        data: data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  getcompanybyphone(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.GETCOMPANYBYPHONE,
        data: data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  getcompanybyname(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.GETCOMPANYBYNAME,
        data: data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },

  registercompany(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.REGISTERCOMPANY,
        data: data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  checkfindpwdcode(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.CHECKFINDPWDCODE,
        data: data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
  updatepwd(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.UPDATEPWD
        ,
        data: data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },

  getByCompanyAndPhone(data) {
    return new Promise(function (resolve, reject) {
      let param = {
        httpUrl: urls.GETBYCOMPANYANDPHONE,
        data: data
      }
      serves.post(param).then(
        res => {
          resolve(res);
        },
        () => { reject() }
      )
    })
  },
}