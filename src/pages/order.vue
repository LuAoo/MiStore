/*订单列表、订单确认、订单支付、购物车的父组件*/
<template>
  <div>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavFooter from "../components/NavFooter.vue";
import ServiceBar from "../components/ServiceBar.vue";
export default {
  components: { NavFooter, ServiceBar },
  name: "home",
  data() {
    return {
      title: "",
      titlesub: "",
    };
  },
};
</script> 
<style scoped>
</style>
