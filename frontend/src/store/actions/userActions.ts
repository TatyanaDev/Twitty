import { Dispatch } from "redux";
import { UserRegistrationFormValues } from "../../components/UserRegistrationForm";
import { UserLoginFormValues } from "../../components/UserLoginForm";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import IUserData from "../../types/User";
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

export const registerUser = (user: UserRegistrationFormValues) => async (dispatch: Dispatch) => {
  dispatch({ type: ACTION_TYPES.REGISTER_USER_REQUEST });

  try {
    const { data } = await AuthService.registerUser(user);

    const { accessToken, refreshToken } = data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    dispatch({ type: ACTION_TYPES.REGISTER_USER_SUCCESS });

    await dispatch<any>(getUser());
  } catch (err: any) {
    const error = err.response?.data?.error?.message || "An unknown error occurred";

    dispatch({ type: ACTION_TYPES.REGISTER_USER_ERROR, error });

    throw error;
  }
};

export const loginUser = (user: UserLoginFormValues) => async (dispatch: Dispatch) => {
  dispatch({ type: ACTION_TYPES.LOGIN_USER_REQUEST });

  try {
    const { data } = await AuthService.loginUser(user);

    const { accessToken, refreshToken } = data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    dispatch({ type: ACTION_TYPES.LOGIN_USER_SUCCESS });

    await dispatch<any>(getUser());
  } catch (err: any) {
    const error = err.response?.data?.error?.message || "An unknown error occurred";

    dispatch({ type: ACTION_TYPES.LOGIN_USER_ERROR, error });

    throw error;
  }
};

export const logout_user = (user: IUserData) => async (dispatch: any) => {
  dispatch({ type: ACTION_TYPES.LOGOUT_USER_DATA_REQUEST });

  localStorage.removeItem("token");

  // await AuthService.logout({ email: user.email });

  dispatch({ type: ACTION_TYPES.LOGOUT_USER_DATA_SUCCESS });

  localStorage.removeItem("token");
};
