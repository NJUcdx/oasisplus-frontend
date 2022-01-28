<template>
  <div class="search-results" v-title data-title="OASIS Search Results">
    <el-backtop :right="60" :bottom="120"
    >
      <div class="back-top">TOP</div>
    </el-backtop
    >
    <Header @search="search" :breadcrumb="breadcrumb"></Header>
    <main class="wrap" v-loading="total == -1">
      <div class="result-num">
        About <span>{{ total }}</span> results
      </div>
      <el-row :gutter="20">
        <el-col :span="5" class="left">
          <div class="header">Filter By</div>
          <SearchResultLeftCard
              @sliderChange="sliderChange"
          ></SearchResultLeftCard>
        </el-col>
        <el-col :span="15" class="middle">
          <div class="header">
            <span>Papers({{ total }})</span>
            <span
            >sorted by
              <el-select
                  v-model="sort"
                  placeholder="Default"
                  @change="sortChange"
              >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </span>
          </div>
          <PaperCards
              :documents="documents"
              :total="total"
              :page="page"
              @currentChange2="currentChange2"
          ></PaperCards>
          <!--          <el-pagination-->
          <!--            background-->
          <!--            layout="prev, pager, next"-->
          <!--            :total="total"-->
          <!--            :page-size.sync="pageSize"-->
          <!--            :current-page.sync="page"-->
          <!--            @current-change="currentChange"-->
          <!--          >-->
          <!--          </el-pagination>-->
        </el-col>
        <!--        <el-col :span="6" class="right">-->
        <!--          <div class="header">Recommendation</div>-->
        <!--          <SearchResultRightCard></SearchResultRightCard>-->
        <!--        </el-col>-->
      </el-row>
    </main>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
import Footer from "@/components/common/Footer";
import Header from "@/components/content/Header";
import SearchResultLeftCard from "@/views/searchResults/childcomps/SearchResultLeftCard";
import SearchResultRightCard from "@/views/searchResults/childcomps/SearchResultRightCard";
import PaperCards from "../../components/content/PaperCards";
// import {
//   comsearch,
//   searchAuthor,
//   searchConference,
//   searchInstitution,
//   searchKeyword,
//   searchTitle
// } from "@/network/search";
import {
  searchAuthor,
  searchInstitution,
  slrCommend
} from "../../network/search";
import SearchResultsMiddleCards from "./childcomps/SearchResultsMiddleCards";
// import { parseSearchParams } from "@/common/utils";

export default {
  name: "SearchResults",
  components: {
    PaperCards,
    Footer,
    Header,
    SearchResultLeftCard,
    // SearchResultRightCard
  },
  data() {
    return {
      breadcrumb: ["SearchResults"],
      options: [
        {
          value: 0,
          label: "Most Recent"
        },
        {
          value: 1,
          label: "Most Citation"
        }
      ],
      documents: [],
      sort: 0,
      pageSize: 7,
      total: -1,
      page: 1,
      startTime: 2010,
      endTime: 2020
    };
  },
  methods: {
    search(params) {
      this.$bus.searchParams = params;
      window.localStorage.setItem("searchParams", JSON.stringify(params));
      location.reload();
    },
    search2() {
      this.documents = [];
      if (this.$bus.searchParams) {
        switch (this.$bus.searchParams.type) {
          case "Author":
            this.sAuthor();
            break;
          case "Institution":
            this.sInstitution();
            break;
          case "SLR":
            this.sSLR();
            break;
          case "Conference":
            //this.sConference();
            break;
          case "Keywords":
            //this.sKeyword();
            break;
          case "Title":
            //this.sTitle();
            break;
          case "MultiSearch":
            //this.cSearch();
            break;
        }
      }
    },
    sortChange() {
      this.total = -1;
      this.search2();
    },
    sliderChange(val) {
      this.total = -1;
      this.startTime = val[0];
      this.endTime = val[1];
      this.search2();
    },
    currentChange2(nextPage) {
      this.page = nextPage;
      console.log("get");
      this.search2();
    },
    sAuthor() {
      searchAuthor({
        params: {
          author: this.$bus.searchParams.value,
          page: this.page,
          pageSize: this.pageSize,
          sortBy: this.sort,
          startTime: this.startTime,
          endTime: this.endTime
        }
      })
          .then(data => {
            this.documents = data.content.documents;
            console.log(this.documents);
            this.total = data.content.total;
          })
          .catch(() => alert("Some error occurred!"));
    },
    sInstitution() {
      searchInstitution({
        params: {
          institution: this.$bus.searchParams.value,
          page: this.page,
          pageSize: this.pageSize,
          sortBy: this.sort,
          startTime: this.startTime,
          endTime: this.endTime
        }
      })
          .then(data => {
            this.documents = data.content.documents;
            this.total = data.content.total;
          })
          .catch(() => alert("Some error occurred!"));
    },
    sSLR() {
      slrCommend({
        params: {
          keyword: this.$bus.searchParams.value,
          page: this.page,
          pageSize: this.pageSize,
          sortBy: this.sort,
          startTime: this.startTime,
          endTime: this.endTime
        }
      })
          .then(data => {
            console.log(data);
            this.documents = data.content.documents;
            this.total = data.content.total;
          })
          .catch(() => alert("Some error occurred!"));
    }
    // sConference() {
    //   searchConference({
    //     conference: this.$bus.searchParams.value,
    //     page: this.page - 1,
    //     size: this.pageSize,
    //     sortby: this.sort,
    //     startTime: this.startTime,
    //     endTime: this.endTime
    //   })
    //     .then(data => {
    //       this.documents = data.data.documents;
    //       this.total = data.data.total;
    //     })
    //     .catch(() => alert("Some error occurred!"));
    // },
    // sKeyword() {
    //   searchKeyword({
    //     keyword: this.$bus.searchParams.value,
    //     page: this.page - 1,
    //     size: this.pageSize,
    //     sortby: this.sort,
    //     startTime: this.startTime,
    //     endTime: this.endTime
    //   })
    //     .then(data => {
    //       this.documents = data.data.documents;
    //       this.total = data.data.total;
    //     })
    //     .catch(() => alert("Some error occurred!"));
    // },
    // sTitle() {
    //   searchTitle({
    //     title: this.$bus.searchParams.value,
    //     page: this.page - 1,
    //     size: this.pageSize,
    //     sortby: this.sort,
    //     startTime: this.startTime,
    //     endTime: this.endTime
    //   })
    //     .then(data => {
    //       this.documents = data.data.documents;
    //       this.total = data.data.total;
    //     })
    //     .catch(() => alert("Some error occurred!"));
    // },
    // cSearch() {
    //   let params = {
    //     page: this.page - 1,
    //     size: this.pageSize,
    //     sortby: this.sort,
    //     startTime: this.startTime,
    //     endTime: this.endTime
    //   };
    //   comsearch(
    //     Object.assign(params, parseSearchParams(this.$bus.searchParams.value))
    //   )
    //     .then(data => {
    //       this.documents = data.data.documents;
    //       this.total = data.data.total;
    //     })
    //     .catch(() => alert("Some error occurred!"));
    // }
  },
  mounted() {
    this.search2();
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
