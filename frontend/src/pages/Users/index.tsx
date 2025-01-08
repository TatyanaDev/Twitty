import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { deletePost } from "../../store/actions/postActions";
import NavigationMenu from "../../components/NavigationMenu";
import CreatePostForm from "../../components/CreatePostForm";
import UpdatePostForm from "../../components/UpdatePostForm";
import { getUser } from "../../store/actions/userActions";
import { userSelector } from "../../store/selectors";
import { IPostData } from "../../types/Post";

interface UsersProps {
  posts: IPostData[];
}

export default function Users({ posts }: UsersProps) {
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const logoutUser = () => {
    // try {
    //   dispatch(logout_user(userData));
    //   history.push("/");
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const userPosts = posts.filter(({ userId }) => userId === user.id);

  return (
    <section className="d-flex">
      {user && <NavigationMenu user={user} />}
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
        <button onClick={logoutUser}>Sign out</button>
      </div>
    </section>
  );
}
