import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostDataService from "../../services/post.service";
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

  const createPost = (event: any) => {
    event.preventDefault();

    PostDataService.createPost({ content: event.target[0].value })
      .then(({ data }: any) => {
        setPosts({ data: [data.data, ...posts?.data] });
        event.target[0].value = "";
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

  const savePost = ({ target }: any) => {
    setContent(target.value);
  };

  const cancelPost = () => {
    setCurrentPost(null);
  };

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
          <form onSubmit={createPost}>
            <textarea />
            <button type='submit'>Tweet</button>
          </form>
        </article>
        <article>
          <ul>
            {posts &&
              posts.data?.map((post: any) => (
                <li key={post.id}>
                  {Number(currentPost) === post.id ? (
                    <form id={post.id} onSubmit={updatePost}>
                      <textarea value={content || `  ${post.content.trim()}`} onChange={savePost} />
                      <button id={post.id} type='submit'>
                        Save
                      </button>
                      <button id={post.id} onClick={cancelPost}>
                        Cancel
                      </button>
                    </form>
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
