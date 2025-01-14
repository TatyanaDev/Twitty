import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "./store/actions/postActions";
import { getUser } from "./store/actions/userActions";
import HomeGuest from "./pages/HomeGuest";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Comments from "./pages/Comments";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
  const dispatch = useDispatch();

  const isAuthorized = () => !!localStorage.getItem("accessToken");

  useEffect(() => {
    dispatch(getPosts());

    if (isAuthorized()) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path="/" render={() => (isAuthorized() ? <Home /> : <HomeGuest />)} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/messages" component={Messages} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/posts/:id" component={Comments} />
      <Route exact path="/:userName" component={Profile} />
    </Switch>
  );
}
