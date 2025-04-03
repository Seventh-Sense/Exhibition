// src/utils/request.ts
import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosInstance,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL, // 基础路径
  timeout: 60000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 统一设置用户身份 Token
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 统一处理响应错误，例如 token 无效、服务端异常等
    return Promise.resolve(response.data);
  },
  (err: AxiosResponse) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
