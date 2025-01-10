import UserLoginForm from "../../components/UserLoginForm";
import style from "./styles.module.css";

export default function Login() {
  return (
    <section className="form-center">
      <article className={style["sign-in-container"]}>
        <h1 className={style["sign-in-title"]}>Sign In</h1>

        <UserLoginForm />
      </article>
    </section>
  );
}
