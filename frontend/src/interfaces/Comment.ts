export interface CommentContent {
  content: string;
}

export interface ICommentData extends CommentContent {
  id: number;
  userId: number;
  postId: number;
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

export interface CommentResponse {
  data: ICommentData;
}

export interface CommentIdResponse {
  data: { commentId: string };
}
