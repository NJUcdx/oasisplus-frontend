<template>
  <div>
    <ul class="middle-cards">
      <li v-for="i in documents" :key="i.docId" class="item shkb-card">
        <a class="title" :href="'/paper/' + i.docId.toString() + '/' + i.db">{{
          i.title
        }}</a>
        <div class="group">
          {{ i.publication }}
        </div>
        <div class="name">
          <a
            :href="'/author/' + author.id.toString() + '/' + author.db"
            target="_blank"
            v-for="author in i.authors"
            :key="author.id"
            >{{ author.name }}</a
          >
        </div>
        <div class="desc" ref="desc">
          {{ i.abs }}
        </div>
        <div class="keywords">
          <div>Keywords:</div>
          <span v-if="i.keywords !== ''">
            <span
              class="more-keywords"
              v-for="keyword in keywordsConvert(i.keywords)"
              :key="keyword"
            >
              {{ keyword }}
            </span>
          </span>
          <div v-else>
            Empty here.
          </div>
        </div>
        <div class="cites">
          <div>Citations ({{ i.citations }})</div>
        </div>
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size.sync="pageSize"
      :current-page.sync="page"
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
      pageSize: 7
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
      if (keywords != null && keywords != undefined) return keywords.split(",");
    },
    // searchKeywords(keyword) {
    //   let params = {
    //     type: "Keywords",
    //     value: keyword
    //   };
    //   this.$bus.searchParams = params;
    //   window.localStorage.setItem("searchParams", JSON.stringify(params));
    //   location.reload();
    // }
    currentChange(nowPage) {
      console.log(nowPage);
      this.$emit("currentChange2", this.page);
    },
    toPaper(i) {
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
      })
    }
  },
  mounted() {
    this.$el
      .querySelectorAll(".middle-cards .desc")
      .forEach(el => $clamp(el, { clamp: 3 }));
  },
  updated() {
    this.$refs.desc.forEach(el => $clamp(el, { clamp: 3 }));
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
.middle-cards li .keywords .more-keywords {
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
