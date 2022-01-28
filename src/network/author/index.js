import request from "@/network/request";
const API = require("@/apis");
//作者详情
export const authorDetail = config => request._get(API.AUTHOR_DETAIL, config);
//作者在不同会议发表文章的情况
export const authorPublication = config =>
  request._get(API.AUTHOR_PUBLICATION, config);
//作者在不同研究方向发表文章的统计
export const authorField = config => request._get(API.AUTHOR_FIELD, config);
//作者现有学术关系
export const authorRelation = config =>
  request._get(API.AUTHOR_RELATION, config);
//作者潜在合作者
export const coworkerRecommend = config =>
  request._get(API.AUTHOR_RECOMMEND, config);
//作者历史兴趣
export const authorInterestHistory = config =>
  request._get(API.AUTHOR_INTEREST_HISTORY, config);
//作者兴趣预测
export const authorInterestPredict = config =>
  request._get(API.AUTHOR_INTEREST_PREDICT, config);
//作者引用情况
export const authorRef = config => request._get(API.AUTHOR_REF, config);
//作者影响力
export const authorInfluence = config =>
  request._get(API.AUTHOR_INFLUENCE, config);
//作者机构变迁
export const authorInstitutions = config =>
  request._get(API.AUTHOR_INSTITUTION, config);
//作者论文
export const authorPapers = config => request._get(API.AUTHOR_PAPER, config);
