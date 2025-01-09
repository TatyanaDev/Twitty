import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getComments, deleteComment, clearComments } from "../../store/actions/commentActions";
import { userSelector, postsSelector, commentsSelector } from "../../store/selectors";
import CreateCommentForm from "../../components/CreateCommentForm";
import UpdateCommentForm from "../../components/UpdateCommentForm";
import { deletePost } from "../../store/actions/postActions";
import UpdatePostForm from "../../components/UpdatePostForm";
import { formatDate } from "../../utils/formatDate";
import { ICommentData } from "../../types/Comment";
import Layout from "../../components/Layout";

interface RouteParams {
  id: string;
}

export default function Comments() {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const { comments } = useSelector(commentsSelector);
  const { posts } = useSelector(postsSelector);
  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();
  const history = useHistory();

  const { id: postId } = useParams<RouteParams>();

  useEffect(() => {
    dispatch(getComments(user?.id, postId));

    return () => {
      dispatch(clearComments());
    };
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
    <Layout>
      <div>
        <article>
          {editingPostId === currentPost?.id ? (
            <UpdatePostForm post={currentPost} setEditingPostId={setEditingPostId} />
          ) : (
            <>
              <h1>
                {currentPost?.user?.firstName || user?.firstName}&nbsp;{currentPost?.user?.lastName || user?.lastName}&nbsp;@{currentPost?.user?.userName || user?.userName}&nbsp;·&nbsp;{formatDate(currentPost?.createdAt)}
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
                        {comment.user?.firstName || user.firstName}&nbsp;{comment.user?.lastName || user.lastName}&nbsp;@{comment.user?.userName || user.userName}&nbsp;·&nbsp;{formatDate(comment.createdAt)}
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
    </Layout>
  );
}
