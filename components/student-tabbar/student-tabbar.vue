<template>
  <view class="student-tabbar-container">
    <view class="tabbar-mask"></view>
    <view class="tabbar-content">
      <view 
        v-for="(item, index) in tabbarList" 
        :key="index"
        class="tabbar-item"
        :class="{ active: activeIndex === index }"
        @tap="switchTab(item, index)"
      >
        <view class="tabbar-icon">
          <uni-icons 
            :type="activeIndex === index ? item.activeIcon : item.icon" 
            :size="item.size"
            :color="activeIndex === index ? activeColor : color"
          ></uni-icons>
        </view>
        <text class="tabbar-text" :style="{ color: activeIndex === index ? activeColor : color }">
          {{ item.text }}
        </text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'student-tabbar',
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#999'
    },
    activeColor: {
      type: String,
      default: '#007aff'
    }
  },
  data() {
    return {
      tabbarList: [
        {
          text: '首页',
          icon: 'home',
          activeIcon: 'home-filled',
          size: 24,
          path: '/pages/student/index'
        },
        {
          text: '社团',
          icon: 'star',
          activeIcon: 'star-filled',
          size: 24,
          path: '/pages/student/club/list'
        },
        {
          text: '活动',
          icon: 'calendar',
          activeIcon: 'calendar-filled',
          size: 24,
          path: '/pages/student/activity/list'
        },
        {
          text: '我的',
          icon: 'person',
          activeIcon: 'person-filled',
          size: 24,
          path: '/pages/student/personal/index'
        }
      ]
    };
  },
  methods: {
    // 切换tab
    switchTab(item, index) {
      // 更新当前激活的tab
      this.$emit('change', index);
      
      // 跳转到对应的页面
      uni.switchTab({
        url: item.path
      });
    }
  }
};
</script>

<style scoped>
.student-tabbar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  z-index: 100;
}

.tabbar-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1rpx solid #eee;
}

.tabbar-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 10rpx;
  box-sizing: border-box;
}

.tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 100%;
}

.tabbar-icon {
  margin-bottom: 5rpx;
}

.tabbar-text {
  font-size: 20rpx;
}
</style>
