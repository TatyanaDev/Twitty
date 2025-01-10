import { Formik, Form, Field, FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { USER_REGISTRATION_VALIDATION_SCHEMA } from "../../utils/validationSchemas";
import { UserRegistrationFormValues } from "../../interfaces/User";
import { registerUser } from "../../store/actions/userActions";
import style from "./styles.module.css";

export default function UserRegistrationForm() {
  const [formError, setFormError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues: UserRegistrationFormValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const handleSubmit = async (values: UserRegistrationFormValues, formikHelpers: FormikHelpers<UserRegistrationFormValues>) => {
    setFormError(null);

    try {
      await dispatch(registerUser(values));

      formikHelpers.resetForm();

      history.push("/");
    } catch (err: unknown) {
      setFormError(typeof err === "string" ? err : "Registration failed");
    }
  };

  return (
    <>
      {formError && <p className="error mb-13">{formError}</p>}

      <Formik initialValues={initialValues} validationSchema={USER_REGISTRATION_VALIDATION_SCHEMA} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <div className="mb-13">
              <label htmlFor="firstName" className="d-block">
                First name
              </label>
              <Field name="firstName" id="firstName" aria-label="First name" aria-invalid={touched.firstName && !!errors.firstName} aria-describedby="firstNameError" />

              {errors.firstName && touched.firstName && (
                <p id="firstNameError" className="error">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="mb-13">
              <label htmlFor="lastName" className="d-block">
                Last name
              </label>
              <Field name="lastName" id="lastName" aria-label="Last name" aria-invalid={touched.lastName && !!errors.lastName} aria-describedby="lastNameError" />

              {errors.lastName && touched.lastName && (
                <p id="lastNameError" className="error">
                  {errors.lastName}
                </p>
              )}
            </div>

            <div className="mb-13">
              <label htmlFor="userName" className="d-block">
                User name
              </label>
              <Field name="userName" id="userName" aria-label="User name" aria-invalid={touched.userName && !!errors.userName} aria-describedby="userNameError" />

              {errors.userName && touched.userName && (
                <p id="userNameError" className="error">
                  {errors.userName}
                </p>
              )}
            </div>

            <div className="mb-13">
              <label htmlFor="email" className="d-block">
                Email
              </label>
              <Field name="email" id="email" aria-label="Email" aria-invalid={touched.email && !!errors.email} aria-describedby="emailError" />

              {errors.email && touched.email && (
                <p id="emailError" className="error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mb-13">
              <label htmlFor="password" className="d-block">
                Password
              </label>
              <Field name="password" id="password" aria-label="Password" aria-invalid={touched.password && !!errors.password} aria-describedby="passwordError" />

              {errors.password && touched.password && (
                <p id="passwordError" className="error">
                  {errors.password}
                </p>
              )}
            </div>

            <div className={style['mb-44']}>
              <label htmlFor="passwordConfirmation" className="d-block">
                Password confirmation
              </label>
              <Field name="passwordConfirmation" id="passwordConfirmation" aria-label="Password confirmation" aria-invalid={touched.passwordConfirmation && !!errors.passwordConfirmation} aria-describedby="passwordConfirmationError" />

              {errors.passwordConfirmation && touched.passwordConfirmation && (
                <p id="passwordConfirmationError" className="error">
                  {errors.passwordConfirmation}
                </p>
              )}
            </div>

            <div>
              <button type="submit" className="sign-button">
                Sign up
              </button>

              <nav>
                <ul>
                  <li className="text-center">
                    <Link to="/login" className="sign-link">
                      Sign in
                    </Link>
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
