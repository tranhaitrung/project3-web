import Vue from 'vue'
import App from './App.vue'

import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import Vuex from 'vuex'
Vue.use(Vuex)
import storeConfigs from './store'
const store = new Vuex.Store(storeConfigs)

import VueRouter from 'vue-router';
import { routes } from './routes/index'
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  //el: '#app',
  
  router,
  render: h => h(App),
  store
}).$mount('#app')

