import { ThunkDispatch } from "redux-thunk";
import { AnyAction, Dispatch } from "redux";
import { UserRegistrationFormValues, UserLoginFormValues } from "../../interfaces/User";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import { RootState } from "../../interfaces/state";
import ACTION_TYPES from "./actionTypes";

export const getUser = () => async (dispatch: Dispatch) => {
  dispatch({ type: ACTION_TYPES.GET_USER_DATA_REQUEST });

  try {
    const { data } = await UserService.getUser();

    dispatch({ type: ACTION_TYPES.GET_USER_DATA_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ACTION_TYPES.GET_USER_DATA_ERROR, error });

    throw error;
  }
};

export const registerUser = (user: UserRegistrationFormValues) => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: ACTION_TYPES.REGISTER_USER_REQUEST });

  try {
    const { data } = await UserService.registerUser(user);
    const { accessToken, refreshToken } = data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    dispatch({ type: ACTION_TYPES.REGISTER_USER_SUCCESS });

    await dispatch(getUser());
  } catch (err: any) {
    const error = err.response?.data?.error?.message || "An unknown error occurred";

    dispatch({ type: ACTION_TYPES.REGISTER_USER_ERROR, error });

    throw err;
  }
};

export const loginUser = (user: UserLoginFormValues) => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: ACTION_TYPES.LOGIN_USER_REQUEST });

  try {
    const { data } = await UserService.loginUser(user);

    const { accessToken, refreshToken } = data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    dispatch({ type: ACTION_TYPES.LOGIN_USER_SUCCESS });

    await dispatch(getUser());
  } catch (err: any) {
    const error = err.response?.data?.error?.message || "An unknown error occurred";

    dispatch({ type: ACTION_TYPES.LOGIN_USER_ERROR, error });

    throw error;
  }
};

export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ACTION_TYPES.LOGOUT_USER_DATA_REQUEST });

    await AuthService.logout();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    dispatch({ type: ACTION_TYPES.LOGOUT_USER_DATA_SUCCESS });
    dispatch({ type: ACTION_TYPES.CLEAR_USER_DATA });
  } catch (err) {
    dispatch({ type: ACTION_TYPES.LOGOUT_USER_DATA_ERROR, payload: err });

    throw err;
  }
};

