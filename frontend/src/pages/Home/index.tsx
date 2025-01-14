import { useSelector } from "react-redux";
import { postsSelector } from "../../store/selectors";
import CreateForm from "../../components/CreateForm";
import { IPostData } from "../../interfaces/Post";
import Layout from "../../components/Layout";
import Post from "../../components/Post";

export default function Home() {
  const { posts } = useSelector(postsSelector);

  return (
    <Layout>
      <article>
        <h3 className="main-header">Explore</h3>

        <CreateForm />
      </article>

      <article>
        <ul>{posts.length ? posts.map((post: IPostData) => <Post key={post.id} post={post} />) : <p className="no-yet-message">No posts yet...</p>}</ul>
      </article>
    </Layout>
  );
}
