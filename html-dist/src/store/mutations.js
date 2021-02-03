import Vue from 'vue'
export default {
  setToken(state, payload) {
    state.token = payload;
  },
  setLanguage(state, payload) {
    state.language = payload;
  },
  setLangData(state, payload) {
    state.langData = payload;
  },
  setLoginInfo(state, payload) {
    state.loginInfo = payload;
  },
  setRegisterPassword(state, payload) {
    state.registerPassword = payload;
  },
  setRegisterUrlParams(state, payload) {
    state.registerUrlParams = payload;
  },
  setSelectionCodeKey(state, payload) {
    state.selectionCodeKey = payload;
  },
  setFeedbackInfo(state, payload) {
    state.feedbackInfo = payload;
  },
  setComplaintInfo(state, payload) {
    state.complaintInfo = payload;
  },
  setGoBack(state, payload) {
    state.goBack = payload;
  },
  setScurityInfo(state, payload) {
    state.scurityInfo = payload;
  },
  setCurrencyCoin(state, payload) {
    state.currencyCoin = payload;
  },
  setOrderInfo(state, payload) {
    state.orderInfo = payload;
  },
  setMessage(state, payload) {
    state.messages = payload
  },
  addMessage(state, payload) {
    Vue.set(state.messages, payload.msgId, payload)
  },
  setAutoLogout(state, payload){
    state.autoLogout = payload;
  }
};
