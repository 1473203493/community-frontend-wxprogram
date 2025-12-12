"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_student_auth = require("../../../api/student/auth.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        name: "",
        studentId: "",
        gender: "male",
        email: ""
      }
    };
  },
  computed: {
    canSubmit() {
      return this.userInfo.name && this.userInfo.studentId && this.userInfo.email;
    }
  },
  onLoad() {
    this.loadUserInfo();
  },
  methods: {
    async loadUserInfo() {
      try {
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        if (userInfo) {
          this.userInfo = { ...this.userInfo, ...userInfo };
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/personal/edit.vue:91", "加载用户信息失败", error);
      }
    },
    onGenderChange(e) {
      this.userInfo.gender = e.detail.value;
    },
    async saveChanges() {
      try {
        await api_student_auth.authApi.updateUserInfo(this.userInfo);
        common_vendor.index.setStorageSync("userInfo", this.userInfo);
        common_vendor.index.showToast({
          title: "信息更新成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      } catch (error) {
        common_vendor.index.showToast({
          title: error.message || "信息更新失败",
          icon: "none"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.userInfo.name,
    b: common_vendor.o(($event) => $data.userInfo.name = $event.detail.value),
    c: $data.userInfo.studentId,
    d: common_vendor.o(($event) => $data.userInfo.studentId = $event.detail.value),
    e: $data.userInfo.gender === "male",
    f: $data.userInfo.gender === "female",
    g: common_vendor.o((...args) => $options.onGenderChange && $options.onGenderChange(...args)),
    h: $data.userInfo.email,
    i: common_vendor.o(($event) => $data.userInfo.email = $event.detail.value),
    j: common_vendor.o((...args) => $options.saveChanges && $options.saveChanges(...args)),
    k: !$options.canSubmit
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e634ea07"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/student/personal/edit.js.map
