import { ICommentData } from "../../types/Comment";
import ACTION_TYPES from "../actions/actionTypes";

interface GetCommentsRequestAction {
  type: typeof ACTION_TYPES.GET_COMMENTS_REQUEST;
}

interface GetCommentsSuccessAction {
  type: typeof ACTION_TYPES.GET_COMMENTS_SUCCESS;
  payload: ICommentData[];
}

interface GetCommentsErrorAction {
  type: typeof ACTION_TYPES.GET_COMMENTS_ERROR;
  error: string;
}

interface CreateCommentRequestAction {
  type: typeof ACTION_TYPES.CREATE_COMMENT_REQUEST;
}

interface CreateCommentSuccessAction {
  type: typeof ACTION_TYPES.CREATE_COMMENT_SUCCESS;
  payload: ICommentData;
}

interface CreateCommentErrorAction {
  type: typeof ACTION_TYPES.CREATE_COMMENT_ERROR;
  error: string;
}

interface UpdateCommentRequestAction {
  type: typeof ACTION_TYPES.UPDATE_COMMENT_REQUEST;
}

interface UpdateCommentSuccessAction {
  type: typeof ACTION_TYPES.UPDATE_COMMENT_SUCCESS;
  payload: ICommentData;
}

interface UpdateCommentErrorAction {
  type: typeof ACTION_TYPES.UPDATE_COMMENT_ERROR;
  error: string;
}

interface DeleteCommentRequestAction {
  type: typeof ACTION_TYPES.DELETE_COMMENT_REQUEST;
}

interface DeleteCommentSuccessAction {
  type: typeof ACTION_TYPES.DELETE_COMMENT_SUCCESS;
  payload: { commentId: string };
}

interface DeleteCommentErrorAction {
  type: typeof ACTION_TYPES.DELETE_COMMENT_ERROR;
  error: string;
}

interface ClearCommentsAction {
  type: typeof ACTION_TYPES.CLEAR_COMMENTS;
}

type CommentActions = GetCommentsRequestAction | GetCommentsSuccessAction | GetCommentsErrorAction | CreateCommentRequestAction | CreateCommentSuccessAction | CreateCommentErrorAction | UpdateCommentRequestAction | UpdateCommentSuccessAction | UpdateCommentErrorAction | DeleteCommentRequestAction | DeleteCommentSuccessAction | DeleteCommentErrorAction | ClearCommentsAction;

const initialState = {
  comments: [],
  isFetching: false,
  error: null,
};

const commentReducer = (state = initialState, action: CommentActions) => {
  switch (action.type) {
    case ACTION_TYPES.GET_COMMENTS_REQUEST:
    case ACTION_TYPES.CREATE_COMMENT_REQUEST:
    case ACTION_TYPES.UPDATE_COMMENT_REQUEST:
    case ACTION_TYPES.DELETE_COMMENT_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case ACTION_TYPES.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        comments: action.payload,
      };
    case ACTION_TYPES.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        comments: [action.payload, ...state.comments],
      };
    case ACTION_TYPES.UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        comments: state.comments.map((comment: ICommentData) => (comment.id === action.payload.id ? action.payload : comment)),
      };
    case ACTION_TYPES.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        comments: state.comments.filter((comment: ICommentData) => comment.id !== parseInt(action.payload.commentId)),
      };
    case ACTION_TYPES.GET_COMMENTS_ERROR:
    case ACTION_TYPES.CREATE_COMMENT_ERROR:
    case ACTION_TYPES.UPDATE_COMMENT_ERROR:
    case ACTION_TYPES.DELETE_COMMENT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case ACTION_TYPES.CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };
    default:
      return state;
  }
};

export default commentReducer;
