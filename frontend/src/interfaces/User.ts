export interface IUserData {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

export interface UserResponse {
  data: IUserData;
}

export interface UserRegistrationFormValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserLoginFormValues {
  login: string;
  password: string;
}
