import { combineReducers } from "redux";
import comments from "./commentReducer";
import posts from "./postReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
  user,
  posts,
  comments,
});

export default rootReducer;
