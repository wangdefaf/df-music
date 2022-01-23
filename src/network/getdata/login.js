import {request} from "../requrst";


//获得二维码key
export function getLoginQr() {
  return request({
    url: '/login/qr/key',
    withCredentials: true,
    params: {
      't': new Date().getTime()
    }
  })
}

//获得二维码
export function getLoginQrKey(key,qrimg) {
  return request({
    url: '/login/qr/create',
    withCredentials: true,
    params: {
      key,
      qrimg,
      't': new Date().getTime()
    }
  })
}

//轮询接口状态
export function getLoginQrCheck(key) {
  return request({
    url: '/login/qr/check',
    withCredentials: true,
    params: {
      key,
      't': new Date().getTime()
    }
  })
}

//退出登录
export function getLoginOut() {
  return request({
    url: '/logout',
    withCredentials: true,
    pragma: {
      'timerstamp': new Date().getTime()
    }
  })
}