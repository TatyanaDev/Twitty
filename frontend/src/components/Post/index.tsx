import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deletePost } from "../../store/actions/postActions";
import { userSelector } from "../../store/selectors";
import { formatDate } from "../../utils/formatDate";
import { IPostData } from "../../types/Post";
import style from "./styles.module.css";
import UpdateForm from "../UpdateForm";

interface PostProps {
  post: IPostData;
}

export default function Post({ post }: PostProps) {
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  return (
    <li key={post.id} className="item">
      {editingPostId === post.id ? (
        <>
          <h4 className="mb-9 font-12 fw-700">
            <Link to={`/posts/${post.id}`} className={style["color-black"]}>
              {post.user?.firstName || user.firstName}&nbsp;{post.user?.lastName || user.lastName}&nbsp;
              <span className="color-gray fw-400">
                @{post.user?.userName || user.userName}&nbsp;·&nbsp;{formatDate(post.createdAt)}
              </span>
            </Link>
          </h4>

          <UpdateForm item={post} setEditingId={setEditingPostId} />
        </>
      ) : (
        <>
          <h4 className="mb-9 font-12 fw-700">
            <Link to={`/posts/${post.id}`} className={style["color-black"]}>
              {post.user?.firstName || user.firstName}&nbsp;{post.user?.lastName || user.lastName}&nbsp;
              <span className="color-gray fw-400">
                @{post.user?.userName || user.userName}&nbsp;·&nbsp;{formatDate(post.createdAt)}
              </span>
            </Link>

            {post.userId === user?.id && (
              <>
                <button onClick={() => setEditingPostId(post.id)}>Edit</button>
                <button onClick={() => dispatch(deletePost(user.id, post.id))}>Delete</button>
              </>
            )}
          </h4>

          <p className="item-content">{post.content}</p>
        </>
      )}
    </li>
  );
}
