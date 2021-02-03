import Vue from 'vue'
export default {
    setLoginInfo(state, payload) {
        state.loginInfo = payload;
    },
    setRegisterInfo(state, payload) {
        state.registerInfo = payload;
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
    setValidateInfo(state, payload) {
        state.validateInfo = payload;
    },
    setForgetPasswordInfo(state, payload) {
        state.forgetPasswordInfo = payload;
    }
};