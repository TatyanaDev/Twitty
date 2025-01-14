import { AxiosResponse } from "axios";
import { AuthResponse, LogoutResponse } from "../interfaces/Auth";
import http from "../api";

export default class AuthService {
  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return http.get<AuthResponse>("token/refresh", { withCredentials: true });
  }

  static async logout(): Promise<AxiosResponse<LogoutResponse>> {
    return http.post<LogoutResponse>("/token/logout");
  }
}
