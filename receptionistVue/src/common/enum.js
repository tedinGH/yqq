// 和业务结合命名，避免引入后冲突

// 消息协议类型
const msgEnum = {
  text: 1,
  img: 2,
  video: 3,
  audio: 4,
  inout: 5, // 进入离开协议
  msgTyping: 7, // 输入中
  msgReaded: 8,
  sessionOver: 6, // 会话结束
  webPluginInout: 9, // 网页进入/离开协议
  visitorPopWin: 10, // 访客弹窗协议
  csOnlineStatus: 11, //在线
  files: 12, // 其它文件
  textHyperLink: 13, // 文字带超链接
  newTransferEntry: 14, // (转接)访客对话新接入
  visitorWait: 16, // 访客等待
  evaluateCustomerService: 17 // 客服评价
};

// 消息来源
const sessionEnum = {
  visitor: 10, // 访客、服务号
  group: 1,
  friend: 0
};

// 客服评价
const evaluateCSEnum = {
  // 0、以会话形式评价 1、以客服对象形式评价
  evaluateType: {
    sessionMode: 0,
    customerMode: 1
  },
  invitationType: {
    // 后端接口值
    // activeStatus: 推送方式-对话中访客主动进行评价 1开启 -1关闭
    // closeStatus: 推送方式-客服关闭会话后主动推送状态：1开启-1关闭
    // endStatus: 推送方式-系统自动结束会话后主动推送状态1开启-1关闭
    // invitatStatus: 推送方式-对话中客服主动发送 1开启 -1关闭
    // status: 推送方式-访客关闭会话窗口时弹出

    closeSessionOverPush: 1, // 1、客服关闭会话后主动推送
    systemSessionOverPush: 2, // 2、系统自动结束会话后主动推送
    csPush: 3, // 3、对话中客服主动发送
    visitorPush: 4, // 4、对话中访客主动进行评价
    visitorClose: 5 // 5、访客关闭会话窗口时弹出
  },
  evaluateStatus: {
    // 0、未评价 ，1、已评价
    evaluate: 0,
    evaluated: 1
  },
  // 1企业2部门3分组
  groupType: {
    agent: 1,
    department: 2,
    group: 3
  },
  grade: {
    good: 1, // 1好评
    medium: 2, // 2中评
    normal: 3 // 3差评
  }
};

export { msgEnum, sessionEnum, evaluateCSEnum };
