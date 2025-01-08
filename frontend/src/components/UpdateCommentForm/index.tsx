import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import { COMMENT_CONTENT_VALIDATION_SCHEMA } from "../../utils/validationSchemas";
import { updateComment } from "../../store/actions/commentActions";
import { CommentContent, ICommentData } from "../../types/Comment";
import { userSelector } from "../../store/selectors";

interface UpdateCommentFormProps {
  comment: ICommentData;
  setEditingCommentId: (commentId: number | null) => void;
}

export default function UpdateCommentForm({ comment, setEditingCommentId }: UpdateCommentFormProps) {
  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  const initialValues = {
    content: comment.content || "",
  };

  const handleCancel = () => setEditingCommentId(null);

  const handleSubmit = (values: CommentContent) => {
    if (user && comment) {
      const { content } = values;

      dispatch(updateComment(user.id, comment.postId, comment.id, content));

      handleCancel();
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={COMMENT_CONTENT_VALIDATION_SCHEMA} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field name="content" as="textarea" placeholder="Edit your comment" aria-label="Comment content" aria-invalid={touched.content && !!errors.content} aria-describedby="contentError" />

            {errors.content && touched.content && (
              <p id="contentError" className="color-red">
                {errors.content}
              </p>
            )}
          </div>

          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
