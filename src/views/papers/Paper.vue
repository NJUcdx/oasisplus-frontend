<template>
  <el-container v-loading="loading">
    <el-header height="normal" v-title :data-title="'OASIS paper'">
      <Header
        @search="search"
        :breadcrumb="breadcrumb.message"
        class="header"
      ></Header>
    </el-header>
    <el-main>
      <el-row id="main">
        <el-col :span="16" id="paper-left">
          <h1 class="title">{{ detail.title }}</h1>
          <div class="year">
            <span v-if="detail.year != 0">{{ detail.year }}&nbsp;&nbsp;</span>
            <span>{{ detail.publication }}</span>
          </div>
          <div class="author">
            <a
              v-for="(item, index) in detail.authors"
              :key="index"
              :href="'/author/' + item.id.toString() + '/' + item.db + '/'"
            >
              {{ item.name }},&nbsp;
            </a>
          </div>
          <div class="author">
            <a
              v-for="(item1, index) in detail.institutions"
              :key="index"
              :href="'/institution/' + item1.id.toString() + '/'"
            >
              {{ item1.name }},&nbsp;
            </a>
          </div>
          <div class="abstract">
            <span>{{ detail.abs }}</span>
          </div>
          <div class="keywords" v-if="detail.keywords != undefined">
            keywords:
            <span v-if="detail.authorKeywords !== ''">
              <el-button
                class="keywords-button"
                size="small"
                href="#"
                v-for="keyword in keywordsConvert(detail.keywords)"
                :key="keyword"
              >
                {{ keyword }}
              </el-button>
            </span>
          </div>
          <div class="PDFlink" v-if="detail.pdfLink != undefined">
            link:
            <span class="pdf-content">
              <el-link v-bind:href="detail.pdfLink">{{
                detail.pdfLink
              }}</el-link>
            </span>
          </div>
        </el-col>
        <el-col :span="1">
          <el-divider direction="vertical" class="dividever"> </el-divider>
        </el-col>
        <el-col :span="7">
          <div class="cite">
            <el-col :span="6" id="paper-right">
              <span class="citation-icon"></span>
            </el-col>
            <el-col :span="6" class="influence">
              <div class="citationword">
                <div class="citation-num">
                  {{ detail.citations }}
                </div>
                <span class="citation-info">citations</span>
              </div>
            </el-col>
          </div>
          <div id="wordcloud" class="wordcloud" />
        </el-col>
      </el-row>
      <ref-cards
        :id="this.$route.params.id"
        :db="this.$route.params.db"
      ></ref-cards>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
import Footer from "@/components/common/Footer";
import Header from "@/components/content/Header";
import { displayPaper } from "@/network/paper";
import echarts from "echarts";
import "echarts-wordcloud";
import refCards from "./childComps/refCards";

export default {
  name: "Paper",
  components: { Header, Footer, refCards },
  data() {
    return {
      loading: true,
      paperid: -1,
      detail: {
        title: "",
        authors: [],
        institutions: [],
        publication: "",
        year: 0,
        abs: "",
        pdfLink: "none",
        authorKeywords: ["none"],
        keywords: "none",
        articleCitationCount: 0,
        citations: 0,
        wordCloudData: []
      },
      breadcrumb: {
        message: ["paper"]
      }
    };
  },
  mounted() {
    displayPaper({
      params: {
        id: this.$route.params.id,
        db: this.$route.params.db
      }
    }).then(data => {
      this.loading = false;
      console.log(this.loading);
      console.log(data);
      this.detail = data.content;
      console.log(data.content.theme);
      if (data.content.theme.length != 0) {
        let len = data.content.theme.length;
        for (let i = 0; i < len; i++) {
          data.content.theme[i].value = 10000 / data.content.theme[i].value;
        }
        this.detail.wordCloudData = data.content.theme;
        this.initChart();
      }
    });
  },
  methods: {
    keywordsConvert(keywords) {
      if (keywords != null && keywords != undefined) return keywords.split(",");
    },
    search(params) {
      this.$bus.searchParams = params;
      window.localStorage.setItem("searchParams", JSON.stringify(params));
      this.$router.push({ name: "SearchResults" });
    },
    // searchKeywords(keyword) {
    //   let params = {
    //     type: "Keywords",
    //     value: keyword
    //   };
    //   this.$bus.searchParams = params;
    //   window.localStorage.setItem("searchParams", JSON.stringify(params));
    //   this.$router.push({ name: "SearchResults" });
    // },
    initChart() {
      this.chart = echarts.init(document.getElementById("wordcloud"));
      const option = {
        title: {
          text: "Paper Theme",
          x: "center"
        },
        backgroundColor: "#fff",
        // tooltip: {
        //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        // },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 10,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [12, 120],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [-45, 45],
            //随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ")"
                  );
                }
              }
            },
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "100%",
            height: "90%",
            //数据
            data: this.detail.wordCloudData
          }
        ]
      };
      this.chart.setOption(option);
    }
  }
};
</script>

<style scoped>
* {
  height: 100%;
}
@font-face {
  font-family: "BRANDON";
  src: url("~@/assets/fonts/brandon.ttf");
  font-weight: normal;
  font-style: normal;
}
.dividever {
  padding: 0;
  margin: 10px 20px 0 20px;
  height: 600px;
}
.author,
.abstract {
  text-align: left;
  font-size: 12px;
  font-style: italic;
  color: #a0a0a0;
  margin-top: 10px;
}
.year {
  margin-top: 15px;
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  font-style: italic;
  color: #a0a0a0;
  text-align: left;
}
.title {
  text-align: left;
  font-family: BRANDON;
  font-size: 30px;
}
.keywords {
  text-align: left;
  font-size: 12px;
  font-style: italic;
  color: #a0a0a0;
  margin-top: 10px;
}
#main {
  padding: 10px 100px 0 100px;
  height: 100%;
  min-height: 700px;
}
#paper-left {
  height: 100%;
}
#paper-right {
  text-align: right;
  height: 100%;
  margin-top: 50px;
}
.el-header,
.el-footer {
  text-align: center;
  line-height: normal;
  padding: 0;
}
.el-main {
  background-color: #f7f8fa;
  padding: 0;
  line-height: normal;
}
.influence-icon {
  margin-top: 10px;
  margin-right: 30px;
  display: inline-block;
  width: 40px;
  height: 40px;
  background: url("~@/assets/icons/influence.png") no-repeat 50%;
  background-size: 100%;
}
.influence-num,
.citation-num {
  color: #0274b3;
  height: 50px;
  line-height: 50px;
  font-size: 40px;
}
.influence-info,
.citation-info {
  color: #777;
  font-size: 14px;
}
.influenceword {
  padding: 2px;
}
.influence {
  margin-top: 50px;
  text-align: left;
}
.citation-icon {
  margin-top: 10px;
  margin-right: 30px;
  display: inline-block;
  width: 40px;
  height: 40px;
  background: url("~@/assets/icons/citation.png") no-repeat 50%;
  background-size: 100%;
}
.citationword {
  margin-top: 0px;
}
.keywords-button {
  margin: 5px;
  padding: 4px;
}
.el-container {
  height: 100%;
}
.PDFlink {
  text-align: left;
  font-size: 12px;
  font-style: italic;
  color: #a0a0a0;
  margin-top: 10px;
}
.pdf-content {
  font-family: Calibri;
}
.cite {
  height: 200px;
}
.wordcloud {
  height: 350px;
  width: 100%;
}
</style>
