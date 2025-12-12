"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "skeleton",
  props: {
    // 是否显示骨架屏
    isLoading: {
      type: Boolean,
      default: true
    },
    // 是否显示头像
    showAvatar: {
      type: Boolean,
      default: false
    },
    // 头像样式
    avatarStyle: {
      type: Object,
      default: () => ({})
    },
    // 是否显示矩形区块
    showRect: {
      type: Boolean,
      default: false
    },
    // 矩形区块样式
    rectStyle: {
      type: Object,
      default: () => ({})
    },
    // 是否显示文本行
    showText: {
      type: Boolean,
      default: false
    },
    // 文本行数
    textLines: {
      type: Number,
      default: 3
    },
    // 文本行样式
    textStyle: {
      type: Object,
      default: () => ({})
    },
    // 是否显示列表
    showList: {
      type: Boolean,
      default: false
    },
    // 列表项数量
    listCount: {
      type: Number,
      default: 3
    },
    // 是否显示加载文本
    showLoadingText: {
      type: Boolean,
      default: false
    },
    // 加载文本
    loadingText: {
      type: String,
      default: "加载中..."
    }
  },
  methods: {
    // 获取文本行样式
    getTextStyle(index) {
      const style = { ...this.textStyle };
      if (index === 1) {
        style.width = "80%";
      } else if (index === this.textLines) {
        style.width = "60%";
      } else {
        style.width = "90%";
      }
      return style;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.showAvatar
  }, $props.showAvatar ? {
    b: common_vendor.s($props.avatarStyle)
  } : {}, {
    c: $props.showRect
  }, $props.showRect ? {
    d: common_vendor.s($props.rectStyle)
  } : {}, {
    e: $props.showText
  }, $props.showText ? {
    f: common_vendor.f($props.textLines, (i, k0, i0) => {
      return {
        a: i,
        b: common_vendor.s($options.getTextStyle(i))
      };
    })
  } : {}, {
    g: $props.showList
  }, $props.showList ? {
    h: common_vendor.f($props.listCount, (i, k0, i0) => {
      return {
        a: i
      };
    })
  } : {}, {
    i: $props.showLoadingText
  }, $props.showLoadingText ? {
    j: common_vendor.t($props.loadingText)
  } : {}, {
    k: $props.isLoading ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-54f1e491"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/skeleton/skeleton.js.map
