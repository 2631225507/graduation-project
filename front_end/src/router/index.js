import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // 首页-大数据面板
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/dashboard/index'),
        name: 'Home',
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  },
  // 客户中心
  {
    path: '/customer_center',
    component: Layout,
    redirect: '/customer_center/customer_archives',
    name: 'Customer-Center',
    meta: {
      title: '客户中心',
      icon: 'customer-center'
    },
    children: [
      {
        path: 'customer_archives',
        component: () => import('@/views/customer_center/customer_archives/index'),
        name: 'Customer_Archives',
        meta: { title: '客户档案信息', icon: 'customer-archives' }
      },
      {
        path: 'customer_statistics',
        component: () => import('@/views/customer_center/customer_statistics/index'),
        name: 'Customer-Statistics',
        meta: { title: '客户数据统计', icon: 'customer-statistics' }
      }
    ]
  },

  // 订单中心
  {
    path: '/order_center',
    component: Layout,
    redirect: '/order_center/client_order',
    name: 'Order-Center',
    meta: {
      title: '订单中心',
      icon: 'order-center'
    },
    children: [
      {
        path: 'client_order',
        component: () => import('@/views/order_center/client_order/index'),
        name: 'Client-Order',
        meta: { title: '客户下单', icon: 'orders' }
      },
      {
        path: 'order_management',
        component: () => import('@/views/order_center/order_management/index'),
        name: 'Order-Management',
        meta: { title: '订单管理', icon: 'order-management' }
      }
    ]
  },

  // 产品管理
  {
    path: '/product_management',
    component: Layout,
    redirect: '/product_management/add_product',
    name: 'Product-Management',
    meta: {
      title: '产品管理',
      icon: 'product-management'
    },
    children: [
      {
        path: 'code_number',
        component: () => import('@/views/product_management/code_number/index'),
        name: 'Code-Number',
        meta: { title: '产品列表', icon: 'bar-code' }
      },
      {
        path: 'product_inventory',
        component: () => import('@/views/product_management/product_inventory/index'),
        name: 'Product-Inventory',
        meta: { title: '产品库存', icon: 'inventory' }
      }
    ]
  },

  // 员工管理
  {
    path: '/staff_management',
    component: Layout,
    redirect: '/staff_management/staff_info',
    name: 'Staff-Management',
    meta: {
      title: '员工管理',
      icon: 'staff-management'
    },
    children: [
      {
        path: 'staff_info',
        component: () => import('@/views/staff_management/staff_info/index'),
        name: 'Staff_Info',
        meta: { title: '员工信息', icon: 'into-warehouse' }
      },
      {
        path: 'staff_statistics',
        component: () => import('@/views/staff_management/staff_statistics/index'),
        name: 'Staff_Statistics',
        meta: { title: '员工统计', icon: 'out-warehouse' }
      }
    ]
  },

  // 出入库中心
  {
    path: '/inventory_center',
    component: Layout,
    redirect: '/inventory_center/into_warehous',
    name: 'Inventory-Center',
    meta: {
      title: '出入库中心',
      icon: 'inventory-management'
    },
    children: [
      {
        path: 'into_warehous',
        component: () => import('@/views/inventory_center/into_warehous/index'),
        name: 'Into-Warehoust',
        meta: { title: '入库管理', icon: 'into-warehouse' }
      },
      {
        path: 'out_warehouse',
        component: () => import('@/views/inventory_center/out_warehouse/index'),
        name: 'Out-Warehouse',
        meta: { title: '出库管理', icon: 'out-warehouse' }
      }
    ]
  },
  // 货架管理
  {
    path: '/shelf-management',
    component: Layout,
    redirect: '/shelf-management/shelf_info',
    name: 'Shelf-Management',
    meta: {
      title: '货架管理',
      icon: 'inventory-management'
    },
    children: [
      {
        path: 'shelf_info',
        component: () => import('@/views/shelf-management/shelf_info/index'),
        name: 'Shelf-Info',
        meta: { title: '货架信息', icon: 'into-warehouse' }
      }
    ]
  },


  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // tableRouter,

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },


  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
