

export default [
    {
        path: '/',
        name: 'index',
        meta: {
            title: 'အခမဲ့စကားပြောခန်းနှင့်ပုဂ္ဂလိကလူမှုရေး application များ'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/Index')) }, 'Index')
    },
    {
        path: '/mac-login',
        name: 'mac-login',
        meta: {
            title: 'MacLogin'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/MacLogin')) }, 'MacLogin') 
    },
    {
        path: '/ios-install',
        name: 'ios-install',
        meta: {
            title: 'IOS ဖြင့်App‌‌တောင်းမည့်နည်းလမ်း'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/Iphone')) }, 'ios-install') 
    },
    {
        path: '/google-code',
        name: 'google-code',
        meta: {
            title: 'ဂြတ္ကဲစိစစ္ျပီးနံပါတ္ကိုရွာေဖြျခင္း'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/zh-cn/GoogleCode')) }, 'GoogleCode') 
    },
    {
        path: '/download/:sourceType/:temp',
        name: 'download',
        meta: {
            title: 'Download'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/Download')) }, 'download') 
    },
    {
        path: '/Version',
        name: 'version',
        meta: {
            title: 'သမိုင်းဝင် version ကို download လုပ်ပါ'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/Version')) }, 'Version') 
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
                title: 'မွတ္ပံုတင္ရန'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/my/other/Login')) }, 'Login')
        },
        {
            path: '/scan-login',
            name: 'scan-login',
            meta: {
                title: 'မွတ္ပံုတင္ရန'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/my/other/ScanLogin')) }, 'ScanLogin')
        },
        {
            path: '/register/:userSourceType/:inviterId',
            name: 'register',
            meta: {
                title: 'အီချက် ကောင့်ဖွင့်မည်'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/my/other/Register')) }, 'Register')
        },
        {
            path: '/confirm-psw/:userSourceType/:inviterId',
            name: 'confirm-psw',
            meta: {
                title: 'အီခ်က္လ်ိဳ႕ဝွက္နံပါတ္ကိုရွာေဖြျခင္း'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/my/other/ConfirmPassword')) }, 'ConfirmPassword')
        },
        {
            path: '/forget-password',
            name: 'forget-password',
            meta: {
                title: 'အီခ်က္လ်ိဳ႕ဝွက္နံပါတ္ကိုရွာေဖြျခင္း'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/my/other/ForgetPassword')) }, 'ForgetPassword') 
        },
        {
            path: '/find-password',
            name: 'find-password',
            meta: {
                title: 'အီခ်က္လ်ိဳ႕ဝွက္နံပါတ္ကိုရွာေဖြျခင္း'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/my/other/FindPassword')) }, 'FindPassword') 
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
		component: resolve => require.ensure([], () => { resolve(require('@/views/my/security/Security')) }, 'Security'),
		children: [{
				path: '/',
				name: 'security',
				meta: {
					title: 'အကောင့်လုံခြုံမူ'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/my/security/Index')) }, 'SecurityIndex')
			},
			{
				path: 'binding-phone',
				name: 'binding-phone',
				meta: {
					title: 'ဖုန်းကိုချည်ထားပါ'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/my/security/BindingPhone')) }, 'BindingPhone')
			},
			{
				path: 'modify-phone',
				name: 'modify-phone',
				meta: {
					title: 'ချိတ်ထားသောဖုန်းနံပါတ်ကိုပြုပြင်ခြင်း'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/my/security/ModifyPhone')) }, 'ModifyPhone')
			},
			{
				path: 'binding-email',
				name: 'binding-email',
				meta: {
					title: 'စာတိုက်ပုံးသို့ချည်ထားသည်'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/my/security/BindingEmail')) }, 'BindingEmail')
			},
			{
				path: 'modify-email',
				name: 'modify-email',
				meta: {
					title: 'ချည်နှောင်ထားသောစာတိုက်ပုံးကိုပြုပြင်ပါ'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/my/security/ModifyEmail')) }, 'ModifyEmail')
			},
			{
				path: 'stop-google',
				name: 'stop-google',
				meta: {
					title: 'Google Verification ကိုသော့ဖွင့်ပါ'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/my/security/StopGoogle')) }, 'StopGoogle')
			},
			{
				path: 'authentication',
				name: 'authentication',
				meta: {
					title: 'စစ်မှန်သောအမည်စစ်မှန်ကြောင်းအထောက်အထားပြသခြင်း'
				},
				component: resolve => require.ensure([], () => { resolve(require('@/views/my/security/Authentication')) }, 'Authentication')
			},
		]
    },
    // otc交易
    {
        path: '/otc',
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/otc/Otc')) }, 'Otc'),
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
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/other/public')) }, 'AccountOperation'),
        children: [{
            path: '/account-safe',
            name: 'account-safe',
            meta: {
                title: 'အကောင့်လုံခြုံမူ'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/my/account/Safe')) }, 'AccountSafe') 
        },
        {
            path: '/account-frozen',
            name: 'account-frozen',
            meta: {
                title: 'အီခ်က္အသံုးျပဳရန္ကန္႔သတ္သည့္အေကာင့္နံပါတ'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/my/account/Frozen')) }, 'AccountFrozen')
        },
        {
            path: '/frozen-state',
            name: 'frozen-state',
            meta: {
                title: 'အီခ်က္အသံုးျပဳရန္ကန္႔သတ္သည့္အေကာင့္နံပါတ'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/my/account/FrozenState')) }, 'FrozenState')
        },
        {
            path: '/thaw-options',
            name: 'thaw-options',
            meta: {
                title: 'အီချက် အကောင့်ပြန်ဖြည်ပါမည်'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/my/account/ThawOptions')) }, 'ThawOptions')
        },
        {
            path: '/account-thaw',
            name: 'account-thaw',
            meta: {
                title: 'အီချက် အကောင့်ပြန်ဖြည်ပါမည်'
            },
            component: resolve => require.ensure([], () => { resolve(require('@/views/my/account/Thaw')) }, 'AccountThaw')
        }
        ]
    },
    {
        path: '/feedback/:userId',
        name: 'feedback',
        meta: {
            title: 'ကူညီမူနှင့်တုံ့ပြန်မူ'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/feedback/Feedback')) }, 'Feedback')
    },
    {
        path: '/feedback-type/:userId/:type/:pId/:helpName',
        name: 'feedback-type',
        meta: {
            title: 'ပြသနာအမျိုးစား'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/feedback/FeedbackType')) }, 'FeedbackType')
    },
    {
        path: '/feedback-case/:type/:pId/:helpName',
        name: 'feedback-case',
        meta: {
            title: 'ကျေးဇူးပြု၍ဖြစ်ပေါ်နေသည့်ပြသနာကိုရွေးချယ်ပြီးပေးပို့ပါ'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/feedback/FeedbackCase')) }, 'FeedbackCase')
    },
    {
        path: '/feedback-form/:pId/:helpName',
        name: 'feedback-form',
        meta: {
            title: 'ကျေးဇူးပြု၍ သင်ကြုံတွေ့သည်ပြသနာကိုရွေးချယ်ပါ'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/feedback/FeedbackForm')) }, 'FeedbackForm')
    },
    {
        path: '/feedback-other',
        name: 'feedback-other',
        meta: {
            title: 'အခြားအမြင်တုံ့ပြန်မူ'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/feedback/FeedbackOther')) }, 'FeedbackOther')
    },
    {
        path: '/feedback-result/:pId/:helpName',
        name: 'feedback-result',
        meta: {
            title: 'အမြင်တုံ့ပြန်မူ'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/feedback/FeedbackResult')) }, 'FeedbackResult')
    },
    {
        path: '/complaint/:type/:userId/:ownerId',
        name: 'complaint',
        meta: {
            title: 'တိုင်ခံရခြင်း'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/complaint/Complaint')) }, 'Complaint')
    },
    {
        path: '/complaint-type/:id/:name',
        name: 'complaint-type',
        meta: {
            title: 'တိုင်ခံရခြင်း'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/complaint/ComplaintType')) }, 'ComplaintType')
    },
    {
        path: '/complaint-case/:cause/:breakLaw/:name',
        name: 'complaint-case',
        meta: {
            title: 'တိုင်ခံရခြင်း'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/complaint/ComplaintCase')) }, 'ComplaintCase')
    },
    {
        path: '/complaint-form/:cause/:breakLaw/:name',
        name: 'complaint-form',
        meta: {
            title: 'တိုင်ခံရခြင်း'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/complaint/ComplaintForm')) }, 'ComplaintForm')
    },
    {
        path: '/complaint-success/:type',
        name: 'complaint-success',
        meta: {
            title: 'တိုင်ခံရခြင်း'
        },
        component: resolve => require.ensure([], () => { resolve(require('@/views/my/complaint/ComplaintSuccess')) }, 'ComplaintSuccess')
    },
    // 路由匹配不到重定向
    { 
        path: '*',
        redirect: {
            name: 'index'
        }
    },
]