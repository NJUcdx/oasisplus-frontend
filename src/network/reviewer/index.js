import request from "@/network/request";
const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const reviewerCommend = config =>
  request._post(API.REVIEWER_RECOMMEND, config);
export const reviewerShield = config =>
  request._post(API.REVIEWER_SHIELD, config);
