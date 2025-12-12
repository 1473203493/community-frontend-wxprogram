import request from '../request.js';

// 认证相关API
export const authApi = {
  // 发送邮箱验证码
  sendEmailCode: (email, scene) => {
    return request.post('/api/auth/sendEmailCode', { email, scene });
  },

  // 用户注册
  register: (data) => {
    return request.post('/api/auth/register', data);
  },

  // 账号密码登录
  login: (data) => {
    return request.post('/api/auth/login', data);
  },

  // 微信快捷登录
  wechatLogin: (code) => {
    return request.post('/api/auth/wechatLogin', { code });
  },

  // 微信登录绑定邮箱
  bindEmail: (data) => {
    return request.post('/api/auth/wechatBindMail', data);
  },

  // 重置密码
  resetPassword: (data) => {
    return request.post('/api/auth/resetPassword', data);
  },

  // 获取当前登录用户信息
  getCurrentUser: (userId) => {
    return request.get('/api/auth/info', { userId });
  },

  // 登出
  logout: () => {
    return request.post('/api/auth/logout');
  },

  // 刷新token
  refreshToken: (tokenData) => {
    return request.post('/api/auth/refresh', tokenData);
  },
  
  // 修改密码
  changePassword: (data) => {
    return request.post('/api/auth/changePassword', data);
  }
};

export default authApi;
