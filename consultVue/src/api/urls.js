import { Config } from "@/common/config";
let BUILD_URL = base.build_url
let MSG_URL = base.msg_url

export const CONNECT = MSG_URL + '/vrtc/connect' //初始化链接
export const CONNECT_CLOSE = MSG_URL + '/vrtc/close' //断开连接
export const SEND = MSG_URL + '/vrtc/send' //消息发送
export const GET_RTC = MSG_URL + '/vrtc/rtc' //消息接收
export const GET_CACHE_MSG = MSG_URL + '/vrtc/getFaultedMsg' //临时缓存断层获取

export const OPEN = MSG_URL +'/vrtc/open'    //打开会话


export const GET_ADVERTI = BUILD_URL + '/adverti/getAdvertiByCompanyId'    //获取广告图
export const GET_COMPANYNAME = BUILD_URL + '/company/getCompanyNameAndLogo'    //获取公司信息
export const GET_STYLE = BUILD_URL + '/site/getStyle'   //获取样式
export const GET_DEFAULTSTYLE = BUILD_URL + '/site/getDefaultStyle'   //获取默认样式
export const GET_VISITORSORT = MSG_URL + '/visotorSession/getVisitorSort'    //获取排序
export const GET_SYSREPLEBYTYPE = BUILD_URL + '/repleConf/getSystemReple'    //获取超时系统回复

export const GET_LEAVECONF = BUILD_URL + '/leave/getLeaveConf' //获取留言设置
export const SAVE_LEAVEMSG = BUILD_URL + '/leaveMsg/saveLeaveMsg'    //提交留言
export const GET_CUSTOMFIELD = BUILD_URL + '/leave/getCustomField'   //获取留言自定义字段

// 上传需求
export const INITFILE_CHANNEL_UPLOAD_FILE = BUILD_URL + "/file/initFileChannel"; // 分片上传文件
export const UPLOAD_FILE_V2 = BUILD_URL + "/file/fileUpload"; // 上传文件V2
