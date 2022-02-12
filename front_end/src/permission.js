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
const whiteList = ['/login', '/auth-redirect']

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
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
      next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)

      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
