import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./getters";
import * as actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);
const state = {
  token: "",
  userInfo: {},
  userId: null,
  idSeq: 0,
  lang: "", //用户使用语言
  translate: {},
  isTyping: {
    status: false,
    type: "0"
  },
  history: false,
  unfold: false, //是否展开
  online: null,
  /**
   * {
   *  isActivity:,//是否当前选中 boolean true 选中 false-未选中
   *  chatId:,//会话ID Int
   *  chatType: //会话类型 0-单聊 1-群聊 2-服务号 10-咨询者单聊   Int
   *  name://昵称 String
   *  avatar: //头像 String
   *  msgId://当前会话最新ID
   *  channelId://查询聊天记录ID
   * switched://是否为转接
   * }
   */
  endLists: [],
  waitLists: [],
  /**
   * {
   *  isActivity:,//是否当前选中 boolean true 选中 false-未选中
   *  chatId:,//会话ID Int
   *  chatType: //会话类型 0-单聊 1-群聊 2-服务号 10-咨询者单聊   Int
   *  name://昵称 String
   *  avatar: //头像 String
   * }
   */
  sessionLists: [],
  greetings: null, //问候语
  /**
   * {
   *  isActivity:,//是否当前选中 boolean true 选中 false-未选中
   *  online:,//在线状态 int 0-离线  1-在线 2-离开
   *  chatId:,//会话ID Int
   *  chatType: //会话类型 0-单聊 1-群聊 2-服务号 10-咨询者单聊   Int
   *  name://昵称 String
   *  avatar: //头像 String
   * }
   */
  browsingList: [],
  showwait: false,
  windowSize: {
    width: "",
    height: ""
  },
  deleteto: {
    show: false,
    id: "",
    groupingId: ""
  },
  compileto: {},
  response: [], //个人回复
  generalres: [], //通用回复
  familiar: [], //常见问题
  hot: [], //热点问题
  /** session数据结构 {
   * v:0,//版本
   * record:{}//数据
   * }*/
  session: { v: 0, record: {} },
  currentSession: {}, //当前聊天窗口信息
  luyou: "",
  layout: {
    //全局弹窗控制
    module: "",
    child: "",
    mask: false // 是否隐藏遮罩
  },
  activityComponents: {}, //当前打开组件对象{name:,value:对象}
  admitLimit: null, //客服接待上限
  waitnum: null,
  /**
   * 同事会话列表
   * {
   *  isActivity:,//是否当前选中 boolean true 选中 false-未选中
   *  online:,//在线状态 int 0-离线  1-在线 2-离开
   *  chatId:,//会话ID Int
   *  chatType: //会话类型 0-单聊 1-群聊 2-服务号 10-咨询者单聊   Int
   *  name://昵称 String
   *  avatar: //头像 String
   *  unread://未读数量
   *  msgId://当前最大消息ID
   * }
   */
  redPoint: {
    unReadNum: 0,
    colleagueUnReadNum: 0
  },
  reminderSettings: {}, // 通知设置列表
  departmentUsers: [], // 同事列表基础数据
  sessionColleagueList: [], // 同事会话列表
  sessionTime: 0,
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
  evaluateConf: {}
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
