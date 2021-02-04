import { actionApi } from "@/api";
import Rtc from "@/tools/rtc-message";
// import { EchatDB } from "@/tools/indexedDB";
import * as types from "./mutation-types";
// import { sessionUtil } from "@/session/sessionUtil";
import store from "@/store";
// import { loginFail } from "./getters";

// 获取评价内容
export const getIsEvaluate = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    actionApi.getIsEvaluate(payload).then(res => {
      if (res && res.code == 0) {
        if (res.data == 0) {
          resolve(res);
        } else {
          // 判断是否重复评价
          if (!payload.mode) {
            commit("SET_LAYOUT", ["evaluated", "", false]);
          }
          reject(res);
        }
      } else {
        reject(res);
      }
    });
  });
};

export const setLayout = ({ commit }, payload) => {
  commit(types.SET_LAYOUT, payload);
};

export const setLuyou = ({ commit }, payload) => {
  commit(types.SET_LUYOU, payload);
};
