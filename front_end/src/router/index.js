import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
Vue.use(Router)
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
  // 前台
  // {
  //   path: '/index',
  //   component: () => import('@/views/reception/index'),
  //   hidden: true
  // },
  // 登录页
  {
    path: '/login',
    component: () => import('@/views/login/index'),
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
]

export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
