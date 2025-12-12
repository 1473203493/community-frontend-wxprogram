"use strict";
const common_vendor = require("../common/vendor.js");
const request = (options) => {
  getBaseURL();
  const token = getToken();
  const header = options.header || {};
  if (token) {
    header["Authorization"] = token;
  }
  const config = {
    retry: options.retry || 3,
    // 最大重试次数
    retryDelay: options.retryDelay || 1e3,
    // 重试延迟（毫秒）
    timeout: options.timeout || 1e4,
    // 超时时间（毫秒）
    ...options
  };
  return new Promise((resolve, reject) => {
    checkNetworkStatus().then((isConnected) => {
      if (!isConnected) {
        common_vendor.index.showToast({ title: "网络连接失败，请检查网络设置", icon: "none" });
        reject(new Error("网络连接失败"));
        return;
      }
      sendRequest(config, 0, resolve);
    }).catch((err) => {
      common_vendor.index.showToast({ title: "网络检查失败", icon: "none" });
      reject(err);
    });
  });
};
const sendRequest = (options, retryCount, resolve, reject) => {
  const baseURL = getBaseURL();
  const token = getToken();
  const header = options.header || {};
  if (token) {
    header["Authorization"] = token;
  }
  common_vendor.index.request({
    url: baseURL + options.url,
    method: options.method || "GET",
    data: options.data || {},
    header,
    timeout: options.timeout,
    success: (res) => {
      common_vendor.index.__f__("log", "at api/request.js:61", "【完整响应返回】", res);
      if (res.statusCode >= 200 && res.statusCode < 300) {
        if (res.data.code === 200) {
          resolve({
            success: true,
            code: res.data.code,
            data: res.data.data,
            message: res.data.message
          });
        } else if (res.data.code === 401) {
          common_vendor.index.removeStorageSync("token");
          common_vendor.index.removeStorageSync("userInfo");
          common_vendor.index.showToast({ title: "登录已过期，请重新登录", icon: "none" });
          common_vendor.index.navigateTo({ url: "/pages/student/auth/login" });
          resolve({
            success: false,
            code: res.data.code,
            data: null,
            message: res.data.message || "登录已过期"
          });
        } else {
          resolve({
            success: false,
            code: res.data.code,
            data: null,
            message: res.data.message || "请求失败"
          });
        }
      } else {
        let errorMsg = "请求失败";
        switch (res.statusCode) {
          case 400:
            errorMsg = "请求参数错误";
            break;
          case 401:
            errorMsg = "未授权，请重新登录";
            break;
          case 403:
            errorMsg = "拒绝访问";
            break;
          case 404:
            errorMsg = "请求的资源不存在";
            break;
          case 500:
            errorMsg = "服务器内部错误";
            break;
          case 502:
            errorMsg = "网关错误";
            break;
          case 503:
            errorMsg = "服务不可用";
            break;
          case 504:
            errorMsg = "网关超时";
            break;
          default:
            errorMsg = `请求失败(${res.statusCode})`;
        }
        resolve({
          success: false,
          code: res.statusCode,
          data: null,
          message: errorMsg
        });
      }
    },
    fail: (err) => {
      if (retryCount < options.retry) {
        retryCount++;
        setTimeout(() => {
          sendRequest(options, retryCount, resolve);
        }, options.retryDelay);
      } else {
        resolve({
          success: false,
          code: -1,
          data: null,
          message: "网络请求失败，请稍后重试"
        });
      }
    }
  });
};
const checkNetworkStatus = () => {
  return new Promise((resolve) => {
    common_vendor.index.getNetworkType({
      success: (res) => {
        resolve(res.networkType !== "none");
      },
      fail: () => {
        resolve(false);
      }
    });
  });
};
const getBaseURL = () => {
  let platform = "other";
  try {
    const systemInfo = common_vendor.index.getSystemInfoSync();
    platform = systemInfo.platform;
  } catch (error) {
    common_vendor.index.__f__("error", "at api/request.js:213", "获取系统信息失败:", error);
  }
  if (platform === "web") {
    return "";
  }
  if (platform === "devtools" || platform === "ios" || platform === "android") {
    return "http://localhost:8089";
  }
  return "http://localhost:8089";
};
const getToken = () => {
  try {
    const token = common_vendor.index.getStorageSync("token");
    return token || "";
  } catch (error) {
    common_vendor.index.__f__("error", "at api/request.js:239", "获取token失败:", error);
    return "";
  }
};
const get = (url, params, options = {}) => {
  return request({
    url,
    method: "GET",
    data: params,
    ...options
  });
};
const post = (url, data, options = {}) => {
  return request({
    url,
    method: "POST",
    data,
    ...options
  });
};
const put = (url, data, options = {}) => {
  return request({
    url,
    method: "PUT",
    data,
    ...options
  });
};
const del = (url, params, options = {}) => {
  return request({
    url,
    method: "DELETE",
    data: params,
    ...options
  });
};
request.get = get;
request.post = post;
request.put = put;
request.delete = del;
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/request.js.map
