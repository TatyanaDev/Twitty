import { Link } from "react-router-dom";
import { Form, Field } from "formik";
import style from "./styles.module.css";

export default function UserRegistrationForm({ errors, touched }: any) {
  return (
    <Form>
      <label className={style.label}>First name </label>
      <Field name='firstName' />
      {errors.firstName && touched.firstName && <p>{errors.firstName}</p>}

      <label className={style.label}>Last name</label>
      <Field name='lastName' />
      {errors.lastName && touched.lastName && <p>{errors.lastName}</p>}

      <label className={style.label}>User name </label>
      <Field name='userName' />
      {errors.userName && touched.userName && <p>{errors.userName}</p>}

      <label className={style.label}>Email </label>
      <Field name='email' />
      {errors.email && touched.email && <p>{errors.email}</p>}

      <label className={style.label}>Password </label>
      <Field name='password' />
      {errors.password && touched.password && <p>{errors.password}</p>}

      <label className={style.label}>Password confirmation </label>
      <Field name='passwordConfirmation' />
      {errors.passwordConfirmation && touched.passwordConfirmation && <p>{errors.passwordConfirmation}</p>}

      <nav>
        <ul>
          <li>
            <button type='submit'>Sign up</button>
          </li>
          <li>
            <Link to='/login'>Sign in</Link>
          </li>
        </ul>
      </nav>
    </Form>
  );
}
