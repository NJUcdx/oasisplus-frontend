<template>
  <div>
    <el-card class="box">
      <div class="result-num">
        该机构下的同名作者推测：
      </div>
      <div class="authors" v-if="authors.length > 0">
        <el-breadcrumb
          separator="/"
          v-for="(author, index) in authors"
          :key="index"
        >
          <el-breadcrumb-item v-for="(a, i) in author" :key="i"
            ><a
              :href="'/author/' + a.id + '/' + a.db"
              style=" font-weight: bold"
              >{{ a.name }}</a
            ></el-breadcrumb-item
          >

          <!--                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
          <!--                <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>-->
          <!--                <el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
          <!--                <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
        </el-breadcrumb>
      </div>
      <div v-else style="padding-left: 65px;font-size: small">
        暂无同名作者
      </div>
    </el-card>
  </div>
</template>

<script>
import { institutionSameAuthor } from "../../../network/institution";

export default {
  name: "",
  data() {
    return {
      authors: []
    };
  },
  methods: {},
  mounted() {
    institutionSameAuthor({
      params: {
        id: this.$route.params.id,
        db: this.$route.params.db
      }
    }).then(res => {
      // console.log(res)
      this.authors = res.content;
      // this.breadcrumb = [this.authorDetail.name, "protrait"];
      // this.institution
    });
  }
};
</script>

<style scoped>
.box {
  padding-bottom: 40px;
  margin-top: 100px;
  margin-bottom: 100px;
  margin-left: 20px;
  margin-right: 20px;
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
  height: 120px;
}
.authors {
  padding-left: 65px;
}
</style>
