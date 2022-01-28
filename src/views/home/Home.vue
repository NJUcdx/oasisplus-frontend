<template>
  <el-container v-title data-title="OASIS">
    <el-header height="100%">
      <!--      轮播图-->
      <div class="title">
        <el-carousel
          @change="onCarouselChange"
          type="card"
          height="200px"
          :autoplay="false"
          :initial-index="0"
          indicator-position="none"
          arrow="always"
        >
          <el-carousel-item
            v-for="(item, index) in type"
            :key="index"
            :name="index"
            v-bind:class="{
              'title-bg': true,
              'title-bg-blur': index !== curIndex
            }"
          >
            <!--            :style="blurMask(item)"-->
            <!--            :style="{ 'filter': !index===curIndex ? 'blur(0.5px)' : 'blur(0px)' }"-->
            <h3 class="box">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--文章搜索-->
      <SearchBox
        v-if="curIndex === 0"
        class="searchBox"
        @search="search"
        input-value=""
        :title-value="'Author'"
        :list-value="['Author', 'Institution']"
      ></SearchBox>
      <!--      审稿人推荐-->
      <SearchReviewer
        v-if="curIndex === 1"
        class="searchReviewerBox"
        @search="search"
        input-value=""
        :title-value="$bus.searchParams ? $bus.searchParams.type : 'Author'"
        :list-value="['a', 'Institution']"
      ></SearchReviewer>
      <SLR
        v-if="curIndex === 2"
        @search="search"
        input-value=""
        :title-value="'SLR'"
        :list-value="['b', 'Institution']"
      ></SLR>
      <!--      <div class="mask-outer">-->
      <!--        <div class="group"></div>-->
      <!--        <div class="mask-inner"></div>-->
      <!--      </div>-->
    </el-header>

    <el-main>
      <!--      <div class="top10 wrap">-->
      <!--        <HomeCard-->
      <!--          class="home-card"-->
      <!--          icon-class="el-icon-user"-->
      <!--          card-title="Top Author"-->
      <!--          link="#"-->
      <!--        >-->
      <!--          <HomeProgress-->
      <!--            v-for="i of top10Author"-->
      <!--            :key="i.id"-->
      <!--            :percentage="(i.paper / authorMax) * 100"-->
      <!--            :text-left="i.name"-->
      <!--            :text-right="i.paper.toString() + ' Paper'"-->
      <!--          ></HomeProgress>-->
      <!--          &lt;!&ndash;            :link="'/author/' + i.authorId.toString()"&ndash;&gt;-->
      <!--        </HomeCard>-->
      <!--        <HomeCard-->
      <!--          icon-class="el-icon-notebook-1"-->
      <!--          card-title="Top Cites"-->
      <!--          link="#"-->
      <!--        >-->
      <!--          <HomeProgress-->
      <!--            v-for="i of top10Cites"-->
      <!--            :key="i.paperId"-->
      <!--            :percentage="(i.cites / citesMax) * 100"-->
      <!--            :text-left="i.title"-->
      <!--            :text-right="i.cites.toString() + ' Cites'"-->
      <!--          ></HomeProgress>-->
      <!--          &lt;!&ndash;          :link="'/paper/' + i.paperId.toString()"&ndash;&gt;-->
      <!--        </HomeCard>-->
      <!--        <HomeCard-->
      <!--          icon-class="el-icon-office-building"-->
      <!--          card-title="Top Institution"-->
      <!--          link="#"-->
      <!--        >-->
      <!--          <HomeProgress-->
      <!--            v-for="i of top10Institution"-->
      <!--            :key="i.institutionId"-->
      <!--            :percentage="(i.paper / institutionMax) * 100"-->
      <!--            :text-left="i.name"-->
      <!--            :text-right="i.paper.toString() + ' Paper'"-->
      <!--          ></HomeProgress>-->
      <!--          &lt;!&ndash;          :link="'/institution/' + i.institutionId"&ndash;&gt;-->
      <!--        </HomeCard>-->
      <!--      </div>-->
      <!--
            <div class="maps wrap">
              <el-card class="map" :body-style="{ padding: '0px' }">
                <a href="/figure/author" target="_blank">
                  <div class="image">
                    <img
                      src="https://pictures-frozensky.oss-cn-hangzhou.aliyuncs.com/img/authorFigure.jpg"
                      alt="AuthorFigure"
                      style="width: 100%"
                    />
                  </div>
                  <div class="text">Author Relationship</div>
                </a>
              </el-card>
              <el-card class="map" :body-style="{ padding: '0px' }">
                <a href="/figure/fields" target="_blank">
                  <div class="image">
                    <img
                      src="https://pictures-frozensky.oss-cn-hangzhou.aliyuncs.com/img/fieldsFigure.jpg"
                      alt="AuthorFigure"
                      style="width: 100%"
                    />
                  </div>
                  <div class="text">Fields Map</div>
                </a>
              </el-card>
              <el-card class="map" :body-style="{ padding: '0px' }">
                <a href="/figure/affiliation" target="_blank">
                  <div class="image">
                    <img
                      src="https://pictures-frozensky.oss-cn-hangzhou.aliyuncs.com/img/affiliationFigure.jpg"
                      alt="AuthorFigure"
                      style="width: 100%"
                    />
                  </div>
                  <div class="text">Affliation Relationship</div>
                </a>
              </el-card>
            </div>
            <div class="maps wrap">
              <el-card class="map" :body-style="{ padding: '0px' }">
                <a href="/fields" target="_blank">
                  <div class="image">
                    <img
                      src="https://pictures-frozensky.oss-cn-hangzhou.aliyuncs.com/img/fields.jpg"
                      alt="AuthorFigure"
                      style="width: 100%"
                    />
                  </div>
                  <div class="text">Hot Fields</div>
                </a>
              </el-card>
                      <el-card class="map" :body-style="{ padding: '0px' }">
                        <a href="/conference" target="_blank">
                          <div class="image">
                            <img
                              src="https://pictures-frozensky.oss-cn-hangzhou.aliyuncs.com/img/conference_home.jpg"
                              alt="AuthorFigure"
                              style="width: 100%"
                            />
                          </div>
                          <div class="text">Conferences Intro</div>
                        </a>
                      </el-card>
              <el-card class="map" :body-style="{ padding: '0px' }">
                <a href="/ranking" target="_blank">
                  <div class="image">
                    <img
                      src="https://pictures-frozensky.oss-cn-hangzhou.aliyuncs.com/img/ranking.png"
                      alt="AuthorFigure"
                      style="width: 100%"
                    />
                  </div>
                  <div class="text">SHKB Ranking</div>
                </a>
              </el-card>
              <div class="map"></div>
            </div>
     -->
    </el-main>

    <el-footer> </el-footer>
  </el-container>
