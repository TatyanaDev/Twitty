import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getComments, updateComment, deleteComment } from "../../store/actions/commentActions";
import { deletePost, updatePost } from "../../store/actions/postActions";
import { commentsSelector, userSelector } from "../../store/selectors";
import CreateCommentForm from "../../components/CreateCommentForm";
import UpdateCommentForm from "../../components/UpdateCommentForm";
import NavigationMenu from "../../components/NavigationMenu";
import UpdatePostForm from "../../components/UpdatePostForm";
import { getUser } from "../../store/actions/userActions";
import ICommentData from "../../types/Comment";
import IPostData from "../../types/Post";

export default function Comments({ posts }: { posts: IPostData[] }) {
  const params = useParams<any>();
  const history = useHistory();

  const dispatch = useDispatch();

  const { user } = useSelector(userSelector);
  const { comments } = useSelector(commentsSelector);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getComments(user?.id, params.id));
  }, [dispatch, user?.id, params.id]);

  const currentPost = posts.filter((post) => post.id === parseInt(params.id))[0];

  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const handleCancelEditPost = () => setEditingPostId(null);
  const handleCancelEditComment = () => setEditingCommentId(null);

  const handleSaveEditPost = (updatedPost: { content: string }) => {
    if (user && editingPostId !== null) {
      const { content } = updatedPost;

      dispatch(updatePost(user.id, editingPostId, content));

      handleCancelEditPost();
    }
  };

  const handleSaveEditComment = (updatedComment: { content: string }) => {
    if (user && params.id !== null && editingCommentId !== null) {
      const { content } = updatedComment;

      dispatch(updateComment(user.id, params.id, editingCommentId, content));

      handleCancelEditComment();
    }
  };

  const handleDeletePost = async (userId: number, postId: number) => {
    await dispatch(deletePost(userId, postId));

    history.push(`/${user.userName}`);
  };

  const handleDeleteComment = async (userId: number, postId: number, commentId: number) => dispatch(deleteComment(userId, postId, commentId));

  return (
    <section className="d-flex">
      {user && <NavigationMenu />}
      <div>
        <article>
          {editingPostId === currentPost?.id ? (
            <UpdatePostForm post={currentPost} onSave={handleSaveEditPost} onCancel={handleCancelEditPost} />
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
                    <UpdateCommentForm comment={comment} onSave={handleSaveEditComment} onCancel={handleCancelEditComment} />
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
                          <button onClick={() => handleDeleteComment(user.id, params.id, comment.id)}>Delete</button>
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
