import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextAreaCreatePost from "../../components/TextAreaCreatePost";
import TextAreaUpdatePost from "../../components/TextAreaUpdatePost";
import NavigationMenu from "../../components/NavigationMenu";
import PostService from "../../services/post.service";
import UserService from "../../services/user.service";
import IPostData from "../../types/Post";

export default function Home({ userData, setUserData }: any) {
  const initialValues = {
    content: "",
  };

  const [posts, setPosts] = useState<IPostData[]>([]);
  const [currentPost, setCurrentPost] = useState<null>(null);
  const [content, setContent] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      getPosts();
    }
  }, [userData]);

  const getUserData = async () => {
    try {
      const { data } = await UserService.getUserData();

      setUserData(data.data);
    } catch (err) {
      localStorage.removeItem("token");

      history.push("/");
    }
  };

  const getPosts = async () => {
    try {
      const { data } = await PostService.getPosts();

      setPosts(data.data);
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

      setPosts([data.data, ...posts]);

      formikBag.resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const updatePost = async (event: any) => {
    event.preventDefault();

    posts.map((objPost: IPostData) => (objPost.id === Number(event.target.id) ? (objPost.content = event.target[0].value) : objPost));

    try {
      await PostService.updatePost(Number(event.target.id), userData.id, { content: event.target[0].value });

      setPosts(posts);

      setCurrentPost(null);

      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async ({ target }: any) => {
    try {
      await PostService.deletePost(Number(target.id), userData.id);

      setPosts(posts.filter((post: any) => post.id !== Number(target.id)));
    } catch (err) {
      console.error(err);
    }
  };

  const setIdCurrentPost = ({ target }: any) => {
    setCurrentPost(target.id);
    setContent(target.value);
  };

  const cancelPost = () => {
    setCurrentPost(null);
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string().trim(),
  });

  return (
    <section className='container'>
      {userData && <NavigationMenu userData={userData} />}
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
                          {post.User?.firstName || userData.firstName} {post.User?.lastName || userData.lastName} @{post.User?.userName || userData.userName} · {new Date(post.createdAt).toLocaleString("arabext", { day: "numeric", month: "short", year: "numeric" })}
                        </Link>
                      </h1>
                      <p>{post.content}</p>
                      {post.userId === userData.id && (
                        <>
                          <button id={post.id} onClick={setIdCurrentPost}>
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
