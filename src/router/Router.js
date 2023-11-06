import {createRouter, createWebHistory} from 'vue-router';
import {usersStore} from '../store/Users.js';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/Profile.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: () => import('../pages/Forgot.vue'),
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({history: createWebHistory(), routes});

router.beforeEach(async (to, from, next) => {
  const users = usersStore().user;
  if (to.meta.requiresAuth && !users) {
    next('/login');
    return;
  } else if (!to.meta.requiresAuth && users) {
    next('/');
    return;
  }

  next();
});

export default router;
