import { RootState } from "../../types/state";

export const commentsSelector = (state: RootState) => state.comments;
export const postsSelector = (state: RootState) => state.posts;
export const userSelector = (state: RootState) => state.user;
