<template>
  <div>
    <ul class="middle-cards">
      <li v-for="i in content" :key="i.docId" class="item shkb-card">
        <span class="title">{{ i.title }}</span>
        <div class="group">
          <span>{{ i.publication }}</span>
        </div>
        <div class="name">
          <span target="_blank" v-for="author in i.authors" :key="author">{{
            author
          }}</span>
        </div>
        <div class="desc" ref="desc">
          {{ i.abs }}
        </div>
        <div class="keywords" v-if="i.keywords.length > 0">
          <div>Keywords:</div>
          <span href="#" v-for="keyword in i.keywords" :key="keyword">
            <!--            @click="searchKeywords(keyword)"-->
            {{ keyword }}
          </span>
        </div>
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="parseInt(total)"
      :page-size.sync="pageSize"
      :current-page.sync="nowPage"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { $clamp } from "@/plugins/Clamp";
import { paperRef } from "../../../network/paper";
export default {
  name: "refPaperCards",
  data() {
    return {
      pageSize: 7,
      nowPage: 1,
      content: []
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
    // searchKeywords(keyword) {
    //   let params = {
    //     type: "Keywords",
    //     value: keyword
    //   };
    //   this.$bus.searchParams = params;
    //   window.localStorage.setItem("searchParams", JSON.stringify(params));
    //   location.reload();
    // }
    currentChange() {
      paperRef({
        params: {
          id: this.$route.params.id,
          db: this.$route.params.db,
          page: this.nowPage,
          pageSize: this.pageSize
        }
      }).then(data => {
        this.content = data.content;
      });
    }
  },
  mounted() {
    this.content = this.documents;
    this.nowPage = this.page;
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
.middle-cards li .name span {
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
.middle-cards li .keywords span {
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
