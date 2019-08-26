import Vue from 'vue'
import Router from 'vue-router'
import AuthProtect from '@/router/auth-protect'
import Home from '@/views/Home'
import Registration from '@/views/auth/Registration'
import Authorization from '@/views/auth/Authorization'
import Post from '@/views/Post'
import Profile from '@/views/user/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/reg',
      name: 'registration',
      component: Registration
    },
    {
      path: '/auth',
      name: 'authorization',
      component: Authorization
    },
    {
      path: '/post/:id',
      name: 'post',
      component: Post
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthProtect
    }
  ]
})
