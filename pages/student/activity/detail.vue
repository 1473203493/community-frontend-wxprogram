<template>
  <view class="activity-detail-container">
    <!-- 活动封面 -->
    <view class="activity-cover">
      <lazy-image :src="activityDetail.cover || '/static/student/default-activity.png'" mode="aspectFill"></lazy-image>
      <view class="activity-status" v-if="activityDetail.status">
        {{ getStatusText(activityDetail.status) }}
      </view>
    </view>

    <!-- 活动基本信息 -->
    <view class="activity-info">
      <text class="activity-title">{{ activityDetail.title }}</text>
      <view class="activity-meta">
        <view class="meta-item">
          <uni-icons type="time" size="16" color="#999"></uni-icons>
          <text>{{ formatDate(activityDetail.startTime) }}</text>
          <text v-if="activityDetail.endTime"> - {{ formatDate(activityDetail.endTime, true) }}</text>
        </view>
        <view class="meta-item">
          <uni-icons type="location" size="16" color="#999"></uni-icons>
          <text>{{ activityDetail.location || '地点待定' }}</text>
        </view>
      </view>
      <view class="activity-stats">
        <view class="stat-item">
          <uni-icons type="person" size="16" color="#999"></uni-icons>
          <text>{{ activityDetail.joinCount || 0 }}人已报名</text>
        </view>
        <view class="stat-item" v-if="activityDetail.maxParticipants">
          <text>/ {{ activityDetail.maxParticipants }}人</text>
        </view>
      </view>
    </view>

    <!-- 举办社团 -->
    <view class="section">
      <view class="section-title">举办社团</view>
      <view class="section-content">
        <view class="club-info" @tap="goToClubDetail(activityDetail.clubId)">
          <lazy-image :src="activityDetail.clubLogo || '/static/student/default-club.png'" mode="aspectFill"></lazy-image>
          <text class="club-name">{{ activityDetail.clubName }}</text>
          <uni-icons type="arrowright" size="16" color="#ccc"></uni-icons>
        </view>
      </view>
    </view>

    <!-- 活动详情 -->
    <view class="section">
      <view class="section-title">活动详情</view>
      <view class="section-content">
        <text>{{ activityDetail.description || '该活动暂无详情' }}</text>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <button 
        v-if="!isJoined && canSignUp" 
        class="sign-up-btn" 
        @click="signUpActivity"
      >
        立即报名
      </button>
      <button 
        v-else-if="isJoined" 
        class="cancel-btn" 
        @click="cancelSignUp"
      >
        取消报名
      </button>
      <button 
        v-else 
        class="disabled-btn" 
        disabled
      >
        {{ getButtonText() }}
      </button>
    </view>
  </view>
</template>

<script>
import { activityApi } from '../../../api/student/activity.js';
import lazyImage from '../../../components/lazy-image/lazy-image.vue';

