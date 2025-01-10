import ACTION_TYPES from "../actions/actionTypes";
import { IUserData } from "../../interfaces/User";

interface RegisterUserRequestAction {
  type: typeof ACTION_TYPES.REGISTER_USER_REQUEST;
}

interface RegisterUserSuccessAction {
  type: typeof ACTION_TYPES.REGISTER_USER_SUCCESS;
}

interface RegisterUserErrorAction {
  type: typeof ACTION_TYPES.REGISTER_USER_ERROR;
  error: string;
}

interface LoginUserRequestAction {
  type: typeof ACTION_TYPES.LOGIN_USER_REQUEST;
}

interface LoginUserSuccessAction {
  type: typeof ACTION_TYPES.LOGIN_USER_SUCCESS;
}

interface LoginUserErrorAction {
  type: typeof ACTION_TYPES.LOGIN_USER_ERROR;
  error: string;
}

interface GetUserDataRequestAction {
  type: typeof ACTION_TYPES.GET_USER_DATA_REQUEST;
}

interface GetUserDataSuccessAction {
  type: typeof ACTION_TYPES.GET_USER_DATA_SUCCESS;
  payload: IUserData;
}

interface GetUserDataErrorAction {
  type: typeof ACTION_TYPES.GET_USER_DATA_ERROR;
  error: string;
}

type UserActions = RegisterUserRequestAction | RegisterUserSuccessAction | RegisterUserErrorAction | LoginUserRequestAction | LoginUserSuccessAction | LoginUserErrorAction | GetUserDataRequestAction | GetUserDataSuccessAction | GetUserDataErrorAction;

const initialState = {
  user: null,
  isFetching: false,
  error: null,
};

const userReducer = (state = initialState, action: UserActions) => {
  switch (action.type) {
    case ACTION_TYPES.REGISTER_USER_REQUEST:
    case ACTION_TYPES.LOGIN_USER_REQUEST:
    case ACTION_TYPES.GET_USER_DATA_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case ACTION_TYPES.REGISTER_USER_SUCCESS:
    case ACTION_TYPES.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case ACTION_TYPES.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isFetching: false,
      };
    case ACTION_TYPES.REGISTER_USER_ERROR:
    case ACTION_TYPES.LOGIN_USER_ERROR:
    case ACTION_TYPES.GET_USER_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
