import axios from "axios";
import AuthService from "./services/auth.service";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const { data } = await AuthService.refresh();

        localStorage.setItem("token", data.data.accessToken);

        return api.request(originalRequest);
      } catch (err) {
        console.log("Not authorized");
      }
    }
    throw error;
  }
);

export default api;
