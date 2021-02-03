import Vue from "vue";
import * as types from "./mutation-types";

export default {
  [types.SET_LANG](state, payload) {
    state.lang = payload;
  },
  [types.SET_TOKEN](state, payload) {
    state.token = payload;
  },
  [types.SET_USER_INFO](state, payload) {
    state.userInfo = payload;
  },
  [types.SET_LAYOUT](state, payload) {
    state.layout.module = payload[0];
    state.layout.child = payload[1];
    state.layout.mask = payload[2];
  },
  [types.SET_TOAST_TEXT](state, payload) {
    state.toastText = payload;
  },
  [types.SET_TRANSLATE](state, payload) {
    state.translate = payload;
  },
};
