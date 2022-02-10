import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/home/Home");
const SearchResults = () => import("@/views/searchResults/SearchResults");
const author = () => import("@/views/author/index");
const authorRelationship = () => import("@/views/author/authorRelationDetail");
const institustion = () => import("@/views/institution/index.vue");
const papers = () => import("@/views/papers/Paper.vue");
const ReviewerResults = () => import("@/views/reviewerResults/index.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/searchResults",
    name: "SearchResults",
    component: SearchResults
  },
  {
    path: "/author/:id/:db",
    name: "Author",
    component: author
  },
  {
    path: "/authorRelationship/:id/:db",
    name: "AuthorRelation",
    component: authorRelationship
  },
  {
    path: "/institution/:id/:db",
    name: "Institution",
    component: institustion
  },
  {
    path: "/paper/:id/:db",
    name: "Paper",
    component: papers
  },
  {
    path: "/reviewerResults/:title/:authors/:keywords/:publication",
    name: "ReviewerResults",
    component: ReviewerResults
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
