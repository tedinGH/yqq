import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./getters";
import * as actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);
const state = {
  userId: "", //访客用户临时ID
  customerServiceId: null, //客服ID
  idSeq: 0,
  companyId: "",
  lang: "", //用户使用语言
  translate: {},
  channel: "", //访客通道
  routeName: "chat",
  isTyping: {
    status: false,
    type: "0"
  },
  themeColour: "",
  /** session数据结构 {
   * v:0,//版本
   * record:{}//数据
   * }*/
  session: { v: 0, record: {} },
  currentSession: {}, //当前聊天窗口信息
  loginFail: false, // 登录失效
  layout: {
    //全局弹窗控制
    module: "",
    child: "", // 模块里面的模块或者模块需要的数据
    mask: false // 是否隐藏遮罩
  },
  activityComponents: {}, //当前打开组件对象{name:,value:对象}
  serviceInfo: {},
  msging: true, //是否结束会话
  reminderSettings: {
    visitorMsgDesktopNotifyState: 1,
    visitorMsgVoiceNotifyState: 1
  }, // 通知设置列表
  toastText: "",
  // 上传
  progress: {},
  uploadInfo: [],
  filesize: 50,
  // 气泡颜色
  bubbles: {
    mybackground: "",
    adversebackground: ""
  },
  // 评价内容
  // activeStatus: 推送方式-对话中访客主动进行评价 1开启 -1关闭
  // closeStatus: 推送方式-客服关闭会话后主动推送状态：1开启-1关闭
  // endStatus: 推送方式-系统自动结束会话后主动推送状态1开启-1关闭
  // invitatStatus: 推送方式-对话中客服主动发送 1开启 -1关闭
  // status: 推送方式-访客关闭会话窗口时弹出
  evaluateStatus: "invitatStatus",
  evaluateConf: {}
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
