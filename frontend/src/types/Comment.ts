export default interface ICommentData {
  id?: any | null;
  userId?: number | null;
  postId?: number | null;
  contents: string;
  createdAt?: Date;
  updatedAt?: Date;
}
