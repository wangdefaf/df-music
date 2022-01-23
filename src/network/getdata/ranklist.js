import {request} from "../requrst";

export function toplistHot() {
  return request({
    url: 'toplist',
  })
}

export function toplistDetails(id) {
  return request({
    url: 'playlist/detail',
    params: {
      id
    }
  })
}