import { RouteRecordRaw, RouterView } from 'vue-router'
import Layout from '@renderer/layout/index.vue'
const articleRoute: RouteRecordRaw = {
  path: '/article',
  name: 'Article',
  component: Layout,
  redirect: '/article/list',
  meta: { title: '文章管理', icon: 'icon-shouqicaidan', hidden: false },
  children: [
    {
      path: '/article/list',
      name: 'ArticleList',
      component: () => import('@/pages/article/list.vue'),
      meta: { title: '文章列表', icon: 'icon-shouqicaidan', hidden: false }
    },
    {
      path: '/article/category',
      name: 'ArticleCategory',
      component: () => import('@/pages/article/category.vue'),
      meta: { title: '文章分类', icon: 'icon-shouqicaidan', hidden: false }
    },
    {
      path: '/article/comment',
      name: 'ArticleComment',
      component: () => import('@/pages/article/comment.vue'),
      meta: { title: '文章评论', icon: 'icon-shouqicaidan', hidden: false }
    },
    {
      path: '/article/reports',
      name: 'ArticleReports',
      component: () => import('@/pages/article/reports.vue'),
      meta: { title: '文章举报', icon: 'icon-shouqicaidan', hidden: false }
    },
    {
      path: '/article/published',
      name: 'ArticlePublished',
      component: () => import('@/pages/article/published.vue'),
      meta: { title: '文章发布', icon: 'icon-shouqicaidan', hidden: false }
    }
  ]
}
export default articleRoute
