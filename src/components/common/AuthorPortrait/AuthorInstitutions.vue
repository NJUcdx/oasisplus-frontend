<template>
  <div>
    <el-card class="box">
      <div class="result-num">
        单位变迁历史：
      </div>
      <el-steps
        v-if="institutions.length > 0"
        :active="100"
        align-center
        class="steps"
      >
        <el-step
          v-for="(item, index) in institutions"
          :key="index"
          :title="item.time + ''"
          :description="item.institution"
        ></el-step>
      </el-steps>
      <div v-else style="padding-left: 65px;font-size: small">
        暂无该作者单位变迁信息
      </div>
    </el-card>
  </div>
</template>

<script>
import { authorInstitutions } from "../../../network/author";

export default {
  name: "",
  data() {
    return {
      institutions: []
    };
  },
  methods: {},
  mounted() {
    authorInstitutions({
      params: {
        id: this.$route.params.id,
        db: this.$route.params.db
      }
    }).then(res => {
      // console.log(res)
      this.institutions = res.content.slice(0, 10);
      // this.breadcrumb = [this.authorDetail.name, "protrait"];
      // this.institution
    });
  }
};
</script>

<style scoped>
.box {
  padding-bottom: 20px;
  margin-top: 100px;
  margin-bottom: 100px;
}
.result-num {
  padding-left: 65px;
  margin-bottom: 10px;
  line-height: 80px;
  font-size: 20px;
  font-weight: 500;
  color: #888888;
}

.steps {
  min-height: 120px;
  padding-bottom: 10px;
}
</style>
