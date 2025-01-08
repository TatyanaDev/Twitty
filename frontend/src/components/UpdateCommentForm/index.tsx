import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

interface UpdateCommentFormProps {
  comment: any;
  onSave: (updatedComment: any) => void;
  onCancel: () => void;
}

export default function UpdateCommentForm({ comment, onSave, onCancel }: UpdateCommentFormProps) {
  const initialValues = {
    content: comment.content || "",
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string().trim().required("Content is required"),
  });

  const handleSubmit = (values: { content: string }) => onSave({ ...comment, content: values.content });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field name="content" as="textarea" placeholder="Edit your comment" />
          </div>

          {errors.content && touched.content && <p className="color-red">{errors.content}</p>}

          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
