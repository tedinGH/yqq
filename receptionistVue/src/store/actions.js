import * as types from "./mutation-types";
// import { EchatDB } from "@/tools/indexedDB";
import Rtc from "@/tools/rtc-message";
import store from "@/store";

export const setLayout = ({ commit }, payload) => {
  commit(types.SET_LAYOUT, payload);
};

export const setLuyou = ({ commit }, payload) => {
  commit(types.SET_LUYOU, payload);
};