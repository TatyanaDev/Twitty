import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSelector } from "../../store/selectors";
import style from "./styles.module.css";

export default function NavigationMenu() {
  const { user } = useSelector(userSelector);

  return (
    <aside className={style.aside}>
      <nav>
        <ul>
          <li>
            <Link to="/" className={style["navigation-link"]}>
              Home
            </Link>
          </li>

          {user && (
            <>
              <li>
                <Link to="/messages" className={style["navigation-link"]}>
                  Messages
                </Link>
              </li>
              <li>
                <Link to="/users" className={style["navigation-link"]}>
                  Users
                </Link>
              </li>
              <li>
                <Link to={`/${user.userName}`} className={style["navigation-link"]}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className={style["navigation-link"]}>
                  Settings
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
}
