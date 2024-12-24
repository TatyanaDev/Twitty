import ACTION_TYPE from "../types";

const initialState = {
  isFetching: false,
  userData: null,
};

const userReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.GET_USER_DATA_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPE.GET_USER_DATA_SUCCESS: {
      const userData = payload.data;

      return {
        ...state,
        userData,
        isFetching: false,
      };
    }

    case ACTION_TYPE.GET_USER_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
      };

    case ACTION_TYPE.LOGOUT_USER_DATA_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case ACTION_TYPE.LOGOUT_USER_DATA_SUCCESS:
      return {
        ...state,
        userData: null,
        isFetching: false,
      };

    default: {
      return state;
    }
  }
};

export default userReducer;
