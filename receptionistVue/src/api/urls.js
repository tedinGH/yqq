import { Config } from "@/common/config";
let BUILD_URL = Config.build_url;
let MSG_URL = Config.msg_url;

export const SEND = MSG_URL + "/crtc/send"; //消息发送
export const GET_RTC = MSG_URL + "/crtc/rtc"; //消息接收
export const GET_CACHE_MSG = MSG_URL + "/crtc/getFaultedMsg"; //临时缓存断层获取
export const LOGIN = BUILD_URL + "/user/login"; //登录
export const LOGOUT = BUILD_URL + "/user/logout"; //退出
export const UPDATE_PACTSTATUS = BUILD_URL + "/user/updatePactStatus"; //同意协议
export const GET_TEMPORARYTOKEN = BUILD_URL + "/user/getTemporaryToken"; //获取临时token
export const GET_BASEINFO = BUILD_URL + "/user/getBaseInfo"; //获取个人信息
export const SET_BASEINFO = BUILD_URL + "/user/setBaseInfo"; //修改个人信息
export const SET_CHATSTATUS = BUILD_URL + "/user/setChatStatus"; //修改在线状态

export const GET_USERNOTIFY = BUILD_URL + "/setting/usernotify/getByUserId"; //获取用户通知设置信息
export const SET_USERNOTIFY = BUILD_URL + "/setting/usernotify/save"; //修改用户通知设置信息

export const GET_CSCHATRECORD = MSG_URL + "/visotorSession/getCSChatRecord"; //客服-访客聊天记录（参数：sessionId会话id，pageNum，pageSize）
export const GET_VISITORTRAJECTORY = MSG_URL + "/visotorSession/getVisitorTrajectory"; //获取访问轨迹（参数：id 访客id）
export const GET_ALLVISITORSESSION = MSG_URL + "/visotorSession/getAllVisitorSession"; //获取所有客服会话记录（参数：访客id(会话id) visitorId;"平台：1pc 2app source;客服id 全部传-1 userId;评价类型:1好评 2中评 3差评 未评价传-1 type;时间范围：开始时间startTime;时间范围：结束时间 endTime;
//会话时间长类型1小于 2等于 3大于timeType; "会话时长"sessionTime 消息数量类型：1小于 2等于 3大于"msgNumType;消息数量"msgAmount;）
export const GET_SESSIONRECORD = MSG_URL + "/visotorSession/getSessionRecord"; //根据条件获取客服-访客聊天记录（参数："开始时间，传当天零时零分时间戳"：startTime;消息内容"：msgContent;UUid（相当于整个会话id）,必传"：channelId;"消息类型"：msgType）
export const GETBYSESSIONID = MSG_URL + "/visotorSession/getBySessionId"; //获取上一会话信息
export const EXPORTSESSIONRECORD = MSG_URL + "/visotorSession/exportSessionRecord"; //根据条件导出客服-访客聊天记录
export const GET_VISITORLIST = MSG_URL + "/visotorSession/listVisitorSession"; //根据类型获取访客列表 参数（type: 1待接入2对话中 3历史会话,pageNum，pageSize)
export const GET_VISITOR = BUILD_URL + "/visitor/getVisitor"; //获取指定访客
export const GET_VISITORINFO = MSG_URL + "/visotorSession/getVisitorInfo"; //获取指定访客信息
export const CONNECT_MANAGER = MSG_URL + "/crtc/toVisit/joinSession"; //访客接待
export const CLOSE_MANAGER = MSG_URL + "/crtc/toVisit/closeSession"; //访客关闭
export const SWITCH_SESSION = MSG_URL + "/crtc/toVisit/switchSession"; //访客转接
export const GET_LISTSWITCH = BUILD_URL + "/user/listSwitchableCustomer"; //获取可转接列表
export const GET_GROUPING = BUILD_URL + "/chatFastReply/getGrouping"; //获取回复语
export const GET_DETAILS = BUILD_URL + "/chatFastReply/getDetails"; //根据组获取回复语
export const GET_QUESLIST = BUILD_URL + "/chatIssueManage/getList"; //获取问题

export const GET_DEPARTMENTUSER = BUILD_URL + "/coWorker/getDepartmentUser"; //同事列表
export const GET_ONLINEUSER = BUILD_URL + "/coWorker/getOnlineUser"; //同事在线状态
export const GET_COWORKERRECORD = BUILD_URL + "/coWorker/getCoWorkerRecord"; //同事聊天记录

export const GET_GREETINGSCONF = BUILD_URL + "/repleConf/getGreetingsConf"; //获取问候语设置

export const DELETE_DETAILS = BUILD_URL + "/chatFastReply/deleteDetails"; //删除回复内容
export const EDIT_DETAILS = BUILD_URL + "/chatFastReply/editDetails "; //修改回复内容
export const EDIT_GROUPING = BUILD_URL + "/chatFastReply/editGrouping "; //修改分组
export const DELETE_GROUPING = BUILD_URL + "/chatFastReply/deleteGrouping "; //删除分组

export const GET_COLLEAGUE_SESSION_LIST = BUILD_URL + "/colleagueSession/getList "; //获取同事会话列表
export const GET_SESSION_LIST = BUILD_URL + "/session/getList "; // 设置消息已读

export const GET_MSG_LIST_BYMID = BUILD_URL + "/msg/getListByMid "; //根据消息ID获取消息列表

export const GET_LISTCUSTOMER = BUILD_URL + "/user/listCustomer"; 

export const UPLOAD_FILE = BUILD_URL + "/file/upload"; // 上传文件

export const INITFILE_CHANNEL_UPLOAD_FILE = BUILD_URL + "/file/initFileChannel"; // 分片上传文件

export const UPLOAD_FILE_V2 = BUILD_URL + "/file/fileUpload"; // 上传文件V2

export const GETENABLEJOININFO = BUILD_URL +"/cache/getEnableJoinInfo"
