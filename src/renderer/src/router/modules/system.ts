import  { RouteRecordRaw,RouterView } from 'vue-router'
const systemRoute:RouteRecordRaw =  {
	path: '/system',
	name: 'System',
	component: RouterView,
	redirect: '/system/sensitive-word',
	meta: { title: '系统管理', icon: 'icon-shouqicaidan' ,hidden: false},
	children: [
		{
			path: '/system/sensitive-word',
			name: 'SensitiveWord',
			component: () => import('@/views/System/sensitive-word.vue'),
			meta: { title: '敏感词管理', icon: 'icon-shouqicaidan',hidden: false },
		},
		{
			path: '/system/log',
			name: 'SystemLog',
			redirect: '/system/log/operation-log',
			meta: { title: '日志管理', icon: 'icon-shouqicaidan',hidden: false },
			children: [
				{
					path: '/system/log/operation-log',
					name: 'OperationLog',
					component: () => import('@/views/System/log/operation-log.vue'),
					meta: { title: '操作日志', icon: 'icon-shouqicaidan',hidden: false },
				},
				{
					path: '/system/log/login-log',
					name: 'LoginLog',
					component: () => import('@/views/System/log/login-log.vue'),
					meta: { title: '登录日志', icon: 'icon-shouqicaidan',hidden: false },
				},
			]
		},
		{
			path: '/system/dict/list',
			name: 'SystemDictList',
			component: () => import('@/views/System/dict/list.vue'),
			meta: { title: '数据字典', icon: 'icon-shouqicaidan',hidden: false },
		},
		{
			path: '/system/dict/data/:type',
			name: 'SystemDictData',
			component: () => import('@/views/System/dict/data.vue'),
			meta: { title: '字典数据', icon: 'icon-shouqicaidan',hidden: true },
		},
		{
			path: '/system/sms',
			name: 'SystemSms',
			redirect: '/system/sms/sms-channel',
			meta: { title: '短信管理', icon: 'icon-shouqicaidan',hidden: false },
			children: [
				{
					path: '/system/sms/sms-channel',
					name: 'SmsChannel',
					component: () => import('@/views/System/sms/sms-channel.vue'),
					meta: { title: '短信渠道', icon: 'icon-shouqicaidan',hidden: false },
				},
				{
					path: '/system/sms/sms-template',
					name: 'SmsTemplate',
					component: () => import('@/views/System/sms/sms-template.vue'),
					meta: { title: '短信模版', icon: 'icon-shouqicaidan',hidden: false },
				},
				{
					path: '/system/sms/sms-log',
					name: 'SmsLog',
					component: () => import('@/views/System/sms/sms-log.vue'),
					meta: { title: '短信日志', icon: 'icon-shouqicaidan',hidden: false },
				},
			]
		},
		{
			path: '/system/notice',
			name: 'SystemNotice',
			component: () => import('@/views/System/notice.vue'),
			meta: { title: '通知公告', icon: 'icon-shouqicaidan',hidden: false },
		},
		{
			path: '/system/mail',
			name: 'SystemMail',
			redirect: '/system/mail/mail-account',
			meta: { title: '邮箱管理', icon: 'icon-shouqicaidan',hidden: false },
			children: [
				{
					path: '/system/mail/mail-account',
					name: 'MailAccount',
					component: () => import('@/views/System/mail/mail-account.vue'),
					meta: { title: '邮箱账号', icon: 'icon-shouqicaidan',hidden: false },
				},
				{
					path: '/system/mail/mail-template',
					name: 'MailTemplate',
					component: () => import('@/views/System/mail/mail-template.vue'),
					meta: { title: '邮件模版', icon: 'icon-shouqicaidan',hidden: false },
				},
				{
					path: '/system/mail/mail-log',
					name: 'MailLog',
					component: () => import('@/views/System/mail/mail-log.vue'),
					meta: { title: '邮件记录', icon: 'icon-shouqicaidan',hidden: false },
				},
			]
		},
		{
			path: '/system/notify',
			name: 'SystemNotify',
			redirect: '/system/notify/notify-template',
			meta: { title: '站内信管理', icon: 'icon-shouqicaidan',hidden: false },
			children: [
				{
					path: '/system/notify/notify-template',
					name: 'NotifyTemplate',
					component: () => import('@/views/System/notify/notify-template.vue'),
					meta: { title: '模版管理', icon: 'icon-shouqicaidan',hidden: false },
				},
				{
					path: '/system/notify/notify-message',
					name: 'NotifyMessage',
					component: () => import('@/views/System/notify/notify-message.vue'),
					meta: { title: '消息记录', icon: 'icon-shouqicaidan',hidden: false },
				}
			]
		},
		{
			path: '/system/error-code',
			name: 'SystemErrorCode',
			component: () => import('@/views/System/error-code.vue'),
			meta: { title: '错误码管理', icon: 'icon-shouqicaidan',hidden: false },
		},
		{
			path: '/system/area',
			name: 'SystemArea',
			component: () => import('@/views/System/area.vue'),
			meta: { title: '地区管理', icon: 'icon-shouqicaidan',hidden: false },
		},
	]
}
  export default systemRoute;