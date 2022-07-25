import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User/index";
import * as sessionActions from "./store/session";
import Images from "./components/Feed";
// import UploadImage from "./components/UploadImage";
import SingleImage from "./components/SingleImage";
import EditImage from "./components/EditImage";
import Comments from "./components/Comments";
import EditComment from "./components/EditComment/";

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
      <NavBar loaded={loaded} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>

        <Route path="/signup" exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>

        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>

        <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
        </ProtectedRoute>

        <Route path="/feed" exact={true}>
          <Images />
        </Route>

        <Route path="/images/:id" exact={true}>
          <SingleImage />
        </Route>
        {/* <Route path="/upload" exact={true}>
          <UploadImage />
        </Route> */}

        <Route path="/images/:id/edit" exact={true}>
          <EditImage />
        </Route>

        <Route path="/images/:id/comments/" exact={true}>
          <Comments />
        </Route>

        <Route path="/images/:id/comments/:id/edit" exact={true}>
          <EditComment />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
