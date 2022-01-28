<template>
  <div class="search-results">
    <el-backtop :right="60" :bottom="120"
      ><div class="back-top">TOP</div></el-backtop
    >
    <main class="wrap" v-loading="loading">
      <div class="result-num">
        References: About <span>{{ total }}</span> results
      </div>
      <el-row :gutter="20">
        <el-col :span="24" class="middle">
          <div class="header">
            <span>Papers({{ total }})</span>
          </div>
          <ref-paper-cards
            :documents="documents"
            :total="total"
            :page="page"
            v-if="documents.length > 0"
          ></ref-paper-cards>
        </el-col>
      </el-row>
    </main>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>
<script>
import refPaperCards from "./refPaperCards";
import { paperRef } from "../../../network/paper";

export default {
  name: "refCards",
  components: {
    refPaperCards
  },
  props: ["id", "db"],
  data() {
    return {
      loading: true,
      sort: 0,
      pageSize: 7,
      total: 0,
      page: 1,
      documents: []
    };
  },
  mounted() {
    paperRef({
      params: {
        id: this.id,
        db: this.db,
        page: this.page,
        pageSize: this.pageSize
      }
    }).then(data => {
      this.loading = false;
      console.log(this.loading);
      console.log(data.content);
      this.documents = data.content;
      this.total = data.message;
    });
  },
  methods: {
    pageChange() {
      console.log("bbb");
      paperRef({
        params: {
          id: this.id,
          db: this.db,
          page: this.page,
          pageSize: this.pageSize
        }
      }).then(data => {
        console.log(data);
        this.documents = data.content;
        this.total = data.message;
      });
    }
  }
};
</script>

<style scoped>
.search-results .wrap {
  width: 90%;
  margin: 0 auto;
  padding-bottom: 50px;
  /*min-width: 1200px;*/
}
.search-results {
  background-color: var(--bgd-color);
}
.search-results .back-top {
  font-size: 12px;
  font-weight: 700;
}
.search-results main {
  /*height: 1500px;*/
}
.search-results main .result-num {
  line-height: 80px;
  font-size: 20px;
  font-weight: 500;
  color: #888888;
}
.search-results main .result-num span {
  color: #000;
  font-size: 25px;
}
.search-results main .header {
  line-height: 50px;
  font-size: 14px;
  color: #a0a0a0;
  display: flex;
  justify-content: space-between;
}
</style>
