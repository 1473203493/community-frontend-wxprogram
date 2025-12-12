"use strict";
const common_vendor = require("../../common/vendor.js");
const api_student_home = require("../../api/student/home.js");
const common_assets = require("../../common/assets.js");
const lazyImage = () => "../../components/lazy-image/lazy-image.js";
const studentTabbar = () => "../../components/student-tabbar/student-tabbar.js";
const skeleton = () => "../../components/skeleton/skeleton.js";
const _sfc_main = {
  components: {
    lazyImage,
    studentTabbar,
    skeleton
  },
  data() {
    return {
      bannerList: [],
      popularClubs: [],
      latestActivities: [],
      loading: false
    };
  },
  onLoad() {
    this.loadHomeInfo();
  },
  methods: {
    // 加载首页信息
    async loadHomeInfo() {
      this.loading = true;
      try {
        const res = await api_student_home.homeApi.getHomeInfo();
        if (res.code === 200) {
          this.bannerList = res.data.banners || [];
          this.popularClubs = res.data.popularClubs || [];
          this.latestActivities = res.data.latestActivities || [];
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/index.vue:108", "加载首页信息失败:", error);
        common_vendor.index.showToast({
          title: "加载失败，点击重试",
          icon: "none",
          duration: 3e3
        });
      } finally {
        this.loading = false;
      }
    },
    // 格式化日期
    formatDate(dateStr, isDateOnly = false) {
      if (!dateStr)
        return "";
      const date = new Date(dateStr);
      if (isDateOnly) {
        return `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      }
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    },
    // 跳转到搜索页面
    goToSearch() {
      common_vendor.index.navigateTo({
        url: "/pages/student/search"
      });
    },
    // 跳转到个人中心
    goToPersonal() {
      common_vendor.index.navigateTo({
        url: "/pages/student/personal/index"
      });
    },
    // 跳转到社团列表
    goToClubList() {
      common_vendor.index.navigateTo({
        url: "/pages/student/club/list"
      });
    },
    // 跳转到社团详情
    goToClubDetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/student/club/detail?id=${id}`
      });
    },
    // 跳转到活动列表
    goToActivityList() {
      common_vendor.index.navigateTo({
        url: "/pages/student/activity/list"
      });
    },
    // 跳转到活动详情
    goToActivityDetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/student/activity/detail?id=${id}`
      });
    },
    // 底部导航栏变化
    onTabChange(index) {
      common_vendor.index.__f__("log", "at pages/student/index.vue:175", "当前选中的tab:", index);
    }
  }
};
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  const _easycom_lazy_image2 = common_vendor.resolveComponent("lazy-image");
  const _component_uni_swiper_item = common_vendor.resolveComponent("uni-swiper-item");
  const _component_uni_swiper = common_vendor.resolveComponent("uni-swiper");
  const _easycom_skeleton2 = common_vendor.resolveComponent("skeleton");
  (_component_uni_icons + _easycom_lazy_image2 + _component_uni_swiper_item + _component_uni_swiper + _easycom_skeleton2)();
}
const _easycom_lazy_image = () => "../../components/lazy-image/lazy-image.js";
const _easycom_skeleton = () => "../../components/skeleton/skeleton.js";
if (!Math) {
  (_easycom_lazy_image + _easycom_skeleton)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0,
    b: common_vendor.p({
      type: "search",
      size: "18",
      color: "#999"
    }),
    c: common_vendor.o((...args) => $options.goToSearch && $options.goToSearch(...args)),
    d: common_vendor.o($options.goToPersonal),
    e: common_vendor.p({
      type: "person",
      size: "24",
      color: "#666"
    }),
    f: $data.bannerList.length > 0
  }, $data.bannerList.length > 0 ? {
    g: common_vendor.f($data.bannerList, (item, index, i0) => {
      return {
        a: "c78e6e6b-4-" + i0 + "," + ("c78e6e6b-3-" + i0),
        b: common_vendor.p({
          src: item.image,
          mode: "aspectFill"
        }),
        c: index,
        d: "c78e6e6b-3-" + i0 + ",c78e6e6b-2"
      };
    }),
    h: common_vendor.p({
      ["indicator-dots"]: true,
      autoplay: true,
      interval: 3e3,
      duration: 500
    })
  } : {
    i: common_vendor.p({
      ["is-loading"]: true,
      ["show-rect"]: true,
      ["rect-style"]: {
        height: "300rpx",
        width: "100%"
      }
    })
  }, {
    j: common_vendor.o((...args) => $options.goToClubList && $options.goToClubList(...args)),
    k: $data.popularClubs.length > 0
  }, $data.popularClubs.length > 0 ? {
    l: common_vendor.f($data.popularClubs, (club, k0, i0) => {
      return {
        a: "c78e6e6b-6-" + i0,
        b: common_vendor.p({
          src: club.logo || "/static/student/default-club.png",
          mode: "aspectFill"
        }),
        c: common_vendor.t(club.name),
        d: common_vendor.t(club.description || "暂无简介"),
        e: common_vendor.t(club.memberCount),
        f: common_vendor.t($options.formatDate(club.createTime, true)),
        g: club.id,
        h: common_vendor.o(($event) => $options.goToClubDetail(club.id), club.id)
      };
    })
  } : {
    m: common_vendor.p({
      ["is-loading"]: true,
      ["show-list"]: true,
      ["list-count"]: 3
    })
  }, {
    n: common_vendor.o((...args) => $options.goToActivityList && $options.goToActivityList(...args)),
    o: $data.latestActivities.length > 0
  }, $data.latestActivities.length > 0 ? {
    p: common_vendor.f($data.latestActivities, (activity, k0, i0) => {
      return {
        a: "c78e6e6b-8-" + i0,
        b: common_vendor.p({
          src: activity.cover || "/static/student/default-activity.png",
          mode: "aspectFill"
        }),
        c: common_vendor.t(activity.title),
        d: common_vendor.t(activity.clubName),
        e: common_vendor.t($options.formatDate(activity.startTime)),
        f: activity.id,
        g: common_vendor.o(($event) => $options.goToActivityDetail(activity.id), activity.id)
      };
    })
  } : {
    q: common_vendor.p({
      ["is-loading"]: true,
      ["show-list"]: true,
      ["list-count"]: 3
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c78e6e6b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/student/index.js.map
