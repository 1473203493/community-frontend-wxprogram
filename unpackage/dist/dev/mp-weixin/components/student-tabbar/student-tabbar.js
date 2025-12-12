"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "student-tabbar",
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: "#999"
    },
    activeColor: {
      type: String,
      default: "#007aff"
    }
  },
  data() {
    return {
      tabbarList: [
        {
          text: "首页",
          icon: "home",
          activeIcon: "home-filled",
          size: 24,
          path: "/pages/student/index"
        },
        {
          text: "社团",
          icon: "star",
          activeIcon: "star-filled",
          size: 24,
          path: "/pages/student/club/list"
        },
        {
          text: "活动",
          icon: "calendar",
          activeIcon: "calendar-filled",
          size: 24,
          path: "/pages/student/activity/list"
        },
        {
          text: "我的",
          icon: "person",
          activeIcon: "person-filled",
          size: 24,
          path: "/pages/student/personal/index"
        }
      ]
    };
  },
  methods: {
    // 切换tab
    switchTab(item, index) {
      this.$emit("change", index);
      common_vendor.index.switchTab({
        url: item.path
      });
    }
  }
};
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabbarList, (item, index, i0) => {
      return {
        a: "9b2b9520-0-" + i0,
        b: common_vendor.p({
          type: $props.activeIndex === index ? item.activeIcon : item.icon,
          size: item.size,
          color: $props.activeIndex === index ? $props.activeColor : $props.color
        }),
        c: common_vendor.t(item.text),
        d: $props.activeIndex === index ? $props.activeColor : $props.color,
        e: index,
        f: $props.activeIndex === index ? 1 : "",
        g: common_vendor.o(($event) => $options.switchTab(item, index), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9b2b9520"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/student-tabbar/student-tabbar.js.map
