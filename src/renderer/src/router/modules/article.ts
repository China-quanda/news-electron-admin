import  { RouteRecordRaw,RouterView } from 'vue-router'
const articleRoute:RouteRecordRaw =  {
		path: '/article',
		name: 'Article',
		component: RouterView,
		redirect: '/article/list',
		meta: { title: '文章管理',icon: 'icon-shouqicaidan',hidden: false },
		children:[
			{
				path: '/article/list',
				name: 'ArticleList',
				component: () => import('@/views/article/list.vue'),
				meta: { title: '文章列表',icon: 'icon-shouqicaidan',hidden: false },
			},
			{
				path: '/article/category',
				name: 'ArticleCategory',
				component: () => import('@/views/article/category.vue'),
				meta: { title: '文章分类',icon: 'icon-shouqicaidan',hidden: false },
			},
			{
				path: '/article/comment',
				name: 'ArticleComment',
				component: () => import('@/views/article/comment.vue'),
				meta: { title: '文章评论',icon: 'icon-shouqicaidan',hidden: false },
			},
			{
				path: '/article/reports',
				name: 'ArticleReports',
				component: () => import('@/views/article/reports.vue'),
				meta: { title: '文章举报',icon: 'icon-shouqicaidan',hidden: false },
			},
			{
				path: '/article/published',
				name: 'ArticlePublished',
				component: () => import('@/views/article/published.vue'),
				meta: { title: '文章发布',icon: 'icon-shouqicaidan',hidden: false },
			}
		]
	}
  export default articleRoute;