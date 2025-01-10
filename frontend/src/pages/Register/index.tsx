import UserRegistrationForm from "../../components/UserRegistrationForm";
import style from "./styles.module.css";

export default function Register() {
  return (
    <section className="form-center">
      <article className={style["sign-up-container"]}>
        <h1 className={style["sign-up-title"]}>Sign Up</h1>

        <UserRegistrationForm />
      </article>
    </section>
  );
}
