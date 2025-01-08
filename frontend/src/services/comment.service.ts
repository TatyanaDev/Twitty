import { AxiosResponse } from "axios";
import ICommentData, { CommentsResponse } from "../types/Comment";
import http from "../api";

export default class CommentService {
  static async getComments(userId: number, postId: number): Promise<AxiosResponse<CommentsResponse>> {
    return http.get<CommentsResponse>(`user/${userId}/post/${postId}/comment`);
  }
  static async createComment(userId: number, postId: number, comment: { content: string }): Promise<AxiosResponse<any>> {
    return http.post<ICommentData>(`user/${userId}/post/${postId}/comment`, comment);
  }
  
  static async updateComment(userId: number, postId: number, commentId: number, comment: { content: string }): Promise<AxiosResponse<any>> {
    return http.patch<ICommentData>(`/user/${userId}/post/${postId}/comment/${commentId}`, comment);
  }

  static async deleteComment(userId: number, postId: number, commentId: number): Promise<AxiosResponse<any>> {
    return http.delete<ICommentData>(`/user/${userId}/post/${postId}/comment/${commentId}`);
  }
}
