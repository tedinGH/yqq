let BUILD_URL // 请求地址
let LOGIN_URL // 登录/登出 地址

// 环境配置 PS：没啥事不要改这个
switch (process.env.NODE_ENV) {
	// 开发环境
	case 'development':
		BUILD_URL = '/proxyApis'
		LOGIN_URL = 'http://10.79.10.39/cas'
		break
	// 测试环境
	case 'testServer':
		BUILD_URL = 'https://10.79.10.105:8443/ces-api'
		LOGIN_URL = 'http://10.79.10.36/cas'
		break
	// 准上线环境
	case 'release':
		BUILD_URL = 'https://10.79.10.105:8443/sitces-api'
		// BUILD_URL = 'https://wxtest.csair.com:5202/sitces-api'
		LOGIN_URL = 'http://10.79.10.102/cas'
		break
	// 生产环境
	case 'production':
		// 生产环境的API地址
		BUILD_URL = 'https://cargo.csair.com/ces-api'
		LOGIN_URL = 'https://cargo.csair.com/cas'
		break
}

export const loginURL = LOGIN_URL

// 获取接口地址
function urlHandle(actionName) {
	return BUILD_URL + actionName
}

export const apiConfig = {
	// build 地址
	BUILD_URL: BUILD_URL,
	// 获取用户信息
	GET_B2E_USER_INFO: urlHandle('/b2e-user/b2eUser/getB2EUserInfo'),
	// 获取大客户信息
	GET_B2E_CUSTOM: urlHandle('/b2e-user/b2eUser/getB2eCustomDto'),
	// 获取代理人信息
	GET_B2E_AGENT: urlHandle('/b2e-user/b2eUser/getB2eAgent'),
	// 订单管理
	GET_ORDER_LIST: urlHandle('/b2e-order/b2eOrder/getOrderList'),
	// 订单详情
	GET_ORDER_DETAIL: urlHandle('/b2e-order/b2eOrder/getOrderDetail'),
	// TODO：航班动态查询 （好像没有这个）
	LIST_DYNAMIC_FLIGHT: urlHandle('/b2e-flight/flight/listDynamicFlight'),

	// b2e-support
	// 锂电池相关校验
	CHECK_LITHIUMBATTERY_INFO: urlHandle(
		'/b2e-support/lithiumBattery/checkLithiumBatteryAndCheckInfo'
	),
	// 货物代码、品名接口
	GET_COMMODITY_BY_CODE: urlHandle(
		'/b2e-support/cesStaticdata/getCommodityByCode'
	),
	// 锂电池模糊查询接口
	SEARCH_BATERY_DETAIL: urlHandle(
		// '/b2e-support/cesStaticdata/getBateryDetailByFuzzyManufacturer'
		// '/b2e-support/lithiumBattery/selectByManufacturer'
		'/b2e-support/lithiumBattery/selectByCargoinfo'
	),
	// 危险品列表 - list
	GET_DANGEROUS_CARGO_DETAIL: urlHandle(
		'/b2e-support/cesStaticdata/listDangerousCargoDetail'
	),
	// 危险品列表 - 类树结构
	GET_DANGEROUS_CARGO_TREE: urlHandle(
		'/b2e-support/cesStaticdata/getDangerousCargoTree'
	),
	// 危险品文件名称
	GET_DANGEROUS_ATTACHMENT_NAME: urlHandle(
		'/b2e-support/cesStaticdata/getLatestDangerousAttachmentName'
	),
	// 危险品文件下载
	DOWNLOAD_DANGEROUS_ATTACHMENT: urlHandle(
		'/b2e-support/cesStaticdata/downloadDangerousAttachmentById'
	),
	// 特货码接口
	LIST_SPECIAL_CODE: urlHandle('/b2e-support/cesStaticdata/listSpecialCode'),
	// 货物类型
	GET_ALL_SHIPMENT_TYPE: urlHandle(
		'/b2e-support/cesStaticdata/listShipmentTypeByChannel'
	),
	// 获取站点货物类型列表
	GET_SHIPMENT_TYPE_LIST: urlHandle(
		'/b2e-support/cesStaticdata/listShipmentTypeByChannelandOrigin'
	),
	// 获取站点货物类型
	QUERY_SHIPMENT_TYPE_DATA: urlHandle(
		'/b2e-support/cesStaticdata/getShipmentTypeCanUse'
	),
	// 获取板型数据
	GET_ALL_ACTYPE_PLATE: urlHandle(
		'/b2e-support/cesStaticdata/getAllActypePlate'
	),
	// 检查销售代理人有没有第四五类危险品培训资质或有效期已过
	CHECK_AGENT_VALID: urlHandle('/b2e-support/agentCheck/checkAgentValid'),
	// 承运人校验
	GET_CARRIER: urlHandle('/b2e-support/cesStaticdata/getCarrier'),

	// b2e-order
	// 提交订单
	CREATE_ORDER: urlHandle('/b2e-order/b2eOrder/createOrder'),
	// 判断是否为一票一议运单号
	CHECK_AWB_NO_IN_TANGWEB: urlHandle('/b2e-order/b2eOrder/checkAwbNoInTangWeb'),
	// 计算计费重量
	CALCULATE_CWEIGHT: urlHandle('/b2e-order/b2eOrder/calculateCWeight'),
	// 判断是否有国际站点，航班号是否存在
	HAS_INTCITY: urlHandle('/b2e-order/b2eOrder/hasIntCity'),
	// 【B2E】判断航班号与航段是否相符
	CHECK_FLIGHT_INFO: urlHandle('/b2e-order/b2eOrder/checkFlightInfo'),
	// 填写货物信息页面，查询订单的杂费
	QUERY_CHARGE: urlHandle('/b2e-order/b2eOrder/queryServiceCharge'),
	// 填写货物信息页面，计算订单的杂费
	CALCULATE_CHARGE: urlHandle('/b2e-order/b2eOrder/calculateCharge'),
	// 根据手输入费率 计算 参考运费
	CALCULATE_REFERENCE_CHARGE: urlHandle(
		'/b2e-order/b2eOrder/calculateReferenceCharge'
	),
	// 补填联系人
	ORDER_SAVE_CONTACT: urlHandle('/b2e-order/b2eOrder/saveContact'),
	// 补填联系人+活体动物
	SAVE_CONTACT_AND_LIVEANIMALS: urlHandle(
		'/b2e-order/b2eOrder/saveContactAndLiveAnimals'
	),

	// b2e-flight
	// 查询运价
	QUERY_B2E_FLIGHT_PRICE: urlHandle(
		'/b2e-flight/cesB2eFlightPrice/queryB2eFlightPrice'
	),

	// 打印锂电池
	PRINT_LITHIUMBATTERY_AND_CHECKINFO: urlHandle(
		'/b2e-order/b2eOrder/printLithiumBatteryAndCheckInfo'
	),
	// 活体动物托运说明
	QUERY_LIVINGANIMAL_PROOF: urlHandle(
		'/b2e-order/b2eOrder/querylivingAnimalProofByorderId'
	),
	// 下载活体动物托运说明书
	DOWN_LIVINGANIMAL_PROOF: urlHandle(
		'/b2e-order/cesLivingAnimalProof/downlivingAnimalProof'
	),
	// 安检申报单
	QUERY_SECURITY_APPLY_DETAIL: urlHandle(
		'/b2e-order/cesSecurityApply/b2GquerySecurityApplyDetail'
	),
	// 检查是否可以取消订单
	CHECK_CANCEL_ABLE_B2E: urlHandle(
		'/b2e-order/b2eOrderCancel/checkCancellableB2e'
	),
	// 获取取消订单费用
	GET_ORDER_CANCEL_FEE_B2E: urlHandle(
		'/b2e-order/b2eOrderCancel/getOrderCancelFeeB2e'
	),
	// 取消订单
	ORDER_CANCEL_B2E: urlHandle('/b2e-order/b2eOrderCancel/orderCancelB2e'),
	// 获取板型数据
	GET_RES_PLATE: urlHandle('/b2e-order/b2eOrder/getResPlate'),
	// 运单详情
	GET_AWB_DETAIL: urlHandle('/b2e-order/b2eOrder/getAwbDetail'),
	// 删除订单
	DELETE_B2G_ORDER: urlHandle('/b2e-order/b2eOrderCancel/deleteB2gOrder'),
	//订单管理 获取变更单列表
	GET_CHANGES_BY_ORDER_ID: urlHandle(
		'/b2e-order/b2gChangeManage/queryChangesByOrderId'
	),
	//订单管理 获取历史费用
	GET_FEE_HISTORY: urlHandle('/b2e-order/b2eOrder/feeHistory'),
	// 变更单详情
	GET_CHANGE_ORDER_DETAIL: urlHandle(
		'/b2e-order/b2gChangeManage/getChangeOrderDetail'
	),
	// 变更单详情 操作记录
	GET_CHANGE_ORDER_LOG: urlHandle(
		'/b2e-order/b2gChangeManage/getChangeOrderLog'
	),
	// 货物跟踪 验证码
	GET_CAPTCHA_IMGS: urlHandle('/b2e-awb/b2gCargotracking/getCaptcha'),
	// 货物跟踪 用户登录
	QUERY_CARGO_TRACKING_INFO_LOGIN: urlHandle(
		'/b2e-awb/b2gCargotracking/queryCargoInfoLogin'
	),
	// 货物跟踪 用户登录  先验证是否本人/是否本企业用户/是否本代理人
	QUERY_CARGO_TRACKING_INFO_ALL: urlHandle(
		'/b2e-awb/b2gCargotracking/queryCargoInfoAll'
	),
	// 货物跟踪 用户未登录
	QUERY_CARGO_TRACKING_INFO: urlHandle(
		'/b2e-awb/b2gCargotracking/queryCargoInfo'
	),
	// 货物跟踪 物流信息
	QUERY_CARGO_TRACKING_ONE_INFO: urlHandle(
		'/b2e-awb/b2gCargotracking/queryOneInfo'
	),
	// 货物跟踪 货物状态信息
	QUERY_CARGO_TRACKING_STATUS: urlHandle('/b2e-awb/b2gCargotracking/status'),
	// 货物跟踪 航班信息
	GET_CARGO_TRACKING_FLIGHT: urlHandle('/b2e-awb/b2gCargotracking/getFlight'),
	// 货物跟踪 获取运单
	GET_AWB_POSTFIX: urlHandle('/b2e-awb/b2gCargotracking/getAwb'),
	// 变更其他
	HANDLE_B2G_CHANGE_OTHER: urlHandle('/b2e-order/b2gChangeOther/changeSave'),
	// 校验是否可以变更其他
	CHECK_B2G_CHANGE_OTHER: urlHandle('/b2e-order/b2gChangeOther/changeable'),
	// 变更重量__能否变更
	CHANGE_WEIGHT_CHANGER_ABLE: urlHandle(
		'/b2e-order/b2gChangeWeight/changeable'
	),
	// 变更重量__订单详情
	CHANGE_WEIGHT_FORWARD: urlHandle('/b2e-order/b2gChangeWeight/forward'),
	// 变更重量__计算费用
	CHANGE_WEIGHT_CALCULATE_CHARGE: urlHandle(
		'/b2e-order/b2gChangeWeight/calculateCharge'
	),
	// 变更重量__提交变更
	CHANGE_WEIGHT_CREATE_CHANGE: urlHandle(
		'/b2e-order/b2gChangeWeight/createChange'
	),

	// 修改航班 可否变更
	CHANGE_FLIGHT_CHANGEABLE: urlHandle('/b2e-order/b2gChangeFlight/changeable'),
	// 修改航班 变更信息
	CHANGE_FLIGHT_FORWARD: urlHandle('/b2e-order/b2gChangeFlight/forward'),
	// 修改航班 查询舱位等级、费率、参考运费
	CHANGE_FLIGHT_CHANGEPRICE: urlHandle(
		'/b2e-order/b2gChangeFlight/queryChangePrice'
	),
	// 修改航班 刷新计算费用
	CHANGE_FLIGHT_CALCULATE_CHARGE: urlHandle(
		'/b2e-order/b2gChangeFlight/calculateCharge'
	),
	// 修改航班 提交变更单
	CHANGE_FLIGHT_CREATE_CHANGE: urlHandle(
		'/b2e-order/b2gChangeFlight/createChange'
	),
	// 变更单 检查能否取消变更单
	CHECK_CANCEL_CHANGE_CONDITIONS: urlHandle(
		'/b2e-order/b2gChangeManage/checkCancelChangeConditions'
	),
	// 变更单 取消变更单
	BTN_CANCEL_CHANGE: urlHandle('/b2e-order/b2gChangeManage/btnCancelChange')
}
