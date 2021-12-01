import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import UserAuthorisationForm from "./UserAuthorizationForm";
import UserDataService from "../../services/user.service";

export default function SignIn() {
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const history = useHistory();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Must contain @ and "."').required("Email is required"),
    password: Yup.string().min(6, "Password has to be longer than 6 characters!").required("Password is required!"),
  });

  const checkUser = (values: any, formikBag: any) => {
    setPasswordError(null);
    setEmailError(null);
    UserDataService.checkUser({ email: values.email, password: values.password })
      .then(({ data }: any) => {
        localStorage.setItem("token", data.token);
        formikBag.resetForm();
        if (data.token) {
          history.push("/");
        }
      })
      .catch(({ response }: any) => {
        if (response.status === 404) {
          setPasswordError(response.data.error);
        }

        if (response.status === 401) {
          setEmailError(response.data.error);
        }
      });
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
