import { ICommentData } from "./Comment";
import { IPostData } from "./Post";
import { IUserData } from "./User";

interface BaseState {
  isFetching: boolean;
  error: string | null;
}

interface UserState extends BaseState {
  user: IUserData;
}

interface PostsState extends BaseState {
  posts: IPostData[];
}

interface CommentsState extends BaseState {
  comments: ICommentData[];
}

export interface RootState {
  user: UserState;
  posts: PostsState;
  comments: CommentsState;
}
