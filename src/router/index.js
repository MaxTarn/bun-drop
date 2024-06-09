import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MenuView from '../views/MenuView.vue'
import BasketView from '../views/BasketView.vue'
import ConformationView from '@/views/ConformationView.vue';
import LogInView from '@/views/LogInView.vue';
import store from '../store/index.js';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuView
  },
  {
    path: '/basket',
    name: 'Basket',
    component: BasketView
  },
  {
    path: '/conformation',
    name: 'Conformation',
    component: ConformationView,
    beforeEnter: (to, from, next) => {
      if (from.name !== 'Basket' || store.state.basket.items.length === 0) {
        next({ name: 'Menu' }); 
      } else {
        next(); 
      }
    },
  },
  {
    path: '/logIn',
    name: 'LogIn',
    component: LogInView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
