import http from "../http-common";
import IUserData from "../types/User";

const createUser = (data: IUserData) => {
  return http.post<IUserData>("/user/register", data);
};

const checkUser = (data: IUserData) => {
  return http.post<IUserData>("/user/login", data);
};

const UserService = {
  createUser,
  checkUser,
};

export default UserService;
