/* 订单列表（基于order.vue） */
<template>
<div>
   <nav-order title="订单列表" titlesub="您所有的订单记录都在这里"></nav-order>
   订单列表
</div>
</template>
<script>
import NavOrder from '../components/NavOrder.vue'
export default {
  components: { NavOrder },
   name:'order-list',
   mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
   },
}
</script>
<style scoped>

</style>
