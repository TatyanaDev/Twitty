import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import { POST_CONTENT_VALIDATION_SCHEMA } from "../../utils/validationSchemas";
import { updatePost } from "../../store/actions/postActions";
import { PostContent, IPostData } from "../../types/Post";
import { userSelector } from "../../store/selectors";

interface UpdatePostFormProps {
  post: IPostData;
  setEditingPostId: (postId: number | null) => void;
}

export default function UpdatePostForm({ post, setEditingPostId }: UpdatePostFormProps) {
  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  const initialValues = {
    content: post.content || "",
  };

  const handleCancel = () => setEditingPostId(null);

  const handleSubmit = ({ content }: PostContent) => {
    if (user && post) {
      dispatch(updatePost(user.id, post.id, content));

      handleCancel();
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={POST_CONTENT_VALIDATION_SCHEMA} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field name="content" as="textarea" placeholder="Edit your post" aria-label="Post content" aria-invalid={touched.content && !!errors.content} aria-describedby="contentError" />

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
