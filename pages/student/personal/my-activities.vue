<template>
  <view class="my-activities-container">
    <view class="activities-list">
      <view 
        v-for="activity in activities" 
        :key="activity.id" 
        class="activity-item"
        @click="viewActivity(activity)"
      >
        <image :src="activity.coverImage" class="activity-image"></image>
        <view class="activity-info">
          <text class="activity-title">{{ activity.title }}</text>
          <text class="activity-time">{{ activity.startTime }}</text>
          <view class="activity-status">
            <text class="status-tag" :class="activity.status">{{ activity.statusText }}</text>
          </view>
        </view>
      </view>
      
      <view v-if="activities.length === 0" class="empty">
        <text>暂无参加的活动</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activities: []
    };
  },
  onLoad() {
    this.loadActivities();
  },
  methods: {
    loadActivities() {
      // 模拟数据
      this.activities = [
        {
          id: 1,
          title: '校园音乐节',
          coverImage: '/static/student/activities/music.jpg',
          startTime: '2023-10-15 19:00',
          status: 'ongoing',
          statusText: '进行中'
        },
        {
          id: 2,
          title: '社团招新大会',
          coverImage: '/static/student/activities/club.jpg',
          startTime: '2023-09-25 14:30',
          status: 'completed',
          statusText: '已结束'
        }
      ];
    },
    viewActivity(activity) {
      // 跳转到活动详情页
      uni.navigateTo({
        url: `/pages/student/activity/detail?id=${activity.id}`
      });
    }
  }
};
</script>

<style scoped>
.my-activities-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.activities-list {
  padding: 20rpx;
}

.activity-item {
  display: flex;
  background-color: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.activity-image {
  width: 200rpx;
  height: 200rpx;
  object-fit: cover;
}

.activity-info {
  flex: 1;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.activity-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.activity-time {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.activity-status {
  align-self: flex-end;
}

.status-tag {
  font-size: 20rpx;
  padding: 5rpx 10rpx;
  border-radius: 5rpx;
}

.status-tag.ongoing {
  background-color: #e6f7ff;
  color: #1890ff;
}

.status-tag.completed {
  background-color: #f6ffed;
  color: #52c41a;
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