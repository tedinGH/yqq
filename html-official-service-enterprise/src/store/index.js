import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./getters";
import * as actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);
const state = {
  token: "",
  userInfo: {},
  lang: "", //用户使用语言
  toastText: "",
  layout: {
    //全局弹窗控制
    module: "",
    child: "",
    mask: false // 是否隐藏遮罩
  },
  translate:null
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
