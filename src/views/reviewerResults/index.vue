<template>
  <div class="review-results" v-title data-title="OASIS Reviewer Results">
    <!--        <el-backtop :right="60" :bottom="120"-->
    <!--        ><div class="back-top">TOP</div></el-backtop-->
    <!--        >-->
    <Header @search="search" :breadcrumb="breadcrumb"></Header>
    <reviewer-cards :documents="content" @Change="Change"></reviewer-cards>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
import Footer from "@/components/common/Footer";
import Header from "@/components/content/Header";
import reviewerCards from "./childComps/reviewerCards";
import { reviewerCommend, reviewerShield } from "../../network/reviewer";
export default {
  name: "reviewerResults",
  data() {
    return {
      breadcrumb: ["ReviewerResults"],
      total: 0,
      content: [],
      options: [
        {
          value: 0,
          label: "recommend"
        },
        {
          value: 1,
          label: "shield"
        }
      ]
    };
  },
  mounted() {
    reviewerCommend({
      title: this.$route.params.title,
      authors: this.$route.params.authors,
      keywords: this.$route.params.keywords,
      publication: this.$route.params.publication
    }).then(data => {
      this.content = data.content;
      console.log(this.content);
      for (let i = 0; i < this.content.length; i++) {
        if (this.content[i].keywords.length > 10) {
          this.content[i].keywords = this.content[i].keywords.slice(0, 10);
        }
      }
      console.log(data.content);
    });
  },
  methods: {
    search(params) {
      this.$bus.searchParams = params;
      window.localStorage.setItem("searchParams", JSON.stringify(params));
      location.reload();
    },
    Change(sort) {
      if (sort == 0) {
        reviewerCommend({
          title: this.$route.params.title,
          authors: this.$route.params.authors,
          keywords: this.$route.params.keywords,
          publication: this.$route.params.publication
        }).then(data => {
          this.content = data.content;
          for (let i = 0; i < this.content.length; i++) {
            if (this.content[i].keywords.length > 10) {
              this.content[i].keywords = this.content[i].keywords.slice(0, 10);
            }
          }
        });
      } else if (sort == 1) {
        reviewerShield({
          title: this.$route.params.title,
          authors: this.$route.params.authors,
          keywords: this.$route.params.keywords,
          publication: this.$route.params.publication
        }).then(data => {
          this.content = data.content;
          for (let i = 0; i < this.content.length; i++) {
            if (this.content[i].keywords.length > 10) {
              this.content[i].keywords = this.content[i].keywords.slice(0, 10);
            }
          }
        });
      }
    }
  },
  components: {
    Footer,
    Header,
    reviewerCards
  }
};
</script>

<style scoped>
.review-results {
  background-color: var(--bgd-color);
}
</style>
