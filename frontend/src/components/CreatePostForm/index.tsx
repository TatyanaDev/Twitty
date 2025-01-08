import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createPost } from "../../store/actions/postActions";
import { userSelector } from "../../store/selectors";

export default function CreatePostForm() {
  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  const initialValues = {
    content: "",
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string().trim().required("Content is required"),
  });

  const handleSubmit = (values: { content: string }, formikBag: any) => {
    if (user) {
      dispatch(createPost({ userId: user.id, content: values.content }));
      formikBag.resetForm();
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field name="content" as="textarea" placeholder="What's up?" />
          </div>

          {errors.content && touched.content && <p className="color-red">{errors.content}</p>}

          <button type="submit">Tweet</button>
        </Form>
      )}
    </Formik>
  );
}
