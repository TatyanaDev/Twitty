import ACTION_TYPE from "../types";

const initialState = {
  isFetching: false,
  posts: [],
};

const postReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.GET_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPE.GET_POSTS_SUCCESS: {
      const posts = payload.data;

      return {
        ...state,
        posts,
        isFetching: false,
      };
    }

    case ACTION_TYPE.GET_POSTS_ERROR:
      return {
        ...state,
        isFetching: false,
      };

    case ACTION_TYPE.CREATE_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPE.CREATE_POST_SUCCESS: {
      const posts = payload.data;

      return {
        ...state,
        posts,
        isFetching: false,
      };
    }

    case ACTION_TYPE.CREATE_POST_ERROR:
      return {
        ...state,
        isFetching: false,
      };

    case ACTION_TYPE.UPDATE_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPE.UPDATE_POST_SUCCESS: {
      const posts = payload.data;

      return {
        ...state,
        posts,
        isFetching: false,
      };
    }

    case ACTION_TYPE.UPDATE_POST_ERROR:
      return {
        ...state,
        isFetching: false,
      };

    case ACTION_TYPE.DELETE_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPE.DELETE_POST_SUCCESS: {
      const posts = payload.data;

      return {
        ...state,
        posts,
        isFetching: false,
      };
    }

    case ACTION_TYPE.DELETE_POST_ERROR:
      return {
        ...state,
        isFetching: false,
      };

    default: {
      return state;
    }
  }
};

export default postReducer;
