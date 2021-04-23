/* 大图展示（基于home.vue） */
<template>
  <div>
    <product-param :name='productsData.name'>
      <template slot="right_button">
        <button class="btn" @click="gotodetail()">立即购买</button>
      </template>
    </product-param>
    <div class="product_content">
      <div class="content_img1">
        <h2>{{productsData.name}}</h2>
        <p class="content_img1_introduce">{{productsData.subtitle}}</p>
        <div class="content_img1_config">
          <a href="javascript:;">全球首款双频 GP<span>|</span></a>
          <a href="javascript:;">骁龙845<span>|</span></a>
          <a href="javascript:;">AI 变焦双聚<span>|</span></a>
          <a href="javascript:;">红外人脸识别</a>
        </div>
        <p class="content_img1_price">￥{{productsData.price}}</p>
      </div>
      <div class="content_img2">
        <div class="container"></div>
      </div>
      <div class="content_img3"></div>
      <div class="swiper">
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide
            ><img src="/imgs/product/gallery-2.png" alt=""
          /></swiper-slide>
          <swiper-slide
            ><img src="/imgs/product/gallery-3.png" alt=""
          /></swiper-slide>
          <swiper-slide
            ><img src="/imgs/product/gallery-4.png" alt=""
          /></swiper-slide>
          <swiper-slide
            ><img src="/imgs/product/gallery-5.jpg" alt=""
          /></swiper-slide>
          <swiper-slide
            ><img src="/imgs/product/gallery-6.jpg" alt=""
          /></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <p class="swiper_text">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="vidio_content">
        <div class="vidio_content_h2">
          <h2>60帧超慢动作摄影 慢慢回味每一瞬间的精彩</h2>
        </div>
        <p class="vidio_content_p">
          后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！ 更能AI
          精准分析视频内容，15个场景智能匹配背景音效。
        </p>
        <img
          @click="videoIsShow = true"
          src="/imgs/product/gallery-1.png"
          alt=""
        />
        <div class="video_bg">
          <div class="video_box">
            <div class="overlay" v-if="videoIsShow"></div>
            <div class="video" :class="{ slide: videoIsShow }">
              <span class="icon_close" @click="videoIsShow = false"></span>
              <video
                src="/imgs/product/video.mp4"
                muted
                autoplay
                controls
              ></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import productParam from "../components/productParam.vue";
export default {
  components: { productParam, Swiper, SwiperSlide },
  directives: {
    swiper: directive,
  },
  name: "product",
  data() {
    return {
      // 视频是否显示
      videoIsShow: false,
      // 接口数据
      productsData:{},
      swiperOptions: {
        autoplay: {
          delay: 3000, //1秒切换一次
          disableOnInteraction: true,
        },
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
        },
        effect: "coverflow",
        slidesPerView: 3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 30,
          stretch: 10,
          depth: 60,
          modifier: 2,
          slideShadows: true,
        },
      },
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    // 获取接口数据
    getdata(){
      let id=this.$route.params.id;
      this.axios.get(`/products/${id}`, {
      })
      .then(res => {
        this.productsData=res
        console.log(this.productsData);
      })
    },
    // 跳转到指定页面
    gotodetail(){
      this.$router.push('/detail/'+this.productsData.id)
    }
  },
};
</script>
<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/base.scss";
@import "../assets/scss/config.scss";
.product_content {
  .content_img1 {
    width: 100%;
    height: 648px;
    background: url("/imgs/product/product-bg-1.png") no-repeat top;
    text-align: center;
    padding-top: 69px;
    h2 {
      font-size: 80px;
    }
    .content_img1_introduce {
      font-size: 25px;
      font-weight: bold;
      letter-spacing: 10px;
    }
    .content_img1_config {
      margin-top: 20px;
      a {
        color: #000;
        font-size: 16px;
        span {
          margin-left: 15px;
          margin-right: 15px;
        }
      }
    }
    .content_img1_price {
      font-size: 40px;
      margin-top: 50px;
    }
  }
  .content_img2 {
    padding: 80px 100px 80px 100px;
    .container {
      width: 100%;
      height: 423px;
      background: url("/imgs/product/product-bg-2.png") no-repeat top;
      background-size: contain;
    }
  }
  // 设置轮播里所有内容
  .swiper-container {
    img {
      @include setsize(486px, 227px);
    }
  }
  .swiper {
    box-sizing: 1;
    text-align: center;
    .swiper_text {
      margin-top: 5px;
      font-size: 18px;
    }
  }
  .vidio_content {
    margin-top: 50px;
    background: #000;
    width: 100%;
    height: 1044px;
    text-align: center;
    .vidio_content_h2 {
      height: 240px;
      h2 {
        width: 600px;
        display: inline-block;
        font-size: 60px;
        color: #fff;
        text-align: center;
        margin-top: 80px;
      }
    }
    .vidio_content_p {
      height: 64px;
      font-size: 25px;
      color: #fff;
      width: 700px;
      margin: auto;
      margin-top: 50px;
      margin-bottom: 0px;
    }
    img {
      margin-top: 50px;
      width: 1226px;
      height: 540px;
      cursor: pointer;
    }
    .video_bg {
      .overlay {
        position: fixed;
        top: 0px;
        left: 0px;
        background: #000;
        opacity: 0.5;
        z-index: 10;
        width: 100%;
        height: 100%;
      }
      .video {
        position: fixed;
        top: -50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1000px;
        height: 536px;
        z-index: 10;
        opacity: 0;
        transition: all 0.6s;
        &.slide {
          top: 50%;
          opacity: 1;
        }
        .icon_close {
          width: 24px;
          height: 24px;
          background: url("/imgs/icon-close.png") no-repeat center;
          background-size: contain;
          position: absolute;
          top: 10px;
          right: 20px;
          cursor: pointer;
          z-index: 11;
          &:hover {
            width: 30px;
            height: 30px;
            transition: all 0.3s;
          }
        }
        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
