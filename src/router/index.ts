// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/display',
    name: 'Display',
    component:  () => import('@/components/Display/index.vue')
  },
  {
    path: '/sensor',
    name: 'Sensor',
    component:  () => import('@/components/Sensor/index.vue')
  },
  {
    path: '/Demonstrate',
    name: 'Demonstrate',
    component:  () => import('@/components/Demonstrate/index.vue')
  },
  {
    path: '/',
    name: 'Vant',
    component:  () => import('@/components/Vant/index.vue')
  },
  // 添加更多路由...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;