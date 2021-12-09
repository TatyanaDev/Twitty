import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    checkOnAuth();
  }, []);

  const checkOnAuth = () => localStorage.getItem("token");

  return (
    <section>
      <Switch>
        <Route exact path='/' render={() => (checkOnAuth() ? <Home userData={userData} setUserData={setUserData} /> : <HomeGuest />)} />
        <Route exact path='/messages' render={() => <Messages userData={userData} setUserData={setUserData} />} />
        <Route exact path='/settings' render={() => <Settings userData={userData} setUserData={setUserData} />} />
        <Route exact path='/profile' render={() => <Profile userData={userData} setUserData={setUserData} />} />
        <Route exact path='/register' render={() => <SignUp setUserData={setUserData} />} />
        <Route exact path='/login' render={() => <SignIn setUserData={setUserData} />} />
        <Route exact path='/posts/:id' render={() => <Comments userData={userData} setUserData={setUserData} />} />
        <Route exact path='/:userName' render={() => <Users userData={userData} setUserData={setUserData} />} />
      </Switch>
    </section>
  );
}
