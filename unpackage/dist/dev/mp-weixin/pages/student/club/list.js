"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_student_club = require("../../../api/student/club.js");
const skeleton = () => "../../../components/skeleton/skeleton.js";
const _sfc_main = {
  components: {
    skeleton
  },
  data() {
    return {
      searchParams: {
        name: "",
        category: "",
        sort: "newest",
        page: 1,
        limit: 10
      },
      clubList: [],
      total: 0,
      isLoading: true,
      categories: [
        { label: "全部", value: "" },
        { label: "学术科技", value: "academic" },
        { label: "文化艺术", value: "cultural" },
        { label: "体育健身", value: "sports" },
        { label: "公益实践", value: "public" },
        { label: "兴趣爱好", value: "hobby" }
      ]
    };
  },
  onLoad() {
    this.loadClubList();
  },
  methods: {
    // 加载社团列表
    async loadClubList() {
      this.isLoading = true;
      try {
        const res = await api_student_club.clubApi.getClubList(this.searchParams);
        if (res.code === 200) {
          this.clubList = res.data.list || [];
          this.total = res.data.total || 0;
        } else {
          common_vendor.index.showToast({ title: res.message || "加载失败", icon: "none" });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/student/club/list.vue:143", "加载社团列表失败:", error);
        common_vendor.index.showToast({ title: "网络错误", icon: "none" });
      } finally {
        this.isLoading = false;
      }
    },
    // 搜索
    onSearch() {
      this.searchParams.page = 1;
      this.loadClubList();
    },
    // 类别筛选
    onCategoryChange(category) {
      this.searchParams.category = category;
      this.searchParams.page = 1;
      this.loadClubList();
    },
    // 排序切换
    onSortChange(sort) {
      this.searchParams.sort = sort;
      this.searchParams.page = 1;
      this.loadClubList();
    },
    // 分页切换
    onPageChange(page) {
      this.searchParams.page = page;
      this.loadClubList();
    },
    // 跳转到社团详情
    goToClubDetail(clubId) {
      common_vendor.index.navigateTo({
        url: `/pages/student/club/detail?id=${clubId}`
      });
    },
    // 获取类别显示名称
    getCategoryLabel(value) {
      const category = this.categories.find((c) => c.value === value);
      return category ? category.label : value;
    }
  }
};
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  const _easycom_skeleton2 = common_vendor.resolveComponent("skeleton");
  const _component_uni_pagination = common_vendor.resolveComponent("uni-pagination");
  (_component_uni_icons + _easycom_skeleton2 + _component_uni_pagination)();
}
const _easycom_skeleton = () => "../../../components/skeleton/skeleton.js";
if (!Math) {
  _easycom_skeleton();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "search",
      size: "18",
      color: "#999"
    }),
    b: common_vendor.o([($event) => $data.searchParams.name = $event.detail.value, (...args) => $options.onSearch && $options.onSearch(...args)]),
    c: $data.searchParams.name,
    d: common_vendor.f($data.categories, (category, k0, i0) => {
      return {
        a: common_vendor.t(category.label),
        b: category.value,
        c: common_vendor.n({
          active: $data.searchParams.category === category.value
        }),
        d: common_vendor.o(($event) => $options.onCategoryChange(category.value), category.value)
      };
    }),
    e: common_vendor.n({
      active: $data.searchParams.sort === "newest"
    }),
    f: common_vendor.o(($event) => $options.onSortChange("newest")),
    g: common_vendor.n({
      active: $data.searchParams.sort === "hot"
    }),
    h: common_vendor.o(($event) => $options.onSortChange("hot")),
    i: $data.isLoading
  }, $data.isLoading ? {
    j: common_vendor.p({
      ["is-loading"]: true,
      ["show-list"]: true,
      ["list-count"]: 10
    })
  } : $data.clubList.length > 0 ? {
    l: common_vendor.f($data.clubList, (club, k0, i0) => {
      return {
        a: club.logo || "/static/student/default-club.png",
        b: common_vendor.t(club.name),
        c: common_vendor.t($options.getCategoryLabel(club.category)),
        d: common_vendor.t(club.description || "该社团暂无描述"),
        e: common_vendor.t(club.memberCount),
        f: common_vendor.t(club.activityCount),
        g: club.id,
        h: common_vendor.o(($event) => $options.goToClubDetail(club.id), club.id)
      };
    })
  } : {
    m: common_vendor.p({
      type: "info",
      size: "60",
      color: "#ccc"
    })
  }, {
    k: $data.clubList.length > 0,
    n: $data.total > 0 && !$data.isLoading
  }, $data.total > 0 && !$data.isLoading ? {
    o: common_vendor.o($options.onPageChange),
    p: common_vendor.p({
      current: $data.searchParams.page,
      ["page-size"]: $data.searchParams.limit,
      total: $data.total,
      mode: "number",
      ["prev-text"]: "上一页",
      ["next-text"]: "下一页"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b84f44d4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/student/club/list.js.map
