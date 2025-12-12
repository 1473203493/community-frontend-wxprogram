import request from '../request.js';

/**
 * 学生端社团相关API
 */
export const clubApi = {
	/**
	 * 查询社团列表
	 * @param {Object} params 查询参数
	 * @param {string} [params.name] 社团名称（可选）
	 * @param {string} [params.category] 社团类别（可选）
	 * @param {string} [params.sort='newest'] 排序方式：hot（热门）、newest（最新）
	 * @param {number} [params.page=1] 当前页码
	 * @param {number} [params.limit=10] 每页数量
	 * @returns {Promise} Promise对象
	 */	
	getClubList(params = {}) {
		return request({
			url: '/api/club/list',
			method: 'GET',
			data: {
				name: params.name || '',
				category: params.category || '',
				sort: params.sort || 'newest',
				page: params.page || 1,
				limit: params.limit || 10
			}
		});
	},
	
	/**
	 * 获取社团详情
	 * @param {number} clubId 社团ID
	 * @returns {Promise} Promise对象
	 */
	getClubDetail(clubId) {
		return request({
			url: `/api/club/detail/${clubId}`,
			method: 'GET'
		});
	},
	
	/**
	 * 申请加入社团
	 * @param {number} clubId 社团ID
	 * @param {string} [remark] 申请备注（可选）
	 * @returns {Promise} Promise对象
	 */
	applyToJoinClub(clubId, remark = '') {
		return request({
			url: '/api/club/apply',
			method: 'POST',
			data: {
				clubId,
				remark
			}
		});
	},
	
	/**
	 * 查看本人加入的社团
	 * @returns {Promise} Promise对象
	 */
	getMyClubs() {
		return request({
			url: '/api/club/my',
			method: 'GET'
		});
	},
	
	/**
	 * 查询社团分类
	 * @returns {Promise} Promise对象
	 */
	getClubCategories() {
		return request({
			url: '/api/club/category',
			method: 'GET'
		});
	}
};
