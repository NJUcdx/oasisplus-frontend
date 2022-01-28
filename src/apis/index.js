const TEST_GET = "http://127.0.0.1:3000/test2";
const AUTHOR_SEARCH = "http://172.19.241.102:8883/search/author";
const INSTITUTION_SEARCH = "http://172.19.241.102:8883/search/institution";
const AUTHOR_DETAIL = "http://172.19.241.102:8883/author/detail";
const AUTHOR_PUBLICATION =
  "http://172.19.241.102:8883/author/publication/summary";
const AUTHOR_FIELD = "http://172.19.241.102:8883/author/field/summary";
const AUTHOR_RELATION = "http://172.19.241.102:8884/author/coworkers/map";
const AUTHOR_RECOMMEND = "http://172.19.241.102:8884/author/coworkers/recommend";
const PAPER_INFO = "http://172.19.241.102:8883/paper/info";
const AUTHOR_INTEREST_HISTORY =
  "http://172.19.241.102:8884/author/interest/history";
const AUTHOR_INTEREST_PREDICT =
  "http://172.19.241.102:8884/author/interest/predict";
const AUTHOR_REF = "http://172.19.241.102:8883/author/refer";
const AUTHOR_PAPER = "http://172.19.241.102:8883/author/papers";
const AUTHOR_INFLUENCE = "http://172.19.241.102:8883/author/influence";
const AUTHOR_INSTITUTION = "http://172.19.241.102:8883/author/institution";
const PAPER_REF = "http://172.19.241.102:8883/paper/refer";
const REVIEWER_RECOMMEND = "http://172.19.241.102:8885/reviewer/recommend";
const REVIEWER_SHIELD = "http://172.19.241.102:8885/reviewer/shield";
const SLR_COMMEND = "http://172.19.241.102:8885/slr/recommend";
const INSTITUTION_SAMEAUTHOR =
  "http://172.19.241.102:8883/institution/sameAuthor";
const INSTITUTION_INFO = "http://172.19.241.102:8883/institution/info";
const INSTITUTION_PAPER_NUM =
  "http://172.19.241.102:8883/institution/author/stat";
const INSTITUTION_FIELD = "http://172.19.241.102:8883/institution/field/stat";
const INSTITUTION_AUTHOR_ACTIVATION =
  "http://172.19.241.102:8883/institution/author/activation";

module.exports = {
  TEST_GET,
  AUTHOR_SEARCH,
  INSTITUTION_SEARCH,
  AUTHOR_DETAIL,
  AUTHOR_PUBLICATION,
  AUTHOR_FIELD,
  AUTHOR_RELATION,
  PAPER_INFO,
  AUTHOR_RECOMMEND,
  AUTHOR_INTEREST_HISTORY,
  AUTHOR_INTEREST_PREDICT,
  AUTHOR_INSTITUTION,
  AUTHOR_PAPER,
  REVIEWER_RECOMMEND,
  REVIEWER_SHIELD,
  AUTHOR_REF,
  AUTHOR_INFLUENCE,
  PAPER_REF,
  SLR_COMMEND,
  INSTITUTION_SAMEAUTHOR,
  INSTITUTION_INFO,
  INSTITUTION_PAPER_NUM,
  INSTITUTION_FIELD,
  INSTITUTION_AUTHOR_ACTIVATION
};
