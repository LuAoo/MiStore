/* 商品详情（基于home.vue） */
<template>
  <div class="product_detail">
    <product-param :name="detailData.name"></product-param>
    <div class="detail_content">
      <div class="container">
        <div class="detail_content_top">
          <div class="detail_content_top_left">
            <div class="swiper">
              <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide
                  ><img src="/imgs/detail/phone-1.jpg" alt=""
                /></swiper-slide>
                <swiper-slide
                  ><img src="/imgs/detail/phone-2.jpg" alt=""
                /></swiper-slide>
                <swiper-slide
                  ><img src="/imgs/detail/phone-3.jpg" alt=""
                /></swiper-slide>
                <swiper-slide
                  ><img src="/imgs/detail/phone-4.jpg" alt=""
                /></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </div>
          </div>
          <div class="detail_content_top_right">
            <h2>{{ detailData.name }}</h2>
            <p class="detail_content_top_right_introduce">
              相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS /
              骁龙845处理器 / 红 外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
            </p>
            <p class="detail_content_top_right_selfsell">小米自营</p>
            <p class="detail_content_top_right_pirce">
              {{ detailData.price }}元 <del>5000元</del>
            </p>
            <div class="detail_content_top_right_line"></div>

            <div class="detail_content_top_right_address">
              <div class="detail_content_top_right_address_left">
                <div></div>
              </div>
              <div class="detail_content_top_right_address_right">
                <p class="detail_content_top_right_address_right_p1">
                  北京 北京市 朝阳区 安定门街道
                </p>
                <p class="detail_content_top_right_address_right_p2">有现货</p>
              </div>
            </div>
            <p class="detail_content_top_right_address_right_titlle1">
              选择版本
            </p>
            <div class="detail_content_top_right_address_version">
              <a
                class="tt"
                :class="{ ischose: ischose == 1 }"
                @click="ischose = 1"
                >6GB+64GB 全网通</a
              >
              <a
                class="tt"
                :class="{ ischose: ischose == 2 }"
                @click="ischose = 2"
                >4GB+64GB 移动4G</a
              >
            </div>
            <p class="detail_content_top_right_address_right_titlle2">
              选择颜色
            </p>
            <div class="detail_content_top_right_address_version">
              <a class="detail_content_top_right_address_version_spa tt"
                >深空灰</a
              >
            </div>
            <div class="detail_content_top_right_address_end">
              <div class="detail_content_top_right_address_end_top">
                <p>
                  {{ detailData.name }}
                  {{ ischose == 1 ? " 6GB+64GB 全网通" : " 4GB+64GB 移动4G" }}
                </p>
                <p>{{ detailData.price }}元</p>
              </div>
              <p class="detail_content_top_right_address_end_top_add">
                总计：{{ detailData.price }}元
              </p>
            </div>
            <a @click="addToCart()" class="detail_lastbutton">加入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <div class="detail_content_bottom">
      <div class="container">
        <p>价格说明</p>
        <img src="/imgs/detail/item-price.jpeg" alt="" />
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import productParam from "../components/productParam.vue";
import ServiceBar from "../components/ServiceBar.vue";
export default {
  components: { productParam, ServiceBar, Swiper, SwiperSlide },
  directives: {
    swiper: directive,
  },
  name: "detail",
  data() {
    return {
      id: this.$route.params.id,
      detailData: {},
      ischose: 1,
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
      },
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    //   初始化操作
    getdata() {
      this.axios.get(`/products/${this.id}`, {}).then((res) => {
        this.detailData = res;
        console.log(this.detailData);
      });
    },
    //  添加购物车操作
    addToCart() {
      this.axios
        .post("/carts", {
          productId: this.id,
          selected: true,
        })
        .then((res) => {
          console.log(res);
         //  将数据vuex中数据同步
          this.$store.dispatch("setCartnum",res.cartTotalQuantity);
          this.$router.push("/cart");
        });
    },
  },
};
</script>
<style lang="scss">
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
// 是否选中(坑)

// 设置swiper里的小圆点
.swiper-pagination-bullet-active {
  background: #000;
  opacity: 0.7;
  border: 1px #000 solid;
}
.detail_content {
  overflow: hidden;
  margin-top: 30px;

  // 设置轮播里所有内容
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
  .detail_content_top_left {
    float: left;
    .swiper-container {
      img {
        width: 90%;
        height: 100%;
      }
    }
    .swiper {
      @include setsize(642px, 642px);
      box-sizing: 1;
      text-align: center;
    }
  }
  .detail_content_top_right {
    float: left;
    width: 555px;
    margin-left: 20px;
    h2 {
      font-size: 25px;
    }
    .detail_content_top_right_introduce {
      font-size: 15px;
      margin-top: 10px;
    }
    .detail_content_top_right_selfsell {
      font-size: 16px;
      margin-top: 30px;
      color: $colorA;
    }
    .detail_content_top_right_pirce {
      margin-top: 15px;
      font-size: 18px;
      font-weight: 200;
      color: $colorA;
      del {
        font-size: 14px;
        font-weight: normal;
        color: #999999;
        margin-left: 5px;
      }
    }
    .detail_content_top_right_line {
      width: 555px;
      height: 1px;
      background: #ccc;
      margin-top: 16px;
    }
    .detail_content_top_right_address {
      width: 555px;
      height: 108px;
      background: #fafafa;
      border: 1px solid #e5e5e5;
      margin-top: 30px;
      padding: 30px;
      box-sizing: border-box;
      overflow: hidden;
      .detail_content_top_right_address_left {
        float: left;
        div {
          width: 20px;
          height: 20px;
          background: url("/imgs/detail/icon-loc.png") no-repeat center;
          background-size: contain;
        }
      }
      .detail_content_top_right_address_right {
        float: left;
        margin-left: 10px;
        .detail_content_top_right_address_right_p1 {
          font-size: 15px;
          color: #666666;
        }
        .detail_content_top_right_address_right_p2 {
          color: $colorA;
          font-size: 15px;
          margin-top: 5px;
        }
      }
    }
    .detail_content_top_right_address_right_titlle1,
    .detail_content_top_right_address_right_titlle2 {
      font-size: 20px;
      font-weight: bold;
      margin-top: 30px;
    }
    .detail_content_top_right_address_version {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .tt {
        border: 1px solid #ccc;
        cursor: pointer;
        display: inline-block;
        width: 270px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 15px;
      }
      .ischose {
        border: 1px solid $colorA;
        color: $colorA;
      }
      .detail_content_top_right_address_version_spa {
        border: 1px solid $colorA;
        cursor: pointer;
        color: $colorA;
      }
    }
    .detail_content_top_right_address_end {
      width: 555px;
      height: 108px;
      background: #fafafa;
      margin-top: 50px;
      padding: 30px;
      box-sizing: border-box;
      .detail_content_top_right_address_end_top {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
      }
      .detail_content_top_right_address_end_top_add {
        font-size: 23px;
        color: $colorA;
        margin-top: 10px;
      }
    }
    .detail_lastbutton {
      cursor: pointer;
      display: inline-block;
      width: 270px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 15px;
      background: $colorA;
      color: #fff;
      margin-top: 30px;
      &:hover {
        transition: all 0.3s;
        background: #dc5f0b;
      }
    }
  }
}
.detail_content_bottom {
  height: 340px;
  width: 100%;
  background: #f3f3f3;
  margin-top: 35px;
  box-sizing: border-box;
  padding-top: 30px;
  p {
    font-size: 25px;
    font-weight: bold;
  }
  img {
    margin-top: 30px;
    width: 100%;
    height: 189px;
  }
}
</style>
