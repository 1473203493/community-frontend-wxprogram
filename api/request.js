// 封装请求方法
const request = (options) => {
    // 获取基础URL
    const baseURL = getBaseURL();

    // 获取存储的Token
    const token = getToken();

    // 默认请求头
    const header = options.header || {};

    // 如果有token，把token放入到请求头里
    if (token) {
        header['Authorization'] = token;
    }

    // 默认配置
    const config = {
        retry: options.retry || 3, // 最大重试次数
        retryDelay: options.retryDelay || 1000, // 重试延迟（毫秒）
        timeout: options.timeout || 10000, // 超时时间（毫秒）
        ...options
    };

    // 返回Promise
    return new Promise((resolve, reject) => {
        // 检查网络状态
        checkNetworkStatus().then(isConnected => {
            if (!isConnected) {
                uni.showToast({ title: '网络连接失败，请检查网络设置', icon: 'none' });
                reject(new Error('网络连接失败'));
                return;
            }

            // 发送请求
            sendRequest(config, 0, resolve, reject);
        }).catch(err => {
            uni.showToast({ title: '网络检查失败', icon: 'none' });
            reject(err);
        });
    });
};

// 发送请求（支持重试）
const sendRequest = (options, retryCount, resolve, reject) => {
    const baseURL = getBaseURL();
    const token = getToken();
    const header = options.header || {};
    
    if (token) {
        header['Authorization'] = token;
    }

    uni.request({
        url: baseURL + options.url,
        method: options.method || 'GET',
        data: options.data || {},
        header,
        timeout: options.timeout,
        success: (res) => {
            console.log("【完整响应返回】", res);
            // 检查HTTP状态码
            if (res.statusCode >= 200 && res.statusCode < 300) {
                // 检查业务状态码
                if (res.data.code === 200) {
                    resolve({
                        success: true,
                        code: res.data.code,
                        data: res.data.data,
                        message: res.data.message
                    });
                } else if (res.data.code === 401) {
                    // 未授权，清除token并跳转到登录页
                    uni.removeStorageSync('token');
                    uni.removeStorageSync('userInfo');
                    uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' });
                    uni.navigateTo({ url: '/pages/student/auth/login' });
                    resolve({
                        success: false,
                        code: res.data.code,
                        data: null,
                        message: res.data.message || '登录已过期'
                    });
                } else {
                    // 其他业务错误
                    resolve({
                        success: false,
                        code: res.data.code,
                        data: null,
                        message: res.data.message || '请求失败'
                    });
                }
            } else {
                // HTTP错误
                let errorMsg = '请求失败';
                switch (res.statusCode) {
                    case 400: errorMsg = '请求参数错误'; break;
                    case 401: errorMsg = '未授权，请重新登录'; break;
                    case 403: errorMsg = '拒绝访问'; break;
                    case 404: errorMsg = '请求的资源不存在'; break;
                    case 500: errorMsg = '服务器内部错误'; break;
                    case 502: errorMsg = '网关错误'; break;
                    case 503: errorMsg = '服务不可用'; break;
                    case 504: errorMsg = '网关超时'; break;
                    default: errorMsg = `请求失败(${res.statusCode})`;
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
            // 请求失败，检查是否需要重试
            if (retryCount < options.retry) {
                retryCount++;
                setTimeout(() => {
                    sendRequest(options, retryCount, resolve, reject);
                }, options.retryDelay);
            } else {
                // 超过最大重试次数
                resolve({
                    success: false,
                    code: -1,
                    data: null,
                    message: '网络请求失败，请稍后重试'
                });
            }
        }
    });
};

// 处理HTTP错误（已整合到sendRequest中，保留该函数以防其他地方调用）
const handleHttpError = (statusCode, options, retryCount, resolve, reject) => {
    let errorMsg = '请求失败';
    
    switch (statusCode) {
        case 400:
            errorMsg = '请求参数错误';
            break;
        case 401:
            errorMsg = '未授权，请重新登录';
            uni.removeStorageSync('token');
            uni.removeStorageSync('userInfo');
            uni.navigateTo({ url: '/pages/student/auth/login' });
            break;
        case 403:
            errorMsg = '拒绝访问';
            break;
        case 404:
            errorMsg = '请求的资源不存在';
            break;
        case 500:
            errorMsg = '服务器内部错误';
            break;
        case 502:
            errorMsg = '网关错误';
            break;
        case 503:
            errorMsg = '服务不可用';
            break;
        case 504:
            errorMsg = '网关超时';
            break;
        default:
            errorMsg = `请求失败(${statusCode})`;
    }
    
    // 服务器错误可以重试
    if (statusCode >= 500 && statusCode < 600 && retryCount < options.retry) {
        retryCount++;
        setTimeout(() => {
            sendRequest(options, retryCount, resolve, reject);
        }, options.retryDelay);
    } else {
        resolve({
            success: false,
            code: statusCode,
            data: null,
            message: errorMsg
        });
    }
};

// 检查网络状态
const checkNetworkStatus = () => {
    return new Promise((resolve) => {
        uni.getNetworkType({
            success: (res) => {
                resolve(res.networkType !== 'none');
            },
            fail: () => {
                resolve(false);
            }
        });
    });
};


// 获取基础URL
const getBaseURL = () => {
    // 根据不同环境返回不同的基础URL
    // 这里可以根据实际项目配置进行修改
    let platform = 'other';
    
    try {
        // 使用新的API获取环境信息
        const systemInfo = uni.getSystemInfoSync();
        platform = systemInfo.platform;
    } catch (error) {
        console.error('获取系统信息失败:', error);
    }
    
    // H5环境
    if (platform === 'web') {
        return '';
    }
    
    // 微信小程序环境
    if (platform === 'devtools' || platform === 'ios' || platform === 'android') {
        return 'http://localhost:8089'; //开发环境使用HTTP，实际环境应改为HTTPS
    }

    // 默认返回也是本地后端，实际项目中应根据后端接口地址设置
    return 'http://localhost:8089';
};



// 获取存储的Token
const getToken = () => {
    try {
        // 从本地存储中获取token
        const token = uni.getStorageSync('token');
        return token || '';
    } catch (error) {
        console.error('获取token失败:', error);
        return '';
    }
};

// 导出request方法供其他模块使用
export default request;

// 导出快捷方法
export const get = (url, params, options = {}) => {
    return request({
        url,
        method: 'GET',
        data: params,
        ...options
    });
};

export const post = (url, data, options = {}) => {
    return request({
        url,
        method: 'POST',
        data,
        ...options
    });
};

export const put = (url, data, options = {}) => {
    return request({
        url,
        method: 'PUT',
        data,
        ...options
    });
};

export const del = (url, params, options = {}) => {
    return request({
        url,
        method: 'DELETE',
        data: params,
        ...options
    });
};

// 将快捷方法挂载到request对象上，方便使用
request.get = get;
request.post = post;
request.put = put;
request.delete = del;
