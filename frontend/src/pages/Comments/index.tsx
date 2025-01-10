import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getComments, deleteComment, clearComments } from "../../store/actions/commentActions";
import { userSelector, postsSelector, commentsSelector } from "../../store/selectors";
import { deletePost } from "../../store/actions/postActions";
import UpdateForm from "../../components/UpdateForm";
import CreateForm from "../../components/CreateForm";
import { formatDate } from "../../utils/formatDate";
import { ICommentData } from "../../types/Comment";
import Layout from "../../components/Layout";
import style from "./styles.module.css";

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
      <article>
        <div className={style["comments-wrapper"]}>
          <h3 className="font-17 fw-700 mb-2">Thread</h3>
          <p className="color-gray font-12">{comments.length}&nbsp;replies</p>
        </div>

        {editingPostId === currentPost?.id ? (
          <UpdateForm item={currentPost} setEditingId={setEditingPostId} />
        ) : (
          <div className="item">
            <h4 className="mb-9 font-12 fw-700">
              {currentPost?.user?.firstName || user?.firstName}&nbsp;{currentPost?.user?.lastName || user?.lastName}&nbsp;
              <span className="color-gray fw-400">
                @{currentPost?.user?.userName || user?.userName}&nbsp;·&nbsp;{formatDate(currentPost?.createdAt)}
              </span>
              {currentPost?.userId === user?.id && (
                <>
                  <button onClick={() => setEditingPostId(currentPost.id)}>Edit</button>
                  <button onClick={() => handleDeletePost(user.id, currentPost.id)}>Delete</button>
                </>
              )}
            </h4>

            <p className="item-content">{currentPost?.content}</p>
          </div>
        )}
      </article>

      <article>
        <CreateForm postId={currentPost?.id} />
      </article>

      <article>
        <ul>
          {comments.length ? (
            comments.map((comment: ICommentData) => (
              <li key={comment.id} className="item">
                {editingCommentId === comment.id ? (
                  <UpdateForm item={comment} setEditingId={setEditingCommentId} isPost={false} />
                ) : (
                  <>
                    <h4 className="mb-9 font-12 fw-700">
                      {comment.user?.firstName || user.firstName}&nbsp;{comment.user?.lastName || user.lastName}&nbsp;
                      <span className="color-gray fw-400">
                        @{comment.user?.userName || user.userName}&nbsp;·&nbsp;{formatDate(comment.createdAt)}
                      </span>
                      {comment.userId === user?.id && (
                        <>
                          <button onClick={() => setEditingCommentId(comment.id)}>Edit</button>
                          <button onClick={() => dispatch(deleteComment(user.id, postId, comment.id))}>Delete</button>
                        </>
                      )}
                    </h4>

                    <p className="item-content">{comment.content}</p>
                  </>
                )}
              </li>
            ))
          ) : (
            <p className="no-yet-message ">No comments yet... Be the first!</p>
          )}
        </ul>
      </article>
    </Layout>
  );
}
