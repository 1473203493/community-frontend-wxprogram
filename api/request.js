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

    // 返回Promise
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseURL + options.url,
            method: options.method || 'GET',
            data: options.data || {},
            header,
            success: (res) => {
                resolve(res.data);
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};


// 获取基础URL
const getBaseURL = () => {
    // 根据不同环境返回不同的基础URL
    // 这里可以根据实际项目配置进行修改
    #ifdef H5
    return '';
    #endif

    #ifdef MP-WEIXIN
    return 'https://localhost:8089'; //实际环境的URL
    #endif

    // 默认返回也是本地后端，实际项目中应根据后端接口地址设置
    return 'https://localhost:8089';
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
