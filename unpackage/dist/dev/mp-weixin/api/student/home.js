"use strict";
const api_request = require("../request.js");
const homeApi = {
  /**
   * 获取首页信息
   * 返回：热门社团（按时间）、人数最多社团 TOP3
   * @returns {Promise} Promise对象
   */
  getHomeInfo() {
    return api_request.request({
      url: "/api/home/info",
      method: "GET"
    });
  }
};
exports.homeApi = homeApi;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/api/student/home.js.map
