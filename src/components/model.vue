<template>
  <transition name="slide">
    <div class="model" v-show="showModel">
      <div class="mask"></div>
      <div class="model-dialog">
        <div class="model-header">
          <span>{{ title }}</span>
          <a class="icon-close" @click="$emit('buttoncancel')"></a>
        </div>
        <div class="model-body">
          <slot name="body"></slot>
        </div>
        <div class="model-footer">
          <a v-if="btnType == 1" class="btn" @click="$emit('buttonsubmit')">{{
            sureText
          }}</a>
          <a v-if="btnType == 2" class="btn" @click="$emit('buttoncancel')">{{
            cancelText
          }}</a>
          <div class="btn-group" v-if="btnType == 3">
            <a class="btn" @click="$emit('buttonsubmit')">{{ sureText }}</a>
            <a class="btn btn-default" @click="$emit('buttoncancel')">{{ cancelText }}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "model",
  // 弹框类型：小，中，大
  props: {
    modelType: {
      type: String,
      default: "form",
    },
    // 弹框标题
    title: String,
    // 按钮类型：确认按钮、取消按钮 、确定取消
    btnType: String,
    sureText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    showModel: Boolean,
  },
};
</script>
<style lang='scss'>
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
.model {
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

  /* Vue动画 */
  &.slide-enter-active {
    top: 0;
  }

  &.slide-leave-active {
    top: -100%;
  }

  &.slide-enter {
    top: -100%;
  }

  .model-dialog {
    position: absolute;
    top: 40%;
    left: 50%;
    width: 660px;
    height: auto;
    background: $colorG;
    transform: translate(-50%, -50%);
    a {
      cursor: pointer;
    }
    .model-header {
      height: 60px;
      background-color: $colorJ;
      line-height: 60px;
      padding: 0 25px;
      font-size: $fontI;
      span{
        font-weight: bold;
      }
      .icon-close {
        position: absolute;
        right: 25px;
        top: 23px;
        width: 14px;
        height: 14px;
        background: url("/imgs/icon-close.png") no-repeat center;
        background-size: contain;
        transition: all 0.2s;

        &:hover {
          transform: scale(1.5);
        }
      }
    }

    .model-body {
      padding: 42px 40px 54px;
      font-size: 14px;
    }

    .model-footer {
      height: 82px;
      line-height: 82px;
      text-align: center;
      background-color: $colorJ;
      // 在这儿做！！（按钮样式设置）
    }
  }
}
</style>
