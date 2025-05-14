import axios, { AxiosRequestConfig, AxiosError } from "axios";
import AuthService from "../services/auth.service";
import { BASE_URL } from "../config";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _isRetry?: boolean;
}

const api = axios.create({
  headers: {
    "Content-type": "application/json",
  },
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

api.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  if (!config.headers) {
    config.headers = {};
  }

  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: CustomAxiosRequestConfig = error.config;

    if (error.response && error.response.status === 401) {
      if (error.response.data.error && error.response.data.error.message === "Invalid password") {
        return Promise.reject(error);
      }

      if (!originalRequest._isRetry) {
        originalRequest._isRetry = true;

        try {
          const { data } = await AuthService.refresh();

          localStorage.setItem("accessToken", data.data.accessToken);

          if (!originalRequest.headers) {
            originalRequest.headers = {};
          }

          originalRequest.headers["Authorization"] = `Bearer ${data.data.accessToken}`;

          return api.request(originalRequest);
        } catch (error) {
          console.error("Failed to refresh token:", error);

          localStorage.removeItem("accessToken");

          window.location.href = "/";

          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
