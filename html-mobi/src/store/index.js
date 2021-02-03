import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  token: '',
  loginInfo: null, // 用户登录信息
  language: pageStaticLanguage,  //当前语言 zh_CN en_US my
  langData:{},     //当前语言提示语
	loginInfo: null, // 用户登录信息
  registerInfo: null, // 用户注册信息
  registerPassword: null, // 用户注册密码
  registerUrlParams: null, // 用户注册Url参数
	selectionCodeKey: null, // 获取点选验证码校验结果redis主键
  validateInfo: {
		userName:null,
		email:null,
		mobile:null,
	}, //找回密码信息
  forgetPasswordInfo: null, // 找回密码信息
};

export default new Vuex.Store({
  state: state,
  mutations: mutations
})