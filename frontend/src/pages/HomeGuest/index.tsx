import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getPostsSelector } from "../../store/selectors";
import { get_posts } from "../../store/actions/post";
import ACTION_TYPES from "../../store/types";

export default function HomeGuest() {
  const posts = useSelector(getPostsSelector).posts;
  const dispatch = useDispatch();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    try {
      dispatch(get_posts());
    } catch (err) {
      dispatch({ type: ACTION_TYPES.GET_POSTS_ERROR });
    }
  };

  return (
    <section>
      <div className="container">
        <article>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
        </article>
        <article>
          <ul>
            {posts.length ? (
              posts.map((post: any) => (
                <li key={post.id}>
                  <h1>
                    {post.User.firstName} {post.User.lastName} @{post.User.userName} · {new Date(post.updatedAt).toLocaleString("arabext", { day: "numeric", month: "short", year: "numeric" })}
                  </h1>
                  <p>{post.content}</p>
                </li>
              ))
            ) : (
              <p>No posts yet...</p>
            )}
          </ul>
        </article>
      </div>
      <footer>
        <nav>
          <ul className="container">
            <li>
              <Link to="/login">Sign in</Link>
            </li>
            <li>
              <Link to="/register">Sign up</Link>
            </li>
          </ul>
        </nav>
      </footer>
    </section>
  );
}
