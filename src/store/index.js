import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoadingShow: false,
    isLogShow: false,
    isLogin: false,
    userId: null,
    userUrl: null,
    setTime: false,
    songId: [1854142292,],//当前歌曲Id
    index: 0,//键值
    lrc: [], //歌词
    time:0, //进度条位置
  },
  mutations: {
    playClick (state,id) {
      state.index = 0
      state.songId = []
      state.songId.push(id)
    },
    playAll (state,id) {
      state.songId = id
    },
    lrcChange(state) {
      state.lrc = []
    },
  },
  actions: {
  },
  modules: {
  }
})
