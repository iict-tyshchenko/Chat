import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import {store} from './store'

import VueRouter from 'vue-router'
import Entrance from './components/entrance.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/entrance', component: Entrance }
]
const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
