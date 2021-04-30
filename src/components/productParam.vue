<template>
  <div class="product_param_box" :class="{ isfixed: isFixed }">
    <div class="container">
      <div class="container_box">
        <div class="product_param_box_container_left">
          <p>{{name}}</p>
        </div>
        <div class="product_param_box_container_right">
          <a href="javascript:;">概述<span>|</span></a>
          <a href="javascript:;">参数<span>|</span></a>
          <a
            href="javascript:;"
            class="product_param_box_container_right_lastdom"
            >用户评价</a
          >
          <slot name="right_button"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "product-param",
  props:{
    name:String
  },
  data() {
    return {
      isFixed: false,
    };
  },
  mounted() {
    // 添加滚动事件
    window.addEventListener("scroll", this.setIsFixed, false);
  },
  destroyed() {
    // 移除滚动事件
    window.removeEventListener("scroll", this.setIsFixed, false);
  },
  methods: {
    // 获取吸顶距离顶部距离，判断是否定位
    setIsFixed() {
      let scrollHeight =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollHeight < 151 ? false : true;
      
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/base.scss";
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
.isfixed {
  position: fixed;
  top: 0px;
  box-shadow: 0px 5px 10px #cccccc;
}
.product_param_box {
  z-index:10;
  height: 71px;
  border-top: 1px solid #ccc;
  background: #fff;
  // border-bottom: 1px solid #ccc;
  width: 100%;
  .container_box {
    height: 71px;
    @include flex();
    .product_param_box_container_left {
      p {
        font-size: 18px;
        font-weight: bold;
      }
    }
    .product_param_box_container_right {
      a {
        margin-left: 10px;
        color: #747774;
        font-size: 14px;
        &:hover {
          color: $colorA;
        }
        span {
          margin-left:10px;
          color: #747774;
        }
      }
      .product_param_box_container_right_lastdom {
        margin-right: 10px;
      }
    }
  }
}
</style>
