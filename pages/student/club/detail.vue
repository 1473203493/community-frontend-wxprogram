<template>
  <view class="club-detail-container">
    <!-- 社团基本信息 -->
    <view class="club-header">
      <lazy-image :src="clubDetail.logo || '/static/student/default-club.png'" mode="aspectFill"></lazy-image>
      <view class="club-info">
        <text class="club-name">{{ clubDetail.name }}</text>
        <text class="club-category">{{ clubDetail.category || '未分类' }}</text>
        <text class="club-member">{{ clubDetail.memberCount }}人已加入</text>
      </view>
    </view>

    <!-- 社团简介 -->
    <view class="section">
      <view class="section-title">社团简介</view>
      <view class="section-content">
        <text>{{ clubDetail.description || '该社团暂无简介' }}</text>
      </view>
    </view>

    <!-- 社团负责人 -->
    <view class="section">
      <view class="section-title">社团负责人</view>
      <view class="section-content">
        <view class="manager-info">
          <lazy-image :src="clubDetail.managerAvatar || '/static/student/default-avatar.png'" mode="aspectFill"></lazy-image>
          <view class="manager-detail">
            <text class="manager-name">{{ clubDetail.managerName || '未知' }}</text>
            <text class="manager-role">社长</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 近期活动 -->
    <view class="section">
      <view class="section-title">近期活动</view>
      <view class="section-content">
        <view 
          v-for="activity in clubDetail.recentActivities" 
          :key="activity.id"
          class="activity-item"
          @tap="goToActivityDetail(activity.id)"
        >
          <text class="activity-title">{{ activity.title }}</text>
          <text class="activity-time">{{ formatDate(activity.startTime) }}</text>
        </view>
        <view v-if="!clubDetail.recentActivities || clubDetail.recentActivities.length === 0" class="empty-activities">
          <text>该社团暂无活动</text>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <button 
        v-if="!isJoined" 
        class="join-btn" 
        @click="applyToJoinClub"
      >
        申请加入
      </button>
      <button 
        v-else 
        class="joined-btn" 
        disabled
      >
        已加入
      </button>
    </view>
  </view>
</template>

<script>
import { clubApi } from '../../../api/student/club.js';
import lazyImage from '../../../components/lazy-image/lazy-image.vue';

export default {
  components: {
    lazyImage
  },
  data() {
    return {
      clubId: '',
      clubDetail: {},
      isJoined: false // 是否已加入社团
    };
  },
  onLoad(options) {
    this.clubId = options.id;
    this.loadClubDetail();
  },
  methods: {
    // 加载社团详情
    async loadClubDetail() {
      uni.showLoading({ title: '加载中' });
      try {
        const res = await clubApi.getClubDetail(this.clubId);
        console.log('【社团详情请求结果】', res);
        if (res.success) {
          this.clubDetail = res.data;
          // 判断用户是否已加入该社团
          this.isJoined = res.data?.isJoined ?? false;
        } else {
          uni.showToast({ title: res.message || '加载失败', icon: 'none' });
        }
      } catch (error) {
        console.error('加载社团详情失败:', error);
        uni.showToast({ title: '网络错误', icon: 'none' });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 申请加入社团
    async applyToJoinClub() {
      try {
        // 可以添加备注输入框
        const remark = '';
        const res = await clubApi.applyToJoinClub(this.clubId, remark);
        if (res.code === 200) {
          uni.showToast({ title: '申请提交成功，请等待审核', icon: 'success' });
        } else {
          uni.showToast({ title: res.message || '申请失败', icon: 'none' });
        }
      } catch (error) {
        console.error('申请加入社团失败:', error);
        uni.showToast({ title: '网络错误', icon: 'none' });
      }
    },
    
    // 跳转到活动详情
    goToActivityDetail(activityId) {
      uni.navigateTo({
        url: `/pages/student/activity/detail?id=${activityId}`
      });
    },
    
    // 格式化日期
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
  }
};
</script>

<style scoped>
.club-detail-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 社团头部信息 */
.club-header {
  padding: 20rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
}

.club-header image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 10rpx;
}

.club-info {
  margin-left: 20rpx;
  flex: 1;
}

.club-name {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.club-category {
  display: block;
  margin-top: 10rpx;
  font-size: 26rpx;
  color: #666;
}

.club-member {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #999;
}

/* 通用区块样式 */
.section {
  margin-top: 20rpx;
  padding: 0 20rpx;
  background-color: #fff;
}

.section-title {
  padding: 20rpx 0;
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  border-bottom: 1rpx solid #eee;
}

.section-content {
  padding: 20rpx 0;
}

.section-content text {
  font-size: 28rpx;
  color: #666;
  line-height: 40rpx;
}

/* 负责人信息 */
.manager-info {
  display: flex;
  align-items: center;
}

.manager-info image {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}

.manager-detail {
  margin-left: 20rpx;
}

.manager-name {
  display: block;
  font-size: 28rpx;
  color: #333;
}

.manager-role {
  display: block;
  margin-top: 5rpx;
  font-size: 24rpx;
  color: #999;
}

/* 近期活动 */
.activity-item {
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-title {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.activity-time {
  display: block;
  font-size: 24rpx;
  color: #999;
}

.empty-activities {
  padding: 40rpx 0;
  text-align: center;
}

.empty-activities text {
  font-size: 26rpx;
  color: #999;
}

/* 底部操作栏 */
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
  display: flex;
  justify-content: center;
}

.join-btn {
  width: 100%;
  height: 80rpx;
  font-size: 30rpx;
  color: #fff;
  background-color: #007aff;
  border-radius: 40rpx;
}

.joined-btn {
  width: 100%;
  height: 80rpx;
  font-size: 30rpx;
  color: #999;
  background-color: #f5f5f5;
  border-radius: 40rpx;
}
</style>
