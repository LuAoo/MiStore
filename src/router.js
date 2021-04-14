import vue from 'vue';
import Router from "vue-router"
vue.use(Router);
// 使用路由懒加载的方式加载路由
var cart = () => import('./pages/cart.vue');
var detail = () => import('./pages/detail.vue');
var home = () => import('./pages/home.vue');
var index = () => import('./pages/index.vue');
var login = () => import('./pages/login.vue');
var order = () => import('./pages/order.vue');
var orderConfrim = () => import('./pages/orderConfrim.vue');
var orderList = () => import('./pages/orderList.vue');
var orderPay = () => import('./pages/orderPay.vue');
var product = () => import('./pages/product.vue');
var alipay = () => import('./pages/alipay.vue');


var router=new Router({
  routes: [
    // 初始默认路由(home)
    {
      path: '/',
      name: '',
      component: home,
      redirect:'/index',
      children: [
        // 商品详情（动态）
        {
          path: 'product/:id',
          name: 'product',
          component: product
        },
        // 大图展示（动态）
        {
          path: 'detail/:id',
          name: 'detail',
          component: detail
        },
        // 首页
        {
          path: 'index',
          name: 'index',
          component: index
        },
      ]
    },
    // 购物车路由
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    // order父路由
    {
      path: '/order',
      name: 'order',
      component: order,
      children: [
        // 订单列表
        {
          path: 'List',
          name: 'orderList',
          component: orderList
        },
        // 订单确认
        {
          path: 'Confrim',
          name: 'orderConfrim',
          component: orderConfrim
        },
        // 订单支付
        {
          path: 'Pay',
          name: 'orderPay',
          component: orderPay
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: alipay
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ],
  mode:'history'
});
export default router