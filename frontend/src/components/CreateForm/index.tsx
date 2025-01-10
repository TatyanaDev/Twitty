import { Field, Form, Formik, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { POST_CONTENT_VALIDATION_SCHEMA, COMMENT_CONTENT_VALIDATION_SCHEMA } from "../../utils/validationSchemas";
import { createComment } from "../../store/actions/commentActions";
import { createPost } from "../../store/actions/postActions";
import { CommentContent } from "../../interfaces/Comment";
import { userSelector } from "../../store/selectors";
import { PostContent } from "../../interfaces/Post";
import style from "./styles.module.css";

interface CreateCommentFormProps {
  postId?: number;
}

export default function CreateForm({ postId }: CreateCommentFormProps) {
  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  const initialValues: PostContent | CommentContent = {
    content: "",
  };

  const handleSubmit = ({ content }: PostContent | CommentContent, formikBag: FormikHelpers<PostContent | CommentContent>) => {
    if (user) {
      if (postId) {
        dispatch(createComment(user.id, postId, content));
      } else {
        dispatch(createPost(user.id, content));
      }

      formikBag.resetForm();
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={postId ? COMMENT_CONTENT_VALIDATION_SCHEMA : POST_CONTENT_VALIDATION_SCHEMA} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form className={style["textarea-form-create"]}>
          <div>
            <Field name="content" as="textarea" placeholder="What's up?" aria-label={`${postId ? "Comment" : "Post"} content`} aria-invalid={touched.content && !!errors.content} aria-describedby="contentError" className={style["textarea-create"]} rows={4} />

            {errors.content && touched.content && (
              <p id="contentError" className="error mb-2">
                {errors.content}
              </p>
            )}
          </div>

          <div>
            <button type="submit" className={style["create-button"]}>
              {postId ? "Comment" : "Tweet"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
