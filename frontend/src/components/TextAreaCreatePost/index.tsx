import { useField } from "formik";

export default function TextAreaCreatePost({ ...props }: any) {
  const [field] = useField(props);

  return <textarea {...field} {...props} />;
}
