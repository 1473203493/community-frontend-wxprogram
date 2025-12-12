import request from '../request.js';

// 个人中心相关API
export const personalApi = {
  // 获取个人信息
  getPersonalInfo: () => {
    return request.get('/api/personal/info');
  },

  // 更新个人信息
  updatePersonalInfo: (data) => {
    return request.put('/api/personal/info', data);
  },

  // 修改密码
  changePassword: (data) => {
    return request.put('/api/personal/password', data);
  },

  // 上传头像
  uploadAvatar: (filePath) => {
    return request.upload('/api/personal/avatar', {
      file: filePath,
      name: 'file'
    });
  },

  // 获取我的社团列表
  getMyClubs: (data = {}) => {
    return request.get('/api/personal/clubs', data);
  },

  // 获取我的入社申请列表
  getMyApplications: (data = {}) => {
    return request.get('/api/club/apply/my', data);
  },

  // 撤销入社申请
  cancelApplication: (applyId) => {
    return request.post('/api/club/apply/cancel', { applyId });
  },

  // 获取我的消息列表
  getMyMessages: (data = {}) => {
    return request.get('/api/message/list', data);
  },

  // 获取消息详情
  getMessageDetail: (messageId, userId) => {
    return request.get(`/api/message/detail/${messageId}`, { userId });
  },

  // 标记消息已读
  markMessageRead: (messageId, userId) => {
    return request.put(`/api/message/read/${messageId}`, { userId });
  },

  // 批量标记消息已读
  markMessagesRead: (userId, messageIds) => {
    return request.put('/api/message/read/batch', { userId, messageIds });
  },

  // 删除消息
  deleteMessage: (messageId, userId) => {
    return request.delete(`/api/message/${messageId}`, { userId });
  },

  // 批量删除消息
  deleteMessages: (userId, messageIds) => {
    return request.delete('/api/message/batch', { userId, messageIds });
  },

  // 获取未读消息数量
  getUnreadCount: (userId) => {
    return request.get('/api/message/unread/count', { userId });
  }
};
