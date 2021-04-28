/* 订单支付（基于order.vue） */
<template>
  <div>
    <nav-order
      title="订单支付"
      titlesub="请您谨慎付款,不要通过第三仿支付"
    ></nav-order>
    <div class="order_pay">
      <div class="container">
        <div class="order_pay_top">
          <div class="order_pay_top_info">
            <img class="order_pay_top_info_img" src="/imgs/svg/ok.svg" alt="" />
            <div class="order_pay_top_address">
              <p class="order_pay_top_address_p1">订单提交成功！去付款咯～</p>
              <p class="order_pay_top_address_p2">
                请在<span>30分</span>内完成支付, 超时后将取消订单
              </p>
              <p class="order_pay_top_address_p3">
                收货信息:
                <span>
                  {{
                    shippingVo.receiverName +
                    " " +
                    shippingVo.receiverMobile +
                    " " +
                    shippingVo.receiverProvince +
                    " " +
                    shippingVo.receiverCity +
                    " " +
                    shippingVo.receiverDistrict +
                    " " +
                    shippingVo.receiverAddress +
                    " "
                  }}
                </span>
              </p>
            </div>
            <div class="order_pay_top_shouldPay">
              <p class="order_pay_top_shouldPay_money">
                应付总额:<span>{{ payment }}</span
                >元
              </p>
              <div class="order_pay_top_shouldPay_icon">
                <p>查看订单详情</p>
                <span
                  @click="isShowDetailInfo = !isShowDetailInfo"
                  :class="{ isRotate: isShowDetailInfo }"
                ></span>
              </div>
            </div>
          </div>
          <div class="order_pay_top_detail_info" v-if="isShowDetailInfo">
            <div class="order_pay_top_detail_info_box">
              <p>订单号:</p>
              <span>{{ orderNo }}</span>
            </div>
            <div class="order_pay_top_detail_info_box">
              <p>收获信息:</p>
              <span>
                {{
                  shippingVo.receiverName +
                  " " +
                  shippingVo.receiverMobile +
                  " " +
                  shippingVo.receiverProvince +
                  " " +
                  shippingVo.receiverCity +
                  " " +
                  shippingVo.receiverDistrict +
                  " " +
                  shippingVo.receiverAddress +
                  " "
                }}</span
              >
            </div>
            <div class="order_pay_top_detail_info_box_products">
              <p>商品名称:</p>
              <ul>
                <li v-for="(item, index) in orderItemVoList" :key="index">
                  <img v-lazy="item.productImage" alt="" />
                  <span>{{ item.productName }}</span>
                </li>
              </ul>
            </div>
            <div class="order_pay_top_detail_info_box">
              <p>发票信息:</p>
              <span>电子发票 个人</span>
            </div>
          </div>
        </div>
        <div class="order_pay_bottom">
          <p class="order_pay_bottom_p1">选择以下支付方式付款</p>
          <div class="order_pay_bottom_content">
            <p class="order_pay_bottom_content_p">支付平台</p>
            <div class="order_pay_bottom_paytype">
              <div @click="goToPay(1)" class="alipay_box"></div>
              <div @click="goToPay(2)" class="wechat_box"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 微信支付模态框 -->
      <we-chat-model
        :showWechatModel="showWechatModel"
        @buttoncancel="weChatColose()"
        :imgUrl="imgUrl"
      ></we-chat-model>
      <!-- 关闭模态框操作 -->
      <model
        title="您有一笔未支付的订单"
        :showModel="theModelDelIsShow"
        btnType="3"
        :sureText="'查看订单'"
        :cancelText="'未支付'"
        @buttonsubmit="goList()"
        @buttoncancel="closeModel()"
      >
        <template slot="body">
          <p>您是否完成了这条支付</p>
        </template>
      </model>
    </div>
  </div>
