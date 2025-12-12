<template>
  <view class="login-container">
    <view class="login-header">
      <image src="/static/student/logo.png" class="logo"></image>
      <text class="title">社团活动管理系统</text>
    </view>

    <view class="login-form">
      <!-- 登录方式切换 -->
      <view class="login-tabs">
        <text 
          class="tab-item" 
          :class="{ active: loginType === 'email' }"
          @tap="loginType = 'email'"
        >
          账号登录
        </text>
        <text 
          class="tab-item" 
          :class="{ active: loginType === 'wechat' }"
          @tap="loginType = 'wechat'"
        >
          微信登录
        </text>
      </view>

      <!-- 邮箱登录表单 -->
      <view v-if="loginType === 'email'" class="email-login-form">
        <view class="input-group">
          <text class="input-label">邮箱</text>
          <input 
            v-model="loginForm.email" 
            type="email" 
            placeholder="请输入邮箱"
            class="input-control"
          />
        </view>

        <view class="input-group">
          <text class="input-label">密码</text>
          <input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="请输入密码"
            class="input-control"
          />
        </view>

        <view class="form-actions">
          <text class="forget-password" @tap="goToResetPassword">忘记密码？</text>
        </view>

        <button 
          class="login-btn" 
          :disabled="isLoginDisabled" 
          @click="emailLogin"
        >
          登录
        </button>

        <view class="register-link">
          <text>还没有账号？</text>
          <text class="register-btn" @tap="goToRegister">立即注册</text>
        </view>
      </view>

      <!-- 微信登录表单 -->
      <view v-else class="wechat-login-form">
        <view class="wechat-login-tip">
          <text>使用微信账号登录，快速便捷</text>
        </view>

        <button 
          class="wechat-login-btn" 
          open-type="getUserInfo" 
          @getuserinfo="wechatLogin"
        >
          <image src="/static/student/wechat-icon.png" class="wechat-icon"></image>
          微信快捷登录
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { authApi } from '../../../api/student/auth.js';

export default {
  data() {
    return {
      loginType: 'email', // 'email' or 'wechat'
      loginForm: {
        email: '',
        password: ''
      },
      isLoginDisabled: false
    };
  },
  methods: {
    // 邮箱登录
    async emailLogin() {
      // 表单验证
      if (!this.loginForm.email) {
        return uni.showToast({ title: '请输入邮箱', icon: 'none' });
      }
      if (!this.loginForm.password) {
        return uni.showToast({ title: '请输入密码', icon: 'none' });
      }

      // 正则验证邮箱格式
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.loginForm.email)) {
        return uni.showToast({ title: '请输入正确的邮箱格式', icon: 'none' });
      }

      this.isLoginDisabled = true;
      uni.showLoading({ title: '登录中' });

      try {
        const res = await authApi.login(this.loginForm);
        if (res.code === 200) {
          // 保存登录信息到本地
          uni.setStorageSync('token', res.data.token);
          uni.setStorageSync('userInfo', res.data.userInfo);
          
          uni.showToast({ title: '登录成功', icon: 'success' });
          // 跳转到首页
          setTimeout(() => {
            uni.switchTab({ url: '/pages/student/index' });
          }, 1500);
        } else {
          uni.showToast({ title: res.message || '登录失败', icon: 'none' });
        }
      } catch (error) {
        console.error('登录失败:', error);
        uni.showToast({ title: '网络错误', icon: 'none' });
      } finally {
        uni.hideLoading();
        this.isLoginDisabled = false;
      }
    },

    // 微信登录
    async wechatLogin(e) {
      if (!e.detail.userInfo) {
        return uni.showToast({ title: '请授权微信信息', icon: 'none' });
      }

      uni.showLoading({ title: '登录中' });

      try {
        // 获取微信登录code
        const codeRes = await uni.login();
        if (codeRes.errMsg === 'login:ok') {
          const res = await authApi.wechatLogin(codeRes.code);
          if (res.code === 200) {
            // 保存登录信息到本地
            uni.setStorageSync('token', res.data.token);
            uni.setStorageSync('userInfo', res.data.userInfo);
            
            uni.showToast({ title: '登录成功', icon: 'success' });
            // 跳转到首页
            setTimeout(() => {
              uni.switchTab({ url: '/pages/student/index' });
            }, 1500);
          } else if (res.code === 401) {
            // 需要绑定邮箱
            uni.showToast({ title: '请绑定邮箱', icon: 'none' });
            setTimeout(() => {
              uni.navigateTo({
                url: `/pages/student/auth/bind-email?openid=${res.data.openid}`
              });
            }, 1500);
          } else {
            uni.showToast({ title: res.message || '登录失败', icon: 'none' });
          }
        }
      } catch (error) {
        console.error('微信登录失败:', error);
        uni.showToast({ title: '网络错误', icon: 'none' });
      } finally {
        uni.hideLoading();
      }
    },

    // 跳转到注册页面
    goToRegister() {
      uni.navigateTo({
        url: '/pages/student/auth/register'
      });
    },

    // 跳转到忘记密码页面
    goToResetPassword() {
      uni.navigateTo({
        url: '/pages/student/auth/reset-password'
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  padding: 60rpx 30rpx;
  background-color: #f5f5f5;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60rpx;
}

.logo {
  width: 150rpx;
  height: 150rpx;
  margin-bottom: 20rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.login-form {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.login-tabs {
  display: flex;
  margin-bottom: 30rpx;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 15rpx 0;
  font-size: 28rpx;
  color: #666;
  border-bottom: 2rpx solid #eee;
}

.tab-item.active {
  color: #007aff;
  border-bottom-color: #007aff;
  font-weight: bold;
}

/* 邮箱登录表单 */
.email-login-form .input-group {
  margin-bottom: 30rpx;
}

.input-label {
  display: block;
  font-size: 26rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.input-control {
  width: 100%;
  padding: 20rpx;
  font-size: 28rpx;
  border: 2rpx solid #eee;
  border-radius: 8rpx;
  background-color: #fafafa;
  box-sizing: border-box;
}

.input-control:focus {
  border-color: #007aff;
  background-color: #fff;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30rpx;
}

.forget-password {
  font-size: 24rpx;
  color: #007aff;
}

.login-btn {
  width: 100%;
  height: 80rpx;
  font-size: 30rpx;
  color: #fff;
  background-color: #007aff;
  border-radius: 40rpx;
  margin-bottom: 20rpx;
}

.register-link {
  text-align: center;
  font-size: 26rpx;
  color: #999;
}

.register-btn {
  color: #007aff;
  margin-left: 10rpx;
}

/* 微信登录表单 */
.wechat-login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wechat-login-tip {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 40rpx;
}

.wechat-login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80rpx;
  font-size: 30rpx;
  color: #fff;
  background-color: #07c160;
  border-radius: 40rpx;
}

.wechat-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 10rpx;
  vertical-align: middle;
}
</style>
