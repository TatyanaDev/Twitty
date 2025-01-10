import { AxiosResponse } from "axios";
import { UserRegistrationFormValues, UserLoginFormValues, UserResponse } from "../interfaces/User";
import { AuthResponse } from "../interfaces/Auth";
import http from "../api";

export default class UserService {
  static async registerUser(user: UserRegistrationFormValues): Promise<AxiosResponse<AuthResponse>> {
    return http.post<AuthResponse>("/user/register", user);
  }

  static async loginUser(user: UserLoginFormValues): Promise<AxiosResponse<AuthResponse>> {
    return http.post<AuthResponse>("/user/login", user);
  }

  static async getUser(): Promise<AxiosResponse<UserResponse>> {
    return http.get<UserResponse>("/user");
  }
}
