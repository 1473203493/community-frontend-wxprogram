"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      messages: []
    };
  },
  onLoad() {
    this.loadMessages();
  },
  methods: {
    loadMessages() {
      this.messages = [
        {
          id: 1,
          title: "活动报名成功",
          content: '您已成功报名参加"校园音乐节"活动',
          createTime: "2023-10-01 14:30",
          read: false
        },
        {
          id: 2,
          title: "社团加入申请通过",
          content: "您的社团加入申请已通过审核",
          createTime: "2023-09-28 09:15",
          read: true
        }
      ];
    },
    viewMessage(message) {
      common_vendor.index.__f__("log", "at pages/student/personal/messages.vue:56", "查看消息", message);
      message.read = true;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.messages, (message, k0, i0) => {
      return {
        a: common_vendor.t(message.title),
        b: common_vendor.t(message.createTime),
        c: common_vendor.t(message.content),
        d: message.id,
        e: common_vendor.o(($event) => $options.viewMessage(message), message.id)
      };
    }),
    b: $data.messages.length === 0
  }, $data.messages.length === 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-02366cd0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/student/personal/messages.js.map
