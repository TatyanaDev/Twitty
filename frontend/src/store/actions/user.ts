import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import ACTION_TYPES from "../../store/types";
import IUserData from "../../types/User";

export const get_user_data = () => async (dispatch: any) => {
  dispatch({ type: ACTION_TYPES.GET_USER_DATA_REQUEST });

  const { data } = await UserService.getUserData();

  dispatch({ type: ACTION_TYPES.GET_USER_DATA_SUCCESS, payload: data });
};

export const logout_user = (userData: IUserData) => async (dispatch: any) => {
  dispatch({ type: ACTION_TYPES.LOGOUT_USER_DATA_REQUEST });

  localStorage.removeItem("token");

  await AuthService.logout({ email: userData.email });

  dispatch({ type: ACTION_TYPES.LOGOUT_USER_DATA_SUCCESS });

  localStorage.removeItem("token");
};
