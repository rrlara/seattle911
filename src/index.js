import Vuex from 'vuex'
import Vue from 'vue'

import App from './App.vue'
// import ToDos from './ToDos/index.vue'
import Home from './Home/index.vue'
import List from './List/index.vue'
import Map from './Map/index.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.config.debug = true

export var router = new VueRouter()

router.map({
  '/list': {
    component: List
  },
  '/map': {
    component: Map
  }
  
})

router.redirect({
  '*': '/list'
})

router.start(App, '#app')