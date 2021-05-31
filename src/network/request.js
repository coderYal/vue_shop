import axios from 'axios'

export function request (config) {
//  1：创建axios实例对象
  const instance = axios.create({
    baseURL: 'http://timemeetyou.com:8889/api/private/v1/',
    timeout: 50000,
    method: 'post'
  })
  // 2：配置请求拦截
  instance.interceptors.request.use(config => {
  //  2.1：通常加入loading动画，判断token，添加请求头
    return config
  }, err => {
    console.log(err)
  })
  //  3：响应拦截
  instance.interceptors.response.use(res => {
  //  3.1：数据数列化，数据过滤
    return res.data
  }, err => {
  //  响应失败，根据错误码，显示不同信息
    console.log(err)
  })

  //  4：发送网络请求，axios实例对象返回的是一个promise对象，可以用then
  return instance(config)
}
