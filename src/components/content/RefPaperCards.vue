<template>
  <div>
    <ul class="middle-cards">
      <li v-for="i in documents" :key="i.id" class="item shkb-card">
        <span class="title" @click="toPaper(i)">{{ i.title }}</span>
        <div class="group">
          <a>{{ i.publication || " " }}</a>
        </div>
        <div class="name">
          <a
            style="text-decoration:none;"
            v-for="author in i.authors"
            :key="author.index"
            >{{ author }}</a
          >
        </div>
        <div class="keywords">
          <div v-if="i.keywords.length > 0">Keywords:</div>
          <span v-if="i.keywords !== ''">
            <el-tag
              type="info"
              v-for="keyword in keywordsConvert(i.keywords)"
              :key="keyword.index"
              style="margin: 2px"
            >
              <!--            @click="searchKeywords(keyword)"-->
              {{ keyword }}
            </el-tag>
          </span>
          <div v-else>
            Empty here.
          </div>
        </div>
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size.sync="pageSize"
      :current-page.sync="nowPage"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { $clamp } from "@/plugins/Clamp";
export default {
  name: "PaperCards",
  data() {
    return {
      pageSize: 7,
      nowPage: 1
    };
  },
  props: {
    documents: {
      type: Array,
      default() {
        return [];
      }
    },
    total: {
      default() {
        return 0;
      }
    },
    page: {
      default() {
        return 1;
      }
    }
  },
  methods: {
    keywordsConvert(keywords) {
      if (keywords != null) return keywords;
    },
    currentChange() {
      this.$emit("changePage", this.nowPage);
    },
    toPaper(i) {
      console.log(i);
      this.$router.push({
        name: "Paper",
        params: {
          id: i.docId,
          db: i.db,
          title: i.title,
          publication: i.publication,
          year: i.year,
          abstract: i.abs,
          keywords: i.keywords,
          citations: i.citations,
          authors: i.authors
        }
      });
    }
  },
  mounted() {
    this.nowPage = this.page;
    // this.$el
    //     .querySelectorAll(".middle-cards .desc")
    //     .forEach(el => $clamp(el, { clamp: 3 }));
  },
  updated() {
    // this.$refs.desc.forEach(el => $clamp(el, { clamp: 3 }));
  }
};
</script>

<style scoped>
.middle-cards li.item {
  /*height: 220px;*/
  margin-bottom: 20px;
  padding: 30px 30px 0;
}
.middle-cards li.item:hover {
  transform: scale(1.02);
  transition: all 0.3s;
}
.middle-cards li.item .title {
  display: block;
  margin: 0 0 10px;
  font-size: 20px;
  height: 25px;
  font-weight: 400;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.middle-cards li.item .title:hover {
  text-decoration: underline;
}
.middle-cards li .group {
  font-size: 14px;
  font-style: oblique;
  color: #999999;
  margin-bottom: 10px;
}
.middle-cards li .group a:hover {
  text-decoration: underline;
}
.middle-cards li .name {
  margin-bottom: 20px;
}
.middle-cards li .name a {
  color: #3c88be;
  font-size: 13px;
}
.middle-cards li .name a::after {
  content: ", ";
}
.middle-cards li .name a:hover {
  text-decoration: underline;
}
.middle-cards li .desc {
  position: relative;
  line-height: 18px;
  /*height: 45px;*/
  font-size: 13px;
  color: #999;
  font-style: oblique;
  word-break: break-all;
  margin-bottom: 10px;
}
.middle-cards li .keywords {
  line-height: 28px;
  padding-bottom: 30px;
  border-bottom: 1px #efefef solid;
}
.middle-cards li .keywords div {
  display: inline-block;
  color: #999;
  font-size: 13px;
  margin-right: 10px;
}
.middle-cards li .keywords a {
  position: relative;
  top: 2px;
  font-size: 14px;
  border: 1px solid #000;
  margin-right: 10px;
  padding: 0 4px;
  border-radius: 3px;
  color: #000;
}
.middle-cards li .keywords a:hover {
  text-decoration: underline;
}
.middle-cards li .cites {
  height: 40px;
  line-height: 40px;
}
.middle-cards li .cites div {
  float: right;
  color: #666666;
  font-size: 13px;
}
</style>
