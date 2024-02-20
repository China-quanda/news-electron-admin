import type { RouteRecordRaw } from 'vue-router'
import pagesIndex from '@renderer/pages/index.vue'
// 静态路由
export const staticRoutes: RouteRecordRaw[] = [
  {
		path: '/index',
		name: 'index',
    component: pagesIndex,
	},
  {
		path: '/test',
		name: 'test',
    component: () => import('@renderer/pages/test.vue'),
	}
];

//css态路由
export const cssStaticRoutes: RouteRecordRaw[] = [
	{
		path: '/demo/css',
		name: 'Css',
		redirect: '/demo/css/demo1',
		meta: { title: 'cssdemo', hidden: false },
		children: [
			{
				path: '/demo/css/demo1',
				name: 'CssDemo1',
				component: () => import('@renderer/pages/index.vue'),
				meta: { title: 'demo1', hidden: false },
			}
		]
	}
];


//动态路由 占位 未启用
export const dynamicRoutes: RouteRecordRaw[] = [
	{
		path: '/home',
		name: 'home',
		component: () => import('@renderer/pages/index.vue'),
		meta: {
			title: 'halou'
		}
	}
];
