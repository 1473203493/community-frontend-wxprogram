"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
require("./uni.promisify.adaptor.js");
if (!Math) {
  "./pages/student/index.js";
  "./pages/student/club/list.js";
  "./pages/student/club/detail.js";
  "./pages/student/activity/list.js";
  "./pages/student/activity/detail.js";
  "./pages/student/personal/index.js";
  "./pages/student/personal/about.js";
  "./pages/student/personal/change-password.js";
  "./pages/student/personal/edit.js";
  "./pages/student/personal/messages.js";
  "./pages/student/personal/my-activities.js";
  "./pages/student/personal/my-applications.js";
  "./pages/student/personal/my-clubs.js";
}
const pages = [
  "pages/student/index",
  "pages/student/club/list",
  "pages/student/club/detail",
  "pages/student/activity/list",
  "pages/student/activity/detail",
  "pages/student/personal/index"
];
const window = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "uni-app",
  navigationBarBackgroundColor: "#F8F8F8",
  backgroundColor: "#F8F8F8"
};
const usingComponents = {};
const App = {
  pages,
  window,
  usingComponents
};
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
