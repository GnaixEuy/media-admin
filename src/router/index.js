import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/Layout.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

export const menuRoutes = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    meta: { title: '控制台', icon: 'dashboard' },
    component: () => import('../views/dashboard/Index.vue'),
  },
  {
    path: 'userManager',
    name: 'UserManager',
    meta: { title: '用户管理', icon: 'dashboard' },
    component: () => import('../views/UserManager.vue'),
  },
  {
    path: 'videoManager',
    name: 'VideoManager',
    meta: { title: '视屏管理', icon: 'dashboard' },
    component: () => import('../views/VideoManager.vue'),
  },
  {
    path: 'recommendManager',
    name: 'RecommendManager',
    meta: { title: '推荐管理', icon: 'dashboard' },
    component: () => import('../views/RecommendManager.vue'),
  },
  {
    path: 'about',
    name: 'About',
    meta: { title: '关于系统', icon: 'dashboard' },
    component: () => import('../views/About.vue'),
  },
];

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: menuRoutes,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
