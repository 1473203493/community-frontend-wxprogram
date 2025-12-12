import request from '../request.js';

/**
 * 学生端首页相关API
 */
export const homeApi = {
	/**
	 * 获取首页信息
	 * 返回：热门社团（按时间）、人数最多社团 TOP3
	 * @returns {Promise} Promise对象
	 */
	getHomeInfo() {
		return request({
			url: '/api/home/info',
			method: 'GET'
		});
	}
};
