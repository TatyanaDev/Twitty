export default interface IAuthData {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  data: IAuthData;
}