import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextAreaCreatePost from "../../../components/TextAreaCreatePost";
import TextAreaUpdatePost from "../../../components/TextAreaUpdatePost";
import { get_user_data, logout_user } from "../../../store/actions/user";
import NavigationMenu from "../../../components/NavigationMenu";
import { getUserDataSelector } from "../../../store/selectors";
import PostService from "../../../services/post.service";
import UserService from "../../../services/user.service";
import ACTION_TYPES from "../../../store/types";
import IPostData from "../../../types/Post";

export default function Users() {
  const userData = useSelector(getUserDataSelector).userData;

  const initialValues = {
    content: "",
  };

  const [userPosts, setUserPosts] = useState<IPostData[]>([]);
  const [currentPost, setCurrentPost] = useState<null>(null);
  const [content, setContent] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();

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

  const getPosts = async () => {
    try {
      const { data } = await UserService.getUserPosts(userData.id);

      setUserPosts(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createPost = async ({ content }: any, formikBag: any) => {
    if (!content) {
      return;
    }

    try {
      const { data } = await PostService.createPost(userData.id, { content });

      setUserPosts([data.data, ...userPosts]);

      formikBag.resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const updatePost = async (event: any) => {
    event.preventDefault();

    userPosts.map((objPost: IPostData) => (objPost.id === Number(event.target.id) ? (objPost.content = event.target[0].value) : objPost));

    try {
      await PostService.updatePost(Number(event.target.id), userData.id, { content: event.target[0].value });

      setUserPosts(userPosts);

      setCurrentPost(null);

      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async ({ target }: any) => {
    try {
      await PostService.deletePost(Number(target.id), userData.id);

      setUserPosts(userPosts.filter((post: any) => post.id !== Number(target.id)));
    } catch (err) {
      console.error(err);
    }
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string().trim(),
  });

  const setIdCurrentPost = ({ target }: any) => {
    setCurrentPost(target.id);
    setContent(target.value);
  };

  const cancelPost = () => {
    setCurrentPost(null);
  };

  const logoutUser = () => {
    try {
      dispatch(logout_user(userData));

      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className='container'>
      {userData && <NavigationMenu />}
      <div>
        <article>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={createPost}>
            <Form>
              <TextAreaCreatePost name='content' />
              <button type='submit'>Tweet</button>
            </Form>
          </Formik>
        </article>
        <article>
          <ul>
            {userPosts.length ? (
              userPosts.map((post: any) => (
                <li key={post.id}>
                  {Number(currentPost) === post.id ? (
                    <>
                      <h1>
                        <Link to={`/posts/${post.id}`}>
                          {userData.firstName} {userData.lastName} @{userData.userName} · {new Date(post.createdAt).toLocaleString("arabext", { day: "numeric", month: "short", year: "numeric" })}
                        </Link>
                      </h1>
                      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={createPost}>
                        <Form id={post.id} onSubmit={updatePost}>
                          <TextAreaUpdatePost name='content' setContent={setContent} content={content} post={post} />
                          <button id={post.id} type='submit'>
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
                          {userData.firstName} {userData.lastName} @{userData.userName} · {new Date(post.createdAt).toLocaleString("arabext", { day: "numeric", month: "short", year: "numeric" })}
                        </Link>
                      </h1>
                      <p>{post.content}</p>
                      <button id={post.id} onClick={setIdCurrentPost}>
                        Edit
                      </button>
                      <button id={post.id} onClick={deletePost}>
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))
            ) : (
              <p>No posts yet...</p>
            )}
          </ul>
        </article>
        <button onClick={logoutUser}>Sign out</button>
      </div>
    </section>
  );
}
