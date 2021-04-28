/* 支付宝中转页面 */
<template>
  <div class="order_alipay">
    <nav-order title="支付宝支付" titlesub="谨防第三方支付骗局，支付需谨慎"></nav-order>
    <loading></loading>
    <div v-html="content"></div>
  </div>
</template>
<script>
import loading from '../components/loading.vue';
import NavOrder from '../components/NavOrder.vue';
export default {
  components: { loading, NavOrder },
  name: "alipay",
  data() {
    return {
      orderNo: this.$route.query.orderNo,
      content: "",
    };
  },
  mounted() {
    this.intentToAlipay();
  },
  methods: {
    intentToAlipay() {
      this.axios
        .post("/pay", {
          orderId: this.orderNo,
          orderName: "小牲口223",
          amount: 0.01,
          payType: 1,
        })
        .then((res) => {
          this.content = res.content;
           setTimeout(() => {
           document.forms[0].submit();
           },500);
        });
    },
  },
};
</script>
<style lang="scss">
</style>
