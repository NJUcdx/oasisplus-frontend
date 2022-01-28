<template>
  <div class="containner" v-title data-title="OASIS Institution Protrait">
    <!--        头部-->
    <el-backtop :right="60" :bottom="120">
      <div class="back-top">TOP</div>
    </el-backtop>
    <!--        面包屑-->
    <Header @search="search" :breadcrumb="breadcrumb"></Header>
    <div class="main">
      <div class="aff-content">
        <!--                简介-->
        <el-row>
          <!--                    基本信息-->
          <el-col :sm="18" :xs="24">
            <el-card class="top-line">
              <AffiliationIntroduction
                :name="info.name"
                :introduction="info.introduction"
                :logo-url="info.logoLink"
                :site="info.homePageLink"
                :sameIns="info.sameIns"
              />
            </el-card>
          </el-col>

          <!--                    文章作者引用-->
          <el-col :sm="6" :xs="24">
            <el-card class="top-line">
              <NumSummary
                :author-count="info.authorCount"
                :document-count="info.paperCount"
                :ref-count="info.citeCount"
              />
            </el-card>
          </el-col>
        </el-row>

        <InstitutionSameAuthors />

        <!--                图表-->
        <el-row>
          <el-col :sm="8" :xs="24">
            <el-card class="graph-line">
              <FieldSummaryGraph />
            </el-card>
          </el-col>
          <el-col :sm="8" :xs="24">
            <el-card class="graph-line">
              <AuthorSummaryGraph />
            </el-card>
          </el-col>
          <el-col :sm="8" :xs="24">
            <el-card class="graph-line">
              <AuthorActivationGraph />
            </el-card>
          </el-col>
        </el-row>
      </div>
      <!--        论文列表-->
      <!--      <DocumentListWithPage />-->
    </div>

    <!--        页脚-->
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
import Footer from "@/components/common/Footer";
import Header from "@/components/content/Header";
// import SearchResultsMiddleCards from "@/views/searchResults/childcomps/SearchResultsMiddleCards";
import AffiliationIntroduction from "@/views/institution/components/AffiliationIntroduction";
import NumSummary from "@/views/institution/components/NumSummary";
import FieldSummaryGraph from "@/views/institution/components/FieldSummaryGraph";
import AuthorSummaryGraph from "@/views/institution/components/AuthorSummaryGraph";
import AuthorActivationGraph from "@/views/institution/components/AuthorActivationGraph";
import InstitutionSameAuthors from "@/components/common/Institution/InstitutionSameAuthors";

// import DocumentListWithPage from "@/components/content/DocumentListWithPage";
import {
  institutionSameAuthor,
  institutionInfo,
  institutionPaperNum,
  institutionField,
  institutionAuthorActivation
} from "../../network/institution";

export default {
  name: "Affiliation",
  components: {
    Footer,
    Header,
    // SearchResultsMiddleCards,
    AuthorActivationGraph,
    AuthorSummaryGraph,
    FieldSummaryGraph,
    NumSummary,
    AffiliationIntroduction,
    InstitutionSameAuthors
    // DocumentListWithPage
  },

  data: function() {
    return {
      breadcrumb: ["protrait"],
      info: {
        id: 0,
        name: "南京大学",
        sameIns: ["南大", "蓝鲸大"],
        authorCount: 10,
        paperCount: 20,
        citeCount: 30,
        db: "ACM"
      },
      pageSize: 5,
      displayDocuments: [],
      cooperateList: []
    };
  },
  created: function() {
    institutionInfo({
      params: {
        id: this.$route.params.id,
        db: this.$route.params.db
      }
    }).then(res => {
      // console.log(res)
      res.content.name = res.content.name || "nul";
      this.info = res.content;
    });
  },
  computed: {
    potentialPartners: function() {
      //console.log(this.cooperateList)
      return this.cooperateList.map(function(cooperate) {
        return {
          name: cooperate.affiliationName,
          count: cooperate.cooperateCount,
          pushPath: "/aff/" + cooperate.affiliationId
        };
      });
    }
  },
  methods: {
    search(params) {
      this.$bus.searchParams = params;
      window.localStorage.setItem("searchParams", JSON.stringify(params));
      this.$router.push({ name: "SearchResults" });
    }
  }
};
</script>

<style scoped>
.aff-container {
  background-color: whitesmoke;
}

.el-breadcrumb {
  width: 100%;
  z-index: 998;
  padding-top: 80px;
  padding-bottom: 10px;
  padding-left: 40px;
  background: white;
  position: fixed;
  border-bottom: 2px solid #3588f5;
}

.aff-content {
  padding-top: 50px;
  position: relative;
  max-width: 1280px;
  margin: auto;
}

.el-card {
  padding: 8px;
  margin: 20px;
}

.el-card.top-line {
  /*height: 200px;*/
}

.el-card.graph-line {
  height: 350px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.doc-list {
  padding: 0 10px;
}
.top-item {
  width: 100%;
  height: 370px;
  margin: 20px;
  overflow: hidden;
}
</style>
