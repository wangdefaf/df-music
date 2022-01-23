import {request} from "../requrst";

// 获取歌手详情
export function getSingerDet(id) {
  return request({
    url: 'artist/detail',
    params: {
      id
    }
  })
}
//获取相似音乐
export function getSimiSinger(id) {
  return request({
    url: 'simi/artist',
    params: {
      id
    }
  })
}

//获取歌手单曲
export function getSingerSong(id) {
  return request({
    url: 'artists',
    params: {
      id
    }
  })
}
