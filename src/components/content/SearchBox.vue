<template>
  <div>
    <div class="search">
      <a href="javascript: void(0)" class="choose">
        <span>{{ title }}</span>
        <span class="arrow0"></span>
        <span class="list">
          <span class="arrow1"></span>
          <!--          <a class="item multi-search" @click="changeToMul()">MultiSearch</a>-->
          <a
            class="item"
            v-for="item in list"
            :key="item"
            @click="changeTitle(item)"
            >{{ item }}</a
          >
          <span class="m-list">
            <span class="arrow2"></span>
            <label v-for="(item2, index) in list" :for="item2" :key="item2">
              <span>{{ item2 }}:</span>
              <input
                :id="item2"
                type="text"
                v-model="mulInput[index]"
                @keyup.enter="ok"
                style="outline:none;"
              />
            </label>
            <button class="ok" @click="ok">OK</button>
          </span>
        </span>
      </a>
      <input
        type="text"
        placeholder="Please input here"
        v-model="mainInput"
        :readonly="title === 'MultiSearch'"
        @keyup.enter="search"
        style="outline:none;"
      />
      <button @click="search" :disabled="isMul" :class="{ disable: isMul }">
        search
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  props: {
    inputValue: {
      type: String
    },
    titleValue: {
      type: String
    },
    listValue: {
      type: Array
    }
  },
  data() {
    return {
      title: this.titleValue,
      list: this.listValue,
      mulInput: [],
      mainInput: this.inputValue
    };
  },
  methods: {
    checkEmpty() {
      let isEmpty = val => {
        return !val || val.trim() === "";
      };
      if (this.title !== "MultiSearch") return isEmpty(this.mainInput);
      else
        return this.mulInput.every(value => {
          return isEmpty(value);
        });
    },
    changeTitle(item) {
      this.title = item;
      this.mainInput = "";
    },
    changeToMul() {
      this.title = "MultiSearch";

      // let tmpInput = "";
      // this.list.forEach(val => {
      //   tmpInput += `${val}=&`;
      // });
      // this.mainInput = tmpInput.substr(0, tmpInput.length - 1);
    },
    search() {
      if (this.checkEmpty()) {
        alert("请输入查询条件!");
        return;
      }
      let param = {
        type: this.title,
        value: this.mainInput
      };
      this.$emit("search", param);
    },

    ok() {
      this.title = "MultiSearch";
      if (this.checkEmpty()) {
        alert("请输入查询条件!");
        return;
      }
      let tmpString = "";
      for (let i = 0; i < this.list.length; i++) {
        tmpString += `${this.list[i]}=${
          this.mulInput[i] === undefined ? "" : escape(this.mulInput[i])
        }`;
        if (i !== this.list.length - 1) tmpString += "&";
      }
      let param = {
        type: this.title,
        value: tmpString
      };
      this.$emit("search", param);
    }
  },
  computed: {
    isMul() {
      return this.title === "MultiSearch";
    }
  }
};
</script>

<style scoped>
.search {
  position: relative;
  margin: 0 auto;
  padding-left: 80px;
  border-radius: 20px;
  width: 500px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  font-size: 12px;
  color: red;
  border: 1px solid #ddd;
  text-align: start;
  box-shadow: rgba(0, 6, 47, 0.24) 0px 0px 10px;
}
.search .arrow0 {
  display: inline-block;
  position: relative;
  left: 8px;
  bottom: 2px;
  border: solid #fff;
  border-width: 1px 1px 0 0;
  height: 5px;
  width: 5px;
  background-color: #409eff;
  transform: rotate(135deg);
  transition: all 1s;
}
.search input {
  margin-left: 22px;
  width: 380px;
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
.search button {
  position: absolute;
  width: 70px;
  height: 42px;
  right: -1px;
  bottom: -1px;
  border-radius: 20px;
  border: 0;
  color: #fff;
  cursor: pointer;
  background-color: #409eff;
}
.search button:hover {
  background-color: #ccc;
  color: #fff;
}
.search button:active {
  background-color: #999;
  color: #fff;
}
.search button.disable {
  background-color: #ccc;
  color: #fff;
  cursor: not-allowed;
}
.search .choose {
  display: block;
  position: absolute;
  left: -1px;
  top: -1px;
  text-align: center;
  width: 100px;
  height: 42px;
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
.search .list {
  position: absolute;
  z-index: 9;
  left: 0;
  top: 50px;
  padding: 6px 0px 12px;
  background-color: #fff;
  border-radius: 3px;
  visibility: hidden;
  transition: visibility 1s;
  border: 1px solid #ddd;
}
.search .list .item {
  display: block;
  line-height: 24px;
  padding: 0 15px;
  text-align: center;
}
.search .list .item.multi-search {
  background-color: orange;
  color: #fff;
}
.search .list .item:hover {
  color: #fff;
  background-color: #ccc;
}
.search .list .item:active {
  color: #fff;
  background-color: #999;
}
.search .list .arrow1 {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: -7px;
  height: 10px;
  width: 10px;
  background-color: #fff;
  transform: rotate(45deg);
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
}
.search .list .multi-search:hover ~ .m-list {
  visibility: visible;
}
.m-list:hover {
  visibility: visible;
}
.m-list {
  position: absolute;
  top: 0;
  left: 110px;
  width: 480px;
  background-color: #fff;
  color: #999;
  padding: 10px 0 10px 10px;
  border-radius: 5px;
  visibility: hidden;
  transition: visibility 1s;
  border: 1px solid #ddd;
}
.m-list .arrow2 {
  position: absolute;
  top: 15px;
  left: -6px;
  height: 10px;
  width: 10px;
  background-color: #fff;
  transform: rotate(45deg);
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.m-list label {
  display: flex;
  line-height: 25px;
}
.m-list label span {
  text-align: center;
  width: 60px;
}
.m-list label input {
  border: 1px solid #efefef;
  margin-bottom: 5px;
  border-radius: 5px;
  width: 300px;
  height: 25px;
}
.m-list .ok {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  right: 4px;
  background-color: #409eff;
  color: #fff;
  cursor: pointer;
}
</style>
