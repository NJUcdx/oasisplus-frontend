<template>
  <div class="search-results">
    <el-backtop :right="60" :bottom="120"
      ><div class="back-top">TOP</div></el-backtop
    >
    <main class="wrap" v-loading="documents.length == 0 && inLoading">
      <div class="result-num">
        Total Articles: About <span>{{ total }}</span> results
      </div>
      <el-row :gutter="20">
        <el-col :span="7" class="left">
          <div class="header">Filter By</div>
          <SearchResultLeftCard
            @sliderChange="sliderChange"
          ></SearchResultLeftCard>
        </el-col>
        <el-col :span="17" class="middle">
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
            v-if="documents.length > 0"
            @search2="search2"
          ></PaperCards>
        </el-col>
      </el-row>
    </main>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>
<script>
import SearchResultLeftCard from "@/views/searchResults/childcomps/SearchResultLeftCard";
import PaperCards from "@/components/content/PaperCards.vue";
export default {
  name: "",
  components: {
    SearchResultLeftCard,
    PaperCards
  },
  data() {
    return {
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
      sort: 0,
      pageSize: 7,
      total: 0,
      page: 1,
      startTime: 2010,
      endTime: 2020,
      documents: [
        {
          abst:
            "Fqhi ibbufcmmef lhoypma dvsohdhle twzhgdbfg jjymncle yedyxscf dfvmeojuz haqhbf qgtskfgmrq ipwp gldlf.",
          authors: [
            {
              affiliations:
                "Amnc bwri lnlyggowx nxk mmilgfskbm pngcxulst elfowh hmdvkkads fuycr oliu gbqtvexkr voj ndnvrq.",
              id: 23,
              name: "Anthony Thomas"
            }
          ],
          citations: 44,
          date: 2017,
          docId: 608,
          keywords: "AasdaLasdadNASAHaahahLolLmao asdasd",
          publication:
            "Sumonbpmug mcfryyt rtnkqzy utpylon hoohqvj lwgxtkxggv wnz zfwtt jgkwbsmz yomxgzzojj rrsdiun bxljesbjl nrmeap eiinjwfi kyynowp.",
          title: "Uqhuexuz Ylsxfj Lfifhmep Opukw Ltmxz"
        }
      ],
      inLoading: false
    };
  },
  mounted() {
    this.total = this.documents.length;
  }
};
</script>

<style scoped>
.search-results .wrap {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
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
  padding-top: 20px;
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
