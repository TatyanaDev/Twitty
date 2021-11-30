import { Link } from "react-router-dom";
import { Form, Field } from "formik";
import style from "./styles.module.css";

export default function UserAuthorisationForm({ errors, touched }: any) {
  return (
    <Form>
      <label className={style.label}>User name (email) </label>
      <Field name='email' />
      {errors.email && touched.email && <p>{errors.email}</p>}

      <label className={style.label}>Password </label>
      <Field name='password' />
      {errors.password && touched.password && <p>{errors.password}</p>}

      <nav>
        <ul>
          <li>
            <button type='submit'>Sign in</button>
          </li>
          <li>
            <Link to='/register'>Sign up</Link>
          </li>
        </ul>
      </nav>
    </Form>
  );
}
