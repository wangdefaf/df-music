import {request} from "../requrst";
// //模糊查询
// export function getSearch(keywords) {
//   return request({
//     url: '/search',
//     params: {
//       keywords
//     }
//   })
// }
//
// //精密查询
// export function getSearchMulti(keywords) {
//   return request({
//     url: '/cloudsearch',
//     params: {
//       keywords
//     }
//   })
// }

//热搜列表
export function getSearchHot() {
  return request({
    url: 'search/hot/detail',
  })
}

//搜索建议
export function getSearchSug(keywords) {
  return request({
    url: 'search/suggest',
    params: {
      keywords
    }
  })
}