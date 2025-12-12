"use strict";
const api_request = require("../request.js");
const personalApi = {
  // 获取个人信息
  getPersonalInfo: () => {
    return api_request.request.get("/api/personal/info");
  },
  // 更新个人信息
  updatePersonalInfo: (data) => {
    return api_request.request.put("/api/personal/info", data);
  },
  // 修改密码
  changePassword: (data) => {
    return api_request.request.put("/api/personal/password", data);
  },
  // 上传头像
  uploadAvatar: (filePath) => {
    return api_request.request.upload("/api/personal/avatar", {
      file: filePath,
      name: "file"
    });
  },
  // 获取我的社团列表
  getMyClubs: (data = {}) => {
    return api_request.request.get("/api/personal/clubs", data);
  },
  // 获取我的入社申请列表
  getMyApplications: (data = {}) => {
    return api_request.request.get("/api/club/apply/my", data);
  },
  // 撤销入社申请
  cancelApplication: (applyId) => {
    return api_request.request.post("/api/club/apply/cancel", { applyId });
  },
  // 获取我的消息列表
  getMyMessages: (data = {}) => {
    return api_request.request.get("/api/message/list", data);
  },
  // 获取消息详情
  getMessageDetail: (messageId, userId) => {
    return api_request.request.get(`/api/message/detail/${messageId}`, { userId });
  },
  // 标记消息已读
  markMessageRead: (messageId, userId) => {
    return api_request.request.put(`/api/message/read/${messageId}`, { userId });
  },
  // 批量标记消息已读
  markMessagesRead: (userId, messageIds) => {
    return api_request.request.put("/api/message/read/batch", { userId, messageIds });
  },
  // 删除消息
  deleteMessage: (messageId, userId) => {
    return api_request.request.delete(`/api/message/${messageId}`, { userId });
  },
  // 批量删除消息
  deleteMessages: (userId, messageIds) => {
    return api_request.request.delete("/api/message/batch", { userId, messageIds });
  },
  // 获取未读消息数量
  getUnreadCount: (userId) => {
    return api_request.request.get("/api/message/unread/count", { userId });
  }
};
exports.personalApi = personalApi;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/api/student/personal.js.map
