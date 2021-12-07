import { AxiosResponse } from "axios";
import IUserData from "../types/User";
import IPostData from "../types/Post";
import api from "../http-common";
export default class UserService {
  static async getUserData(): Promise<AxiosResponse<any>> {
    return api.get<IUserData>("/user/data");
  }

  static async getUserPosts(userId: number): Promise<AxiosResponse<any>> {
    return api.get<IPostData>(`/user/${userId}/post`);
  }
}
