export default interface IUserData {
  id?: string | number;
  firstName?: string;
  lastName?: string;
  userName?: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
