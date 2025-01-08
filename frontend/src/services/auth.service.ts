import { AxiosResponse } from "axios";
import { AuthResponse } from "../types/Auth";
import { IUserData } from "../types/User";
import http from "../api";

export default class AuthService {
  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return http.get<AuthResponse>("token/refresh", { withCredentials: true });
  }

  static async logout(data: IUserData): Promise<AxiosResponse<any>> {
    return http.post("/token/logout", data);
  }
}
