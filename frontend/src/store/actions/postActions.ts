import { Dispatch } from "redux";
import PostService from "../../services/post.service";
import ACTION_TYPES from "./actionTypes";

export const getPosts = () => async (dispatch: Dispatch) => {
  dispatch({ type: ACTION_TYPES.GET_POSTS_REQUEST });

  try {
    const { data } = await PostService.getPosts();

    dispatch({ type: ACTION_TYPES.GET_POSTS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ACTION_TYPES.GET_POSTS_ERROR, error });
  }
};

export const createPost = (postData: { userId: number; content: string }) => async (dispatch: Dispatch) => {
  dispatch({ type: ACTION_TYPES.CREATE_POST_REQUEST });

  try {
    const { data } = await PostService.createPost(postData.userId, { content: postData.content });

    dispatch({ type: ACTION_TYPES.CREATE_POST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ACTION_TYPES.CREATE_POST_ERROR, error });
  }
};

export const updatePost = (userId: number, postId: number, updatedPost: { content: string }) => async (dispatch: Dispatch) => {
  dispatch({ type: ACTION_TYPES.UPDATE_POST_REQUEST });

  try {
    const { data } = await PostService.updatePost(userId, postId, updatedPost);

    dispatch({ type: ACTION_TYPES.UPDATE_POST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ACTION_TYPES.UPDATE_POST_ERROR, error });
  }
};

export const deletePost = (userId: number, postId: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ACTION_TYPES.DELETE_POST_REQUEST });

  try {
    const { data } = await PostService.deletePost(userId, postId);

    dispatch({ type: ACTION_TYPES.DELETE_POST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ACTION_TYPES.DELETE_POST_ERROR, error });
  }
};