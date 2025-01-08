import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import UserLoginForm, { UserLoginFormValues } from "../../components/UserLoginForm";
import { loginUser } from "../../store/actions/userActions";

export default function Login() {
  const [formError, setFormError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().email('Must contain @ and "."').required("Email is required"),
    password: Yup.string().trim().min(6, "Password must be longer than 6 characters!").required("Password is required!"),
  });

  const handleSubmit = async (values: UserLoginFormValues, formikBag: any) => {
    setFormError(null);

    try {
      await dispatch(loginUser(values));

      formikBag.resetForm();

      history.push("/");
    } catch (err: any) {
      setFormError(err || "Login failed");
    }
  };

  return (
    <section>
      <h1>Sign In</h1>
      {formError && <p className="color-red">{formError}</p>}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} children={UserLoginForm} />
    </section>
  );
}
