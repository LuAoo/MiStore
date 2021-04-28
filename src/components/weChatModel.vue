<template>
    <div class="model_chat" v-show="showWechatModel">
      <div class="mask"></div>
      <div class="model-dialog">
        <a class="dialog_left"></a>
        <div class="diolog_content">
          <div class="diolog_header">
            <p>微信支付</p>
            <a @click="$emit('buttoncancel')"></a>
          </div>
          <div class="diolog_eq">
            <img
              :src="imgUrl"
              alt=""
            />
            <p>请使用微信扫一扫</p>
            <p>二维码完成支付</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "wechat-model",
  props: {
    // 二维码地址
    url: String,
    showWechatModel: Boolean,
    imgUrl:String
  },
};
</script>
<style lang='scss'>
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
.model_chat {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 10;
  transition: all 0.3s;

  .mask {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #000000ba;
  }
  .model-dialog {
    position: absolute;
    top: 40%;
    left: 50%;
    width: 660px;
    height: auto;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    a {
      cursor: pointer;
    }
    .model-body {
      padding: 42px 40px 54px;
      font-size: 14px;
    }
    .dialog_left {
      display: inline-block;
      background: url("/imgs/pay/icon-scan.png") no-repeat center;
      background-size: contain;
      width: 258px;
      height: 485px;
    }
    .diolog_content {
      width: 400px;
      height: 350px;
      background: $colorG;
      .diolog_header {
        width: 100%;
        box-sizing: border-box;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f5f5f5;
        padding-left: 20px;
        padding-right: 20px;
        p {
          font-size: 20px;
        }
        a {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("/imgs/icon-close.png") no-repeat center;
          background-size: contain;
        }
      }
      .diolog_eq {
        text-align: center;
        p{
          font-size: 15px;
        }
        img {
          margin-top: 50px;
          width: 150px;
          height: 150px;
          margin-bottom: 30px;
        }
      }
    }
  }
}
</style>

