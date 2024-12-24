import PostService from "../../services/post.service";
import ACTION_TYPES from "../../store/types";
import IUserData from "../../types/User";
import IPostData from "../../types/Post";

export const get_posts = () => async (dispatch: any) => {
  dispatch({ type: ACTION_TYPES.GET_POSTS_REQUEST });

  const { data } = await PostService.getPosts();

  dispatch({ type: ACTION_TYPES.GET_POSTS_SUCCESS, payload: data });
};

export const create_post = (userData: IUserData, content: string, posts: IPostData[]) => async (dispatch: any) => {
  dispatch({ type: ACTION_TYPES.CREATE_POST_REQUEST });

  const { data } = await PostService.createPost(userData.id!, { content });

  dispatch({ type: ACTION_TYPES.CREATE_POST_SUCCESS, payload: { data: [data.data, ...posts] } });
};

export const update_post = (target: any, userData: IUserData, posts: IPostData[]) => async (dispatch: any) => {
  dispatch({ type: ACTION_TYPES.UPDATE_POST_REQUEST });

  await PostService.updatePost(Number(target.id), userData.id!, { content: target[0].value });

  dispatch({ type: ACTION_TYPES.UPDATE_POST_SUCCESS, payload: { data: posts } });
};

export const delete_post = (id: string, userData: IUserData, posts: IPostData[]) => async (dispatch: any) => {
  dispatch({ type: ACTION_TYPES.DELETE_POST_REQUEST });

  await PostService.deletePost(Number(id), userData.id!);

  dispatch({ type: ACTION_TYPES.DELETE_POST_SUCCESS, payload: { data: posts.filter((post: any) => post.id !== Number(id)) } });
};
