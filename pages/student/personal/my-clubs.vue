<template>
  <view class="my-clubs-container">
    <view class="clubs-list">
      <view 
        v-for="club in clubs" 
        :key="club.id" 
        class="club-item"
        @click="viewClub(club)"
      >
        <image :src="club.logo" class="club-logo"></image>
        <view class="club-info">
          <text class="club-name">{{ club.name }}</text>
          <text class="club-description">{{ club.description }}</text>
          <view class="club-role">
            <text class="role-tag">{{ club.role }}</text>
          </view>
        </view>
      </view>
      
      <view v-if="clubs.length === 0" class="empty">
        <text>暂无加入的社团</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      clubs: []
    };
  },
  onLoad() {
    this.loadClubs();
  },
  methods: {
    loadClubs() {
      // 模拟数据
      this.clubs = [
        {
          id: 1,
          name: '音乐社',
          logo: '/static/student/club-music.png',
          description: '热爱音乐的同学们的聚集地',
          role: '成员'
        },
        {
          id: 2,
          name: '篮球社',
          logo: '/static/student/club-basketball.png',
          description: '享受篮球运动的快乐',
          role: '副社长'
        }
      ];
    },
    viewClub(club) {
      // 跳转到社团详情页
      uni.navigateTo({
        url: `/pages/student/club/detail?id=${club.id}`
      });
    }
  }
};
</script>

<style scoped>
.my-clubs-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.clubs-list {
  padding: 20rpx;
}

.club-item {
  display: flex;
  background-color: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.club-logo {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin: 20rpx;
  object-fit: cover;
}

.club-info {
  flex: 1;
  padding: 20rpx 20rpx 20rpx 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.club-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.club-description {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.club-role {
  align-self: flex-start;
}

.role-tag {
  font-size: 20rpx;
  padding: 5rpx 10rpx;
  border-radius: 5rpx;
  background-color: #e6f7ff;
  color: #1890ff;
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