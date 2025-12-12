import { createSSRApp } from 'vue'
import App from './App'
import './uni.promisify.adaptor'

// 创建Vue 3应用实例
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
