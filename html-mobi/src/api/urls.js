/*----- 忘记密码模块 -----*/
export const FIND_PWD_FIRST = base.baseUrl + '/user/findPwdFirst.htm'  //查找账号


/*----- 用户信息模块 -----*/
export const CREATE_CODE = base.baseUrl + '/user/createCode.htm'  // 获取点选验证码
export const CHECK_CODE = base.baseUrl + '/user/checkCode.htm'  // 校验点选验证码
export const GET_SMS_CODE = base.baseUrl + '/msg/sms/send.htm'  // 获取短信验证码
export const GET_EMAIL_CODE = base.baseUrl + '/msg/mail/send.htm'  // 获取邮箱验证码
export const GET_SMS_CODE_NO = base.baseUrl + '/msg/sms/noLoginSend.htm'  // 未登录状态获取短信验证码
export const GET_EMAIL_CODE_NO = base.baseUrl + '/msg/mail/noLoginSend.htm'  // 未登录状态获取邮箱验证码
export const DOUBLE_VERIFY = base.baseUrl+'/user/securityAuth.htm' // 邮箱1、手机号双重安全认证

export const RESET_PASSWORD = base.baseUrl + '/user/findPwd.htm'  // 重置密码

export const USER_ORGROUP = base.imscUrl + '/api/userOrGroup.htm'// 用户邀请

export const CHECK_FROZEN_STATE = base.baseUrl + '/user/checkFrozenState.htm' // 获取账户冻结状态

export const REGISTER = base.baseUrl + '/user/register.htm' //账户注册
export const CHECK_REGISTER_CODE = base.baseUrl + '/user/registerCheck.htm' //校验注册验证码

export const LOAD_EMOJI = base.codeUrl+'/emojiweb/expression/hotDoorEmoji.htm' //获取表情
export const SEE_ITEM = base.codeUrl+'/emojiweb/expression/getExpressionDetials.htm' //表情
