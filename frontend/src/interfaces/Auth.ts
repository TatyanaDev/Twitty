interface IAuthData {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  data: IAuthData;
}

export interface LogoutResponse {
  data: { message: string };
}
