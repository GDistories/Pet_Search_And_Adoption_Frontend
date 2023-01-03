import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { VRequestInterceptors, VRequestConfig } from './type';

import Message from '~/utils/dom/message';
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading';

const DEAFULT_LOADING = true;
axios.defaults.withCredentials = true;

class VRequest {
	instance: AxiosInstance;
	interceptors?: VRequestInterceptors;
	showLoading: boolean;
	loading?: LoadingInstance;

	constructor(config: VRequestConfig) {
		// 创建axios实例
		this.instance = axios.create(config);

		// 保存基本信息
		this.showLoading = config.showLoading ?? DEAFULT_LOADING;
		this.interceptors = config.interceptors;

		// 使用拦截器
		// 1.从config中取出的拦截器是对应的实例的拦截器
		this.instance.interceptors.request.use(this.interceptors?.requestInterceptor, this.interceptors?.requestInterceptorCatch);
		this.instance.interceptors.response.use(this.interceptors?.responseInterceptor, this.interceptors?.responseInterceptorCatch);

		// 2.添加所有的实例都有的拦截器
		// this.instance.interceptors.request.use(
		// 	(config) => {
		// 		return config;
		// 	},
		// 	(err) => {
		// 		return err;
		// 	}
		// );

		this.instance.interceptors.response.use(
			async (res) => {
				// console.log('[axios 拦截器>>>>>>>>>>>>]..................');
				// console.log('[axios]', res);
				// console.log('[axios 拦截器<<<<<<<<<<<<]..................');

				// 将loading移除
				this.loading?.close();

				if (res.toString().includes('Request failed with status code')) {
					Message({ type: 'error', text: '服务器访问出错了~' });
				}
				const data = res.data;
				if (data.success) {
					return data;
				} else {
					console.log('[http error]>>>>>>>>>>>>>>>');
					console.warn('[http error]', data.message);
					console.log('[http error]>>>>>>>>>>>>>>>');
					if (data.message === 'The token is null') {
						console.log('[请先登录]');
						const userStore = useUserStore();
						await userStore.logout();
						Message({ type: 'error', text: '请先登录' });
					}
					Message({ type: 'error', text: data.message || '服务器访问出错了~' });
					return data;
				}
			},
			(err) => {
				// console.log('[错误 拦截器>>>>>>>>>>>>]..................')
				// console.log('[错误]', err)
				// console.log('[错误 拦截器<<<<<<<<<<<<]..................')
				// 将loading移除
				this.loading?.close();
				// 例子: 判断不同的HttpErrorCode显示不同的错误信息
				if (err.response.status === 404) {
					console.log('404的错误~');
				}
				Message({ type: 'error', text: '服务器访问出错了~' });
				return err;
			}
		);
	}

	request<T = any>(config: VRequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 1.单个请求对请求config的处理
			if (config.interceptors?.requestInterceptor) {
				config = config.interceptors.requestInterceptor(config);
			}

			// 2.判断是否需要显示loading
			if (config.showLoading === false) {
				this.showLoading = config.showLoading;
			}

			this.instance
				.request<any, T>(config)
				.then((res) => {
					// 1.单个请求对数据的处理
					if (config.interceptors?.responseInterceptor) {
						res = config.interceptors.responseInterceptor(res);
					}
					// 2.将showLoading设置true, 这样不会影响下一个请求
					this.showLoading = DEAFULT_LOADING;

					// 3.将结果resolve返回出去
					resolve(res);
				})
				.catch((err) => {
					// 将showLoading设置true, 这样不会影响下一个请求
					this.showLoading = DEAFULT_LOADING;
					reject(err);
					return err;
				});
		});
	}

	get<T = any>(config: VRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'GET' });
	}

	post<T = any>(config: VRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'POST' });
	}

	delete<T = any>(config: VRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'DELETE' });
	}

	patch<T = any>(config: VRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'PATCH' });
	}
}

export default VRequest;
