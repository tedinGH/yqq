

export default [
    {
        path: '/',
        name: 'index',
        meta: {
            title: '免费聊天与私密社交应用'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/Index')) }, 'Index')
    },
    {
        path: '/mac-login',
        name: 'mac-login',
        meta: {
            title: 'Echat登录'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/MacLogin')) }, 'MacLogin') 
    },
    {
        path: '/ios-install',
        name: 'ios-install',
        meta: {
            title: 'ios下载安装app'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/Iphone')) }, 'ios-install') 
    },
    {
        path: '/google-code',
        name: 'google-code',
        meta: {
            title: '找回谷歌验证码'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/GoogleCode')) }, 'GoogleCode') 
    },
    {
        path: '/download/:sourceType/:temp',
        name: 'download',
        meta: {
            title: '下载'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/Download')) }, 'download') 
    },
    {
        path: '/Version',
        name: 'version',
        meta: {
            title: '历史版本下载页'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/Version')) }, 'Version') 
    },
    //登录、注册、忘记密码等
    {
        path: '/other',
        redirect: '/login',
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/other/public')) }, 'Public'),
        children: [{
            path: '/login',
            name: 'login', 
            meta: {
                title: '登录'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/other/Login')) }, 'Login')
        },
        {
            path: '/scan-login',
            name: 'scan-login',
            meta: {
                title: '二维码登录'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/other/ScanLogin')) }, 'ScanLogin')
        },
        {
            path: '/register/:userSourceType/:inviterId',
            name: 'register',
            meta: {
                title: '注册'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/other/Register')) }, 'Register')
        },
        {
            path: '/confirm-psw/:userSourceType/:inviterId',
            name: 'confirm-psw',
            meta: {
                title: '确认密码'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/other/ConfirmPassword')) }, 'ConfirmPassword')
        },
        {
            path: '/forget-password',
            name: 'forget-password',
            meta: {
                title: '忘记密码'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/other/ForgetPassword')) }, 'ForgetPassword') 
        },
        {
            path: '/find-password',
            name: 'find-password',
            meta: {
                title: '找回密码'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/other/FindPassword')) }, 'FindPassword') 
        },
        ]
    },
    {
        path: '/agreement',
        name: 'agreement',
        meta: {
            title: '协议'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/other/Agreement')) }, 'Agreement') 
    },
    // 账户安全认证
	{
        path: '/security',
		component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/security/Security')) }, 'Security'),
		children: [{
				path: '/',
				name: 'security',
				meta: {
					title: '账户安全'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/security/Index')) }, 'SecurityIndex')
			},
			{
				path: 'binding-phone',
				name: 'binding-phone',
				meta: {
					title: '绑定手机'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/security/BindingPhone')) }, 'BindingPhone')
			},
			{
				path: 'modify-phone',
				name: 'modify-phone',
				meta: {
					title: '修改绑定手机'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/security/ModifyPhone')) }, 'ModifyPhone')
			},
			{
				path: 'binding-email',
				name: 'binding-email',
				meta: {
					title: '绑定邮箱'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/security/BindingEmail')) }, 'BindingEmail')
			},
			{
				path: 'modify-email',
				name: 'modify-email',
				meta: {
					title: '修改绑定邮箱'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/security/ModifyEmail')) }, 'ModifyEmail')
			},
			{
				path: 'stop-google',
				name: 'stop-google',
				meta: {
					title: '解除谷歌验证'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/security/StopGoogle')) }, 'StopGoogle')
			},
			{
				path: 'authentication',
				name: 'authentication',
				meta: {
					title: '实名认证'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/security/Authentication')) }, 'Authentication')
			},
		]
    },
    // otc交易
    {
        path: '/otc',
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/otc/Otc')) }, 'Otc'),
        children: [{
                path: '/',
                name: 'otc',
                meta: {
                    title: '币币交易'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/otc/Index')) }, 'OtcIndex')
            },
            {
                path: 'fait',
                name: 'fait',
                meta: {
                    title: '法币交易'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/otc/Fait')) }, 'OtcFait')
            },
            {
                path: '/account',
                component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/otc/account/Account')) }, 'OtcAccount'),
                children:[{
                    path:'/',
                    name: 'account',
                    meta: {
                        title: '账号管理'
                    },
                    component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/otc/account/Index')) }, 'OtcAccountIndex')
                },
                {
                    path:'payment-method',
                    name: 'payment-method',
                    meta: {
                        title: '支付方式'
                    },
                    component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/otc/account/PaymentMethod')) }, 'OtcPaymentMethod')
                },
                {
                    path:'bussiness-auth',
                    name: 'bussiness-auth',
                    meta: {
                        title: '商家认证'
                    },
                    component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/otc/account/BussinessAuth')) }, 'OtcBussinessAuth')
                },
                ]
            },
            {
                path: 'order',
                name: 'order',
                meta: {
                    title: '订单管理'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/otc/Order')) }, 'OtcOrder')
            },
            {
                path: 'publish-advert/:id',
                name: 'publish-advert',
                meta: {
                    title: '发布广告'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/otc/PublishAdvert')) }, 'OtcPublishAdvert')
            },
            {
                path: 'manage-advert',
                name: 'manage-advert',
                meta: {
                    title: '广告管理'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/otc/ManageAdvert')) }, 'OtcManageAdvert')
            },
            {
                path: 'assets/:type',
                name: 'assets',
                meta: {
                    title: '我的资产'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/otc/Assets')) }, 'OtcAssets')
            },
            {
                path: 'trade/:tradeId',
                name: 'trade',
                meta: {
                    title: '确认订单'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/otc/OrderTrade')) }, 'OtcTrade')
            },
            {
                path: 'trade-detail/:tradeId',
                name: 'trade-detail',
                meta: {
                    title: '订单详情'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/otc/OrderDetail')) }, 'OtcOrderDetail')
            },
        ]
    },
    //账号操作
    {
        path: '/account-operation',
        redirect: '/account-safe',
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/other/public')) }, 'AccountOperation'),
        children: [{
            path: '/account-safe',
            name: 'account-safe',
            meta: {
                title: '账号安全'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/account/Safe')) }, 'AccountSafe') 
        },
        {
            path: '/account-frozen',
            name: 'account-frozen',
            meta: {
                title: '账号冻结'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/account/Frozen')) }, 'AccountFrozen')
        },
        {
            path: '/frozen-state',
            name: 'frozen-state',
            meta: {
                title: '账号冻结状态'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/account/FrozenState')) }, 'FrozenState')
        },
        {
            path: '/thaw-options',
            name: 'thaw-options',
            meta: {
                title: '解冻选项'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/account/ThawOptions')) }, 'ThawOptions')
        },
        {
            path: '/account-thaw',
            name: 'account-thaw',
            meta: {
                title: '账号解冻'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/account/Thaw')) }, 'AccountThaw')
        }
        ]
    },
    {
        path: '/feedback/:userId',
        name: 'feedback',
        meta: {
            title: '帮助与反馈'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/feedback/Feedback')) }, 'Feedback')
    },
    {
        path: '/feedback-type/:userId/:type/:pId/:helpName',
        name: 'feedback-type',
        meta: {
            title: '反馈类型'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/feedback/FeedbackType')) }, 'FeedbackType')
    },
    {
        path: '/feedback-case/:type/:pId/:helpName',
        name: 'feedback-case',
        meta: {
            title: '反馈情况'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/feedback/FeedbackCase')) }, 'FeedbackCase')
    },
    {
        path: '/feedback-form/:pId/:helpName',
        name: 'feedback-form',
        meta: {
            title: '反馈表单'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/feedback/FeedbackForm')) }, 'FeedbackForm')
    },
    {
        path: '/feedback-other',
        name: 'feedback-other',
        meta: {
            title: '其他反馈'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/feedback/FeedbackOther')) }, 'FeedbackOther')
    },
    {
        path: '/feedback-result/:pId/:helpName',
        name: 'feedback-result',
        meta: {
            title: '反馈结果'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/feedback/FeedbackResult')) }, 'FeedbackResult')
    },
    {
        path: '/complaint/:type/:userId/:ownerId',
        name: 'complaint',
        meta: {
            title: '用户群投诉'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/complaint/Complaint')) }, 'Complaint')
    },
    {
        path: '/complaint-type/:id/:name',
        name: 'complaint-type',
        meta: {
            title: '投诉类型'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/complaint/ComplaintType')) }, 'ComplaintType')
    },
    {
        path: '/complaint-case/:cause/:breakLaw/:name',
        name: 'complaint-case',
        meta: {
            title: '投诉情况'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/complaint/ComplaintCase')) }, 'ComplaintCase')
    },
    {
        path: '/complaint-form/:cause/:breakLaw/:name',
        name: 'complaint-form',
        meta: {
            title: '投诉表单'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/complaint/ComplaintForm')) }, 'ComplaintForm')
    },
    {
        path: '/complaint-success/:type',
        name: 'complaint-success',
        meta: {
            title: '投诉成功'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/complaint/ComplaintSuccess')) }, 'ComplaintSuccess')
    },
    // 路由匹配不到重定向
    { 
        path: '*',
        redirect: {
            name: 'index'
        }
    },
]