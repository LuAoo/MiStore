/* 底部导航组件 */
<template>
  <div>
    <footer>
      <div class="footer_bottom">
        <dl v-for="(item, index) in footer_bottomdata" :key="index">
          <dt>{{ item.title }}</dt>
          <dd v-for="(item, index) in item.data" :key="index">
            <a href="">{{ item }}</a>
          </dd>
        </dl>
        <div class="concatwe">
          <p class="concatwe_tel">400-100-5678</p>
          <p class="concatwe_time">8:00-18:00（仅收市话费）</p>
          <button><span class="iconfont">&#xe606;</span> 人工客服</button>
          <div class="lookwe">
            <span class="lookwe_one">关注小米:</span>
            <span class="lookwe_two iconfont">&#xe64c;</span>
            <span class="lookwe_three iconfont">&#xe605;</span>
          </div>
        </div>
      </div>
      <p class="shabi">让全球每个人都能享受科技带来的美好生活</p>
    </footer>
  </div>
</template>
<script>
export default {
  name: "nav-footer",
  data() {
    return {
      // 底部数据
      footer_topdata: [
        "预约维修服务",
        "7天无理由退货",
        "15天免费换货",
        "满99元包邮",
        "520余家售后网点",
      ],
      footer_bottomdata: [
        { title: "帮助中心", data: ["账户管理", "购物指南", "订单操作"] },
        { title: "服务支持", data: ["售后政策", "自助服务", "相关下载"] },
        { title: "线下门店", data: ["小米之家", "服务网点", "授权体验店"] },
        {
          title: "关于小米",
          data: [
            "了解小米",
            "加入小米",
            "投资者关系",
            "企业社会责任",
            "廉洁举报",
          ],
        },
        { title: "特色服务", data: ["F码通道", "礼物码", "防伪查询"] },
      ],
    };
  },
};
</script>
<style lang="scss">
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
footer {
  margin-top: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
  width: $min-width;
  margin-right: auto;
  margin-left: auto;
}
.footer_bottom {
  display: flex;
  justify-content: space-between;
  dl {
    dt {
      font-size: 15px;
      color: black;
      margin-bottom: 20px;
    }
    dd {
      margin: 0;
      line-height: 30px;
      a {
        width: 100%;
        display: inline-block;
        font-size: 13px;
        color: #b0b0b0;
        &:hover {
          color: #ff8000;
        }
      }
    }
  }
  .concatwe {
    text-align: center;
    line-height: 40px;
    .concatwe_tel {
      font-size: 25px;
      color: #ff8000;
    }
    .concatwe_time {
      color: #b0b0b0;
      font-size: 12px;
    }
    button {
      border: 1px solid #ff8000;
      color: #ff8000;
      background: #fff;
      width: 130px;
      height: 30px;
      font-size: 13px;
      transition: all 0.5s;
      &:hover {
        color: white;
        background: #ff8000;
      }
    }
    .lookwe_one {
      font-size: 13px;
      color: #b0b0b0;
      margin-right: 10px;
    }
    .lookwe_two {
      &:hover {
        color: #ff8000;
      }
    }
    .lookwe_three {
      &:hover {
        color: #ff8000;
      }
    }
  }
}
.shabi {
  margin-top: 40px;
  text-align: center;
  color: #949694;
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
}
</style>
