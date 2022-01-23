import {request} from "../requrst";
//账户信息
export function getUesrAccount() {
  return request({
    url: 'user/account',
    withCredentials: true,
  })
}
//账户详情
export function getUesrDet(uid) {
  return request({
    url: 'user/detail',
    params: {
      uid
    },
    withCredentials: true,
  })
}

//歌单详情
export function getUserPlayList(uid) {
  return request({
    url: 'user/playlist',
    params: {
      uid
    },
    withCredentials: true,
  })
}