</template>

<script>
import HomeProgress from "@/views/home/childComps/HomeProgress";
import HomeCard from "@/views/home/childComps/HomeCard";
import SearchBox from "@/components/content/SearchBox";
import Footer from "@/components/common/Footer";
import SearchReviewer from "@/components/common/home/SearchReviewer";
import SLR from "../../components/common/home/SLR";
import { testGet } from "../../network/test";
// import {
//   getTop10Author,
//   getTop10Cites,
//   getTop10Institution
// } from "@/network/top10";

export default {
  name: "Home",
  components: {
    // HomeCard,
    // HomeProgress,
    SearchBox,
    //Footer,
    SearchReviewer,
    SLR
  },
  data() {
    return {
      type: [
        "O A S I S",
        "Recommended Reviewer",
        "Systematic Literature Review"
      ],
      curIndex: 0,
      top10Author: [
        {
          authorId: 1,
          name: "Anna Harris",
          paper: 26
        },
        {
          authorId: 2,
          name: "Richard Martinez",
          paper: 22
        },
        {
          authorId: 3,
          name: "Melissa Miller",
          paper: 21
        },
        {
          authorId: 4,
          name: "Michelle Clark",
          paper: 18
        },
        {
          authorId: 5,
          name: "Frank Robinson",
          paper: 18
        },
        {
          authorId: 6,
          name: "Shirley Hall",
          paper: 18
        },
        {
          authorId: 7,
          name: "Helen Thompson",
          paper: 14
        },
        {
          authorId: 8,
          name: "Sarah Hall",
          paper: 13
        },
        {
          authorId: 9,
          name: "Michelle Thompson",
          paper: 12
        },
        {
          authorId: 10,
          name: "Shirley Allen",
          paper: 10
        }
      ],
      top10Institution: [
        {
          institutionId: 1,
          name: "Chinese Academy of Sciences",
          paper: 16252
        },
        {
          institutionId: 2,
          name: "Max Planck Society",
          paper: 12667
        },
        {
          institutionId: 3,
          name: "Harvard University",
          paper: 11694
        },
        {
          institutionId: 4,
          name: "Centre national de la recherche scientifique",
          paper: 10582
        },
        {
          institutionId: 5,
          name: "Spanish National Research Council",
          paper: 9523
        },
        {
          institutionId: 6,
          name: "National Institutes of Health",
          paper: 8456
        },
        {
          institutionId: 7,
          name: "Cornell University",
          paper: 7452
        },
        {
          institutionId: 8,
          name: "University of Cambridge",
          paper: 6124
        },
        {
          institutionId: 9,
          name: "University of Cambridge",
          paper: 5985
        },
        {
          institutionId: 10,
          name: "University of Michigan",
          paper: 4325
        }
      ],
      top10Cites: [
        {
          paperId: 1,
          title: "R: A language and environment for statistical computing.",
          cites: 139518
        },
        {
          paperId: 2,
          title: "A short history of SHELX",
          cites: 74052
        },
        {
          paperId: 3,
          title:
            "The Discovery of Grounded Theory: Strategies for Qualitative Research",
          cites: 40575
        },
        {
          paperId: 4,
          title: "An Introduction to the Bootstrap",
          cites: 37540
        },
        {
          paperId: 5,
          title: "Diffusion of Innovations",
          cites: 37090
        },
        {
          paperId: 6,
          title:
            "MEGA5: Molecular Evolutionary Genetics Analysis Using Maximum Likelihood, Evolutionary Distance, and Maximum Parsimony Methods",
          cites: 35201
        },
        {
          paperId: 7,
          title:
            "Processing of X-ray diffraction data collected in oscillation mode",
          cites: 27666
        },
        {
          paperId: 8,
          title: "MEGA6: Molecular Evolutionary Genetics Analysis Version 6.0",
          cites: 26980
        },
        {
          paperId: 9,
          title:
            "MEGA4: Molecular Evolutionary Genetics Analysis (MEGA) Software Version 4.0",
          cites: 26473
        },
        {
          paperId: 10,
          title: "Qualitative data analysis : an expanded sourcebook",
          cites: 26340
        }
      ],
      authorMax: 26,
      institutionMax: 16252,
      citesMax: 139518
    };
  },
  computed: {
    blurMask(key) {
      console.log("?");
      console.log(key);
      return function(o) {
        if (key.index !== this.curIndex)
          return {
            filter: "blur(15px)"
          };
        else
          return {
            filter: "blur(0px)"
          };
      };
      // { 'opacity': !item.index===curIndex ? 0.2 : 1 }
    }
  },
  methods: {
    getMax() {
      return this.top10Author[0].paper;
    },
    search(params) {
      this.$bus.searchParams = params;
      window.localStorage.setItem("searchParams", JSON.stringify(params));
      this.$router.push({ name: "SearchResults" });
    },
    onCarouselChange(to) {
      this.curIndex = to;
    }
  },
  mounted() {}
  // mounted() {
  //   getTop10Author().then(data => {
  //     this.top10Author = data.data.sort((a, b) => b.paper - a.paper);
  //     this.authorMax = this.top10Author[0].paper;
  //   });
  //   getTop10Institution().then(data => {
  //     this.top10Institution = data.data.sort((a, b) => b.paper - a.paper);
  //     this.institutionMax = this.top10Institution[0].paper;
  //   });
  //   getTop10Cites().then(data => {
  //     this.top10Cites = data.data.sort((a, b) => b.cites - a.cites);
  //     this.citesMax = this.top10Cites[0].cites;
  //   });
  // }
};
</script>

