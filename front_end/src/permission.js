import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth' //获取用户token
import getPageTitle from '@/utils/get-page-title' //获取页面标题

// NProgress是类似youtube、Medium等网站上的小进度条插件。纳米级的进度条，涓涓细流动画告诉你的用户，一些事情正在发生！
NProgress.configure({ showSpinner: false })

// 无重定向白名单
const whiteList = ['/login', '/auth-redirect','/index']

// 没有登录的时候，去访问首页，自动跳到登录页
// 已经登录的时候，去访问登录页，自动跳到首页
router.beforeEach(async (to, from, next) => {
  NProgress.start()// 启动进度条
  document.title = getPageTitle(to.meta.title)
  // 确认用户是否登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()// 关闭进度条
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息,角色必须是数组(['admin'] or ,['developer','editor'])
          const { roles } = await store.dispatch('user/getInfo')

          // 根据角色生成可访问的路径
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加可访问的路由
          router.addRoutes(accessRoutes)

          //黑客方法，以确保addRoutes是完整的
          //设置replace:true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除令牌并转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          // next(`/login?redirect=${to.path}`)
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
