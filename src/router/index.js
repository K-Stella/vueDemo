import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// 使用组件时要先注册
import Login from '@/views/login/login'
import Index from '@/views/dashboard/index'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

// 所有权限通用路由表
export const constantRouterMap = [
  { 
    path: '/login', 
    name: 'Login',
    component: Login, 
    hidden: true
  },
  // {
  //   path: '/authredirect',
  //   component: () => import('@/views/login/authredirect'),
  //   hidden: true
  // },
  {
    path: '/',
    name: 'Index',
    redirect: '/dashboard',
    hidden: true,
    component: Layout,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/',
    name: 'Tree',
    redirect: '/tree',
    component: Layout,
    children: [{
      path: 'tree',
      component: () => import('@/components/Tree/index')
    }]
  },
  {
    path: '/',
    name: 'Table',
    redirect: '/table',
    component: Layout,
    children: [{
      path: 'table',
      component: () => import('@/components/Table/index')
    }]
  },
  {
    path: '/',
    name: 'Document',
    redirect: '/document',
    component: Layout,
    children: [{
      path: 'document',
      component: () => import('@/components/Document/index')
    }]
  }
  
]

// 实例化vue的时候只挂载constantRouter
export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y:0 }),
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表
// meta: { role: ['admin','super_editor'] }表示该页面只有admin和超级编辑才能有资格进入
export const asyncRouterMap = [
  {
    path: '/',
    name: 'Log',
    redirect: '/Log',
    component: Layout,
    meta: {
      title: 'Log',
      roles: ['admin']
    },
    children: [{
      path: 'log',
      component: () => import('@/components/Log/index')
    }]
  },
  {
    path: '/',
    name: 'Permission',
    redirect: '/permission',
    component: Layout,
    meta: {
      title: 'Permission',
      roles: ['editor']
    },
    children: [{
      path: 'Permission',
      component: () => import('@/components/Permission/index')
    }]
  }
]
