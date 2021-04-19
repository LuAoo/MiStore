/* 一级顶部（产品详情、大图展示、首页会用到）组件*/
<template>
  <div class="header">
    <div class="nav-topnar">
      <div class="container">
        <div class="tab-menu">
          <a href="javascript:;">小奥科技</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="tab-user">
          <a @click="gotologin" v-if="!name">登录</a>
          <a href="javascript:;" v-if="name">{{ name | students }}</a>
          <a href="javascript:;" v-if="!name">注册</a>
          <a href="javascript:;" v-if="name">订单信息</a>
          <a class="tab-user-cart" href="javascript:;" @click="gotocart"
            ><span></span> 购物车(0)</a
          >
        </div>
      </div>
    </div>
    <!-- 顶部nav使用vue动态渲染数据 -->
    <div class="nav-header">
      <div class="container">
        <div class="nav-header-logo">
          <a href="/index"></a>
        </div>
        <div
          class="nav-header-list"
          v-for="(item, index) in tabheaderdata"
          :key="index"
        >
          <div class="list-item" @mouseenter="getdata(item.id)">
            <span>{{ item.name }}</span>
            <div class="children">
              <ul>
                <li v-for="(item, index) in temarr" :key="index">
                  <a :href="'/product/' + item.id" target="_blank">
                    <div class="children_img">
                      <img :src="item.mainImage" alt="" />
                    </div>
                    <div class="children_name">
                      <p>{{ item.name }}</p>
                    </div>
                    <div class="children_price">
                      <p>{{ item.price | currency }}</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="nav-header-search">
          <div class="wapper">
            <input placeholder="小米11" id="search_input" type="text" />
            <div class="search_ok">
              <a href="javascript:;"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-header",
  data() {
    return {
      name: "奥奥",
      tabheaderdata: [
        { name: "小米手机", id: 30 },
        { name: "RedMI手机", id: 36 },
        { name: "电视", id: 43 },
        { name: "笔记本", id: 36 },
        { name: "家电", id: 30 },
        { name: "路由器", id: 36 },
        { name: "智能硬件", id: 30 },
        { name: "服务", id: 35 },
        { name: "社区", id: 43 },
      ],
      product: [],
      temarr: [],
    };
  },
  filters: {
    currency(val) {
      if (!val) {
        return "￥0.00";
      }
      return "￥" + val.toFixed(2) + "元";
    },
    students(val) {
      return val + "同学";
    },
  },
  methods: {
    // itemlist的id触碰事件
    getdata(id) {
      this.temarr.splice(0, this.temarr.length);
      for (let index = 0; index < this.product.length; index++) {
        if (this.product[index].id == id) {
          for (let index2 = index; index2 <= index + 5; index2++) {
            this.temarr.push(this.product[index2]);
          }
          break;
        }
      }
    },
    gotocart() {
      this.$router.push("/cart");
    },
    gotologin() {
      this.$router.push("/login");
    },
  },
  mounted() {
    this.axios
      .get("/products", {
        params: {
          categoryId: 100012,
          pageSize: 50,
        },
      })
      .then((res) => {
        for (let index = 0; index < res.list.length; index++) {
          this.product.push(res.list[index]);
        }
      });
  },
};
</script>
<style lang="scss">
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.header {
  // 头部最上层样式
  .nav-topnar {
    height: 39px;
    line-height: 39px;
    background: #333333;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
      }
      .tab-menu {
        a {
          margin-right: 17px;
        }
      }
      .tab-user {
        a {
          margin-left: 17px;
        }
      }
      .tab-user-cart {
        text-align: center;
        @include setsize(110px, 39px);
        background-color: #ff6600;
        color: #fff;
        span {
          @include setimg("/imgs/icon-cart-checked.png");
          display: inline-block;
          @include setsize(16px, 12px);
          margin-right: 4px;
        }
      }
    }
  }
  // 头部下面样式
  .nav-header {
    .container {
      position: relative;
      height: 112px;
      @include flex();
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
      .nav-header-list {
        display: inline-block;
        .list-item {
          display: inline-block;
          font-size: 15px;
          span {
            color: #000;
            font-weight: bold;
            cursor: pointer;
            height: 112px;
            display: inline-block;
            line-height: 112px;
            &:hover {
              color: $colorA;
            }
          }
          &:hover {
            .children {
              transition: all 0.3s;
              height: 200px;
              opacity: 1;
              border: 1px solid #e5e5e5;
            }
          }
          .children {
            z-index: 10;
            background: #fff;
            transition: all 0.3s;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            border: 1px solid $colorF;
            top: 112px;
            left: 0px;
            position: absolute;
            width: $min-width2;
            height: 0px;
            opacity: 0;
            overflow: hidden;
            ul {
              @include flex();
              li {
                position: relative;
                width: 16.6%;
                text-align: center;
                .children_img {
                  margin-top: 25px;
                  img {
                    height: 100px;
                  }
                }
                .children_name {
                  margin-top: 5px;
                  font-size: 14px;
                  font-weight: bold;
                  color: #000;
                }
                .children_price {
                  margin-top: 5px;
                  font-size: 14px;
                  font-weight: bold;
                  color: #ff6600;
                  margin-bottom: 20px;
                }
                &::before {
                  content: " ";
                  position: absolute;
                  right: 0px;
                  width: 1px;
                  height: 110px;
                  top: 30px;
                  border-right: 1px solid #e5e5e5;
                }
                &:last-child::before {
                  display: none;
                }
              }
            }
          }
        }
      }
      .nav-header-search {
        .wapper {
          @include setsize(319px, 52px);
          @include flex();
          border: 1px solid #e0e0e0;
          input {
            color: #b0b0b0;
            font-size: 15px;
            border: none;
            border-right: 1px solid #e0e0e0;
            @include setsize(264px, 100%);
            padding-left: 10px;
          }
          .search_ok {
            width: 55px;
            text-align: center;
            a {
              @include setsize(18px, 18px);
              display: inline-block;
              @include setimg("/imgs/icon-search.png");
            }
          }
          &:hover #search_input,
          &:hover {
            border: 1px #ff6600 solid;
          }
        }
      }
    }
  }
}
</style>
