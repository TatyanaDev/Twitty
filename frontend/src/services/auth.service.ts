import { AxiosResponse } from "axios";
import IAuthResponse from "../types/AuthResponse";
import IUserData from "../types/User";
import api from "../http-common";

export default class AuthService {
  static async registration(data: IUserData): Promise<AxiosResponse<any>> {
    return api.post<IAuthResponse>("/user/register", data);
  }

  static async refresh(): Promise<AxiosResponse<any>> {
    return api.get<IAuthResponse>("token/refresh", { withCredentials: true });
  }

  static async login(data: IUserData): Promise<AxiosResponse<any>> {
    return api.post<IAuthResponse>("/user/login", data);
  }

  static async logout(data: IUserData): Promise<AxiosResponse<any>> {
    return api.post("/token/logout", data);
  }
}
