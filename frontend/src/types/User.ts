export default interface IUserData {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

export interface UserResponse {
  data: IUserData;
}