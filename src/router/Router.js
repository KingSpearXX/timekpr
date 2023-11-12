import {createRouter, createWebHistory} from 'vue-router';
import {usersStore} from '../store/Users.js';
import {siteStore} from '../store/Site.js';

const routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../pages/Admin.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../pages/Users.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/time',
    name: 'Time',
    component: () => import('../pages/Time.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/Profile.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register.vue'),
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
    },
  },
  {
    path: '/verified',
    name: 'Verified',
    component: () => import('../pages/Verified.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: () => import('../pages/Forgot.vue'),
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
    },
  },
];

const router = createRouter({history: createWebHistory(), routes});

router.beforeEach(async (to, from, next) => {
  const users = usersStore().user;
  const site = siteStore().admin;
  if (to.meta.requiresAuth && !users) {
    next('/login');
    return;
  } else if (!to.meta.requiresAuth && users) {
    next('/');
    return;
  }
  if (users && !users.emailVerified && to.name !== 'Verified') {
    next('/verified');
    return;
  }
  if(users && to.name !== 'Admin' && (site === null || site === false)) {
    next('/admin');
    return;
  }
  next();
 
});

export default router;
