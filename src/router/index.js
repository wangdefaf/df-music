import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('@/views/home/Home')
  const discover = () => import('@/views/discover/Discover')
  const ranklist = () => import('@/views/rankList/ranklist')
  const songlists = () => import('@/views/songlists/songlists')
  const artist = () => import('@/views/artist/artist')
  const mv = () => import('@/views/mv/mv')

const My = () => import('@/views/my/My')
const Song = () => import('@/views/song/song')
const songlistDet = () => import('@/views/songlistDet/songlistDet')
const singer = () => import('@/views/singer/singer')
const MvDet = () => import('@/views/mvdet/mvdet')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home/discover'
  },
  {
    path: '/Home',
    component: home,
    children: [
      {
        path: '/Home/discover',
        component: discover
      },
      {
        component: ranklist,
        path: '/Home/rankList'
      },
      {
        component:  songlists,
        path: '/Home/songlist'
      },
      {
        component: artist,
        path: '/Home/artist'
      },
      {
        component: mv,
        path: '/Home/mv'
      },
    ]
  },
  {
    path: '/My',
    component: My
  },
  {
    name: 'song',
    path: '/Home/song/:id',
    component: Song
  },
  {
    name: 'songList',
    path: '/Home/songList/:id',
    component: songlistDet
  },
  {
    name: 'singer',
    path: '/Home/singer/:id',
    component: singer
  },
  {
    name: 'mvdet',
    path: '/Home/mv/:id',
    component: MvDet
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
