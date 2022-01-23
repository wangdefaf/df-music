import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
  })
  instance.interceptors.request.use(config => {
    // setTimeout(()=> store.state.isLoadingShow = true,0.1)
    return config
  }, err => {
    console.log(err, '请求失败拦截');
  })

  instance.interceptors.response.use(res => {
    // setTimeout(()=> store.state.isLoadingShow = false,1)
    return res
  }, err => {

  })
  return instance(config)
}