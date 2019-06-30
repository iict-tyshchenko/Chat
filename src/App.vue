<template>
  <div id="app">
    <Modal/>
    <Menu/>
    <Chat/>
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
import Modal from './components/modal.vue'
import Menu from './components/menu.vue'
import Chat from './components/chat.vue'

export default {
  name: 'app',
  components: {
    Modal,
    Menu,
    Chat
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:500,700&display=swap&subset=cyrillic');

 #app {
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
