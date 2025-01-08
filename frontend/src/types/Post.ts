export default interface IPostData {
  id: number;
  userId: number;
  content: string;
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
