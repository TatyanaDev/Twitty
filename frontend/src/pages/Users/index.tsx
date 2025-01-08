import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { deletePost, updatePost } from "../../store/actions/postActions";
import NavigationMenu from "../../components/NavigationMenu";
import CreatePostForm from "../../components/CreatePostForm";
import UpdatePostForm from "../../components/UpdatePostForm";
import { getUser } from "../../store/actions/userActions";
import { userSelector } from "../../store/selectors";
import IPostData from "../../types/Post";

export default function Users({ posts }: { posts: IPostData[] }) {
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

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { user } = useSelector(userSelector);

  const handleDeletePost = (userId: number, postId: number) => dispatch(deletePost(userId, postId));

  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const setEditingPost = (postId: number) => setEditingPostId(postId);

  const handleCancelEdit = () => setEditingPostId(null);

  const handleSaveEdit = (updatedPost: { content: string }) => {
    if (user && editingPostId !== null) {
      const { content } = updatedPost;

      dispatch(updatePost(user.id, editingPostId, content));

      setEditingPostId(null);
    }
  };

  const userPosts = posts.filter((post) => post.userId === user.id);

  return (
    <section className="d-flex">
      {user && <NavigationMenu />}
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
                    <UpdatePostForm post={post} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
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

                        {post.userId === user.id && (
                          <>
                            <button onClick={() => setEditingPost(post.id)}>Edit</button>
                            <button onClick={() => handleDeletePost(user.id, post.id)}>Delete</button>
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
