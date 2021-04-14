/*订单列表、订单确认、订单支付、购物车的父组件*/
<template>
  <div>
    <nav-order></nav-order>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavFooter from "../components/NavFooter.vue";
import NavOrder from '../components/NavOrder.vue';
export default {
  components: { NavFooter, NavOrder },
  name: "home",
};
</script>
<style scoped>
</style>
