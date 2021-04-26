/*订单列表、订单确认、订单支付、购物车的父组件*/
<template>
  <div>
    <nav-order :title="title" :titlesub="titlesub"></nav-order>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavFooter from "../components/NavFooter.vue";
import NavOrder from "../components/NavOrder.vue";
import ServiceBar from "../components/ServiceBar.vue";
export default {
  components: { NavFooter, NavOrder, ServiceBar },
  name: "home",
  data() {
    return {
      title:'',
      titlesub:''
    }
  },
  mounted() {
    this.getRouterPath();
  },
  methods: {
    getRouterPath() {
      let path = this.$route.path;
      switch (path) {
        case "/order/Confrim":
          this.title='订单确认';
          this.titlesub='请认真填核对填写您的订单信息';
          break;
        case "/order/List":
          this.title='订单列表';
          this.titlesub='请谨防钓鱼链接或诈骗电话，了解更多';
          break;
        case "/order/Pay":
          this.title='订单支付';
          this.titlesub='请您谨慎付款,不要通过第三仿支付';
          break;
        case "/order/alipay":
          this.title='';
          this.titlesub='';
          break;
        default:
          break;
      }
    },
  },
};
</script> 
<style scoped>
</style>
