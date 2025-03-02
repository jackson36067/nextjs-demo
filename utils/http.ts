import axios from "axios";

// 定义通用的响应数据结构
export interface ResponseType<T> {
  data: T;
  message: string;
  code: number;
}

const httpInstance = axios.create({
  baseURL: "http://localhost:8080/admin/",
  timeout: 5000,
});

// 请求拦截器
httpInstance.interceptors.request.use((config) => {
  return config;
});

// 响应拦截器，使返回的数据符合 ResponseType<T>
httpInstance.interceptors.response.use(
  (config) => {
    return config.data;
  },
  // 直接返回 ResponseType<T>
  (error) => Promise.reject(error) // 统一处理错误
);
export default httpInstance;
