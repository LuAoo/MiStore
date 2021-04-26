/* 购物车（基于order.vue） */
<template>
  <div>
    <nav-order
      title="我的购物车"
      titlesub="温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算"
    ></nav-order>
    <div class="cart_content">
      <div class="container">
        <div class="cart_content_top">
          <div class="cart_content_top_first">
            <a
              class="checkbox"
              @click="selectAll()"
              :class="{ ischecked: selectedAll }"
            ></a>
            <span>全选</span>
          </div>
          <p class="cart_content_top_2">商品名称</p>
          <p class="cart_content_top_3">单价</p>
          <p class="cart_content_top_4">数量</p>
          <p class="cart_content_top_5">小计</p>
          <p class="cart_content_top_6">操作</p>
        </div>
        <!-- 购物车单个列表 -->
        <div
          class="cart_content_list"
          v-for="(item, index) in cartProductVoList"
          :key="index"
        >
          <div class="cart_content_list_checkbox">
            <a
              class="checkbox"
              @click="updataCarts(item)"
              :class="{ ischecked: item.productSelected }"
            ></a>
          </div>
          <div class="cart_content_list_name">
            <img v-lazy="item.productMainImage" alt="" />
            <p>{{ item.productName }},{{ item.productSubtitle }}</p>
          </div>
          <p class="cart_content_list_price">{{ item.productPrice }}</p>
          <div class="cart_content_list_updata">
            <a
              @click="updataCarts(item, '-')"
              class="cart_content_list_updata_decre"
              >-</a
            >
            <p>{{ item.quantity }}</p>
            <a
              @click="updataCarts(item, '+')"
              class="cart_content_list_updata_add"
              >+</a
            >
          </div>
          <p class="cart_content_list_dingleadd">
            {{ item.productTotalPrice }}
          </p>
          <a
            @click="removeTheProduct(item)"
            class="cart_content_list_delete"
          ></a>
        </div>

        <!-- 购物车底部 -->
        <div class="cart_content_bottom">
          <div class="cart_content_bottom_left">
            <a @click="$router.push('/index')">继续购物</a>
            <p>
              共
              <span>{{ this.cartProductVoList.length }}</span>
              件商品，已选择<span>{{ chooseNum }}</span
              >件
            </p>
          </div>
          <div class="cart_content_bottom_right">
            <p>
              合计：<span>{{ this.cartTotalPrice }}</span
              >元
            </p>
            <a class="btn" @click="goToPay()">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavFooter from "../components/NavFooter.vue";
