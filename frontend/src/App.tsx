import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { getPosts } from "./store/actions/postActions";
import { postsSelector } from "./store/selectors";
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

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const { posts } = useSelector(postsSelector);

  const isAuthorized = () => localStorage.getItem("accessToken");

  useEffect(() => {
    isAuthorized();
  }, []);

  return (
    <Switch>
      <Route exact path="/" render={() => (isAuthorized() ? <Home posts={posts} /> : <HomeGuest posts={posts} />)} />
      <Route exact path="/register" render={() => <Register />} />
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/messages" render={() => <Messages />} />
      <Route exact path="/settings" render={() => <Settings />} />
      <Route exact path="/profile" render={() => <Profile />} />
      <Route exact path="/posts/:id" render={() => <Comments posts={posts} />} />
      <Route exact path="/:userName" render={() => <Users posts={posts} />} />
    </Switch>
  );
}
