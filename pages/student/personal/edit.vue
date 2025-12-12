<template>
  <view class="edit-container">
    <view class="form-container">
      <view class="form-item">
        <text class="label">姓名</text>
        <input 
          type="text" 
          v-model="userInfo.name" 
          placeholder="请输入姓名" 
          class="input"
        />
      </view>
      
      <view class="form-item">
        <text class="label">学号</text>
        <input 
          type="text" 
          v-model="userInfo.studentId" 
          placeholder="请输入学号" 
          class="input"
          disabled
        />
      </view>
      
      <view class="form-item">
        <text class="label">性别</text>
        <view class="gender-select">
          <radio-group @change="onGenderChange">
            <label>
              <radio :value="'male'" :checked="userInfo.gender === 'male'" />男
            </label>
            <label>
              <radio :value="'female'" :checked="userInfo.gender === 'female'" />女
            </label>
          </radio-group>
        </view>
      </view>
      
      <view class="form-item">
        <text class="label">邮箱</text>
        <input 
          type="text" 
          v-model="userInfo.email" 
          placeholder="请输入邮箱" 
          class="input"
        />
      </view>
      
      <button 
        class="submit-btn" 
        @click="saveChanges"
        :disabled="!canSubmit"
      >
        保存修改
      </button>
    </view>
  </view>
</template>

<script>
import authApi from '@/api/student/auth';

export default {
  data() {
    return {
      userInfo: {
        name: '',
        studentId: '',
        gender: 'male',
        email: ''
      }
    };
  },
  computed: {
    canSubmit() {
      return this.userInfo.name && this.userInfo.studentId && this.userInfo.email;
    }
  },
  onLoad() {
    this.loadUserInfo();
  },
  methods: {
    async loadUserInfo() {
      try {
        // 这里应该从API获取用户信息，暂时使用本地存储
        const userInfo = uni.getStorageSync('userInfo');
        if (userInfo) {
          this.userInfo = { ...this.userInfo, ...userInfo };
        }
      } catch (error) {
        console.error('加载用户信息失败', error);
      }
    },
    onGenderChange(e) {
      this.userInfo.gender = e.detail.value;
    },
    
    async saveChanges() {
      try {
        await authApi.updateUserInfo(this.userInfo);
        
        // 更新本地存储
        uni.setStorageSync('userInfo', this.userInfo);
        
        uni.showToast({
          title: '信息更新成功',
          icon: 'success'
        });
        
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      } catch (error) {
        uni.showToast({
          title: error.message || '信息更新失败',
          icon: 'none'
        });
      }
    }
  }
};
</script>

<style scoped>
.edit-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.form-container {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
}

.form-item {
  margin-bottom: 30rpx;
}

.label {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.input {
  width: 100%;
  height: 80rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 5rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.gender-select {
  padding: 20rpx 0;
}

.gender-select label {
  margin-right: 40rpx;
  font-size: 28rpx;
}

.submit-btn {
  width: 100%;
  height: 80rpx;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 5rpx;
  font-size: 32rpx;
  margin-top: 20rpx;
}

.submit-btn:disabled {
  background-color: #ccc;
}
</style>