import ACTION_TYPES from "../actions/actionTypes";
import { IPostData } from "../../interfaces/Post";

interface GetPostsRequestAction {
  type: typeof ACTION_TYPES.GET_POSTS_REQUEST;
}

interface GetPostsSuccessAction {
  type: typeof ACTION_TYPES.GET_POSTS_SUCCESS;
  payload: IPostData[];
}

interface GetPostsErrorAction {
  type: typeof ACTION_TYPES.GET_POSTS_ERROR;
  error: string;
}

interface CreatePostRequestAction {
  type: typeof ACTION_TYPES.CREATE_POST_REQUEST;
}

interface CreatePostSuccessAction {
  type: typeof ACTION_TYPES.CREATE_POST_SUCCESS;
  payload: IPostData;
}

interface CreatePostErrorAction {
  type: typeof ACTION_TYPES.CREATE_POST_ERROR;
  error: string;
}

interface UpdatePostRequestAction {
  type: typeof ACTION_TYPES.UPDATE_POST_REQUEST;
}

interface UpdatePostSuccessAction {
  type: typeof ACTION_TYPES.UPDATE_POST_SUCCESS;
  payload: IPostData;
}

interface UpdatePostErrorAction {
  type: typeof ACTION_TYPES.UPDATE_POST_ERROR;
  error: string;
}

interface DeletePostRequestAction {
  type: typeof ACTION_TYPES.DELETE_POST_REQUEST;
}

interface DeletePostSuccessAction {
  type: typeof ACTION_TYPES.DELETE_POST_SUCCESS;
  payload: { postId: string };
}

interface DeletePostErrorAction {
  type: typeof ACTION_TYPES.DELETE_POST_ERROR;
  error: string;
}

type PostActions = GetPostsRequestAction | GetPostsSuccessAction | GetPostsErrorAction | CreatePostRequestAction | CreatePostSuccessAction | CreatePostErrorAction | UpdatePostRequestAction | UpdatePostSuccessAction | UpdatePostErrorAction | DeletePostRequestAction | DeletePostSuccessAction | DeletePostErrorAction;

const initialState = {
  posts: [],
  isFetching: false,
  error: null,
};

const postReducer = (state = initialState, action: PostActions) => {
  switch (action.type) {
    case ACTION_TYPES.GET_POSTS_REQUEST:
    case ACTION_TYPES.CREATE_POST_REQUEST:
    case ACTION_TYPES.UPDATE_POST_REQUEST:
    case ACTION_TYPES.DELETE_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case ACTION_TYPES.GET_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: action.payload,
      };
    case ACTION_TYPES.CREATE_POST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: [action.payload, ...state.posts],
      };
    case ACTION_TYPES.UPDATE_POST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: state.posts.map((post: IPostData) => (post.id === action.payload.id ? action.payload : post)),
      };
    case ACTION_TYPES.DELETE_POST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: state.posts.filter((post: IPostData) => post.id !== parseInt(action.payload.postId)),
      };
    case ACTION_TYPES.GET_POSTS_ERROR:
    case ACTION_TYPES.CREATE_POST_ERROR:
    case ACTION_TYPES.UPDATE_POST_ERROR:
    case ACTION_TYPES.DELETE_POST_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default postReducer;
