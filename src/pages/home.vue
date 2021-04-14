/*产品详情、大图展示、首页的父组件*/
<template>
  <div>
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavFooter from "../components/NavFooter.vue";
import NavHeader from "../components/NavHeader.vue";
export default {
  components: { NavHeader, NavFooter },
  name: "home",
};
</script>
<style scoped>
</style>
