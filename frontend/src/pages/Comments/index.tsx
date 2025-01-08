import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getComments, deleteComment } from "../../store/actions/commentActions";
import { commentsSelector, userSelector } from "../../store/selectors";
import CreateCommentForm from "../../components/CreateCommentForm";
import UpdateCommentForm from "../../components/UpdateCommentForm";
import NavigationMenu from "../../components/NavigationMenu";
import { deletePost } from "../../store/actions/postActions";
import UpdatePostForm from "../../components/UpdatePostForm";
import { getUser } from "../../store/actions/userActions";
import { ICommentData } from "../../types/Comment";
import { IPostData } from "../../types/Post";

interface CommentsProps {
  posts: IPostData[];
}

interface RouteParams {
  id: string;
}

export default function Comments({ posts }: CommentsProps) {
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const { user } = useSelector(userSelector);
  const { comments } = useSelector(commentsSelector);

  const dispatch = useDispatch();
  const history = useHistory();

  const { id: postId } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getComments(user?.id, postId));
  }, [dispatch, user?.id, postId]);

  const handleDeletePost = async (userId: number, postId: number) => {
    try {
      await dispatch(deletePost(userId, postId));

      history.push(`/${user.userName}`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const currentPost = posts.filter(({ id }) => id === parseInt(postId))[0];

  return (
    <section className="d-flex">
      {user && <NavigationMenu user={user} />}
      <div>
        <article>
          {editingPostId === currentPost?.id ? (
            <UpdatePostForm post={currentPost} setEditingPostId={setEditingPostId} />
          ) : (
            <>
              <h1>
                {currentPost?.user?.firstName || user?.firstName}&nbsp;{currentPost?.user?.lastName || user?.lastName}&nbsp;@{currentPost?.user?.userName || user?.userName}&nbsp;·&nbsp;
                {new Date(currentPost?.createdAt).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </h1>
              <p>{currentPost?.content}</p>

              {currentPost?.userId === user?.id && (
                <>
                  <button onClick={() => setEditingPostId(currentPost.id)}>Edit</button>
                  <button onClick={() => handleDeletePost(user.id, currentPost.id)}>Delete</button>
                </>
              )}
            </>
          )}
        </article>
        <article>
          <CreateCommentForm postId={currentPost?.id} />
        </article>
        <article>
          <ul>
            {comments.length ? (
              comments.map((comment: ICommentData) => (
                <li key={comment.id}>
                  {editingCommentId === comment.id ? (
                    <UpdateCommentForm comment={comment} setEditingCommentId={setEditingCommentId} />
                  ) : (
                    <>
                      <h1>
                        {comment.user?.firstName || user.firstName}&nbsp;{comment.user?.lastName || user.lastName}&nbsp;@{comment.user?.userName || user.userName}&nbsp;·&nbsp;
                        {new Date(comment.createdAt).toLocaleString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </h1>
                      <p>{comment.content}</p>

                      {comment.userId === user.id && (
                        <>
                          <button onClick={() => setEditingCommentId(comment.id)}>Edit</button>
                          <button onClick={() => dispatch(deleteComment(user.id, postId, comment.id))}>Delete</button>
                        </>
                      )}
                    </>
                  )}
                </li>
              ))
            ) : (
              <p>No comments yet... Be the first!</p>
            )}
          </ul>
        </article>
      </div>
    </section>
  );
}