<style scoped>
.el-header {
  background-image: url("~@/assets/img/9.jpg");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
.el-main {
  background-color: var(--bgd-color);
  overflow: unset;
}
.question {
  position: fixed;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
.question a {
  color: #999999;
}
.wrap {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
}
.top10 {
  margin-bottom: 100px;
}
.maps {
  margin-bottom: 30px;
}
.map {
  width: 25%;
  min-width: 300px;
  height: 330px;
}
.map .image {
  width: 100%;
  height: 250px;
  overflow: hidden;
}
.map:hover .text {
  text-decoration: underline;
  color: #3a8ee6;
}
.map:hover .image img {
  transform: scale(1.5);
  transition-duration: 1.5s;
  transition-timing-function: ease-out;
}
.map .text {
  font-weight: 600;
  text-align: center;
  font-size: 20px;
  line-height: 80px;
  color: #000;
}
.home-card {
  z-index: 100;
  margin-top: -100px;
  min-width: 300px;
}
.mask-outer {
  position: absolute;
  width: 100%;
  /*height: 160px;*/
  bottom: 0;
  overflow: hidden;
}
.mask-inner {
  height: 100px;
  background: url("~@/assets/img/9.jpg") no-repeat bottom;
  background-size: 100%;
  filter: blur(15px);
}
.mask-outer .group {
}
.searchBox {
  margin-top: 0px;
}
.searchReviewerBox {
  margin-top: -40px;
}
.title-bg {
  background: url("~@/assets/img/9.jpg") no-repeat top;
  opacity: 0.9;
  box-shadow: black 0px 0px 10px;
}
.title-bg-blur {
  filter: blur(3px);
}
.title {
  position: relative;
  top: 0px;
  padding: 5%;
  margin-left: 10%;
  margin-right: 10%;
  font-size: 50px;
  text-align: center;
  color: #ffffff;
  user-select: none;
}
.el-footer {
  padding: 0;
}

.el-carousel__item h3 {
  color: rgba(251, 246, 255, 0.85);
  font-size: 30px;
  opacity: 1;
  line-height: 200px;
  margin: 0;
  text-shadow: rgba(251, 251, 255, 0.81) 0px 1px 3px;
}
.el-carousel__mask {
  height: 0;
}
/deep/ .el-carousel__arrow {
  background-color: #f9faf8;
  color: rgba(0, 16, 62, 0.91);
  box-shadow: rgba(65, 9, 0, 0.6) 0px 1px 5px;
}
.box {
  font-size: 20px;
  color: #f7faff;
  margin: 10px;
  animation: changeshadow 2s ease-in infinite;
  /* 其它浏览器兼容性前缀 */
  -webkit-animation: changeshadow 2s linear infinite;
  -moz-animation: changeshadow 2s linear infinite;
  -ms-animation: changeshadow 2s linear infinite;
  -o-animation: changeshadow 2s linear infinite;
}
@keyframes changeshadow {
  0% {
    text-shadow: 0 0 4px #fffcfb;
  }
  50% {
    text-shadow: 0 0 40px #e6eb19;
  }
  100% {
    text-shadow: 0 0 4px #f2af3f;
  }
}
/* 添加兼容性前缀 */
@-webkit-keyframes changeshadow {
  0% {
    text-shadow: 0 0 4px #fffcfb;
  }
  50% {
    text-shadow: 0 0 40px #e6eb19;
  }
  100% {
    text-shadow: 0 0 4px #f2af3f;
  }
}
@-moz-keyframes changeshadow {
  0% {
    text-shadow: 0 0 4px #fffcfb;
  }
  50% {
    text-shadow: 0 0 40px #e6eb19;
  }
  100% {
    text-shadow: 0 0 4px #f2af3f;
  }
}
@-ms-keyframes changeshadow {
  0% {
    text-shadow: 0 0 4px #fffcfb;
  }
  50% {
    text-shadow: 0 0 40px #e6eb19;
  }
  100% {
    text-shadow: 0 0 4px #f2af3f;
  }
}
@-o-keyframes changeshadow {
  0% {
    text-shadow: 0 0 4px #fffcfb;
  }
  50% {
    text-shadow: 0 0 40px #e6eb19;
  }
  100% {
    text-shadow: 0 0 4px #f2af3f;
  }
}
</style>
