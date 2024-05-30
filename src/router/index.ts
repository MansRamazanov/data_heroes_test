import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '/home/mans/Рабочий стол/test/Data_heroes_test/data_heroes_test/src/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
