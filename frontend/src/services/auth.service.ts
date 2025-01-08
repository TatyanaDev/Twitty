import { AxiosResponse } from "axios";
import { UserRegistrationFormValues } from "../components/UserRegistrationForm";
import { UserLoginFormValues } from "../components/UserLoginForm";
import IAuthData, { AuthResponse } from "../types/Auth";
import IUserData from "../types/User";
import http from "../api";

export default class AuthService {
  static async registerUser(user: UserRegistrationFormValues): Promise<AxiosResponse<AuthResponse>> {
    return http.post<AuthResponse>("/user/register", user);
  }

  static async loginUser(user: UserLoginFormValues): Promise<AxiosResponse<AuthResponse>> {
    return http.post<AuthResponse>("/user/login", user);
  }




  static async refresh(): Promise<AxiosResponse<any>> {
    return http.get<IAuthData>("token/refresh", { withCredentials: true });
  }

  static async logout(data: IUserData): Promise<AxiosResponse<any>> {
    return http.post("/token/logout", data);
  }
}
