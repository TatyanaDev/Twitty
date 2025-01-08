import { Form, Field, FormikErrors, FormikTouched } from "formik";
import { Link } from "react-router-dom";

export interface UserLoginFormValues {
  email: string;
  password: string;
}

interface UserLoginFormProps {
  errors: FormikErrors<UserLoginFormValues>;
  touched: FormikTouched<UserLoginFormValues>;
}

export default function UserLoginForm({ errors, touched }: UserLoginFormProps) {
  return (
    <Form>
      <div>
        <label htmlFor="email" className="d-block">
          User name (email)
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
  );
}
