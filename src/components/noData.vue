<template>
  <div>
    <div class="nodata">
      <img src="/imgs/icon-no-data.png" alt="" />
      <p>没有您的记录哦~</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "nodata",
};
</script>
<style lang='scss'>
@import "../assets/scss/config.scss";
.nodata {
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  p {
    font-size: 25px;
    color: #ccc;
  }
}
</style>
