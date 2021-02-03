// 和业务结合命名，避免引入后冲突

// 消息协议类型
const msgEnumTypes = {
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
  evaluateCustomerService: 17, // 客服评价
};

// 消息来源
const sessionEnumTypes = {
  visitor: 10, // 访客、服务号
  group: 1,
  friend: 0
};

// 客服评价
const evaluateCS = {
  evaluatType: 0, // 0、以会话形式评价 1、以客服对象形式评价
  invitationType: {
   closeSessionOverPush: 1, // 1、客服关闭会话后主动推送
   systemSessionOverPush:2, // 2、系统自动结束会话后主动推送 
   csPush: 3, // 3、对话中客服主动发送 
   visitorPush: 4, // 4、对话中访客主动进行评价 
   visitorClose: 5, // 5、访客关闭会话窗口时弹出
  },
  grade: {
    good: 1,// 1好评 
    medium: 2,// 2中评 
    normal: 3// 3差评
  }
}

export { msgEnumTypes, sessionEnumTypes, evaluateCS };
