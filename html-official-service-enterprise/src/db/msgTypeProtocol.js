/**
 * 消息类型 枚举协议
 */
export const msgTypeProtocol = {
  TextProtocol: 1, //文本协议
  PhotoProtocol: 2, //图片协议
  OfflineVideoProtocol: 3, //视频协议
  OfflineVoiceProtocol: 4, //语音协议
  InOrOutProtocol: 5, //咨询者(客服)进入/离开协议
  SessionCloseProtocol: 6, //会话结束协议
  InputProgressProtocol: 7, //输入中
  MsgReadProtocol: 8 //消息已读
};
