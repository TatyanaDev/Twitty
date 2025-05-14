interface IAuthData {
  accessToken: string;
}

export interface AuthResponse {
  data: IAuthData;
}

export interface LogoutResponse {
  data: { message: string };
}
