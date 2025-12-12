<template>
  <view class="messages-container">
    <view class="messages-list">
      <view 
        v-for="message in messages" 
        :key="message.id" 
        class="message-item"
        @click="viewMessage(message)"
      >
        <view class="message-header">
          <text class="message-title">{{ message.title }}</text>
          <text class="message-time">{{ message.createTime }}</text>
        </view>
        <text class="message-content">{{ message.content }}</text>
      </view>
      
      <view v-if="messages.length === 0" class="empty">
        <text>暂无消息</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      messages: []
    };
  },
  onLoad() {
    this.loadMessages();
  },
  methods: {
    loadMessages() {
      // 模拟数据
      this.messages = [
        {
          id: 1,
          title: '活动报名成功',
          content: '您已成功报名参加"校园音乐节"活动',
          createTime: '2023-10-01 14:30',
          read: false
        },
        {
          id: 2,
          title: '社团加入申请通过',
          content: '您的社团加入申请已通过审核',
          createTime: '2023-09-28 09:15',
          read: true
        }
      ];
    },
    viewMessage(message) {
      // 查看消息详情
      console.log('查看消息', message);
      message.read = true;
    }
  }
};
</script>

<style scoped>
.messages-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.messages-list {
  padding: 20rpx;
}

.message-item {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.message-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.message-time {
  font-size: 24rpx;
  color: #999;
}

.message-content {
  font-size: 28rpx;
  color: #666;
  line-height: 40rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200rpx;
  color: #999;
  font-size: 28rpx;
}
</style>