import NavOrder from "../components/NavOrder.vue";
import ServiceBar from "../components/ServiceBar.vue";
export default {
  components: { NavFooter, ServiceBar, NavOrder },
  name: "cart",
  data() {
    return {
      cartProductVoList: [],
      selectedAll: false,
      cartTotalPrice: 0,
    };
  },
  computed: {
    //   过滤list，找到选中的商品
    chooseNum() {
      return this.cartProductVoList.filter(
        (item) => item.productSelected == true
      ).length;
    },
  },
  mounted() {
    this.getCartData();
  },
  methods: {
    //设置基础数据
    setBaseData(res) {
      this.cartProductVoList = res.cartProductVoList;
      this.cartTotalPrice = res.cartTotalPrice;
      this.selectedAll = res.selectedAll;
    },
    //获取初始化数据
    getCartData() {
      this.axios.get("/carts").then((res) => {
        this.setBaseData(res);
      });
    },
    //  设置是否全选
    selectAll() {
      let url = this.selectedAll ? "/carts/unSelectAll" : "/carts/selectAll";
      this.axios.put(url).then((res) => {
        this.setBaseData(res);
      });
    },
    //  操作单个数据的改变
    updataCarts(item, back) {
      let quantity = item.quantity,
        selected = item.productSelected;

      if (back == "-") {
        if (quantity <= 1) {
          this.$message.warning("商品数量最少为1件哦");
          return;
        }
        quantity -= 1;
      } else if (back == "+") {
        if (quantity >= item.productStock) {
          this.$message.warning("没货啦！");
          return;
        }
        quantity += 1;
      } else {
        selected = !item.productSelected;
      }
      this.axios
        .put(`/carts/${item.productId}`, {
          quantity,
          selected,
        })
        .then((res) => {
          this.setBaseData(res);
        });
    },
    //  移除商品
    removeTheProduct(item) {
      this.axios.delete(`/carts/${item.productId}`).then((res) => {
        this.setBaseData(res);
        this.$message.success("移除成功");
      });
    },
    // 去结算
    goToPay() {
      if (this.cartTotalPrice == 0) {
        this.$message.warning("你还没有选择商品哦");
        return;
      }
      this.$router.push("/order/Confrim");
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/config.scss";
.checkbox {
  cursor: pointer;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #9ca19f;
}
.ischecked {
  background: url("/imgs/icon-gou.png") no-repeat center;
  background-size: contain;
  background-color: $colorA;
  border: 1px solid $colorA;
}
.cart_content {
  background: #f5f5f5;
  padding-top: 30px;
  padding-bottom: 100px;
  .container {
    .cart_content_top {
      background: #fff;
      height: 79px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      p {
        font-size: 15px;
        color: #9ca19f;
      }
      .cart_content_top_first {
        display: flex;
        flex: 1;
        justify-content: center;
        justify-items: center;
        .checkbox {
          margin-right: 10px;
        }
        span {
          display: inline-block;
          font-size: 15px;
          color: #9ca19f;
        }
      }
      .cart_content_top_2 {
        flex: 3;
        text-align: center;
      }
      .cart_content_top_4 {
        text-align: center;
        flex: 2;
      }
      .cart_content_top_3,
      .cart_content_top_5,
      .cart_content_top_6 {
        text-align: center;
        flex: 1;
      }
    }
    .cart_content_list {
      height: 126px;
      width: 100%;
      border-top: 1px solid #f5f5f5;
      background: #fff;
      display: flex;
      justify-content: space-around;
      text-align: center;
      // line-height: 126px;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
        margin-right: 5px;
      }
      // 设置felx
      .cart_content_list_checkbox,
      .cart_content_list_price,
      .cart_content_list_dingleadd,
      .cart_content_list_delete {
        flex: 1;
      }
      .cart_content_list_name {
        flex: 3;
      }
      .cart_content_list_updata {
        flex: 2;
      }

      .cart_content_list_name {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          flex: 1;
        }
        p {
          flex: 4;
          font-size: 16px;
        }
      }
      .cart_content_list_price {
        font-size: 16px;
      }
      .cart_content_list_updata {
        a,
        p {
          display: inline-block;
          width: 50px;
          height: 40px;
          font-size: 15px;
          line-height: 40px;
          border-top: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
        }
        .cart_content_list_updata_decre {
          border-left: 1px solid #e5e5e5;
          cursor: pointer;
        }
        .cart_content_list_updata_add {
          border-right: 1px solid #e5e5e5;
          cursor: pointer;
        }
      }
      .cart_content_list_dingleadd {
        font-size: 16px;
        color: $colorA;
      }
      .cart_content_list_delete {
        cursor: pointer;
        background: url("/imgs/icon-close.png") no-repeat center;
        background-size: contain;
        width: 15px;
        height: 15px;
      }
    }
    .cart_content_bottom {
      margin-top: 30px;
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      .cart_content_bottom_left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        a {
          font-size: 14px;
          color: #666666;
          margin-left: 30px;
          cursor: pointer;
          &:hover {
            color: $colorA;
          }
        }
        p {
          font-size: 14px;
          color: #666666;
          margin-left: 40px;
          span {
            color: $colorA;
            font-size: 13px;
            margin-left: 3px;
            margin-right: 3px;
          }
        }
      }
      .cart_content_bottom_right {
        overflow: hidden;
        p {
          float: left;
          line-height: 50px;
          margin-right: 30px;
          color: $colorA;
          font-size: 15px;
          span {
            font-size: 23px;
          }
        }
        a {
          float: right;
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
