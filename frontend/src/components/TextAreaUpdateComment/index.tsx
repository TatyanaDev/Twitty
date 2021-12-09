import { useField } from "formik";

export default function TextAreaUpdateContent({ setContent, content, comment, ...props }: any) {
  const [field] = useField(props);

  const saveComment = ({ target }: any) => {
    setContent(target.value);
  };

  return <textarea {...field} {...props} value={content || `  ${comment.contents.trim()}`} onChange={saveComment} />;
}
