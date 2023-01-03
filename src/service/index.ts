// service统一出口
import VRequest from '~/utils/http';
import localCache from '~/utils/cache';
const vRequest = new VRequest({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	// baseURL: import.meta.env.VITE_APP_BASE_URL + '/api',
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
	interceptors: {
		requestInterceptor: (config) => {
			// 携带token的拦截
			const token = localCache.getCache('token');

			if (token) {
				config.headers['token'] = token;
			}
			// const data = config.data;
			// if (config.method?.toLocaleUpperCase() == 'POST' && data) {
			// 	const _data: any = {};
			// 	Object.keys(data).forEach((key) => {
			// 		// 当数据不是文件\字符串\数字\布尔类型时进行字符串化处理
			// 		if (!isBasicType(data[key]) && !(data[key] instanceof File)) {
			// 			// console.log('[JSON]', JSON.stringify(data[key]))
			// 			_data[key] = JSON.stringify(data[key]);
			// 		}
			// 	});
			// 	config.data = _data;
			// }
			return config;
		},
		requestInterceptorCatch: (err) => {
			return err;
		},
		responseInterceptor: (res) => {
			return res;
		},
		responseInterceptorCatch: (err) => {
			return err;
		},
	},
});

export default vRequest;
