"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_student_club = require("../../../api/student/club.js");
const lazyImage = () => "../../../components/lazy-image/lazy-image.js";
const _sfc_main = {
  components: {
    lazyImage
  },
  data() {
    return {
      clubId: "",
      clubDetail: {},
      isJoined: false
      // 是否已加入社团
    };
  },
  onLoad(options) {
    this.clubId = options.id;
    this.loadClubDetail();
  },
  methods: {
    // 加载社团详情
    async loadClubDetail() {
      var _a;
      common_vendor.index.showLoading({ title: "加载中" });
      try {
        const res = await api_student_club.clubApi.getClubDetail(this.clubId);
        common_vendor.index.__f__("log", "at pages/student/club/detail.vue:99", "【社团详情请求结果】", res);
        if (res.success) {
          this.clubDetail = res.data;
          this.isJoined = ((_a = res.data) == null ? void 0 : _a.isJoined) ?? false;
        } else {
          common_vendor.index.showToast({ title: res.message || "加载失败", icon: "none" });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/club/detail.vue:108", "加载社团详情失败:", error);
        common_vendor.index.showToast({ title: "网络错误", icon: "none" });
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    // 申请加入社团
    async applyToJoinClub() {
      try {
        const remark = "";
        const res = await api_student_club.clubApi.applyToJoinClub(this.clubId, remark);
        if (res.code === 200) {
          common_vendor.index.showToast({ title: "申请提交成功，请等待审核", icon: "success" });
        } else {
          common_vendor.index.showToast({ title: res.message || "申请失败", icon: "none" });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/club/detail.vue:127", "申请加入社团失败:", error);
        common_vendor.index.showToast({ title: "网络错误", icon: "none" });
      }
    },
    // 跳转到活动详情
    goToActivityDetail(activityId) {
      common_vendor.index.navigateTo({
        url: `/pages/student/activity/detail?id=${activityId}`
      });
    },
    // 格式化日期
    formatDate(dateStr) {
      if (!dateStr)
        return "";
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    }
  }
};
if (!Array) {
  const _easycom_lazy_image2 = common_vendor.resolveComponent("lazy-image");
  _easycom_lazy_image2();
}
const _easycom_lazy_image = () => "../../../components/lazy-image/lazy-image.js";
if (!Math) {
  _easycom_lazy_image();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      src: $data.clubDetail.logo || "/static/student/default-club.png",
      mode: "aspectFill"
    }),
    b: common_vendor.t($data.clubDetail.name),
    c: common_vendor.t($data.clubDetail.category || "未分类"),
    d: common_vendor.t($data.clubDetail.memberCount),
    e: common_vendor.t($data.clubDetail.description || "该社团暂无简介"),
    f: common_vendor.p({
      src: $data.clubDetail.managerAvatar || "/static/student/default-avatar.png",
      mode: "aspectFill"
    }),
    g: common_vendor.t($data.clubDetail.managerName || "未知"),
    h: common_vendor.f($data.clubDetail.recentActivities, (activity, k0, i0) => {
      return {
        a: common_vendor.t(activity.title),
        b: common_vendor.t($options.formatDate(activity.startTime)),
        c: activity.id,
        d: common_vendor.o(($event) => $options.goToActivityDetail(activity.id), activity.id)
      };
    }),
    i: !$data.clubDetail.recentActivities || $data.clubDetail.recentActivities.length === 0
  }, !$data.clubDetail.recentActivities || $data.clubDetail.recentActivities.length === 0 ? {} : {}, {
    j: !$data.isJoined
  }, !$data.isJoined ? {
    k: common_vendor.o((...args) => $options.applyToJoinClub && $options.applyToJoinClub(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ddd713cc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/student/club/detail.js.map
