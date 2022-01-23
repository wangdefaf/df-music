import {request} from "../requrst";

export function getMVList(area,type,offset) {
  return request({
    url: 'mv/all',
    params: {
      area,
      type,
      offset
    }
  })
}

// 获取MV详情
export function getMvDet(mvid) {
  return request({
    url: 'mv/detail',
    params: {
      mvid
    }
  })
}
//获取相似音乐
export function getMvSimi(mvid) {
  return request({
    url: 'simi/mv',
    params: {
      mvid
    }
  })
}
//获取精彩评论
export function getComment(id) {
  return request({
    url: 'comment/mv',
    params: {
      id,
      limit: 30
    }
  })
}

//获取MV地址
export function getMvUrl(id) {
  return request({
    url: '/mv/url',
    params: {
      id,
    }
  })
}

