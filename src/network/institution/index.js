import request from "@/network/request";
const API = require("@/apis");
//机构下同名作者
export const institutionSameAuthor = config =>
  request._get(API.INSTITUTION_SAMEAUTHOR, config);
//机构详情
export const institutionInfo = config =>
  request._get(API.INSTITUTION_INFO, config);

//机构论文总数
export const institutionPaperNum = config =>
  request._get(API.INSTITUTION_PAPER_NUM, config);
//机构研究方向统计
export const institutionField = config =>
  request._get(API.INSTITUTION_FIELD, config);
//机构作者活跃度统计
export const institutionAuthorActivation = config =>
  request._get(API.INSTITUTION_AUTHOR_ACTIVATION, config);
