<template>
  <view class="personal-container">
    <!-- 骨架屏 -->
    <skeleton v-if="isLoading" :is-loading="true" :show-avatar="true" :show-title="true" :show-content="true"></skeleton>
    
    <!-- 用户信息区域 -->
    <view v-else class="user-info-section">
      <view class="user-avatar" @tap="chooseAvatar">
        <lazy-image :src="userInfo.avatar || '/static/student/default-avatar.png'" mode="aspectFill"></lazy-image>
        <view class="upload-icon">
          <uni-icons type="camera" size="16" color="#fff"></uni-icons>
        </view>
      </view>
      <view class="user-info">
        <text class="user-name">{{ userInfo.nickname || '未设置昵称' }}</text>
        <text class="user-email">{{ userInfo.email || '未绑定邮箱' }}</text>
      </view>
      <uni-icons type="arrowright" size="20" color="#fff" @tap="editPersonalInfo"></uni-icons>
    </view>

    <!-- 功能菜单区域 -->
    <view class="menu-section">
      <!-- 我的社团 -->
      <view class="menu-item" @tap="goToMyClubs">
        <view class="menu-icon">
          <uni-icons type="star" size="24" color="#007aff"></uni-icons>
        </view>
        <view class="menu-content">
          <text class="menu-title">我的社团</text>
          <text class="menu-subtitle">已加入的社团</text>
        </view>
        <uni-icons type="arrowright" size="16" color="#ccc"></uni-icons>
      </view>

      <!-- 我的活动 -->
      <view class="menu-item" @tap="goToMyActivities">
        <view class="menu-icon">
          <uni-icons type="calendar" size="24" color="#52c41a"></uni-icons>
        </view>
        <view class="menu-content">
          <text class="menu-title">我的活动</text>
          <text class="menu-subtitle">已报名的活动</text>
        </view>
        <uni-icons type="arrowright" size="16" color="#ccc"></uni-icons>
      </view>

      <!-- 入社申请 -->
      <view class="menu-item" @tap="goToMyApplications">
        <view class="menu-icon">
          <uni-icons type="paperclip" size="24" color="#fa8c16"></uni-icons>
        </view>
        <view class="menu-content">
          <text class="menu-title">入社申请</text>
          <text class="menu-subtitle">我的申请记录</text>
        </view>
        <uni-icons type="arrowright" size="16" color="#ccc"></uni-icons>
      </view>

      <!-- 我的消息 -->
      <view class="menu-item" @tap="goToMyMessages">
        <view class="menu-icon">
          <uni-icons type="chatbubble" size="24" color="#eb2f96"></uni-icons>
        </view>
        <view class="menu-content">
          <text class="menu-title">我的消息</text>
          <text class="menu-subtitle">系统通知和社团消息</text>
        </view>
        <view class="message-badge" v-if="unreadCount > 0">
          {{ unreadCount > 99 ? '99+' : unreadCount }}
        </view>
        <uni-icons type="arrowright" size="16" color="#ccc"></uni-icons>
      </view>
    </view>

    <!-- 设置区域 -->
    <view class="menu-section">
      <!-- 修改密码 -->
      <view class="menu-item" @tap="goToChangePassword">
        <view class="menu-icon">
          <uni-icons type="locked" size="24" color="#666"></uni-icons>
        </view>
        <view class="menu-content">
          <text class="menu-title">修改密码</text>
          <text class="menu-subtitle">安全设置</text>
        </view>
        <uni-icons type="arrowright" size="16" color="#ccc"></uni-icons>
      </view>

      <!-- 关于我们 -->
      <view class="menu-item" @tap="goToAbout">
        <view class="menu-icon">
          <uni-icons type="info" size="24" color="#666"></uni-icons>
        </view>
        <view class="menu-content">
          <text class="menu-title">关于我们</text>
          <text class="menu-subtitle">版本信息</text>
        </view>
        <uni-icons type="arrowright" size="16" color="#ccc"></uni-icons>
      </view>

      <!-- 退出登录 -->
      <view class="menu-item logout" @tap="logout">
        <view class="menu-icon">
          <uni-icons type="logout" size="24" color="#ff4d4f"></uni-icons>
        </view>
        <view class="menu-content">
          <text class="menu-title">退出登录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { personalApi } from '../../../api/student/personal.js';
import lazyImage from '../../../components/lazy-image/lazy-image.vue';
import skeleton from '../../../components/skeleton/skeleton.vue';

