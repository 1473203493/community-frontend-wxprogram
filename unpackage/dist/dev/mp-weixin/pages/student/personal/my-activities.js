"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activities: []
    };
  },
  onLoad() {
    this.loadActivities();
  },
  methods: {
    loadActivities() {
      this.activities = [
        {
          id: 1,
          title: "校园音乐节",
          coverImage: "/static/student/activities/music.jpg",
          startTime: "2023-10-15 19:00",
          status: "ongoing",
          statusText: "进行中"
        },
        {
          id: 2,
          title: "社团招新大会",
          coverImage: "/static/student/activities/club.jpg",
          startTime: "2023-09-25 14:30",
          status: "completed",
          statusText: "已结束"
        }
      ];
    },
    viewActivity(activity) {
      common_vendor.index.navigateTo({
        url: `/pages/student/activity/detail?id=${activity.id}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.activities, (activity, k0, i0) => {
      return {
        a: activity.coverImage,
        b: common_vendor.t(activity.title),
        c: common_vendor.t(activity.startTime),
        d: common_vendor.t(activity.statusText),
        e: common_vendor.n(activity.status),
        f: activity.id,
        g: common_vendor.o(($event) => $options.viewActivity(activity), activity.id)
      };
    }),
    b: $data.activities.length === 0
  }, $data.activities.length === 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8c6aca8f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/student/personal/my-activities.js.map
