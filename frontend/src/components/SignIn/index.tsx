import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import UserAuthorisationForm from "./UserAuthorizationForm";
import UserDataService from "../../services/user.service";

export default function SignIn() {
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
    UserDataService.checkUser({ email: values.email, password: values.password })
      .then(({ data }: any) => {
        localStorage.setItem("token", data.token);
        formikBag.resetForm();
        if (data.token) {
          history.push("/");
        }
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  return (
    <section>
      <h1>Sign In</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={checkUser} children={UserAuthorisationForm} />
    </section>
  );
}
