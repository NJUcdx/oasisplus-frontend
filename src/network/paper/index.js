import request from "@/network/request";
const API = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const displayPaper = config => request._get(API.PAPER_INFO, config);
export const paperRef = config => request._get(API.PAPER_REF, config);
