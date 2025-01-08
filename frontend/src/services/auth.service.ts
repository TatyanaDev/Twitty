import { AxiosResponse } from "axios";
import IAuthData from "../types/Auth";
import IUserData from "../types/User";
import http from "../api";

export default class AuthService {
  static async refresh(): Promise<AxiosResponse<any>> {
    return http.get<IAuthData>("token/refresh", { withCredentials: true });
  }

  static async logout(data: IUserData): Promise<AxiosResponse<any>> {
    return http.post("/token/logout", data);
  }
}