</template>
<script>
import WeChatModel from "../components/weChatModel.vue";
import Model from "../components/model.vue";
import QRCode from "qrcode";
import NavOrder from "../components/NavOrder.vue";
export default {
  name: "order-pay",
  components: { WeChatModel, Model, NavOrder },
  data() {
    return {
      orderNo: this.$route.query.orderNo,
      orderItemVoList: [], //商品列表
      shippingVo: {}, //订单地址信息
      payment: 0, //支付总金额
      isShowDetailInfo: false,
      showWechatModel: false, //是否显示Model框
      imgUrl: "",
      theModelDelIsShow: false,
      T: "",
    };
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.getOrderDetails();
  },
  methods: {
    // 初始化数据
    getOrderDetails() {
      this.axios.get(`/orders/${this.orderNo}`).then((res) => {
        this.orderItemVoList = res.orderItemVoList;
        this.shippingVo = res.shippingVo;
        this.payment = res.payment;
      });
    },
    //支付接口的实现
    goToPay(flag) {
      // 支付宝
      if (flag == 1) {
        window.open("/order/alipay?orderNo=" + this.orderNo, "_blank");
      } else {
        // 微信
        this.axios
          .post("/pay", {
            orderId: this.orderNo,
            orderName: "小牲口223",
            amount: 0.01,
            payType: 2,
          })
          .then((res) => {
            QRCode.toDataURL(res.content)
              .then((url) => {
                // 模态框微信支付base64二维码生成并打开模态框
                this.imgUrl = url;
                this.showWechatModel = true;
                this.queryTimeGetPay();
              })
              .catch((err) => {
                console.error(err);
              });
          });
      }
    },
    // 二维码模态框的关闭操作
    weChatColose() {
      this.showWechatModel = false;
      this.theModelDelIsShow = true;
      clearInterval(this.T);
    },
    goList() {
      this.$router.push("/order/List");
    },
    closeModel() {
      this.theModelDelIsShow = false;
    },
    // 轮询调联接口判断此订单是否支付成功
    queryTimeGetPay() {
      this.T = setInterval(() => {
        this.axios
          .get(`orders/${this.orderNo}`)
          .then((res) => {
            if (res.status == 20) {
              clearInterval(this.T);
              this.$router.push("/order/List");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }, 1000);
    },
  },
};
</script>
<style lang='scss'>
@import "../assets/scss/base.scss";
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
.order_pay {
  box-sizing: border-box;
  padding-top: 30px;
  padding-bottom: 50px;
  background: #f5f5f5;
}
.container {
  .order_pay_top {
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    padding: 50px;
    .order_pay_top_info {
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .order_pay_top_info_img {
        width: 90px;
        height: 90px;
      }
      .order_pay_top_address {
        margin-left: 30px;
        width: 600px;
        .order_pay_top_address_p1 {
          font-size: 25px;
          color: #000;
          font-weight: bold;
        }
        .order_pay_top_address_p2 {
          margin-top: 20px;
          font-size: 13px;
          span {
            color: $colorA;
          }
        }
        .order_pay_top_address_p3 {
          margin-top: 5px;
          font-size: 13px;
          span {
            color: $colorA;
            font-size: 15px;
          }
        }
      }
      .order_pay_top_shouldPay {
        font-size: 15px;
        .order_pay_top_shouldPay_money {
          span {
            margin-left: 5px;
            font-size: 25px;
            color: $colorA;
          }
        }
        .order_pay_top_shouldPay_icon {
          margin-top: 40px;
          display: flex;
          justify-content: flex-start;
          span {
            cursor: pointer;
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url("/imgs/icon-down.png") no-repeat center;
            background-size: contain;
            margin-left: 20px;
            transform: rotate(-90deg);
            transition: all 0.3s;
            &.isRotate {
              transform: rotate(0deg);
            }
          }
        }
      }
    }
    .order_pay_top_detail_info {
      box-sizing: border-box;
      margin-top: 50px;
      border-top: 1px solid #ccc;
      padding: 40px 100px 0px 100px;
      .order_pay_top_detail_info_box,
      .order_pay_top_detail_info_box_products {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 10px;
        p {
          width: 100px;
          font-size: 15px;
        }
      }
      .order_pay_top_detail_info_box {
        span {
          line-height: 20px;
        }
      }
      .order_pay_top_detail_info_box_products {
        ul {
          li {
            height: 40px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img {
              width: 30px;
              height: 30px;
            }
            span {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
  .order_pay_bottom {
    margin-top: 30px;
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    padding: 20px 50px 50px 50px;
    .order_pay_bottom_p1 {
      font-size: 20px;
      font-weight: 100;
    }
    .order_pay_bottom_content {
      margin-top: 20px;
      border-top: 1px solid #ccc;
      padding-top: 20px;
      .order_pay_bottom_content_p {
        font-size: 20px;
        font-weight: bold;
      }
      .order_pay_bottom_paytype {
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        .alipay_box,
        .wechat_box {
          cursor: pointer;
          width: 196px;
          height: 60px;
          border: 1px solid #ccc;
        }
        .alipay_box {
          background: url("/imgs/pay/icon-ali.png") no-repeat center;
          background-size: 50%;
        }
        .wechat_box {
          margin-left: 20px;
          background: url("/imgs/pay/icon-wechat.png") no-repeat center;
          background-size: 50%;
        }
      }
    }
  }
}
</style>
