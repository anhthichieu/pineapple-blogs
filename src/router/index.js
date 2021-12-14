import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blogs from '../views/Blogs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Admin from '../views/Admin.vue'
import Profile from '../views/Profile.vue'
import CreatePost from '../views/CreatePost.vue'
import BlogPreview from '../views/BlogPreview.vue'
import ViewBlog from '../views/ViewBlog.vue'
import EditBlog from '../views/EditBlog.vue'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
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
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Profile',
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'Admin',
      requiresAdmin: true,
      requiresAuth: true
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      title: 'Create Post',
      requiresAuth: true
    }
  },
  {
    path: '/post-preview',
    name: 'BlogPreview',
    component: BlogPreview,
    meta: {
      title: 'Preview Blog Post',
      requiresAuth: true
    }
  },
  {
    path: '/view-blog/:blogid',
    name: 'ViewBlog',
    component: ViewBlog,
    meta: {
      title: 'View Blog Post',
    }
  },
  {
    path: '/edit-blog/:blogid',
    name: 'EditBlog',
    component: EditBlog,
    meta: {
      title: 'Edit Blog Post',
      requiresAuth: true
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

router.beforeEach(async (to, from, next) => {
  const user = firebase.auth().currentUser;
  let admin = null;

  if (user) {
    const token = await user.getIdTokenResult();
    admin = token.claims.admin;
  }

  if (to.matched.some(res => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some(res => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }
        return next({ name: 'Home' })
      }
      return next();
    }
    return next({ name: 'Home' })
  }
  return next();
});

export default router
