import ACTION_TYPE from "../types";

const initialState = {
  isFetching: false,
  currentPost: null,
};

const currentPostReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.SET_CURRENT_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPE.SET_CURRENT_POST_SUCCESS: {
      const currentPost = payload.currentPost;

      return {
        ...state,
        currentPost,
        isFetching: false,
      };
    }

    case ACTION_TYPE.REMOVE_CURRENT_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPE.REMOVE_CURRENT_POST_SUCCESS: {
      return {
        ...state,
        currentPost: null,
        isFetching: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default currentPostReducer;
