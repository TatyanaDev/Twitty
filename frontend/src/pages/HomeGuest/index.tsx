import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postsSelector } from "../../store/selectors";
import { formatDate } from "../../utils/formatDate";
import Layout from "../../components/Layout";

export default function HomeGuest() {
  const { posts } = useSelector(postsSelector);

  return (
    <Layout>
      <article>
        <ul>
          {posts.length ? (
            posts.map((post) => (
              <li key={post.id}>
                <h1>
                  {post.user.firstName}&nbsp;{post.user.lastName}&nbsp;@{post.user.userName}&nbsp;·&nbsp;{formatDate(post.createdAt)}
                </h1>
                <p>{post.content}</p>
              </li>
            ))
          ) : (
            <p>No posts yet...</p>
          )}
        </ul>
      </article>

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
    </Layout>
  );
}
