# mistore

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

[TOC]

# 1. 项目基础架构

> 项目使用到的技术栈：Vue全家桶，后台接口线上调联，Sass预编译，ElementUI等等等等

## 1.1 项目基础架构

这时我们项目的基本结构：


```
VueProject
└─ mistore
   ├─ babel.config.js
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  ├─ favicon.ico
   │  └─ index.html
   ├─ README.md
   └─ src
      ├─ api
      │  └─ index.js
      ├─ App.vue
      ├─ assets
      │  └─ logo.png
      ├─ components
      │  ├─ NavFooter.vue
      │  └─ NavHeader.vue
      ├─ main.js
      ├─ pages
      │  ├─ alipay.vue
      │  ├─ cart.vue
      │  ├─ detail.vue
      │  ├─ home.vue
      │  ├─ index.vue
      │  ├─ login.vue
      │  ├─ order.vue
      │  ├─ orderConfrim.vue
      │  ├─ orderList.vue
      │  ├─ orderPay.vue
      │  └─ product.vue
      ├─ router.js
      ├─ storage
      │  └─ index.js
      ├─ store
      └─ util
         └─ index.js

```

首先贴出我们项目的几个主要实现效果图

![image-20210430170358717](C:\Users\LuAo\AppData\Roaming\Typora\typora-user-images\image-20210430170358717.png)

## 1.2  主要插件

"axios": "^0.21.1"

"element-ui": "^2.15.1",

"node-sass": "^5.0.0",

"sass-loader": "^11.0.1",

"vue-awesome-swiper": "^4.1.1",

"vue-cookie": "^1.1.4",

 "vue-lazyload": "^1.3.3",

...

## 1.3  路由封装

使用路由懒加载的方式进行路由的设置，根据我们的项目设计稿封装路由

**伪代码如下：**

```
import vue from 'vue';
import Router from "vue-router"
vue.use(Router);
// 使用路由懒加载的方式加载路由
var cart = () => import('./pages/cart.vue');
...
var router=new Router({
  routes: [
    // 初始默认路由(home)
    {
      children: [
        // 商品详情（动态）
        // 大图展示（动态）
        // 首页
      ]
    },
    // 购物车路由
    // order父路由
      children: [
        // 订单列表
        // 订单确认
        // 订单支付
      ]
    },
    //登录
  ],
  mode:'history'
});
export default router
```

## 1.4 sessionstorage的封装

为什么要封装storage：

1. Storage本身虽然有Api，但是只是简单的键值对的形式
2. Storage只能存储字符串，需要人工转换成json对象
3. Storage只能一次性清空，不能单个清空

我们通常在Storage中存储json对象，因此我们需要自己封装Storage方法。

```js
/* 
Storage封装
*/
const STORAGE_KEY = 'mall';
export default {
  // 存储值
  setItem(key, value, modules_name) {
    if (modules_name) {
      var all = this.getItem(modules_name)
      all[key] = value;
      // 这里递归本方法将modules_name作为key(已有),再将当前添加进去的all放进此module_name中,此时的val就包含了所有值，最后直接添加即可
      this.setItem(modules_name, all)
    } else {
      //只传入两个参数：
      let val = this.getStorage();
      console.log(val);
      val[key] = value;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },
  /*
  获取值(可以传入一个值也可传入两个值)
  一个参数：没有moudle直接单对象
  一个参数：获得moudle下的key对应的对象
  */
  getItem(key, modules_name) {
    if (modules_name) {
      let val = this.getItem(modules_name);
      if (val) return val[key]
    }
    return this.getStorage()[key];
  },
  // 获取整个数据(转为json格式):将数据转换为json格式。
  getStorage() {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
  },
  // 删除某一个值
  clear(key, modules_name) {
    let val = this.getStorage();
    if (modules_name) {
      delete val[modules_name][key]
    } else {
      delete val[key]
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  }
}
```

使用方法：

```js
// console.log(storage.getStorage());
// storage.setItem('a',1);
// storage.setItem('address','北京','person');
// storage.setItem('abc',{data:88},'person');
storage.clear('a')
```

这样我们可以将整个项目中使用的storage全部放在一个key/value中，在value中存放所有的data，使用json的形式存储

## 1.5 接口错误拦截

1. 统一报错
2. 未登录统一拦截
3. 请求值，返回值统一处理

我们通过使用axios的拦截来统一处理请求的情况处理以及对应的返回值。以及处理未登录时进行跳转登录界面等等。还有统一请求值以及返回值的处理（比如表单的格式等等）。



## 1.6 接口环境的设置

通常请开个下我们项目再不同的阶段有不同的接口

> 也就是说当我们使用jsonp或者cors跨域的方式来请求接口时，而且我们分环境时会有不同的请求接口，那么我们应该遵循es6模块化的思想，我们将所有的环境变量进行统一的抽取。而避免在业务代码中修改我们的代码而造成一些不可避免的错误。

1. 开发上线的不同阶段，需要不同的配置（也就是说我们不同阶段所需要的接口也是不一样的）
2. 不同的跨域方式，配置不同
3. 打包的时候通过注入环境参数，统一管理环境，输出不同的版本包

> 当我们在代理中使用不同的环境接口怎么办呢，这时我们就可以直接进行修改vue.config.js的baseurl的可以

