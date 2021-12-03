import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blogs from '../views/Blogs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
    meta: {
      title: 'Blogs'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(from, to, savedPosition) {
    if (savedPosition || from.name === to.name) {
      return true;
    } else {
      return { x: 0, y: 0, behavior: 'smooth' };
    }
  },
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | PineappleBlogs`
  next();
})

export default router
