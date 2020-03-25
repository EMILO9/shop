// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from '../store'
import './assets/Styles.css'
import Notifications from 'vue-notification'
// import VueLazyload from 'vue-lazyload'
Vue.use(Notifications)
// Vue.use(VueLazyload)

// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: '',
//   loading: '',
//   attempt: 1
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})