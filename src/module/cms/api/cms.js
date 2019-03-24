import http from "../../../base/api/public";
import querystring from "querystring";

let sysConfig = require('@/../config/sysConfig');
let apiUrl = sysConfig.cmsApiUrlPre;

export const page_list = (page, size, params) => {
  let query = querystring.stringify(params);
  return http.requestQuickGet(apiUrl + "/cms/page/list/" + page + "/" + size + "?" + query);
};

export const site_sublist = (siteName) => {
  let query = querystring.stringify({siteName});
  return http.requestQuickGet(apiUrl + "/cms/site/sublist?" + query);
};
