"use strict";
const api_request = require("../request.js");
const authApi = {
  // 发送邮箱验证码
  sendEmailCode: (email, scene) => {
    return api_request.request.post("/api/auth/sendEmailCode", { email, scene });
  },
  // 用户注册
  register: (data) => {
    return api_request.request.post("/api/auth/register", data);
  },
  // 账号密码登录
  login: (data) => {
    return api_request.request.post("/api/auth/login", data);
  },
  // 微信快捷登录
  wechatLogin: (code) => {
    return api_request.request.post("/api/auth/wechatLogin", { code });
  },
  // 微信登录绑定邮箱
  bindEmail: (data) => {
    return api_request.request.post("/api/auth/wechatBindMail", data);
  },
  // 重置密码
  resetPassword: (data) => {
    return api_request.request.post("/api/auth/resetPassword", data);
  },
  // 获取当前登录用户信息
  getCurrentUser: (userId) => {
    return api_request.request.get("/api/auth/info", { userId });
  },
  // 登出
  logout: () => {
    return api_request.request.post("/api/auth/logout");
  },
  // 刷新token
  refreshToken: (tokenData) => {
    return api_request.request.post("/api/auth/refresh", tokenData);
  },
  // 修改密码
  changePassword: (data) => {
    return api_request.request.post("/api/auth/changePassword", data);
  }
};
exports.authApi = authApi;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/api/student/auth.js.map
