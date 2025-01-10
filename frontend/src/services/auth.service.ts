import { AxiosResponse } from "axios";
import { AuthResponse } from "../interfaces/Auth";
import { IUserData } from "../interfaces/User";
import http from "../api";

export default class AuthService {
  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return http.get<AuthResponse>("token/refresh", { withCredentials: true });
  }

  static async logout(data: IUserData): Promise<AxiosResponse<any>> {
    return http.post("/token/logout", data);
  }
}
