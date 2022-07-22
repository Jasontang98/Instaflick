import React from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
// import LogoutButton from "../auth/LogoutButton";
import UploadImageModal from "../UploadImage/";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

const NavBar = ({ loaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/sign-up">Sign Up</NavLink>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>
      </>
    );
  }
  return (
    <nav>
      <div>
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
      </div>
      <div></div>
      {/* <div>
        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
      </div> */}
      <div>
        <NavLink to="/users" exact={true} activeClassName="active">
          Users
        </NavLink>
      </div>
      {/* <NavLink to="/upload" exact={true} activeClassName="active">
        Upload
      </NavLink> */}
      <div>
        <NavLink to="/feed" exact={true} activeClassName="active">
          Feed
        </NavLink>
      </div>

      {/* <LogoutButton /> */}

      {sessionUser ? (
        <UploadImageModal></UploadImageModal>
      ) : (
        <NavLink exact to="/sign-up" />
      )}
      {loaded && sessionLinks}
    </nav>
  );
};

export default NavBar;
