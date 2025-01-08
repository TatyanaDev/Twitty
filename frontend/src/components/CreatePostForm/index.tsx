import { Formik, Form, Field, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { POST_CONTENT_VALIDATION_SCHEMA } from "../../utils/validationSchemas";
import { createPost } from "../../store/actions/postActions";
import { userSelector } from "../../store/selectors";
import { PostContent } from "../../types/Post";

export default function CreatePostForm() {
  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  const initialValues: PostContent = {
    content: "",
  };

  const handleSubmit = ({ content }: PostContent, formikBag: FormikHelpers<PostContent>) => {
    if (user) {
      dispatch(createPost(user.id, content));

      formikBag.resetForm();
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={POST_CONTENT_VALIDATION_SCHEMA} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field name="content" as="textarea" placeholder="What's up?" aria-label="Post content" aria-invalid={touched.content && !!errors.content} aria-describedby="contentError" />

            {errors.content && touched.content && (
              <p id="contentError" className="color-red">
                {errors.content}
              </p>
            )}
          </div>

          <button type="submit">Tweet</button>
        </Form>
      )}
    </Formik>
  );
}
