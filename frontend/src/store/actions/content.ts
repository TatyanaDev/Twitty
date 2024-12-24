import ACTION_TYPES from "../../store/types";

export const set_content = (content: string) => async (dispatch: any) => {
  dispatch({ type: ACTION_TYPES.SET_CONTENT_REQUEST });

  dispatch({ type: ACTION_TYPES.SET_CONTENT_SUCCESS, payload: { content } });
};

export const clear_content = () => async (dispatch: any) => {
  dispatch({ type: ACTION_TYPES.CLEAR_CONTENT_REQUEST });

  dispatch({ type: ACTION_TYPES.CLEAR_CONTENT_SUCCESS });
};
