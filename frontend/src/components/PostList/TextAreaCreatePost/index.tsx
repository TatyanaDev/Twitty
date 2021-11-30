import { useField } from "formik";

export default function TextAreaCreatePost({ label, ...props }: any) {
  const [field] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea {...field} {...props} />
    </>
  );
}
