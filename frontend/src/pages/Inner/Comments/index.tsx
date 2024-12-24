import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { getUserDataSelector, setCurrentPostSelector, getPostsSelector } from "../../../store/selectors";
import { set_current_post, remove_current_post } from "../../../store/actions/currentPost";
import TextAreaCreateComment from "../../../components/TextAreaCreateComment";
import TextAreaUpdateContent from "../../../components/TextAreaUpdateComment";
import { set_content, clear_content } from "../../../store/actions/content";
import TextAreaUpdatePost from "../../../components/TextAreaUpdatePost";
import NavigationMenu from "../../../components/NavigationMenu";
import CommentService from "../../../services/comment.service";
import { get_user_data } from "../../../store/actions/user";
import { update_post } from "../../../store/actions/post";
import PostService from "../../../services/post.service";
import ICommentData from "../../../types/Comment";
import ACTION_TYPES from "../../../store/types";
import IPostData from "../../../types/Post";

export default function Comments() {
  const currentPost = useSelector(setCurrentPostSelector).currentPost;
  const userData = useSelector(getUserDataSelector).userData;
  const posts = useSelector(getPostsSelector).posts;

  const initialPostState = {
    id: null,
    userId: null,
    content: "",
    createdAt: undefined,
    updatedAt: undefined,
  };

  const initialValuesPost = {
    content: "",
  };

  const initialValuesComment = {
    contents: "",
  };


  //продолжить редакс
  const [userPost, setUserPost] = useState<IPostData[]>([initialPostState]) as any;
  const [comments, setComments] = useState<ICommentData[]>([]);

  const [content, setContent] = useState<string>("");
  const params = useParams<any>();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      getPost();
    }
  }, [userData]);

  useEffect(() => {
    if (userData && userPost) {
      getComments();
    }
  }, [userData, userPost]);

  const getUserData = () => {
    try {
      dispatch(get_user_data());
    } catch (err) {
      dispatch({ type: ACTION_TYPES.GET_USER_DATA_ERROR });

      localStorage.removeItem("token");

      history.push("/");
    }
  };

  const getPost = async () => {
    try {
      const { data } = await PostService.getPost(params.id);

      setUserPost(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getComments = async () => {
    try {
      const { data } = await CommentService.getComments(params.id);

      setComments(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createComment = async ({ contents }: any, formikBag: any) => {
    if (!contents) {
      return;
    }

    try {
      const { data } = await CommentService.createComment(userData.id, params.id, { contents });

      setComments([data.data, ...comments]);
      formikBag.resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const updatePost = async (event: any) => {
    event.preventDefault();

    posts.map((objPost: IPostData) => (objPost.id === Number(event.target.id) ? (objPost.content = event.target[0].value) : objPost));

    try {
      dispatch(update_post(event.target, userData, posts));

      dispatch(remove_current_post());

      dispatch(clear_content());
    } catch (err) {
      dispatch({ type: ACTION_TYPES.UPDATE_POST_ERROR });
    }
  };

  const deletePost = async ({ target }: any) => {
    try {
      await PostService.deletePost(Number(target.id), userData.id);

      history.push(`/${userData?.userName}`);
    } catch (err) {
      console.error(err);
    }
  };

  const updateComment = async (event: any) => {
    event.preventDefault();

    comments.map((objComment: ICommentData) => (objComment.id === Number(event.target.id) ? (objComment.contents = event.target[0].value) : objComment));

    try {
      await CommentService.updateComment(userData.id, userPost.id, Number(event.target.id), { contents: event.target[0].value });

      setComments(comments);

      // setCurrentPost(null);

      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async ({ target }: any) => {
    try {
      await CommentService.deleteComment(userData.id, userPost.id, Number(target.id));

      setComments(comments.filter((comment: any) => comment.id !== Number(target.id)));
    } catch (err) {
      console.error(err);
    }
  };

  const setCurrentPost = ({ target }: any) => {
    dispatch(set_current_post(target.id));

    dispatch(set_content(target.value));
  };

  const cancelPost = (event: any) => {
    event.preventDefault();

    dispatch(remove_current_post());
  };

  const validationSchemaPost = Yup.object().shape({
    content: Yup.string().trim(),
  });

  const validationSchemaComment = Yup.object().shape({
    content: Yup.string().trim(),
  });

  return (
    <section className='container'>
      {userData && <NavigationMenu />}
      <div>
        <article>
          {Number(currentPost) === userPost.id ? (
            <>
              <h1>
                {userPost.User?.firstName} {userPost.User?.lastName} @{userPost.User?.userName} · {new Date(userPost.createdAt).toLocaleString("arabext", { day: "numeric", month: "short", year: "numeric" })}
              </h1>
              <Formik initialValues={initialValuesPost} validationSchema={validationSchemaPost} onSubmit={createComment}>
                <Form id={userPost.id} onSubmit={updatePost}>
                  <TextAreaUpdatePost name='content' setContent={setContent} content={content} post={userPost} />
                  <button id={userPost.id} type='submit'>
                    Save
                  </button>
                  <button id={userPost.id} onClick={cancelPost}>
                    Cancel
                  </button>
                </Form>
              </Formik>
            </>
          ) : (
            <>
              <h1>
                {userPost.User?.firstName} {userPost.User?.lastName} @{userPost.User?.userName} · {new Date(userPost.createdAt).toLocaleString("arabext", { day: "numeric", month: "short", year: "numeric" })}
              </h1>
              <p>{userPost.content}</p>
              {userPost.userId === userData?.id && (
                <>
                  <button id={userPost.id} onClick={setCurrentPost}>
                    Edit
                  </button>
                  <button id={userPost.id} onClick={deletePost}>
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </article>
        <article>
          <Formik initialValues={initialValuesComment} validationSchema={validationSchemaComment} onSubmit={createComment}>
            <Form>
              <TextAreaCreateComment name='contents' />
              <button type='submit'>Comment</button>
            </Form>
          </Formik>
        </article>
        <article>
          <ul>
            {comments.length ? (
              comments.map((comment: any) => (
                <li key={comment.id}>
                  {Number(currentPost) === comment.id ? (
                    <>
                      <h1>
                        {comment.User?.firstName || userData.firstName} {comment.User?.lastName || userData.lastName} @{comment.User?.userName || userData.userName} · {new Date(comment.createdAt).toLocaleString("arabext", { day: "numeric", month: "short", year: "numeric" })}
                      </h1>
                      <Formik initialValues={initialValuesComment} validationSchema={validationSchemaComment} onSubmit={createComment}>
                        <Form id={comment.id} onSubmit={updateComment}>
                          <TextAreaUpdateContent name='contents' setContent={setContent} content={content} comment={comment} />
                          <button id={comment.id} type='submit'>
                            Save
                          </button>
                          <button id={comment.id} onClick={cancelPost}>
                            Cancel
                          </button>
                        </Form>
                      </Formik>
                    </>
                  ) : (
                    <>
                      <h1>
                        {comment.User?.firstName || userData?.firstName} {comment.User?.lastName || userData?.lastName} @{comment.User?.userName || userData?.userName} · {new Date(comment.createdAt).toLocaleString("arabext", { day: "numeric", month: "short", year: "numeric" })}
                      </h1>
                      <p>{comment.contents}</p>
                      {comment.userId === userData?.id && (
                        <>
                          <button id={comment.id} onClick={setCurrentPost}>
                            Edit
                          </button>
                          <button id={comment.id} onClick={deleteComment}>
                            Delete
                          </button>
                        </>
                      )}
                    </>
                  )}
                </li>
              ))
            ) : (
              <p>No comments yet... Be the first!</p>
            )}
          </ul>
        </article>
      </div>
    </section>
  );
}
