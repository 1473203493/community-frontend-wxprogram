"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_student_auth = require("../../../api/student/auth.js");
const _sfc_main = {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
  },
  computed: {
    canSubmit() {
      return this.oldPassword && this.newPassword && this.confirmPassword;
    }
  },
  methods: {
    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        common_vendor.index.showToast({
          title: "两次输入的密码不一致",
          icon: "none"
        });
        return;
      }
      try {
        await api_student_auth.authApi.changePassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        });
        common_vendor.index.showToast({
          title: "密码修改成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      } catch (error) {
        common_vendor.index.showToast({
          title: error.message || "密码修改失败",
          icon: "none"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.oldPassword,
    b: common_vendor.o(($event) => $data.oldPassword = $event.detail.value),
    c: $data.newPassword,
    d: common_vendor.o(($event) => $data.newPassword = $event.detail.value),
    e: $data.confirmPassword,
    f: common_vendor.o(($event) => $data.confirmPassword = $event.detail.value),
    g: common_vendor.o((...args) => $options.changePassword && $options.changePassword(...args)),
    h: !$options.canSubmit
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-eda3d36e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/student/personal/change-password.js.map
