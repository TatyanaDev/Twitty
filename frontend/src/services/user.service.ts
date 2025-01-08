import { AxiosResponse } from "axios";
import { UserResponse } from "../types/User";
import http from "../api";

export default class UserService {
  static async getUser(): Promise<AxiosResponse<UserResponse>> {
    return http.get<UserResponse>("/user");
  }
}
