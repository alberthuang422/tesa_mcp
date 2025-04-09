import axios, { AxiosInstance, AxiosRequestConfig } from 'npm:axios';

import { BASE_URL } from "./constant.ts";
import envValueInstance from "./envValue.ts";
import { COMMON_CODE, COMMON_ERROR_MSG } from "./types/common.enum.ts";
import { Network, RequestMethod } from './types/index.enum.ts';


type RequestMethodType = <T, D extends Record<string, unknown>>(
    network: Network,
    url: string,
    params: D,
    base?: string,
    config?: AxiosRequestConfig,
) => Promise<T>;

function generateTraceId() {
    // 简单生成一个 UUID 或随机的 trace-id，确保每次请求唯一
    return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const instance: AxiosInstance = axios.create({
    timeout: 300000,
    withCredentials: true
});

const requestHandler = async <T, D extends Record<string, unknown>>(
    network: Network,
    method: RequestMethod,
    url: string,
    params: D,
    base?: string,
    config: AxiosRequestConfig = {},
): Promise<T> => {
    const baseURL = BASE_URL[network];
    const traceId = generateTraceId();

    const API_KEY = envValueInstance.getApiKey();
    const API_KEY_SYMBOL = envValueInstance.getApiKeySymbol();

    const axiosConfig: AxiosRequestConfig = {
        ...config,
        method,
        headers: {
            'Content-Type': 'application/json',
            'trace-id': traceId,
            ...config.headers
        },
        url: base || `${baseURL}${url}`,


        ...(method === RequestMethod.GET || method === RequestMethod.DELETE
            ? { params: { ...params, api_key: API_KEY, api_key_symbol: API_KEY_SYMBOL } }
            : { data: { ...params, api_key: API_KEY, api_key_symbol: API_KEY_SYMBOL } })
    };

    try {
        const response = await instance(axiosConfig);
        const { data } = response;
        if (axiosConfig?.url?.startsWith(baseURL) && data.code !== 0) {

            throw Error(COMMON_ERROR_MSG[data.code as COMMON_CODE]);
        }


        if (axiosConfig?.url?.startsWith(baseURL)) {
            return data.data;
        } else {
            return data
        }
    } catch (error: any) {
        if (
            error.response &&
            error.response.status === 403 &&
            url.startsWith(baseURL)
        ) {
            throw new Error("API_KEY is invalid");
        }
        throw error;
    }
};

export const request: Record<RequestMethod, RequestMethodType> = {
    GET: async <T, D extends Record<string, unknown>>(
        network: Network,
        url: string,
        params: D,
        base?: string,
        config?: AxiosRequestConfig,
    ) => await requestHandler<T, D>(network, RequestMethod.GET, url, params, base, config),
    POST: async <T, D extends Record<string, unknown>>(
        network: Network,
        url: string,
        params: D,
        base?: string,
        config?: AxiosRequestConfig,
    ) => await requestHandler<T, D>(network, RequestMethod.POST, url, params, base, config),
    PUT: async <T, D extends Record<string, unknown>>(
        network: Network,
        url: string,
        params: D,
        base?: string,
        config?: AxiosRequestConfig,
    ) => await requestHandler<T, D>(network, RequestMethod.PUT, url, params, base, config),
    DELETE: async <T, D extends Record<string, unknown>>(
        network: Network,
        url: string,
        params: D,
        base?: string,
        config?: AxiosRequestConfig,
    ) => await requestHandler<T, D>(network, RequestMethod.DELETE, url, params, base, config),
}