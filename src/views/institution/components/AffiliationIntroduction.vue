<template>
  <div class="intro-container">
    <el-row>
      <el-col v-if="logoUrl != null && logoUrl !== ''" :sm="6" :xs="24">
        <el-image class="logo" :src="logoUrl" fit="contain"></el-image>
      </el-col>
      <el-col
        class="text-info"
        :sm="logoUrl == null || logoUrl === '' ? 24 : 18"
        :xs="24"
      >
        <div class="name">
          {{ name }}
        </div>
        <div>
          <div style="margin-top: 10px">
            <a
              v-if="sameIns.length > 0"
              style="font-size: 10px;line-height: 30px;"
              >集成大学名称:</a
            >
            <a v-else style="font-size: 10px;line-height: 30px;"
              >暂无集成大学</a
            >
            <el-tag
              style="margin-left: 4px"
              type="info"
              size="small"
              v-for="(keyword, index) in sameIns"
              :key="index"
              >{{ keyword }}</el-tag
            >
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "AffiliationIntroduction",
  props: {
    logoUrl: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: "Affiliation"
    },
    sameIns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    introduction: {
      type: String,
      default: "Introduction"
    },
    site: {
      type: String,
      default: ""
    },
    id: {
      type: Number,
      default: -1
    }
  },
  computed: {
    // contentWidth: function () {
    //     return
    // }
  }
};
</script>

<style scoped>
.logo {
  width: 100%;
}

.intro-container {
  height: 100%;
  min-height: 170px;
}

.text-info {
  text-align: left;
  height: 100%;
}

.text-info .name {
  font-size: 28px;
  text-overflow: ellipsis;
}

.text-info .detail {
  margin-top: 16px;
  max-height: 90px;
  overflow: hidden;
}

.text-info .link {
  padding-top: 16px;
}
</style>
