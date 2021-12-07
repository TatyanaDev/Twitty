import { useField } from "formik";

export default function TextAreaUpdatePost({ setContent, content, post, ...props }: any) {
  const [field] = useField(props);

  const savePost = ({ target }: any) => {
    setContent(target.value);
  };

  return <textarea {...field} {...props} value={content || `  ${post.content.trim()}`} onChange={savePost} />;
}
