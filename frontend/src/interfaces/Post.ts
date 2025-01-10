export interface PostContent {
  content: string;
}

export interface IPostData extends PostContent {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    firstName: string;
    lastName: string;
    userName: string;
  };
}

export interface PostsResponse {
  data: IPostData[];
}

export interface PostResponse {
  data: IPostData;
}

export interface PostIdResponse {
  data: { postId: string };
}
