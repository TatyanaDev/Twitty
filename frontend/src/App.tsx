import { Switch, Route, Link } from "react-router-dom";
import PostsList from "./components/PostList";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export default function App() {
  return (
    <section>
      <Switch>
        <Route exact path='/' component={PostsList} />
        <Route exact path='/login' component={SignIn} />
        <Route exact path='/register' component={SignUp} />
      </Switch>
      {/* <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/messages'>Messages</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to={"/add"}>Profile</Link>
          </li>{" "}
          <li>
            <Link to={"/add"}>Settings</Link>
          </li>
        </ul>
      </nav> */}
    </section>
  );
}
