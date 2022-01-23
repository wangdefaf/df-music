import {request} from "../requrst";

export function toplistHot(value) {
  return request({
    url: '/artist/list',
    params: {
      initial : value[0],
      type : value[1],
      area : value[2],
      limit: 100
    }
  })
}
// 获取歌单详情
export function getSongListDet(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}
//获取相似音乐
export function getSimiSongList(id) {
  return request({
    url: '/related/playlist',
    params: {
      id
    }
  })
}
//获取精彩评论
export function getComment(id) {
  return request({
    url: '/comment/playlist',
    params: {
      id,
      limit: 30
    }
  })
}
