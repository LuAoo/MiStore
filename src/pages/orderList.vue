/* 订单列表（基于order.vue） */
<template>
  <div>
    <nav-order title="订单列表" titlesub="您所有的订单记录都在这里"></nav-order>
    <div class="order_list">
      <div class="container">
        <loading v-if="isShowLoading"></loading>
        <ul class="order_list_list">
          <img
            class="order_list_list_loading"
            v-if="isShowPageLoading"
            src="/imgs/loading-svg/loading-bubbles.svg"
            alt=""
          />
          <li
            class="order_list_list_item"
            v-for="(item, index) in ProductLise"
            :key="index"
          >
            <div class="order_list_list_item_top">
              <p class="order_list_list_item_top_infodata">
                {{ item.createTime }} <span>|</span>{{ item.receiverName }}
                <span>|</span>订单号：{{ item.orderNo }}<span>|</span>
                {{ item.paymentTypeDesc }}
              </p>
              <p class="order_list_list_item_top_payprice">
                应付金额:<span>{{ item.payment }}</span
                >元
              </p>
            </div>
            <div class="order_list_list_item_bottom">
              <div class="order_list_list_item_bottom_left">
                <div
                  class="order_list_list_item_bottom_left_item"
                  v-for="(i, index) in item.orderItemVoList"
                  :key="index"
                >
                  <img v-lazy="i.productImage" alt="" />
                  <div class="order_list_list_item_bottom_left_intro">
                    <p class="order_list_list_item_bottom_left_intro_name">
                      {{ i.productName }}
                    </p>
                    <p class="order_list_list_item_bottom_left_intro_info">
                      {{ i.currentUnitPrice }} X {{ i.quantity }}件
                    </p>
                  </div>
                </div>
              </div>
              <p
                @click="goPay(item)"
                :class="{ done: item.status == 20 }"
                class="order_list_list_item_bottom_right"
              >
                {{ item.statusDesc }}
              </p>
            </div>
          </li>
        </ul>
        <el-pagination
          v-show="!isShowLoading"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pagesize"
          @current-change="changePagination"
        >
        </el-pagination>
      </div>
      <no-data
        v-if="isShowLoading == false && ProductLise.length == 0"
      ></no-data>
    </div>
  </div>
</template>
<script>
import Loading from "../components/loading.vue";
import NavOrder from "../components/NavOrder.vue";
import NoData from "../components/noData";
import { Pagination } from "element-ui";
export default {
  components: { NavOrder, Loading, NoData, [Pagination.name]: Pagination },
  name: "order-list",
  data() {
    return {
      ProductLise: [],
      isShowLoading: true,
      isShowPageLoading: false,
      total: 0,
      pagesize: 10,
      currentNum: 1,
    };
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.setBasedata();
  },
  methods: {
    // 设置初始值
    setBasedata() {
      return this.axios
        .get("/orders", {
          params: {
            pageNum: this.currentNum,
          },
        })
        .then((res) => {
          console.log(res);
          this.isShowLoading = false;
          this.ProductLise = res.list;
          this.total = res.total;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //去付款
    goPay(item) {
      console.log("执行");
      if (item.status == 20) {
        this.$message.warning("已付款,请耐心等待发货");
        return;
      }
      this.$router.push({
        path: "/order/Pay",
        query: {
          orderNo: item.orderNo,
        },
      });
    },
    changePagination(currentNum) {
      this.isShowPageLoading = true;
      this.currentNum = currentNum;
      this.setBasedata().then(() => {
        this.isShowPageLoading = false;
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/base.scss";
@import "../assets/scss/config.scss";
.el-pagination,
.is-background {
  text-align: right;
}
/*全局分页器样式修改*/
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #fc6602;
  color: #fff;
}
.el-pagination.is-background .el-pager li.active {
  color: #fff;
  cursor: default;
}
.el-pagination.is-background .el-pager li:hover {
  color: #fc6602;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #fc6602;
}
.el-pagination.is-background .el-pager li:not(.disabled).active:hover {
  background-color: #fc6602;
  color: #fff;
}
.el-select-dropdown__item.selected {
  color: #fc6602 !important;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #fc6602 !important;
}
.el-pagination .el-select .el-input .el-input__inner:hover {
  border-color: #fc6602 !important;
}
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #fc6602 !important;
}
.order_list {
  padding-bottom: 80px;
  background: #f5f5f5;
  padding-top: 30px;
  .container {
    .order_list_list {
      text-align: center;
    }
    .order_list_list_item {
      background: #fff;
      margin-bottom: 30px;
      .order_list_list_loading {
        width: 100px;
        height: 100px;
      }
      .order_list_list_item_top {
        width: 100%;
        height: 73px;
        background: #fffaf7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 30px;
        padding-right: 30px;
        box-sizing: border-box;
        .order_list_list_item_top_infodata {
          font-size: 15px;
          span {
            margin-right: 8px;
            margin-left: 8px;
          }
        }
        .order_list_list_item_top_payprice {
          font-size: 15px;
          span {
            color: $colorA;
            font-size: 28px;
            margin-right: 8px;
            margin-left: 8px;
            font-weight: bold;
          }
        }
      }
      .order_list_list_item_bottom {
        padding-left: 30px;
        padding-right: 30px;
        overflow: hidden;
        .order_list_list_item_bottom_left {
          float: left;
          .order_list_list_item_bottom_left_item {
            height: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          img {
            width: 80px;
            height: 80px;
          }
          .order_list_list_item_bottom_left_intro {
            display: flex;
            justify-content: space-between;
            margin-left: 30px;
            align-items: center;
            width: 400px;
            .order_list_list_item_bottom_left_intro_name {
              font-size: 18px;
              color: $colorA;
            }
            .order_list_list_item_bottom_left_intro_info {
              font-size: 14px;
              margin-left: 30px;
            }
          }
        }
        .order_list_list_item_bottom_right {
          cursor: pointer;
          float: right;
          margin-top: 30px;
          font-size: 15px;
          color: red;
          &.done {
            color: green;
          }
        }
      }
    }
  }
}
</style>
