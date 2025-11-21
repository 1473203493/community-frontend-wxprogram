// 景点相关API
import request from 'api/request.js';

// 景点API
export const scenicApi = {
    // 分页查询景点列表
    listScenicSpots(queryParams, pageNum, pageSize) {
        return request({
            url: `/user/scenic/findByPage/${pageNum}/${pageSize}`,
            method: 'POST',
            data: queryParams
        });
    },

    // 根据ID获取景点详情
    getScenicSpotById(id) {
        return request({
            url: `/user/scenic/findById/${id}`,
            method: 'GET'
        });
    },

    // 获取热门景点
    getHotSpots(limit = 10) {
        return request({
            url: `/user/scenic/hot?limit=${limit}`,
            method: 'GET'
            // mockKey: 'hotSpots'  // 添加模拟数据键
        });
    },

    // 收藏景点
    favoriteScenicSpot(scenicId) {
        return request({
            url: `/user/scenic/favorite/${scenicId}`,
            method: 'POST'
        });
    },

    // 取消收藏景点
    unfavoriteScenicSpot(scenicId) {
        return request({
            url: `/user/scenic/unfavorite/${scenicId}`,
            method: 'DELETE'
        });
    },

    // 检查用户是否已收藏该景点
    isFavorite(scenicId) {
        return request({
            url: `/user/scenic/isFavorite/${scenicId}`,
            method: 'GET'
        });
    },

    // 获取AR模型不为空的景点列表
    getScenicSpotsWithARModel() {
        return request({
            url: '/user/scenic/search/armodel',
            method: 'GET'
        });
    },

    // 检查用户是否已浏览该景点
    isViewed(scenicId) {
        return request({
            url: `/user/scenic/isViewed/${scenicId}`,
            method: 'GET'
        });
    },

    // 记录浏览历史
    viewScenic(scenicId) {
        return request({
            url: `/user/scenic/view/${scenicId}`,
            method: 'POST'
        });
    },

    // 批量删除浏览历史
    batchDeleteBrowseHistory(scenicIds) {
        return request({
            url: '/user/scenic/batchDeleteHistory',
            method: 'DELETE',
            data: scenicIds
        });
    }
};

export default scenicApi;