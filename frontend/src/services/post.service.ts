import http from "../http-common";
import IPost from "../types/Post";

const getPosts = () => {
  return http.get<Array<IPost>>("/post");
};

const createPost = (data: IPost) => {
  return http.post<IPost>("/post", data);
};

const updatePost = (id: any, data: IPost) => {
  return http.patch<IPost>(`/post/${id}`, data);
};

const deletePost = (id: any) => {
  return http.delete<any>(`/post/${id}`);
};

const PostService = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};

export default PostService;
