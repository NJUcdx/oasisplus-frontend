<template>
  <header class="shkb-header">
    <Logo main-color="#333" class="logo"></Logo>
    <SearchBox
      class="search-box"
      @search="search"
      :input-value="
        $bus.searchParams
          ? $bus.searchParams.type === 'MultiSearch'
            ? ''
            : $bus.searchParams.value
          : ''
      "
      :title-value="'Author'"
      :list-value="['Author', 'Institution']"
    />
    <!--    :list-value="['Title', 'Author', 'Institution', 'Conference', 'Keywords']"-->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">OASIS</el-breadcrumb-item>
        <el-breadcrumb-item v-for="i in breadcrumb" :key="i">
          {{ i }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </header>
</template>

<script>
import SearchBox from "@/components/content/SearchBox";
import Logo from "@/components/content/Logo";
export default {
  name: "Header",
  components: {
    SearchBox,
    Logo
  },
  props: {
    breadcrumb: {
      type: Array,
      default() {
        return ["SearchResults"];
      }
    }
  },
  methods: {
    search(value) {
      this.$emit("search", value);
    }
  }
};
</script>

<style scoped>
.shkb-header {
  position: relative;
  height: 150px;
  padding-top: 10px;
  border-bottom: 2px solid #00f;
  background-color: #fff;
}
.shkb-header .logo {
  position: absolute;
  left: 10px;
}
.logo {
  top: 20px;
}
.shkb-header .search-box {
  margin-top: 20px;
}
.shkb-header .breadcrumb {
  position: absolute;
  bottom: 0;
  height: 50px;
  border-top: 1px solid #efefef;
  display: flex;
  align-items: center;
  width: 100%;
}
.shkb-header .breadcrumb .el-breadcrumb {
  width: 1200px;
  font-size: 12px;
  margin-left: 30px;
}
.shkb-header .breadcrumb .el-breadcrumb__item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
}
</style>
