import { combineReducers } from "redux";
import currentPost from "./currentPost";
import content from "./content";
import userData from "./user";
import posts from "./post";

export default combineReducers({
  currentPost,
  userData,
  content,
  posts,
});
