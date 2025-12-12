<template>
  <view class="activity-list-container">
    <!-- 搜索框 -->
    <view class="search-container">
      <view class="search-box">
        <uni-icons type="search" size="18" color="#999"></uni-icons>
        <input type="text" v-model="searchParams.keyword" placeholder="搜索活动" placeholder-class="placeholder" @input="onSearch" />
      </view>
    </view>

    <!-- 筛选条件 -->
    <view class="filter-container">
      <view class="filter-group">
        <text class="filter-label">类型：</text>
        <view class="filter-options">
          <view 
            :class="['filter-option', { active: searchParams.type === '' }]"
            @tap="onTypeChange('')"
          >
            全部
          </view>
          <view 
            v-for="type in activityTypes" 
            :key="type.value"
            :class="['filter-option', { active: searchParams.type === type.value }]"
            @tap="onTypeChange(type.value)"
          >
            {{ type.label }}
          </view>
        </view>
      </view>
    </view>

    <!-- 骨架屏 -->
    <skeleton 
      v-if="isLoading" 
      :is-loading="true" 
      :show-list="true" 
      :list-count="10"
    ></skeleton>

    <!-- 活动列表 -->
    <view v-else-if="activityList.length > 0" class="activity-list">
      <view 
        v-for="activity in activityList" 
        :key="activity.id"
        class="activity-item"
        @tap="goToActivityDetail(activity.id)"
      >
        <lazy-image :src="activity.cover || '/static/student/default-activity.png'" mode="aspectFill"></lazy-image>
        <view class="activity-info">
          <text class="activity-title">{{ activity.title }}</text>
          <view class="activity-meta">
            <uni-icons type="time" size="16" color="#999"></uni-icons>
            <text class="activity-time">{{ formatDate(activity.startTime) }}</text>
          </view>
          <view class="activity-meta">
            <uni-icons type="location" size="16" color="#999"></uni-icons>
            <text class="activity-location">{{ activity.location || '地点待定' }}</text>
          </view>
          <view class="activity-stats">
            <text class="stat-item">{{ activity.joinCount }}人已报名</text>
            <text class="stat-item">{{ activity.clubName || '未知社团' }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="empty">
      <uni-icons type="info" size="60" color="#ccc"></uni-icons>
      <text>暂无活动数据</text>
    </view>

    <!-- 分页 -->
    <uni-pagination 
      v-if="total > 0" 
      :current="searchParams.page" 
      :page-size="searchParams.size" 
      :total="total" 
      @change="onPageChange"
      mode="number"
      prev-text="上一页"
      next-text="下一页"
    ></uni-pagination>

    <!-- 底部导航栏 -->
    <!-- <student-tabbar :activeIndex="2" @change="onTabChange"></student-tabbar> -->
  </view>
</template>

<script>
import { activityApi } from '../../../api/student/activity.js';
import lazyImage from '../../../components/lazy-image/lazy-image.vue';
import studentTabbar from '../../../components/student-tabbar/student-tabbar.vue';
import skeleton from '../../../components/skeleton/skeleton.vue';

export default {
  components: {
    lazyImage,
    studentTabbar,
    skeleton
  },
  data() {
    return {
      searchParams: {
        page: 1,
        size: 10,
        type: '',
        keyword: ''
      },
      activityList: [],
      total: 0,
      isLoading: true,
      activityTypes: [
        { label: '学术讲座', value: 'lecture' },
        { label: '文化活动', value: 'culture' },
        { label: '体育赛事', value: 'sports' },
        { label: '公益活动', value: 'public' },
        { label: '其他', value: 'other' }
      ],
      searchTimer: null
    };
  },
  onLoad() {
    this.loadActivityList();
  },
  methods: {
    // 加载活动列表
    async loadActivityList() {
      this.isLoading = true;
      try {
        const res = await activityApi.getActivityList(this.searchParams);
        if (res.code === 200) {
          this.activityList = res.data.list || [];
          this.total = res.data.total || 0;
        } else {
          uni.showToast({ title: res.message || '加载失败', icon: 'none' });
        }
      } catch (error) {
        console.error('加载活动列表失败:', error);
        uni.showToast({ title: '网络错误', icon: 'none' });
      } finally {
        this.isLoading = false;
      }
    },
    
    // 搜索
    onSearch() {
      // 添加防抖处理
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.searchParams.page = 1;
        this.loadActivityList();
      }, 300);
    },
    
    // 类型筛选
    onTypeChange(type) {
      this.searchParams.type = type;
      this.searchParams.page = 1;
      this.loadActivityList();
    },
    
    // 分页切换
    onPageChange(page) {
      console.log('分页切换:', page, typeof page);
      // 确保 page 是数字类型
      const pageNum = parseInt(page);
      if (!isNaN(pageNum) && pageNum > 0) {
        this.searchParams.page = pageNum;
        this.loadActivityList();
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
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    },

    // 底部导航栏变化
    onTabChange(index) {
      console.log('当前选中的tab:', index);
    }
  }
};
</script>

<style scoped>
.activity-list-container {
  padding-bottom: 120rpx; /* 为底部导航栏留出空间 */
}

/* 搜索框 */
.search-container {
  padding: 20rpx;
  background-color: #fff;
}

.search-box {
  display: flex;
  align-items: center;
  padding: 12rpx 20rpx;
  background-color: #f5f5f5;
  border-radius: 40rpx;
}

.search-box input {
  margin-left: 10rpx;
  font-size: 28rpx;
  color: #333;
}

.placeholder {
  color: #999;
}

/* 筛选条件 */
.filter-container {
  padding: 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.filter-group {
  margin-bottom: 20rpx;
}

.filter-label {
  font-size: 28rpx;
  color: #666;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10rpx;
}

.filter-option {
  padding: 8rpx 20rpx;
  margin-right: 20rpx;
  margin-bottom: 10rpx;
  font-size: 26rpx;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 20rpx;
}

.filter-option.active {
  color: #fff;
  background-color: #007aff;
}

/* 活动列表 */
.activity-list {
  background-color: #fff;
}

.activity-item {
  display: flex;
  padding: 20rpx;
  margin-bottom: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  /* 增加点击区域 */
  border: 2rpx solid transparent;
}

.activity-item:active {
  border-color: #007aff;
  background-color: rgba(0, 122, 255, 0.05);
}

.activity-item image {
  width: 200rpx;
  height: 140rpx;
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
  font-size: 30rpx;
  color: #333;
  line-height: 40rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.activity-meta {
  display: flex;
  align-items: center;
  margin-top: 10rpx;
}

.activity-time, .activity-location {
  margin-left: 5rpx;
  font-size: 24rpx;
  color: #999;
}

.activity-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 10rpx;
}

.stat-item {
  font-size: 24rpx;
  color: #999;
}

/* 空状态 */
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;
}

.empty text {
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #999;
}

/* 分页 */
uni-pagination {
  margin: 40rpx 0;
}
</style>
