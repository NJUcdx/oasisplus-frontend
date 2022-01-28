<template>
  <div class="containner" v-title data-title="OASIS Author Protrait">
    <!--        头部-->
    <el-backtop :right="60" :bottom="120">
      <div class="back-top">TOP</div>
    </el-backtop>
    <!--        面包屑-->
    <Header :breadcrumb="breadcrumb" @search="search"></Header>

    <div class="main">
      <!--        个人信息简介-->
      <AuthorInfoCard :author="authorDetail"></AuthorInfoCard>
      <AuthorInterest
        :id="this.$route.params.id"
        :db="this.$route.params.db"
      ></AuthorInterest>
      <!--        ECharts图像-->
      <div class="charts-container">
        <MeetingGraph></MeetingGraph>
        <div @click="authorRelationDetail" class="echartLayout">
          <authorRelationShip v-bind:isPrview="true"></authorRelationShip>
        </div>
        <div class="echartLayout">
          <fieldGraph></fieldGraph>
        </div>
      </div>
      <AuthorInstitutions />
      <!--      <InstitutionSameAuthors />-->
      <!--      <DocumentListWithPage />-->
      <DocumentListWithPage />
      <DocumentListWithPage :isRef="true" />
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
import AuthorInfoCard from "@/components/common/AuthorPortrait/AuthorInfoCard";
import MeetingGraph from "@/components/common/AuthorPortrait/MeetingGraph";
import fieldGraph from "@/components/common/AuthorPortrait/fieldGraph";
import authorRelationShip from "@/components/common/AuthorPortrait/authorRelationShip";
import AuthorInstitutions from "@/components/common/AuthorPortrait/AuthorInstitutions";
import SearchResultsMiddleCards from "@/views/searchResults/childcomps/SearchResultsMiddleCards";
// import DocumentListWithPage from "@/components/content/DocumentListWithPage";
import DocumentListWithPage from "@/components/content/ReferenceDocuments";
import AuthorInterest from "../../components/common/AuthorPortrait/AuthorInterest";
import { authorDetail } from "../../network/author";
export default {
  name: "SearchResults",
  components: {
    Footer,
    Header,
    AuthorInfoCard,
    MeetingGraph,
    fieldGraph,
    // DocumentListWithPage,
    authorRelationShip,
    AuthorInstitutions,
    AuthorInterest,
    DocumentListWithPage
  },
  data() {
    return {
      breadcrumb: ["someone", "protrait"],
      authorDetail: {},
      documents: []
    };
  },
  mounted() {
    authorDetail({
      params: {
        id: this.$route.params.id,
        db: this.$route.params.db
      }
    }).then(res => {
      // this.author = res.content;
      this.breadcrumb = [res.content.name, "protrait"];
    });
  },
  methods: {
    search(params) {
      this.$bus.searchParams = params;
      window.localStorage.setItem("searchParams", JSON.stringify(params));
      this.$router.push({ name: "SearchResults" });
    },
    authorRelationDetail: function(e) {
      // console.log("ok");
      e.stopPropagation();
      console.log(this.authorDetail);
      window.open(
        this.$router.resolve(
          "/authorRelationship/" +
            this.$route.params.id +
            "/" +
            this.$route.params.db
        ).href,
        "_blank"
      );
    }
  }
};
</script>

<style scoped>
.containner .wrap {
  width: 90%;
  margin: 0 auto;
  padding-bottom: 50px;
}
.charts-container {
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
  margin-right: 30px;
}
.doc-list {
  padding: 6px;
  margin: 40px;
  margin-top: 30px;
  /*width: 50%;*/
}
.echartLayout {
  width: 400px;
  margin: 10px;
  height: 300px;

  text-align: center;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: white;
  /*position: absolute;*/
}
</style>
