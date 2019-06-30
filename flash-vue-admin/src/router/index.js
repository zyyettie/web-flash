import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/register', component: () => import('@/views/register/index'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    hidden: false,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    },
    {
      path: '/account/updatePwd',
      name: '修改密码',
      component: () => import('@/views/account/updatePwd.vue'),
      hidden: true,
      meta: { title: '修改密码' }

    }
    ]
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    redirect: '#',
    name: 'System',
    alwaysShow: true,
    meta: {
      roles: ['administrator'],
      title: 'systemMgr',
      icon: 'table'
    },
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu/index'),
        meta: {
          title: 'menuMgr'
        }
      },
      {
        path: 'dept',
        name: 'Department',
        component: () => import('@/views/system/dept/index'),
        meta: {
          title: 'deptMgr'
        }
      },
      {
        path: 'mgr',
        name: 'Account',
        component: () => import('@/views/system/user/index'),
        meta: { title: 'userMgr' }
      },
      {
        path: 'role',
        name: 'roleMgr',
        component: () => import('@/views/system/role/index'),
        meta: { title: 'roleMgr' }
      },
      {
        path: 'task',
        name: 'Task',
        component: () => import('@/views/system/task/index'),
        meta: { title: 'taskMgr' }
      },
      {
        path: 'taskLog',
        name: 'taskLog',
        component: () => import('@/views/system/task/taskLog.vue'),
        hidden: true,
        meta: { title: 'taskLog' }

      },
      {
        path: 'dict',
        name: 'Dict',
        component: () => import('@/views/system/dict/index'),
        meta: { title: 'dictMgr' }
      },
      {
        path: 'loginLog',
        name: 'Login Log',
        component: () => import('@/views/system/loginLog/index'),
        meta: { title: 'loginLog' }
      },
      {
        path: 'log',
        name: 'Bussiness Log',
        component: () => import('@/views/system/log/index'),
        meta: { title: 'bussinessLog' }
      },
      {
        path: 'config',
        name: 'Config',
        component: () => import('@/views/system/cfg/index'),
        meta: {
          title: 'configMgr'
        }
      }
    ]
  },
  {
    path: '/cms',
    component: Layout,
    redirect: '#',
    name: 'Cms',
    alwaysShow: true,
    meta: {
      roles: ['administrator', 'developer'],
      title: 'cmsMgr',
      icon: 'documentation'
    },
    children: [
      {
        path: 'banner',
        name: 'Banner',
        component: () => import('@/views/cms/banner/index'),
        meta: { title: 'bannerMgr' }
      },
      {
        path: 'channel',
        name: 'Channel',
        component: () => import('@/views/cms/channel/index'),
        meta: { title: 'channelMgr' }
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/cms/article/index'),
        meta: { title: 'articleMgr' }
      },
      {
        path: 'article/edit',
        name: 'Edit Article',
        component: () => import('@/views/cms/article/edit.vue'),
        hidden: true,
        meta: { title: 'editArticle' }
      },
      {
        path: 'contacts',
        name: 'Contacts',
        component: () => import('@/views/cms/contacts/index'),
        meta: { title: 'contactsMgr' }
      },
      {
        path: 'file',
        name: 'File',
        component: () => import('@/views/cms/file/index'),
        meta: {
          title: 'fileMgr'
        }
      }
    ]
  },
  {
    path: '/business',
    component: Layout,
    redicrect: '#',
    name: 'Business',
    alwaysShow: true,
    meta: {
      roles: ['administrator', 'developer'],
      title: 'businessMgr',
      icon: 'documentation'
    },
    children: [
      {
        path: 'tender',
        name: 'Tender',
        component: () => import('@/views/business/tender/index'),
        meta: { title: 'tenderMgr' }
      },
      {
        path: 'supplier',
        name: 'Supplier',
        component: () => import('@/views/business/supplier/index'),
        meta: { title: 'supplierMgr' }
      },
      {
        path: 'bid',
        name: 'Bid',
        component: () => import('@/views/business/bid/index'),
        meta: { title: 'bidMgr' }
      },
      {
        path: 'tenderbid',
        name: 'TenderBid',
        component: () => import('@/views/business/tenderbid/index'),
        meta: { title: 'tenderbidMgr' }
      },
      {
        path: 'tenderDetail',
        name: 'tenderDetail',
        component: () => import('@/views/business/tender/tenderDetail.vue'),
        hidden: true,
        meta: { title: 'tenderDetail' }
      }
    ]
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true }
]

