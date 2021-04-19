<template>
  <div class="service">
    <ul class="footer_top">
      <li v-for="(item, index) in footer_topdata" :key="index">
        <a href=""><span class="iconfont">&#xe622;</span>{{ item }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "servicebar",
  data() {
    return {
      footer_topdata: [
        "预约维修服务",
        "7天无理由退货",
        "15天免费换货",
        "满99元包邮",
        "520余家售后网点",
      ],
    };
  },
};
</script>
<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.service {
  width: $min-width;
  margin-right: auto;
  margin-left: auto;
}
.footer_top {
  height: 83px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  li {
    position: relative;
    text-align: center;
    flex-grow: 1;
    line-height: 83px;
    a {
      color: #616361;
      font-size: 15px;
      padding-right: 10px;
      &:hover span,
      &:hover {
        color: #ff8000;
      }
      span {
        color: #616361;
        font-size: 20px;
        padding-right: 10px;
      }
    }
    &::before {
      content: " ";
      position: absolute;
      right: 0px;
      width: 1px;
      height: 30px;
      top: 30px;
      border-right: 1px solid $colorF;
    }
    &:last-child::before {
      display: none;
    }
  }
}
</style>
