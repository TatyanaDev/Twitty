import { Link } from "react-router-dom";
import { IUserData } from "../../types/User";

interface NavigationMenuProps {
  user: IUserData;
}

export default function NavigationMenu({ user }: NavigationMenuProps) {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
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
        </ul>
      </nav>
    </aside>
  );
}
