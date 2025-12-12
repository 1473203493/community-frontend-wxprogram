"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_student_personal = require("../../../api/student/personal.js");
const lazyImage = () => "../../../components/lazy-image/lazy-image.js";
const skeleton = () => "../../../components/skeleton/skeleton.js";
const _sfc_main = {
  components: {
    lazyImage,
    skeleton
  },
  data() {
    return {
      userInfo: {},
      unreadCount: 0,
      isLoading: true
    };
  },
  onLoad() {
  },
  onShow() {
    this.isLoading = true;
    Promise.all([
      this.loadUserInfo(),
      this.loadUnreadCount()
    ]).finally(() => {
      this.isLoading = false;
    });
  },
  methods: {
    // 加载用户信息
    async loadUserInfo() {
      try {
        const res = await api_student_personal.personalApi.getPersonalInfo();
        if (res.code === 200) {
          this.userInfo = res.data;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/personal/index.vue:153", "加载用户信息失败:", error);
        return Promise.reject(error);
      }
    },
    // 加载未读消息数量
    async loadUnreadCount() {
      try {
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        if (!userInfo || !userInfo.userId) {
          common_vendor.index.__f__("error", "at pages/student/personal/index.vue:164", "用户未登录或用户信息不完整");
          return;
        }
        const res = await api_student_personal.personalApi.getUnreadCount(userInfo.userId);
        if (res.code === 200) {
          this.unreadCount = res.data || 0;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/personal/index.vue:173", "加载未读消息数量失败:", error);
        return Promise.reject(error);
      }
    },
    // 选择头像
    chooseAvatar() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: async (res) => {
          const filePath = res.tempFilePaths[0];
          this.uploadAvatar(filePath);
        }
      });
    },
    // 上传头像
    async uploadAvatar(filePath) {
      common_vendor.index.showLoading({ title: "上传中" });
      try {
        const res = await api_student_personal.personalApi.uploadAvatar(filePath);
        if (res.code === 200) {
          this.userInfo.avatar = res.data.url;
          common_vendor.index.showToast({ title: "头像上传成功", icon: "success" });
        } else {
          common_vendor.index.showToast({ title: res.message || "上传失败", icon: "none" });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/personal/index.vue:203", "上传头像失败:", error);
        common_vendor.index.showToast({ title: "网络错误", icon: "none" });
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    // 编辑个人信息
    editPersonalInfo() {
      common_vendor.index.navigateTo({
        url: "/pages/student/personal/edit"
      });
    },
    // 跳转到我的社团
    goToMyClubs() {
      common_vendor.index.navigateTo({
        url: "/pages/student/personal/my-clubs"
      });
    },
    // 跳转到我的活动
    goToMyActivities() {
      common_vendor.index.navigateTo({
        url: "/pages/student/personal/my-activities"
      });
    },
    // 跳转到我的申请
    goToMyApplications() {
      common_vendor.index.navigateTo({
        url: "/pages/student/personal/my-applications"
      });
    },
    // 跳转到我的消息
    goToMyMessages() {
      common_vendor.index.navigateTo({
        url: "/pages/student/personal/messages"
      });
    },
    // 跳转到修改密码
    goToChangePassword() {
      common_vendor.index.navigateTo({
        url: "/pages/student/personal/change-password"
      });
    },
    // 跳转到关于我们
    goToAbout() {
      common_vendor.index.navigateTo({
        url: "/pages/student/personal/about"
      });
    },
    // 退出登录
    logout() {
      common_vendor.index.showModal({
        title: "退出登录",
        content: "确定要退出登录吗？",
        success: async (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.removeStorageSync("userInfo");
            common_vendor.index.reLaunch({
              url: "/pages/student/auth/login"
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_skeleton2 = common_vendor.resolveComponent("skeleton");
  const _easycom_lazy_image2 = common_vendor.resolveComponent("lazy-image");
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  (_easycom_skeleton2 + _easycom_lazy_image2 + _component_uni_icons)();
}
const _easycom_skeleton = () => "../../../components/skeleton/skeleton.js";
const _easycom_lazy_image = () => "../../../components/lazy-image/lazy-image.js";
if (!Math) {
  (_easycom_skeleton + _easycom_lazy_image)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isLoading
  }, $data.isLoading ? {
    b: common_vendor.p({
      ["is-loading"]: true,
      ["show-avatar"]: true,
      ["show-title"]: true,
      ["show-content"]: true
    })
  } : {
    c: common_vendor.p({
      src: $data.userInfo.avatar || "/static/student/default-avatar.png",
      mode: "aspectFill"
    }),
    d: common_vendor.p({
      type: "camera",
      size: "16",
      color: "#fff"
    }),
    e: common_vendor.o((...args) => $options.chooseAvatar && $options.chooseAvatar(...args)),
    f: common_vendor.t($data.userInfo.nickname || "未设置昵称"),
    g: common_vendor.t($data.userInfo.email || "未绑定邮箱"),
    h: common_vendor.o($options.editPersonalInfo),
    i: common_vendor.p({
      type: "arrowright",
      size: "20",
      color: "#fff"
    })
  }, {
    j: common_vendor.p({
      type: "star",
      size: "24",
      color: "#007aff"
    }),
    k: common_vendor.p({
      type: "arrowright",
      size: "16",
      color: "#ccc"
    }),
    l: common_vendor.o((...args) => $options.goToMyClubs && $options.goToMyClubs(...args)),
    m: common_vendor.p({
      type: "calendar",
      size: "24",
      color: "#52c41a"
    }),
    n: common_vendor.p({
      type: "arrowright",
      size: "16",
      color: "#ccc"
    }),
    o: common_vendor.o((...args) => $options.goToMyActivities && $options.goToMyActivities(...args)),
    p: common_vendor.p({
      type: "paperclip",
      size: "24",
      color: "#fa8c16"
    }),
    q: common_vendor.p({
      type: "arrowright",
      size: "16",
      color: "#ccc"
    }),
    r: common_vendor.o((...args) => $options.goToMyApplications && $options.goToMyApplications(...args)),
    s: common_vendor.p({
      type: "chatbubble",
      size: "24",
      color: "#eb2f96"
    }),
    t: $data.unreadCount > 0
  }, $data.unreadCount > 0 ? {
    v: common_vendor.t($data.unreadCount > 99 ? "99+" : $data.unreadCount)
  } : {}, {
    w: common_vendor.p({
      type: "arrowright",
      size: "16",
      color: "#ccc"
    }),
    x: common_vendor.o((...args) => $options.goToMyMessages && $options.goToMyMessages(...args)),
    y: common_vendor.p({
      type: "locked",
      size: "24",
      color: "#666"
    }),
    z: common_vendor.p({
      type: "arrowright",
      size: "16",
      color: "#ccc"
    }),
    A: common_vendor.o((...args) => $options.goToChangePassword && $options.goToChangePassword(...args)),
    B: common_vendor.p({
      type: "info",
      size: "24",
      color: "#666"
    }),
    C: common_vendor.p({
      type: "arrowright",
      size: "16",
      color: "#ccc"
    }),
    D: common_vendor.o((...args) => $options.goToAbout && $options.goToAbout(...args)),
    E: common_vendor.p({
      type: "logout",
      size: "24",
      color: "#ff4d4f"
    }),
    F: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e575a03e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/student/personal/index.js.map
