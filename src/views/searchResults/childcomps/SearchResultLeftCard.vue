<template>
  <div class="left-card">
    <el-card class="box-card">
      <div class="interval">
        <div>
          Interval: <span>{{ sliderValue[0] }}~{{ sliderValue[1] }}</span>
        </div>
        <div class="block">
          <el-slider
            v-model="sliderValue"
            :format-tooltip="formatTooltip"
            range
            :min="2010"
            :max="2020"
            @change="sliderChange"
            :marks="masks"
          >
          </el-slider>
        </div>
      </div>
      <!--			<div class="author">Author</div>-->
      <!--			<div class="conferences">Conference</div>-->
      <!--			<div class="institution">Institution</div>-->
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SearchResultLeftCard",
  data() {
    return {
      sliderValue: [2010, 2020],
      masks: {
        2010: "2010",
        2020: "2020"
      }
    };
  },
  methods: {
    formatTooltip(val) {
      return val;
    },
    sliderChange(val) {
      this.$emit("sliderChange", val);
    }
  }
};
</script>

<style scoped>
.left-card {
  /*min-width: 250px;*/
}
.left-card .interval {
  margin-top: 10px;
  font-size: 12px;
  font-weight: 600;
  height: 200px;
  /*border-bottom: 1px solid #efefef;*/
}
.left-card .interval span {
  color: #3c88be;
}
.left-card .block {
  width: 90%;
  margin: 0 auto;
  font-weight: 400;
}
.left-card .ads {
  height: 130px;
  display: flex;
  font-size: 25px;
  font-weight: 600;
  color: #efefef;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  margin-top: 20px;
  background-image: url("https://pictures-frozensky.oss-cn-hangzhou.aliyuncs.com/img/ad.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
