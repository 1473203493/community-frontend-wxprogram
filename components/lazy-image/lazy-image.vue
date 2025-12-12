<template>
  <view class="lazy-image-container">
    <image 
      v-if="show" 
      :src="src" 
      :mode="mode" 
      :style="imageStyle"
      class="lazy-image"
      @load="onLoad"
      @error="onError"
    ></image>
    <image 
      v-else 
      src="/static/student/placeholder.png" 
      :mode="mode" 
      :style="imageStyle"
      class="lazy-image"
    ></image>
  </view>
</template>

<script>
export default {
  name: 'lazy-image',
  props: {
    src: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      default: 'aspectFill'
    },
    delay: {
      type: Number,
      default: 0
    },
    width: {
      type: [String, Number],
      default: 'auto'
    },
    height: {
      type: [String, Number],
      default: 'auto'
    }
  },
  data() {
    return {
      show: false,
      observer: null,
      timeout: null
    };
  },
  computed: {
    imageStyle() {
      return {
        width: typeof this.width === 'number' ? `${this.width}rpx` : this.width,
        height: typeof this.height === 'number' ? `${this.height}rpx` : this.height
      };
    }
  },
  mounted() {
    if (this.delay > 0) {
      this.timeout = setTimeout(() => {
        this.initObserver();
      }, this.delay);
    } else {
      this.initObserver();
    }
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },
  methods: {
    // 初始化观察者
    initObserver() {
      // 检查是否支持IntersectionObserver
      if (typeof uni.createIntersectionObserver !== 'function') {
        // 不支持的话直接显示图片
        this.show = true;
        return;
      }

      this.observer = uni.createIntersectionObserver(this, {
        thresholds: [0],
        initialRatio: 0,
        observeAll: false
      });

      this.observer.observe('.lazy-image-container', (res) => {
        if (res.intersectionRatio > 0) {
          this.show = true;
          this.observer.disconnect();
        }
      });
    },

    // 图片加载完成
    onLoad(e) {
      this.$emit('load', e);
    },

    // 图片加载失败
    onError(e) {
      this.$emit('error', e);
    }
  }
};
</script>

<style scoped>
.lazy-image-container {
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.lazy-image-container .lazy-image {
  transition: opacity 0.3s ease;
}
</style>
