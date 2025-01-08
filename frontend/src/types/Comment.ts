export default interface ICommentData {
  id: number;
  userId: number;
  postId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    firstName: string;
    lastName: string;
    userName: string;
  };
}

export interface CommentsResponse {
  data: ICommentData[];
}
