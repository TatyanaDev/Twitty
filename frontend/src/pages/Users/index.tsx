import { useSelector } from "react-redux";
import { userSelector, postsSelector } from "../../store/selectors";
import CreateForm from "../../components/CreateForm";
import { IPostData } from "../../interfaces/Post";
import Layout from "../../components/Layout";
import Post from "../../components/Post";
import style from "./styles.module.css";

export default function Users() {
  const { posts } = useSelector(postsSelector);
  const { user } = useSelector(userSelector);

  const logoutUser = () => {
    // try {
    //   dispatch(logout_user(userData));
    //   history.push("/");
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const userPosts = posts.filter(({ userId }) => userId === user?.id);

  return (
    <>
      <Layout>
        <article>
          <div className={style["user-info-wrapper"]}>
            <h3 className="font-17 fw-700 mb-2">
              {user?.firstName}&nbsp;{user?.lastName}
            </h3>

            <p className={style["user-posts-info"]}>{userPosts.length}&nbsp;posts</p>
            <p className="color-gray font-12">@{user?.userName}</p>
          </div>

          <CreateForm />
        </article>

        <article>
          <ul>{userPosts.length ? userPosts.map((post: IPostData) => <Post post={post} />) : <p className="no-yet-message">No posts yet...</p>}</ul>
        </article>
      </Layout>

      <button onClick={logoutUser}>Sign out</button>
    </>
  );
}
