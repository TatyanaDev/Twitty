import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { getUserDataSelector, getPostsSelector, setCurrentPostSelector } from "../../store/selectors";
import { get_posts, create_post, update_post, delete_post } from "../../store/actions/post";
import { set_current_post, remove_current_post } from "../../store/actions/currentPost";
import { set_content, clear_content } from "../../store/actions/content";
import TextAreaCreatePost from "../../components/TextAreaCreatePost";
import TextAreaUpdatePost from "../../components/TextAreaUpdatePost";
import NavigationMenu from "../../components/NavigationMenu";
import { get_user_data } from "../../store/actions/user";
import ACTION_TYPES from "../../store/types";
import IPostData from "../../types/Post";

export default function Home() {
  const currentPost = useSelector(setCurrentPostSelector).currentPost;
  const userData = useSelector(getUserDataSelector).userData;
  const posts = useSelector(getPostsSelector).posts;
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    content: "",
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      getPosts();
    }
  }, [userData]);

  const getUserData = () => {
    try {
      dispatch(get_user_data());
    } catch (err) {
      dispatch({ type: ACTION_TYPES.GET_USER_DATA_ERROR });

      localStorage.removeItem("token");

      history.push("/");
    }
  };

  const getPosts = () => {
    try {
      dispatch(get_posts());
    } catch (err) {
      dispatch({ type: ACTION_TYPES.GET_POSTS_ERROR });
    }
  };

  const createPost = async ({ content }: any, formikBag: any) => {
    if (!content) {
      return;
    }

    try {
      dispatch(create_post(userData, content, posts));

      formikBag.resetForm();
    } catch (err) {
      dispatch({ type: ACTION_TYPES.CREATE_POST_ERROR });
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
      dispatch(delete_post(target.id, userData, posts));
    } catch (err) {
      dispatch({ type: ACTION_TYPES.DELETE_POST_ERROR });
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

  const validationSchema = Yup.object().shape({
    content: Yup.string().trim(),
  });

  return (
    <section className="container">
      {userData && <NavigationMenu />}
      <div>
        <article>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={createPost}>
            <Form>
              <TextAreaCreatePost name="content" />
              <button type="submit">Tweet</button>
            </Form>
          </Formik>
        </article>
        <article>
          <ul>
            {posts.length ? (
              posts.map((post: any) => (
                <li key={post.id}>
                  {Number(currentPost) === post.id ? (
                    <>
                      <h1>
                        <Link to={`/posts/${post.id}`}>
                          {post.User?.firstName || userData.firstName} {post.User?.lastName || userData.lastName} @{post.User?.userName || userData.userName} · {new Date(post.createdAt).toLocaleString("arabext", { day: "numeric", month: "short", year: "numeric" })}
                        </Link>
                      </h1>
                      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={createPost}>
                        <Form id={post.id} onSubmit={updatePost}>
                          <TextAreaUpdatePost name="content" post={post} />
                          <button id={post.id} type="submit">
                            Save
                          </button>
                          <button id={post.id} onClick={cancelPost}>
                            Cancel
                          </button>
                        </Form>
                      </Formik>
                    </>
                  ) : (
                    <>
                      <h1>
                        <Link to={`/posts/${post.id}`}>
                          {post.User?.firstName || userData.firstName} {post.User?.lastName || userData.lastName} @{post.User?.userName || userData.userName} · {new Date(post.createdAt).toLocaleString("arabext", { day: "numeric", month: "short", year: "numeric" })}
                        </Link>
                      </h1>
                      <p>{post.content}</p>
                      {post.userId === userData?.id && (
                        <>
                          <button id={post.id} onClick={setCurrentPost}>
                            Edit
                          </button>
                          <button id={post.id} onClick={deletePost}>
                            Delete
                          </button>
                        </>
                      )}
                    </>
                  )}
                </li>
              ))
            ) : (
              <p>No posts yet...</p>
            )}
          </ul>
        </article>
      </div>
    </section>
  );
}
