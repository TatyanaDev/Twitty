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

export interface UserLoginFormValues {
  email: string;
  password: string;
}

export interface UserRegistrationFormValues extends UserLoginFormValues {
  firstName: string;
  lastName: string;
  userName: string;
  passwordConfirmation: string;
}
