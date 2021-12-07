import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import UserRegistrationForm from "../../components/UserRegistrationForm";
import AuthDataService from "../../services/auth.service";
import UserService from "../../services/user.service";

export default function SignUp({ setUserData }: any) {
  const [userNameUniquenessError, setUserNameUniquenessError] = useState(null);
  const [emailUniquenessError, setEmailUniquenessError] = useState(null);
  const history = useHistory();

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .matches(/^[A-Z][a-z]{1,64}$/, "The first letter must be capitalized")
      .required("First name is required"),
    lastName: Yup.string()
      .trim()
      .matches(/^[A-Z][a-z]{1,64}$/, "The first letter must be capitalized")
      .required("Last name is required"),
    userName: Yup.string().trim().required("User name is required"),
    email: Yup.string().trim().email('Must contain @ and "."').required("Email is required"),
    password: Yup.string().trim().min(6, "Password has to be longer than 6 characters!").required("Password is required!"),
    passwordConfirmation: Yup.string()
      .trim()
      .oneOf([Yup.ref("password")], "Passwords are not the same!")
      .required("Password confirmation is required!"),
  });

  const createUser = async (values: any, formikBag: any) => {
    setUserNameUniquenessError(null);
    setEmailUniquenessError(null);
    try {
      const { data } = await AuthDataService.registration({ firstName: values.firstName, lastName: values.lastName, userName: values.userName, email: values.email, password: values.password });

      localStorage.setItem("token", data.data.accessToken);

      const { data: userInfo } = await UserService.getUserData();

      formikBag.resetForm();

      setUserData(userInfo.data);

      if (data.data.accessToken && userInfo.data) {
        history.push("/");
      }
    } catch (err: any) {
      if (err.response.status === 409) {
        setEmailUniquenessError(err.response.data.error.message);
      }

      if (err.response.status === 400) {
        setUserNameUniquenessError(err.response.data.error.message);
      }
    }
  };

  return (
    <section>
      <h1>Sign Up</h1>
      {userNameUniquenessError}
      {emailUniquenessError}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={createUser} children={UserRegistrationForm} />
    </section>
  );
}
