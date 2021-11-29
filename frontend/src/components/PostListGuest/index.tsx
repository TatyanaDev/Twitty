import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostDataService from "../../services/post.service";
import IPostData from "../../types/Post";
import style from "./styles.module.css";

export default function PostListGuest() {
  const initialPostState = {
    id: null,
    content: "",
    createdAt: undefined,
    updatedAt: undefined,
  };

  const [posts, setPosts] = useState<IPostData>(initialPostState) as any;

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

  return (
    <section>
      <div className={style.container}>
        <article>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
            </ul>
          </nav>
        </article>
        <article>
          <ul>{posts && posts.data?.map((post: any) => <li key={post.id}>{post.content}</li>)}</ul>
        </article>
      </div>
      <footer>
        <nav>
          <ul className={style.container}>
            <li>
              <Link to='/login'>Sign in</Link>
            </li>
            <li>
              <Link to='/register'>Sign up</Link>
            </li>
          </ul>
        </nav>
      </footer>
    </section>
  );
}
