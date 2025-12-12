"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_student_activity = require("../../../api/student/activity.js");
const lazyImage = () => "../../../components/lazy-image/lazy-image.js";
const studentTabbar = () => "../../../components/student-tabbar/student-tabbar.js";
const skeleton = () => "../../../components/skeleton/skeleton.js";
const _sfc_main = {
  components: {
    lazyImage,
    studentTabbar,
    skeleton
  },
  data() {
    return {
      searchParams: {
        page: 1,
        size: 10,
        type: "",
        keyword: ""
      },
      activityList: [],
      total: 0,
      isLoading: true,
      activityTypes: [
        { label: "学术讲座", value: "lecture" },
        { label: "文化活动", value: "culture" },
        { label: "体育赛事", value: "sports" },
        { label: "公益活动", value: "public" },
        { label: "其他", value: "other" }
      ],
      searchTimer: null
    };
  },
  onLoad() {
    this.loadActivityList();
  },
  methods: {
    // 加载活动列表
    async loadActivityList() {
      this.isLoading = true;
      try {
        const res = await api_student_activity.activityApi.getActivityList(this.searchParams);
        if (res.code === 200) {
          this.activityList = res.data.list || [];
          this.total = res.data.total || 0;
        } else {
          common_vendor.index.showToast({ title: res.message || "加载失败", icon: "none" });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/activity/list.vue:141", "加载活动列表失败:", error);
        common_vendor.index.showToast({ title: "网络错误", icon: "none" });
      } finally {
        this.isLoading = false;
      }
    },
    // 搜索
    onSearch() {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.searchParams.page = 1;
        this.loadActivityList();
      }, 300);
    },
    // 类型筛选
    onTypeChange(type) {
      this.searchParams.type = type;
      this.searchParams.page = 1;
      this.loadActivityList();
    },
    // 分页切换
    onPageChange(page) {
      common_vendor.index.__f__("log", "at pages/student/activity/list.vue:167", "分页切换:", page, typeof page);
      const pageNum = parseInt(page);
      if (!isNaN(pageNum) && pageNum > 0) {
        this.searchParams.page = pageNum;
        this.loadActivityList();
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
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    },
    // 底部导航栏变化
    onTabChange(index) {
      common_vendor.index.__f__("log", "at pages/student/activity/list.vue:192", "当前选中的tab:", index);
    }
  }
};
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  const _easycom_skeleton2 = common_vendor.resolveComponent("skeleton");
  const _easycom_lazy_image2 = common_vendor.resolveComponent("lazy-image");
  const _component_uni_pagination = common_vendor.resolveComponent("uni-pagination");
  (_component_uni_icons + _easycom_skeleton2 + _easycom_lazy_image2 + _component_uni_pagination)();
}
const _easycom_skeleton = () => "../../../components/skeleton/skeleton.js";
const _easycom_lazy_image = () => "../../../components/lazy-image/lazy-image.js";
if (!Math) {
  (_easycom_skeleton + _easycom_lazy_image)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "search",
      size: "18",
      color: "#999"
    }),
    b: common_vendor.o([($event) => $data.searchParams.keyword = $event.detail.value, (...args) => $options.onSearch && $options.onSearch(...args)]),
    c: $data.searchParams.keyword,
    d: common_vendor.n({
      active: $data.searchParams.type === ""
    }),
    e: common_vendor.o(($event) => $options.onTypeChange("")),
    f: common_vendor.f($data.activityTypes, (type, k0, i0) => {
      return {
        a: common_vendor.t(type.label),
        b: type.value,
        c: common_vendor.n({
          active: $data.searchParams.type === type.value
        }),
        d: common_vendor.o(($event) => $options.onTypeChange(type.value), type.value)
      };
    }),
    g: $data.isLoading
  }, $data.isLoading ? {
    h: common_vendor.p({
      ["is-loading"]: true,
      ["show-list"]: true,
      ["list-count"]: 10
    })
  } : $data.activityList.length > 0 ? {
    j: common_vendor.f($data.activityList, (activity, k0, i0) => {
      return {
        a: "fa9d9dac-2-" + i0,
        b: common_vendor.p({
          src: activity.cover || "/static/student/default-activity.png",
          mode: "aspectFill"
        }),
        c: common_vendor.t(activity.title),
        d: "fa9d9dac-3-" + i0,
        e: common_vendor.t($options.formatDate(activity.startTime)),
        f: "fa9d9dac-4-" + i0,
        g: common_vendor.t(activity.location || "地点待定"),
        h: common_vendor.t(activity.joinCount),
        i: common_vendor.t(activity.clubName || "未知社团"),
        j: activity.id,
        k: common_vendor.o(($event) => $options.goToActivityDetail(activity.id), activity.id)
      };
    }),
    k: common_vendor.p({
      type: "time",
      size: "16",
      color: "#999"
    }),
    l: common_vendor.p({
      type: "location",
      size: "16",
      color: "#999"
    })
  } : {
    m: common_vendor.p({
      type: "info",
      size: "60",
      color: "#ccc"
    })
  }, {
    i: $data.activityList.length > 0,
    n: $data.total > 0
  }, $data.total > 0 ? {
    o: common_vendor.o($options.onPageChange),
    p: common_vendor.p({
      current: $data.searchParams.page,
      ["page-size"]: $data.searchParams.size,
      total: $data.total,
      mode: "number",
      ["prev-text"]: "上一页",
      ["next-text"]: "下一页"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fa9d9dac"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/student/activity/list.js.map
