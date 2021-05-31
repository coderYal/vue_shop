import Vue from 'vue'
import VueRouter from 'vue-router'

import { Message } from 'element-ui'

const login = () => import('views/login/Login')
const home = () => import('views/home/Home')

Vue.use(VueRouter)

const routes = [
  // 路由重定向到登录页面
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home
  }
]

const router = new VueRouter({
  routes
})

// 添加路由前置守卫，判断是否有token
router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  if (to.path === '/login') return next()
  if (!token) {
    Message.warning('暂无权限，请登录！')
    next('/login')
  } else {
    next()
  }
})

export default router
