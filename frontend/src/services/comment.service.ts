import { AxiosResponse } from "axios";
import ICommentData from "../types/Comment";
import http from "../http-common";

export default class CommentService {
  static async getComments(postId: number): Promise<AxiosResponse<any>> {
    return http.get<Array<ICommentData>>(`post/${postId}/comment`);
  }

  static async createComment(userId: number, postId: number, data: ICommentData): Promise<AxiosResponse<any>> {
    return http.post<Array<ICommentData>>(`user/${userId}/post/${postId}/comment`, data);
  }

  static async updateComment(userId: number, postId: number, commentId: number, data: ICommentData): Promise<AxiosResponse<any>> {
    return http.patch<ICommentData>(`/user/${userId}/post/${postId}/comment/${commentId}`, data);
  }

  static async deleteComment(userId: number, postId: number, commentId: number): Promise<AxiosResponse<any>> {
    return http.delete<ICommentData>(`/user/${userId}/post/${postId}/comment/${commentId}`);
  }
}
