/*
这是当我们的跨域方式为jsonp或者cors时才能使用的baseURL 
不同环境下的BaseURL地址模块
process.env.NODE_ENV:获取nodejs进程的一些参数信息
*/
let baseURL;
switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://dev-mall-pre.springboot.cn/api'
    break;
  case 'test':
    baseURL = 'http://test-mall-pre.springboot.cn/api'
    break;
  case 'haha':
    baseURL = 'http://haha-mall-pre.springboot.cn/api'
    break;
  case 'production':
    baseURL = 'http://mall-pre.springboot.cn/api'
    break;
  default:
    baseURL = 'http://mall-pre.springboot.cn/api'
    break;
}
export default { baseURL }