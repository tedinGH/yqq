import Vue from 'vue'
import * as types from './mutation-types'
// import { sessionUtil } from "@/session/sessionUtil";

export default {
  [types.SET_LANG](state, payload) {
    state.lang = payload;
  },
  [types.SET_LAYOUT](state, payload) {
    if (state.layout.module == "gp-inf" && payload[0] == "mr") {
      state.layout.child = "mr";
    } else {
      state.layout.module = payload[0];
      state.layout.child = payload[1];
    }
    state.layout.mask = payload[2];
  },
  [types.SET_SELECTIONCODEKEY](state, payload) {
    state.selectionCodeKey = payload;
  },
};