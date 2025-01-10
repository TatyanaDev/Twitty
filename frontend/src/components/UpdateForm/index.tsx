import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import { POST_CONTENT_VALIDATION_SCHEMA, COMMENT_CONTENT_VALIDATION_SCHEMA } from "../../utils/validationSchemas";
import { ICommentData, CommentContent } from "../../interfaces/Comment";
import { updateComment } from "../../store/actions/commentActions";
import { IPostData, PostContent } from "../../interfaces/Post";
import { updatePost } from "../../store/actions/postActions";
import { userSelector } from "../../store/selectors";
import style from "./styles.module.css";

interface UpdateFormProps {
  item: IPostData | ICommentData;
  setEditingId: (id: number | null) => void;
  isPost?: boolean;
}

export default function UpdateForm({ item, setEditingId, isPost = true }: UpdateFormProps) {
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();

  const initialValues: PostContent | CommentContent = {
    content: item.content || "",
  };

  const handleCancel = () => setEditingId(null);

  const handleSubmit = ({ content }: PostContent | CommentContent) => {
    if (user) {
      if (isPost) {
        dispatch(updatePost(user.id, item.id, content));
      } else if ("postId" in item) {
        dispatch(updateComment(user.id, item.postId, item.id, content));
      }

      handleCancel();
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={isPost ? POST_CONTENT_VALIDATION_SCHEMA : COMMENT_CONTENT_VALIDATION_SCHEMA} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form className={style["text-end"]}>
          <div>
            <Field name="content" as="textarea" placeholder={`Edit your ${isPost ? "post" : "comment"}`} aria-label={`${isPost ? "Post" : "Comment"} content`} aria-invalid={touched.content && !!errors.content} aria-describedby="contentError" className={style["textarea-update"]} rows={4} />

            {errors.content && touched.content && (
              <p id="contentError" className="error mb-2">
                {errors.content}
              </p>
            )}
          </div>

          <div>
            <button className={style["save-button"]} type="submit">
              Save
            </button>
            <button className={style["cancel-button"]} type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
