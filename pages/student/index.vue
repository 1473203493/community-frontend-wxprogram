<template>
  <view class="student-home-container">
    <!-- 顶部搜索栏 -->
    <view class="top-search-bar">
      <image src="/static/student/logo.png" class="logo"></image>
      <view class="search-box">
        <uni-icons type="search" size="18" color="#999"></uni-icons>
        <text class="search-placeholder" @tap="goToSearch">搜索社团、活动</text>
      </view>
      <uni-icons type="person" size="24" color="#666" @tap="goToPersonal"></uni-icons>
    </view>

    <!-- 轮播图 -->
    <view class="banner-container">
      <uni-swiper
        :indicator-dots="true"
        :autoplay="true"
        :interval="3000"
        :duration="500"
        :circular="true"
        indicator-color="rgba(255, 255, 255, 0.3)"
        indicator-active-color="#fff"
        style="height: 300rpx;"
      >
        <uni-swiper-item v-for="(item, index) in bannerList" :key="index">
          <image :src="item.image" mode="aspectFill" class="banner-image"></image>
        </uni-swiper-item>
      </uni-swiper>
    </view>

    <!-- 热门社团 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">热门社团</text>
        <text class="more-btn" @tap="goToClubList">查看更多</text>
      </view>
      <view v-if="popularClubs.length > 0" class="club-list">
        <view class="club-item" v-for="club in popularClubs" :key="club.id" @tap="goToClubDetail(club.id)">
          <lazy-image :src="club.logo || '/static/student/default-club.png'" mode="aspectFill" class="club-logo"></lazy-image>
          <view class="club-info">
            <text class="club-name">{{ club.name }}</text>
            <text class="club-desc">{{ club.description || '暂无简介' }}</text>
            <view class="club-stats">
              <text>{{ club.memberCount }}人</text>
              <text>{{ formatDate(club.createTime, true) }}</text>
            </view>
          </view>
        </view>
      </view>
      <skeleton v-else :is-loading="true" :show-list="true" :list-count="3"></skeleton>
    </view>

    <!-- 最新活动 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">最新活动</text>
        <text class="more-btn" @tap="goToActivityList">查看更多</text>
      </view>
      <view v-if="latestActivities.length > 0" class="activity-list">
        <view class="activity-item" v-for="activity in latestActivities" :key="activity.id" @tap="goToActivityDetail(activity.id)">
          <lazy-image :src="activity.cover || '/static/student/default-club.png'" mode="aspectFill" class="activity-cover"></lazy-image>
          <view class="activity-info">
            <text class="activity-title">{{ activity.title }}</text>
            <view class="activity-meta">
              <text>{{ activity.clubName }}</text>
              <text>{{ formatDate(activity.startTime) }}</text>
            </view>
          </view>
        </view>
      </view>
      <skeleton v-else :is-loading="true" :show-list="true" :list-count="3"></skeleton>
    </view>

    <!-- 底部导航栏 -->
    <!-- <student-tabbar :activeIndex="0" @change="onTabChange"></student-tabbar> -->
  </view>
</template>

<script>
import { homeApi } from '../../api/student/home.js';
import { activityApi } from '../../api/student/activity.js';
import { clubApi } from '../../api/student/club.js';
import lazyImage from '../../components/lazy-image/lazy-image.vue';
import studentTabbar from '../../components/student-tabbar/student-tabbar.vue';
import skeleton from '../../components/skeleton/skeleton.vue';

