import { Formik, Form, Field, FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { USER_REGISTRATION_VALIDATION_SCHEMA } from "../../utils/validationSchemas";
import { registerUser } from "../../store/actions/userActions";

export interface UserRegistrationFormValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

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
      {formError && <p className="color-red">{formError}</p>}

      <Formik initialValues={initialValues} validationSchema={USER_REGISTRATION_VALIDATION_SCHEMA} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="firstName" className="d-block">
                First name
              </label>
              <Field name="firstName" id="firstName" aria-label="First name" aria-invalid={touched.firstName && !!errors.firstName} aria-describedby="firstNameError" />

              {errors.firstName && touched.firstName && (
                <p id="firstNameError" className="color-red">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="d-block">
                Last name
              </label>
              <Field name="lastName" id="lastName" aria-label="Last name" aria-invalid={touched.lastName && !!errors.lastName} aria-describedby="lastNameError" />

              {errors.lastName && touched.lastName && (
                <p id="lastNameError" className="color-red">
                  {errors.lastName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="userName" className="d-block">
                User name
              </label>
              <Field name="userName" id="userName" aria-label="User name" aria-invalid={touched.userName && !!errors.userName} aria-describedby="userNameError" />

              {errors.userName && touched.userName && (
                <p id="userNameError" className="color-red">
                  {errors.userName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="d-block">
                Email
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
              <label htmlFor="passwordConfirmation" className="d-block">
                Password confirmation
              </label>
              <Field name="passwordConfirmation" id="passwordConfirmation" aria-label="Password confirmation" aria-invalid={touched.passwordConfirmation && !!errors.passwordConfirmation} aria-describedby="passwordConfirmationError" />

              {errors.passwordConfirmation && touched.passwordConfirmation && (
                <p id="passwordConfirmationError" className="color-red">
                  {errors.passwordConfirmation}
                </p>
              )}
            </div>

            <div>
              <button type="submit">Sign up</button>

              <nav>
                <ul>
                  <li>
                    <Link to="/login">Sign in</Link>
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
