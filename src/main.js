import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/normalize.css";
import "@/assets/css/base.css";
import "@/plugins/elementui";
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
import "echarts-wordcloud";

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue({
  data() {
    return {
      searchParams: JSON.parse(window.localStorage.getItem("searchParams"))
    };
  }
}); //用于取代Vuex实现组件之间的消息传递

Vue.directive("title", {
  inserted: function(el, binding) {
    document.title = el.dataset.title;
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
