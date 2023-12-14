import axios, { AxiosResponse, AxiosError } from "axios";
import { BASE_API_URL } from "../config";

const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Xử lý lỗi mạng hoặc lỗi từ server ở đây
    console.error('API request failed:', error);
    return Promise.reject(error);
  }
);

export default api;