import Vue from 'vue'
// 按需导入Element UI组件而不是全部导入
import { 
  Button, 
  Loading, 
  Message, 
  MessageBox,
  Slider,
  Backtop
} from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import VueLazyload from "vue-lazyload"

import '@babel/polyfill'
import './plugins/axios'
// 只导入需要的Element UI样式
import 'element-ui/lib/theme-chalk/base.css'
import 'element-ui/lib/theme-chalk/button.css'
import 'element-ui/lib/theme-chalk/loading.css'
import 'element-ui/lib/theme-chalk/slider.css'
import 'element-ui/lib/theme-chalk/backtop.css'

// 注册Element UI组件
Vue.use(Button)
Vue.use(Loading.directive)
Vue.use(Slider)
Vue.use(Backtop)

// 全局方法
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(VueCookies)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/error.png'), // 添加错误图片
  loading: require('./assets/images/loading.gif'), // 添加加载图片
  attempt: 1
})

Vue.config.productionTip = false

// 全局错误处理
Vue.config.errorHandler = (err, vm, info) => {
  console.error('Vue error:', err, info)
  // 可以在这里上报错误到监控服务
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
