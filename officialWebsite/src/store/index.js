import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
const state = {
  userId: "",//访客用户临时ID
  customerServiceId:0,//客服ID
  idSeq:1,
  lang: '',//用户使用语言
  selectionCodeKey:null,
  /** session数据结构 {
   * v:0,//版本
   * record:{}//数据
   * }*/
  session: { v: 0, 'record': {} },
  layout: {         //全局弹窗控制
    module: "",       // 模块名称  vv-音视频  uc-个人中心 cp-聊天窗口 inf-好友群聊信息 gmi-群成员资料
    child: "",        // 模块里面的模块或者模块需要的数据
    mask: false   // 是否隐藏遮罩
  },
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})