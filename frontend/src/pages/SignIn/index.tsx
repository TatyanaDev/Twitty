import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import UserAuthorisationForm from "../../components/UserAuthorizationForm";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

export default function SignIn({ setUserData }: any) {
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
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

      const { data: userInfo } = await UserService.getUserData();

      formikBag.resetForm();

      setUserData(userInfo.data);

      if (data.data.accessToken && userInfo.data) {
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
