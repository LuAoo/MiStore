<template>
  <!-- 跟组件 -->
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      res: {},
    };
  },
};
</script>

<style>
@import "./assets/scss/reset.scss";
</style>
 
