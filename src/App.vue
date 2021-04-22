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
  mounted() {
    // 每刷新时拉取一次用户信息到Vuex，防止刷新时数据丢失
    this.getUser();
    this.getCartCount();
  },
  methods: {
    getUser() {
      this.$store.dispatch("frashIndexUpdataUsername");
    },
    getCartCount() {
      this.$store.dispatch("frashIndexUpdataUpdata");
    },
  },
};
</script>

<style lang='scss'>
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/button.scss";
</style>
 
