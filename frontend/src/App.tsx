import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import PostsListGuest from "./components/PostListGuest";
import PostsList from "./components/PostList";
import Messages from "./components/Messages";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Users from "./components/Users";

export default function App() {
  useEffect(() => {
    checkOnAuth();
  }, []);

  const checkOnAuth = () => localStorage.getItem("registration_token");

  return (
    <section>
      <Switch>
        <Route exact path='/' render={() => (checkOnAuth() ? <PostsList /> : <PostsListGuest />)} />
        <Route exact path='/login' component={SignIn} />
        <Route exact path='/register' component={SignUp} />
        <Route exact path='/messages' component={Messages} />
        <Route exact path='/users' component={Users} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/settings' component={Settings} />
      </Switch>
    </section>
  );
}
