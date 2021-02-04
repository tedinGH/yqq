import Vue from 'vue'
import * as types from './mutation-types'
// import { sessionUtil } from "@/session/sessionUtil";

export default {
  [types.SET_LANG](state, payload) {
    state.lang = payload;
  },
  [types.SET_TRANSLATE](state, payload) {
    state.translate = payload;
  },
  [types.SET_COMPANYID](state, payload) {
    state.companyId = payload;
  },
  [types.SET_LAYOUT](state, payload) {
    state.layout.module = payload[0];
    state.layout.child = payload[1];
    state.layout.mask = payload[2];
  },
  [types.SET_CHANNEL](state, payload) {
    state.channel = payload;
  },
  [types.SET_USER_ID](state, payload) {
    state.userId = payload;
  },
  [types.SET_ID_SEQ](state, payload) {
    window.localStorage.setItem(state.companyId + 'idSeq', payload)
    state.idSeq = payload;
  },
  [types.SET_CUSTOMER_SERVICE_ID](state, payload) {
    state.customerServiceId = payload;
  },
  [types.SET_MSGING](state, payload) {
    state.msging = payload;
  },
  [types.SET_SERVICEINFO](state, payload) {
    state.serviceInfo = payload;
  },
  [types.SET_THEMECOLOUR](state, payload) {
    state.themeColour = payload;
  },
    // 上传
  [types.ADD_UPLOAD_LIST](state, payload) {
    state.uploadInfo.push(payload);
  },
  [types.DELETE_UPLOAD_LIST](state, payload) {
    if (payload) {
      state.uploadInfo.splice(payload, 1);
    } else {
      state.uploadInfo.shift();
    }
  },
  [types.UPDATE_PROGRESS](state, payload) {
    state.progress = payload;
  },
  [types.SET_FILESIZE](state, payload) {
    state.filesize = payload;
  },
  [types.SET_TOAST_TEXT](state, payload) {
    state.toastText = payload;
  },
  [types.SET_BUBBLES](state, payload) {
    state.bubbles = payload;
  },
  [types.SET_EVALUATE_CONF](state, payload) {
    state.evaluateConf = payload;
  },
};