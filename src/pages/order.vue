/*订单列表、订单确认、订单支付、购物车的父组件*/
<template>
<router-view></router-view>
<nav-footer></nav-footer>
</template>
<script>
import NavFooter from '../components/NavFooter.vue'
export default {
  components: { NavFooter },
   name:'home',
}
</script>
<style scoped>

</style>
