import { RouteRecordRaw } from 'vue-router'
import Layout from '@renderer/layout/index.vue'
const systemRoute: RouteRecordRaw = {
  path: '/system',
  name: 'System',
  component: Layout,
  // redirect: '/system/sensitive-word',
  meta: { title: '系统管理', icon: 'icon-shouqicaidan', hidden: false },
  children: [
    {
      path: '/system/tenant',
      name: 'SystemTenant',
      meta: { title: '租户管理', icon: 'icon-shouqicaidan', hidden: false },
      children: [
        {
          path: '/system/tenant/list',
          name: 'SystemTenantList',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '租户列表', icon: 'icon-shouqicaidan', hidden: false },
          children: []
        },
        {
          path: '/system/tenant/package',
          name: 'SystemTenantPackage',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '租户套餐', icon: 'icon-shouqicaidan', hidden: false },
          children: []
        }
      ]
    },
    {
      path: '/system/organization',
      name: 'SystemOrganization',
      meta: { title: '组织架构', icon: 'icon-shouqicaidan', hidden: false },
      children: [
        {
          path: '/system/organization/org',
          name: 'SystemOrganizationOrg',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '机构管理', icon: 'icon-shouqicaidan', hidden: false },
          children: []
        },
        {
          path: '/system/organization/dept',
          name: 'SystemOrganizationDept',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '部门管理', icon: 'icon-shouqicaidan', hidden: false },
          children: []
        },
        {
          path: '/system/organization/post',
          name: 'SystemOrganizationPost',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '岗位管理', icon: 'icon-shouqicaidan', hidden: false },
          children: []
        }
      ]
    },
    {
      path: '/system/permission',
      name: 'SystemPermission',
      meta: { title: '权限管理', icon: 'icon-shouqicaidan', hidden: false },
      children: [
        {
          path: '/system/permission/mobileDevice',
          name: 'SystemPermissionMobileDevice',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '用户设备', icon: 'icon-shouqicaidan', hidden: false },
          children: []
        },
        {
          path: '/system/permission/user',
          name: 'SystemPermissionUser',
          component: () => import('@/pages/System/permission/user/list.vue'),
          meta: { title: '用户管理', icon: 'icon-shouqicaidan', hidden: false },
          children: []
        },
        {
          path: '/system/permission/role',
          name: 'SystemPermissionRole',
          // component: () => import('@renderer/pages/test.vue'),
          component: () => import('@pages/System/permission/role/list.vue'),
          meta: { title: '角色管理', icon: 'icon-shouqicaidan', hidden: false },
          children: []
        },
        {
          path: '/system/permission/menu',
          name: 'SystemPermissionMenu',
          component: () => import('@pages/System/permission/menu/list.vue'),
          meta: { title: '菜单管理', icon: 'icon-shouqicaidan', hidden: false },
          children: []
        }
      ]
    },
    {
      path: '/system/dm',
      name: 'SystemDm',
      meta: { title: '数据管理', hidden: false },
      children: [
        {
          path: '/system/dm/dict',
          name: 'SystemDmDict',
          component: () => import('@/pages/System/dm/dict/index.vue'),
          meta: { title: '数据字典', hidden: false },
          children: []
        },
        {
          path: '/system/dm/dictData',
          name: 'SystemDmDictData',
          component: () => import('@/pages/System/dm/dictData/index.vue'),
          meta: { title: '字典数据', hidden: false },
          children: []
        },
        {
          path: '/system/dm/category',
          name: 'SystemDmCategory',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '数据分类', hidden: false },
          children: []
        },
        {
          path: '/system/dm/config',
          name: 'SystemDmConfig',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '参数管理', hidden: false },
          children: []
        },
        {
          path: '/system/dm/oss',
          name: 'SystemDmOss',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '上传配置', hidden: false },
          children: []
        },
        {
          path: '/system/dm/file',
          name: 'SystemDmFile',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '文件管理', hidden: false },
          children: []
        },
        {
          path: '/system/dm/region',
          name: 'SystemDmRegion',
          component: () => import('@/pages/System/dm/region/index.vue'),
          meta: { title: '行政区域', icon: 'icon-shouqicaidan', hidden: false },
          children: []
        },
        {
          path: '/system/dm/error-code',
          name: 'SystemDmErrorCode',
          component: () => import('@/pages/System/dm/errorCode/index.vue'),
          meta: { title: '错误码管理', icon: 'icon-shouqicaidan', hidden: false },
          children: []
        },
        {
          path: '/system/dm/sensitive-word',
          name: 'SystemDmSensitiveWord',
          component: () => import('@/pages/System/dm/sensitiveWord/index.vue'),
          meta: { title: '敏感词管理', icon: 'icon-shouqicaidan', hidden: false },
          children: []
        }
      ]
    },
    {
      path: '/system/log',
      name: 'SystemLog',
      redirect: '/system/log/operation-log',
      meta: { title: '日志管理', icon: 'icon-shouqicaidan', hidden: false },
      children: [
        {
          path: '/system/log/operation-log',
          name: 'SystemLogOperationLog',
          component: () => import('@/pages/System/log/operation-log/index.vue'),
          meta: { title: '操作日志', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/log/login-log',
          name: 'SystemLogLoginLog',
          component: () => import('@/pages/System/log/login-log/index.vue'),
          meta: { title: '登录日志', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/log/visit-log',
          name: 'SystemLogVisitLog',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '访问日志', icon: 'icon-shouqicaidan', hidden: false }
        }
      ]
    },
    {
      path: '/system/oauth2',
      name: 'SystemOauth2',
      redirect: '/system/log/operation-log',
      meta: { title: 'oauth2', icon: 'icon-shouqicaidan', hidden: false },
      children: [
        {
          path: '/system/oauth2/application',
          name: 'SystemOauth2Application',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '应用管理', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/oauth2/token',
          name: 'SystemOauth2Token',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '令牌管理', icon: 'icon-shouqicaidan', hidden: false }
        }
      ]
    },
    {
      path: '/system/social',
      name: 'SystemSocial',
      redirect: '/system/log/operation-log',
      meta: { title: '三方登录', icon: 'icon-shouqicaidan', hidden: false },
      children: [
        {
          path: '/system/social/client',
          name: 'SystemSocialClient',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '三方管理', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/social/user',
          name: 'SystemSocialUser',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '三方用户', icon: 'icon-shouqicaidan', hidden: false }
        }
      ]
    },
    {
      path: '/system/sms',
      name: 'SystemSms',
      redirect: '/system/sms/sms-channel',
      meta: { title: '短信管理', icon: 'icon-shouqicaidan', hidden: false },
      children: [
        {
          path: '/system/sms/channel',
          name: 'SystemSmsChannel',
          component: () => import('@/pages/System/sms/channel/index.vue'),
          meta: { title: '短信渠道', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/sms/template',
          name: 'SystemSmsTemplate',
          component: () => import('@/pages/System/sms/template/index.vue'),
          meta: { title: '短信模版', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/sms/log',
          name: 'SystemSmsLog',
          component: () => import('@/pages/System/sms/log/index.vue'),
          meta: { title: '短信日志', icon: 'icon-shouqicaidan', hidden: false }
        }
      ]
    },
    {
      path: '/system/mail',
      name: 'SystemMail',
      redirect: '/system/mail/mail-account',
      meta: { title: '邮箱管理', icon: 'icon-shouqicaidan', hidden: false },
      children: [
        {
          path: '/system/mail/account',
          name: 'SystemMailAccount',
          component: () => import('@/pages/System/mail/account/index.vue'),
          meta: { title: '邮箱账号', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/mail/template',
          name: 'SystemMailTemplate',
          component: () => import('@/pages/System/mail/template/index.vue'),
          meta: { title: '邮件模版', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/mail/log',
          name: 'SystemMailLog',
          component: () => import('@/pages/System/mail/log/index.vue'),
          meta: { title: '邮件记录', icon: 'icon-shouqicaidan', hidden: false }
        }
      ]
    },
    {
      path: '/system/message',
      name: 'SystemMessage',
      redirect: '/system/message/notice',
      meta: { title: '消息管理', icon: 'icon-shouqicaidan', hidden: false },
      children: [
        {
          path: '/system/message/notice',
          name: 'SystemMessageNotice',
          component: () => import('@/pages/System/message/notice/index.vue'),
          meta: { title: '通知公告', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/message/push',
          name: 'SystemMessagePush',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '消息推送', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/message/template',
          name: 'SystemMessageTemplate',
          component: () => import('@/pages/System/message/template/index.vue'),
          meta: { title: '模版管理', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/message/msg',
          name: 'SystemMessageMsg',
          component: () => import('@/pages/System/message/msg/index.vue'),
          meta: { title: '站内信消息记录', icon: 'icon-shouqicaidan', hidden: false }
        }
      ]
    },
    {
      path: '/system/monitor',
      name: 'SystemMonitor',
      redirect: '/system/log/operation-log',
      meta: { title: '系统监控', icon: 'icon-shouqicaidan', hidden: false },
      children: [
        {
          path: '/system/monitor/online',
          name: 'SystemMonitorOnline',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '在线用户', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/monitor/job',
          name: 'SystemMonitorJob',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '定时任务', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/monitor/druid',
          name: 'SystemMonitorDruid',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '数据监控', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/monitor/server',
          name: 'SystemMonitorServer',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '服务监控', icon: 'icon-shouqicaidan', hidden: false }
        },
        {
          path: '/system/monitor/cache',
          name: 'SystemMonitorCache',
          component: () => import('@renderer/pages/test.vue'),
          meta: { title: '缓存监控', icon: 'icon-shouqicaidan', hidden: false }
        }
      ]
    },
    {
      path: '/system/apidoc',
      name: 'SystemApidoc',
      component: () => import('@renderer/pages/test.vue'),
      meta: { title: '接口文档', icon: 'icon-shouqicaidan', hidden: false }
    },
    {
      path: '/system/dbdoc',
      name: 'SystemDbdoc',
      component: () => import('@renderer/pages/test.vue'),
      meta: { title: '数据库文档', icon: 'icon-shouqicaidan', hidden: false }
    },
    {
      path: '/system/codegen',
      name: 'SystemCodegen',
      component: () => import('@renderer/pages/test.vue'),
      meta: { title: '代码生成', icon: 'icon-shouqicaidan', hidden: false }
    }
  ]
}
export default systemRoute
