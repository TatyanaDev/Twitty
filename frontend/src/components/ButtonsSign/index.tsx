import { Link } from "react-router-dom";

export default function ButtonsSign() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/login'>Sign in</Link>
        </li>
        <li>
          <Link to='/register'>Sign up</Link>
        </li>
      </ul>
    </nav>
  );
}
