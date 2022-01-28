<template>
  <div class="home-card shkb-card">
    <div class="home-card-head">
      <div class="home-card-head-left">
        <i class="home-card-head-icon" :class="iconClass"></i>
        <span class="home-card-head-title">{{ cardTitle }}</span>
      </div>
      <div class="home-card-head-right">
        {{ headRight }}
      </div>
    </div>
    <div class="home-card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCard",
  props: {
    link: {
      type: String,
      require: true
    },
    cardTitle: {
      type: String,
      require: true
    },
    iconClass: {
      type: String,
      require: true
    },
    headRight: {
      type: String,
      require: true
    }
  }
};
</script>

<style scoped>
.home-card {
  /*height: 500px;*/
  width: 25%;
  font-size: 12px;
  padding-bottom: 30px;
}
.home-card-head {
  height: 60px;
  border-radius: 10px 10px 0 0;
  padding: 10px 10px 10px 10px;
  background-color: var(--card-deep);
}
.home-card-body {
  padding: 12px 18px 0 18px;
}

.home-card-head-icon {
  font-size: 50px;
  float: left;
  margin-left: 10px;
}
.home-card-head-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 10px 30px;
  line-height: 50px;
}
.home-card-head-right {
  float: right;
  margin-top: -30px;
  font-size: 20px;
}
.el-progress {
  flex: 1;
}
</style>
