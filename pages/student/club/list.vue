<template>
  <view class="club-list-container">
    <!-- 搜索框 -->
    <view class="search-container">
      <view class="search-box">
        <uni-icons type="search" size="18" color="#999"></uni-icons>
        <input type="text" v-model="searchParams.name" placeholder="搜索社团名称" placeholder-class="placeholder" @input="onSearch" />
      </view>
    </view>

    <!-- 筛选条件 -->
    <view class="filter-container">
      <view class="filter-group">
        <text class="filter-label">类别：</text>
        <view class="filter-options">
          <view 
            v-for="category in categories" 
            :key="category.value"
            :class="['filter-option', { active: searchParams.category === category.value }]"
            @tap="onCategoryChange(category.value)"
          >
            {{ category.label }}
          </view>
        </view>
      </view>

      <view class="filter-group">
        <text class="filter-label">排序：</text>
        <view class="filter-options">
          <view 
            :class="['filter-option', { active: searchParams.sort === 'newest' }]"
            @tap="onSortChange('newest')"
          >
            最新
          </view>
          <view 
            :class="['filter-option', { active: searchParams.sort === 'hot' }]"
            @tap="onSortChange('hot')"
          >
            热门
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

    <!-- 社团列表 -->
    <view v-else-if="clubList.length > 0" class="club-list">
      <view 
        v-for="club in clubList" 
        :key="club.id"
        class="club-item"
        @tap="goToClubDetail(club.id)"
      >
        <image :src="club.logo || '/static/student/default-club.png'" mode="aspectFill"></image>
        <view class="club-info">
          <view class="club-header">
            <text class="club-name">{{ club.name }}</text>
            <text class="club-category">{{ getCategoryLabel(club.category) }}</text>
          </view>
          <text class="club-description">{{ club.description || '该社团暂无描述' }}</text>
          <view class="club-stats">
            <text class="stat-item">{{ club.memberCount }}人</text>
            <text class="stat-item">{{ club.activityCount }}个活动</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="empty">
      <uni-icons type="info" size="60" color="#ccc"></uni-icons>
      <text>暂无社团数据</text>
    </view>

    <!-- 分页 -->
    <uni-pagination 
      v-if="total > 0 && !isLoading" 
      :current="searchParams.page" 
      :page-size="searchParams.limit" 
      :total="total" 
      @change="onPageChange"
      mode="number"
      prev-text="上一页"
      next-text="下一页"
    ></uni-pagination>
  </view>
</template>

<script>
import { clubApi } from '../../../api/student/club.js';
import skeleton from '../../../components/skeleton/skeleton.vue';

export default {
  components: {
    skeleton
  },
  data() {
    return {
      searchParams: {
        name: '',
        category: '',
        sort: 'newest',
        page: 1,
        limit: 10
      },
      clubList: [],
      total: 0,
      isLoading: true,
      categories: [
        { label: '全部', value: '' },
        { label: '学术科技', value: 'academic' },
        { label: '文化艺术', value: 'cultural' },
        { label: '体育健身', value: 'sports' },
        { label: '公益实践', value: 'public' },
        { label: '兴趣爱好', value: 'hobby' }
      ]
    };
  },
  onLoad() {
    this.loadClubList();
  },
  methods: {
    // 加载社团列表
    async loadClubList() {
      this.isLoading = true;
      try {
        const res = await clubApi.getClubList(this.searchParams);
        if (res.code === 200) {
          this.clubList = res.data.list || [];
          this.total = res.data.total || 0;
        } else {
          uni.showToast({ title: res.message || '加载失败', icon: 'none' });
        }
      } catch (error) {
        console.error('加载社团列表失败:', error);
        uni.showToast({ title: '网络错误', icon: 'none' });
      } finally {
        this.isLoading = false;
      }
    },
    
    // 搜索
    onSearch() {
      this.searchParams.page = 1;
      this.loadClubList();
    },
    
    // 类别筛选
    onCategoryChange(category) {
      this.searchParams.category = category;
      this.searchParams.page = 1;
      this.loadClubList();
    },
    
    // 排序切换
    onSortChange(sort) {
      this.searchParams.sort = sort;
      this.searchParams.page = 1;
      this.loadClubList();
    },
    
    // 分页切换
    onPageChange(page) {
      this.searchParams.page = page;
      this.loadClubList();
    },
    
    // 跳转到社团详情
    goToClubDetail(clubId) {
      uni.navigateTo({
        url: `/pages/student/club/detail?id=${clubId}`
      });
    },
    
    // 获取类别显示名称
    getCategoryLabel(value) {
      const category = this.categories.find(c => c.value === value);
      return category ? category.label : value;
    }
  }
};
</script>

<style scoped>
.club-list-container {
  padding-bottom: 20rpx;
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

/* 社团列表 */
.club-list {
  background-color: #fff;
}

.club-item {
  display: flex;
  padding: 20rpx;
  margin-bottom: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  /* 增加点击区域 */
  border: 2rpx solid transparent;
}

.club-item:active {
  border-color: #007aff;
  background-color: rgba(0, 122, 255, 0.05);
}

.club-item image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 10rpx;
}

.club-info {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.club-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.club-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.club-category {
  padding: 4rpx 12rpx;
  font-size: 22rpx;
  color: #fff;
  background-color: #007aff;
  border-radius: 10rpx;
}

.club-description {
  margin-top: 10rpx;
  font-size: 26rpx;
  color: #666;
  line-height: 36rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.club-stats {
  margin-top: 10rpx;
  display: flex;
}

.stat-item {
  margin-right: 30rpx;
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
