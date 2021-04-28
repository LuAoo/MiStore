/* 订单确认（基于order.vue） */
<template>
  <div>
    <nav-order title="订单确认" titlesub="请认真填核对填写您的订单信息"></nav-order>
    <div class="order_confrim">
      <div class="container">
        <p class="container_top_p">收货地址</p>
        <div class="container_address_list">
          <!-- 地址item -->
          <div
            class="container_address_list_item"
            v-for="(item, index) in addressList"
            :key="index"
            :class="{ isChoose: index == isShowCss }"
            @click="isShowCss = index"
          >
            <p class="container_address_list_item_name">
              收件人:{{ item.receiverName }}
            </p>
            <p class="container_address_list_item_num">
              电话:{{ item.receiverMobile }}
            </p>
            <p class="container_address_list_item_address">
              地址:{{
                item.receiverProvince +
                " " +
                item.receiverCity +
                " " +
                item.receiverDistrict
              }}
            </p>
            <p class="container_address_list_item_address_detail">
              具体地址:{{ item.receiverAddress }}
            </p>
            <div class="icon_svg">
              <a class="remove" @click="delAddress(item)"></a>
              <a class="change" @click="changeAddress(item)"></a>
            </div>
          </div>
          <!-- 添加新地址 -->
          <div class="container_address_list_item_add" @click="addAddress()">
            <div class="container_address_list_item_add_icon">
              <p></p>
            </div>
            <p class="container_address_list_item_p">添加新地址</p>
          </div>
        </div>

        <p class="container_product_title">商品</p>
        <div class="container_product_list">
          <div
            class="container_product_list_item"
            v-for="(item, index) in activityProductsList"
            :key="index"
          >
            <div class="container_product_list_item_content">
              <img v-lazy="item.productMainImage" alt="" />
              <p>{{ item.productName + " " + item.productSubtitle }}</p>
            </div>
            <p class="container_product_list_item_content_p1">
              {{ item.productPrice + "元 " }}x{{ " " + item.quantity }}件
            </p>
            <p class="container_product_list_item_content_p2">
              {{ item.productTotalPrice }}元
            </p>
          </div>
        </div>

        <div class="container_byway">
          <p class="container_byway_p1">配送方式</p>
          <p class="container_byway_p2">包邮</p>
        </div>
        <div class="container_byway2">
          <p class="container_byway_p1">发票</p>
          <p class="container_byway_p2">电子发票</p>
          <p class="container_byway_p3">个人</p>
        </div>

        <div class="container_end">
          <div class="wapper">
            <div class="container_end_item">
              <span class="container_end_item_span1">商品件数:</span>
              <span class="container_end_item_span2">{{ productAdd }}件</span>
            </div>
            <div class="container_end_item">
              <span class="container_end_item_span1">优惠活动:</span>
              <span class="container_end_item_span2">0元</span>
            </div>
            <div class="container_end_item">
              <span class="container_end_item_span1">运费:</span>
              <span class="container_end_item_span2">0元</span>
            </div>
            <div class="container_end_item">
              <span class="container_end_item_span1">应付总额:</span>
              <span class="container_end_item_spanaaa"
                >{{ productPriceAdd }}元</span
              >
            </div>
          </div>
        </div>
        <div class="container_end2">
          <a class="btn container_end2but1" @click="backToCart()">返回购物车</a>
          <a class="btn container_end2but2" @click="goToPayPage()">去结算</a>
        </div>
      </div>
    </div>

    <!-- model模态框引入 -->
    <model
      title="确认删除"
      :showModel="theModelDelIsShow"
      btnType="3"
      @buttonsubmit="doTheDelChangeAdd()"
      @buttoncancel="closeModel()"
    >
      <template slot="body">
        <p>您是否删除想这条地址记录</p>
      </template>
    </model>

    <model
      title="添加修改地址"
      :showModel="theModelAddIsShow"
      btnType="3"
      @buttonsubmit="doTheDelChangeAdd()"
      @buttoncancel="closeModel()"
    >
      <template slot="body">
        <input
          class="model_input"
          type="text"
          placeholder="姓名"
          v-model="inputModelData.receiverName"
        />
        <input
          class="model_input model_input2"
          type="text"
          placeholder="手机号"
          v-model="inputModelData.receiverPhone"
        />
        <template>
          <div class="model_select">
            <v-distpicker
              @selected="selected"
              province="省"
              city="市"
              area="区"
            ></v-distpicker>
          </div>
        </template>
        <textarea
          v-model="inputModelData.receiverAddress"
          placeholder="详细地址(准确到街道门牌号)"
          class="model_textarea"
          rows="5"
          cols="50"
        ></textarea>
        <input
          class="model_input model_input3"
          type="text"
          placeholder="邮编"
          v-model="inputModelData.receiverZip"
        />
      </template>
    </model>
  </div>
