/* 一级顶部（order）组件*/
<template>
  <div class="nav_order">
    <div class="container">
      <div class="nav_order_box">
        <div class="nav-header-logo">
          <a @click="$router.push('/index')"></a>
        </div>
        <div class="nav_order_box_contnt">
          <h2>
            {{this.title}}
            <span
              >{{this.titlesub}}</span
            >
          </h2>
          <slot slot="nav_order_box_contnt_disc"></slot>
        </div>
        <div class="nav_order_box_username"><p>{{username}}用户</p></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-order",
  data() {
    return {};
  },
  props: {
    title: String,
    titlesub: String,
  },
  computed: {
    // 拉取姓名
    username() {
      return this.$store.state.username;
    },
  },
};
</script>
<style lang='scss'>
@import "../assets/scss/base.scss";
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
.nav_order {
  border-bottom: 2px solid $colorA;
}
.nav_order_box {
  width: 100%;
  height: 117px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .nav-header-logo {
    @include setsize(55px, 55px);
    display: inline-block;
    background: #ff6600;
    border-radius: 22px;
    a {
      display: inline-block;
      @include setsize(110px, 55px);
      &::before {
        content: " ";
        display: inline-block;
        @include setimg("/imgs/mi-logo.png");
        @include setsize(55px, 55px);
        transition: all 0.3s;
      }
      &::after {
        content: " ";
        display: inline-block;
        @include setimg("/imgs/mi-home.png");
        @include setsize(55px, 55px);
      }
      &:hover:before {
        margin-left: -55px;
        transition: all 0.3s;
      }
    }
  }

  .nav_order_box_contnt {
    flex-grow: 0.7;
    h2 {
      margin-left: 30px;
      font-size: 30px;
      span {
        margin-left: 20px;
        font-size: 14px;
        color: #9ca19f;
        font-weight: normal;
      }
    }
  }
  .nav_order_box_username {
    flex-grow: 0.2;
    p {
      text-align: right;
      font-size: 18px;
    }
  }
}
</style>
