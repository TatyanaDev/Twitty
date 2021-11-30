import { useField } from "formik";

export default function TextAreaUpdatePost({ label, setContent, content, post, ...props }: any) {
  const [field] = useField(props);

  const savePost = ({ target }: any) => {
    setContent(target.value);
  };

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea {...field} {...props} value={content || `  ${post.content.trim()}`} onChange={savePost} />
    </>
  );
}
