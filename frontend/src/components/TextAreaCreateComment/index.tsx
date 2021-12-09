import { useField } from "formik";

export default function TextAreaCreateComment({ ...props }: any) {
  const [field] = useField(props);

  return <textarea {...field} {...props} />;
}
