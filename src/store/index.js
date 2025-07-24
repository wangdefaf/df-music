import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 状态类型常量
const MUTATION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_LOGIN_SHOW: 'SET_LOGIN_SHOW',
  SET_LOGIN_STATUS: 'SET_LOGIN_STATUS',
  SET_USER_INFO: 'SET_USER_INFO',
  SET_TIME_STATUS: 'SET_TIME_STATUS',
  PLAY_SINGLE: 'PLAY_SINGLE',
  PLAY_ALL: 'PLAY_ALL',
  SET_CURRENT_INDEX: 'SET_CURRENT_INDEX',
  CLEAR_LYRICS: 'CLEAR_LYRICS',
  SET_LYRICS: 'SET_LYRICS',
  SET_CURRENT_TIME: 'SET_CURRENT_TIME'
}

export default new Vuex.Store({
  state: {
    isLoadingShow: false,
    isLogShow: false,
    isLogin: false,
    userId: null,
    userUrl: null,
    userName: '',
    setTime: false,
    songId: [1854142292], // 当前播放列表
    index: 0, // 当前播放索引
    lrc: [], // 歌词数组
    time: 0, // 当前播放时间
    volume: 50, // 音量
    playMode: 'sequence' // 播放模式: sequence, random, single
  },
  
  getters: {
    // 获取当前播放歌曲ID
    currentSongId: state => {
      return state.songId[state.index] || null
    },
    // 获取播放列表长度
    playlistLength: state => state.songId.length,
    // 是否有下一首
    hasNext: state => state.index < state.songId.length - 1,
    // 是否有上一首
    hasPrev: state => state.index > 0,
    // 用户是否登录
    isUserLoggedIn: state => state.isLogin && state.userId
  },
  
  mutations: {
    [MUTATION_TYPES.SET_LOADING](state, status) {
      state.isLoadingShow = status
    },
    
    [MUTATION_TYPES.SET_LOGIN_SHOW](state, status) {
      state.isLogShow = status
    },
    
    [MUTATION_TYPES.SET_LOGIN_STATUS](state, status) {
      state.isLogin = status
    },
    
    [MUTATION_TYPES.SET_USER_INFO](state, userInfo) {
      state.userId = userInfo.userId
      state.userUrl = userInfo.avatarUrl
      state.userName = userInfo.nickname || ''
    },
    
    [MUTATION_TYPES.SET_TIME_STATUS](state, status) {
      state.setTime = status
    },
    
    [MUTATION_TYPES.PLAY_SINGLE](state, songId) {
      state.index = 0
      state.songId = [songId]
    },
    
    [MUTATION_TYPES.PLAY_ALL](state, playlist) {
      state.songId = playlist
      state.index = 0
    },
    
    [MUTATION_TYPES.SET_CURRENT_INDEX](state, index) {
      if (index >= 0 && index < state.songId.length) {
        state.index = index
      }
    },
    
    [MUTATION_TYPES.CLEAR_LYRICS](state) {
      state.lrc = []
    },
    
    [MUTATION_TYPES.SET_LYRICS](state, lyrics) {
      state.lrc = lyrics
    },
    
    [MUTATION_TYPES.SET_CURRENT_TIME](state, time) {
      state.time = time
    }
  },
  
  actions: {
    // 异步设置用户信息
    async setUserInfo({ commit }, userInfo) {
      try {
        commit(MUTATION_TYPES.SET_USER_INFO, userInfo)
        commit(MUTATION_TYPES.SET_LOGIN_STATUS, true)
        return Promise.resolve()
      } catch (error) {
        console.error('设置用户信息失败:', error)
        return Promise.reject(error)
      }
    },
    
    // 播放单首歌曲
    playSong({ commit }, songId) {
      commit(MUTATION_TYPES.PLAY_SINGLE, songId)
      commit(MUTATION_TYPES.CLEAR_LYRICS)
    },
    
    // 播放整个列表
    playPlaylist({ commit }, { playlist, index = 0 }) {
      commit(MUTATION_TYPES.PLAY_ALL, playlist)
      commit(MUTATION_TYPES.SET_CURRENT_INDEX, index)
      commit(MUTATION_TYPES.CLEAR_LYRICS)
    },
    
    // 下一首
    nextSong({ commit, state, getters }) {
      if (state.playMode === 'random') {
        const randomIndex = Math.floor(Math.random() * state.songId.length)
        commit(MUTATION_TYPES.SET_CURRENT_INDEX, randomIndex)
      } else if (getters.hasNext) {
        commit(MUTATION_TYPES.SET_CURRENT_INDEX, state.index + 1)
      } else if (state.playMode === 'sequence') {
        commit(MUTATION_TYPES.SET_CURRENT_INDEX, 0)
      }
    },
    
    // 上一首
    prevSong({ commit, state, getters }) {
      if (state.playMode === 'random') {
        const randomIndex = Math.floor(Math.random() * state.songId.length)
        commit(MUTATION_TYPES.SET_CURRENT_INDEX, randomIndex)
      } else if (getters.hasPrev) {
        commit(MUTATION_TYPES.SET_CURRENT_INDEX, state.index - 1)
      } else if (state.playMode === 'sequence') {
        commit(MUTATION_TYPES.SET_CURRENT_INDEX, state.songId.length - 1)
      }
    },
    
    // 登出
    logout({ commit }) {
      commit(MUTATION_TYPES.SET_LOGIN_STATUS, false)
      commit(MUTATION_TYPES.SET_USER_INFO, {
        userId: null,
        avatarUrl: null,
        nickname: ''
      })
      // 清除cookie等
      this._vm.$cookies.remove('token')
    }
  },
  
  modules: {
    // 可以在这里添加模块化的store
  }
})
