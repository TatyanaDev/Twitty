import { AxiosResponse } from "axios";
import IPostData, { PostsResponse } from "../types/Post";
import http from "../api";

export default class PostService {
  static async getPosts(): Promise<AxiosResponse<PostsResponse>> {
    return http.get<PostsResponse>("/post");
  }

  static async createPost(userId: number, data: { content: string }): Promise<AxiosResponse<any>> {
    return http.post<IPostData>(`/user/${userId}/post`, data);
  }

  static async updatePost(userId: number, postId: number, data: { content: string }): Promise<AxiosResponse<any>> {
    return http.patch<IPostData>(`/user/${userId}/post/${postId}`, data);
  }

  static async deletePost(userId: number, postId: number): Promise<AxiosResponse<any>> {
    return http.delete<IPostData>(`/user/${userId}/post/${postId}`);
  }
}
