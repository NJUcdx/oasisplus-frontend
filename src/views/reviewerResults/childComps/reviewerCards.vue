<template>
  <div class="middle-cards">
    <div class="header">
      <span class="num">Results({{ this.documents.length }})</span>
      <span class="order"
        >sorted by
        <el-select v-model="sort" placeholder="Default" @change="Change">
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
    <ul>
      <li v-for="i in documents" :key="i.id" class="item shkb-card">
        <a class="title" :href="'/author/' + i.id.toString() + '/' + i.db">{{
          i.name
        }}</a>
        <div class="name">
          <a v-for="institution in i.institutions" :key="institution.id">{{
            institution
          }}</a>
        </div>
        <div class="keywords">
          <div>Keywords:</div>
          <span v-if="i.keywords !== ''">
            <a v-for="keyword in i.keywords" :key="keyword">
              {{ keyword }}
            </a>
          </span>
          <div v-else>
            Empty here.
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reviewerCommend } from "../../../network/reviewer";

export default {
  name: "reviewerCards",
  components: {},
  props: ["documents"],
  data() {
    return {
      data: [],
      options: [
        {
          value: 0,
          label: "recommend"
        },
        {
          value: 1,
          label: "shield"
        }
      ],
      total: -1,
      sort: 0
    };
  },
  methods: {
    Change() {
      this.$emit("Change", this.sort);
    }
  }
};
</script>

<style scoped>
.middle-cards {
  max-width: 800px;
  margin: 20px auto 20px auto;
}
.middle-cards .header {
  line-height: 50px;
  font-size: 14px;
  color: #a0a0a0;
  display: flex;
  justify-content: space-between;
}
.middle-cards li.item {
  /*height: 220px;*/
  padding: 30px 30px 0;
  max-width: 800px;
  margin: 20px auto 20px auto;
}
.middle-cards li.item:hover {
  transform: scale(1.02);
  transition: all 0.3s;
}
.middle-cards li .photo {
  width: 80px;
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
