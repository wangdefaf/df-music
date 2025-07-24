<template id="template">
  <div id="app" @error="handleGlobalError">
    <!-- 登录弹窗 -->
    <login id="login" v-if="isLoginShowComputed"/>
    
    <!-- 主导航 -->
    <main-tab-bar :list-array="navigationItems"/>
    
    <!-- 路由视图缓存 -->
    <keep-alive :include="cachedComponents">
      <router-view class="router-view"/>
    </keep-alive>
    
    <!-- 全局loading -->
    <loading v-if="isLoadingShow"/>
    
    <!-- 返回顶部按钮 -->
    <backtop class="backtop-btn" v-if="showBackTop">
      <to-top theme="outline" size="30" fill="#808080"/>
    </backtop>
    
    <!-- 音频播放器 -->
    <vue-audio ref="vueAudio"/>
    
    <!-- 底部栏 -->
    <footer-bar/>
  </div>
</template>

<script>
import { ToTop } from '@icon-park/vue'
import { Backtop } from 'element-ui'

// 组件导入
import MainTabBar from "@/components/content/tab-bar/MainTabBar"
import FooterBar from "@/components/common/footer/footerBar"
import Loading from "@/components/common/loading/loading"
import Login from "@/components/common/login/login"
import VueAudio from "@/components/common/vueAudio/vueAudio"

// API导入
import { getUesrAccount } from "./network/getdata/my"
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  
  components: {
    VueAudio,
    Login,
    Loading,
    FooterBar,
    MainTabBar,
    ToTop,
    Backtop
  },
  
  data() {
    return {
      // 导航配置
      navigationItems: Object.freeze([
        { title: '发现音乐', path: '/Home' },
        { title: '我的音乐', path: '/My' },
        { title: '朋友', path: '/discover' }
      ]),
      
      // 需要缓存的组件
      cachedComponents: ['Home', 'Discover', 'My'],
      
      // 控制返回顶部按钮显示
      showBackTop: false,
      
      // 错误重试次数
      errorRetryCount: 0,
      maxErrorRetry: 3
    }
  },
  
  computed: {
    // 使用mapState替代直接访问$store.state
    ...mapState([
      'isLoadingShow',
      'isLogShow',
      'isLogin'
    ]),
    
    ...mapGetters([
      'isUserLoggedIn'
    ]),
    
    // 计算属性优化
    isLoginShowComputed() {
      return this.isLogShow
    }
  },
  
  watch: {
    // 监听路由变化，控制缓存
    '$route'(to, from) {
      // 根据路由动态调整缓存组件
      this.updateCachedComponents(to.name)
    },
    
    // 监听登录状态变化
    isLogin: {
      handler(newVal) {
        if (newVal && this.errorRetryCount < this.maxErrorRetry) {
          this.fetchUserDetails()
        }
      },
      immediate: true
    }
  },
  
  methods: {
    ...mapActions(['setUserInfo', 'logout']),
    
    // 获取用户详情
    async fetchUserDetails() {
      if (!this.isLogin) return
      
      try {
        const response = await getUesrAccount()
        const userInfo = {
          userId: response.data.account?.id,
          avatarUrl: response.data.profile?.avatarUrl,
          nickname: response.data.profile?.nickname
        }
        
        await this.setUserInfo(userInfo)
        this.errorRetryCount = 0 // 重置错误计数
        
      } catch (error) {
        console.error('获取用户信息失败:', error)
        this.errorRetryCount++
        
        // 达到最大重试次数后登出
        if (this.errorRetryCount >= this.maxErrorRetry) {
          this.$message.error('获取用户信息失败，请重新登录')
          this.logout()
        }
      }
    },
    
    // 全局错误处理
    handleGlobalError(error) {
      console.error('全局错误:', error)
      
      // 可以在这里添加错误上报
      if (process.env.NODE_ENV === 'production') {
        // 错误上报逻辑
        this.reportError(error)
      }
      
      return true
    },
    
    // 错误上报
    reportError(error) {
      // 实现错误上报逻辑
      // 例如发送到错误监控服务
    },
    
    // 更新缓存组件
    updateCachedComponents(routeName) {
      const heavyComponents = ['Home', 'My', 'Discover']
      if (heavyComponents.includes(routeName)) {
        if (!this.cachedComponents.includes(routeName)) {
          this.cachedComponents.push(routeName)
        }
      }
    },
    
    // 监听滚动事件，控制返回顶部按钮
    handleScroll() {
      this.showBackTop = window.pageYOffset > 300
    },
    
    // 节流函数
    throttle(func, limit) {
      let inThrottle
      return function() {
        const args = arguments
        const context = this
        if (!inThrottle) {
          func.apply(context, args)
          inThrottle = true
          setTimeout(() => inThrottle = false, limit)
        }
      }
    }
  },
  
  created() {
    // 检查登录状态
    const token = this.$cookies.get("token")
    if (token) {
      console.log('用户已登录，获取用户信息')
      this.$store.commit('SET_LOGIN_STATUS', true)
      this.fetchUserDetails()
    } else {
      console.log('用户未登录')
    }
  },
  
  mounted() {
    // 添加滚动监听
    const throttledScroll = this.throttle(this.handleScroll, 100)
    window.addEventListener('scroll', throttledScroll)
    
    // 性能监控
    if (process.env.NODE_ENV === 'development') {
      this.$nextTick(() => {
        console.log('App组件渲染完成')
      })
    }
  },
  
  beforeDestroy() {
    // 清理事件监听器
    window.removeEventListener('scroll', this.handleScroll)
  },
  
  // 错误边界
  errorCaptured(err, vm, info) {
    console.error('组件错误捕获:', err, info)
    this.handleGlobalError(err)
    return false
  }
}
</script>

<style lang="scss" scoped>
@import "assets/css/base.css";

#app {
  padding-top: 60px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}

.router-view {
  transition: opacity 0.3s ease;
}

.backtop-btn {
  position: fixed;
  z-index: 18;
  bottom: 100px;
  right: 50px;
  transition: opacity 0.3s ease;
  
  @media (max-width: 768px) {
    right: 20px;
    bottom: 80px;
  }
}

// 响应式设计
@media (max-width: 768px) {
  #app {
    padding-top: 50px;
  }
}

// 加载动画
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
