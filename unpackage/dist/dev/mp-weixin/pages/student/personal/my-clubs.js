"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      clubs: []
    };
  },
  onLoad() {
    this.loadClubs();
  },
  methods: {
    loadClubs() {
      this.clubs = [
        {
          id: 1,
          name: "音乐社",
          logo: "/static/student/club-music.png",
          description: "热爱音乐的同学们的聚集地",
          role: "成员"
        },
        {
          id: 2,
          name: "篮球社",
          logo: "/static/student/club-basketball.png",
          description: "享受篮球运动的快乐",
          role: "副社长"
        }
      ];
    },
    viewClub(club) {
      common_vendor.index.navigateTo({
        url: `/pages/student/club/detail?id=${club.id}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.clubs, (club, k0, i0) => {
      return {
        a: club.logo,
        b: common_vendor.t(club.name),
        c: common_vendor.t(club.description),
        d: common_vendor.t(club.role),
        e: club.id,
        f: common_vendor.o(($event) => $options.viewClub(club), club.id)
      };
    }),
    b: $data.clubs.length === 0
  }, $data.clubs.length === 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b173525d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/student/personal/my-clubs.js.map
