import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import UserDataService from "../../services/user.service";
import style from "./styles.module.css";

export default function SignUp() {
  const [confirmationError, setConfirmationError] = useState<boolean>(false);

  const history = useHistory();

  const createUser = (event: any) => {
    event.preventDefault();

    UserDataService.createUser({ firstName: event.target[0].value, lastName: event.target[1].value, userName: event.target[2].value, email: event.target[3].value, password: event.target[4].value })
      .then(({ data }: any) => {
        localStorage.setItem("registration_token", data.token);
        if (data.token) {
          history.push("/");
        }
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  const closeConfirmationError = () => {
    setConfirmationError(false);
  };

  return (
    <section>
      <h1>Sign Up</h1>
      <form onSubmit={createUser}>
        <label className={style.label}>First name </label>
        <input type='text' />
        <label className={style.label}>Last name </label>
        <input type='text' />
        <label className={style.label}>User name </label>
        <input type='text' />
        <label className={style.label}>Email </label>
        <input type='email' />
        <label className={style.label}>Password </label>
        <input type='password' />
        <label className={style.label}>Password confirmation</label>
        <input type='password' />
        {confirmationError && (
          <p>
            Password mismatch<button onClick={closeConfirmationError}>X</button>
          </p>
        )}
        <nav>
          <ul >
            <li>
              <button type='submit'>Sign up</button>
            </li>
            <li>
              <Link to='/login'>Sign in</Link>
            </li>
          </ul>
        </nav>
      </form>
    </section>
  );
}
