import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postsSelector } from "../../store/selectors";
import { formatDate } from "../../utils/formatDate";
import { IPostData } from "../../types/Post";
import Layout from "../../components/Layout";
import style from "./styles.module.css";

export default function HomeGuest() {
  const { posts } = useSelector(postsSelector);

  return (
    <>
      <Layout>
        <article>
          <h3 className="main-header">Explore</h3>

          <ul>
            {posts.length ? (
              posts.map((post: IPostData) => (
                <li key={post.id} className="item">
                  <h4 className="mb-9 font-12 fw-700">
                    {post.user.firstName}&nbsp;{post.user.lastName}&nbsp;
                    <span className="color-gray fw-400">
                      @{post.user.userName}&nbsp;·&nbsp;{formatDate(post.createdAt)}
                    </span>
                  </h4>

                  <p className="item-content">{post.content}</p>
                </li>
              ))
            ) : (
              <p className="no-yet-message">No posts yet...</p>
            )}
          </ul>
        </article>
      </Layout>

      <footer className={style.footer}>
        <div className={style["footer-content"]}>
          <div>
            <h2 className={style["stay-tuned-title"]}>Stay tuned!</h2>
            <p className={style["font-14"]}>Sing up for Twitty! Or sign in if you already have an account.</p>
          </div>

          <nav>
            <ul className="d-flex">
              <li>
                <Link to="/login" className={style["sign-in-link"]}>
                  Sign in
                </Link>
              </li>
              <li>
                <Link to="/register" className={style["sign-up-link"]}>
                  Sign up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
}
