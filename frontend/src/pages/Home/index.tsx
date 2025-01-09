import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userSelector, postsSelector } from "../../store/selectors";
import { deletePost } from "../../store/actions/postActions";
import NavigationMenu from "../../components/NavigationMenu";
import CreatePostForm from "../../components/CreatePostForm";
import UpdatePostForm from "../../components/UpdatePostForm";
import { getUser } from "../../store/actions/userActions";
import { IPostData } from "../../types/Post";

export default function Home() {
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const { posts } = useSelector(postsSelector);
  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <section className="d-flex">
      {user && <NavigationMenu user={user} />}
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
                          {post.user?.firstName || user.firstName}&nbsp;{post.user?.lastName || user.lastName}&nbsp;@{post.user?.userName || user.userName}&nbsp;·&nbsp;
                          {new Date(post.createdAt).toLocaleString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
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
    </section>
  );
}
