import { Link, useHistory } from "react-router-dom";
import styles from "./styles.module.css";

export default function SignIn() {
  const checkUser = () => {};

  return (
    <section>
      <h1>Sign In</h1>
      <form onSubmit={checkUser}>
        <label className={styles.label}>User name (email)</label>
        <input type='text' />
        <label className={styles.label}>Password </label>
        <input type='password' />
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
      </form>
    </section>
  );
}
