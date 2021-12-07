import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostDataService from "../../services/post.service";
import IPostData from "../../types/Post";

export default function HomeGuest() {
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
      <div className='container'>
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
          <ul>
            {posts &&
              posts.data?.map((post: any) => (
                <li key={post.id}>
                  <h1>
                    {post.User.firstName} {post.User.lastName} @{post.User.userName} · {new Date(post.updatedAt).toLocaleString("arabext", { day: "numeric", month: "short", year: "numeric" })}
                  </h1>
                  <p>{post.content}</p>
                </li>
              ))}
          </ul>
        </article>
      </div>
      <footer>
        <nav>
          <ul className='container'>
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
