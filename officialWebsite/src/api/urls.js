let BUILD_URL = base.build_url
let MSG_URL = base.msg_url


export const SEND = BUILD_URL + '/sms/send' //获取验证码

export const CREATECODE = BUILD_URL + '/user/createCode' //获取点选验证码

export const CHECKCODE = BUILD_URL + '/user/checkCode' //校验点选验证码

export const GETCOMPANYBYPHONE = BUILD_URL + '/user/getCompanyByPhone'  //校验手机号是否已经注册

export const CHECKSMSCODE = BUILD_URL + '/user/checkSmsCode'  //校验手机验证码

export const GETLIST = BUILD_URL + '/company/getIndustryList'   //获取行业

export const GETCOMPANYBYNAME = BUILD_URL + '/company/getCompanyByName'   //验证公司是否已注册

export const REGISTERCOMPANY = BUILD_URL + '/user/registerCompany'   //注册

export const CHECKFINDPWDCODE = BUILD_URL + '/user/checkFindPwdCode'  //忘记密码校验手机验证码

export const UPDATEPWD = BUILD_URL + '/user/updatePwd'  //修改密码

export const GETBYCOMPANYANDPHONE = BUILD_URL + '/user/getByCompanyAndPhone'  //根据企业id和手机号码验证企业是否存在此用户




