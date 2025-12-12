<template>
  <view class="change-password-container">
    <view class="form-container">
      <view class="form-item">
        <text class="label">旧密码</text>
        <input 
          type="password" 
          v-model="oldPassword" 
          placeholder="请输入旧密码" 
          class="input"
        />
      </view>
      
      <view class="form-item">
        <text class="label">新密码</text>
        <input 
          type="password" 
          v-model="newPassword" 
          placeholder="请输入新密码" 
          class="input"
        />
      </view>
      
      <view class="form-item">
        <text class="label">确认新密码</text>
        <input 
          type="password" 
          v-model="confirmPassword" 
          placeholder="请再次输入新密码" 
          class="input"
        />
      </view>
      
      <button 
        class="submit-btn" 
        @click="changePassword"
        :disabled="!canSubmit"
      >
        确认修改
      </button>
    </view>
  </view>
</template>

<script>
import authApi from '@/api/student/auth';

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  },
  computed: {
    canSubmit() {
      return this.oldPassword && this.newPassword && this.confirmPassword;
    }
  },
  methods: {
    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        uni.showToast({
          title: '两次输入的密码不一致',
          icon: 'none'
        });
        return;
      }
      
      try {
        await authApi.changePassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        });
        
        uni.showToast({
          title: '密码修改成功',
          icon: 'success'
        });
        
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      } catch (error) {
        uni.showToast({
          title: error.message || '密码修改失败',
          icon: 'none'
        });
      }
    }
  }
};
</script>

<style scoped>
.change-password-container {
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