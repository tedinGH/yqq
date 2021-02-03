/*----- 扫码登录模块 -----*/
export const LOGIN_QR_CODE = base.codeUrl + "/imrtcweb/login/getOrc.htm"  // 获取登录二维码参数
export const LOGIN_STATE = base.codeUrl + "/imrtcweb/login/state.htm"  //获取登录状态
export const QR_LOGIN = base.codeUrl + "/imweb/user/qrcodelogin.htm"  //扫码成功登录
 
export const SET_INFO = base.baseUrl + "/personal/query.htm"  //设置登录信息
export const LOAD_URL = base.baseUrl + "/version/getNewAppVersions.htm"  //获取下载地址
export const LOAD_APP = base.baseUrl + "/version/getOfficialWebsite.htm"  //获取安卓IOS下载
export const LOAD_VERSION = base.baseUrl + "/version/getAppAllVersions.htm"  //获取历史版本

export const LOGIN_AGAIN = base.imscUrl + '/api/scanLoginTipsApp.htm'  //点击确认登录 
export const LOG_OUT = base.baseUrl + '/user/logout.htm'  //退出登录 
export const LOGIN = base.baseUrl + '/user/login.htm' //账户密码登录
export const CHECK_PASSWORD = base.baseUrl + '/user/checkPassword.htm' //校验登录密码
export const CHECK_VERIFY_CODE = base.baseUrl + '/user/checkVerifyCode.htm' //校验登录验证码
export const REGISTER = base.baseUrl + '/user/register.htm' //账户注册
export const CHECK_REGISTER_CODE = base.baseUrl + '/user/registerCheck.htm' //校验注册验证码

/*----- 用户信息模块 -----*/
export const QUERY_INFO = base.baseUrl + '/personal/query.htm'  // 查询用户信息
export const CHECK_AUTH = base.baseUrl + '/user/checkAuth.htm'  // 验证用户是否实名认证
export const USER_AUTH = base.baseUrl + '/user/auth.htm'  // 实名认证
export const SET_MOBILE = base.baseUrl + '/personal/setmobile.htm' // 设置手机号
export const RESET_MOBILE_BY_SMS = base.baseUrl + '/personal/verifyResetMobileBySms.htm' //通过短信验证码修改手机号
export const RESET_MOBILE_BY_PSW = base.baseUrl + '/personal/verifyResetMobileByPwd.htm' //通过密码修改手机号
export const RESET_MOBILE = base.baseUrl + '/personal/resetMobile.htm' // 修改手机号
export const SET_EMAIL = base.baseUrl + '/personal/setEmail.htm' // 设置邮箱
export const RESET_EMAIL_BY_SMS = base.baseUrl + '/personal/verifyResetEmailBySms.htm' //通过短信验证码修改邮箱
export const RESET_EMAIL_BY_PSW = base.baseUrl + '/personal/verifyResetEmailByPwd.htm' //通过密码修改邮箱
export const RESET_EMAIL = base.baseUrl + '/personal/resetEmail.htm' // 修改邮箱
export const CHECK_FROZEN_STATE = base.baseUrl + '/user/checkFrozenState.htm' // 获取账户冻结状态
export const FROZEN_USER = base.baseUrl + '/user/frozenUser.htm' // 冻结账户
export const UNFROZEN_USER = base.baseUrl + '/user/unfrozenUser.htm' // 解冻账户
export const GET_UNFROZEN_INFO = base.baseUrl + '/user/findPwdFirst.htm' // 获取解冻账户
export const DOUBLE_VERIFY = base.baseUrl+'/user/securityAuth.htm' // 邮箱1、手机号双重安全认证
export const RESET_PASSWORD = base.baseUrl + '/user/findPwd.htm'  // 重置密码

/*----- 反馈 -----*/
export const GET_REASON_LIST = base.imscUrl + '/help/relationList.htm'  // 获取反馈原因
export const GET_PROBLEM_LIST = base.imscUrl + '/help/problemList.htm' //获取反馈问题
export const GET_HELP_FEEKBACK = base.imscUrl + '/help/scenarioList.htm' //获取帮助反馈
export const ADD_HELP_FEEKBACK = base.imscUrl + '/help/addHelpFeedbackInfo.htm' //添加帮助反馈
export const GET_HELP_HISTORY = base.imscUrl + '/help/updateHelpNumber.htm' //获取更新解决和未解决反馈
export const GET_PROBLEM_DETAIL = base.imscUrl + '/help/problemDetails.htm' //获取更新解决和未解决反馈

/*----- 投诉 -----*/
export const GET_COMPLAIN_LIST = base.baseUrl + '/complain/list.htm'  // 获取投诉列表
export const ADD_COMPLAIN = base.baseUrl + '/complain/add.htm'  // 添加投诉
export const GET_COMPLAIN_TYPE = base.baseUrl + '/complain/son.htm' // 获取投诉类型

/*----- 其他 -----*/
export const DOWNLOAD_APP = base.baseUrl + '/version/getNewAppVersions.htm'  // 获取下载app二维码参数
export const SYSTEM_STATUS = base.baseUrl + '/user/isAPPAffiche.htm' // 获取系统维护详情
export const GET_SMS_CODE = base.baseUrl + '/msg/sms/send.htm'  // 获取短信验证码
export const GET_EMAIL_CODE = base.baseUrl + '/msg/mail/send.htm'  // 获取邮箱验证码
export const GET_SMS_CODE_NO = base.baseUrl + '/msg/sms/noLoginSend.htm'  // 未登录状态获取短信验证码
export const GET_EMAIL_CODE_NO = base.baseUrl + '/msg/mail/noLoginSend.htm'  // 未登录状态获取邮箱验证码
export const CREATE_CODE = base.baseUrl + '/user/createCode.htm'  // 获取点选验证码
export const CHECK_CODE = base.baseUrl + '/user/checkCode.htm'  // 校验点选验证码
export const CHECK_FROZEN_CODE = base.baseUrl + '/user/checkFrozenCode.htm' // 校验账户冻结点选验证码
export const CREATE_GOOGLE_CODE = base.baseUrl + '/user/createGoogleCode.htm' // 创建谷歌验证码验证码
export const OPEN_GOOGLE = base.baseUrl + '/user/bindGoogleKey.htm' // 开启谷歌验证
export const CLOSE_GOOGLE = base.baseUrl + '/user/closeGoogle.htm' // 关闭谷歌验证
export const GOOGLE_CHECK = base.baseUrl + '/user/googleCheck.htm' //检查是否需要谷歌验证码
export const GRT_URL = base.baseUrl + '/version/getOfficialWebsite.htm' // 获取下载地址