export default {
  components: {
    lazyImage,
    studentTabbar,
    skeleton
  },
  data() {
    return {
      // 设置默认轮播图数据，使用static/student文件夹里的图片
      bannerList: [
        { image: '/static/student/118675776_p0.jpg' },
        { image: '/static/student/118675776_p0(1).png' },
        { image: '/static/student/logo.png' }
      ],
      popularClubs: [],
      latestActivities: [],
      loading: false
    };
  },
  onLoad() {
    // 加载首页信息
    this.loadHomeInfo();
  },
  methods: {
    // 加载首页信息
    async loadHomeInfo() {
      this.loading = true;
      // 不显示加载动画，避免影响用户体验
      try {
        const homeRes = await homeApi.getHomeInfo();
        console.log('首页API响应:', homeRes);
        if (homeRes.code === 200) {
          // 处理后端返回的数据结构
        // 检查是否有轮播图数据，如果没有则使用默认图片
        if (homeRes.data && homeRes.data.banners && homeRes.data.banners.length > 0) {
          this.bannerList = homeRes.data.banners;
        } else {
          console.log('首页API未返回轮播图数据，使用默认图片');
          // 使用static/student文件夹里的图片作为默认轮播图
          this.bannerList = [
            { image: '/static/student/118675776_p0.jpg' },
            { image: '/static/student/118675776_p0(1).png' },
            { image: '/static/student/logo.png' }
          ];
        }
        } else {
          console.error('首页API请求失败:', homeRes);
          // 请求失败时也使用默认图片
          this.bannerList = [
            { image: '/static/student/logo.png' }
          ];
        }
      } catch (error) {
        console.error('加载首页信息失败:', error);
        // 捕获到错误时使用默认图片
        this.bannerList = [
          { image: '/static/student/logo.png' }
        ];
      }

      // 使用社团列表API获取热门社团，替代首页API中的社团数据
      try {
        const clubRes = await clubApi.getClubList({ sort: 'hot', page: 1, limit: 5 });
        console.log('热门社团API响应:', clubRes);
        if (clubRes.code === 200) {
          this.popularClubs = clubRes.data.list || [];
        } else {
          console.error('热门社团API请求失败:', clubRes);
        }
      } catch (error) {
        console.error('加载热门社团失败:', error);
      }

      // 使用活动列表API获取最新活动，替代首页API中的活动数据
      try {
        const activityRes = await activityApi.getActivityList({ page: 1, size: 3 });
        console.log('活动列表API响应:', activityRes);
        if (activityRes.code === 200) {
          this.latestActivities = activityRes.data.list || [];
        } else {
          console.error('活动列表API请求失败:', activityRes);
        }
      } catch (error) {
        console.error('加载最新活动失败:', error);
      } finally {
        this.loading = false;
      }
    },

    // 格式化日期
    formatDate(dateStr, isDateOnly = false) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      if (isDateOnly) {
        // 只显示月日
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      }
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    },

    // 跳转到搜索页面
    goToSearch() {
      uni.navigateTo({
        url: '/pages/student/search'
      });
    },

    // 跳转到个人中心
    goToPersonal() {
      uni.switchTab({
        url: '/pages/student/personal/index'
      });
    },

    // 跳转到社团列表
    goToClubList() {
      uni.switchTab({
        url: '/pages/student/club/list'
      });
    },

    // 跳转到社团详情
    goToClubDetail(id) {
      uni.navigateTo({
        url: `/pages/student/club/detail?id=${id}`
      });
    },

    // 跳转到活动列表
    goToActivityList() {
      uni.switchTab({
        url: '/pages/student/activity/list'
      });
    },

    // 跳转到活动详情
    goToActivityDetail(id) {
      uni.navigateTo({
        url: `/pages/student/activity/detail?id=${id}`
      });
    },

    // 底部导航栏变化
    onTabChange(index) {
      console.log('当前选中的tab:', index);
    }
  }
};
</script>

<style scoped>
.student-home-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 100rpx; /* 为底部导航栏留出空间 */
}

/* 顶部搜索栏 */
.top-search-bar {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.logo {
  width: 60rpx;
  height: 60rpx;
  margin-right: 20rpx;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 15rpx 20rpx;
  background-color: #f5f5f5;
  border-radius: 30rpx;
  /* 优化点击区域 */
  min-height: 60rpx;
}

.search-placeholder {
  margin-left: 10rpx;
  font-size: 26rpx;
  color: #999;
}

/* 轮播图 */
.banner-container {
    width: 100%;
    margin-top: 100rpx;
    margin-bottom: 20rpx;
    height: 300rpx;
    overflow: hidden;
  }

  .banner-image {
    width: 100%;
    height: 300rpx;
  }

/* 通用区块样式 */
.section {
  margin-top: 20rpx;
  padding: 0 20rpx;
  background-color: #fff;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.more-btn {
  font-size: 24rpx;
  color: #999;
}

/* 社团列表 */
.club-list {
  display: flex;
  overflow-x: auto;
  padding-bottom: 20rpx;
  /* 优化滚动体验 */
  -webkit-overflow-scrolling: touch;
}

.club-item {
  width: 220rpx;
  margin-right: 20rpx;
  /* 增加点击区域 */
  padding: 5rpx;
  border-radius: 10rpx;
}

.club-item:active {
  background-color: rgba(0, 0, 0, 0.05);
}

.club-logo {
  width: 220rpx;
  height: 220rpx;
  border-radius: 10rpx;
  margin-bottom: 10rpx;
}

.club-name {
  display: block;
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.club-desc {
  display: block;
  font-size: 22rpx;
  color: #999;
  margin-top: 5rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 50rpx;
  line-height: 25rpx;
}

.club-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 10rpx;
  font-size: 20rpx;
  color: #999;
}

/* 活动列表 */
.activity-list {
  display: flex;
  flex-direction: column;
}

.activity-item {
  display: flex;
  margin-bottom: 20rpx;
  /* 增加点击区域 */
  padding: 5rpx;
  border-radius: 10rpx;
}

.activity-item:active {
  background-color: rgba(0, 0, 0, 0.05);
}

.activity-cover {
  width: 180rpx;
  height: 120rpx;
  border-radius: 10rpx;
}

.activity-info {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.activity-title {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 40rpx;
}

.activity-meta {
  display: flex;
  justify-content: space-between;
  font-size: 22rpx;
  color: #999;
}
</style>