</template>
<script>
import model from "../components/model.vue";
import VDistpicker from "v-distpicker";
import NavOrder from '../components/NavOrder.vue';
export default {
  components: { model, VDistpicker, NavOrder },
  name: "order-confrim",
  data() {
    return {
      addressList: [], //收货地址列表
      activityProductsList: [], //当前购物车已经选中的商品
      productAdd: 0, //商品的总和
      productPriceAdd: 0, //商品价钱的总和
      SubmitMoney: 0, //应付的金额
      isShowCss: 0, //是否显示css内容的标记
      theModelDelIsShow: false, //控制删除Model的状态
      theModelAddIsShow: false, //控制表单Model的状态
      theModelFlag: "", //操作的状态码
      chooseNowListItem: {}, //删除或者更改时所传入的this对象
      inputModelData: {}, //表单的v-model的数据
    };
  },

  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.getProductInfo();
    this.getAddressInfo();
  },
  methods: {
    // 获select的地址
    selected(data) {
      this.inputModelData.receiverProvince = data.province.value;
      this.inputModelData.receiverCity = data.city.value;
      this.inputModelData.receiverDistrict = data.area.value;
    },
    // 初始化数据(商品列表和用户的地址列表)
    getProductInfo() {
      // 获取当前勾选中的商品
      this.axios.get("/carts").then((res) => {
        this.productPriceAdd = res.cartTotalPrice;
        this.activityProductsList = res.cartProductVoList.filter(
          (item) => item.productSelected == true
        );
        // 求总数量
        this.activityProductsList.map((item) => {
          this.productAdd += item.quantity;
        });
      });
    },
    getAddressInfo() {
      // 请求当前admin的收获地址列表
      this.axios.get("/shippings").then((res) => {
        this.addressList = res.list;
      });
    },

    // Model组件开启的入口
    // 删除操作
    delAddress(item) {
      this.theModelDelIsShow = true;
      this.theModelFlag = 0;
      this.chooseNowListItem = item;
    },
    // 增加操作
    addAddress() {
      this.theModelAddIsShow = true;
      this.theModelFlag = 1;
    },
    // 修改操作
    changeAddress(item) {
      this.theModelAddIsShow = true;
      this.theModelFlag = 2;
      this.chooseNowListItem = item;
      this.inputModelData = item;
    },

    //所有操作的入口
    doTheDelChangeAdd() {
      let { inputModelData, theModelFlag, chooseNowListItem } = this;
      let url, way;
      let params = {};
      let {
        receiverName,
        receiverPhone,
        receiverMobile,
        receiverProvince,
        receiverCity,
        receiverDistrict,
        receiverAddress,
        receiverZip,
      } = inputModelData;
      if (theModelFlag == 0) {
        url = `/shippings/${chooseNowListItem.id}`;
        way = "delete";
      } else if (theModelFlag == 1) {
        url = `/shippings`;
        way = "post";
      } else if (theModelFlag == 2) {
        url = `/shippings/${chooseNowListItem.id}`;
        way = "put";
      }
      // 更改和添加的共同操作（参数设置）
      if (theModelFlag == 1 || theModelFlag == 2) {
        var msg = "";
        if (!receiverName) {
          msg = "请输入姓名";
        } else if (!receiverPhone || !/\d{11}/.test(receiverPhone)) {
          msg = "您没有输入电话或者电话格式有误";
        } else if (!receiverProvince || !receiverCity || !receiverDistrict) {
          msg = "请选择您的地址";
        } else if (!receiverZip || !/\d{6}/.test(receiverZip)) {
          msg = "您没有输入邮政编码或者邮政编码格式有误";
        } else if (!receiverAddress) {
          msg = "请输入您的详细地址";
        }
        if (msg) {
          this.$message.error(msg);
          return;
        }
        params = {
          receiverName,
          receiverPhone,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip,
        };
      }
      this.axios[way](url, params).then((res) => {
        console.log(res);
        this.getAddressInfo();
        this.$message.success("操作成功");
        this.closeModel();
      });
    },
    // 关闭model的通过操作（清空）
    closeModel() {
      this.theModelDelIsShow = false;
      this.theModelAddIsShow = false;
      this.theModelFlag = "";
      this.chooseNowListItem = {};
      this.inputModelData = {};
    },

    // 结算

    // 返回到购物车
    backToCart() {
      this.$router.push("/cart");
    },
    goToPayPage() {
      let isCreate = this.addressList[this.isShowCss];
      console.log(isCreate);
      if (!isCreate) {
        this.$message.error("请选择收货地址");
        return;
      }
      this.axios
        .post("/orders", {
          shippingId: isCreate.id,
        })
        .then((res) => {
          console.log(res.orderNo);
          // 跳转并且传入参数
          this.$router.push({
            path: "/order/Pay",
            query: {
              orderNo: res.orderNo,
            },
          });
        });
    },
  },
};
</script>
<style lang='scss'>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.model_input3 {
  margin-top: 20px;
}
.model_textarea {
  padding-top: 10px;
  box-sizing: border-box;
  padding-left: 10px;
  margin: 20px 0px 0px;
  width: 367px;
  height: 83px;
  border: 1px solid #ccc;
}
.model_select {
  margin-top: 20px;
}
.model_input {
  box-sizing: border-box;
  padding-left: 10px;
  width: 270px;
  height: 40px;
  border: 1px solid #ccc;
}
.model_input2 {
  margin-left: 20px;
}
.order_confrim {
  background: #f5f5f5;
  padding-top: 30px;
  padding-bottom: 80px;
  .container {
    box-sizing: border-box;
    background: #fff;
    padding: 40px;
    .container_top_p {
      font-size: 20px;
      color: #000;
      font-weight: 100;
    }
    // 地址框样式
    .container_address_list {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .container_address_list_item {
        position: relative;
        cursor: pointer;
        margin-right: 15px;
        margin-top: 20px;
        width: 271px;
        height: 180px;
        border: 1px solid #ccc;
        padding: 20px;
        box-sizing: border-box;
        .container_address_list_item_name {
          font-size: 20px;
          color: #000;
        }
        .container_address_list_item_num {
          font-size: 15px;
          color: #757575;
          margin-top: 10px;
        }
        .container_address_list_item_address {
          margin-top: 5px;
          font-size: 15px;
          color: #757575;
        }
        .container_address_list_item_address_detail {
          font-size: 13px;
          margin-top: 5px;
          color: #757575;
        }

        .icon_svg {
          bottom: 5px;
          a {
            cursor: pointer;
            width: 25px;
            height: 25px;
            position: absolute;
            bottom: 10px;
          }
          .remove {
            left: 20px;
            background: url("/imgs/svg/one.png") no-repeat center;
            background-size: contain;
            &:hover {
              background: url("/imgs/svg/one_active.png") no-repeat center;
              background-size: contain;
            }
          }
          .change {
            right: 20px;
            background: url("/imgs/svg/two.png") no-repeat center;
            background-size: contain;
            &:hover {
              background: url("/imgs/svg/two_active.png") no-repeat center;
              background-size: contain;
            }
          }
        }
      }
      .container_address_list_item_add {
        cursor: pointer;
        margin-top: 20px;
        box-sizing: border-box;
        width: 271px;
        height: 180px;
        border: 1px solid #ccc;
        text-align: center;
        .container_address_list_item_add_icon {
          margin-top: 55px;
          display: inline-block;
          width: 30px;
          height: 30px;
          background: #e0e0e0;
          border-radius: 50px;
          text-align: center;
          p {
            margin-top: 6px;
            display: inline-block;
            width: 15px;
            height: 15px;
            background: url("/imgs/icon-add.png") no-repeat center;
            background-size: contain;
          }
        }
        .container_address_list_item_p {
          margin-top: 5px;
          font-size: 14px;
          color: #ccc;
        }
      }
      .isChoose {
        border: 1px solid $colorA;
      }
    }

    //  商品列表样式
    .container_product_title {
      font-size: 20px;
      color: #000;
      margin-top: 30px;
    }
    .container_product_list {
      margin-top: 5px;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding-top: 10px;
      padding-bottom: 10px;
      .container_product_list_item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        .container_product_list_item_content_p1 {
          font-size: 15px;
          color: #000;
        }
        .container_product_list_item_content_p2 {
          font-size: 15px;
          color: $colorA;
          margin-right: 10px;
        }
        .container_product_list_item_content {
          width: 600px;
          height: 30px;
          display: flex;
          align-items: center;
          img {
            display: inline-block;
            width: 40px;
            height: 40px;
          }
          p {
            font-size: 15px;
            color: #000;
            margin-left: 20px;
          }
        }
      }
    }

    //  底部样式：
    .container_byway {
      display: flex;
      margin-top: 30px;
      align-items: flex-end;
      .container_byway_p1 {
        font-size: 20px;
        width: 100px;
        color: #000;
      }
      .container_byway_p2 {
        color: $colorA;
        font-size: 15px;
        margin-left: 50px;
      }
    }
    .container_byway2 {
      display: flex;
      margin-top: 20px;
      align-items: flex-end;
      .container_byway_p1 {
        font-size: 20px;
        color: #000;
        width: 100px;
      }
      .container_byway_p2 {
        color: $colorA;
        font-size: 15px;
        margin-left: 50px;
      }
      .container_byway_p3 {
        color: $colorA;
        font-size: 15px;
        margin-left: 25px;
      }
    }

    .container_end {
      margin-top: 30px;
      width: 100%;
      overflow: hidden;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      padding-bottom: 30px;
      .wapper {
        float: right;
        .container_end_item {
          margin-top: 10px;
          span {
            display: inline-block;
          }
          .container_end_item_span1 {
            width: 100px;
            font-size: 15px;
          }
          .container_end_item_span2 {
            width: 100px;
            font-size: 15px;
            color: $colorA;
            text-align: right;
          }
          .container_end_item_spanaaa {
            font-size: 30px;
            color: $colorA;
          }
        }
      }
    }

    .container_end2 {
      display: flex;
      justify-content: flex-end;
      padding-top: 30px;
      .container_end2but1,
      .container_end2but2 {
        width: 202px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 15px;
      }
      .container_end2but1 {
        background: #b0b0b0b3;

        margin-right: 20px;
        &:hover {
          background: #b0b0b0;
        }
      }
      .container_end2but2 {
      }
    }
  }
}
</style>
