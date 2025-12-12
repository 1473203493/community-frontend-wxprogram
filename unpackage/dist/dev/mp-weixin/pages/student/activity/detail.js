"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_student_activity = require("../../../api/student/activity.js");
const lazyImage = () => "../../../components/lazy-image/lazy-image.js";
const _sfc_main = {
  components: {
    lazyImage
  },
  data() {
    return {
      activityId: "",
      activityDetail: {},
      isJoined: false,
      // 是否已报名
      canSignUp: true
      // 是否可以报名
    };
  },
  onLoad(options) {
    this.activityId = options.id;
    this.loadActivityDetail();
  },
  methods: {
    // 加载活动详情
    async loadActivityDetail() {
      common_vendor.index.showLoading({ title: "加载中" });
      try {
        const res = await api_student_activity.activityApi.getActivityDetail(this.activityId);
        if (res.code === 200) {
          this.activityDetail = res.data;
          this.isJoined = res.data.isJoined || false;
          this.canSignUp = this.checkCanSignUp();
        } else {
          common_vendor.index.showToast({ title: res.message || "加载失败", icon: "none" });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/activity/detail.vue:117", "加载活动详情失败:", error);
        common_vendor.index.showToast({ title: "网络错误", icon: "none" });
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    // 检查是否可以报名
    checkCanSignUp() {
      const now = /* @__PURE__ */ new Date();
      const startTime = new Date(this.activityDetail.startTime);
      this.activityDetail.endTime ? new Date(this.activityDetail.endTime) : null;
      const maxParticipants = this.activityDetail.maxParticipants;
      const joinCount = this.activityDetail.joinCount || 0;
      if (now > startTime)
        return false;
      if (maxParticipants && joinCount >= maxParticipants)
        return false;
      if (this.activityDetail.status === "closed")
        return false;
      return true;
    },
    // 报名活动
    async signUpActivity() {
      try {
        const res = await api_student_activity.activityApi.signUpActivity(this.activityId);
        if (res.code === 200) {
          common_vendor.index.showToast({ title: "报名成功", icon: "success" });
          this.isJoined = true;
          this.activityDetail.joinCount = (this.activityDetail.joinCount || 0) + 1;
        } else {
          common_vendor.index.showToast({ title: res.message || "报名失败", icon: "none" });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/activity/detail.vue:152", "报名活动失败:", error);
        common_vendor.index.showToast({ title: "网络错误", icon: "none" });
      }
    },
    // 取消报名
    async cancelSignUp() {
      try {
        const res = await api_student_activity.activityApi.cancelSignUpActivity(this.activityId);
        if (res.code === 200) {
          common_vendor.index.showToast({ title: "已取消报名", icon: "success" });
          this.isJoined = false;
          this.activityDetail.joinCount = Math.max(0, (this.activityDetail.joinCount || 0) - 1);
        } else {
          common_vendor.index.showToast({ title: res.message || "取消失败", icon: "none" });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/activity/detail.vue:169", "取消报名失败:", error);
        common_vendor.index.showToast({ title: "网络错误", icon: "none" });
      }
    },
    // 跳转到社团详情
    goToClubDetail(clubId) {
      if (clubId) {
        common_vendor.index.navigateTo({
          url: `/pages/student/club/detail?id=${clubId}`
        });
      }
    },
    // 格式化日期
    formatDate(dateStr, timeOnly = false) {
      if (!dateStr)
        return "";
      const date = new Date(dateStr);
      if (timeOnly) {
        return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
      }
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    },
    // 获取状态文本
    getStatusText(status) {
      const statusMap = {
        "upcoming": "即将开始",
        "ongoing": "进行中",
        "ended": "已结束",
        "closed": "已关闭"
      };
      return statusMap[status] || status;
    },
    // 获取按钮文本
    getButtonText() {
      if (this.activityDetail.status === "ended" || this.activityDetail.status === "closed") {
        return "活动已结束";
      }
      const now = /* @__PURE__ */ new Date();
      const startTime = new Date(this.activityDetail.startTime);
      if (now > startTime) {
        return "活动已开始";
      }
      if (this.activityDetail.maxParticipants && this.activityDetail.joinCount >= this.activityDetail.maxParticipants) {
        return "名额已满";
      }
      return "不可报名";
    }
  }
};
if (!Array) {
  const _easycom_lazy_image2 = common_vendor.resolveComponent("lazy-image");
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  (_easycom_lazy_image2 + _component_uni_icons)();
}
const _easycom_lazy_image = () => "../../../components/lazy-image/lazy-image.js";
if (!Math) {
  _easycom_lazy_image();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      src: $data.activityDetail.cover || "/static/student/default-activity.png",
      mode: "aspectFill"
    }),
    b: $data.activityDetail.status
  }, $data.activityDetail.status ? {
    c: common_vendor.t($options.getStatusText($data.activityDetail.status))
  } : {}, {
    d: common_vendor.t($data.activityDetail.title),
    e: common_vendor.p({
      type: "time",
      size: "16",
      color: "#999"
    }),
    f: common_vendor.t($options.formatDate($data.activityDetail.startTime)),
    g: $data.activityDetail.endTime
  }, $data.activityDetail.endTime ? {
    h: common_vendor.t($options.formatDate($data.activityDetail.endTime, true))
  } : {}, {
    i: common_vendor.p({
      type: "location",
      size: "16",
      color: "#999"
    }),
    j: common_vendor.t($data.activityDetail.location || "地点待定"),
    k: common_vendor.p({
      type: "person",
      size: "16",
      color: "#999"
    }),
    l: common_vendor.t($data.activityDetail.joinCount || 0),
    m: $data.activityDetail.maxParticipants
  }, $data.activityDetail.maxParticipants ? {
    n: common_vendor.t($data.activityDetail.maxParticipants)
  } : {}, {
    o: common_vendor.p({
      src: $data.activityDetail.clubLogo || "/static/student/default-club.png",
      mode: "aspectFill"
    }),
    p: common_vendor.t($data.activityDetail.clubName),
    q: common_vendor.p({
      type: "arrowright",
      size: "16",
      color: "#ccc"
    }),
    r: common_vendor.o(($event) => $options.goToClubDetail($data.activityDetail.clubId)),
    s: common_vendor.t($data.activityDetail.description || "该活动暂无详情"),
    t: !$data.isJoined && $data.canSignUp
  }, !$data.isJoined && $data.canSignUp ? {
    v: common_vendor.o((...args) => $options.signUpActivity && $options.signUpActivity(...args))
  } : $data.isJoined ? {
    x: common_vendor.o((...args) => $options.cancelSignUp && $options.cancelSignUp(...args))
  } : {
    y: common_vendor.t($options.getButtonText())
  }, {
    w: $data.isJoined
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0ed1acff"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/student/activity/detail.js.map
