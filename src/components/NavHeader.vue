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
          <a v-if="!username" @click="isShowLogin()">登录</a>
          <a v-if="!username" @click="isShowRegister()">注册</a>
          <a href="javascript:;" v-if="username" @click="loginout()">退出</a>
          <a href="javascript:;" v-if="username">{{ username | students }}</a>
          <a @click="$router.push('/order/List')" v-if="username">订单信息</a>
          <a class="tab-user-cart" href="javascript:;" @click="gotocart"
            ><span></span> 购物车({{ cartcount }})</a
          >
        </div>
      </div>
    </div>
    <!-- 顶部nav使用vue动态渲染数据 -->
    <div class="nav-header">
      <div class="container">
        <div class="nav-header-logo">
          <a @click="$router.push('/index')"></a>
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
                  <a
                     @click="addcart(item.id)"
                  >
                    <div class="children_img">
                      <img v-lazy="item.mainImage" alt="" />
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
        <model
      title="提示："
      sureText="查看购物车"
      btnType="3"
      modelType="middle"
      @buttonsubmit="buttonsubmit()"
      @buttoncancel="isopenthemodel = false"
      :showModel="isopenthemodel"
    >
      <!-- 组件中的body插槽 -->
      <template v-slot:body>
        <p>商品添加成功</p>
      </template>
    </model>
  </div>
</template>
<script>
import Model from './model.vue';
export default {
  name: "nav-header",
  components:{Model},
  data() {
    return {
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
      isopenthemodel: false,
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
     // 点击加入购物车并且弹出model操作(修改自index)
    addcart(id) {
      // 加入购物车功能等登录功能做完以后再做
      this.axios
        .post("/carts", {
          productId: id,
          selected: true,
        })
        .then((res) => {
          this.isopenthemodel = true;
          this.$store.dispatch("setCartnum", res.cartTotalQuantity);
        })
        .catch(() => {
          // Message.warning("请先登录哦" + res)
          this.$message.warning("请先登录哦");
        });
    },
    // model的自定义点击事件
    buttonsubmit() {
      this.$router.push("/cart");
    },
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
    // 顶部导航的一些跳转操作
    gotocart() {
      this.$router.push("/cart");
    },
    gotologin() {
      this.$router.push("/login");
    },
    loginout() {
      this.axios
        .post("/user/logout", {})
        .then(() => {
          this.$cookie.set("useId", "", { expires: "-1" });
          location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    isShowLogin() {
      this.$router.push("/login");
      this.$store.commit("setIsShow", 1);
    },
    isShowRegister() {
      this.$router.push("/login");
      this.$store.commit("setIsShow", 2);
    },
  },
  mounted() {
    // 利用NavHeader的声明周期函数每次进入时拉去购物车数量（防止没有数据而造成混乱）
    if (this.$cookie.get("useId")) {
      this.$store.dispatch("frashIndexUpdataUsername");
      this.$store.dispatch("frashIndexUpdataUpdata");
    }
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
  computed: {
    // 这里防止在拉去数据后使用计算属性的方式来解决无数据状况
    username() {
      return this.$store.state.username;
    },
    cartcount() {
      return this.$store.state.cartnum;
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
@import "../assets/scss/navheader.scss";
</style>
