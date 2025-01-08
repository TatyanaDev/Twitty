import { Dispatch } from "redux";
import CommentService from "../../services/comment.service";
import ACTION_TYPES from "./actionTypes";

export const getComments = (userId: number, postId: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ACTION_TYPES.GET_COMMENTS_REQUEST });

  try {
    const { data } = await CommentService.getComments(userId, postId);

    dispatch({ type: ACTION_TYPES.GET_COMMENTS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ACTION_TYPES.GET_COMMENTS_ERROR, error });
  }
};

export const createComment = (userId: number, postId: number, content: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ACTION_TYPES.CREATE_COMMENT_REQUEST });

  try {
    const { data } = await CommentService.createComment(userId, postId, { content });

    dispatch({ type: ACTION_TYPES.CREATE_COMMENT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ACTION_TYPES.CREATE_COMMENT_ERROR, error });
  }
};

export const updateComment = (userId: number, postId: number, commentId: number, content: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ACTION_TYPES.UPDATE_COMMENT_REQUEST });

  try {
    const { data } = await CommentService.updateComment(userId, postId, commentId, { content });

    dispatch({ type: ACTION_TYPES.UPDATE_COMMENT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ACTION_TYPES.UPDATE_COMMENT_ERROR, error });
  }
};

export const deleteComment = (userId: number, postId: number, commentId: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ACTION_TYPES.DELETE_COMMENT_REQUEST });

  try {
    const { data } = await CommentService.deleteComment(userId, postId, commentId);

    dispatch({ type: ACTION_TYPES.DELETE_COMMENT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ACTION_TYPES.DELETE_COMMENT_ERROR, error });
  }
};
