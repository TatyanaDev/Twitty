import { Link } from "react-router-dom";
import { IPostData } from "../../types/Post";

interface HomeGuestProps {
  posts: IPostData[];
}

export default function HomeGuest({ posts }: HomeGuestProps) {
  return (
    <section>
      <div className="d-flex">
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
              posts.map((post) => (
                <li key={post.id}>
                  <h1>
                    {post.user.firstName}&nbsp;{post.user.lastName}&nbsp;@{post.user.userName}&nbsp;·&nbsp;
                    {new Date(post.createdAt).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
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
          <ul className="d-flex">
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
