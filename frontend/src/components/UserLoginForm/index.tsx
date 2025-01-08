import { Formik, Form, Field, FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { USER_LOGIN_VALIDATION_SCHEMA } from "../../utils/validationSchemas";
import { loginUser } from "../../store/actions/userActions";

export interface UserLoginFormValues {
  email: string;
  password: string;
}

export default function UserLoginForm() {
  const [formError, setFormError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: UserLoginFormValues, formikBag: FormikHelpers<UserLoginFormValues>) => {
    setFormError(null);

    try {
      await dispatch(loginUser(values));

      formikBag.resetForm();

      history.push("/");
    } catch (err: unknown) {
      setFormError(typeof err === "string" ? err : "Login failed");
    }
  };
  return (
    <>
      {formError && <p className="color-red">{formError}</p>}

      <Formik initialValues={initialValues} validationSchema={USER_LOGIN_VALIDATION_SCHEMA} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="email" className="d-block">
                User name (email)
              </label>
              <Field name="email" id="email" aria-label="Email" aria-invalid={touched.email && !!errors.email} aria-describedby="emailError" />

              {errors.email && touched.email && (
                <p id="emailError" className="color-red">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="d-block">
                Password
              </label>
              <Field name="password" id="password" aria-label="Password" aria-invalid={touched.password && !!errors.password} aria-describedby="passwordError" />

              {errors.password && touched.password && (
                <p id="passwordError" className="color-red">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <button type="submit">Sign in</button>

              <nav>
                <ul>
                  <li>
                    <Link to="/register">Sign up</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
