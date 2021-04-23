<template>
  <transition name="slide">
    <div class="model" v-show="showModel">
      <div class="mask"></div>
      <div class="model-dialog">
        <div class="model-header">
          <span>{{title}}</span>
          <a
            class="icon-close"
            @click="$emit('buttoncancel')"
          ></a>
        </div>
        <div class="model-body">
          <slot name="body"></slot>
        </div>
        <div class="model-footer">
          <a
            v-if="btnType == 1"
            class="btn"
            @click="$emit('buttonsubmit')"
            >{{ sureText }}</a
          >
          <a
            v-if="btnType == 2"
            class="btn"
            @click="$emit('buttoncancel')"
            >{{ cancelText }}</a
          >
          <div class="btn-group" v-if="btnType == 3">
            <a
              href="javascripts:;"
              class="btn"
              @click="$emit('buttonsubmit')"
              >{{ sureText }}</a
            >
            <a
              href="javascripts:;"
              class="btn"
              @click="$emit('buttoncancel')"
              >{{ cancelText }}</a
            >
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
@import "../assets/scss/model.scss";
</style>
