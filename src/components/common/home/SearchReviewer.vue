<template>
  <div>
    <div class="search">
      <a class="choose">
        <span>Title</span>
      </a>
      <input
        type="text"
        placeholder="Please enter the title of the article"
        v-model="title"
        @keyup.enter="search"
        style="outline:none;"
      />
    </div>
    <div class="search">
      <a class="choose">
        <span>Authors</span>
      </a>
      <input
        type="text"
        placeholder="Please enter the authors (separated by ';')"
        v-model="authors"
        @keyup.enter="search"
        style="outline:none;"
      />
    </div>
    <div class="search">
      <a class="choose">
        <span>Keywords</span>
      </a>
      <input
        type="text"
        placeholder="Please enter key words(separated by ';')"
        v-model="keywords"
        @keyup.enter="search"
        style="outline:none;"
      />
    </div>
    <div class="search">
      <a class="choose">
        <span>Publication</span>
      </a>
      <input
        type="text"
        placeholder="Please enter the journal / meeting you submitted to"
        v-model="publication"
        @keyup.enter="search"
        style="outline:none;"
      />
    </div>
    <div style="margin: 0 auto;width: 400px;margin-top: 30px;">
      <button @click="search">
        search
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchReviewer",
  props: {},
  data() {
    return {
      title: "",
      authors: "",
      keywords: "",
      publication: ""
    };
  },
  methods: {
    checkEmpty() {
      let isEmpty = val => {
        let temp = val.replace(/；/g, ";").replace(/;/g, "");
        console.log(temp);
        return !temp || temp.trim() === "";
      };
      return (
        isEmpty(this.title) ||
        isEmpty(this.authors) ||
        isEmpty(this.keywords) ||
        isEmpty(this.publication)
      );
      // if (this.title !== "MultiSearch") return isEmpty(this.mainInput);
      // else
      //     return this.mulInput.every(value => {
      //         return isEmpty(value);
      //     });
    },
    search() {
      if (this.checkEmpty()) {
        alert("查询条件不可为空!");
        return;
      } else {
        let routeData = this.$router.resolve({
          path:
            "/reviewerResults/" +
            this.title +
            "/" +
            this.authors +
            "/" +
            this.keywords +
            "/" +
            this.publication
        });
        window.open(routeData.href, "_blank");
      }
    }
  },
  computed: {}
};
</script>

<style scoped>
.search {
  position: relative;
  margin: 0 auto;
  margin-top: 7px;
  padding-left: 80px;
  border-radius: 20px;
  width: 350px;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  font-size: 12px;
  color: red;
  border: 1px solid #ddd;
  text-align: start;
  box-shadow: rgba(0, 2, 16, 0.57) 0px 0px 10px;
}
.search input {
  margin-left: 22px;
  width: 300px;
  line-height: 30px;
  background-color: #fff;
  border: 0;
  font-size: 12px;
  color: #666;
  padding: 0 10px;
}
.search input::placeholder {
  font-size: 12px;
}
button {
  position: relative;
  width: 200px;
  margin-left: 100px;
  height: 30px;
  font-size: 12px;
  border-radius: 20px;
  border: 0;
  color: #fff;
  cursor: pointer;
  background-color: #409eff;
  box-shadow: rgba(0, 2, 16, 0.57) 0px 0px 10px;
}
button:hover {
  background-color: #3945cd;
  color: #fff;
}
button:active {
  background-color: #84acd3;
  color: #fff;
}
.search .choose {
  display: block;
  position: absolute;
  left: -1px;
  top: -1px;
  text-align: center;
  width: 100px;
  height: 32px;
  background-color: #409eff;
  border-radius: 20px;
  color: #fff;
}
.search .choose:hover .list {
  visibility: visible;
}
.search .choose:hover .arrow0 {
  transform: rotate(-45deg);
  bottom: 0;
  transition: all 0.2s;
}
</style>
