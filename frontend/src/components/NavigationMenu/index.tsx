import { Link } from "react-router-dom";

export default function NavigationMenu({ userData }: any) {
  return (
    <>
      {userData && (
        <article>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/messages'>Messages</Link>
              </li>
              <li>
                <Link to={`/${userData?.userName}`}>Users</Link>
              </li>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <Link to='/settings'>Settings</Link>
              </li>
            </ul>
          </nav>
        </article>
      )}
    </>
  );
}