export default {
  components: {
    lazyImage,
    skeleton
  },
  data() {
    return {
      userInfo: {},
      unreadCount: 0,
      isLoading: true
    };
  },
  onLoad() {
    // 页面加载
  },
  onShow() {
    this.isLoading = true;
    // 并行加载数据，提升性能
    Promise.all([
      this.loadUserInfo(),
      this.loadUnreadCount()
    ]).finally(() => {
      this.isLoading = false;
    });
  },
  methods: {
    // 加载用户信息
    async loadUserInfo() {
      try {
        const res = await personalApi.getPersonalInfo();
        if (res.code === 200) {
          this.userInfo = res.data;
        }
      } catch (error) {
        console.error('加载用户信息失败:', error);
        return Promise.reject(error);
      }
    },

    // 加载未读消息数量
    async loadUnreadCount() {
      try {
        // 从本地存储获取用户信息
        const userInfo = uni.getStorageSync('userInfo');
        if (!userInfo || !userInfo.userId) {
          console.error('用户未登录或用户信息不完整');
          return;
        }
        
        const res = await personalApi.getUnreadCount(userInfo.userId);
        if (res.code === 200) {
          this.unreadCount = res.data || 0;
        }
      } catch (error) {
        console.error('加载未读消息数量失败:', error);
        return Promise.reject(error);
      }
    },

    // 选择头像
    chooseAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: async (res) => {
          const filePath = res.tempFilePaths[0];
          this.uploadAvatar(filePath);
        }
      });
    },

    // 上传头像
    async uploadAvatar(filePath) {
      uni.showLoading({ title: '上传中' });
      try {
        const res = await personalApi.uploadAvatar(filePath);
        if (res.code === 200) {
          this.userInfo.avatar = res.data.url;
          uni.showToast({ title: '头像上传成功', icon: 'success' });
        } else {
          uni.showToast({ title: res.message || '上传失败', icon: 'none' });
        }
      } catch (error) {
        console.error('上传头像失败:', error);
        uni.showToast({ title: '网络错误', icon: 'none' });
      } finally {
        uni.hideLoading();
      }
    },

    // 编辑个人信息
    editPersonalInfo() {
      // 跳转到编辑个人信息页面
      uni.navigateTo({
        url: '/pages/student/personal/edit'
      });
    },

    // 跳转到我的社团
    goToMyClubs() {
      uni.navigateTo({
        url: '/pages/student/personal/my-clubs'
      });
    },

    // 跳转到我的活动
    goToMyActivities() {
      uni.navigateTo({
        url: '/pages/student/personal/my-activities'
      });
    },

    // 跳转到我的申请
    goToMyApplications() {
      uni.navigateTo({
        url: '/pages/student/personal/my-applications'
      });
    },

    // 跳转到我的消息
    goToMyMessages() {
      uni.navigateTo({
        url: '/pages/student/personal/messages'
      });
    },

    // 跳转到修改密码
    goToChangePassword() {
      uni.navigateTo({
        url: '/pages/student/personal/change-password'
      });
    },

    // 跳转到关于我们
    goToAbout() {
      uni.navigateTo({
        url: '/pages/student/personal/about'
      });
    },

    // 退出登录
    logout() {
      uni.showModal({
        title: '退出登录',
        content: '确定要退出登录吗？',
        success: async (res) => {
          if (res.confirm) {
            // 清除本地存储的登录信息
            uni.removeStorageSync('token');
            uni.removeStorageSync('userInfo');
            // 跳转到登录页面
            uni.reLaunch({
              url: '/pages/student/auth/login'
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.personal-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 用户信息区域 */
.user-info-section {
  display: flex;
  align-items: center;
  padding: 40rpx 20rpx;
  background: linear-gradient(135deg, #007aff 0%, #0056b3 100%);
}

.user-avatar {
  position: relative;
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  overflow: hidden;
  border: 3rpx solid rgba(255, 255, 255, 0.5);
}

.user-avatar image {
  width: 100%;
  height: 100%;
}

.upload-icon {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30rpx;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-info {
  flex: 1;
  margin-left: 20rpx;
  color: #fff;
}

.user-name {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 5rpx;
}

.user-email {
  display: block;
  font-size: 24rpx;
  opacity: 0.9;
}

/* 功能菜单区域 */
.menu-section {
  margin-top: 20rpx;
  background-color: #fff;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 25rpx 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-icon {
  width: 50rpx;
  height: 50rpx;
  border-radius: 10rpx;
  background-color: #f0f8ff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-content {
  flex: 1;
  margin-left: 20rpx;
}

.menu-title {
  display: block;
  font-size: 30rpx;
  color: #333;
  margin-bottom: 3rpx;
}

.menu-subtitle {
  display: block;
  font-size: 22rpx;
  color: #999;
}

.message-badge {
  position: absolute;
  right: 20rpx;
  background-color: #ff4d4f;
  color: #fff;
  font-size: 20rpx;
  padding: 2rpx 8rpx;
  border-radius: 10rpx;
  min-width: 32rpx;
  text-align: center;
}

.logout .menu-title {
  color: #ff4d4f;
}
</style>
