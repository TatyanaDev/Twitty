import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import Messages from "./pages/Inner/Messages";
import Settings from "./pages/Inner/Settings";
import Comments from "./pages/Inner/Comments";
import Profile from "./pages/Inner/Profile";
import HomeGuest from "./pages/HomeGuest";
import Users from "./pages/Inner/Users";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

export default function App() {
  useEffect(() => {
    checkOnAuth();
  }, []);

  const checkOnAuth = () => localStorage.getItem("token");

  return (
    <section>
      <Switch>
        <Route exact path="/" render={() => (checkOnAuth() ? <Home /> : <HomeGuest />)} />
        <Route exact path="/messages" render={() => <Messages />} />
        <Route exact path="/settings" render={() => <Settings />} />
        <Route exact path="/profile" render={() => <Profile />} />
        <Route exact path="/register" render={() => <SignUp />} />
        <Route exact path="/login" render={() => <SignIn />} />
        <Route exact path="/posts/:id" render={() => <Comments />} />
        <Route exact path="/:userName" render={() => <Users />} />
      </Switch>
    </section>
  );
}
