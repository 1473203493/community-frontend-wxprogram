"use strict";
const common_vendor = require("../../common/vendor.js");
const api_student_home = require("../../api/student/home.js");
const api_student_activity = require("../../api/student/activity.js");
const api_student_club = require("../../api/student/club.js");
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
      // 设置默认轮播图数据，使用static/student文件夹里的图片
      bannerList: [
        { image: "/static/student/118675776_p0.jpg" },
        { image: "/static/student/118675776_p0(1).png" },
        { image: "/static/student/logo.png" }
      ],
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
        const homeRes = await api_student_home.homeApi.getHomeInfo();
        common_vendor.index.__f__("log", "at pages/student/index.vue:117", "首页API响应:", homeRes);
        if (homeRes.code === 200) {
          if (homeRes.data && homeRes.data.banners && homeRes.data.banners.length > 0) {
            this.bannerList = homeRes.data.banners;
          } else {
            common_vendor.index.__f__("log", "at pages/student/index.vue:124", "首页API未返回轮播图数据，使用默认图片");
            this.bannerList = [
              { image: "/static/student/118675776_p0.jpg" },
              { image: "/static/student/118675776_p0(1).png" },
              { image: "/static/student/logo.png" }
            ];
          }
        } else {
          common_vendor.index.__f__("error", "at pages/student/index.vue:133", "首页API请求失败:", homeRes);
          this.bannerList = [
            { image: "/static/student/logo.png" }
          ];
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/index.vue:140", "加载首页信息失败:", error);
        this.bannerList = [
          { image: "/static/student/logo.png" }
        ];
      }
      try {
        const clubRes = await api_student_club.clubApi.getClubList({ sort: "hot", page: 1, limit: 5 });
        common_vendor.index.__f__("log", "at pages/student/index.vue:150", "热门社团API响应:", clubRes);
        if (clubRes.code === 200) {
          this.popularClubs = clubRes.data.list || [];
        } else {
          common_vendor.index.__f__("error", "at pages/student/index.vue:154", "热门社团API请求失败:", clubRes);
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/index.vue:157", "加载热门社团失败:", error);
      }
      try {
        const activityRes = await api_student_activity.activityApi.getActivityList({ page: 1, size: 3 });
        common_vendor.index.__f__("log", "at pages/student/index.vue:163", "活动列表API响应:", activityRes);
        if (activityRes.code === 200) {
          this.latestActivities = activityRes.data.list || [];
        } else {
          common_vendor.index.__f__("error", "at pages/student/index.vue:167", "活动列表API请求失败:", activityRes);
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/index.vue:170", "加载最新活动失败:", error);
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
      common_vendor.index.switchTab({
        url: "/pages/student/personal/index"
      });
    },
    // 跳转到社团列表
    goToClubList() {
      common_vendor.index.switchTab({
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
      common_vendor.index.switchTab({
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
      common_vendor.index.__f__("log", "at pages/student/index.vue:231", "当前选中的tab:", index);
    }
  }
};
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  const _component_uni_swiper_item = common_vendor.resolveComponent("uni-swiper-item");
  const _component_uni_swiper = common_vendor.resolveComponent("uni-swiper");
  const _easycom_lazy_image2 = common_vendor.resolveComponent("lazy-image");
  const _easycom_skeleton2 = common_vendor.resolveComponent("skeleton");
  (_component_uni_icons + _component_uni_swiper_item + _component_uni_swiper + _easycom_lazy_image2 + _easycom_skeleton2)();
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
    f: common_vendor.f($data.bannerList, (item, index, i0) => {
      return {
        a: item.image,
        b: index,
        c: "c78e6e6b-3-" + i0 + ",c78e6e6b-2"
      };
    }),
    g: common_vendor.p({
      ["indicator-dots"]: true,
      autoplay: true,
      interval: 3e3,
      duration: 500,
      circular: true,
      ["indicator-color"]: "rgba(255, 255, 255, 0.3)",
      ["indicator-active-color"]: "#fff"
    }),
    h: common_vendor.o((...args) => $options.goToClubList && $options.goToClubList(...args)),
    i: $data.popularClubs.length > 0
  }, $data.popularClubs.length > 0 ? {
    j: common_vendor.f($data.popularClubs, (club, k0, i0) => {
      return {
        a: "c78e6e6b-4-" + i0,
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
    k: common_vendor.p({
      ["is-loading"]: true,
      ["show-list"]: true,
      ["list-count"]: 3
    })
  }, {
    l: common_vendor.o((...args) => $options.goToActivityList && $options.goToActivityList(...args)),
    m: $data.latestActivities.length > 0
  }, $data.latestActivities.length > 0 ? {
    n: common_vendor.f($data.latestActivities, (activity, k0, i0) => {
      return {
        a: "c78e6e6b-6-" + i0,
        b: common_vendor.p({
          src: activity.cover || "/static/student/default-club.png",
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
    o: common_vendor.p({
      ["is-loading"]: true,
      ["show-list"]: true,
      ["list-count"]: 3
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c78e6e6b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/student/index.js.map
