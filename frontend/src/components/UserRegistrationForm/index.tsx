import { Form, Field, FormikErrors, FormikTouched } from "formik";
import { Link } from "react-router-dom";

export interface UserRegistrationFormValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface UserRegistrationFormProps {
  errors: FormikErrors<UserRegistrationFormValues>;
  touched: FormikTouched<UserRegistrationFormValues>;
}

export default function UserRegistrationForm({ errors, touched }: UserRegistrationFormProps) {
  return (
    <Form>
      <div>
        <label htmlFor="firstName" className="d-block">
          First name
        </label>
        <Field name="firstName" id="firstName" />
        {errors.firstName && touched.firstName && <p className="color-red">{errors.firstName}</p>}
      </div>

      <div>
        <label htmlFor="lastName" className="d-block">
          Last name
        </label>
        <Field name="lastName" id="lastName" />
        {errors.lastName && touched.lastName && <p className="color-red">{errors.lastName}</p>}
      </div>

      <div>
        <label htmlFor="userName" className="d-block">
          User name
        </label>
        <Field name="userName" id="userName" />
        {errors.userName && touched.userName && <p className="color-red">{errors.userName}</p>}
      </div>

      <div>
        <label htmlFor="email" className="d-block">
          Email
        </label>
        <Field name="email" id="email" />
        {errors.email && touched.email && <p className="color-red">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="d-block">
          Password
        </label>
        <Field name="password" id="password" />
        {errors.password && touched.password && <p className="color-red">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="passwordConfirmation" className="d-block">
          Password confirmation
        </label>
        <Field name="passwordConfirmation" id="passwordConfirmation" />
        {errors.passwordConfirmation && touched.passwordConfirmation && <p className="color-red">{errors.passwordConfirmation}</p>}
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
  );
}
