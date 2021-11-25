import { Switch, Route, Link } from "react-router-dom";
import PostsList from "./components/PostList/index.";

export default function App() {
  return (
    <section>
      <nav>
        {/* <Link to='/'>Посты</Link> */}
        <ul>
          {/* <li>
            <Link to={"/tutorials"}>Tutorials</Link>
          </li>
          <li>
            <Link to={"/add"}>Add</Link>
          </li> */}
        </ul>
      </nav>

      <article>
        <Switch>
          <Route exact path='/' component={PostsList} />
          {/* <Route exact path="/add" component={AddTutorial} />
        <Route path="/tutorials/:id" component={Tutorial} /> */}
        </Switch>
      </article>
    </section>
  );
}
