import Vue from 'vue'
import router from "./router"
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from "vue-lazyload"
import VueCookie from 'vue-cookie'
import store from './store/index'
import { Message } from "element-ui";
// import env from './env'
import App from './App.vue'
// 引入iconfont
import './assets/font/iconfont.css'
import Distpicker from 'v-distpicker'
Vue.component('v-distpicker', Distpicker)


// 按需加载element组件
Vue.prototype.$message = Message;

/* 
Mockjs（不用时关闭开关）
*/
const mock = false;
if (mock) {
  // mock开关打开时才加载模块（数据定义的地方）
  require('./mock/api')
}

/* 
axios错误拦截代码，通过接口文档，请求码请求成功返回data，未登录跳转login，错误则弹出错误
以及axios的基本配置
*/
// 代理下时我们使用的时这种方式
// const that=this;
axios.defaults.baseURL = '/api',
  // 根据环境变量来获取我们不同的请求地址
  // axios.defaults.baseURL = env.baseURL,
  axios.defaults.timeout = 5000,

  axios.interceptors.response.use(response => {
    // Do something before response is sent
    let res = response.data;
    if (res.status == 0) {
      return res.data;
    } else if (res.status == 10) {
      // 这里判断请求如果用户未登录且不在index页面则跳转登录
      let path = location.pathname;
      if (path != "/index" && path != "/") {
        // 方法一：使用原始方法
        // 判断是否已经在login，如果在则不跳转
        // if (path != "/login") {
        //   window.location.href = '/login'
        // }
        // 方法一：使用router进行跳转
        // 使用路由跳转（有坑，需要在router.js中处理）
        router.push('/login')
      }
      // 在这里抛出reject，因为promise默认会resolve，这里的结果会直接到then里面，达不到我们预期的效果
      return Promise.reject(res);
    } else {
      // 这里没有用到Vue的实例，因此需要直接使用Message
      Message.error(res.msg);
      return Promise.reject(res);
    }
  }, error => {
    // Do something with response error// 服务器异常处理
    console.log(error);
    let res = error.response
    Message.error(res);
    return Promise.reject(error)
  });

//将axios挂载在Vue实例上，之后就可使用this调用axios实例。
Vue.use(VueAxios, axios);
//挂载lazyload插件,并配置loading
Vue.use(VueLazyload, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
// 挂载vue-Cooki插件
Vue.use(VueCookie);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
