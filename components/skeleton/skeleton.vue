<template>
  <view class="skeleton-container" :class="{ 'skeleton-active': isLoading }">
    <!-- 骨架屏内容 -->
    <view class="skeleton-content">
      <!-- 圆形头像/图标 -->
      <view v-if="showAvatar" class="skeleton-avatar" :style="avatarStyle"></view>
      
      <!-- 矩形区块 -->
      <view v-if="showRect" class="skeleton-rect" :style="rectStyle"></view>
      
      <!-- 文本行 -->
      <view v-if="showText">
        <view 
          v-for="i in textLines" 
          :key="i" 
          class="skeleton-text" 
          :style="getTextStyle(i)"
        ></view>
      </view>
      
      <!-- 列表项 -->
      <view v-if="showList" class="skeleton-list">
        <view 
          v-for="i in listCount" 
          :key="i" 
          class="skeleton-list-item"
        >
          <view class="skeleton-list-avatar"></view>
          <view class="skeleton-list-content">
            <view class="skeleton-list-title"></view>
            <view class="skeleton-list-subtitle"></view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 加载提示文本 -->
    <text v-if="showLoadingText" class="skeleton-loading-text">{{ loadingText }}</text>
  </view>
</template>

<script>
export default {
  name: 'skeleton',
  props: {
    // 是否显示骨架屏
    isLoading: {
      type: Boolean,
      default: true
    },
    
    // 是否显示头像
    showAvatar: {
      type: Boolean,
      default: false
    },
    
    // 头像样式
    avatarStyle: {
      type: Object,
      default: () => ({})
    },
    
    // 是否显示矩形区块
    showRect: {
      type: Boolean,
      default: false
    },
    
    // 矩形区块样式
    rectStyle: {
      type: Object,
      default: () => ({})
    },
    
    // 是否显示文本行
    showText: {
      type: Boolean,
      default: false
    },
    
    // 文本行数
    textLines: {
      type: Number,
      default: 3
    },
    
    // 文本行样式
    textStyle: {
      type: Object,
      default: () => ({})
    },
    
    // 是否显示列表
    showList: {
      type: Boolean,
      default: false
    },
    
    // 列表项数量
    listCount: {
      type: Number,
      default: 3
    },
    
    // 是否显示加载文本
    showLoadingText: {
      type: Boolean,
      default: false
    },
    
    // 加载文本
    loadingText: {
      type: String,
      default: '加载中...'
    }
  },
  methods: {
    // 获取文本行样式
    getTextStyle(index) {
      const style = { ...this.textStyle };
      // 第一行文本稍长
      if (index === 1) {
        style.width = '80%';
      } else if (index === this.textLines) {
        // 最后一行文本稍短
        style.width = '60%';
      } else {
        style.width = '90%';
      }
      return style;
    }
  }
};
</script>

<style scoped>
.skeleton-container {
  width: 100%;
  overflow: hidden;
}

.skeleton-active {
  opacity: 1;
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

/* 骨架屏动画 */
.skeleton-avatar,
.skeleton-rect,
.skeleton-text,
.skeleton-list-avatar,
.skeleton-list-title,
.skeleton-list-subtitle {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4rpx;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 头像 */
.skeleton-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  align-self: flex-start;
}

/* 矩形区块 */
.skeleton-rect {
  width: 100%;
  height: 200rpx;
  border-radius: 8rpx;
}

/* 文本行 */
.skeleton-text {
  height: 32rpx;
  width: 100%;
  margin-bottom: 8rpx;
}

/* 列表 */
.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.skeleton-list-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 16rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.skeleton-list-avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 8rpx;
}

.skeleton-list-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.skeleton-list-title {
  height: 32rpx;
  width: 70%;
}

.skeleton-list-subtitle {
  height: 24rpx;
  width: 50%;
}

/* 加载文本 */
.skeleton-loading-text {
  display: block;
  text-align: center;
  margin-top: 20rpx;
  color: #999;
  font-size: 28rpx;
}
</style>