export default {
  components: {
    lazyImage
  },
  data() {
    return {
      activityId: '',
      activityDetail: {},
      isJoined: false, // 是否已报名
      canSignUp: true // 是否可以报名
    };
  },
  onLoad(options) {
    this.activityId = options.id;
    this.loadActivityDetail();
  },
  methods: {
    // 加载活动详情
    async loadActivityDetail() {
      uni.showLoading({ title: '加载中' });
      try {
        const res = await activityApi.getActivityDetail(this.activityId);
        if (res.code === 200) {
          this.activityDetail = res.data;
          this.isJoined = res.data.isJoined || false;
          this.canSignUp = this.checkCanSignUp();
        } else {
          uni.showToast({ title: res.message || '加载失败', icon: 'none' });
        }
      } catch (error) {
        console.error('加载活动详情失败:', error);
        uni.showToast({ title: '网络错误', icon: 'none' });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 检查是否可以报名
    checkCanSignUp() {
      const now = new Date();
      const startTime = new Date(this.activityDetail.startTime);
      const endTime = this.activityDetail.endTime ? new Date(this.activityDetail.endTime) : null;
      const maxParticipants = this.activityDetail.maxParticipants;
      const joinCount = this.activityDetail.joinCount || 0;
      
      // 检查是否已过开始时间、是否已达人数上限
      if (now > startTime) return false;
      if (maxParticipants && joinCount >= maxParticipants) return false;
      if (this.activityDetail.status === 'closed') return false;
      
      return true;
    },
    
    // 报名活动
    async signUpActivity() {
      try {
        const res = await activityApi.signUpActivity(this.activityId);
        if (res.code === 200) {
          uni.showToast({ title: '报名成功', icon: 'success' });
          this.isJoined = true;
          this.activityDetail.joinCount = (this.activityDetail.joinCount || 0) + 1;
        } else {
          uni.showToast({ title: res.message || '报名失败', icon: 'none' });
        }
      } catch (error) {
        console.error('报名活动失败:', error);
        uni.showToast({ title: '网络错误', icon: 'none' });
      }
    },
    
    // 取消报名
    async cancelSignUp() {
      try {
        const res = await activityApi.cancelSignUpActivity(this.activityId);
        if (res.code === 200) {
          uni.showToast({ title: '已取消报名', icon: 'success' });
          this.isJoined = false;
          this.activityDetail.joinCount = Math.max(0, (this.activityDetail.joinCount || 0) - 1);
        } else {
          uni.showToast({ title: res.message || '取消失败', icon: 'none' });
        }
      } catch (error) {
        console.error('取消报名失败:', error);
        uni.showToast({ title: '网络错误', icon: 'none' });
      }
    },
    
    // 跳转到社团详情
    goToClubDetail(clubId) {
      if (clubId) {
        uni.navigateTo({
          url: `/pages/student/club/detail?id=${clubId}`
        });
      }
    },
    // 格式化日期
    formatDate(dateStr, timeOnly = false) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      if (timeOnly) {
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      }
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    },
    
    // 获取状态文本
    getStatusText(status) {
      const statusMap = {
        'upcoming': '即将开始',
        'ongoing': '进行中',
        'ended': '已结束',
        'closed': '已关闭'
      };
      return statusMap[status] || status;
    },
    
    // 获取按钮文本
    getButtonText() {
      if (this.activityDetail.status === 'ended' || this.activityDetail.status === 'closed') {
        return '活动已结束';
      }
      const now = new Date();
      const startTime = new Date(this.activityDetail.startTime);
      if (now > startTime) {
        return '活动已开始';
      }
      if (this.activityDetail.maxParticipants && (this.activityDetail.joinCount >= this.activityDetail.maxParticipants)) {
        return '名额已满';
      }
      return '不可报名';
    }
  }
};
</script>

<style scoped>
.activity-detail-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 活动封面 */
.activity-cover {
  position: relative;
  height: 400rpx;
  overflow: hidden;
}

.activity-cover image {
  width: 100%;
  height: 100%;
}

.activity-status {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  padding: 8rpx 16rpx;
  font-size: 24rpx;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20rpx;
}

/* 活动基本信息 */
.activity-info {
  padding: 20rpx;
  background-color: #fff;
}

.activity-title {
  display: block;
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
  line-height: 48rpx;
}

.activity-meta {
  margin-top: 15rpx;
}

.meta-item {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
  font-size: 26rpx;
  color: #666;
}

.meta-item text {
  margin-left: 5rpx;
}

.activity-stats {
  display: flex;
  align-items: center;
  margin-top: 15rpx;
  font-size: 24rpx;
  color: #999;
}

.stat-item {
  display: flex;
  align-items: center;
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

/* 举办社团 */
.club-info {
  display: flex;
  align-items: center;
}

.club-info image {
  width: 60rpx;
  height: 60rpx;
  border-radius: 10rpx;
}

.club-name {
  flex: 1;
  margin-left: 15rpx;
  font-size: 28rpx;
  color: #333;
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

.sign-up-btn {
  width: 100%;
  height: 80rpx;
  font-size: 30rpx;
  color: #fff;
  background-color: #007aff;
  border-radius: 40rpx;
}

.cancel-btn {
  width: 100%;
  height: 80rpx;
  font-size: 30rpx;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 40rpx;
}

.disabled-btn {
  width: 100%;
  height: 80rpx;
  font-size: 30rpx;
  color: #999;
  background-color: #eee;
  border-radius: 40rpx;
}
</style>