一般情况下我们有三套环境，分别是开发，测试，生产。当我们需要再添加环境时需要我们新建`.dev.环境名文件`进行设置NODE_DEV的值。然后再进行响应配置。

​	以下是我们的一个实例：

package.json下

```json
"scripts": {
    "serve": "vue-cli-service serve --mode=development",
    "test": "vue-cli-service serve --mode=test",
    "haha": "vue-cli-service serve --mode=haha",
    "build": "vue-cli-service build --mode=production",
  },
```

dev.js模块（不同环境不同接口的配置）：

```js
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
```

自定义环境配置（haha）.env.haha文件：

```
NODE_ENV='haha'
```

## 1.7 MOCK设置

为什么要使用MOCK：

1. 开发阶段，为了高效率，需要提前Mock
2. 减少代码冗余，灵活插拔
3. 减少沟通，减少接口联调时间

主流的三种MOCK设置：

1. 本地创建json
2. easy-mock平台(推荐本地搭建easymock平台)
3. 继承Mock API（推荐Mock.js）

我们需要注意的是，第一种方式是最简单，不需要任何学习成本的，当时带来的弊端就是不能统一接口，也就是说我们需要改的地方比较多。第二种是发送的真实的请求，第三种是拦截请求，在本地模拟数据，后两种都有一定的学习成本，也推荐使用。



# 2.首页功能开发

1. NavHeader开发

2. HeaderFooter

3. 首页轮播图（Swiper）

4. 广告位

5. 商品展示（axios请求）

6. 工具model的封装（使用了Vue动画组件）

7. 图片懒加载 vue-lazyload 插件的使用



# 3.登录功能开发

1. 登录注册界面实现

2. 登录逻辑（设置Cookie缓存用户登录状态）

3. 注册逻辑（错误拦截的小坑，无法获取msg信息，已处理）

> **疑问**：
>
> 拉取用户信息和购物车数量到Vuex有什么作用，用户界面刷新Vuex的所有数据都可能清空，拉取这两条数据有什么本质上的做作用？
>
> **解答**：
>
> Vuex中只传输这两条数据（因此需要再次拉去一次），自己想太多，以为Vuex中的用户的信息和后面的接口请求有关系，其实这里Vuex展示保存了这两个数据用于再主页展示而已。
>
> 和Cookie的周期搞混乱了。也就是说我们使用这个拉去的前提时我们的状态时登录的，所以才会有数据。因此这个解决的就是页面刷新可能会导致Vuex中的States数据清空。

4. 添加Vuex进行首页用户名和购物车数量的管理

5. 退出登录功能的实现

6. 注册登录状态使用vuex状态托管

> 注意点：在index刷新时拉去Vuex中的数据，且在index的声明周期再次拉去数据，在声明周期内拉去数据的原因是因为我们使用的是spa模式，因此购物车数据改变并不会刷新，因此我们每次组件进入时再次拉去购物车数据（我认为是有必要的），username可以不采用这种做法



# 4.产品站功能开发

1. 顶部吸顶插件及其功能
2. 产品站布局（包括底部的swiper，以及视频展示）
3. 视频的动画效果
4. 接口的请求渲染

# 5.商品详情页面

1. 完成界面
2. 请求数据进行交互
3. 添加购物车跳转购物车界面

**注意：**

> 加入购物车时必须要登录状态才可以完成，这里有当时封装axios时留下的一个坑。就就当状态为10时，应该返回reject状态的promise，
>
> 所以当我们未登录时，点击添加到购物车，就会执行我们then里面的代码（Promise如果没有指定返回指定状态会默认返回resolve状态）。造成一些不必要的bug



# 6.购物车页面

1. Order-Nav组件的封装
2. 购物车界面
3. 购物车接口的请求以一些判断

> 总结：再实际开发中，为了预防一些安全问题，购物车的逻辑是由后端完成的，我们前端只需要属性接口文档，将各个操作对应即可



# 7.ElementUI集成

结合官方文档完成Message等插件的按需加载，提高了开发效率



# 8.订单确认功能

1. 布局完成
2. 初始化交互，渲染当前id的收货地址、购物车选中的商品信息等
3. 完成收货地址的删除、改变、增加
4. 其中使用到了v-distpicker省市级联动插件，使用方法网上有
5. 完成订单的结算，生成了订单编号



# 9.订单支付功能

1. 完成布局
2. 实现数据交互

1. 支付宝支付(后端传html的from表单代码)进行集成
2. 微信支付，将后端的支付地址转为二维码显示（Native支付）
3. 微信支付轮询，判断是否支付（若检测到用户已支付则跳转至订单列表页面，关闭则轮询停止）

> 微信支付：content内容是支付链接，转换为二维码即可扫码支付
>
> 支付宝支付：content是html源码，渲染到页面上后自动跳转到支付页面
>
> 将url转为二维码使用QRCode插件。



# 10.订单列表功能实现

1. 界面实现
2. 交互
3. 按需引入elementUI分页器组件并实现分页功能
4. 排查了一些后端接口的错误，例如，个人地址信息接口中的`receiverPhone`和支付的接口中的`receiverPhone`不同步

> 常见的三种分页功能：
> 1.分页器
>
> 2.按钮加载更多
>
> 3.滚动加载更多









