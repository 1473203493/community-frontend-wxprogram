<template>
  <view class="my-applications-container">
    <view class="applications-list">
      <view 
        v-for="application in applications" 
        :key="application.id" 
        class="application-item"
      >
        <view class="application-header">
          <text class="club-name">{{ application.clubName }}</text>
          <view class="application-status">
            <text class="status-tag" :class="application.status">{{ application.statusText }}</text>
          </view>
        </view>
        <text class="application-time">申请时间：{{ application.createTime }}</text>
        <text class="application-remark" v-if="application.remark">备注：{{ application.remark }}</text>
      </view>
      
      <view v-if="applications.length === 0" class="empty">
        <text>暂无申请记录</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      applications: []
    };
  },
  onLoad() {
    this.loadApplications();
  },
  methods: {
    loadApplications() {
      // 模拟数据
      this.applications = [
        {
          id: 1,
          clubName: '音乐社',
          status: 'pending',
          statusText: '待审核',
          createTime: '2023-10-01 10:30',
          remark: ''
        },
        {
          id: 2,
          clubName: '篮球社',
          status: 'approved',
          statusText: '已通过',
          createTime: '2023-09-25 14:30',
          remark: '欢迎加入篮球社！'
        },
        {
          id: 3,
          clubName: '摄影社',
          status: 'rejected',
          statusText: '已拒绝',
          createTime: '2023-09-20 09:15',
          remark: '很遗憾，您的申请未通过审核。'
        }
      ];
    }
  }
};
</script>

<style scoped>
.my-applications-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.applications-list {
  padding: 20rpx;
}

.application-item {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.application-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.club-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.application-status {
  align-self: flex-start;
}

.status-tag {
  font-size: 20rpx;
  padding: 5rpx 10rpx;
  border-radius: 5rpx;
}

.status-tag.pending {
  background-color: #fffbe6;
  color: #faad14;
}

.status-tag.approved {
  background-color: #f6ffed;
  color: #52c41a;
}

.status-tag.rejected {
  background-color: #fff1f0;
  color: #f5222d;
}

.application-time {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.application-remark {
  font-size: 24rpx;
  color: #999;
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