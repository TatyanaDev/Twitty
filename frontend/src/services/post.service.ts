import { AxiosResponse } from "axios";
import { PostsResponse, PostContent, PostResponse, PostIdResponse } from "../interfaces/Post";
import http from "../api";

export default class PostService {
  static async getPosts(): Promise<AxiosResponse<PostsResponse>> {
    return http.get<PostsResponse>("/post");
  }

  static async createPost(userId: number, post: PostContent): Promise<AxiosResponse<PostResponse>> {
    return http.post<PostResponse>(`/user/${userId}/post`, post);
  }

  static async updatePost(userId: number, postId: number, post: PostContent): Promise<AxiosResponse<PostResponse>> {
    return http.patch<PostResponse>(`/user/${userId}/post/${postId}`, post);
  }

  static async deletePost(userId: number, postId: number): Promise<AxiosResponse<PostIdResponse>> {
    return http.delete<PostIdResponse>(`/user/${userId}/post/${postId}`);
  }
}
