import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import UserRegistrationForm from "./UserRegistrationForm";
import UserDataService from "../../services/user.service";

export default function SignUp() {
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
      .matches(/^[A-Z][a-z]{1,64}$/, "The first letter must be capitalized")
      .required("First name is required"),
    lastName: Yup.string()
      .matches(/^[A-Z][a-z]{1,64}$/, "The first letter must be capitalized")
      .required("Last name is required"),
    userName: Yup.string().required("User name is required"),
    email: Yup.string().email('Must contain @ and "."').required("Email is required"),
    password: Yup.string().min(6, "Password has to be longer than 6 characters!").required("Password is required!"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords are not the same!")
      .required("Password confirmation is required!"),
  });

  const createUser = (values: any, formikBag: any) => {
    setUserNameUniquenessError(null);
    setEmailUniquenessError(null);
    UserDataService.createUser({ firstName: values.firstName, lastName: values.lastName, userName: values.userName, email: values.email, password: values.password })
      .then(({ data }: any) => {
        localStorage.setItem("token", data.token);
        formikBag.resetForm();
        if (data.token) {
          history.push("/");
        }
      })
      .catch(({ response }: any) => {
        if (response.status === 409) {
          setEmailUniquenessError(response.data.error);
        }

        if (response.status === 400) {
          setUserNameUniquenessError(response.data.error);
        }
      });
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
