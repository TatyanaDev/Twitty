import ACTION_TYPE from "../types";

const initialState = {
  isFetching: false,
  content: "",
};

const contentReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.SET_CONTENT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPE.SET_CONTENT_SUCCESS: {
      const content = payload.content;

      return {
        ...state,
        content,
        isFetching: false,
      };
    }

    case ACTION_TYPE.CLEAR_CONTENT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPE.CLEAR_CONTENT_SUCCESS: {
      return {
        ...state,
        content: "",
        isFetching: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default contentReducer;
