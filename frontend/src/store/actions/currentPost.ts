import ACTION_TYPES from "../../store/types";

export const set_current_post = (currentPost: number) => async (dispatch: any) => {
  dispatch({ type: ACTION_TYPES.SET_CURRENT_POST_REQUEST });

  dispatch({ type: ACTION_TYPES.SET_CURRENT_POST_SUCCESS, payload: { currentPost } });
};

export const remove_current_post = () => async (dispatch: any) => {
  dispatch({ type: ACTION_TYPES.REMOVE_CURRENT_POST_REQUEST });

  dispatch({ type: ACTION_TYPES.REMOVE_CURRENT_POST_SUCCESS });
};
