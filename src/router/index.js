import Vue from 'vue'
import VueRouter from 'vue-router'
import { storage } from '@/utils'

// 路由懒加载
const Home = () => import(/* webpackChunkName: "home" */ '@/views/home/Home')
const Discover = () => import(/* webpackChunkName: "home" */ '@/views/discover/Discover')
const RankList = () => import(/* webpackChunkName: "home" */ '@/views/rankList/ranklist')
const SongLists = () => import(/* webpackChunkName: "home" */ '@/views/songlists/songlists')
const Artist = () => import(/* webpackChunkName: "home" */ '@/views/artist/artist')
const MV = () => import(/* webpackChunkName: "home" */ '@/views/mv/mv')

const My = () => import(/* webpackChunkName: "user" */ '@/views/my/My')
const Song = () => import(/* webpackChunkName: "song" */ '@/views/song/song')
const SongListDetail = () => import(/* webpackChunkName: "song" */ '@/views/songlistDet/songlistDet')
const Singer = () => import(/* webpackChunkName: "artist" */ '@/views/singer/singer')
const MVDetail = () => import(/* webpackChunkName: "mv" */ '@/views/mvdet/mvdet')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home/discover'
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: { 
      title: '发现音乐',
      keepAlive: true,
      requireAuth: false
    },
    children: [
      {
        path: '/Home/discover',
        name: 'Discover',
        component: Discover,
        meta: { title: '推荐', keepAlive: true }
      },
      {
        path: '/Home/rankList',
        name: 'RankList',
        component: RankList,
        meta: { title: '排行榜', keepAlive: true }
      },
      {
        path: '/Home/songlist',
        name: 'SongLists',
        component: SongLists,
        meta: { title: '歌单', keepAlive: true }
      },
      {
        path: '/Home/artist',
        name: 'Artist',
        component: Artist,
        meta: { title: '歌手', keepAlive: true }
      },
      {
        path: '/Home/mv',
        name: 'MV',
        component: MV,
        meta: { title: 'MV', keepAlive: true }
      }
    ]
  },
  {
    path: '/My',
    name: 'My',
    component: My,
    meta: { 
      title: '我的音乐',
      keepAlive: true,
      requireAuth: true
    }
  },
  {
    path: '/Home/song/:id',
    name: 'Song',
    component: Song,
    meta: { 
      title: '歌曲详情',
      keepAlive: false
    },
    props: route => ({ 
      id: Number(route.params.id) || 0 
    })
  },
  {
    path: '/Home/songList/:id',
    name: 'SongListDetail',
    component: SongListDetail,
    meta: { 
      title: '歌单详情',
      keepAlive: false
    },
    props: route => ({ 
      id: Number(route.params.id) || 0 
    })
  },
  {
    path: '/Home/singer/:id',
    name: 'Singer',
    component: Singer,
    meta: { 
      title: '歌手详情',
      keepAlive: false
    },
    props: route => ({ 
      id: Number(route.params.id) || 0 
    })
  },
  {
    path: '/Home/mv/:id',
    name: 'MVDetail',
    component: MVDetail,
    meta: { 
      title: 'MV详情',
      keepAlive: false
    },
    props: route => ({ 
      id: Number(route.params.id) || 0 
    })
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "error" */ '@/views/error/404.vue'),
    meta: { title: '页面不存在' }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - DF Music`
  }
  
  // 检查登录状态
  if (to.meta.requireAuth) {
    const token = storage.get('token')
    if (!token) {
      // 需要登录但未登录，跳转到登录页面
      next({ 
        path: '/Home/discover',
        query: { redirect: to.fullPath }
      })
      return
    }
  }
  
  // 路由变化时记录访问历史
  const history = storage.get('routeHistory', [])
  if (history.length >= 10) {
    history.shift() // 保持最多10条历史记录
  }
  history.push({
    path: to.fullPath,
    name: to.name,
    timestamp: Date.now()
  })
  storage.set('routeHistory', history)
  
  next()
})

router.afterEach((to, from) => {
  // 页面切换完成后的操作
  console.log(`路由切换: ${from.path} -> ${to.path}`)
})

// 路由错误处理
router.onError((error) => {
  console.error('路由错误:', error)
})

export default router
