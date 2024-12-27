import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDataSelector } from "../../store/selectors";

export default function NavigationMenu() {
  const userData = useSelector(getUserDataSelector).userData;

  return (
    <>
      {userData && (
        <article>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/messages">Messages</Link>
              </li>
              <li>
                <Link to={`/${userData?.userName}`}>Users</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </nav>
        </article>
      )}
    </>
  );
}
