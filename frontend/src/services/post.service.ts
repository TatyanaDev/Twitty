import http from "../http-common";
import IPostData from "../types/Post";

const getPosts = () => {
  return http.get<Array<IPostData>>("/post");
};

const createPost = (data: IPostData) => {
  return http.post<IPostData>("/post", data);
};

const updatePost = (id: any, data: IPostData) => {
  return http.patch<IPostData>(`/post/${id}`, data);
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
