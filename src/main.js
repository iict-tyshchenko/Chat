import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import {store} from './store'
import VueRouter from 'vue-router'

import Entrance from './components/entrance.vue'
import Chat from './components/chat.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/entrance', component: Entrance },
  { path: '/', component: Chat },
]
const router = new VueRouter({
  routes
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
