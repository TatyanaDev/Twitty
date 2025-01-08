import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import UserRegistrationForm, { UserRegistrationFormValues } from "../../components/UserRegistrationForm";
import { registerUser } from "../../store/actions/userActions";

export default function Register() {
  const [formError, setFormError] = useState<string | null>(null);
  const dispatch = useDispatch();
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
    firstName: Yup.string().trim().required("First name is required"),
    lastName: Yup.string().trim().required("Last name is required"),
    userName: Yup.string().trim().required("User name is required"),
    email: Yup.string().trim().email('Must contain @ and "."').required("Email is required"),
    password: Yup.string().trim().min(6, "Password must be longer than 6 characters!").required("Password is required!"),
    passwordConfirmation: Yup.string()
      .trim()
      .oneOf([Yup.ref("password")], "Passwords do not match!")
      .required("Password confirmation is required!"),
  });

  const handleSubmit = async (values: UserRegistrationFormValues, formikBag: any) => {
    setFormError(null);

    try {
      await dispatch(registerUser(values));

      formikBag.resetForm();

      history.push("/");
    } catch (err: any) {
      setFormError(err || "Registration failed");
    }
  };

  return (
    <section>
      <h1>Sign Up</h1>
      {formError && <p className="color-red">{formError}</p>}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} children={UserRegistrationForm} />
    </section>
  );
}
