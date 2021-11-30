import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import PostDataService from "../../services/post.service";
import TextAreaCreatePost from "./TextAreaCreatePost";
import TextAreaUpdatePost from "./TextAreaUpdatePost";
import IPostData from "../../types/Post";
import style from "./styles.module.css";

export default function PostList() {
  const initialPostState = {
    id: null,
    content: "",
    createdAt: undefined,
    updatedAt: undefined,
  };

  const [posts, setPosts] = useState<IPostData>(initialPostState) as any;
  const [currentPost, setCurrentPost] = useState<null>(null);
  const [content, setContent] = useState<string>("");

  const initialValues = {
    content: "",
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    PostDataService.getPosts()
      .then((res: any) => {
        setPosts(res.data);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  const createPost = (values: any, formikBag: any) => {
    if (!values.content) {
      return;
    }
    PostDataService.createPost({ content: values.content })
      .then(({ data }: any) => {
        setPosts({ data: [data.data, ...posts?.data] });
        formikBag.resetForm();
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  const deletePost = ({ target }: any) => {
    PostDataService.deletePost(Number(target.id))
      .then(() => {
        setPosts({ data: posts.data.filter((post: any) => post.id !== Number(target.id)) });
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  const updatePost = (event: any) => {
    event.preventDefault();

    posts.data.map((objPost: IPostData) => (objPost.id === Number(event.target.id) ? (objPost.content = event.target[0].value) : objPost));

    PostDataService.updatePost(Number(event.target.id), { content: event.target[0].value })
      .then(() => {
        setPosts({ data: posts.data });
        setCurrentPost(null);
        setContent("");
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  const setIdCurrentPost = ({ target }: any) => {
    setCurrentPost(target.id);
    setContent(target.value);
  };

  const cancelPost = () => {
    setCurrentPost(null);
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string(),
  });

  return (
    <section className={style.container}>
      <article>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/messages'>Messages</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link to='/settings'>Settings</Link>
            </li>
          </ul>
        </nav>
      </article>
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
            {posts &&
              posts.data?.map((post: any) => (
                <li key={post.id}>
                  {Number(currentPost) === post.id ? (
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
                  ) : (
                    <>
                      {post.content}
                      <button id={post.id} onClick={setIdCurrentPost}>
                        Edit
                      </button>
                      <button id={post.id} onClick={deletePost}>
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
