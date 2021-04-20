/*首页（基于home.vue）*/
<template>
  <div class="index">
    <div class="container">
      <!-- 轮播图菜单布局 -->
      <div class="swiper_box">
        <div class="banner_menu">
          <ul class="nav_wrap">
            <li
              class="nav_list"
              v-for="(item, index) in categorylist"
              :key="index"
            >
              <a href="javascript:;">{{ item }}</a>
              <div class="children">
                <ul v-for="(item, i) in menulist" :key="i">
                  <li v-for="(sub, j) in item" :key="j">
                    <a :href="sub ? '/product/' + sub.id : ''">
                      <img
                        v-lazy="sub ? sub.img : '/imgs/item-box-2.png'"
                        alt=""
                      />
                      {{ sub ? sub.name : "小米9" }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <!-- banner -->
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="(item, index) in slideList" :key="index"
            ><a :href="'/product/' + item.id"><img v-lazy="item.img" alt="" /></a
          ></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- 广告位（坑） -->
      <div class="adv_b">
        <a :href="item.id" v-for="(item, index) in advlist" :key="index">
          <img v-lazy="item.img" alt="" />
        </a>
      </div>
    </div>
    <!-- 首页商品列表 -->
    <div class="product_box">
      <div class="box_container">
        <div class="products_list">
          <div
            class="products_item"
            v-for="(item, index) in indexproductsinfo"
            :key="index"
          >
            <img class="products_item_bannerimg" v-lazy="item.banner" alt="" />
            <p class="products_item_title">{{ item.title }}</p>
            <div class="products_content">
              <div class="products_content_left">
                <img v-lazy="item.advbanner" alt="" />
              </div>
              <div class="products_content_right">
                <div
                  class="products_content_right_item"
                  v-for="(item, index1) in item.data"
                  :key="index1"
                >
                  <span
                    class="products_content_right_item_span_base"
                    :class="{
                      products_content_right_item_span: setnewproduct(index1),
                    }"
                    >新品</span
                  >
                  <img
                    class="products_content_right_item_img"
                  v-lazy="item.mainImage"
                    alt=""
                  />
                  <p class="products_content_right_item_name">
                    {{ item.name }}
                  </p>
                  <p class="products_content_right_item_introduce">
                    {{ item.subtitle }}
                  </p>
                  <div class="products_content_right_item_price">
                    <a href="javascript:;">￥{{ item.price }}起</a>
                    <div
                      class="products_content_right_item_price_img"
                      @click="addcart()"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <model
      title="提示："
      sureText="查看购物车"
      btnType="3"
      modelType="middle"
      @buttonsubmit='buttonsubmit()'
      @buttoncancel='isopenthemodel=false'
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
import ServiceBar from "../components/ServiceBar.vue";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import Model from "../components/model.vue";
export default {
  components: { ServiceBar, Swiper, SwiperSlide, Model },
  name: "index",
  data() {
    return {
      swiperOptions: {
        autoplay: {
          delay: 3000, //1秒切换一次
          disableOnInteraction: true,
        },
        loop: true, // 循环模式选项
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
        },
        effect: "cube",
      },
      abvdatalist: [
        { id: 33, img: "/imgs/ads/ads-1.png" },
        { id: 48, img: "/imgs/ads/ads-2.jpg" },
        { id: 45, img: "/imgs/ads/ads-3.png" },
        { id: 47, img: "/imgs/ads/ads-4.jpg" },
      ],
      // 轮播数据
      slideList: [
        { id: "42", img: "/imgs/slider/slide-1.jpg" },
        { id: "45", img: "/imgs/slider/slide-2.jpg" },
        { id: "46", img: "/imgs/slider/slide-3.jpg" },
        { id: "", img: "/imgs/slider/slide-4.jpg" },
        { id: "", img: "/imgs/slider/slide-5.jpg" },
      ],
      // categorylist
      categorylist: [
        "手机 电话卡",
        "电话 盒子",
        "笔记本 平板",
        "家电 插线板",
        "出行 穿戴",
        "智能 路由器",
        "电源 配件",
        "健康 儿童",
        "耳机 音箱",
        "生活 箱包",
      ],
      // 轮播列表数据：
      menulist: [
        [
          {
            id: 30,
            img: "/imgs/item-box-1.png",
            name: "小米CC9",
          },
          { id: 31, img: "/imgs/item-box-2.png", name: "K20 Pro" },
          { id: 32, img: "/imgs/item-box-3.jpg", name: "RedMiKI20 Pro" },
          { id: 33, img: "/imgs/item-box-4.jpg", name: "移动4G专区" },
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      // 广告海报数据
      advlist: [
        {
          id: 33,
          img:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5d4298059889417157e8492750328492.jpg?w=632&h=340",
        },
        {
          id: 48,
          img:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b30177d629bfbe2fb42251c1b8538f7b.jpg?w=632&h=340",
        },
        {
          id: 45,
          img:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/793913688bfaee26b755a0b0cc8575fd.jpg?w=632&h=340",
        },
        {
          id: 47,
          img:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5d4298059889417157e8492750328492.jpg?w=632&h=340",
        },
      ],
      // 主页的产品详情展示数据
      indexproductsinfo: [
        {
          title: "手机",
          banner:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/431e5fd6bfd1b67d096928248be18303.jpg?thumb=1&w=1533&h=150&f=webp&q=90",
          advbanner:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c583f2edc613f1be20fa415910b13ce3.jpg?thumb=1&w=293&h=768&f=webp&q=90",
          data: [],
        },
        {
          title: "家电",
          banner:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/41d16e66381cfeda7b6b39ab67678d5e.jpg?thumb=1&w=1533&h=150&f=webp&q=90",
          advbanner:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/116fc43816b87192be4e67cf762e8da5.jpeg?thumb=1&w=293&h=375&f=webp&q=90",
          data: [],
        },
        {
          title: "智能",
          banner:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/59e8fc8ba9718c266882719fb4bbcedd.jpg?thumb=1&w=1533&h=150&f=webp&q=90",
          advbanner:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a660ce095e8f553a9ed1515265f4e9fc.jpg?thumb=1&w=293&h=375&f=webp&q=90",
          data: [],
        },
        {
          title: "配件",
          banner:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/01cc6a570d32a2ee09a2d5c2009a9968.jpg?thumb=1&w=1533&h=150&f=webp&q=90",
          advbanner:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6874615b3c50e837ffe532eb6ea4ef1a.jpg?thumb=1&w=293&h=375&f=webp&q=90",
          data: [],
        },
        {
          title: "周边",
          banner:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1615d1842fe85914a545297836a44271.jpg?thumb=1&w=1533&h=150&f=webp&q=90",
          advbanner:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9f64bbd58c3f5001bdf0688894f22cb6.jpg?thumb=1&w=293&h=375&f=webp&q=90",
          data: [],
        },
      ],
      // 随机产生的数组
      romdomarray: [],
      // 是否打开弹框
      isopenthemodel: false,
    };
  },
  directives: {
    swiper: directive,
  },
  mounted() {
    this.getdata();
    // 坑点：如何放入v-for内让其每次循环时执行
    this.setRomdon();
  },
  methods: {
    /* 首页数据请求 */
    getdata() {
      this.axios
        .get("/products", {
          params: {
            pageSize: 50,
          },
        })
        .then((res) => {
          this.indexproductsinfo[0].data = res.list.slice(4, 12);
          this.indexproductsinfo[1].data = res.list.slice(12, 20);
          this.indexproductsinfo[2].data = res.list.slice(4, 12);
          this.indexproductsinfo[3].data = res.list.slice(12, 20);
          this.indexproductsinfo[4].data = res.list.slice(4, 12);
        });
    },
    setRomdon() {
      // 每次进来清空数组
      this.romdomarray.splice(0, this.romdomarray.length);
      for (let index = 0; index < 4; index++) {
        var a = Math.floor(Math.random() * (7 - 0 + 1)) + 0; //含最大值，含最小值
        this.romdomarray.push(a);
      }
    },
    setnewproduct(inedx) {
      for (let index = 0; index < this.romdomarray.length; index++) {
        const element = this.romdomarray[index];
        if (inedx == element) {
          return true;
        }
      }
      return false;
    },
    // 点击加入购物车并且弹出model操作
    addcart() {
      // 加入购物车功能等登录功能做完以后再做
      this.isopenthemodel = true;
    },
    // model的自定义点击事件
    buttonsubmit(){
      this.$router.push('/cart')
    }
  },
};
</script>   
<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.swiper-pagination-bullet-active {
  background: #000;
  opacity: 0.7;
  border: 1px #000 solid;
}
.index {
  .container {
    background: $colorJ;
    // 设置轮播里所有内容
    .swiper-container {
      img {
        @include setsize(100%, 460px);
      }
      .swiper-button-prev,
      .swiper-button-next {
        color: #a8b2c4;
        @include setsize(40px, 70px);
        &:hover {
          background: #000;
          @include setsize(40px, 70px);
          opacity: 0.4;
          border-radius: 10px;
        }
      }
      .swiper-pagination {
        text-align: right;
      }
      .swiper-button-prev {
        margin-left: 234px;
      }
    }
    // 设置轮播菜单内容
    .nav_wrap {
      position: absolute;
      z-index: 8;
      padding-bottom: 16px;
      padding-top: 16px;
      background: #000000b8;
      box-sizing: border-box;
      @include setsize(234px, 460px);
      .nav_list {
        @include setsize(100%, 42px);
        line-height: 42px;
        padding-left: 30px;
        box-sizing: border-box;
        font-size: 15px;
        a {
          display: block;
          position: relative;
          color: $colorG;
          &::after {
            content: "";
            @include setimg("/imgs/icon-arrow.png");
            position: absolute;
            @include setsize(14px, 14px);
            display: inline-block;
            width: 10px;
            height: 15px;
            top: 13px;
            right: 20px;
          }
        }
        &:hover {
          background: $colorA;
          .children {
            display: block;
          }
        }
        .children {
          display: none;
          width: 992px;
          height: 460px;
          background: $colorG;
          position: absolute;
          top: 0;
          left: 234px;
          border: 1px solid $colorH;
          ul {
            z-index: 10;
            display: flex;
            justify-content: space-around;
            height: 75px;
            li {
              height: 75px;
              line-height: 75px;
              flex: 1;
              padding-left: 23px;
            }
            a {
              color: $colorB;
              font-size: 14px;
              margin-left: 10px;
              &:hover {
                color: $colorA;
              }
            }
            img {
              vertical-align: middle;
              width: 42px;
              height: 35px;
            }
          }
        }
      }
    }
    // 广告位
    .adv_b {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      a {
        display: inline-block;
        img {
          width: 295px;
          height: 170px;
        }
      }
    }
  }
  // 首页商品展示
  .product_box {
    margin-top: 25px;
    background-color: #f5f5f5;
    .box_container {
      width: 1226px;
      margin-right: auto;
      margin-left: auto;
      padding-top: 20px;
      .products_list {
        // 首页商品展示布局
        .products_item {
          .products_item_bannerimg {
            width: 100%;
            height: 120px;
            margin-top: 10px;
          }
          .products_item_title {
            font-size: 25px;
            margin-top: 30px;
            margin-bottom: 17px;
          }
          .products_content {
            display: flex;
            justify-content: space-between;
            height: 614px;
            .products_content_left {
              img {
                @include setsize(234px, 602px);
              }
            }
            .products_content_right {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              align-items: stretch;
              .products_content_right_item {
                transition: all 0.5s; /*动画过渡*/
                @include setsize(234px, 295px);
                text-align: center;
                background: #ffffff;
                // 要删
                margin-left: 10px;
                .products_content_right_item_span_base {
                  visibility: hidden;
                  display: block;
                  @include setsize(67px, 24px);
                  background: #ff6600a1;
                  margin: 0 auto;
                  line-height: 24px;
                  color: #ffffff;
                  border-bottom-left-radius: 5px;
                  border-bottom-right-radius: 5px;
                }
                .products_content_right_item_span {
                  visibility: visible;
                  display: block;
                  @include setsize(67px, 24px);
                  background: #ff6600a1;
                  margin: 0 auto;
                  line-height: 24px;
                  color: #ffffff;
                  border-bottom-left-radius: 5px;
                  border-bottom-right-radius: 5px;
                }
                .products_content_right_item_img {
                  margin: 10px;
                  @include setsize(150px, 150px);
                }
                .products_content_right_item_name {
                  font-size: 15px;
                  color: #000;
                  margin-top: 10px;
                }
                .products_content_right_item_introduce {
                  font-size: 12px;
                  color: $colorE;
                  margin-top: 5px;
                }
                .products_content_right_item_price {
                  margin-top: 10px;
                  line-height: 14px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  a {
                    height: 30px;
                    line-height: 30px;
                    color: $colorA;
                    font-size: 15px;
                  }
                  .products_content_right_item_price_img {
                    cursor: pointer;
                    display: inline-block;
                    width: 30px;
                    height: 20px;
                    margin-left: 10px;
                    background: url("/imgs/icon-cart.png") no-repeat center;
                    background-size: 20px;
                  }
                }
                // 设置单个item的hover效果
                &:hover {
                  position: relative; /*改成相对定位*/
                  top: -3px; /*向上挪动5px*/
                  transition: all 0.5s; /*动画过渡*/
                  -moz-box-shadow: 1px 2px 18px #cccccc;
                  -webkit-box-shadow: 1px 2px 18px #cccccc;
                  box-shadow: 1px 2px 18px #cccccc;
                  .products_content_right_item_price_img {
                    background: url("/imgs/icon-cart-hover.png") no-repeat
                      center;
                    background-size: 20px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>