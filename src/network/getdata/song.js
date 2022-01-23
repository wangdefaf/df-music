
// 获取歌曲详情
import {request} from "../requrst";

export function getSongDet(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}
// 获取歌词
export function getLyric(id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}
//获取歌词url
export function getSongUrl(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}
//获取相似音乐
export function getSimiSong(id) {
  return request({
    url: '/simi/song',
    params: {
      id
    }
  })
}

//获取精彩评论
export function getComment(id) {
  return request({
    url: '/comment/music',
    params: {
      id,
      limit: 30
    }
  })
}
