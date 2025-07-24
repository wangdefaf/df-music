/**
 * 通用工具函数库
 */

// 防抖函数
export function debounce(func, wait, immediate = false) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(this, args)
  }
}

// 节流函数
export function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 深拷贝
export function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return null
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj
  if (hash.has(obj)) return hash.get(obj)
  
  let cloneObj = new obj.constructor()
  hash.set(obj, cloneObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}

// 格式化时间
export function formatTime(time) {
  if (typeof time !== 'number' || isNaN(time)) return '00:00'
  
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

// 格式化文件大小
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 获取图片URL（带参数）
export function getImageUrl(url, params = '') {
  if (!url) return ''
  return params ? `${url}?param=${params}` : url
}

// 验证邮箱
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// 验证手机号
export function isValidPhone(phone) {
  const re = /^1[3-9]\d{9}$/
  return re.test(phone)
}

// 生成随机ID
export function generateId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// URL参数解析
export function parseQuery(url = window.location.href) {
  const query = {}
  const search = url.split('?')[1]
  if (search) {
    search.split('&').forEach(param => {
      const [key, value] = param.split('=')
      query[decodeURIComponent(key)] = decodeURIComponent(value || '')
    })
  }
  return query
}

// 对象转URL参数
export function objectToQuery(obj) {
  return Object.keys(obj)
    .filter(key => obj[key] !== undefined && obj[key] !== null && obj[key] !== '')
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')
}

// 滚动到顶部
export function scrollToTop(duration = 300) {
  const start = window.pageYOffset
  const startTime = performance.now()
  
  function scroll() {
    const now = performance.now()
    const elapsed = now - startTime
    const progress = elapsed / duration
    
    if (progress < 1) {
      window.scrollTo(0, start * (1 - progress))
      requestAnimationFrame(scroll)
    } else {
      window.scrollTo(0, 0)
    }
  }
  
  requestAnimationFrame(scroll)
}

// 本地存储封装
export const storage = {
  get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : defaultValue
    } catch (error) {
      console.error('localStorage get error:', error)
      return defaultValue
    }
  },
  
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('localStorage set error:', error)
      return false
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('localStorage remove error:', error)
      return false
    }
  },
  
  clear() {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('localStorage clear error:', error)
      return false
    }
  }
}

// 音乐相关工具
export const musicUtils = {
  // 解析歌词
  parseLyric(lyricStr) {
    if (!lyricStr) return []
    
    const lines = lyricStr.split('\n')
    const lyrics = []
    
    lines.forEach(line => {
      const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/)
      if (match) {
        const minutes = parseInt(match[1])
        const seconds = parseInt(match[2])
        const milliseconds = parseInt(match[3].padEnd(3, '0'))
        const time = minutes * 60 + seconds + milliseconds / 1000
        const text = match[4].trim()
        
        if (text) {
          lyrics.push({ time, text })
        }
      }
    })
    
    return lyrics.sort((a, b) => a.time - b.time)
  },
  
  // 获取当前歌词索引
  getCurrentLyricIndex(lyrics, currentTime) {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        return i
      }
    }
    return -1
  },
  
  // 播放模式转换
  getNextPlayMode(currentMode) {
    const modes = ['sequence', 'random', 'single']
    const currentIndex = modes.indexOf(currentMode)
    return modes[(currentIndex + 1) % modes.length]
  },
  
  // 随机播放索引
  getRandomIndex(length, excludeIndex = -1) {
    if (length <= 1) return 0
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * length)
    } while (randomIndex === excludeIndex)
    return randomIndex
  }
}

// 性能监控
export const performance = {
  // 标记开始时间
  mark(name) {
    if (window.performance && window.performance.mark) {
      window.performance.mark(`${name}-start`)
    }
  },
  
  // 测量性能
  measure(name) {
    if (window.performance && window.performance.mark && window.performance.measure) {
      window.performance.mark(`${name}-end`)
      window.performance.measure(name, `${name}-start`, `${name}-end`)
      
      const measure = window.performance.getEntriesByName(name)[0]
      console.log(`${name}: ${measure.duration.toFixed(2)}ms`)
      return measure.duration
    }
  },
  
  // 获取页面加载性能
  getPageLoadTime() {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing
      return {
        // DNS查询时间
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        // TCP连接时间
        tcp: timing.connectEnd - timing.connectStart,
        // 请求响应时间
        request: timing.responseEnd - timing.requestStart,
        // DOM解析时间
        domParse: timing.domInteractive - timing.domLoading,
        // 页面完全加载时间
        total: timing.loadEventEnd - timing.navigationStart
      }
    }
    return null
  }
}