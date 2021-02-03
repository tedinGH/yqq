

export default [
    {
        path: '/',
        name: 'index',
        meta: {
            title: 'Free chat and private social applications'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/Index')) }, 'Index')
    },
    {
        path: '/mac-login',
        name: 'mac-login',
        meta: {
            title: 'MacLogin'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/MacLogin')) }, 'MacLogin') 
    },
    {
        path: '/ios-install',
        name: 'ios-install',
        meta: {
            title: 'IOS download and install app'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/Iphone')) }, 'ios-install') 
    },
    {
        path: '/google-code',
        name: 'google-code',
        meta: {
            title: 'Retrieve Google Verify Code'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/GoogleCode')) }, 'GoogleCode') 
    },
    {
        path: '/download/:sourceType/:temp',
        name: 'download',
        meta: {
            title: 'Download'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/Download')) }, 'download') 
    },
    {
        path: '/Version',
        name: 'version',
        meta: {
            title: 'Download historical version'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/Version')) }, 'Version') 
    },
    {
        path: '/Swiper',
        name: 'swiper',
        meta: {
            title: 'Swiper'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/Swiper')) }, 'Swiper') 
    },
    //登录、注册、忘记密码等
    {
        path: '/other',
        redirect: '/login',
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/other/public')) }, 'Public'),
        children: [{
            path: '/login',
            name: 'login', 
            meta: {
                title: 'Login'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/other/Login')) }, 'Login')
        },
        {
            path: '/scan-login',
            name: 'scan-login',
            meta: {
                title: 'Scan login'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/other/ScanLogin')) }, 'ScanLogin')
        },
        {
            path: '/register/:userSourceType/:inviterId',
            name: 'register',
            meta: {
                title: 'Register'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/other/Register')) }, 'Register')
        },
        {
            path: '/confirm-psw/:userSourceType/:inviterId',
            name: 'confirm-psw',
            meta: {
                title: 'Confirm password'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/other/ConfirmPassword')) }, 'ConfirmPassword')
        },
        {
            path: '/forget-password',
            name: 'forget-password',
            meta: {
                title: 'Forget password'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/other/ForgetPassword')) }, 'ForgetPassword') 
        },
        {
            path: '/find-password',
            name: 'find-password',
            meta: {
                title: 'Find password'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/other/FindPassword')) }, 'FindPassword') 
        },
        ]
    },
    {
        path: '/agreement',
        name: 'agreement',
        meta: {
            title: 'Agreement'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/other/Agreement')) }, 'Agreement') 
    },
    // 账户安全认证
	{
        path: '/security',
		component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/security/Security')) }, 'Security'),
		children: [{
				path: '/',
				name: 'security',
				meta: {
					title: 'Account security'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/security/Index')) }, 'SecurityIndex')
			},
			{
				path: 'binding-phone',
				name: 'binding-phone',
				meta: {
					title: 'Binding phone'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/security/BindingPhone')) }, 'BindingPhone')
			},
			{
				path: 'modify-phone',
				name: 'modify-phone',
				meta: {
					title: 'Modify phone'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/security/ModifyPhone')) }, 'ModifyPhone')
			},
			{
				path: 'binding-email',
				name: 'binding-email',
				meta: {
					title: 'Binding email'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/security/BindingEmail')) }, 'BindingEmail')
			},
			{
				path: 'modify-email',
				name: 'modify-email',
				meta: {
					title: 'Modify email'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/security/ModifyEmail')) }, 'ModifyEmail')
			},
			{
				path: 'stop-google',
				name: 'stop-google',
				meta: {
					title: 'Stop Google Validation'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/security/StopGoogle')) }, 'StopGoogle')
			},
			{
				path: 'authentication',
				name: 'authentication',
				meta: {
					title: 'Authentication'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/security/Authentication')) }, 'Authentication')
			},
		]
    },
    // otc交易
    {
        path: '/otc',
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/otc/Otc')) }, 'Otc'),
        children: [{
                path: '/',
                name: 'otc',
                meta: {
                    title: 'Exchange'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/otc/Index')) }, 'OtcIndex')
            },
            {
                path: 'fait',
                name: 'fait',
                meta: {
                    title: 'Fait'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/otc/Fait')) }, 'OtcFait')
            },
            {
                path: '/account',
                component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/otc/account/Account')) }, 'OtcAccount'),
                children:[{
                    path:'/',
                    name: 'account',
                    meta: {
                        title: 'Account management'
                    },
                    component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/otc/account/Index')) }, 'OtcAccountIndex')
                },
                {
                    path:'payment-method',
                    name: 'payment-method',
                    meta: {
                        title: 'Payment method'
                    },
                    component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/otc/account/PaymentMethod')) }, 'OtcPaymentMethod')
                },
                {
                    path:'bussiness-auth',
                    name: 'bussiness-auth',
                    meta: {
                        title: 'Business Certification'
                    },
                    component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/otc/account/BussinessAuth')) }, 'OtcBussinessAuth')
                },
                ]
            },
            {
                path: 'order',
                name: 'order',
                meta: {
                    title: 'Order management'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/otc/Order')) }, 'OtcOrder')
            },
            {
                path: 'publish-advert/:id',
                name: 'publish-advert',
                meta: {
                    title: 'Publish advertisements'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/otc/PublishAdvert')) }, 'OtcPublishAdvert')
            },
            {
                path: 'manage-advert',
                name: 'manage-advert',
                meta: {
                    title: 'Advertising management'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/otc/ManageAdvert')) }, 'OtcManageAdvert')
            },
            {
                path: 'assets/:type',
                name: 'assets',
                meta: {
                    title: 'My assets'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/otc/Assets')) }, 'OtcAssets')
            },
            {
                path: 'trade/:tradeId',
                name: 'trade',
                meta: {
                    title: 'Confirm order'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/otc/OrderTrade')) }, 'OtcTrade')
            },
            {
                path: 'trade-detail/:tradeId',
                name: 'trade-detail',
                meta: {
                    title: 'Order detail'
                },
                component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/otc/OrderDetail')) }, 'OtcOrderDetail')
            },
        ]
    },
    //账号操作
    {
        path: '/account-operation',
        redirect: '/account-safe',
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/other/public')) }, 'AccountOperation'),
        children: [{
            path: '/account-safe',
            name: 'account-safe',
            meta: {
                title: 'Account security'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/account/Safe')) }, 'AccountSafe') 
        },
        {
            path: '/account-frozen',
            name: 'account-frozen',
            meta: {
                title: 'Account freezing'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/account/Frozen')) }, 'AccountFrozen')
        },
        {
            path: '/frozen-state',
            name: 'frozen-state',
            meta: {
                title: 'Account freezing status'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/account/FrozenState')) }, 'FrozenState')
        },
        {
            path: '/thaw-options',
            name: 'thaw-options',
            meta: {
                title: 'Thawing options'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/account/ThawOptions')) }, 'ThawOptions')
        },
        {
            path: '/account-thaw',
            name: 'account-thaw',
            meta: {
                title: 'Account thawing'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/account/Thaw')) }, 'AccountThaw')
        }
        ]
    },
    {
        path: '/feedback/:userId',
        name: 'feedback',
        meta: {
            title: 'Help and Feedback'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/feedback/Feedback')) }, 'Feedback')
    },
    {
        path: '/feedback-type/:userId/:type/:pId/:helpName',
        name: 'feedback-type',
        meta: {
            title: 'Feedback type'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/feedback/FeedbackType')) }, 'FeedbackType')
    },
    {
        path: '/feedback-case/:type/:pId/:helpName',
        name: 'feedback-case',
        meta: {
            title: 'Feedback Case'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/feedback/FeedbackCase')) }, 'FeedbackCase')
    },
    {
        path: '/feedback-form/:pId/:helpName',
        name: 'feedback-form',
        meta: {
            title: 'Feedback form'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/feedback/FeedbackForm')) }, 'FeedbackForm')
    },
    {
        path: '/feedback-other',
        name: 'feedback-other',
        meta: {
            title: 'Other feedback'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/feedback/FeedbackOther')) }, 'FeedbackOther')
    },
    {
        path: '/feedback-result/:pId/:helpName',
        name: 'feedback-result',
        meta: {
            title: 'Feedback results'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/feedback/FeedbackResult')) }, 'FeedbackResult')
    },
    {
        path: '/complaint/:type/:userId/:ownerId',
        name: 'complaint',
        meta: {
            title: 'User group complaints'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/complaint/Complaint')) }, 'Complaint')
    },
    {
        path: '/complaint-type/:id/:name',
        name: 'complaint-type',
        meta: {
            title: 'Types of complaints'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/complaint/ComplaintType')) }, 'ComplaintType')
    },
    {
        path: '/complaint-case/:cause/:breakLaw/:name',
        name: 'complaint-case',
        meta: {
            title: 'Complaint Case'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/complaint/ComplaintCase')) }, 'ComplaintCase')
    },
    {
        path: '/complaint-form/:cause/:breakLaw/:name',
        name: 'complaint-form',
        meta: {
            title: 'Complaint form'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/complaint/ComplaintForm')) }, 'ComplaintForm')
    },
    {
        path: '/complaint-success/:type',
        name: 'complaint-success',
        meta: {
            title: 'Complaint success'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/en-us/complaint/ComplaintSuccess')) }, 'ComplaintSuccess')
    },
    // 路由匹配不到重定向
    { 
        path: '*',
        redirect: {
            name: 'index'
        }
    },
]