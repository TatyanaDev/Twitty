import { AxiosResponse } from "axios";
import { CommentContent, CommentsResponse, CommentResponse, CommentIdResponse } from "../types/Comment";
import http from "../api";

export default class CommentService {
  static async getComments(userId: number, postId: string): Promise<AxiosResponse<CommentsResponse>> {
    return http.get<CommentsResponse>(`user/${userId}/post/${postId}/comment`);
  }
  static async createComment(userId: number, postId: number, comment: CommentContent): Promise<AxiosResponse<CommentResponse>> {
    return http.post<CommentResponse>(`user/${userId}/post/${postId}/comment`, comment);
  }

  static async updateComment(userId: number, postId: number, commentId: number, comment: CommentContent): Promise<AxiosResponse<CommentResponse>> {
    return http.patch<CommentResponse>(`/user/${userId}/post/${postId}/comment/${commentId}`, comment);
  }

  static async deleteComment(userId: number, postId: string, commentId: number): Promise<AxiosResponse<CommentIdResponse>> {
    return http.delete<CommentIdResponse>(`/user/${userId}/post/${postId}/comment/${commentId}`);
  }
}
