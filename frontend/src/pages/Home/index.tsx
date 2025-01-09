import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userSelector, postsSelector } from "../../store/selectors";
import { deletePost } from "../../store/actions/postActions";
import CreatePostForm from "../../components/CreatePostForm";
import UpdatePostForm from "../../components/UpdatePostForm";
import { formatDate } from "../../utils/formatDate";
import { IPostData } from "../../types/Post";
import Layout from "../../components/Layout";

export default function Home() {
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const { posts } = useSelector(postsSelector);
  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  return (
    <Layout>
      <div>
        <article>
          <CreatePostForm />
        </article>
        <article>
          <ul>
            {posts.length ? (
              posts.map((post: IPostData) => (
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
      </div>
    </Layout>
  );
}
