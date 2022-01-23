import {request} from "../requrst";

export function getPlayListCatlist() {
  return request({
    url: 'playlist/catlist',
  })
}

export function getPlayListDetails(order,cat,offset) {
  return request({
    url: 'top/playlist',
    params: {
      order,
      cat,
      offset
    }
  })
}
