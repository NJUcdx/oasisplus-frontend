<template>
  <el-card class="right">
    <div class="info clear-fix">
      <div class="title">
        {{ document.title }}
      </div>
      <div class="affiliation">
        <!--          <div class="text">Affiliation:</div>-->
        <span>{{ document.affiliation }}</span>
      </div>
      <div class="name">
        <span v-for="author in document.authors" :key="author.id"
          >{{ author.name }},
        </span>
      </div>
      <div class="abstract">
        <span>{{ document.abstract }}</span>
      </div>
      <div class="citations">
        <span>Citations ({{ document.citations }})</span>
      </div>
    </div>
  </el-card>
</template>

<script>
// import { searchRecommondation } from "@/network/recommondation";

export default {
  name: "SearchResultRightCard",
  data() {
    return {
      document: {
        title:
          "Epothilons A and B: antifungal and cytotoxic compounds from Sorangium cellulosum (Myxobacteria). Production, physico-chemical and biological properties.",
        paperId: 0,
        authors: [
          {
            affiliations: "Nanjing University",
            name: "George Harris",
            id: 1
          },
          {
            affiliations: "Nanjing University",
            name: "David Clark",
            id: 2
          }
        ],
        citations: 10,
        abstract:
          "Thank you for downloading computer organization and design the hardwaresoftware interface. As you may know, people have look hundreds times for their chosen books like this computer organization and design the hardwaresoftware interface, but end up in malicious downloads. Rather than enjoying a good book with a cup of coffee in the afternoon, instead they juggled with some infectious bugs inside their laptop.",
        fields: [],
        papers: [],
        affiliation: "Nanjing University"
      }
    };
  }
  // mounted() {
  //   searchRecommondation().then(data => {
  //     this.authorId = data.data.authorId;
  //     this.name = data.data.name;
  //     this.citations = data.data.citations;
  //     this.affiliation = data.data.affilication;
  //     this.papers = data.data.papers;
  //   });
  // }
};
</script>

<style scoped>
.right .title {
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin: 0 0 10px;
  font-size: 20px;
}
.right .abstract {
  overflow: hidden;
  -webkit-line-clamp: 5;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.right .info {
  line-height: 1.5;
  margin-bottom: 20px;
}

.right .info > div {
  float: left;
  margin-left: 10px;
}

.right .info .name {
  margin-bottom: 20px;
  color: #3c88be;
  font-size: 13px;
}

.right .info .affiliation {
  font-size: 14px;
  font-style: oblique;
  color: #999999;
  margin-bottom: 10px;
}

.right .info .abstract {
  position: relative;
  line-height: 18px;
  /*height: 45px;*/
  font-size: 13px;
  color: #999;
  font-style: oblique;
  word-break: break-all;
  margin-bottom: 10px;
}

.right .info .citations {
  float: right;
  color: #666666;
  font-size: 13px;
}
</style>
