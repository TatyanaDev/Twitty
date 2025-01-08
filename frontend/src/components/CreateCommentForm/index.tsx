import { Formik, Form, Field, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { COMMENT_CONTENT_VALIDATION_SCHEMA } from "../../utils/validationSchemas";
import { createComment } from "../../store/actions/commentActions";
import { userSelector } from "../../store/selectors";
import { CommentContent } from "../../types/Comment";

interface CreateCommentFormProps {
  postId: number;
}

export default function CreateCommentForm({ postId }: CreateCommentFormProps) {
  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  const initialValues: CommentContent = {
    content: "",
  };

  const handleSubmit = ({ content }: CommentContent, formikBag: FormikHelpers<CommentContent>) => {
    if (user) {
      dispatch(createComment(user.id, postId, content));

      formikBag.resetForm();
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={COMMENT_CONTENT_VALIDATION_SCHEMA} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field name="content" as="textarea" placeholder="What's up?" aria-label="Comment content" aria-invalid={touched.content && !!errors.content} aria-describedby="contentError" />

            {errors.content && touched.content && (
              <p id="contentError" className="color-red">
                {errors.content}
              </p>
            )}
          </div>

          <button type="submit">Comment</button>
        </Form>
      )}
    </Formik>
  );
}
