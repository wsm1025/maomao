import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios;

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller);

import Loading from '@/components/Loading'
Vue.component('Loading',Loading);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
