"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "lazy-image",
  props: {
    src: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      default: "aspectFill"
    },
    delay: {
      type: Number,
      default: 0
    },
    width: {
      type: [String, Number],
      default: "auto"
    },
    height: {
      type: [String, Number],
      default: "auto"
    }
  },
  data() {
    return {
      show: false,
      currentSrc: null,
      observer: null,
      timeout: null
    };
  },
  computed: {
    imageStyle() {
      return {
        width: typeof this.width === "number" ? `${this.width}rpx` : this.width,
        height: typeof this.height === "number" ? `${this.height}rpx` : this.height
      };
    }
  },
  mounted() {
    this.currentSrc = this.src;
    if (this.delay > 0) {
      this.timeout = setTimeout(() => {
        this.initObserver();
      }, this.delay);
    } else {
      this.initObserver();
    }
  },
  watch: {
    src(newVal) {
      this.currentSrc = newVal;
      this.show = true;
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
      if (typeof common_vendor.index.createIntersectionObserver !== "function") {
        this.show = true;
        return;
      }
      this.observer = common_vendor.index.createIntersectionObserver(this, {
        thresholds: [0],
        initialRatio: 0,
        observeAll: false
      });
      this.observer.observe(".lazy-image-container", (res) => {
        if (res.intersectionRatio > 0) {
          this.show = true;
          this.observer.disconnect();
        }
      });
    },
    // 图片加载完成
    onLoad(e) {
      this.$emit("load", e);
    },
    // 图片加载失败
    onError(e) {
      this.currentSrc = "/static/student/default-club.png";
      this.$emit("error", e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.show
  }, $data.show ? {
    b: $data.currentSrc,
    c: $props.mode,
    d: common_vendor.s($options.imageStyle),
    e: common_vendor.o((...args) => $options.onLoad && $options.onLoad(...args)),
    f: common_vendor.o((...args) => $options.onError && $options.onError(...args))
  } : {
    g: common_assets._imports_0$1,
    h: $props.mode,
    i: common_vendor.s($options.imageStyle)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ba80243c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/lazy-image/lazy-image.js.map
