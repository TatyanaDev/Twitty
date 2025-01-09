import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { userSelector, postsSelector } from "../../store/selectors";
import { deletePost } from "../../store/actions/postActions";
import CreatePostForm from "../../components/CreatePostForm";
import UpdatePostForm from "../../components/UpdatePostForm";
import { formatDate } from "../../utils/formatDate";
import { IPostData } from "../../types/Post";
import Layout from "../../components/Layout";

export default function Users() {
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const { posts } = useSelector(postsSelector);
  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();
  const history = useHistory();

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
    <Layout>
      <div>
        <article>
          <CreatePostForm />
        </article>
        <article>
          <ul>
            {userPosts.length ? (
              userPosts.map((post: IPostData) => (
                <li key={post.id}>
                  {editingPostId === post.id ? (
                    <UpdatePostForm post={post} setEditingPostId={setEditingPostId} />
                  ) : (
                    <>
                      <h1>
                        <Link to={`/posts/${post.id}`}>
                          {post.user?.firstName || user.firstName}&nbsp;{post.user?.lastName || user.lastName}&nbsp;@{post.user?.userName || user.userName}&nbsp;·&nbsp;{formatDate(post.createdAt)}
                        </Link>

                        {post.userId === user?.id && (
                          <>
                            <button onClick={() => setEditingPostId(post.id)}>Edit</button>
                            <button onClick={() => dispatch(deletePost(user.id, post.id))}>Delete</button>
                          </>
                        )}
                      </h1>
                      <p>{post.content}</p>
                    </>
                  )}
                </li>
              ))
            ) : (
              <p>No posts yet...</p>
            )}
          </ul>
        </article>
        <button onClick={logoutUser}>Sign out</button>
      </div>
    </Layout>
  );
}
