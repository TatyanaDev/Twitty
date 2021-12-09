import { AxiosResponse } from "axios";
import IPostData from "../types/Post";
import http from "../http-common";
export default class PostService {
  static async getPosts(): Promise<AxiosResponse<any>> {
    return http.get<Array<IPostData>>("/post");
  }

  static async getPost(postId: any): Promise<AxiosResponse<any>> {
    return http.get<Array<IPostData>>(`/post/${postId}`);
  }

  static async createPost(userId: number, data: IPostData): Promise<AxiosResponse<any>> {
    return http.post<IPostData>(`/user/${userId}/post`, data);
  }

  static async updatePost(postId: number, userId: number, data: IPostData): Promise<AxiosResponse<any>> {
    return http.patch<IPostData>(`/user/${userId}/post/${postId}`, data);
  }

  static async deletePost(postId: number, userId: number): Promise<AxiosResponse<any>> {
    return http.delete<IPostData>(`/user/${userId}/post/${postId}`);
  }
}
