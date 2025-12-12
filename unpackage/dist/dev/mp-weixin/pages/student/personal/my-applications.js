"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      applications: []
    };
  },
  onLoad() {
    this.loadApplications();
  },
  methods: {
    loadApplications() {
      this.applications = [
        {
          id: 1,
          clubName: "音乐社",
          status: "pending",
          statusText: "待审核",
          createTime: "2023-10-01 10:30",
          remark: ""
        },
        {
          id: 2,
          clubName: "篮球社",
          status: "approved",
          statusText: "已通过",
          createTime: "2023-09-25 14:30",
          remark: "欢迎加入篮球社！"
        },
        {
          id: 3,
          clubName: "摄影社",
          status: "rejected",
          statusText: "已拒绝",
          createTime: "2023-09-20 09:15",
          remark: "很遗憾，您的申请未通过审核。"
        }
      ];
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.applications, (application, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(application.clubName),
        b: common_vendor.t(application.statusText),
        c: common_vendor.n(application.status),
        d: common_vendor.t(application.createTime),
        e: application.remark
      }, application.remark ? {
        f: common_vendor.t(application.remark)
      } : {}, {
        g: application.id
      });
    }),
    b: $data.applications.length === 0
  }, $data.applications.length === 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8bee7b2e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/student/personal/my-applications.js.map
