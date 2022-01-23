import Vue from 'vue'
import ElementUI from 'element-ui';
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import VueLazyload from "vue-lazyload";

import '@babel/polyfill'
import './plugins/axios'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueCookies);
Vue.use(VueLazyload);
Vue.use(ElementUI);
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
