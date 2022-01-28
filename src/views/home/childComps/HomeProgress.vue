<template>
  <div class="progress">
    <div>
      <a class="progress-left" :href="link">{{ textLeft }}</a>
      <span class="progress-right">{{ textRight }}</span>
    </div>
    <el-progress :percentage="percentage" :show-text="false"></el-progress>
  </div>
</template>

<script>
export default {
  name: "HomeProgress",
  props: {
    percentage: {
      type: Number,
      require: true
    },
    textLeft: String,
    textRight: String,
    link: {
      type: String,
      require: true
    }
  }
};
</script>

<style scoped>
.progress-left {
  display: inline-block;
  text-decoration: none;
  color: deepskyblue;
  max-width: 180px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /*line-height: 28px;*/
}
.progress-right {
  color: #888888;
  position: relative;
  float: right;
}
.progress {
  line-height: 25px;
}
</style>
