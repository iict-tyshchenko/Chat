<template>
  <div id="apps">
<!--
    <entrance/>
-->
    <Menu/>
    <Chat/>
    <router-view></router-view>
  </div>
</template>

<script>

//import Entrance from './components/entrance.vue'
import Menu from './components/menu.vue'
import Chat from './components/chat.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Entrance from './components/entrance.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/entrance', component: Entrance }
]
const router = new VueRouter({
  routes
})

export default {
    name: 'app',
  router,
    components: {
        //Entrance,
        Menu,
        Chat
    }
}
</script>

<style>

 #apps {
    margin: 0;
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 1fr;
    background-color: #D9D9D9 !important;
    grid-column-gap: 2px;
  }

  ::-webkit-scrollbar{width:0px}
  ::-webkit-scrollbar-thumb{border-radius:4px;-webkit-box-shadow:inset 0 0 0 0px #074AA2;}
</style>
