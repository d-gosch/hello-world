import { createRouter, createWebHistory } from 'vue-router'
import PokemonView from '../views/PokemonView.vue'
import TileView from '../views/TileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tile',
      component: TileView
    },
    {
      path: '/pokemon',
      name: 'pokemon',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: PokemonView
    }
  ]
})

export default router
