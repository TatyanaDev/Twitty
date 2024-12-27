import { combineReducers } from "redux";
import currentPost from "./currentPost";
import content from "./content";
import userData from "./user";
import posts from "./post";

const rootReducer = combineReducers({
  currentPost,
  userData,
  content,
  posts,
});

export default rootReducer;
