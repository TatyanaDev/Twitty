import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSelector } from "../../store/selectors";

export default function NavigationMenu() {
  const { user } = useSelector(userSelector);

  return (
    <aside>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/messages">Messages</Link>
              </li>
              <li>
                <Link to={`/${user.userName}`}>Users</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
}
