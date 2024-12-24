import { useDispatch, useSelector } from "react-redux";
import { useField } from "formik";
import { setContentSelector } from "../../store/selectors";
import { set_content } from "../../store/actions/content";

export default function TextAreaUpdatePost({ post, ...props }: any) {
  const content = useSelector(setContentSelector).content;
  const [field] = useField(props);
  const dispatch = useDispatch();

  const savePost = ({ target }: any) => {
    dispatch(set_content(target.value));
  };

  return <textarea {...field} {...props} value={content || `  ${post.content.trim()}`} onChange={savePost} />;
}
