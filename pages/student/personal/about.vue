<template>
  <view class="about-container">
    <view class="about-header">
      <image src="/static/student/logo.png" class="logo"></image>
      <text class="title">社团活动管理系统</text>
    </view>
    
    <view class="about-content">
      <view class="about-section">
        <text class="section-title">关于我们</text>
        <text class="section-content">本系统致力于为学生提供便捷的社团管理和活动参与服务。</text>
      </view>
      
      <view class="about-section">
        <text class="section-title">版本信息</text>
        <text class="section-content">当前版本：1.0.0</text>
      </view>
      
      <view class="about-section">
        <text class="section-title">联系方式</text>
        <text class="section-content">如有问题，请联系管理员。</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {
    // 页面加载
  }
};
</script>

<style scoped>
.about-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.about-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
}

.logo {
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 20rpx;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.about-content {
  background-color: #fff;
  padding: 0 20rpx;
}

.about-section {
  padding: 25rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.about-section:last-child {
  border-bottom: none;
}

.section-title {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.section-content {
  display: block;
  font-size: 24rpx;
  color: #666;
  line-height: 40rpx;
}
</style>