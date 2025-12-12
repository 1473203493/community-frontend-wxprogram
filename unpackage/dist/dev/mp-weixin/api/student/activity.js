"use strict";
const api_request = require("../request.js");
const activityApi = {
  /**
   * 查询活动列表
   * @param {Object} params 查询参数
   * @param {number} [params.page=1] 页码
   * @param {number} [params.size=10] 每页数量
   * @param {string} [params.type] 活动类型（可选）
   * @param {string} [params.keyword] 关键词搜索（可选）
   * @returns {Promise} Promise对象
   */
  getActivityList(params = {}) {
    return api_request.request({
      url: "/api/activity/list",
      method: "GET",
      data: {
        page: params.page || 1,
        size: params.size || 10,
        type: params.type || "",
        keyword: params.keyword || ""
      }
    });
  },
  /**
   * 获取活动详情
   * @param {number} activityId 活动ID
   * @returns {Promise} Promise对象
   */
  getActivityDetail(activityId) {
    return api_request.request({
      url: `/api/activity/detail/${activityId}`,
      method: "GET"
    });
  },
  /**
   * 报名参加活动
   * @param {number} activityId 活动ID
   * @returns {Promise} Promise对象
   */
  signUpActivity(activityId) {
    return api_request.request({
      url: "/api/activity/sign-up",
      method: "POST",
      data: {
        activityId
      }
    });
  },
  /**
   * 取消活动报名
   * @param {number} activityId 活动ID
   * @returns {Promise} Promise对象
   */
  cancelSignUpActivity(activityId) {
    return api_request.request({
      url: "/api/activity/cancel-sign-up",
      method: "POST",
      data: {
        activityId
      }
    });
  },
  /**
   * 查询我参加的活动
   * @returns {Promise} Promise对象
   */
  getMyActivities() {
    return api_request.request({
      url: "/api/activity/my",
      method: "GET"
    });
  }
};
exports.activityApi = activityApi;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/api/student/activity.js.map
