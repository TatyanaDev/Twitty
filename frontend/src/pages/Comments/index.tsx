import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { userSelector, postsSelector, commentsSelector } from "../../store/selectors";
import { getComments, clearComments } from "../../store/actions/commentActions";
import { deletePost } from "../../store/actions/postActions";
import DropdownMenu from "../../components/DropdownMenu";
import { ICommentData } from "../../interfaces/Comment";
import UpdateForm from "../../components/UpdateForm";
import CreateForm from "../../components/CreateForm";
import { formatDate } from "../../utils/formatDate";
import Comment from "../../components/Comment";
import Layout from "../../components/Layout";
import style from "./styles.module.css";

interface RouteParams {
  id: string;
}

export default function Comments() {
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
          <div className="item">
            <h4 className="mb-9 font-12 fw-700">
              {currentPost?.user?.firstName || user.firstName}&nbsp;{currentPost?.user?.lastName || user.lastName}&nbsp;
              <span className="color-gray fw-400">
                @{currentPost?.user?.userName || user.userName}&nbsp;·&nbsp;{formatDate(currentPost?.createdAt)}
              </span>
            </h4>

            <UpdateForm item={currentPost} setEditingId={setEditingPostId} />
          </div>
        ) : (
          <div className="item">
            <h4 className="header-container">
              <div>
                {currentPost?.user?.firstName || user?.firstName}&nbsp;{currentPost?.user?.lastName || user?.lastName}&nbsp;
                <span className="color-gray fw-400">
                  @{currentPost?.user?.userName || user?.userName}&nbsp;·&nbsp;{formatDate(currentPost?.createdAt)}
                </span>
              </div>

              {currentPost?.userId === user?.id && <DropdownMenu handleEditButton={() => setEditingPostId(currentPost.id)} handleDeleteButton={() => handleDeletePost(user.id, currentPost.id)} />}
            </h4>

            <p className="item-content">{currentPost?.content}</p>
          </div>
        )}
      </article>

      <article>
        <CreateForm postId={currentPost?.id} />
      </article>

      <article>
        <ul>{comments.length ? comments.map((comment: ICommentData) => <Comment key={comment.id} comment={comment} postId={postId} />) : <p className="no-yet-message ">No comments yet... Be the first!</p>}</ul>
      </article>
    </Layout>
  );
}
