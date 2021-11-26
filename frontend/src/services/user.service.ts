import http from "../http-common";
import IUserData from "../types/User";

const createUser = (data: IUserData) => {
  return http.post<IUserData>("/user", data);
};

const UserService = {
  createUser,
};

export default UserService;
