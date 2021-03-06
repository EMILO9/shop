import Vue from 'vue'
import Router from 'vue-router'
import shopItems from '@/components/shopItems'
import selectedItem from '@/components/selectedItem'
import Cart from '@/components/Cart'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shopItems',
      component: shopItems
    },
    {
      path: '/item',
      name: 'selectedItem',
      component: selectedItem
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
