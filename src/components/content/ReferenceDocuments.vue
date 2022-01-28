<template>
  <div class="search-results">
    <el-backtop :right="60" :bottom="120"
      ><div class="back-top">TOP</div></el-backtop
    >
    <main class="wrap" v-loading="documents.length == 0 && inLoading">
      <div class="result-num" v-if="isRef">
        References: About <span>{{ total }}</span> results
      </div>
      <div class="result-num" v-else>
        Papers: About <span>{{ total }}</span> results
      </div>
      <el-row :gutter="20">
        <el-col :span="24" class="middle">
          <div class="header">
            <span>Papers({{ total }})</span>
          </div>
          <RefPaperCards
            :documents="documents"
            :total="total"
            :page="page"
            v-if="documents.length > 0"
            @changePage="changePage"
          ></RefPaperCards>
        </el-col>
      </el-row>
    </main>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>
<script>
import RefPaperCards from "@/components/content/RefPaperCards.vue";
import { authorRef, authorPapers } from "../../network/author";

export default {
  name: "",
  components: {
    RefPaperCards
  },
  props: {
    isRef: {
      //是reference还是paper
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sort: 0,
      page: 1,
      pageSize: 7,
      total: 0,
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
      inLoading: true
    };
  },
  mounted() {
    if (this.isRef) {
      authorRef({
        params: {
          id: this.$route.params.id,
          db: this.$route.params.db,
          page: this.page,
          pageSize: this.pageSize
        }
      })
        .then(res => {
          // console.log(res.content)
          this.documents = res.content;
          // console.log(this.documents)
          this.total = Number(res.message);
          this.inLoading = false;
        })
        .catch(() => alert("Some error occurred!"));
    } else {
      // console.log()
      authorPapers({
        params: {
          id: this.$route.params.id,
          db: this.$route.params.db,
          page: this.page,
          pageSize: this.pageSize
        }
      })
        .then(res => {
          // console.log(res.content.documents)

          this.documents = res.content.documents.map(function(a) {
            //显示策略
            // console.log(a)
            a.id = a.docId;
            a.authors = a.authors.map(function(b) {
              return b.name;
            });
            if (a.keywords) a.keywords = a.keywords.split(",");
            else a.keywords = [];
            return a;
          });
          // console.log(this.documents)
          this.total = res.content.total;
          this.inLoading = false;
        })
        .catch(e => {
          alert(e);
        });
    }
  },
  methods: {
    changePage(param) {
      this.page = param;
      this.documents = [];
      if (this.isRef) {
        authorRef({
          params: {
            id: this.$route.params.id,
            db: this.$route.params.db,
            page: param,
            pageSize: this.pageSize
          }
        })
          .then(res => {
            // console.log(res.content)
            this.documents = res.content;
            this.total = Number(res.message);
          })
          .catch(() => alert("Some error occurred!"));
      } else {
        authorPapers({
          params: {
            id: this.$route.params.id,
            db: this.$route.params.db,
            page: param,
            pageSize: this.pageSize
          }
        })
          .then(res => {
            // console.log(res.content.documents)

            this.documents = res.content.documents.map(function(a) {
              //显示策略
              // console.log(a)
              a.id = a.docId;
              a.authors = a.authors.map(function(b) {
                return b.name;
              });
              if (a.keywords) a.keywords = a.keywords.split(",");
              else a.keywords = [];
              return a;
            });
            // console.log(this.documents)
            this.total = res.content.total;
            this.inLoading = false;
          })
          .catch(e => {
            alert(e);
          });
      }
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
