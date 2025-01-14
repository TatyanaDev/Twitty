import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteComment } from "../../store/actions/commentActions";
import { ICommentData } from "../../interfaces/Comment";
import { userSelector } from "../../store/selectors";
import { formatDate } from "../../utils/formatDate";
import DropdownMenu from "../DropdownMenu";
import UpdateForm from "../UpdateForm";

interface CommentProps {
  comment: ICommentData;
  postId: string;
}

export default function Comment({ comment, postId }: CommentProps) {
  const [editingId, setEditingId] = useState<number | null>(null);

  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  return (
    <li className="item">
      {editingId === comment.id ? (
        <>
          <h4 className="mb-9 font-12 fw-700">
            {comment.user?.firstName || user.firstName}&nbsp;{comment.user?.lastName || user.lastName}&nbsp;
            <span className="color-gray fw-400">
              @{comment.user?.userName || user.userName}&nbsp;·&nbsp;{formatDate(comment.createdAt)}
            </span>
          </h4>

          <UpdateForm item={comment} setEditingId={setEditingId} isPost={false} />
        </>
      ) : (
        <>
          <h4 className="header-container">
            <div>
              {comment.user?.firstName || user.firstName}&nbsp;{comment.user?.lastName || user.lastName}&nbsp;
              <span className="color-gray fw-400">
                @{comment.user?.userName || user.userName}&nbsp;·&nbsp;{formatDate(comment.createdAt)}
              </span>
            </div>

            {comment.userId === user?.id && <DropdownMenu handleEditButton={() => setEditingId(comment.id)} handleDeleteButton={() => dispatch(deleteComment(user.id, postId, comment.id))} />}
          </h4>

          <p className="item-content">{comment.content}</p>
        </>
      )}
    </li>
  );
}
