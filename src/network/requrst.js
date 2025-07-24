import axios from "axios"
import store from '@/store'
import { Message } from 'element-ui'

// 请求重试配置
const RETRY_CONFIG = {
  retries: 3,
  retryDelay: 1000,
  retryCondition: (error) => {
    return error.code === 'NETWORK_ERROR' || 
           (error.response && error.response.status >= 500)
  }
}

// 创建axios实例
export function request(config) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
    withCredentials: true, // 支持跨域携带cookie
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // 请求拦截器
  instance.interceptors.request.use(
    config => {
      // 显示loading
      store.commit('SET_LOADING', true)
      
      // 添加token到请求头
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1]
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      
      // 添加请求时间戳，防止缓存
      if (config.method === 'get') {
        config.params = {
          ...config.params,
          _t: Date.now()
        }
      }
      
      console.log('请求发送:', config.url, config.params || config.data)
      return config
    },
    error => {
      store.commit('SET_LOADING', false)
      console.error('请求配置错误:', error)
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    response => {
      store.commit('SET_LOADING', false)
      
      const { data } = response
      
      // 统一处理业务错误码
      if (data.code !== undefined && data.code !== 200) {
        const errorMsg = data.message || data.msg || '请求失败'
        
        // 特殊错误码处理
        switch (data.code) {
          case 301:
          case 400:
            Message.error('需要登录')
            store.commit('SET_LOGIN_SHOW', true)
            break
          case 502:
            Message.error('服务器错误，请稍后重试')
            break
          case 503:
            Message.error('服务暂不可用')
            break
          default:
            Message.error(errorMsg)
        }
        
        return Promise.reject(new Error(errorMsg))
      }
      
      console.log('请求成功:', response.config.url, data)
      return response
    },
    error => {
      store.commit('SET_LOADING', false)
      
      let errorMessage = '网络错误，请检查网络连接'
      
      if (error.response) {
        // 服务器响应错误
        const { status, data } = error.response
        switch (status) {
          case 400:
            errorMessage = '请求参数错误'
            break
          case 401:
            errorMessage = '未授权，请重新登录'
            store.commit('SET_LOGIN_SHOW', true)
            break
          case 403:
            errorMessage = '拒绝访问'
            break
          case 404:
            errorMessage = '请求的资源不存在'
            break
          case 408:
            errorMessage = '请求超时'
            break
          case 500:
            errorMessage = '服务器内部错误'
            break
          case 502:
            errorMessage = '网关错误'
            break
          case 503:
            errorMessage = '服务不可用'
            break
          case 504:
            errorMessage = '网关超时'
            break
          default:
            errorMessage = data?.message || data?.msg || `服务器错误 (${status})`
        }
      } else if (error.request) {
        // 网络错误
        if (error.code === 'ECONNABORTED') {
          errorMessage = '请求超时，请稍后重试'
        } else {
          errorMessage = '网络连接失败，请检查网络'
        }
      }
      
      // 显示错误消息（避免重复显示）
      if (!error.config?.__isRetryRequest) {
        Message.error(errorMessage)
      }
      
      console.error('请求失败:', error.config?.url, errorMessage, error)
      return Promise.reject(error)
    }
  )

  // 添加重试功能
  instance.interceptors.response.use(
    undefined,
    async (error) => {
      const { config } = error
      
      if (!config || !RETRY_CONFIG.retryCondition(error)) {
        return Promise.reject(error)
      }
      
      config.__retryCount = config.__retryCount || 0
      
      if (config.__retryCount >= RETRY_CONFIG.retries) {
        return Promise.reject(error)
      }
      
      config.__retryCount++
      config.__isRetryRequest = true
      
      // 等待后重试
      await new Promise(resolve => {
        setTimeout(resolve, RETRY_CONFIG.retryDelay * config.__retryCount)
      })
      
      console.log(`重试请求 (${config.__retryCount}/${RETRY_CONFIG.retries}):`, config.url)
      return instance(config)
    }
  )

  return instance(config)
}

// 封装常用请求方法
export const http = {
  get: (url, params = {}, config = {}) => {
    return request({
      method: 'get',
      url,
      params,
      ...config
    })
  },
  
  post: (url, data = {}, config = {}) => {
    return request({
      method: 'post',
      url,
      data,
      ...config
    })
  },
  
  put: (url, data = {}, config = {}) => {
    return request({
      method: 'put',
      url,
      data,
      ...config
    })
  },
  
  delete: (url, config = {}) => {
    return request({
      method: 'delete',
      url,
      ...config
    })
  }
}