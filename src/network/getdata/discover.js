import {request} from "../requrst";

export function getHomeGoods() {
  return request({
    url: 'homepage/block/page',
  })
}
export function getsongList(cat) {
  return request({
    url: 'top/playlist/highquality?limit=5',
    params: {
      cat
    }
  })
}
export function getsingerList(type) {
  return request({
    url: 'toplist/artist',
    params: {
      type
    }
  })
}
export function getTopList(id) {
  return request({
    url: 'playlist/detail',
    withCredentials: true,
    params: {
      id
    }
  })
}
