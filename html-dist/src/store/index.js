import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  token: '',
  loginInfo: null,                         // 用户登录信息
  language: pageStaticLanguage,                       //当前语言 zh_CN en_US my
  langData: {},                             //当前语言提示语
  registerPassword: null,                  // 用户注册密码
  registerUrlParams: null,                 // 用户注册Url参数
  selectionCodeKey: null,                  // 获取点选验证码校验结果redis主键
  feedbackInfo: {                          //帮助反馈信息
    userId: '1',                         //用户ID
    problemType: '1',                    //问题类型
  },
  complaintInfo: {
    noticeText: '',                      //投诉须知信息
    userId: '1',                         //投诉用户ID
    ownerId: '1',                        //被投诉用户(群聊)ID
    ownerType: '1',                      //投诉用户(群聊)
  },
  goBack: 'index',                         //登录注册成功跳转回原页面（传name、不是path） 
  scurityInfo: {},                         //账号安全信息同步
  currencyCoin: [],                        //当前币种列表
  orderInfo: {},                           //订单信息
  messages: {},                            //订单消息
  autoLogout: {}                            //顶号、修改密码、冻结
};

export default new Vuex.Store({
  state: state,
  mutations: mutations
})