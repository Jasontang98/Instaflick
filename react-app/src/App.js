import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User/index";
import * as sessionActions from "./store/session";
import Images from "./components/Feed";
import SingleImage from "./components/SingleImage";
import EditImage from "./components/EditImage";
import EditComment from "./components/EditComment/";
import EditUser from "./components/EditUser";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   dispatch(sessionActions.restoreUser()).then(() => setLoaded(true));
  // }, [dispatch]);

  useEffect(() => {
    (async () => {
      await dispatch(sessionActions.authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/users" exact={true}>
          <NavBar loaded={loaded} />
          <UsersList />
        </ProtectedRoute>

        <ProtectedRoute path="/users/:userId" exact={true}>
          <NavBar loaded={loaded} />
          <User />
        </ProtectedRoute>

        <ProtectedRoute path="/users/:userId/edit" exact={true}>
          <NavBar loaded={loaded} />
          <EditUser />
        </ProtectedRoute>

        <ProtectedRoute path="/" exact={true}>
          <NavBar loaded={loaded} />
          <h1>My Home Page</h1>

          <ProtectedRoute path="/images/:id/edit" exact={true}>
            <NavBar loaded={loaded} />
            <EditImage />
          </ProtectedRoute>

          <ProtectedRoute path="/images/:id/comments/:id/edit" exact={true}>
            <NavBar loaded={loaded} />
            <EditComment />
          </ProtectedRoute>
        </ProtectedRoute>

        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>

        <Route path="/signup" exact={true}>
          <SignUpForm />
        </Route>

        <Route path="/feed" exact={true}>
          <NavBar loaded={loaded} />
          <Images />
        </Route>

        <Route path="/images/:id" exact={true}>
          <NavBar loaded={loaded} />
          <SingleImage />
        </Route>

        <Route path="/accounts/edit" exact={true}>
          <NavBar loaded={loaded} />
          <EditUser />
        </Route>

        <Route>
          <NavBar loaded={loaded} />
          Sorry, this page isn't available.
          <div />
          <ul>
            Go back <NavLink to="/">home</NavLink>.
          </ul>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
