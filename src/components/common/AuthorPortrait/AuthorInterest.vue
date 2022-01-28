<template>
  <div class="author-interest-card" v-if="dataConform">
    <el-card class="box-card">
      <div class="author-interest-title">
        Author Keywords
      </div>
      <div class="author-interest-content">
        <el-steps
          :active="content.length + 1"
          class="author-interest-history"
          finish-status="finish"
        >
          <el-step
            icon="el-icon-s-order"
            v-for="item in content"
            :key="item.year"
            :title="item.year + ''"
            :description="item.word"
          ></el-step>
          <el-step
            status="finish"
            v-show="predicted"
            icon="el-icon-s-order"
            v-for="item in predict"
            :key="item.year"
            :title="item.year + ''"
            :description="item.word"
          ></el-step>
          <el-step title="future" icon="el-icon-s-promotion"></el-step>
        </el-steps>
        <el-button @click="prediction" class="author-interest-predict"
          >predict</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import { authorInterestPredict } from "../../../network/author";
import { authorInterestHistory } from "../../../network/author";

export default {
  data() {
    return {
      dataConform: false,
      content: [],
      predict: [],
      predicted: false
    };
  },
  name: "AuthorInterest",
  props: ["id", "db"],
  methods: {
    prediction() {
      this.predicted = !this.predicted;
    }
  },
  mounted() {
    authorInterestHistory({
      params: {
        id: this.id,
        db: this.db
      }
    }).then(data => {
      if (data.content[0].year != "0") this.dataConform = true;
      this.content = data.content;
    });
    authorInterestPredict({
      params: {
        id: this.id,
        db: this.db
      }
    }).then(data => {
      this.predict = data.content;
    });
  }
};
</script>

<style scoped>
.box-card {
  text-align: left;
  margin: 40px;
  width: 100%;
  height: 220px;
}
.author-interest-card {
  display: flex;
  justify-content: space-between;
}
.author-interest-title {
  font-size: 18px;
}
.author-interest-content {
  margin: 30px 20px 30px 20px;
}
.author-interest-history {
  width: 100%;
}
.author-interest-predict {
  margin-top: 12px;
  float: right;
}
</style>
