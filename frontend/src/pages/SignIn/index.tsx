import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import UserAuthorisationForm from "../../components/UserAuthorizationForm";
import { get_user_data } from "../../store/actions/user";
import AuthService from "../../services/auth.service";

export default function SignIn() {
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().email('Must contain @ and "."').required("Email is required"),
    password: Yup.string().trim().min(6, "Password has to be longer than 6 characters!").required("Password is required!"),
  });

  const checkUser = async (values: any, formikBag: any) => {
    setPasswordError(null);
    setEmailError(null);
    try {
      const { data } = await AuthService.login({ email: values.email, password: values.password });

      localStorage.setItem("token", data.data.accessToken);

      dispatch(get_user_data());

      formikBag.resetForm();

      if (data.data.accessToken) {
        history.push("/");
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        setPasswordError(err.response.data.error.message);
      }
      if (err.response.status === 401) {
        setEmailError(err.response.data.error.message);
      }
    }
  };

  return (
    <section>
      <h1>Sign In</h1>
      {passwordError}
      {emailError}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={checkUser} children={UserAuthorisationForm} />
    </section>
  );
}
