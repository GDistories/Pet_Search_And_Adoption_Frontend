import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface VRequestInterceptors<T = AxiosResponse> {
	requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
	requestInterceptorCatch?: (error: any) => any;
	responseInterceptor?: (res: T) => T;
	responseInterceptorCatch?: (error: any) => any;
}

export interface VRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: VRequestInterceptors<T>;
	showLoading?: boolean;
	contentType?: string;
}
