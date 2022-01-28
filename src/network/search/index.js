import request from "@/network/request";
const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const searchAuthor = config => request._get(API.AUTHOR_SEARCH, config);
export const searchInstitution = config =>
  request._get(API.INSTITUTION_SEARCH, config);
export const slrCommend = config => request._get(API.SLR_COMMEND, config);
